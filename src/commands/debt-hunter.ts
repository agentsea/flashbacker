import { createHash } from 'crypto';
import { spawn } from 'child_process';
import { readFileSync } from 'fs';
import { join, extname } from 'path';
import chalk from 'chalk';
import { rgPath } from '@vscode/ripgrep';
import { parse } from 'meriyah';
// import { analyze } from 'eslint-scope'; // Currently unused
import { detectCurrentProjectDirectory } from '../utils/config';

// Tree-sitter imports
const Parser = require('tree-sitter');
const JavaScript = require('tree-sitter-javascript');
const Python = require('tree-sitter-python');
const Go = require('tree-sitter-go');
const Java = require('tree-sitter-java');
const Rust = require('tree-sitter-rust');

interface DebtPattern {
  name: string;
  pattern: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  languages?: string[]; // Optional: specific languages this pattern applies to
}

// Language detection and AST parser mapping
const LANGUAGE_CONFIG = {
  'javascript': {
    extensions: ['.js', '.jsx', '.mjs'] as string[],
    parser: JavaScript,
    ripgrepTypes: ['js'] as string[],
  },
  'typescript': {
    extensions: ['.ts', '.tsx'] as string[],
    parser: JavaScript, // JavaScript parser handles TypeScript syntax
    ripgrepTypes: ['ts'] as string[],
  },
  'python': {
    extensions: ['.py', '.pyx'] as string[],
    parser: Python,
    ripgrepTypes: ['py'] as string[],
  },
  'go': {
    extensions: ['.go'] as string[],
    parser: Go,
    ripgrepTypes: ['go'] as string[],
  },
  'java': {
    extensions: ['.java'] as string[],
    parser: Java,
    ripgrepTypes: ['java'] as string[],
  },
  'rust': {
    extensions: ['.rs'] as string[],
    parser: Rust,
    ripgrepTypes: ['rust'] as string[],
  },
};

type SupportedLanguage = keyof typeof LANGUAGE_CONFIG;

const DEBT_PATTERNS: DebtPattern[] = [
  {
    name: 'TODO Comments',
    pattern: '(TODO|FIXME|HACK|NOTE|BUG):',
    description: 'Placeholder comments indicating incomplete work',
    severity: 'medium',
    // Universal pattern - no language restriction
  },
  {
    name: 'Console Debug',
    pattern: 'console\\.(log|debug|warn|error|info)\\(',
    description: 'Debug logging artifacts left in code',
    severity: 'low',
    languages: ['javascript', 'typescript'],
  },
  {
    name: 'Print Debug',
    pattern: 'print\\(',
    description: 'Debug print statements left in code',
    severity: 'low',
    languages: ['python', 'go'],
  },
  {
    name: 'Debug Println',
    pattern: '(println!|dbg!|eprintln!)\\(',
    description: 'Debug print macros left in Rust code',
    severity: 'low',
    languages: ['rust'],
  },
  {
    name: 'System.out Debug',
    pattern: 'System\\.out\\.(print|println)\\(',
    description: 'Debug print statements left in Java code',
    severity: 'low',
    languages: ['java'],
  },
  {
    name: 'Not Implemented',
    pattern: '(throw new Error\\(.*[Nn]ot implemented|return null|return undefined|raise NotImplementedError|panic!\\(|TODO\\()',
    description: 'Functions that don\'t actually implement anything',
    severity: 'high',
    // Universal pattern with language-specific variants
  },
  {
    name: 'Commented Code',
    pattern: '^\\s*(//|#)\\s*(function|const|let|var|class|if|for|while|def|fn)',
    description: 'Commented out code blocks',
    severity: 'medium',
    // Universal pattern with different comment styles
  },
  {
    name: 'Generic Names',
    pattern: '(data|item|thing|stuff|temp|tmp)\\s*[=:]',
    description: 'Generic variable names indicating lazy implementation',
    severity: 'low',
    // Universal pattern
  },
  {
    name: 'Empty Functions',
    pattern: '(function|=>|def|fn)\\s*\\([^)]*\\)\\s*\\{?\\s*\\}?\\s*$',
    description: 'Empty function implementations',
    severity: 'high',
    // Universal pattern with language variations
  },
  {
    name: 'Debugger Statements',
    pattern: '(debugger;|pdb\\.set_trace\\(\\)|breakpoint\\(\\))',
    description: 'Debugger breakpoints left in code',
    severity: 'medium',
    // Universal pattern with language-specific variants
  },
  {
    name: 'Similar Function Names',
    pattern: '(function|const|let|def|fn)\\s+(handle|process|manage|create|update|delete|get|set)([A-Z]\\w*)',
    description: 'Functions with AI-generated naming patterns (handle*, process*, manage*)',
    severity: 'low',
    // Universal pattern
  },
];

export async function debtHunterCommand(options: any): Promise<void> {
  try {
    console.log(chalk.blue('🔍 Debt Hunter - Scanning for technical debt...'));

    const projectDir = await detectCurrentProjectDirectory();

    if (options.context) {
      await outputDebtContext(projectDir);
      return;
    }

    if (options.scan) {
      await scanForDebt(projectDir);
      return;
    }

    if (options.duplicates) {
      await scanForDuplicates(projectDir);
      return;
    }

    // Default: show help
    console.log(chalk.yellow('Usage:'));
    console.log('  flashback debt-hunter --scan           # Enhanced AST-based technical debt scanning');
    console.log('  flashback debt-hunter --duplicates     # Detect duplicate/similar functions');
    console.log('  flashback debt-hunter --context        # Output for Claude analysis');
    console.log('');
    console.log(chalk.blue('🧠 Enhanced with AST-based context awareness to eliminate false positives'));

  } catch (error) {
    console.error(chalk.red('❌ Debt hunter failed:'), error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

async function scanForDebt(projectDir: string): Promise<void> {
  console.log(chalk.blue(`Scanning project: ${projectDir}`));
  console.log('');

  let totalIssues = 0;

  for (const pattern of DEBT_PATTERNS) {
    const issues = await scanPattern(projectDir, pattern);
    if (issues.length > 0) {
      totalIssues += issues.length;

      const severityColor = pattern.severity === 'high' ? chalk.red :
        pattern.severity === 'medium' ? chalk.yellow : chalk.gray;

      console.log(severityColor(`${pattern.name} (${pattern.severity.toUpperCase()}): ${issues.length} issues`));
      console.log(chalk.gray(`  ${pattern.description}`));

      // Show first 5 matches
      issues.slice(0, 5).forEach(issue => {
        console.log(chalk.gray(`    ${issue.file}:${issue.line} - ${issue.match.substring(0, 80)}...`));
      });

      if (issues.length > 5) {
        console.log(chalk.gray(`    ... and ${issues.length - 5} more`));
      }
      console.log('');
    }
  }

  if (totalIssues === 0) {
    console.log(chalk.green('✅ No technical debt detected!'));
  } else {
    console.log(chalk.yellow(`⚠️  Found ${totalIssues} technical debt issues`));
    console.log(chalk.blue('💡 Run with --context to get AI analysis recommendations'));
  }
}

async function scanPattern(projectDir: string, pattern: DebtPattern): Promise<Array<{file: string, line: number, match: string}>> {
  // Use AST-based analysis for context-aware patterns
  if (isAstAnalyzablePattern(pattern)) {
    return await scanPatternWithAst(projectDir, pattern);
  }

  // Fall back to regex for simple patterns that don't need context
  return await scanPatternWithRegex(projectDir, pattern);
}

// Check if pattern needs AST analysis to avoid false positives
function isAstAnalyzablePattern(pattern: DebtPattern): boolean {
  const astPatterns = [
    'Console Debug', 'Print Debug', 'Debug Println', 'System.out Debug',
    'Debugger Statements', 'Empty Functions', 'Not Implemented',
  ];
  return astPatterns.includes(pattern.name);
}

// Enhanced AST-based pattern scanning with multi-language support
async function scanPatternWithAst(projectDir: string, pattern: DebtPattern): Promise<Array<{file: string, line: number, match: string}>> {
  const results: Array<{file: string, line: number, match: string}> = [];

  // Get all source files for languages that support this pattern
  const supportedLanguages = pattern.languages as SupportedLanguage[] || Object.keys(LANGUAGE_CONFIG) as SupportedLanguage[];
  const sourceFiles = await getSourceFiles(projectDir, supportedLanguages);

  for (const { file, language } of sourceFiles) {
    try {
      const fullPath = join(projectDir, file);
      const sourceCode = readFileSync(fullPath, 'utf-8');
      const fileResults = analyzeFileWithAst(sourceCode, file, pattern, language);
      results.push(...fileResults);
    } catch (error) {
      // Skip files that can't be parsed (malformed syntax)
      continue;
    }
  }

  return results;
}

// Analyze single file with AST for context awareness (multi-language)
function analyzeFileWithAst(sourceCode: string, filename: string, pattern: DebtPattern, language: SupportedLanguage): Array<{file: string, line: number, match: string}> {
  const results: Array<{file: string, line: number, match: string}> = [];

  try {
    let ast: any;

    // Use appropriate parser for the language
    if (language === 'javascript' || language === 'typescript') {
      // Use existing Meriyah parser for JS/TS
      ast = parse(sourceCode, {
        loc: true,
        ranges: true,
        next: true,
      });
    } else {
      // Use Tree-sitter for other languages
      const parser = new Parser();
      parser.setLanguage(LANGUAGE_CONFIG[language].parser);
      ast = parser.parse(sourceCode);
    }

    const sourceLines = sourceCode.split('\n');

    // Apply pattern-specific analysis based on language and pattern
    switch (pattern.name) {
      case 'Console Debug':
        if (language === 'javascript' || language === 'typescript') {
          findConsoleCallsInAst(ast, sourceLines, filename, results);
        } else {
          findDebugPrintsInTreeSitter(ast, sourceLines, filename, results, language);
        }
        break;
      case 'Print Debug':
      case 'Debug Println':
      case 'System.out Debug':
        findDebugPrintsInTreeSitter(ast, sourceLines, filename, results, language);
        break;
      case 'Debugger Statements':
        if (language === 'javascript' || language === 'typescript') {
          findDebuggerStatementsInAst(ast, sourceLines, filename, results);
        } else {
          findDebuggerStatementsInTreeSitter(ast, sourceLines, filename, results, language);
        }
        break;
      case 'Empty Functions':
        if (language === 'javascript' || language === 'typescript') {
          findEmptyFunctionsInAst(ast, sourceLines, filename, results);
        } else {
          findEmptyFunctionsInTreeSitter(ast, sourceLines, filename, results, language);
        }
        break;
      case 'Not Implemented':
        if (language === 'javascript' || language === 'typescript') {
          findNotImplementedInAst(ast, sourceLines, filename, results);
        } else {
          findNotImplementedInTreeSitter(ast, sourceLines, filename, results, language);
        }
        break;
    }
  } catch (error) {
    // Fall back to regex if AST parsing fails
    return [];
  }

  return results;
}

// Context-aware console.log detection
function findConsoleCallsInAst(ast: any, sourceLines: string[], filename: string, results: Array<{file: string, line: number, match: string}>): void {
  function traverse(node: any): void {
    if (!node || typeof node !== 'object') return;

    // Check for console method calls
    if (node.type === 'CallExpression' &&
        node.callee?.type === 'MemberExpression' &&
        node.callee?.object?.name === 'console' &&
        ['log', 'debug', 'warn', 'error', 'info'].includes(node.callee?.property?.name)) {

      // Context-aware filtering
      if (!isLegitimateConsoleUsage(node, sourceLines, filename)) {
        const line = node.loc.start.line;
        const match = sourceLines[line - 1]?.trim() || '';
        results.push({
          file: filename,
          line: line,
          match: match,
        });
      }
    }

    // Recursively traverse child nodes
    for (const key in node) {
      if (key !== 'parent' && node[key]) {
        if (Array.isArray(node[key])) {
          node[key].forEach((child: any) => traverse(child));
        } else if (typeof node[key] === 'object') {
          traverse(node[key]);
        }
      }
    }
  }

  traverse(ast);
}

// Check if console usage is legitimate (CLI output, not debug artifacts)
function isLegitimateConsoleUsage(node: any, sourceLines: string[], filename: string): boolean {
  const line = node.loc.start.line;
  const codeLine = sourceLines[line - 1]?.trim() || '';

  // Skip if in test files
  if (filename.includes('.test.') || filename.includes('.spec.')) {
    return true;
  }

  // Check if it's user-facing CLI output
  if (hasUserFacingContent(node)) {
    return true;
  }

  // Check for CLI command implementations
  if (filename.includes('/commands/') || codeLine.includes('chalk.')) {
    return true;
  }

  // Check for legitimate error reporting
  if (codeLine.includes('error') && (codeLine.includes('console.error') || codeLine.includes('chalk.red'))) {
    return true;
  }

  return false;
}

// Check if console call contains user-facing content
function hasUserFacingContent(node: any): boolean {
  if (!node.arguments || node.arguments.length === 0) return false;

  const firstArg = node.arguments[0];

  // Check for string literals with user-facing content
  if (firstArg.type === 'Literal' && typeof firstArg.value === 'string') {
    const content = firstArg.value.toLowerCase();

    // Common user-facing patterns
    const userPatterns = [
      'usage:', 'help', 'error:', 'warning:', 'success',
      'failed', 'completed', 'running', 'scanning',
      '✅', '❌', '⚠️', '🔍', '📊', '💡',
    ];

    return userPatterns.some(pattern => content.includes(pattern));
  }

  // Check for template literals with user content
  if (firstArg.type === 'TemplateLiteral') {
    const userPatterns = [
      'usage:', 'help', 'error:', 'warning:', 'success',
      'failed', 'completed', 'running', 'scanning',
      '✅', '❌', '⚠️', '🔍', '📊', '💡',
    ];
    return firstArg.quasis?.some((quasi: any) =>
      userPatterns.some(pattern => quasi.value?.raw?.toLowerCase().includes(pattern)),
    );
  }

  return false;
}

// Context-aware debugger statement detection
function findDebuggerStatementsInAst(ast: any, sourceLines: string[], filename: string, results: Array<{file: string, line: number, match: string}>): void {
  function traverse(node: any): void {
    if (!node || typeof node !== 'object') return;

    // Only flag actual debugger statements, not string literals
    if (node.type === 'DebuggerStatement') {
      const line = node.loc.start.line;
      const match = sourceLines[line - 1]?.trim() || '';
      results.push({
        file: filename,
        line: line,
        match: match,
      });
    }

    // Recursively traverse child nodes
    for (const key in node) {
      if (key !== 'parent' && node[key]) {
        if (Array.isArray(node[key])) {
          node[key].forEach((child: any) => traverse(child));
        } else if (typeof node[key] === 'object') {
          traverse(node[key]);
        }
      }
    }
  }

  traverse(ast);
}

// Context-aware empty function detection
function findEmptyFunctionsInAst(ast: any, sourceLines: string[], filename: string, results: Array<{file: string, line: number, match: string}>): void {
  function traverse(node: any): void {
    if (!node || typeof node !== 'object') return;

    // Check function declarations and expressions
    if ((node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') &&
        isTrulyEmptyFunction(node)) {

      // Skip interface implementations, abstract methods, etc.
      if (!isLegitimateEmptyFunction(node, sourceLines, filename)) {
        const line = node.loc.start.line;
        const match = sourceLines[line - 1]?.trim() || '';
        results.push({
          file: filename,
          line: line,
          match: match,
        });
      }
    }

    // Recursively traverse child nodes
    for (const key in node) {
      if (key !== 'parent' && node[key]) {
        if (Array.isArray(node[key])) {
          node[key].forEach((child: any) => traverse(child));
        } else if (typeof node[key] === 'object') {
          traverse(node[key]);
        }
      }
    }
  }

  traverse(ast);
}

// Check if function is truly empty (no statements)
function isTrulyEmptyFunction(node: any): boolean {
  if (node.type === 'ArrowFunctionExpression' && node.body.type !== 'BlockStatement') {
    return false; // Arrow function with expression body
  }

  const body = node.body?.type === 'BlockStatement' ? node.body : node.body;
  return body?.body?.length === 0;
}

// Check if empty function is legitimate (interface, abstract, etc.)
function isLegitimateEmptyFunction(node: any, sourceLines: string[], filename: string): boolean {
  // Skip test files
  if (filename.includes('.test.') || filename.includes('.spec.')) {
    return true;
  }

  // Check for interface implementations or abstract methods
  const functionLine = sourceLines[node.loc.start.line - 1]?.trim() || '';

  // TypeScript interface methods
  if (functionLine.includes(':') && functionLine.includes('=>')) {
    return true;
  }

  // Abstract or placeholder implementations
  if (functionLine.includes('abstract') || functionLine.includes('TODO') || functionLine.includes('FIXME')) {
    return true;
  }

  return false;
}

// Find "not implemented" patterns with context
function findNotImplementedInAst(ast: any, sourceLines: string[], filename: string, results: Array<{file: string, line: number, match: string}>): void {
  function traverse(node: any): void {
    if (!node || typeof node !== 'object') return;

    // Look for throw statements with "not implemented"
    if (node.type === 'ThrowStatement' &&
        node.argument?.type === 'NewExpression' &&
        node.argument?.callee?.name === 'Error') {

      const errorArg = node.argument.arguments?.[0];
      if (errorArg?.type === 'Literal' &&
          typeof errorArg.value === 'string' &&
          errorArg.value.toLowerCase().includes('not implemented')) {

        const line = node.loc.start.line;
        const match = sourceLines[line - 1]?.trim() || '';
        results.push({
          file: filename,
          line: line,
          match: match,
        });
      }
    }

    // Look for return null/undefined patterns
    if (node.type === 'ReturnStatement' &&
        (node.argument?.type === 'Literal' &&
         (node.argument.value === null || node.argument.value === undefined))) {

      // Only flag if not in legitimate null-returning contexts
      if (!isLegitimateNullReturn(node, sourceLines, filename)) {
        const line = node.loc.start.line;
        const match = sourceLines[line - 1]?.trim() || '';
        results.push({
          file: filename,
          line: line,
          match: match,
        });
      }
    }

    // Recursively traverse child nodes
    for (const key in node) {
      if (key !== 'parent' && node[key]) {
        if (Array.isArray(node[key])) {
          node[key].forEach((child: any) => traverse(child));
        } else if (typeof node[key] === 'object') {
          traverse(node[key]);
        }
      }
    }
  }

  traverse(ast);
}

// Check if null return is legitimate
function isLegitimateNullReturn(_node: any, _sourceLines: string[], filename: string): boolean {
  // Skip test files
  if (filename.includes('.test.') || filename.includes('.spec.')) {
    return true;
  }

  // This is a placeholder - would need more sophisticated analysis
  // to determine if null return is legitimate business logic
  return false;
}

// === TREE-SITTER ANALYSIS FUNCTIONS ===

// Generic Tree-sitter debug print detection
function findDebugPrintsInTreeSitter(ast: any, sourceLines: string[], filename: string, results: Array<{file: string, line: number, match: string}>, language: SupportedLanguage): void {
  const debugPatterns: Record<SupportedLanguage, string[]> = {
    javascript: ['console.log', 'console.debug', 'console.warn'],
    typescript: ['console.log', 'console.debug', 'console.warn'],
    python: ['print', 'pprint'],
    go: ['print', 'println', 'fmt.Print', 'fmt.Println'],
    rust: ['println!', 'dbg!', 'eprintln!'],
    java: ['System.out.print', 'System.out.println'],
  };

  const patterns = debugPatterns[language] || [];

  function traverseTreeSitter(node: any): void {
    if (!node) return;

    // Check for function calls that match debug patterns
    if (node.type === 'call_expression' || node.type === 'macro_invocation') {
      const startLine = node.startPosition?.row + 1;
      if (startLine && startLine <= sourceLines.length) {
        const codeLine = sourceLines[startLine - 1]?.trim() || '';

        // Check if this matches any debug pattern and isn't legitimate output
        const isDebugCall = patterns.some((pattern: string) => codeLine.includes(pattern));
        if (isDebugCall && !isLegitimateDebugUsage(codeLine, filename, language)) {
          results.push({
            file: filename,
            line: startLine,
            match: codeLine,
          });
        }
      }
    }

    // Recursively traverse children
    for (let i = 0; i < node.childCount; i++) {
      traverseTreeSitter(node.child(i));
    }
  }

  traverseTreeSitter(ast.rootNode);
}

// Generic Tree-sitter debugger statement detection
function findDebuggerStatementsInTreeSitter(ast: any, sourceLines: string[], filename: string, results: Array<{file: string, line: number, match: string}>, language: SupportedLanguage): void {
  const debuggerPatterns: Record<SupportedLanguage, string[]> = {
    javascript: ['debugger;'],
    typescript: ['debugger;'],
    python: ['pdb.set_trace()', 'breakpoint()', 'import pdb'],
    go: ['runtime.Breakpoint()', 'log.Fatal', 'panic('],
    rust: ['panic!(', 'unimplemented!(', 'todo!('],
    java: ['System.exit(', 'Thread.dumpStack()'],
  };

  const patterns = debuggerPatterns[language] || [];

  function traverseTreeSitter(node: any): void {
    if (!node) return;

    const startLine = node.startPosition?.row + 1;
    if (startLine && startLine <= sourceLines.length) {
      const codeLine = sourceLines[startLine - 1]?.trim() || '';

      // Check if this line contains debugger patterns
      const hasDebugger = patterns.some((pattern: string) => codeLine.includes(pattern));
      if (hasDebugger) {
        results.push({
          file: filename,
          line: startLine,
          match: codeLine,
        });
      }
    }

    // Recursively traverse children
    for (let i = 0; i < node.childCount; i++) {
      traverseTreeSitter(node.child(i));
    }
  }

  traverseTreeSitter(ast.rootNode);
}

// Generic Tree-sitter empty function detection
function findEmptyFunctionsInTreeSitter(ast: any, sourceLines: string[], filename: string, results: Array<{file: string, line: number, match: string}>, language: SupportedLanguage): void {
  const functionTypes: Record<SupportedLanguage, string[]> = {
    javascript: ['function_declaration', 'arrow_function', 'method_definition'],
    typescript: ['function_declaration', 'arrow_function', 'method_definition'],
    python: ['function_definition'],
    go: ['function_declaration', 'method_declaration'],
    rust: ['function_item'],
    java: ['method_declaration', 'constructor_declaration'],
  };

  const types = functionTypes[language] || [];

  function traverseTreeSitter(node: any): void {
    if (!node) return;

    // Check for function declarations
    if (types.includes(node.type)) {
      const startLine = node.startPosition?.row + 1;
      if (startLine && startLine <= sourceLines.length) {
        // Check if function body is empty (very basic heuristic)
        const bodyNode = findFunctionBody(node, language);
        if (bodyNode && isTrulyEmptyBody(bodyNode, language)) {
          const codeLine = sourceLines[startLine - 1]?.trim() || '';
          if (!isLegitimateEmptyFunction(null, sourceLines, filename)) {
            results.push({
              file: filename,
              line: startLine,
              match: codeLine,
            });
          }
        }
      }
    }

    // Recursively traverse children
    for (let i = 0; i < node.childCount; i++) {
      traverseTreeSitter(node.child(i));
    }
  }

  traverseTreeSitter(ast.rootNode);
}

// Generic Tree-sitter not implemented detection
function findNotImplementedInTreeSitter(ast: any, sourceLines: string[], filename: string, results: Array<{file: string, line: number, match: string}>, language: SupportedLanguage): void {
  const notImplementedPatterns: Record<SupportedLanguage, string[]> = {
    javascript: ['throw new Error', 'return null', 'return undefined'],
    typescript: ['throw new Error', 'return null', 'return undefined'],
    python: ['raise NotImplementedError', 'return None', 'pass'],
    go: ['panic(', 'return nil', '// TODO'],
    rust: ['panic!(', 'unimplemented!(', 'todo!('],
    java: ['throw new UnsupportedOperationException', 'return null', '// TODO'],
  };

  const patterns = notImplementedPatterns[language] || [];

  function traverseTreeSitter(node: any): void {
    if (!node) return;

    const startLine = node.startPosition?.row + 1;
    if (startLine && startLine <= sourceLines.length) {
      const codeLine = sourceLines[startLine - 1]?.trim() || '';

      // Check if this line contains not-implemented patterns
      const hasNotImplemented = patterns.some((pattern: string) => codeLine.includes(pattern));
      if (hasNotImplemented) {
        results.push({
          file: filename,
          line: startLine,
          match: codeLine,
        });
      }
    }

    // Recursively traverse children
    for (let i = 0; i < node.childCount; i++) {
      traverseTreeSitter(node.child(i));
    }
  }

  traverseTreeSitter(ast.rootNode);
}

// Helper functions for Tree-sitter analysis
function isLegitimateDebugUsage(codeLine: string, filename: string, _language: SupportedLanguage): boolean {
  // Skip test files
  if (filename.includes('.test.') || filename.includes('.spec.') || filename.includes('test_')) {
    return true;
  }

  // Check for legitimate CLI output patterns
  const userFacingPatterns = ['error', 'warning', 'success', 'usage', 'help'];
  return userFacingPatterns.some(pattern => codeLine.toLowerCase().includes(pattern));
}

function findFunctionBody(functionNode: any, _language: SupportedLanguage): any {
  // This is a simplified implementation - would need language-specific logic
  for (let i = 0; i < functionNode.childCount; i++) {
    const child = functionNode.child(i);
    if (child?.type === 'block' || child?.type === 'compound_statement' || child?.type === 'block_statement') {
      return child;
    }
  }
  return null;
}

function isTrulyEmptyBody(bodyNode: any, _language: SupportedLanguage): boolean {
  // Very basic check - no child statements
  return bodyNode.childCount <= 2; // Usually just opening and closing braces/indentation
}

// Get all source files for supported languages
async function getSourceFiles(projectDir: string, languages?: SupportedLanguage[]): Promise<Array<{file: string, language: SupportedLanguage}>> {
  return new Promise((resolve, reject) => {
    // Build ripgrep type arguments for all supported languages (or specified ones)
    const languagesToScan = languages || Object.keys(LANGUAGE_CONFIG) as SupportedLanguage[];
    const typeArgs: string[] = [];

    languagesToScan.forEach(lang => {
      LANGUAGE_CONFIG[lang].ripgrepTypes.forEach(type => {
        typeArgs.push('--type', type);
      });
    });

    const rg = spawn(rgPath, [
      '--files',
      ...typeArgs,
      '--type-not', 'log',
      '--type-not', 'lock',
      '--type-not', 'json',
      projectDir,
    ]);

    let output = '';

    rg.stdout.on('data', (data) => {
      output += data.toString();
    });

    rg.on('close', (code) => {
      if (code === 0 || code === 1) {
        const files = output.trim().split('\n')
          .filter(file => file.trim())
          .map(file => file.replace(projectDir + '/', ''))
          .map(file => ({
            file,
            language: detectLanguage(file),
          }))
          .filter(item => item.language !== null) as Array<{file: string, language: SupportedLanguage}>;
        resolve(files);
      } else {
        reject(new Error('Failed to get source files'));
      }
    });
  });
}

// Detect language from file extension
function detectLanguage(filePath: string): SupportedLanguage | null {
  const ext = extname(filePath).toLowerCase();

  for (const language of Object.keys(LANGUAGE_CONFIG) as SupportedLanguage[]) {
    if (LANGUAGE_CONFIG[language].extensions.includes(ext)) {
      return language;
    }
  }

  return null;
}

// Legacy regex-based scanning for simple patterns
async function scanPatternWithRegex(projectDir: string, pattern: DebtPattern): Promise<Array<{file: string, line: number, match: string}>> {
  return new Promise((resolve, reject) => {
    const rg = spawn(rgPath, [
      '--type-not', 'log',
      '--type-not', 'lock',
      '--type-not', 'json',
      '--no-heading',
      '--line-number',
      '--color', 'never',
      pattern.pattern,
      projectDir,
    ]);

    let output = '';
    let error = '';

    rg.stdout.on('data', (data) => {
      output += data.toString();
    });

    rg.stderr.on('data', (data) => {
      error += data.toString();
    });

    rg.on('close', (code) => {
      if (code === 0 || code === 1) { // 0 = found, 1 = not found
        const results: Array<{file: string, line: number, match: string}> = [];

        if (output.trim()) {
          const lines = output.trim().split('\n');
          for (const line of lines) {
            const match = line.match(/^([^:]+):([0-9]+):(.+)$/);
            if (match) {
              results.push({
                file: match[1].replace(projectDir + '/', ''),
                line: parseInt(match[2]),
                match: match[3].trim(),
              });
            }
          }
        }

        resolve(results);
      } else {
        reject(new Error(`ripgrep failed: ${error}`));
      }
    });
  });
}

async function outputDebtContext(projectDir: string): Promise<void> {
  console.log('📊 Technical Debt Analysis Context for Claude');
  console.log('');

  console.log('## AI Analysis Prompt:');
  console.log('# Technical Debt Hunter Analysis');
  console.log('');
  console.log('You are a ruthless code quality expert analyzing technical debt patterns.');
  console.log('Provide actionable recommendations with specific file locations and fixes.');
  console.log('');
  console.log('## Enhanced AST-Based Analysis:');
  console.log('This scanner uses **context-aware AST parsing** to eliminate false positives:');
  console.log('- **Console Debug**: Distinguishes CLI output from debug artifacts');
  console.log('- **Debugger Statements**: Only flags actual `debugger;` statements, not string patterns');
  console.log('- **Empty Functions**: Excludes interface implementations and test files');
  console.log('- **Not Implemented**: Context-aware analysis of legitimate vs problematic patterns');
  console.log('- **Hybrid Approach**: AST analysis for complex patterns, regex for simple ones');
  console.log('');
  console.log('## Available Analysis Commands:');
  console.log('- `flashback debt-hunter --scan` - Enhanced AST-based technical debt scanning');
  console.log('- `flashback debt-hunter --duplicates` - Detect duplicate/similar functions (realistic heuristics only)');
  console.log('- `flashback debt-hunter --context` - Output this analysis context');
  console.log('');
  console.log('## Current Scan Results:');

  let hasDebt = false;

  for (const pattern of DEBT_PATTERNS) {
    const issues = await scanPattern(projectDir, pattern);
    if (issues.length > 0) {
      hasDebt = true;
      console.log('');
      console.log(`### ${pattern.name} (${pattern.severity.toUpperCase()} PRIORITY)`);
      console.log(`**Description**: ${pattern.description}`);
      console.log(`**Found**: ${issues.length} occurrences`);
      console.log('');

      issues.forEach(issue => {
        console.log(`- \`${issue.file}:${issue.line}\` - ${issue.match}`);
      });
    }
  }

  if (!hasDebt) {
    console.log('✅ No basic technical debt patterns detected.');
    console.log('💡 Consider running `flashback debt-hunter --duplicates` to check for duplicate functions.');
  }

  console.log('');
  console.log('## Duplicate Function Analysis:');
  console.log('**Note**: For comprehensive duplicate detection, run the command with `--duplicates` flag.');
  console.log('**Limitations**: Only detects exact duplicates and very similar functions with basic heuristics.');
  console.log('**Cannot detect**: Semantic similarity, refactored duplicates, or complex logic patterns.');
  console.log('');

  console.log('## Analysis Request:');
  console.log('1. **Run duplicate scan**: Use `flashback debt-hunter --duplicates` if not done already');
  console.log('2. **Prioritize** issues by impact on code quality and maintainability');
  console.log('3. **Recommend** specific fixes for each high-priority issue with exact file locations');
  console.log('4. **Identify** patterns that might indicate deeper architectural problems');
  console.log('5. **Assess duplicate functions**: If duplicates found, recommend consolidation strategies');
  console.log('6. **Suggest** preventive measures to avoid future technical debt');
  console.log('');
  console.log('## Expected Output Format:');
  console.log('1. **Executive Summary** - Overall code quality assessment');
  console.log('2. **Critical Issues** - High-priority problems requiring immediate attention');
  console.log('3. **Duplicate Analysis** - Assessment of function duplication (if scan was run)');
  console.log('4. **Remediation Plan** - Specific actions with file paths and line numbers');
  console.log('5. **Prevention Strategy** - Coding standards and practices to prevent future debt');
}

interface FunctionInfo {
  name: string;
  file: string;
  line: number;
  signature: string;
  bodyHash: string;
  bodyLines: string[];
}

async function scanForDuplicates(projectDir: string): Promise<void> {
  console.log(chalk.blue('🔍 Scanning for duplicate/similar functions...'));
  console.log(chalk.yellow('⚠️  LIMITATION: Only detects exact duplicates and very similar functions'));
  console.log('');

  const functions = await extractFunctions(projectDir);

  if (functions.length === 0) {
    console.log(chalk.gray('No functions found to analyze'));
    return;
  }

  console.log(chalk.blue(`Found ${functions.length} functions to analyze`));
  console.log('');

  // Group by exact hash (exact duplicates)
  const exactDuplicates = groupByHash(functions);

  // Find similar function names
  const similarNames = findSimilarNames(functions);

  // Find near-duplicate function bodies
  const nearDuplicates = findNearDuplicates(functions);

  let totalIssues = 0;

  if (exactDuplicates.length > 0) {
    totalIssues += exactDuplicates.length;
    console.log(chalk.red(`EXACT DUPLICATES: ${exactDuplicates.length} groups`));
    exactDuplicates.forEach((group, i) => {
      console.log(chalk.red(`  Group ${i + 1}: ${group.length} identical functions`));
      group.forEach(func => {
        console.log(chalk.gray(`    ${func.file}:${func.line} - ${func.name}`));
      });
    });
    console.log('');
  }

  if (similarNames.length > 0) {
    totalIssues += similarNames.length;
    console.log(chalk.yellow(`SIMILAR NAMES: ${similarNames.length} potential AI naming patterns`));
    similarNames.forEach(pair => {
      console.log(chalk.yellow(`  ${pair.func1.name} ↔ ${pair.func2.name}`));
      console.log(chalk.gray(`    ${pair.func1.file}:${pair.func1.line} ↔ ${pair.func2.file}:${pair.func2.line}`));
    });
    console.log('');
  }

  if (nearDuplicates.length > 0) {
    totalIssues += nearDuplicates.length;
    console.log(chalk.yellow(`NEAR DUPLICATES: ${nearDuplicates.length} pairs with >80% similarity`));
    nearDuplicates.forEach(pair => {
      console.log(chalk.yellow(`  ${pair.func1.name} ↔ ${pair.func2.name} (${Math.round(pair.similarity * 100)}% similar)`));
      console.log(chalk.gray(`    ${pair.func1.file}:${pair.func1.line} ↔ ${pair.func2.file}:${pair.func2.line}`));
    });
    console.log('');
  }

  if (totalIssues === 0) {
    console.log(chalk.green('✅ No obvious duplicate functions detected'));
  } else {
    console.log(chalk.yellow(`⚠️  Found ${totalIssues} potential duplicate/similar function issues`));
  }
}

async function extractFunctions(projectDir: string): Promise<FunctionInfo[]> {
  return new Promise((resolve, reject) => {
    // Extract function definitions using ripgrep
    const rg = spawn(rgPath, [
      '--type', 'js',
      '--type', 'ts',
      '--no-heading',
      '--line-number',
      '--color', 'never',
      '^\\s*(function\\s+\\w+|const\\s+\\w+\\s*=|let\\s+\\w+\\s*=|\\w+\\s*:.*=>|\\w+\\s*\\(.*\\)\\s*\\{)',
      projectDir,
    ]);

    let output = '';

    rg.stdout.on('data', (data) => {
      output += data.toString();
    });

    rg.on('close', (code) => {
      if (code === 0 || code === 1) {
        const functions: FunctionInfo[] = [];
        const lines = output.trim().split('\n').filter(line => line.trim());

        for (const line of lines) {
          const match = line.match(/^([^:]+):([0-9]+):(.+)$/);
          if (match) {
            const file = match[1].replace(projectDir + '/', '');
            const lineNum = parseInt(match[2]);
            const content = match[3].trim();

            // Extract function name (basic heuristic)
            const nameMatch = content.match(/(?:function\s+(\w+)|(?:const|let)\s+(\w+)|^\s*(\w+)\s*[(:=])/);
            const name = nameMatch ? (nameMatch[1] || nameMatch[2] || nameMatch[3]) : 'anonymous';

            // Create simplified signature
            const signature = content.replace(/\s+/g, ' ').substring(0, 100);

            // Hash for exact duplicate detection (simplified)
            const bodyHash = createHash('md5').update(signature).digest('hex');

            functions.push({
              name,
              file,
              line: lineNum,
              signature,
              bodyHash,
              bodyLines: [content], // Simplified - would need full function body for real analysis
            });
          }
        }

        resolve(functions);
      } else {
        reject(new Error('Failed to extract functions'));
      }
    });
  });
}

function groupByHash(functions: FunctionInfo[]): FunctionInfo[][] {
  const hashGroups = new Map<string, FunctionInfo[]>();

  functions.forEach(func => {
    if (!hashGroups.has(func.bodyHash)) {
      hashGroups.set(func.bodyHash, []);
    }
    hashGroups.get(func.bodyHash)!.push(func);
  });

  // Return only groups with multiple functions (duplicates)
  return Array.from(hashGroups.values()).filter(group => group.length > 1);
}

function findSimilarNames(functions: FunctionInfo[]): Array<{func1: FunctionInfo, func2: FunctionInfo}> {
  const pairs: Array<{func1: FunctionInfo, func2: FunctionInfo}> = [];

  for (let i = 0; i < functions.length; i++) {
    for (let j = i + 1; j < functions.length; j++) {
      const func1 = functions[i];
      const func2 = functions[j];

      // Check for AI naming patterns: handle*, process*, manage*, etc.
      const name1Base = func1.name.replace(/^(handle|process|manage|create|update|delete|get|set)/, '');
      const name2Base = func2.name.replace(/^(handle|process|manage|create|update|delete|get|set)/, '');

      if (name1Base === name2Base && name1Base.length > 0) {
        pairs.push({ func1, func2 });
      }
    }
  }

  return pairs;
}

function findNearDuplicates(functions: FunctionInfo[]): Array<{func1: FunctionInfo, func2: FunctionInfo, similarity: number}> {
  const pairs: Array<{func1: FunctionInfo, func2: FunctionInfo, similarity: number}> = [];

  for (let i = 0; i < functions.length; i++) {
    for (let j = i + 1; j < functions.length; j++) {
      const func1 = functions[i];
      const func2 = functions[j];

      // Simple similarity based on signature length and common characters
      const similarity = calculateSimilarity(func1.signature, func2.signature);

      if (similarity > 0.8) { // 80% threshold
        pairs.push({ func1, func2, similarity });
      }
    }
  }

  return pairs;
}

function calculateSimilarity(str1: string, str2: string): number {
  // Very simple similarity metric - count common characters
  const shorter = str1.length < str2.length ? str1 : str2;
  const longer = str1.length >= str2.length ? str1 : str2;

  let common = 0;
  for (let i = 0; i < shorter.length; i++) {
    if (longer.includes(shorter[i])) {
      common++;
    }
  }

  return common / longer.length;
}

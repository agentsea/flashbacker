# CLEANUP-001: Fix Prompt Template Architecture Disaster

**Status**: 🚨 CRITICAL CLEANUP REQUIRED  
**Priority**: HIGHEST  
**Estimated Effort**: 4 hours  
**Issue**: Hardcoded prompts vs orphaned templates - complete architecture mess

## Problem Statement

**ARCHITECTURE VIOLATION**: AutoContextManager uses hardcoded prompts instead of loading from template system.

**Correct Flow**: 
1. Templates in `templates/.claude/flashback/prompts/` get copied during init to user's `.claude/flashback/prompts/`
2. AutoContextManager should load templates from `.claude/flashback/prompts/` (project-relative)
3. Templates need proper Claude instructions and variable replacement

**Current Problem**: Code bypasses template system with hardcoded console.log() prompts.

## Cleanup Tasks

### 1. Fix Templates to Include Claude Instructions
**Files**: `templates/.claude/flashback/prompts/*.md`
**Task**: Update templates with proper Claude behavior instructions

- [ ] 1.1 Update update-todo-chain.md with "Tell the user:" and Claude instructions
- [ ] 1.2 Update restore-context.md with proper Claude behavior guidance
- [ ] 1.3 Update emergency-save.md with user notification instructions
- [ ] 1.4 Update session-restore.md with continuity instructions

### 2. Implement Proper Template Loading
**File**: `src/utils/prompt-template-loader.ts` (CREATE)
**Task**: Load templates from relative paths

- [ ] 2.1 Create loadPromptTemplate() function
- [ ] 2.2 Support variable replacement ({{TOKEN_PERCENTAGE}}, {{RECENT_COMMITS}})
- [ ] 2.3 Use relative paths: `.claude/flashback/prompts/update-todo-chain.md`
- [ ] 2.4 Add error handling for missing templates

### 3. Remove Hardcoded Prompts from AutoContextManager
**File**: `src/core/auto-context-manager.ts`
**Task**: Replace hardcoded console.log() with template loading

- [ ] 3.1 Update outputTodoUpdatePrompt() to load update-todo-chain.md template
- [ ] 3.2 Update outputContextRestorePrompt() to load restore-context.md template
- [ ] 3.3 Add variable replacement for dynamic content
- [ ] 3.4 Use project-relative paths: `.claude/flashback/prompts/`

### 4. Fix Template Content for Claude Instructions
**Files**: `templates/.claude/flashback/prompts/*.md`
**Task**: Ensure templates instruct Claude properly

- [ ] 4.1 Add "Tell the user:" instructions to templates
- [ ] 4.2 Include Claude behavior instructions like session-start
- [ ] 4.3 Add proper user notification messaging
- [ ] 4.4 Test templates produce correct Claude responses

### 5. Template Path Architecture
**Approach**: Templates get installed to `.claude/flashback/prompts/` during init

**Loading Strategy**:
```typescript
// CORRECT: Relative path from project
const templatePath = path.join(projectDir, '.claude', 'flashback', 'prompts', 'update-todo-chain.md');

// WRONG: Absolute paths or hardcoded content
const hardcodedBullshit = `console.log("hardcoded prompt text")`;
```

## Template Variable System

### Variables to Support:
- `{{TOKEN_PERCENTAGE}}` - Current context percentage
- `{{CURRENT_TOKENS}}` - Current token count
- `{{MAX_TOKENS}}` - Model context window
- `{{SESSION_ID}}` - Current session ID
- `{{RECENT_COMMITS}}` - Recent git commits
- `{{TODO_CHAIN_CONTENT}}` - Current TODO_CHAIN.md content
- `{{REMEMBER_CONTENT}}` - REMEMBER.md content
- `{{WORKING_PLAN_CONTENT}}` - WORKING_PLAN.md content

### Template Loading Function:
```typescript
async function loadPromptTemplate(
  projectDir: string, 
  templateName: string, 
  variables: Record<string, string>
): Promise<string> {
  const templatePath = path.join(projectDir, '.claude', 'flashback', 'prompts', `${templateName}.md`);
  let content = await fs.readFile(templatePath, 'utf8');
  
  // Replace all variables
  for (const [key, value] of Object.entries(variables)) {
    content = content.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }
  
  return content;
}
```

## Success Criteria

### Acceptance Criteria
1. **No Hardcoded Prompts**: All prompts loaded from template files
2. **Relative Paths**: Templates loaded from `.claude/flashback/prompts/` (project-relative)
3. **Variable Replacement**: Templates support dynamic content replacement
4. **Claude Instructions**: Templates include proper instructions for Claude behavior
5. **User Messaging**: Claude informed to notify user about auto-context triggers

### Architecture Compliance
- **Template-Driven**: Zero hardcoded prompt content
- **Proper Separation**: Code handles logic, templates handle content
- **Variable System**: Dynamic content replacement
- **Project-Relative**: No absolute paths, works for all users

---
*Cleanup required: Fix broken prompt architecture and implement proper template system*
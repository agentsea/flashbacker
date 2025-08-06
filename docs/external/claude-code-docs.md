# Claude Code Documentation

Generated on: 2025-07-31T19:28:25.933Z
Base URL: https://docs.anthropic.com/en/docs/claude-code/overview
URL Pattern: https://docs.anthropic.com/en/docs/claude-code

## Documentation Content

### Claude Code overview - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/overview

Claude Code overview - Anthropic Anthropic home page English Search... Search... Navigation Getting started Claude Code overview Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance ​ Get started in 30 seconds Prerequisites: Node.js 18 or newer 

```
# Install Claude Code
npm install -g @anthropic-ai/claude-code
<!-- -->
# Navigate to your project
cd your-awesome-project
<!-- -->
# Start coding with Claude
claude
```

 That’s it! You’re ready to start coding with Claude. Continue with Quickstart (5 mins) → (Got specific setup needs or hit issues? See advanced setup or troubleshooting .) ​ What Claude Code does for you Build features from descriptions : Tell Claude what you want to build in plain English. It will make a plan, write the code, and ensure it works. Debug and fix issues : Describe a bug or paste an error message. Claude Code will analyze your codebase, identify the problem, and implement a fix. Navigate any codebase : Ask anything about your team’s codebase, and get a thoughtful answer back. Claude Code maintains awareness of your entire project structure, can find up-to-date information from the web, and with MCP can pull from external datasources like Google Drive, Figma, and Slack. Automate tedious tasks : Fix fiddly lint issues, resolve merge conflicts, and write release notes. Do all this in a single command from your developer machines, or automatically in CI. ​ Why developers love Claude Code Works in your terminal : Not another chat window. Not another IDE. Claude Code meets you where you already work, with the tools you already love. Takes action : Claude Code can directly edit files, run commands, and create commits. Need more? MCP lets Claude read your design docs in Google Drive, update your tickets in Jira, or use your custom developer tooling. Unix philosophy : Claude Code is composable and scriptable. `tail -f app.log | claude -p "Slack me if you see any anomalies appear in this log stream"` works . Your CI can run `claude -p "If there are new text strings, translate them into French and raise a PR for @lang-fr-team to review"`. Enterprise-ready : Use Anthropic’s API, or host on AWS or GCP. Enterprise-grade security , privacy , and compliance is built-in. ​ Next steps Quickstart See Claude Code in action with practical examples Common workflows Step-by-step guides for common workflows Troubleshooting Solutions for common issues with Claude Code IDE setup Add Claude Code to your IDE ​ Additional resources Host on AWS or GCP Configure Claude Code with Amazon Bedrock or Google Vertex AI Settings Customize Claude Code for your workflow Commands Learn about CLI commands and controls Reference implementation Clone our development container reference implementation Security Discover Claude Code’s safeguards and best practices for safe usage Privacy and data usage Understand how Claude Code handles your data Was this page helpful? Yes No Quickstart On this page Get started in 30 seconds What Claude Code does for you Why developers love Claude Code Next steps Additional resources

---

### Quickstart - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/quickstart

Quickstart - Anthropic Anthropic home page English Search... Search... Navigation Getting started Quickstart Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Data usage Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Legal and compliance This quickstart guide will have you using AI-powered coding assistance in just a few minutes. By the end, you’ll understand how to use Claude Code for common development tasks. ​ Before you begin Make sure you have: A terminal or command prompt open Node.js 18 or newer installed A code project to work with ​ Step 1: Install Claude Code To install Claude Code, run the following command: 

```
npm install -g @anthropic-ai/claude-code
```

 ​ Step 2: Start your first session Open your terminal in any project directory and start Claude Code: 

```
cd /path/to/your/project
claude
```

 You’ll see the Claude Code prompt inside a new interactive session: 

```
✻ Welcome to Claude Code!
<!-- -->
...
<!-- -->
> Try "create a util logging.py that..."
```

 Your credentials are securely stored on your system. Learn more in Credential Management . ​ Step 3: Ask your first question Let’s start with understanding your codebase. Try one of these commands: 

```
> what does this project do?
```

 Claude will analyze your files and provide a summary. You can also ask more specific questions: 

```
> what technologies does this project use?
```

 

```
> where is the main entry point?
```

 

```
> explain the folder structure
```

 You can also ask Claude about its own capabilities: 

```
> what can Claude Code do?
```

 

```
> how do I use slash commands in Claude Code?
```

 

```
> can Claude Code work with Docker?
```

 Claude Code reads your files as needed - you don’t have to manually add context. Claude also has access to its own documentation and can answer questions about its features and capabilities. ​ Step 4: Make your first code change Now let’s make Claude Code do some actual coding. Try a simple task: 

```
> add a hello world function to the main file
```

 Claude Code will: Find the appropriate file Show you the proposed changes Ask for your approval Make the edit Claude Code always asks for permission before modifying files. You can approve individual changes or enable “Accept all” mode for a session. ​ Step 5: Use Git with Claude Code Claude Code makes Git operations conversational: 

```
> what files have I changed?
```

 

```
> commit my changes with a descriptive message
```

 You can also prompt for more complex Git operations: 

```
> create a new branch called feature/quickstart
```

 

```
> show me the last 5 commits
```

 

```
> help me resolve merge conflicts
```

 ​ Step 6: Fix a bug or add a feature Claude is proficient at debugging and feature implementation. Describe what you want in natural language: 

```
> add input validation to the user registration form
```

 Or fix existing issues: 

```
> there's a bug where users can submit empty forms - fix it
```

 Claude Code will: Locate the relevant code Understand the context Implement a solution Run tests if available ​ Step 7: Test out other common workflows There are a number of ways to work with Claude: Refactor code 

```
> refactor the authentication module to use async/await instead of callbacks
```

 Write tests 

```
> write unit tests for the calculator functions
```

 Update documentation 

```
> update the README with installation instructions
```

 Code review 

```
> review my changes and suggest improvements
```

 Remember : Claude Code is your AI pair programmer. Talk to it like you would a helpful colleague - describe what you want to achieve, and it will help you get there. ​ Essential commands Here are the most important commands for daily use: Command What it does Example `claude` Start interactive mode `claude` `claude "task"` Run a one-time task `claude "fix the build error"` `claude -p "query"` Run one-off query, then exit `claude -p "explain this function"` `claude -c` Continue most recent conversation `claude -c` `claude -r` Resume a previous conversation `claude -r` `claude commit` Create a Git commit `claude commit` `/clear` Clear conversation history `> /clear` `/help` Show available commands `> /help` `exit` or Ctrl+C Exit Claude Code `> exit` See the CLI reference for a complete list of commands. ​ Pro tips for beginners Be specific with your requests Instead of: “fix the bug” Try: “fix the login bug where users see a blank screen after entering wrong credentials” Use step-by-step instructions Break complex tasks into steps: 

```
> 1. create a new database table for user profiles
```

 

```
> 2. create an API endpoint to get and update user profiles
```

 

```
> 3. build a webpage that allows users to see and edit their information
```

 Let Claude explore first Before making changes, let Claude understand your code: 

```
> analyze the database schema
```

 

```
> build a dashboard showing products that are most frequently returned by our UK customers
```

 Save time with shortcuts Use Tab for command completion Press ↑ for command history Type `/` to see all slash commands ​ What’s next? Now that you’ve learned the basics, explore more advanced features: Common workflows Step-by-step guides for common tasks CLI reference Master all commands and options Configuration Customize Claude Code for your workflow ​ Getting help In Claude Code : Type `/help` or ask “how do I…” Documentation : You’re here! Browse other guides Community : Join our Discord for tips and support Was this page helpful? Yes No Overview Common workflows On this page Before you begin Step 1: Install Claude Code Step 2: Start your first session Step 3: Ask your first question Step 4: Make your first code change Step 5: Use Git with Claude Code Step 6: Fix a bug or add a feature Step 7: Test out other common workflows Essential commands Pro tips for beginners What’s next? Getting help

---

### Common workflows - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/common-workflows

Common workflows - Anthropic Anthropic home page English Search... Search... Navigation Getting started Common workflows Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance Each task in this document includes clear instructions, example commands, and best practices to help you get the most from Claude Code. ​ Understand new codebases ​ Get a quick codebase overview Suppose you’ve just joined a new project and need to understand its structure quickly. 1 Navigate to the project root directory 

```
cd /path/to/project
```

 2 Start Claude Code 

```
claude
```

 3 Ask for a high-level overview 

```
> give me an overview of this codebase
```

 4 Dive deeper into specific components 

```
> explain the main architecture patterns used here
```

 

```
> what are the key data models?
```

 

```
> how is authentication handled?
```

 Tips: Start with broad questions, then narrow down to specific areas Ask about coding conventions and patterns used in the project Request a glossary of project-specific terms ​ Find relevant code Suppose you need to locate code related to a specific feature or functionality. 1 Ask Claude to find relevant files 

```
> find the files that handle user authentication
```

 2 Get context on how components interact 

```
> how do these authentication files work together?
```

 3 Understand the execution flow 

```
> trace the login process from front-end to database
```

 Tips: Be specific about what you’re looking for Use domain language from the project ​ Fix bugs efficiently Suppose you’ve encountered an error message and need to find and fix its source. 1 Share the error with Claude 

```
> I'm seeing an error when I run npm test
```

 2 Ask for fix recommendations 

```
> suggest a few ways to fix the @ts-ignore in user.ts
```

 3 Apply the fix 

```
> update user.ts to add the null check you suggested
```

 Tips: Tell Claude the command to reproduce the issue and get a stack trace Mention any steps to reproduce the error Let Claude know if the error is intermittent or consistent ​ Refactor code Suppose you need to update old code to use modern patterns and practices. 1 Identify legacy code for refactoring 

```
> find deprecated API usage in our codebase
```

 2 Get refactoring recommendations 

```
> suggest how to refactor utils.js to use modern JavaScript features
```

 3 Apply the changes safely 

```
> refactor utils.js to use ES2024 features while maintaining the same behavior
```

 4 Verify the refactoring 

```
> run tests for the refactored code
```

 Tips: Ask Claude to explain the benefits of the modern approach Request that changes maintain backward compatibility when needed Do refactoring in small, testable increments ​ Use specialized subagents Suppose you want to use specialized AI subagents to handle specific tasks more effectively. 1 View available subagents 

```
> /agents
```

 This shows all available subagents and lets you create new ones. 2 Use subagents automatically Claude Code will automatically delegate appropriate tasks to specialized subagents: 

```
> review my recent code changes for security issues
```

 

```
> run all tests and fix any failures
```

 3 Explicitly request specific subagents 

```
> use the code-reviewer subagent to check the auth module
```

 

```
> have the debugger subagent investigate why users can't log in
```

 4 Create custom subagents for your workflow 

```
> /agents
```

 Then select “Create New subagent” and follow the prompts to define: Subagent type (e.g., `api-designer`, `performance-optimizer`) When to use it Which tools it can access Its specialized system prompt Tips: Create project-specific subagents in `.claude/agents/` for team sharing Use descriptive `description` fields to enable automatic delegation Limit tool access to what each subagent actually needs Check the subagents documentation for detailed examples ​ Work with tests Suppose you need to add tests for uncovered code. 1 Identify untested code 

```
> find functions in NotificationsService.swift that are not covered by tests
```

 2 Generate test scaffolding 

```
> add tests for the notification service
```

 3 Add meaningful test cases 

```
> add test cases for edge conditions in the notification service
```

 4 Run and verify tests 

```
> run the new tests and fix any failures
```

 Tips: Ask for tests that cover edge cases and error conditions Request both unit and integration tests when appropriate Have Claude explain the testing strategy ​ Create pull requests Suppose you need to create a well-documented pull request for your changes. 1 Summarize your changes 

```
> summarize the changes I've made to the authentication module
```

 2 Generate a PR with Claude 

```
> create a pr
```

 3 Review and refine 

```
> enhance the PR description with more context about the security improvements
```

 4 Add testing details 

```
> add information about how these changes were tested
```

 Tips: Ask Claude directly to make a PR for you Review Claude’s generated PR before submitting Ask Claude to highlight potential risks or considerations ​ Handle documentation Suppose you need to add or update documentation for your code. 1 Identify undocumented code 

```
> find functions without proper JSDoc comments in the auth module
```

 2 Generate documentation 

```
> add JSDoc comments to the undocumented functions in auth.js
```

 3 Review and enhance 

```
> improve the generated documentation with more context and examples
```

 4 Verify documentation 

```
> check if the documentation follows our project standards
```

 Tips: Specify the documentation style you want (JSDoc, docstrings, etc.) Ask for examples in the documentation Request documentation for public APIs, interfaces, and complex logic ​ Work with images Suppose you need to work with images in your codebase, and you want Claude’s help analyzing image content. 1 Add an image to the conversation You can use any of these methods: Drag and drop an image into the Claude Code window Copy an image and paste it into the CLI with ctrl+v (Do not use cmd+v) Provide an image path to Claude. E.g., “Analyze this image: /path/to/your/image.png” 2 Ask Claude to analyze the image 

```
> What does this image show?
```

 

```
> Describe the UI elements in this screenshot
```

 

```
> Are there any problematic elements in this diagram?
```

 3 Use images for context 

```
> Here's a screenshot of the error. What's causing it?
```

 

```
> This is our current database schema. How should we modify it for the new feature?
```

 4 Get code suggestions from visual content 

```
> Generate CSS to match this design mockup
```

 

```
> What HTML structure would recreate this component?
```

 Tips: Use images when text descriptions would be unclear or cumbersome Include screenshots of errors, UI designs, or diagrams for better context You can work with multiple images in a conversation Image analysis works with diagrams, screenshots, mockups, and more ​ Reference files and directories Use @ to quickly include files or directories without waiting for Claude to read them. 1 Reference a single file 

```
> Explain the logic in @src/utils/auth.js
```

 This includes the full content of the file in the conversation. 2 Reference a directory 

```
> What's the structure of @src/components?
```

 This provides a directory listing with file information. 3 Reference MCP resources 

```
> Show me the data from @github:repos/owner/repo/issues
```

 This fetches data from connected MCP servers using the format @server:resource. See MCP resources for details. Tips: File paths can be relative or absolute @ file references add CLAUDE.md in the file’s directory and parent directories to context Directory references show file listings, not contents You can reference multiple files in a single message (e.g., “@file1.js and @file2.js”) ​ Use extended thinking Suppose you’re working on complex architectural decisions, challenging bugs, or planning multi-step implementations that require deep reasoning. 1 Provide context and ask Claude to think 

```
> I need to implement a new authentication system using OAuth2 for our API. Think deeply about the best approach for implementing this in our codebase.
```

 Claude will gather relevant information from your codebase and use extended thinking, which will be visible in the interface. 2 Refine the thinking with follow-up prompts 

```
> think about potential security vulnerabilities in this approach
```

 

```
> think harder about edge cases we should handle
```

 Tips to get the most value out of extended thinking: Extended thinking is most valuable for complex tasks such as: Planning complex architectural changes Debugging intricate issues Creating implementation plans for new features Understanding complex codebases Evaluating tradeoffs between different approaches The way you prompt for thinking results in varying levels of thinking depth: “think” triggers basic extended thinking intensifying phrases such as “think more”, “think a lot”, “think harder”, or “think longer” triggers deeper thinking For more extended thinking prompting tips, see Extended thinking tips . Claude will display its thinking process as italic gray text above the response. ​ Resume previous conversations Suppose you’ve been working on a task with Claude Code and need to continue where you left off in a later session. Claude Code provides two options for resuming previous conversations: `--continue` to automatically continue the most recent conversation `--resume` to display a conversation picker 1 Continue the most recent conversation 

```
claude --continue
```

 This immediately resumes your most recent conversation without any prompts. 2 Continue in non-interactive mode 

```
claude --continue --print "Continue with my task"
```

 Use `--print` with `--continue` to resume the most recent conversation in non-interactive mode, perfect for scripts or automation. 3 Show conversation picker 

```
claude --resume
```

 This displays an interactive conversation selector showing: Conversation start time Initial prompt or conversation summary Message count Use arrow keys to navigate and press Enter to select a conversation. Tips: Conversation history is stored locally on your machine Use `--continue` for quick access to your most recent conversation Use `--resume` when you need to select a specific past conversation When resuming, you’ll see the entire conversation history before continuing The resumed conversation starts with the same model and configuration as the original How it works: Conversation Storage : All conversations are automatically saved locally with their full message history Message Deserialization : When resuming, the entire message history is restored to maintain context Tool State : Tool usage and results from the previous conversation are preserved Context Restoration : The conversation resumes with all previous context intact Examples: 

```
# Continue most recent conversation
claude --continue
<!-- -->
# Continue most recent conversation with a specific prompt
claude --continue --print "Show me our progress"
<!-- -->
# Show conversation picker
claude --resume
<!-- -->
# Continue most recent conversation in non-interactive mode
claude --continue --print "Run the tests again"
```

 ​ Run parallel Claude Code sessions with Git worktrees Suppose you need to work on multiple tasks simultaneously with complete code isolation between Claude Code instances. 1 Understand Git worktrees Git worktrees allow you to check out multiple branches from the same repository into separate directories. Each worktree has its own working directory with isolated files, while sharing the same Git history. Learn more in the official Git worktree documentation . 2 Create a new worktree 

```
# Create a new worktree with a new branch 
git worktree add ../project-feature-a -b feature-a
<!-- -->
# Or create a worktree with an existing branch
git worktree add ../project-bugfix bugfix-123
```

 This creates a new directory with a separate working copy of your repository. 3 Run Claude Code in each worktree 

```
# Navigate to your worktree 
cd ../project-feature-a
<!-- -->
# Run Claude Code in this isolated environment
claude
```

 4 Run Claude in another worktree 

```
cd ../project-bugfix
claude
```

 5 Manage your worktrees 

```
# List all worktrees
git worktree list
<!-- -->
# Remove a worktree when done
git worktree remove ../project-feature-a
```

 Tips: Each worktree has its own independent file state, making it perfect for parallel Claude Code sessions Changes made in one worktree won’t affect others, preventing Claude instances from interfering with each other All worktrees share the same Git history and remote connections For long-running tasks, you can have Claude working in one worktree while you continue development in another Use descriptive directory names to easily identify which task each worktree is for Remember to initialize your development environment in each new worktree according to your project’s setup. Depending on your stack, this might include: JavaScript projects: Running dependency installation (`npm install`, `yarn`) Python projects: Setting up virtual environments or installing with package managers Other languages: Following your project’s standard setup process ​ Use Claude as a unix-style utility ​ Add Claude to your verification process Suppose you want to use Claude Code as a linter or code reviewer. Add Claude to your build script: 

```
// package.json
{
    ...
    "scripts": {
        ...
        "lint:claude": "claude -p 'you are a linter. please look at the changes vs. main and report any issues related to typos. report the filename and line number on one line, and a description of the issue on the second line. do not return any other text.'"
    }
}
```

 Tips: Use Claude for automated code review in your CI/CD pipeline Customize the prompt to check for specific issues relevant to your project Consider creating multiple scripts for different types of verification ​ Pipe in, pipe out Suppose you want to pipe data into Claude, and get back data in a structured format. Pipe data through Claude: 

```
cat build-error.txt | claude -p 'concisely explain the root cause of this build error' > output.txt
```

 Tips: Use pipes to integrate Claude into existing shell scripts Combine with other Unix tools for powerful workflows Consider using —output-format for structured output ​ Control output format Suppose you need Claude’s output in a specific format, especially when integrating Claude Code into scripts or other tools. 1 Use text format (default) 

```
cat data.txt | claude -p 'summarize this data' --output-format text > summary.txt
```

 This outputs just Claude’s plain text response (default behavior). 2 Use JSON format 

```
cat code.py | claude -p 'analyze this code for bugs' --output-format json > analysis.json
```

 This outputs a JSON array of messages with metadata including cost and duration. 3 Use streaming JSON format 

```
cat log.txt | claude -p 'parse this log file for errors' --output-format stream-json
```

 This outputs a series of JSON objects in real-time as Claude processes the request. Each message is a valid JSON object, but the entire output is not valid JSON if concatenated. Tips: Use `--output-format text` for simple integrations where you just need Claude’s response Use `--output-format json` when you need the full conversation log Use `--output-format stream-json` for real-time output of each conversation turn ​ Create custom slash commands Claude Code supports custom slash commands that you can create to quickly execute specific prompts or tasks. For more details, see the Slash commands reference page. ​ Create project-specific commands Suppose you want to create reusable slash commands for your project that all team members can use. 1 Create a commands directory in your project 

```
mkdir -p .claude/commands
```

 2 Create a Markdown file for each command 

```
echo "Analyze the performance of this code and suggest three specific optimizations:" > .claude/commands/optimize.md
```

 3 Use your custom command in Claude Code 

```
> /optimize
```

 Tips: Command names are derived from the filename (e.g., `optimize.md` becomes `/optimize`) You can organize commands in subdirectories (e.g., `.claude/commands/frontend/component.md` creates `/component` with “(project:frontend)” shown in the description) Project commands are available to everyone who clones the repository The Markdown file content becomes the prompt sent to Claude when the command is invoked ​ Add command arguments with $ARGUMENTS Suppose you want to create flexible slash commands that can accept additional input from users. 1 Create a command file with the $ARGUMENTS placeholder 

```
echo "Find and fix issue #$ARGUMENTS. Follow these steps: 1.
Understand the issue described in the ticket 2. Locate the relevant code in
our codebase 3. Implement a solution that addresses the root cause 4. Add
appropriate tests 5. Prepare a concise PR description" >
.claude/commands/fix-issue.md
```

 2 Use the command with an issue number In your Claude session, use the command with arguments. 

```
> /fix-issue 123
```

 This will replace $ARGUMENTS with “123” in the prompt. Tips: The $ARGUMENTS placeholder is replaced with any text that follows the command You can position $ARGUMENTS anywhere in your command template Other useful applications: generating test cases for specific functions, creating documentation for components, reviewing code in particular files, or translating content to specified languages ​ Create personal slash commands Suppose you want to create personal slash commands that work across all your projects. 1 Create a commands directory in your home folder 

```
mkdir -p ~/.claude/commands
```

 2 Create a Markdown file for each command 

```
echo "Review this code for security vulnerabilities, focusing on:" >
~/.claude/commands/security-review.md
```

 3 Use your personal custom command 

```
> /security-review
```

 Tips: Personal commands show “(user)” in their description when listed with `/help` Personal commands are only available to you and not shared with your team Personal commands work across all your projects You can use these for consistent workflows across different codebases ​ Ask Claude about its capabilities Claude has built-in access to its documentation and can answer questions about its own features and limitations. ​ Example questions 

```
> can Claude Code create pull requests?
```

 

```
> how does Claude Code handle permissions?
```

 

```
> what slash commands are available?
```

 

```
> how do I use MCP with Claude Code?
```

 

```
> how do I configure Claude Code for Amazon Bedrock?
```

 

```
> what are the limitations of Claude Code?
```

 Claude provides documentation-based answers to these questions. For executable examples and hands-on demonstrations, refer to the specific workflow sections above. Tips: Claude always has access to the latest Claude Code documentation, regardless of the version you’re using Ask specific questions to get detailed answers Claude can explain complex features like MCP integration, enterprise configurations, and advanced workflows ​ Next steps Claude Code reference implementation Clone our development container reference implementation. Was this page helpful? Yes No Quickstart Claude Code SDK On this page Understand new codebases Get a quick codebase overview Find relevant code Fix bugs efficiently Refactor code Use specialized subagents Work with tests Create pull requests Handle documentation Work with images Reference files and directories Use extended thinking Resume previous conversations Run parallel Claude Code sessions with Git worktrees Use Claude as a unix-style utility Add Claude to your verification process Pipe in, pipe out Control output format Create custom slash commands Create project-specific commands Add command arguments with $ARGUMENTS Create personal slash commands Ask Claude about its capabilities Example questions Next steps

---

### Claude Code SDK - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/sdk

Claude Code SDK - Anthropic Anthropic home page English Search... Search... Navigation Build with Claude Code Claude Code SDK Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance The Claude Code SDK enables running Claude Code as a subprocess, providing a way to build AI-powered coding assistants and tools that leverage Claude’s capabilities. The SDK is available for command line, TypeScript, and Python usage. ​ Authentication The Claude Code SDK supports multiple authentication methods: ​ Anthropic API key To use the Claude Code SDK directly with Anthropic’s API, we recommend creating a dedicated API key: Create an Anthropic API key in the Anthropic Console Then, set the `ANTHROPIC_API_KEY` environment variable. We recommend storing this key securely (e.g., using a Github secret ) ​ Third-Party API credentials The SDK also supports third-party API providers: Amazon Bedrock : Set `CLAUDE_CODE_USE_BEDROCK=1` environment variable and configure AWS credentials Google Vertex AI : Set `CLAUDE_CODE_USE_VERTEX=1` environment variable and configure Google Cloud credentials For detailed configuration instructions for third-party providers, see the Amazon Bedrock and Google Vertex AI documentation. ​ Basic SDK usage The Claude Code SDK allows you to use Claude Code in non-interactive mode from your applications. ​ Command line Here are a few basic examples for the command line SDK: 

```
# Run a single prompt and exit (print mode)
$ claude -p "Write a function to calculate Fibonacci numbers"
<!-- -->
# Using a pipe to provide stdin
$ echo "Explain this code" | claude -p
<!-- -->
# Output in JSON format with metadata
$ claude -p "Generate a hello world function" --output-format json
<!-- -->
# Stream JSON output as it arrives
$ claude -p "Build a React component" --output-format stream-json
```

 ​ TypeScript The TypeScript SDK is included in the main `@anthropic-ai/claude-code` package on NPM: 

```
import { query, type SDKMessage } from "@anthropic-ai/claude-code";
<!-- -->
const messages: SDKMessage[] = [];
<!-- -->
for await (const message of query({
  prompt: "Write a haiku about foo.py",
  abortController: new AbortController(),
  options: {
    maxTurns: 3,
  },
})) {
  messages.push(message);
}
<!-- -->
console.log(messages);
```

 The TypeScript SDK accepts all arguments supported by the command line SDK, as well as: Argument Description Default `abortController` Abort controller `new AbortController()` `cwd` Current working directory `process.cwd()` `executable` Which JavaScript runtime to use `node` when running with Node.js, `bun` when running with Bun `executableArgs` Arguments to pass to the executable `[]` `pathToClaudeCodeExecutable` Path to the Claude Code executable Executable that ships with `@anthropic-ai/claude-code` ​ Python The Python SDK is available as `claude-code-sdk` on PyPI: 

```
pip install claude-code-sdk
```

 Prerequisites: Python 3.10+ Node.js Claude Code CLI: `npm install -g @anthropic-ai/claude-code` Basic usage: 

```
import anyio
from claude_code_sdk import query, ClaudeCodeOptions, Message
<!-- -->
async def main():
    messages: list[Message] = []
<!-- -->    <!-- -->
    async for message in query(
        prompt="Write a haiku about foo.py",
        options=ClaudeCodeOptions(max_turns=3)
    ):
        messages.append(message)
<!-- -->    <!-- -->
    print(messages)
<!-- -->
anyio.run(main)
```

 The Python SDK accepts all arguments supported by the command line SDK through the `ClaudeCodeOptions` class: 

```
from claude_code_sdk import query, ClaudeCodeOptions
from pathlib import Path
<!-- -->
options = ClaudeCodeOptions(
    max_turns=3,
    system_prompt="You are a helpful assistant",
    cwd=Path("/path/to/project"),  # Can be string or Path
    allowed_tools=["Read", "Write", "Bash"],
    permission_mode="acceptEdits"
)
<!-- -->
async for message in query(prompt="Hello", options=options):
    print(message)
```

 ​ Advanced usage The documentation below uses the command line SDK as an example, but can also be used with the TypeScript and Python SDKs. ​ Multi-turn conversations For multi-turn conversations, you can resume conversations or continue from the most recent session: 

```
# Continue the most recent conversation
$ claude --continue
<!-- -->
# Continue and provide a new prompt
$ claude --continue "Now refactor this for better performance"
<!-- -->
# Resume a specific conversation by session ID
$ claude --resume 550e8400-e29b-41d4-a716-446655440000
<!-- -->
# Resume in print mode (non-interactive)
$ claude -p --resume 550e8400-e29b-41d4-a716-446655440000 "Update the tests"
<!-- -->
# Continue in print mode (non-interactive)
$ claude -p --continue "Add error handling"
```

 ​ Custom system prompts You can provide custom system prompts to guide Claude’s behavior: 

```
# Override system prompt (only works with --print)
$ claude -p "Build a REST API" --system-prompt "You are a senior backend engineer. Focus on security, performance, and maintainability."
<!-- -->
# System prompt with specific requirements
$ claude -p "Create a database schema" --system-prompt "You are a database architect. Use PostgreSQL best practices and include proper indexing."
```

 You can also append instructions to the default system prompt: 

```
# Append system prompt (only works with --print)
$ claude -p "Build a REST API" --append-system-prompt "After writing code, be sure to code review yourself."
```

 ​ MCP Configuration The Model Context Protocol (MCP) allows you to extend Claude Code with additional tools and resources from external servers. Using the `--mcp-config` flag, you can load MCP servers that provide specialized capabilities like database access, API integrations, or custom tooling. Create a JSON configuration file with your MCP servers: 

```
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/allowed/files"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-github-token"
      }
    }
  }
}
```

 Then use it with Claude Code: 

```
# Load MCP servers from configuration
$ claude -p "List all files in the project" --mcp-config mcp-servers.json
<!-- -->
# Important: MCP tools must be explicitly allowed using --allowedTools
# MCP tools follow the format: mcp__$serverName__$toolName
$ claude -p "Search for TODO comments" \
  --mcp-config mcp-servers.json \
  --allowedTools "mcp__filesystem__read_file,mcp__filesystem__list_directory"
<!-- -->
# Use an MCP tool for handling permission prompts in non-interactive mode
$ claude -p "Deploy the application" \
  --mcp-config mcp-servers.json \
  --allowedTools "mcp__permissions__approve" \
  --permission-prompt-tool mcp__permissions__approve
```

 When using MCP tools, you must explicitly allow them using the `--allowedTools` flag. MCP tool names follow the pattern `mcp__<serverName>__<toolName>` where: `serverName` is the key from your MCP configuration file `toolName` is the specific tool provided by that server This security measure ensures that MCP tools are only used when explicitly permitted. If you specify just the server name (i.e., `mcp__<serverName>`), all tools from that server will be allowed. Glob patterns (e.g., `mcp__go*`) are not supported. ​ Custom permission prompt tool Optionally, use `--permission-prompt-tool` to pass in an MCP tool that we will use to check whether or not the user grants the model permissions to invoke a given tool. When the model invokes a tool the following happens: We first check permission settings: all settings.json files , as well as `--allowedTools` and `--disallowedTools` passed into the SDK; if one of these allows or denies the tool call, we proceed with the tool call Otherwise, we invoke the MCP tool you provided in `--permission-prompt-tool` The `--permission-prompt-tool` MCP tool is passed the tool name and input, and must return a JSON-stringified payload with the result. The payload must be one of: 

```
// tool call is allowed
{
  "behavior": "allow",
  "updatedInput": {...}, // updated input, or just return back the original input
}
<!-- -->
// tool call is denied
{
  "behavior": "deny",
  "message": "..." // human-readable string explaining why the permission was denied
}
```

 For example, a TypeScript MCP permission prompt tool implementation might look like this: 

```
const server = new McpServer({
  name: "Test permission prompt MCP Server",
  version: "0.0.1",
});
<!-- -->
server.tool(
  "approval_prompt",
  'Simulate a permission check - approve if the input contains "allow", otherwise deny',
  {
    tool_name: z.string().describe("The name of the tool requesting permission"),
    input: z.object({}).passthrough().describe("The input for the tool"),
    tool_use_id: z.string().optional().describe("The unique tool use request ID"),
  },
  async ({ tool_name, input }) => {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            JSON.stringify(input).includes("allow")
              ? {
                  behavior: "allow",
                  updatedInput: input,
                }
              : {
                  behavior: "deny",
                  message: "Permission denied by test approval_prompt tool",
                }
          ),
        },
      ],
    };
  }
);
```

 To use this tool, add your MCP server (eg. with `--mcp-config`), then invoke the SDK like so: 

```
claude -p "..." \
  --permission-prompt-tool mcp__test-server__approval_prompt \
  --mcp-config my-config.json
```

 Usage notes: Use `updatedInput` to tell the model that the permission prompt mutated its input; otherwise, set `updatedInput` to the original input, as in the example above. For example, if the tool shows a file edit diff to the user and lets them edit the diff manually, the permission prompt tool should return that updated edit. The payload must be JSON-stringified ​ Available CLI options The SDK leverages all the CLI options available in Claude Code. Here are the key ones for SDK usage: Flag Description Example `--print`, `-p` Run in non-interactive mode `claude -p "query"` `--output-format` Specify output format (`text`, `json`, `stream-json`) `claude -p --output-format json` `--resume`, `-r` Resume a conversation by session ID `claude --resume abc123` `--continue`, `-c` Continue the most recent conversation `claude --continue` `--verbose` Enable verbose logging `claude --verbose` `--max-turns` Limit agentic turns in non-interactive mode `claude --max-turns 3` `--system-prompt` Override system prompt (only with `--print`) `claude --system-prompt "Custom instruction"` `--append-system-prompt` Append to system prompt (only with `--print`) `claude --append-system-prompt "Custom instruction"` `--allowedTools` Space-separated list of allowed tools, or string of comma-separated list of allowed tools `claude --allowedTools mcp__slack mcp__filesystem` `claude --allowedTools "Bash(npm install),mcp__filesystem"` `--disallowedTools` Space-separated list of denied tools, or string of comma-separated list of denied tools `claude --disallowedTools mcp__splunk mcp__github` `claude --disallowedTools "Bash(git commit),mcp__github"` `--mcp-config` Load MCP servers from a JSON file `claude --mcp-config servers.json` `--permission-prompt-tool` MCP tool for handling permission prompts (only with `--print`) `claude --permission-prompt-tool mcp__auth__prompt` For a complete list of CLI options and features, see the CLI reference documentation. ​ Output formats The SDK supports multiple output formats: ​ Text output (default) Returns just the response text: 

```
$ claude -p "Explain file src/components/Header.tsx"
# Output: This is a React component showing...
```

 ​ JSON output Returns structured data including metadata: 

```
$ claude -p "How does the data layer work?" --output-format json
```

 Response format: 

```
{
  "type": "result",
  "subtype": "success",
  "total_cost_usd": 0.003,
  "is_error": false,
  "duration_ms": 1234,
  "duration_api_ms": 800,
  "num_turns": 6,
  "result": "The response text here...",
  "session_id": "abc123"
}
```

 ​ Streaming JSON output Streams each message as it is received: 

```
$ claude -p "Build an application" --output-format stream-json
```

 Each conversation begins with an initial `init` system message, followed by a list of user and assistant messages, followed by a final `result` system message with stats. Each message is emitted as a separate JSON object. ​ Message schema Messages returned from the JSON API are strictly typed according to the following schema: 

```
type SDKMessage =
  // An assistant message
  | {
      type: "assistant";
      message: Message; // from Anthropic SDK
      session_id: string;
    }
<!-- -->
  // A user message
  | {
      type: "user";
      message: MessageParam; // from Anthropic SDK
      session_id: string;
    }
<!-- -->
  // Emitted as the last message
  | {
      type: "result";
      subtype: "success";
      duration_ms: float;
      duration_api_ms: float;
      is_error: boolean;
      num_turns: int;
      result: string;
      session_id: string;
      total_cost_usd: float;
    }
<!-- -->
  // Emitted as the last message, when we've reached the maximum number of turns
  | {
      type: "result";
      subtype: "error_max_turns" | "error_during_execution";
      duration_ms: float;
      duration_api_ms: float;
      is_error: boolean;
      num_turns: int;
      session_id: string;
      total_cost_usd: float;
    }
<!-- -->
  // Emitted as the first message at the start of a conversation
  | {
      type: "system";
      subtype: "init";
      apiKeySource: string;
      cwd: string;
      session_id: string;
      tools: string[];
      mcp_servers: {
        name: string;
        status: string;
      }[];
      model: string;
      permissionMode: "default" | "acceptEdits" | "bypassPermissions" | "plan";
    };
```

 We will soon publish these types in a JSONSchema-compatible format. We use semantic versioning for the main Claude Code package to communicate breaking changes to this format. `Message` and `MessageParam` types are available in Anthropic SDKs. For example, see the Anthropic TypeScript and Python SDKs. ​ Input formats The SDK supports multiple input formats: ​ Text input (default) Input text can be provided as an argument: 

```
$ claude -p "Explain this code"
```

 Or input text can be piped via stdin: 

```
$ echo "Explain this code" | claude -p
```

 ​ Streaming JSON input A stream of messages provided via `stdin` where each message represents a user turn. This allows multiple turns of a conversation without re-launching the `claude` binary and allows providing guidance to the model while it is processing a request. Each message is a JSON ‘User message’ object, following the same format as the output message schema. Messages are formatted using the jsonl format where each line of input is a complete JSON object. Streaming JSON input requires `-p` and `--output-format stream-json`. Currently this is limited to text-only user messages. 

```
$ echo '{"type":"user","message":{"role":"user","content":[{"type":"text","text":"Explain this code"}]}}' | claude -p --output-format=stream-json --input-format=stream-json --verbose
```

 ​ Examples ​ Simple script integration 

```
#!/bin/bash
<!-- -->
# Simple function to run Claude and check exit code
run_claude() {
    local prompt="$1"
    local output_format="${2:-text}"
<!-- -->
    if claude -p "$prompt" --output-format "$output_format"; then
        echo "Success!"
    else
        echo "Error: Claude failed with exit code $?" >&2
        return 1
    fi
}
<!-- -->
# Usage examples
run_claude "Write a Python function to read CSV files"
run_claude "Optimize this database query" "json"
```

 ​ Processing files with Claude 

```
# Process a file through Claude
$ cat mycode.py | claude -p "Review this code for bugs"
<!-- -->
# Process multiple files
$ for file in *.js; do
    echo "Processing $file..."
    claude -p "Add JSDoc comments to this file:" < "$file" > "${file}.documented"
done
<!-- -->
# Use Claude in a pipeline
$ grep -l "TODO" *.py | while read file; do
    claude -p "Fix all TODO items in this file" < "$file"
done
```

 ​ Session management 

```
# Start a session and capture the session ID
$ claude -p "Initialize a new project" --output-format json | jq -r '.session_id' > session.txt
<!-- -->
# Continue with the same session
$ claude -p --resume "$(cat session.txt)" "Add unit tests"
```

 ​ Best practices Use JSON output format for programmatic parsing of responses: 

```
# Parse JSON response with jq
result=$(claude -p "Generate code" --output-format json)
code=$(echo "$result" | jq -r '.result')
cost=$(echo "$result" | jq -r '.cost_usd')
```

 Handle errors gracefully - check exit codes and stderr: 

```
if ! claude -p "$prompt" 2>error.log; then
    echo "Error occurred:" >&2
    cat error.log >&2
    exit 1
fi
```

 Use session management for maintaining context in multi-turn conversations Consider timeouts for long-running operations: 

```
timeout 300 claude -p "$complex_prompt" || echo "Timed out after 5 minutes"
```

 Respect rate limits when making multiple requests by adding delays between calls ​ Real-world applications The Claude Code SDK enables powerful integrations with your development workflow. One notable example is the Claude Code GitHub Actions , which uses the SDK to provide automated code review, PR creation, and issue triage capabilities directly in your GitHub workflow. ​ Related resources CLI usage and controls - Complete CLI documentation GitHub Actions integration - Automate your GitHub workflow with Claude Common workflows - Step-by-step guides for common use cases Was this page helpful? Yes No Common workflows Subagents On this page Authentication Anthropic API key Third-Party API credentials Basic SDK usage Command line TypeScript Python Advanced usage Multi-turn conversations Custom system prompts MCP Configuration Custom permission prompt tool Available CLI options Output formats Text output (default) JSON output Streaming JSON output Message schema Input formats Text input (default) Streaming JSON input Examples Simple script integration Processing files with Claude Session management Best practices Real-world applications Related resources

---

### Subagents - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/sub-agents

Subagents - Anthropic Anthropic home page English Search... Search... Navigation Build with Claude Code Subagents Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance Custom subagents in Claude Code are specialized AI assistants that can be invoked to handle specific types of tasks. They enable more efficient problem-solving by providing task-specific configurations with customized system prompts, tools and a separate context window. ​ What are subagents? Subagents are pre-configured AI personalities that Claude Code can delegate tasks to. Each subagent: Has a specific purpose and expertise area Uses its own context window separate from the main conversation Can be configured with specific tools it’s allowed to use Includes a custom system prompt that guides its behavior When Claude Code encounters a task that matches a subagent’s expertise, it can delegate that task to the specialized subagent, which works independently and returns results. ​ Key benefits Context preservation Each subagent operates in its own context, preventing pollution of the main conversation and keeping it focused on high-level objectives. Specialized expertise Subagents can be fine-tuned with detailed instructions for specific domains, leading to higher success rates on designated tasks. Reusability Once created, subagents can be used across different projects and shared with your team for consistent workflows. Flexible permissions Each subagent can have different tool access levels, allowing you to limit powerful tools to specific subagent types. ​ Quick start To create your first subagent: 1 Open the subagents interface Run the following command: 

```
/agents
```

 2 Select 'Create New Agent' Choose whether to create a project-level or user-level subagent 3 Define the subagent Recommended : Generate with Claude first, then customize to make it yours Describe your subagent in detail and when it should be used Select the tools you want to grant access to (or leave blank to inherit all tools) The interface shows all available tools, making selection easy If you’re generating with Claude, you can also edit the system prompt in your own editor by pressing `e` 4 Save and use Your subagent is now available! Claude will use it automatically when appropriate, or you can invoke it explicitly: 

```
> Use the code-reviewer subagent to check my recent changes
```

 ​ Subagent configuration ​ File locations Subagents are stored as Markdown files with YAML frontmatter in two possible locations: Type Location Scope Priority Project subagents `.claude/agents/` Available in current project Highest User subagents `~/.claude/agents/` Available across all projects Lower When subagent names conflict, project-level subagents take precedence over user-level subagents. ​ File format Each subagent is defined in a Markdown file with this structure: 

```
---
name: your-sub-agent-name
description: Description of when this subagent should be invoked
tools: tool1, tool2, tool3  # Optional - inherits all tools if omitted
---
<!-- -->
Your subagent's system prompt goes here. This can be multiple paragraphs
and should clearly define the subagent's role, capabilities, and approach
to solving problems.
<!-- -->
Include specific instructions, best practices, and any constraints
the subagent should follow.
```

 ​ Configuration fields Field Required Description `name` Yes Unique identifier using lowercase letters and hyphens `description` Yes Natural language description of the subagent’s purpose `tools` No Comma-separated list of specific tools. If omitted, inherits all tools from the main thread ​ Available tools Subagents can be granted access to any of Claude Code’s internal tools. See the tools documentation for a complete list of available tools. Recommended: Use the `/agents` command to modify tool access - it provides an interactive interface that lists all available tools, including any connected MCP server tools, making it easier to select the ones you need. You have two options for configuring tools: Omit the `tools` field to inherit all tools from the main thread (default), including MCP tools Specify individual tools as a comma-separated list for more granular control (can be edited manually or via `/agents`) MCP Tools : Subagents can access MCP tools from configured MCP servers. When the `tools` field is omitted, subagents inherit all MCP tools available to the main thread. ​ Managing subagents ​ Using the /agents command (Recommended) The `/agents` command provides a comprehensive interface for subagent management: 

```
/agents
```

 This opens an interactive menu where you can: View all available subagents (built-in, user, and project) Create new subagents with guided setup Edit existing custom subagents, including their tool access Delete custom subagents See which subagents are active when duplicates exist Easily manage tool permissions with a complete list of available tools ​ Direct file management You can also manage subagents by working directly with their files: 

```
# Create a project subagent
mkdir -p .claude/agents
echo '---
name: test-runner
description: Use proactively to run tests and fix failures
---
<!-- -->
You are a test automation expert. When you see code changes, proactively run the appropriate tests. If tests fail, analyze the failures and fix them while preserving the original test intent.' > .claude/agents/test-runner.md
<!-- -->
# Create a user subagent
mkdir -p ~/.claude/agents
# ... create subagent file
```

 ​ Using subagents effectively ​ Automatic delegation Claude Code proactively delegates tasks based on: The task description in your request The `description` field in subagent configurations Current context and available tools To encourage more proactive subagent use, include phrases like “use PROACTIVELY” or “MUST BE USED” in your `description` field. ​ Explicit invocation Request a specific subagent by mentioning it in your command: 

```
> Use the test-runner subagent to fix failing tests
> Have the code-reviewer subagent look at my recent changes
> Ask the debugger subagent to investigate this error
```

 ​ Example subagents ​ Code reviewer 

```
---
name: code-reviewer
description: Expert code review specialist. Proactively reviews code for quality, security, and maintainability. Use immediately after writing or modifying code.
tools: Read, Grep, Glob, Bash
---
<!-- -->
You are a senior code reviewer ensuring high standards of code quality and security.
<!-- -->
When invoked:
1. Run git diff to see recent changes
2. Focus on modified files
3. Begin review immediately
<!-- -->
Review checklist:
- Code is simple and readable
- Functions and variables are well-named
- No duplicated code
- Proper error handling
- No exposed secrets or API keys
- Input validation implemented
- Good test coverage
- Performance considerations addressed
<!-- -->
Provide feedback organized by priority:
- Critical issues (must fix)
- Warnings (should fix)
- Suggestions (consider improving)
<!-- -->
Include specific examples of how to fix issues.
```

 ​ Debugger 

```
---
name: debugger
description: Debugging specialist for errors, test failures, and unexpected behavior. Use proactively when encountering any issues.
tools: Read, Edit, Bash, Grep, Glob
---
<!-- -->
You are an expert debugger specializing in root cause analysis.
<!-- -->
When invoked:
1. Capture error message and stack trace
2. Identify reproduction steps
3. Isolate the failure location
4. Implement minimal fix
5. Verify solution works
<!-- -->
Debugging process:
- Analyze error messages and logs
- Check recent code changes
- Form and test hypotheses
- Add strategic debug logging
- Inspect variable states
<!-- -->
For each issue, provide:
- Root cause explanation
- Evidence supporting the diagnosis
- Specific code fix
- Testing approach
- Prevention recommendations
<!-- -->
Focus on fixing the underlying issue, not just symptoms.
```

 ​ Data scientist 

```
---
name: data-scientist
description: Data analysis expert for SQL queries, BigQuery operations, and data insights. Use proactively for data analysis tasks and queries.
tools: Bash, Read, Write
---
<!-- -->
You are a data scientist specializing in SQL and BigQuery analysis.
<!-- -->
When invoked:
1. Understand the data analysis requirement
2. Write efficient SQL queries
3. Use BigQuery command line tools (bq) when appropriate
4. Analyze and summarize results
5. Present findings clearly
<!-- -->
Key practices:
- Write optimized SQL queries with proper filters
- Use appropriate aggregations and joins
- Include comments explaining complex logic
- Format results for readability
- Provide data-driven recommendations
<!-- -->
For each analysis:
- Explain the query approach
- Document any assumptions
- Highlight key findings
- Suggest next steps based on data
<!-- -->
Always ensure queries are efficient and cost-effective.
```

 ​ Best practices Start with Claude-generated agents : We highly recommend generating your initial subagent with Claude and then iterating on it to make it personally yours. This approach gives you the best results - a solid foundation that you can customize to your specific needs. Design focused subagents : Create subagents with single, clear responsibilities rather than trying to make one subagent do everything. This improves performance and makes subagents more predictable. Write detailed prompts : Include specific instructions, examples, and constraints in your system prompts. The more guidance you provide, the better the subagent will perform. Limit tool access : Only grant tools that are necessary for the subagent’s purpose. This improves security and helps the subagent focus on relevant actions. Version control : Check project subagents into version control so your team can benefit from and improve them collaboratively. ​ Advanced usage ​ Chaining subagents For complex workflows, you can chain multiple subagents: 

```
> First use the code-analyzer subagent to find performance issues, then use the optimizer subagent to fix them
```

 ​ Dynamic subagent selection Claude Code intelligently selects subagents based on context. Make your `description` fields specific and action-oriented for best results. ​ Performance considerations Context efficiency : Agents help preserve main context, enabling longer overall sessions Latency : Subagents start off with a clean slate each time they are invoked and may add latency as they gather context that they require to do their job effectively. ​ Related documentation Slash commands - Learn about other built-in commands Settings - Configure Claude Code behavior Hooks - Automate workflows with event handlers Was this page helpful? Yes No Claude Code SDK Claude Code hooks On this page What are subagents? Key benefits Quick start Subagent configuration File locations File format Configuration fields Available tools Managing subagents Using the /agents command (Recommended) Direct file management Using subagents effectively Automatic delegation Explicit invocation Example subagents Code reviewer Debugger Data scientist Best practices Advanced usage Chaining subagents Dynamic subagent selection Performance considerations Related documentation

---

### Get started with Claude Code hooks - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/hooks-guide

Get started with Claude Code hooks - Anthropic Anthropic home page English Search... Search... Navigation Build with Claude Code Get started with Claude Code hooks Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Data usage Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Legal and compliance Claude Code hooks are user-defined shell commands that execute at various points in Claude Code’s lifecycle. Hooks provide deterministic control over Claude Code’s behavior, ensuring certain actions always happen rather than relying on the LLM to choose to run them. For reference documentation on hooks, see Hooks reference . Example use cases for hooks include: Notifications : Customize how you get notified when Claude Code is awaiting your input or permission to run something. Automatic formatting : Run `prettier` on .ts files, `gofmt` on .go files, etc. after every file edit. Logging : Track and count all executed commands for compliance or debugging. Feedback : Provide automated feedback when Claude Code produces code that does not follow your codebase conventions. Custom permissions : Block modifications to production files or sensitive directories. By encoding these rules as hooks rather than prompting instructions, you turn suggestions into app-level code that executes every time it is expected to run. You must consider the security implication of hooks as you add them, because hooks run automatically during the agent loop with your current environment’s credentials. For example, malicious hooks code can exfiltrate your data. Always review your hooks implementation before registering them. For full security best practices, see Security Considerations in the hooks reference documentation. ​ Hook Events Overview Claude Code provides several hook events that run at different points in the workflow: PreToolUse : Runs before tool calls (can block them) PostToolUse : Runs after tool calls complete Notification : Runs when Claude Code sends notifications Stop : Runs when Claude Code finishes responding Subagent Stop : Runs when subagent tasks complete Each event receives different data and can control Claude’s behavior in different ways. ​ Quickstart In this quickstart, you’ll add a hook that logs the shell commands that Claude Code runs. ​ Prerequisites Install `jq` for JSON processing in the command line. ​ Step 1: Open hooks configuration Run the `/hooks` slash command and select the `PreToolUse` hook event. `PreToolUse` hooks run before tool calls and can block them while providing Claude feedback on what to do differently. ​ Step 2: Add a matcher Select `+ Add new matcher…` to run your hook only on Bash tool calls. Type `Bash` for the matcher. You can use `*` to match all tools. ​ Step 3: Add the hook Select `+ Add new hook…` and enter this command: 

```
jq -r '"\(.tool_input.command) - \(.tool_input.description // "No description")"' >> ~/.claude/bash-command-log.txt
```

 ​ Step 4: Save your configuration For storage location, select `User settings` since you’re logging to your home directory. This hook will then apply to all projects, not just your current project. Then press Esc until you return to the REPL. Your hook is now registered! ​ Step 5: Verify your hook Run `/hooks` again or check `~/.claude/settings.json` to see your configuration: 

```
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '\"\\(.tool_input.command) - \\(.tool_input.description // \"No description\")\"' >> ~/.claude/bash-command-log.txt"
          }
        ]
      }
    ]
  }
}
```

 ​ Step 6: Test your hook Ask Claude to run a simple command like `ls` and check your log file: 

```
cat ~/.claude/bash-command-log.txt
```

 You should see entries like: 

```
ls - Lists files and directories
```

 ​ More Examples For a complete example implementation, see the bash command validator example in our public codebase. ​ Code Formatting Hook Automatically format TypeScript files after editing: 

```
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|MultiEdit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | { read file_path; if echo \"$file_path\" | grep -q '\\.ts ​ Custom Notification Hook Get desktop notifications when Claude needs input: 

```
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "notify-send 'Claude Code' 'Awaiting your input'"
          }
        ]
      }
    ]
  }
}
```

 ​ File Protection Hook Block edits to sensitive files: 

```
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|MultiEdit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "python3 -c \"import json, sys; data=json.load(sys.stdin); path=data.get('tool_input',{}).get('file_path',''); sys.exit(2 if any(p in path for p in ['.env', 'package-lock.json', '.git/']) else 0)\""
          }
        ]
      }
    ]
  }
}
```

 ​ Learn more For reference documentation on hooks, see Hooks reference . For comprehensive security best practices and safety guidelines, see Security Considerations in the hooks reference documentation. For troubleshooting steps and debugging techniques, see Debugging in the hooks reference documentation. Was this page helpful? Yes No Subagents GitHub Actions On this page Hook Events Overview Quickstart Prerequisites Step 1: Open hooks configuration Step 2: Add a matcher Step 3: Add the hook Step 4: Save your configuration Step 5: Verify your hook Step 6: Test your hook More Examples Code Formatting Hook Custom Notification Hook File Protection Hook Learn more; then npx prettier --write \"$file_path\"; fi; }"
          }
        ]
      }
    ]
  }
}
```

 ​ Custom Notification Hook Get desktop notifications when Claude needs input: __CODE_BLOCK_5__ ​ File Protection Hook Block edits to sensitive files: __CODE_BLOCK_6__ ​ Learn more For reference documentation on hooks, see Hooks reference . For comprehensive security best practices and safety guidelines, see Security Considerations in the hooks reference documentation. For troubleshooting steps and debugging techniques, see Debugging in the hooks reference documentation. Was this page helpful? Yes No Subagents GitHub Actions On this page Hook Events Overview Quickstart Prerequisites Step 1: Open hooks configuration Step 2: Add a matcher Step 3: Add the hook Step 4: Save your configuration Step 5: Verify your hook Step 6: Test your hook More Examples Code Formatting Hook Custom Notification Hook File Protection Hook Learn more

---

### Claude Code GitHub Actions - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/github-actions

Claude Code GitHub Actions - Anthropic Anthropic home page English Search... Search... Navigation Build with Claude Code Claude Code GitHub Actions Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance Claude Code GitHub Actions brings AI-powered automation to your GitHub workflow. With a simple `@claude` mention in any PR or issue, Claude can analyze your code, create pull requests, implement features, and fix bugs - all while following your project’s standards. Claude Code GitHub Actions is currently in beta. Features and functionality may evolve as we refine the experience. Claude Code GitHub Actions is built on top of the Claude Code SDK , which enables programmatic integration of Claude Code into your applications. You can use the SDK to build custom automation workflows beyond GitHub Actions. ​ Why use Claude Code GitHub Actions? Instant PR creation : Describe what you need, and Claude creates a complete PR with all necessary changes Automated code implementation : Turn issues into working code with a single command Follows your standards : Claude respects your `CLAUDE.md` guidelines and existing code patterns Simple setup : Get started in minutes with our installer and API key Secure by default : Your code stays on Github’s runners ​ What can Claude do? Claude Code provides powerful GitHub Actions that transform how you work with code: ​ Claude Code Action This GitHub Action allows you to run Claude Code within your GitHub Actions workflows. You can use this to build any custom workflow on top of Claude Code. View repository → ​ Claude Code Action (Base) The foundation for building custom GitHub workflows with Claude. This extensible framework gives you full access to Claude’s capabilities for creating tailored automation. View repository → ​ Setup ​ Quick setup The easiest way to set up this action is through Claude Code in the terminal. Just open claude and run `/install-github-app`. This command will guide you through setting up the GitHub app and required secrets. You must be a repository admin to install the GitHub app and add secrets This quickstart method is only available for direct Anthropic API users. If you’re using AWS Bedrock or Google Vertex AI, please see the Using with AWS Bedrock & Google Vertex AI section. ​ Manual setup If the `/install-github-app` command fails or you prefer manual setup, please follow these manual setup instructions: Install the Claude GitHub app to your repository: https://github.com/apps/claude Add ANTHROPIC_API_KEY to your repository secrets ( Learn how to use secrets in GitHub Actions ) Copy the workflow file from examples/claude.yml into your repository’s `.github/workflows/` After completing either the quickstart or manual setup, test the action by tagging `@claude` in an issue or PR comment! ​ Example use cases Claude Code GitHub Actions can help you with a variety of tasks. For complete working examples, see the examples directory . ​ Turn issues into PRs In an issue comment: 

```
@claude implement this feature based on the issue description
```

 Claude will analyze the issue, write the code, and create a PR for review. ​ Get implementation help In a PR comment: 

```
@claude how should I implement user authentication for this endpoint?
```

 Claude will analyze your code and provide specific implementation guidance. ​ Fix bugs quickly In an issue: 

```
@claude fix the TypeError in the user dashboard component
```

 Claude will locate the bug, implement a fix, and create a PR. ​ Best practices ​ CLAUDE.md configuration Create a `CLAUDE.md` file in your repository root to define code style guidelines, review criteria, project-specific rules, and preferred patterns. This file guides Claude’s understanding of your project standards. ​ Security considerations Never commit API keys directly to your repository! Always use GitHub Secrets for API keys: Add your API key as a repository secret named `ANTHROPIC_API_KEY` Reference it in workflows: `anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}` Limit action permissions to only what’s necessary Review Claude’s suggestions before merging Always use GitHub Secrets (e.g., `${{ secrets.ANTHROPIC_API_KEY }}`) rather than hardcoding API keys directly in your workflow files. ​ Optimizing performance Use issue templates to provide context, keep your `CLAUDE.md` concise and focused, and configure appropriate timeouts for your workflows. ​ CI costs When using Claude Code GitHub Actions, be aware of the associated costs: GitHub Actions costs: Claude Code runs on GitHub-hosted runners, which consume your GitHub Actions minutes See GitHub’s billing documentation for detailed pricing and minute limits API costs: Each Claude interaction consumes API tokens based on the length of prompts and responses Token usage varies by task complexity and codebase size See Claude’s pricing page for current token rates Cost optimization tips: Use specific `@claude` commands to reduce unnecessary API calls Configure appropriate `max_turns` limits to prevent excessive iterations Set reasonable `timeout_minutes` to avoid runaway workflows Consider using GitHub’s concurrency controls to limit parallel runs ​ Configuration examples For ready-to-use workflow configurations for different use cases, including: Basic workflow setup for issue and PR comments Automated code reviews on pull requests Custom implementations for specific needs Visit the examples directory in the Claude Code Action repository. The examples repository includes complete, tested workflows that you can copy directly into your `.github/workflows/` directory. ​ Using with AWS Bedrock & Google Vertex AI For enterprise environments, you can use Claude Code GitHub Actions with your own cloud infrastructure. This approach gives you control over data residency and billing while maintaining the same functionality. ​ Prerequisites Before setting up Claude Code GitHub Actions with cloud providers, you need: ​ For Google Cloud Vertex AI: A Google Cloud Project with Vertex AI enabled Workload Identity Federation configured for GitHub Actions A service account with the required permissions A GitHub App (recommended) or use the default GITHUB_TOKEN ​ For AWS Bedrock: An AWS account with Amazon Bedrock enabled GitHub OIDC Identity Provider configured in AWS An IAM role with Bedrock permissions A GitHub App (recommended) or use the default GITHUB_TOKEN 1 Create a custom GitHub App (Recommended for 3P Providers) For best control and security when using 3P providers like Vertex AI or Bedrock, we recommend creating your own GitHub App: Go to https://github.com/settings/apps/new Fill in the basic information: GitHub App name : Choose a unique name (e.g., “YourOrg Claude Assistant”) Homepage URL : Your organization’s website or the repository URL Configure the app settings: Webhooks : Uncheck “Active” (not needed for this integration) Set the required permissions: Repository permissions : Contents: Read & Write Issues: Read & Write Pull requests: Read & Write Click “Create GitHub App” After creation, click “Generate a private key” and save the downloaded `.pem` file Note your App ID from the app settings page Install the app to your repository: From your app’s settings page, click “Install App” in the left sidebar Select your account or organization Choose “Only select repositories” and select the specific repository Click “Install” Add the private key as a secret to your repository: Go to your repository’s Settings → Secrets and variables → Actions Create a new secret named `APP_PRIVATE_KEY` with the contents of the `.pem` file Add the App ID as a secret: Create a new secret named `APP_ID` with your GitHub App’s ID This app will be used with the actions/create-github-app-token action to generate authentication tokens in your workflows. Alternative for Anthropic API or if you don’t want to setup your own Github app : Use the official Anthropic app: Install from: https://github.com/apps/claude No additional configuration needed for authentication 2 Configure cloud provider authentication Choose your cloud provider and set up secure authentication: AWS Bedrock Configure AWS to allow GitHub Actions to authenticate securely without storing credentials. Security Note : Use repository-specific configurations and grant only the minimum required permissions. Required Setup : Enable Amazon Bedrock : Request access to Claude models in Amazon Bedrock For cross-region models, request access in all required regions Set up GitHub OIDC Identity Provider : Provider URL: `https://token.actions.githubusercontent.com` Audience: `sts.amazonaws.com` Create IAM Role for GitHub Actions : Trusted entity type: Web identity Identity provider: `token.actions.githubusercontent.com` Permissions: `AmazonBedrockFullAccess` policy Configure trust policy for your specific repository Required Values : After setup, you’ll need: AWS_ROLE_TO_ASSUME : The ARN of the IAM role you created OIDC is more secure than using static AWS access keys because credentials are temporary and automatically rotated. See AWS documentation for detailed OIDC setup instructions. Google Vertex AI Configure Google Cloud to allow GitHub Actions to authenticate securely without storing credentials. Security Note : Use repository-specific configurations and grant only the minimum required permissions. Required Setup : Enable APIs in your Google Cloud project: IAM Credentials API Security Token Service (STS) API Vertex AI API Create Workload Identity Federation resources : Create a Workload Identity Pool Add a GitHub OIDC provider with: Issuer: `https://token.actions.githubusercontent.com` Attribute mappings for repository and owner Security recommendation : Use repository-specific attribute conditions Create a Service Account : Grant only `Vertex AI User` role Security recommendation : Create a dedicated service account per repository Configure IAM bindings : Allow the Workload Identity Pool to impersonate the service account Security recommendation : Use repository-specific principal sets Required Values : After setup, you’ll need: GCP_WORKLOAD_IDENTITY_PROVIDER : The full provider resource name GCP_SERVICE_ACCOUNT : The service account email address Workload Identity Federation eliminates the need for downloadable service account keys, improving security. For detailed setup instructions, consult the Google Cloud Workload Identity Federation documentation . 3 Add Required Secrets Add the following secrets to your repository (Settings → Secrets and variables → Actions): ​ For Anthropic API (Direct): For API Authentication : `ANTHROPIC_API_KEY`: Your Anthropic API key from console.anthropic.com For GitHub App (if using your own app) : `APP_ID`: Your GitHub App’s ID `APP_PRIVATE_KEY`: The private key (.pem) content ​ For Google Cloud Vertex AI For GCP Authentication : `GCP_WORKLOAD_IDENTITY_PROVIDER` `GCP_SERVICE_ACCOUNT` For GitHub App (if using your own app) : `APP_ID`: Your GitHub App’s ID `APP_PRIVATE_KEY`: The private key (.pem) content ​ For AWS Bedrock For AWS Authentication : `AWS_ROLE_TO_ASSUME` For GitHub App (if using your own app) : `APP_ID`: Your GitHub App’s ID `APP_PRIVATE_KEY`: The private key (.pem) content 4 Create workflow files Create GitHub Actions workflow files that integrate with your cloud provider. The examples below show complete configurations for both AWS Bedrock and Google Vertex AI: AWS Bedrock workflow Prerequisites: AWS Bedrock access enabled with Claude model permissions GitHub configured as an OIDC identity provider in AWS IAM role with Bedrock permissions that trusts GitHub Actions Required GitHub secrets: Secret Name Description `AWS_ROLE_TO_ASSUME` ARN of the IAM role for Bedrock access `APP_ID` Your GitHub App ID (from app settings) `APP_PRIVATE_KEY` The private key you generated for your GitHub App 

```
name: Claude PR Action 
<!-- -->
permissions:
  contents: write
  pull-requests: write
  issues: write
  id-token: write 
<!-- -->
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  issues:
    types: [opened, assigned]
<!-- -->
jobs:
  claude-pr:
    if: |
      (github.event_name == 'issue_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'pull_request_review_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'issues' && contains(github.event.issue.body, '@claude'))
    runs-on: ubuntu-latest
    env:
      AWS_REGION: us-west-2
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
<!-- -->
      - name: Generate GitHub App token
        id: app-token
        uses: actions/create-github-app-token@v2
        with:
          app-id: ${{ secrets.APP_ID }}
          private-key: ${{ secrets.APP_PRIVATE_KEY }}
<!-- -->
      - name: Configure AWS Credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_TO_ASSUME }}
          aws-region: us-west-2
<!-- -->
      - uses: ./.github/actions/claude-pr-action
        with:
          trigger_phrase: "@claude"
          timeout_minutes: "60"
          github_token: ${{ steps.app-token.outputs.token }}
          use_bedrock: "true"
          model: "us.anthropic.claude-3-7-sonnet-20250219-v1:0"
```

 The model ID format for Bedrock includes the region prefix (e.g., `us.anthropic.claude...`) and version suffix. Google Vertex AI workflow Prerequisites: Vertex AI API enabled in your GCP project Workload Identity Federation configured for GitHub Service account with Vertex AI permissions Required GitHub secrets: Secret Name Description `GCP_WORKLOAD_IDENTITY_PROVIDER` Workload identity provider resource name `GCP_SERVICE_ACCOUNT` Service account email with Vertex AI access `APP_ID` Your GitHub App ID (from app settings) `APP_PRIVATE_KEY` The private key you generated for your GitHub App 

```
name: Claude PR Action
<!-- -->
permissions:
  contents: write
  pull-requests: write
  issues: write
  id-token: write  
<!-- -->
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  issues:
    types: [opened, assigned]
<!-- -->
jobs:
  claude-pr:
    if: |
      (github.event_name == 'issue_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'pull_request_review_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'issues' && contains(github.event.issue.body, '@claude'))
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
<!-- -->
      - name: Generate GitHub App token
        id: app-token
        uses: actions/create-github-app-token@v2
        with:
          app-id: ${{ secrets.APP_ID }}
          private-key: ${{ secrets.APP_PRIVATE_KEY }}
<!-- -->
      - name: Authenticate to Google Cloud
        id: auth
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: ${{ secrets.GCP_WORKLOAD_IDENTITY_PROVIDER }}
          service_account: ${{ secrets.GCP_SERVICE_ACCOUNT }}
<!-- -->      <!-- -->
      - uses: ./.github/actions/claude-pr-action
        with:
          trigger_phrase: "@claude"
          timeout_minutes: "60"
          github_token: ${{ steps.app-token.outputs.token }}
          use_vertex: "true"
          model: "claude-3-7-sonnet@20250219"
        env:
          ANTHROPIC_VERTEX_PROJECT_ID: ${{ steps.auth.outputs.project_id }}
          CLOUD_ML_REGION: us-east5
          VERTEX_REGION_CLAUDE_3_7_SONNET: us-east5
```

 The project ID is automatically retrieved from the Google Cloud authentication step, so you don’t need to hardcode it. ​ Troubleshooting ​ Claude not responding to @claude commands Verify the GitHub App is installed correctly, check that workflows are enabled, ensure API key is set in repository secrets, and confirm the comment contains `@claude` (not `/claude`). ​ CI not running on Claude’s commits Ensure you’re using the GitHub App or custom app (not Actions user), check workflow triggers include the necessary events, and verify app permissions include CI triggers. ​ Authentication errors Confirm API key is valid and has sufficient permissions. For Bedrock/Vertex, check credentials configuration and ensure secrets are named correctly in workflows. ​ Advanced configuration ​ Action parameters The Claude Code Action supports these key parameters: Parameter Description Required `prompt` The prompt to send to Claude Yes* `prompt_file` Path to file containing prompt Yes* `anthropic_api_key` Anthropic API key Yes** `max_turns` Maximum conversation turns No `timeout_minutes` Execution timeout No *Either `prompt` or `prompt_file` required **Required for direct Anthropic API, not for Bedrock/Vertex ​ Alternative integration methods While the `/install-github-app` command is the recommended approach, you can also: Custom GitHub App : For organizations needing branded usernames or custom authentication flows. Create your own GitHub App with required permissions (contents, issues, pull requests) and use the actions/create-github-app-token action to generate tokens in your workflows. Manual GitHub Actions : Direct workflow configuration for maximum flexibility MCP Configuration : Dynamic loading of Model Context Protocol servers See the Claude Code Action repository for detailed documentation. ​ Customizing Claude’s behavior You can configure Claude’s behavior in two ways: CLAUDE.md : Define coding standards, review criteria, and project-specific rules in a `CLAUDE.md` file at the root of your repository. Claude will follow these guidelines when creating PRs and responding to requests. Check out our Memory documentation for more details. Custom prompts : Use the `prompt` parameter in the workflow file to provide workflow-specific instructions. This allows you to customize Claude’s behavior for different workflows or tasks. Claude will follow these guidelines when creating PRs and responding to requests. Was this page helpful? Yes No Claude Code hooks Model Context Protocol (MCP) On this page Why use Claude Code GitHub Actions? What can Claude do? Claude Code Action Claude Code Action (Base) Setup Quick setup Manual setup Example use cases Turn issues into PRs Get implementation help Fix bugs quickly Best practices CLAUDE.md configuration Security considerations Optimizing performance CI costs Configuration examples Using with AWS Bedrock & Google Vertex AI Prerequisites For Google Cloud Vertex AI: For AWS Bedrock: Troubleshooting Claude not responding to @claude commands CI not running on Claude’s commits Authentication errors Advanced configuration Action parameters Alternative integration methods Customizing Claude’s behavior

---

### Model Context Protocol (MCP) - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/mcp

Model Context Protocol (MCP) - Anthropic Anthropic home page English Search... Search... Navigation Build with Claude Code Model Context Protocol (MCP) Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance Model Context Protocol (MCP) is an open protocol that enables LLMs to access external tools and data sources. For more details about MCP, see the MCP documentation . Use third party MCP servers at your own risk. Make sure you trust the MCP servers, and be especially careful when using MCP servers that talk to the internet, as these can expose you to prompt injection risk. ​ Configure MCP servers 1 Add an MCP stdio Server 

```
# Basic syntax
claude mcp add <name> <command> [args...]
<!-- -->
# Example: Adding a local server
claude mcp add my-server -e API_KEY=123 -- /path/to/server arg1 arg2
# This creates: command="/path/to/server", args=["arg1", "arg2"]
```

 2 Add an MCP SSE Server 

```
# Basic syntax
claude mcp add --transport sse <name> <url>
<!-- -->
# Example: Adding an SSE server
claude mcp add --transport sse sse-server https://example.com/sse-endpoint
<!-- -->
# Example: Adding an SSE server with custom headers
claude mcp add --transport sse api-server https://api.example.com/mcp --header "X-API-Key: your-key"
```

 3 Add an MCP HTTP Server 

```
# Basic syntax
claude mcp add --transport http <name> <url>
<!-- -->
# Example: Adding a streamable HTTP server
claude mcp add --transport http http-server https://example.com/mcp
<!-- -->
# Example: Adding an HTTP server with authentication header
claude mcp add --transport http secure-server https://api.example.com/mcp --header "Authorization: Bearer your-token"
```

 4 Manage your MCP servers 

```
# List all configured servers
claude mcp list
<!-- -->
# Get details for a specific server
claude mcp get my-server
<!-- -->
# Remove a server
claude mcp remove my-server
```

 Tips: Use the `-s` or `--scope` flag to specify where the configuration is stored: `local` (default): Available only to you in the current project (was called `project` in older versions) `project`: Shared with everyone in the project via `.mcp.json` file `user`: Available to you across all projects (was called `global` in older versions) Set environment variables with `-e` or `--env` flags (e.g., `-e KEY=value`) Configure MCP server startup timeout using the MCP_TIMEOUT environment variable (e.g., `MCP_TIMEOUT=10000 claude` sets a 10-second timeout) Check MCP server status any time using the `/mcp` command within Claude Code MCP follows a client-server architecture where Claude Code (the client) can connect to multiple specialized servers Claude Code supports SSE (Server-Sent Events) and streamable HTTP servers for real-time communication Use `/mcp` to authenticate with remote servers that require OAuth 2.0 authentication Windows Users : On native Windows (not WSL), local MCP servers that use `npx` require the `cmd /c` wrapper to ensure proper execution. 

```
# This creates command="cmd" which Windows can execute
claude mcp add my-server -- cmd /c npx -y @some/package
```

 Without the `cmd /c` wrapper, you’ll encounter “Connection closed” errors because Windows cannot directly execute `npx`. ​ Understanding MCP server scopes MCP servers can be configured at three different scope levels, each serving distinct purposes for managing server accessibility and sharing. Understanding these scopes helps you determine the best way to configure servers for your specific needs. ​ Scope hierarchy and precedence MCP server configurations follow a clear precedence hierarchy. When servers with the same name exist at multiple scopes, the system resolves conflicts by prioritizing local-scoped servers first, followed by project-scoped servers, and finally user-scoped servers. This design ensures that personal configurations can override shared ones when needed. ​ Local scope Local-scoped servers represent the default configuration level and are stored in your project-specific user settings. These servers remain private to you and are only accessible when working within the current project directory. This scope is ideal for personal development servers, experimental configurations, or servers containing sensitive credentials that shouldn’t be shared. 

```
# Add a local-scoped server (default)
claude mcp add my-private-server /path/to/server
<!-- -->
# Explicitly specify local scope
claude mcp add my-private-server -s local /path/to/server
```

 ​ Project scope Project-scoped servers enable team collaboration by storing configurations in a `.mcp.json` file at your project’s root directory. This file is designed to be checked into version control, ensuring all team members have access to the same MCP tools and services. When you add a project-scoped server, Claude Code automatically creates or updates this file with the appropriate configuration structure. 

```
# Add a project-scoped server
claude mcp add shared-server -s project /path/to/server
```

 The resulting `.mcp.json` file follows a standardized format: 

```
{
  "mcpServers": {
    "shared-server": {
      "command": "/path/to/server",
      "args": [],
      "env": {}
    }
  }
}
```

 For security reasons, Claude Code prompts for approval before using project-scoped servers from `.mcp.json` files. If you need to reset these approval choices, use the `claude mcp reset-project-choices` command. ​ User scope User-scoped servers provide cross-project accessibility, making them available across all projects on your machine while remaining private to your user account. This scope works well for personal utility servers, development tools, or services you frequently use across different projects. 

```
# Add a user server
claude mcp add my-user-server -s user /path/to/server
```

 ​ Choosing the right scope Select your scope based on: Local scope : Personal servers, experimental configurations, or sensitive credentials specific to one project Project scope : Team-shared servers, project-specific tools, or services required for collaboration User scope : Personal utilities needed across multiple projects, development tools, or frequently-used services ​ Environment variable expansion in `.mcp.json` Claude Code supports environment variable expansion in `.mcp.json` files, allowing teams to share configurations while maintaining flexibility for machine-specific paths and sensitive values like API keys. Supported syntax: `${VAR}` - Expands to the value of environment variable `VAR` `${VAR:-default}` - Expands to `VAR` if set, otherwise uses `default` Expansion locations: Environment variables can be expanded in: `command` - The server executable path `args` - Command-line arguments `env` - Environment variables passed to the server `url` - For SSE/HTTP server types `headers` - For SSE/HTTP server authentication Example with variable expansion: 

```
{
  "mcpServers": {
    "api-server": {
      "type": "sse",
      "url": "${API_BASE_URL:-https://api.example.com}/mcp",
      "headers": {
        "Authorization": "Bearer ${API_KEY}"
      }
    }
  }
}
```

 If a required environment variable is not set and has no default value, Claude Code will fail to parse the config. ​ Authenticate with remote MCP servers Many remote MCP servers require authentication. Claude Code supports OAuth 2.0 authentication flow for secure connection to these servers. 1 Add a remote server requiring authentication 

```
# Add an SSE or HTTP server that requires OAuth
claude mcp add --transport sse github-server https://api.github.com/mcp
```

 2 Authenticate using the /mcp command Within Claude Code, use the `/mcp` command to manage authentication: 

```
> /mcp
```

 This opens an interactive menu where you can: View connection status for all servers Authenticate with servers requiring OAuth Clear existing authentication View server capabilities 3 Complete the OAuth flow When you select “Authenticate” for a server: Your browser opens automatically to the OAuth provider Complete the authentication in your browser Claude Code receives and securely stores the access token The server connection becomes active Tips: Authentication tokens are stored securely and refreshed automatically Use “Clear authentication” in the `/mcp` menu to revoke access If your browser doesn’t open automatically, copy the provided URL OAuth authentication works with both SSE and HTTP transports ​ Connect to a Postgres MCP server Suppose you want to give Claude read-only access to a PostgreSQL database for querying and schema inspection. 1 Add the Postgres MCP server 

```
claude mcp add postgres-server /path/to/postgres-mcp-server --connection-string "postgresql://user:pass@localhost:5432/mydb"
```

 2 Query your database with Claude 

```
> describe the schema of our users table
```

 

```
> what are the most recent orders in the system?
```

 

```
> show me the relationship between customers and invoices
```

 Tips: The Postgres MCP server provides read-only access for safety Claude can help you explore database structure and run analytical queries You can use this to quickly understand database schemas in unfamiliar projects Make sure your connection string uses appropriate credentials with minimum required permissions ​ Add MCP servers from JSON configuration Suppose you have a JSON configuration for a single MCP server that you want to add to Claude Code. 1 Add an MCP server from JSON 

```
# Basic syntax
claude mcp add-json <name> '<json>'
<!-- -->
# Example: Adding a stdio server with JSON configuration
claude mcp add-json weather-api '{"type":"stdio","command":"/path/to/weather-cli","args":["--api-key","abc123"],"env":{"CACHE_DIR":"/tmp"}}'
```

 2 Verify the server was added 

```
claude mcp get weather-api
```

 Tips: Make sure the JSON is properly escaped in your shell The JSON must conform to the MCP server configuration schema You can use `-s global` to add the server to your global configuration instead of the project-specific one ​ Import MCP servers from Claude Desktop Suppose you have already configured MCP servers in Claude Desktop and want to use the same servers in Claude Code without manually reconfiguring them. 1 Import servers from Claude Desktop 

```
# Basic syntax 
claude mcp add-from-claude-desktop
```

 2 Select which servers to import After running the command, you’ll see an interactive dialog that allows you to select which servers you want to import. 3 Verify the servers were imported 

```
claude mcp list
```

 Tips: This feature only works on macOS and Windows Subsystem for Linux (WSL) It reads the Claude Desktop configuration file from its standard location on those platforms Use the `-s global` flag to add servers to your global configuration Imported servers will have the same names as in Claude Desktop If servers with the same names already exist, they will get a numerical suffix (e.g., `server_1`) ​ Use Claude Code as an MCP server Suppose you want to use Claude Code itself as an MCP server that other applications can connect to, providing them with Claude’s tools and capabilities. 1 Start Claude as an MCP server 

```
# Basic syntax
claude mcp serve
```

 2 Connect from another application You can connect to Claude Code MCP server from any MCP client, such as Claude Desktop. If you’re using Claude Desktop, you can add the Claude Code MCP server using this configuration: 

```
{
  "command": "claude",
  "args": ["mcp", "serve"],
  "env": {}
}
```

 Tips: The server provides access to Claude’s tools like View, Edit, LS, etc. In Claude Desktop, try asking Claude to read files in a directory, make edits, and more. Note that this MCP server is simply exposing Claude Code’s tools to your MCP client, so your own client is responsible for implementing user confirmation for individual tool calls. ​ Use MCP resources MCP servers can expose resources that you can reference using @ mentions, similar to how you reference files. ​ Reference MCP resources 1 List available resources Type `@` in your prompt to see available resources from all connected MCP servers. Resources appear alongside files in the autocomplete menu. 2 Reference a specific resource Use the format `@server:protocol://resource/path` to reference a resource: 

```
> Can you analyze @github:issue://123 and suggest a fix?
```

 

```
> Please review the API documentation at @docs:file://api/authentication
```

 3 Multiple resource references You can reference multiple resources in a single prompt: 

```
> Compare @postgres:schema://users with @docs:file://database/user-model
```

 Tips: Resources are automatically fetched and included as attachments when referenced Resource paths are fuzzy-searchable in the @ mention autocomplete Claude Code automatically provides tools to list and read MCP resources when servers support them Resources can contain any type of content that the MCP server provides (text, JSON, structured data, etc.) ​ Use MCP prompts as slash commands MCP servers can expose prompts that become available as slash commands in Claude Code. ​ Execute MCP prompts 1 Discover available prompts Type `/` to see all available commands, including those from MCP servers. MCP prompts appear with the format `/mcp__servername__promptname`. 2 Execute a prompt without arguments 

```
> /mcp__github__list_prs
```

 3 Execute a prompt with arguments Many prompts accept arguments. Pass them space-separated after the command: 

```
> /mcp__github__pr_review 456
```

 

```
> /mcp__jira__create_issue "Bug in login flow" high
```

 Tips: MCP prompts are dynamically discovered from connected servers Arguments are parsed based on the prompt’s defined parameters Prompt results are injected directly into the conversation Server and prompt names are normalized (spaces become underscores) Was this page helpful? Yes No GitHub Actions Troubleshooting On this page Configure MCP servers Understanding MCP server scopes Scope hierarchy and precedence Local scope Project scope User scope Choosing the right scope Environment variable expansion in .mcp.json Authenticate with remote MCP servers Connect to a Postgres MCP server Add MCP servers from JSON configuration Import MCP servers from Claude Desktop Use Claude Code as an MCP server Use MCP resources Reference MCP resources Use MCP prompts as slash commands Execute MCP prompts

---

### Troubleshooting - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/troubleshooting

Troubleshooting - Anthropic Anthropic home page English Search... Search... Navigation Build with Claude Code Troubleshooting Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance ​ Common installation issues ​ Windows installation issues: errors in WSL You might encounter the following issues in WSL: OS/platform detection issues : If you receive an error during installation, WSL may be using Windows `npm`. Try: Run `npm config set os linux` before installation Install with `npm install -g @anthropic-ai/claude-code --force --no-os-check` (Do NOT use `sudo`) Node not found errors : If you see `exec: node: not found` when running `claude`, your WSL environment may be using a Windows installation of Node.js. You can confirm this with `which npm` and `which node`, which should point to Linux paths starting with `/usr/` rather than `/mnt/c/`. To fix this, try installing Node via your Linux distribution’s package manager or via `nvm` . ​ Linux installation issues: permission errors When installing Claude Code with npm, you may encounter permission errors if your npm global prefix is not user writable (eg. `/usr`, or `/usr/local`). ​ Recommended solution: Migrate to local installation The simplest solution is to migrate to a local installation: 

```
claude migrate-installer
```

 This moves Claude Code to `~/.claude/local/` and sets up an alias in your shell configuration. No `sudo` is required for future updates. After migration, restart your shell, and then verify your installation: 

```
which claude  # Should show an alias to ~/.claude/local/claude
claude doctor # Check installation health
```

 ​ Alternative solution: Create a user-writable npm prefix for global installs You can configure npm to use a directory within your home folder: 

```
# First, save a list of your existing global packages for later migration
npm list -g --depth=0 > ~/npm-global-packages.txt
<!-- -->
# Create a directory for your global packages
mkdir -p ~/.npm-global
<!-- -->
# Configure npm to use the new directory path
npm config set prefix ~/.npm-global
<!-- -->
# Note: Replace ~/.bashrc with ~/.zshrc, ~/.profile, or other appropriate file for your shell
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
<!-- -->
# Apply the new PATH setting
source ~/.bashrc
<!-- -->
# Now reinstall Claude Code in the new location
npm install -g @anthropic-ai/claude-code
<!-- -->
# Optional: Reinstall your previous global packages in the new location
# Look at ~/npm-global-packages.txt and install packages you want to keep
```

 This solution: Avoids modifying system directory permissions Creates a clean, dedicated location for your global npm packages Follows security best practices ​ System Recovery: If you have run commands that change ownership and permissions of system files or similar If you’ve already run a command that changed system directory permissions (such as `sudo chown -R $USER:$(id -gn) /usr && sudo chmod -R u+w /usr`) and your system is now broken (for example, if you see `sudo: /usr/bin/sudo must be owned by uid 0 and have the setuid bit set`), you’ll need to perform recovery steps. Ubuntu/Debian Recovery Method: While rebooting, hold SHIFT to access the GRUB menu Select “Advanced options for Ubuntu/Debian” Choose the recovery mode option Select “Drop to root shell prompt” Remount the filesystem as writable: 

```
mount -o remount,rw /
```

 Fix permissions: 

```
# Restore root ownership
chown -R root:root /usr
chmod -R 755 /usr
<!-- -->
# Ensure /usr/local is owned by your user for npm packages
chown -R YOUR_USERNAME:YOUR_USERNAME /usr/local
<!-- -->
# Set setuid bit for critical binaries
chmod u+s /usr/bin/sudo
chmod 4755 /usr/bin/sudo
chmod u+s /usr/bin/su
chmod u+s /usr/bin/passwd
chmod u+s /usr/bin/newgrp
chmod u+s /usr/bin/gpasswd
chmod u+s /usr/bin/chsh
chmod u+s /usr/bin/chfn
<!-- -->
# Fix sudo configuration
chown root:root /usr/libexec/sudo/sudoers.so
chmod 4755 /usr/libexec/sudo/sudoers.so
chown root:root /etc/sudo.conf
chmod 644 /etc/sudo.conf
```

 Reinstall affected packages (optional but recommended): 

```
# Save list of installed packages
dpkg --get-selections > /tmp/installed_packages.txt
<!-- -->
# Reinstall them
awk '{print $1}' /tmp/installed_packages.txt | xargs -r apt-get install --reinstall -y
```

 Reboot: 

```
reboot
```

 Alternative Live USB Recovery Method: If the recovery mode doesn’t work, you can use a live USB: Boot from a live USB (Ubuntu, Debian, or any Linux distribution) Find your system partition: 

```
lsblk
```

 Mount your system partition: 

```
sudo mount /dev/sdXY /mnt  # replace sdXY with your actual system partition
```

 If you have a separate boot partition, mount it too: 

```
sudo mount /dev/sdXZ /mnt/boot  # if needed
```

 Chroot into your system: 

```
# For Ubuntu/Debian:
sudo chroot /mnt
<!-- -->
# For Arch-based systems:
sudo arch-chroot /mnt
```

 Follow steps 6-8 from the Ubuntu/Debian recovery method above After restoring your system, follow the recommended solution above to set up a user-writable npm prefix. ​ Auto-updater issues If Claude Code can’t update automatically (see Update Claude Code for how updates work): ​ For permission errors This is typically due to permission issues with your npm global prefix directory. You have several options: Migrate to local installation (recommended): Run `claude migrate-installer` to move to a local installation that avoids permission issues entirely Update manually : Run `claude update` with appropriate permissions Fix npm permissions : Follow the recommended solution above (more complex) ​ To disable auto-updates If you prefer to control when Claude Code updates: 

```
# Via configuration
claude config set autoUpdates false --global
<!-- -->
# Or via environment variable
export DISABLE_AUTOUPDATER=1
```

 ​ To check your installation Current version and diagnostics : Run `claude doctor` Check for updates : Run `claude update` View update settings : Run `claude config get autoUpdates --global` Verify installation location : Run `which claude` - if this shows an alias pointing to `~/.claude/local/claude`, you’re using the recommended local installation ​ Permissions and authentication ​ Repeated permission prompts If you find yourself repeatedly approving the same commands, you can allow specific tools to run without approval using the `/permissions` command. See Permissions docs . ​ Authentication issues If you’re experiencing authentication problems: Run `/logout` to sign out completely Close Claude Code Restart with `claude` and complete the authentication process again If problems persist, try: 

```
rm -rf ~/.config/claude-code/auth.json
claude
```

 This removes your stored authentication information and forces a clean login. ​ Performance and stability ​ High CPU or memory usage Claude Code is designed to work with most development environments, but may consume significant resources when processing large codebases. If you’re experiencing performance issues: Use `/compact` regularly to reduce context size Close and restart Claude Code between major tasks Consider adding large build directories to your `.gitignore` file ​ Command hangs or freezes If Claude Code seems unresponsive: Press Ctrl+C to attempt to cancel the current operation If unresponsive, you may need to close the terminal and restart ​ ESC key not working in JetBrains (IntelliJ, PyCharm, etc.) terminals If you’re using Claude Code in JetBrains terminals and the ESC key doesn’t interrupt the agent as expected, this is likely due to a keybinding clash with JetBrains’ default shortcuts. To fix this issue: Go to Settings → Tools → Terminal Click the “Configure terminal keybindings” hyperlink next to “Override IDE Shortcuts” Within the terminal keybindings, scroll down to “Switch focus to Editor” and delete that shortcut This will allow the ESC key to properly function for canceling Claude Code operations instead of being captured by PyCharm’s “Switch focus to Editor” action. ​ Getting more help If you’re experiencing issues not covered here: Use the `/bug` command within Claude Code to report problems directly to Anthropic Check the GitHub repository for known issues Run `/doctor` to check the health of your Claude Code installation Ask Claude directly about its capabilities and features - Claude has built-in access to its documentation Was this page helpful? Yes No Model Context Protocol (MCP) Overview On this page Common installation issues Windows installation issues: errors in WSL Linux installation issues: permission errors Recommended solution: Migrate to local installation Alternative solution: Create a user-writable npm prefix for global installs System Recovery: If you have run commands that change ownership and permissions of system files or similar Auto-updater issues For permission errors To disable auto-updates To check your installation Permissions and authentication Repeated permission prompts Authentication issues Performance and stability High CPU or memory usage Command hangs or freezes ESC key not working in JetBrains (IntelliJ, PyCharm, etc.) terminals Getting more help

---

### Enterprise deployment overview - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/third-party-integrations

Enterprise deployment overview - Anthropic Anthropic home page English Search... Search... Navigation Deployment Enterprise deployment overview Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance This page provides an overview of available deployment options and helps you choose the right configuration for your organization. ​ Provider comparison Feature Anthropic Amazon Bedrock Google Vertex AI Regions Supported countries Multiple AWS regions Multiple GCP regions Prompt caching Enabled by default Enabled by default Enabled by default Authentication API key AWS credentials (IAM) GCP credentials (OAuth/Service Account) Cost tracking Dashboard AWS Cost Explorer GCP Billing Enterprise features Teams, usage monitoring IAM policies, CloudTrail IAM roles, Cloud Audit Logs ​ Cloud providers Amazon Bedrock Use Claude models through AWS infrastructure with IAM-based authentication and AWS-native monitoring Google Vertex AI Access Claude models via Google Cloud Platform with enterprise-grade security and compliance ​ Corporate infrastructure Corporate Proxy Configure Claude Code to work with your organization’s proxy servers and SSL/TLS requirements LLM Gateway Deploy centralized model access with usage tracking, budgeting, and audit logging ​ Configuration overview Claude Code supports flexible configuration options that allow you to combine different providers and infrastructure: Understand the difference between: Corporate proxy : An HTTP/HTTPS proxy for routing traffic (set via `HTTPS_PROXY` or `HTTP_PROXY`) LLM Gateway : A service that handles authentication and provides provider-compatible endpoints (set via `ANTHROPIC_BASE_URL`, `ANTHROPIC_BEDROCK_BASE_URL`, or `ANTHROPIC_VERTEX_BASE_URL`) Both configurations can be used in tandem. ​ Using Bedrock with corporate proxy Route Bedrock traffic through a corporate HTTP/HTTPS proxy: 

```
# Enable Bedrock
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1
<!-- -->
# Configure corporate proxy
export HTTPS_PROXY='https://proxy.example.com:8080'
```

 ​ Using Bedrock with LLM Gateway Use a gateway service that provides Bedrock-compatible endpoints: 

```
# Enable Bedrock
export CLAUDE_CODE_USE_BEDROCK=1
<!-- -->
# Configure LLM gateway
export ANTHROPIC_BEDROCK_BASE_URL='https://your-llm-gateway.com/bedrock'
export CLAUDE_CODE_SKIP_BEDROCK_AUTH=1  # If gateway handles AWS auth
```

 ​ Using Vertex AI with corporate proxy Route Vertex AI traffic through a corporate HTTP/HTTPS proxy: 

```
# Enable Vertex
export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION=us-east5
export ANTHROPIC_VERTEX_PROJECT_ID=your-project-id
<!-- -->
# Configure corporate proxy
export HTTPS_PROXY='https://proxy.example.com:8080'
```

 ​ Using Vertex AI with LLM Gateway Combine Google Vertex AI models with an LLM gateway for centralized management: 

```
# Enable Vertex
export CLAUDE_CODE_USE_VERTEX=1
<!-- -->
# Configure LLM gateway
export ANTHROPIC_VERTEX_BASE_URL='https://your-llm-gateway.com/vertex'
export CLAUDE_CODE_SKIP_VERTEX_AUTH=1  # If gateway handles GCP auth
```

 ​ Authentication configuration Claude Code uses the `ANTHROPIC_AUTH_TOKEN` for the `Authorization` header when needed. The `SKIP_AUTH` flags (`CLAUDE_CODE_SKIP_BEDROCK_AUTH`, `CLAUDE_CODE_SKIP_VERTEX_AUTH`) are used in LLM gateway scenarios where the gateway handles provider authentication. ​ Choosing the right deployment configuration Consider these factors when selecting your deployment approach: ​ Direct provider access Best for organizations that: Want the simplest setup Have existing AWS or GCP infrastructure Need provider-native monitoring and compliance ​ Corporate proxy Best for organizations that: Have existing corporate proxy requirements Need traffic monitoring and compliance Must route all traffic through specific network paths ​ LLM Gateway Best for organizations that: Need usage tracking across teams Want to dynamically switch between models Require custom rate limiting or budgets Need centralized authentication management ​ Debugging When debugging your deployment: Use the `claude /status` slash command . This command provides observability into any applied authentication, proxy, and URL settings. Set environment variable `export ANTHROPIC_LOG=debug` to log requests. ​ Best practices for organizations We strongly recommend investing in documentation so that Claude Code understands your codebase. Many organizations make a `CLAUDE.md` file (which we also refer to as memory) in the root of the repository that contains the system architecture, how to run tests and other common commands, and best practices for contributing to the codebase. This file is typically checked into source control so that all users can benefit from it. Learn more . If you have a custom development environment, we find that creating a “one click” way to install Claude Code is key to growing adoption across an organization. Encourage new users to try Claude Code for codebase Q&A, or on smaller bug fixes or feature requests. Ask Claude Code to make a plan. Check Claude’s suggestions and give feedback if it’s off-track. Over time, as users understand this new paradigm better, then they’ll be more effective at letting Claude Code run more agentically. Security teams can configure managed permissions for what Claude Code is and is not allowed to do, which cannot be overwritten by local configuration. Learn more . MCP is a great way to give Claude Code more information, such as connecting to ticket management systems or error logs. We recommend that one central team configures MCP servers and checks a `.mcp.json` configuration into the codebase so that all users benefit. Learn more . At Anthropic, we trust Claude Code to power development across every Anthropic codebase. We hope you enjoy using Claude Code as much as we do! ​ Next steps Set up Amazon Bedrock for AWS-native deployment Configure Google Vertex AI for GCP deployment Implement Corporate Proxy for network requirements Deploy LLM Gateway for enterprise management Settings for configuration options and environment variables Was this page helpful? Yes No Troubleshooting Amazon Bedrock On this page Provider comparison Cloud providers Corporate infrastructure Configuration overview Using Bedrock with corporate proxy Using Bedrock with LLM Gateway Using Vertex AI with corporate proxy Using Vertex AI with LLM Gateway Authentication configuration Choosing the right deployment configuration Direct provider access Corporate proxy LLM Gateway Debugging Best practices for organizations Next steps

---

### Claude Code on Amazon Bedrock - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/amazon-bedrock

Claude Code on Amazon Bedrock - Anthropic Anthropic home page English Search... Search... Navigation Deployment Claude Code on Amazon Bedrock Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance ​ Prerequisites Before configuring Claude Code with Bedrock, ensure you have: An AWS account with Bedrock access enabled Access to desired Claude models (e.g., Claude Sonnet 4) in Bedrock AWS CLI installed and configured (optional - only needed if you don’t have another mechanism for getting credentials) Appropriate IAM permissions ​ Setup ​ 1. Enable model access First, ensure you have access to the required Claude models in your AWS account: Navigate to the Amazon Bedrock console Go to Model access in the left navigation Request access to desired Claude models (e.g., Claude Sonnet 4) Wait for approval (usually instant for most regions) ​ 2. Configure AWS credentials Claude Code uses the default AWS SDK credential chain. Set up your credentials using one of these methods: Option A: AWS CLI configuration 

```
aws configure
```

 Option B: Environment variables (access key) 

```
export AWS_ACCESS_KEY_ID=your-access-key-id
export AWS_SECRET_ACCESS_KEY=your-secret-access-key
export AWS_SESSION_TOKEN=your-session-token
```

 Option C: Environment variables (SSO profile) 

```
aws sso login --profile=<your-profile-name>
<!-- -->
export AWS_PROFILE=your-profile-name
```

 Option D: Bedrock API keys 

```
export AWS_BEARER_TOKEN_BEDROCK=your-bedrock-api-key
```

 Bedrock API keys provide a simpler authentication method without needing full AWS credentials. Learn more about Bedrock API keys . ​ Advanced credential configuration Claude Code supports automatic credential refresh for AWS SSO and corporate identity providers. Add these settings to your Claude Code settings file (see Settings for file locations). When Claude Code detects that your AWS credentials are expired (either locally based on their timestamp or when Bedrock returns a credential error), it will automatically run your configured `awsAuthRefresh` and/or `awsCredentialExport` commands to obtain new credentials before retrying the request. Example configuration 

```
{
  "awsAuthRefresh": "aws sso login --profile myprofile",
  "env": {
    "AWS_PROFILE": "myprofile"
  }
}
```

 Configuration settings explained `awsAuthRefresh` : Use this for commands that modify the `.aws` directory (e.g., updating credentials, SSO cache, or config files). Output is shown to the user (but user input is not supported), making it suitable for browser-based authentication flows where the CLI displays a code to enter in the browser. `awsCredentialExport` : Only use this if you cannot modify `.aws` and must directly return credentials. Output is captured silently (not shown to the user). The command must output JSON in this format: 

```
{
  "Credentials": {
    "AccessKeyId": "value",
    "SecretAccessKey": "value",
    "SessionToken": "value"
  }
}
```

 ​ 3. Configure Claude Code Set the following environment variables to enable Bedrock: 

```
# Enable Bedrock integration
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1  # or your preferred region
<!-- -->
# Optional: Override the region for the small/fast model (Haiku)
export ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION=us-west-2
```

 When enabling Bedrock for Claude Code, keep the following in mind: `AWS_REGION` is a required environment variable. Claude Code does not read from the `.aws` config file for this setting. When using Bedrock, the `/login` and `/logout` commands are disabled since authentication is handled through AWS credentials. You can use settings files for environment variables like `AWS_PROFILE` that you don’t want to leak to other processes. See Settings for more information. ​ 4. Model configuration Claude Code uses these default models for Bedrock: Model type Default value Primary model `us.anthropic.claude-3-7-sonnet-20250219-v1:0` Small/fast model `us.anthropic.claude-3-5-haiku-20241022-v1:0` To customize models, use one of these methods: 

```
# Using inference profile ID
export ANTHROPIC_MODEL='us.anthropic.claude-opus-4-20250514-v1:0'
export ANTHROPIC_SMALL_FAST_MODEL='us.anthropic.claude-3-5-haiku-20241022-v1:0'
<!-- -->
# Using application inference profile ARN
export ANTHROPIC_MODEL='arn:aws:bedrock:us-east-2:your-account-id:application-inference-profile/your-model-id'
<!-- -->
# Optional: Disable prompt caching if needed
export DISABLE_PROMPT_CACHING=1
```

 Prompt caching may not be available in all regions ​ 5. Output token configuration When using Claude Code with Amazon Bedrock, we recommend the following token settings: 

```
# Recommended output token settings for Bedrock
export CLAUDE_CODE_MAX_OUTPUT_TOKENS=4096
export MAX_THINKING_TOKENS=1024
```

 Why these values: `CLAUDE_CODE_MAX_OUTPUT_TOKENS=4096` : Bedrock’s burndown throttling logic sets a minimum of 4096 tokens as the max_token penalty. Setting this lower won’t reduce costs but may cut off long tool uses, causing the Claude Code agent loop to fail persistently. Claude Code typically uses less than 4096 output tokens without extended thinking, but may need this headroom for tasks involving significant file creation or Write tool usage. `MAX_THINKING_TOKENS=1024` : This provides space for extended thinking without cutting off tool use responses, while still maintaining focused reasoning chains. This balance helps prevent trajectory changes that aren’t always helpful for coding tasks specifically. ​ IAM configuration Create an IAM policy with the required permissions for Claude Code: 

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream",
        "bedrock:ListInferenceProfiles"
      ],
      "Resource": [
        "arn:aws:bedrock:*:*:inference-profile/*",
        "arn:aws:bedrock:*:*:application-inference-profile/*"
      ]
    }
  ]
}
```

 For more restrictive permissions, you can limit the Resource to specific inference profile ARNs. For details, see Bedrock IAM documentation . We recommend creating a dedicated AWS account for Claude Code to simplify cost tracking and access control. ​ Troubleshooting If you encounter region issues: Check model availability: `aws bedrock list-inference-profiles --region your-region` Switch to a supported region: `export AWS_REGION=us-east-1` Consider using inference profiles for cross-region access If you receive an error “on-demand throughput isn’t supported”: Specify the model as an inference profile ID ​ Additional resources Bedrock documentation Bedrock pricing Bedrock inference profiles Claude Code on Amazon Bedrock: Quick Setup Guide Was this page helpful? Yes No Overview Google Vertex AI On this page Prerequisites Setup 1. Enable model access 2. Configure AWS credentials Advanced credential configuration 3. Configure Claude Code 4. Model configuration 5. Output token configuration IAM configuration Troubleshooting Additional resources

---

### Claude Code on Google Vertex AI - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/google-vertex-ai

Claude Code on Google Vertex AI - Anthropic Anthropic home page English Search... Search... Navigation Deployment Claude Code on Google Vertex AI Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Data usage Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Legal and compliance ​ Prerequisites Before configuring Claude Code with Vertex AI, ensure you have: A Google Cloud Platform (GCP) account with billing enabled A GCP project with Vertex AI API enabled Access to desired Claude models (e.g., Claude Sonnet 4) Google Cloud SDK (`gcloud`) installed and configured Quota allocated in desired GCP region Vertex AI may not support the Claude Code default models on non-`us-east5` regions. Ensure you are using `us-east5` and have quota allocated, or switch to supported models. ​ Setup ​ 1. Enable Vertex AI API Enable the Vertex AI API in your GCP project: 

```
# Set your project ID
gcloud config set project YOUR-PROJECT-ID
<!-- -->
# Enable Vertex AI API
gcloud services enable aiplatform.googleapis.com
```

 ​ 2. Request model access Request access to Claude models in Vertex AI: Navigate to the Vertex AI Model Garden Search for “Claude” models Request access to desired Claude models (e.g., Claude Sonnet 4) Wait for approval (may take 24-48 hours) ​ 3. Configure GCP credentials Claude Code uses standard Google Cloud authentication. For more information, see Google Cloud authentication documentation . ​ 4. Configure Claude Code Set the following environment variables: 

```
# Enable Vertex AI integration
export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION=us-east5
export ANTHROPIC_VERTEX_PROJECT_ID=YOUR-PROJECT-ID
<!-- -->
# Optional: Disable prompt caching if needed
export DISABLE_PROMPT_CACHING=1
<!-- -->
# Optional: Override regions for specific models
export VERTEX_REGION_CLAUDE_3_5_HAIKU=us-central1
export VERTEX_REGION_CLAUDE_3_5_SONNET=us-east5
export VERTEX_REGION_CLAUDE_3_7_SONNET=us-east5
export VERTEX_REGION_CLAUDE_4_0_OPUS=europe-west4
export VERTEX_REGION_CLAUDE_4_0_SONNET=us-east5
```

 Prompt caching is automatically supported when you specify the `cache_control` ephemeral flag. To disable it, set `DISABLE_PROMPT_CACHING=1`. For heightened rate limits, contact Google Cloud support. When using Vertex AI, the `/login` and `/logout` commands are disabled since authentication is handled through Google Cloud credentials. ​ 5. Model configuration Claude Code uses these default models for Vertex AI: Model type Default value Primary model `claude-sonnet-4@20250514` Small/fast model `claude-3-5-haiku@20241022` To customize models: 

```
export ANTHROPIC_MODEL='claude-opus-4@20250514'
export ANTHROPIC_SMALL_FAST_MODEL='claude-3-5-haiku@20241022'
```

 ​ IAM configuration Assign the required IAM permissions: The `roles/aiplatform.user` role includes the required permissions: `aiplatform.endpoints.predict` - Required for model invocation `aiplatform.endpoints.computeTokens` - Required for token counting For more restrictive permissions, create a custom role with only the permissions above. For details, see Vertex IAM documentation . We recommend creating a dedicated GCP project for Claude Code to simplify cost tracking and access control. ​ Troubleshooting If you encounter quota issues: Check current quotas or request quota increase through Cloud Console If you encounter “model not found” 404 errors: Verify you have access to the specified region Confirm model is Enabled in Model Garden If you encounter 429 errors: Ensure the primary model and small/fast model are supported in your selected region ​ Additional resources Vertex AI documentation Vertex AI pricing Vertex AI quotas and limits Was this page helpful? Yes No Amazon Bedrock Corporate proxy On this page Prerequisites Setup 1. Enable Vertex AI API 2. Request model access 3. Configure GCP credentials 4. Configure Claude Code 5. Model configuration IAM configuration Troubleshooting Additional resources

---

### Corporate proxy configuration - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/corporate-proxy

Corporate proxy configuration - Anthropic Anthropic home page English Search... Search... Navigation Deployment Corporate proxy configuration Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance Claude Code supports standard HTTP/HTTPS proxy configurations through environment variables. This allows you to route all Claude Code traffic through your organization’s proxy servers for security, compliance, and monitoring purposes. ​ Basic proxy configuration ​ Environment variables Claude Code respects standard proxy environment variables: 

```
# HTTPS proxy (recommended)
export HTTPS_PROXY=https://proxy.example.com:8080
<!-- -->
# HTTP proxy (if HTTPS not available)
export HTTP_PROXY=http://proxy.example.com:8080
```

 Claude Code currently does not support the `NO_PROXY` environment variable. All traffic will be routed through the configured proxy. Claude Code does not support SOCKS proxies. ​ Authentication ​ Basic authentication If your proxy requires basic authentication, include credentials in the proxy URL: 

```
export HTTPS_PROXY=http://username:password@proxy.example.com:8080
```

 Avoid hardcoding passwords in scripts. Use environment variables or secure credential storage instead. For proxies requiring advanced authentication (NTLM, Kerberos, etc.), consider using an LLM Gateway service that supports your authentication method. ​ SSL certificate issues If your proxy uses custom SSL certificates, you may encounter certificate errors. Ensure that you set the correct certificate bundle path: 

```
export SSL_CERT_FILE=/path/to/certificate-bundle.crt
export NODE_EXTRA_CA_CERTS=/path/to/certificate-bundle.crt
```

 ​ Network access requirements Claude Code requires access to the following URLs: `api.anthropic.com` - Claude API endpoints `statsig.anthropic.com` - Telemetry and metrics `sentry.io` - Error reporting Ensure these URLs are allowlisted in your proxy configuration and firewall rules. This is especially important when using Claude Code in containerized or restricted network environments. ​ Additional resources Claude Code settings Environment variables reference Troubleshooting guide Was this page helpful? Yes No Google Vertex AI LLM gateway On this page Basic proxy configuration Environment variables Authentication Basic authentication SSL certificate issues Network access requirements Additional resources

---

### LLM gateway configuration - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/llm-gateway

LLM gateway configuration - Anthropic Anthropic home page English Search... Search... Navigation Deployment LLM gateway configuration Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance LLM gateways provide a centralized proxy layer between Claude Code and model providers, offering: Centralized authentication - Single point for API key management Usage tracking - Monitor usage across teams and projects Cost controls - Implement budgets and rate limits Audit logging - Track all model interactions for compliance Model routing - Switch between providers without code changes ​ LiteLLM configuration LiteLLM is a third-party proxy service. Anthropic doesn’t endorse, maintain, or audit LiteLLM’s security or functionality. This guide is provided for informational purposes and may become outdated. Use at your own discretion. ​ Prerequisites Claude Code updated to the latest version LiteLLM Proxy Server deployed and accessible Access to Claude models through your chosen provider ​ Basic LiteLLM setup Configure Claude Code : ​ Authentication methods Static API key Simplest method using a fixed API key: 

```
# Set in environment
export ANTHROPIC_AUTH_TOKEN=sk-litellm-static-key
<!-- -->
# Or in Claude Code settings
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "sk-litellm-static-key"
  }
}
```

 This value will be sent as the `Authorization` header. Dynamic API key with helper For rotating keys or per-user authentication: Create an API key helper script: 

```
#!/bin/bash
# ~/bin/get-litellm-key.sh
<!-- -->
# Example: Fetch key from vault
vault kv get -field=api_key secret/litellm/claude-code
<!-- -->
# Example: Generate JWT token
jwt encode \
  --secret="${JWT_SECRET}" \
  --exp="+1h" \
  '{"user":"'${USER}'","team":"engineering"}'
```

 Configure Claude Code settings to use the helper: 

```
{
  "apiKeyHelper": "~/bin/get-litellm-key.sh"
}
```

 Set token refresh interval: 

```
# Refresh every hour (3600000 ms)
export CLAUDE_CODE_API_KEY_HELPER_TTL_MS=3600000
```

 This value will be sent as `Authorization` and `X-Api-Key` headers. The `apiKeyHelper` has lower precedence than `ANTHROPIC_AUTH_TOKEN` or `ANTHROPIC_API_KEY`. ​ Unified endpoint (recommended) Using LiteLLM’s Anthropic format endpoint : 

```
export ANTHROPIC_BASE_URL=https://litellm-server:4000
```

 Benefits of the unified endpoint over pass-through endpoints: Load balancing Fallbacks Consistent support for cost tracking and end-user tracking ​ Provider-specific pass-through endpoints (alternative) Anthropic API through LiteLLM Using pass-through endpoint : 

```
export ANTHROPIC_BASE_URL=https://litellm-server:4000/anthropic
```

 Amazon Bedrock through LiteLLM Using pass-through endpoint : 

```
export ANTHROPIC_BEDROCK_BASE_URL=https://litellm-server:4000/bedrock
export CLAUDE_CODE_SKIP_BEDROCK_AUTH=1
export CLAUDE_CODE_USE_BEDROCK=1
```

 Google Vertex AI through LiteLLM Using pass-through endpoint : 

```
export ANTHROPIC_VERTEX_BASE_URL=https://litellm-server:4000/vertex_ai/v1
export ANTHROPIC_VERTEX_PROJECT_ID=your-gcp-project-id
export CLAUDE_CODE_SKIP_VERTEX_AUTH=1
export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION=us-east5
```

 ​ Model selection By default, the models will use those specified in Model configuration . If you have configured custom model names in LiteLLM, set the aforementioned environment variables to those custom names. For more detailed information, refer to the LiteLLM documentation . ​ Additional resources LiteLLM documentation Claude Code settings Corporate proxy setup Third-party integrations overview Was this page helpful? Yes No Corporate proxy Development containers On this page LiteLLM configuration Prerequisites Basic LiteLLM setup Authentication methods Unified endpoint (recommended) Provider-specific pass-through endpoints (alternative) Model selection Additional resources

---

### Development containers - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/devcontainer

Development containers - Anthropic Anthropic home page English Search... Search... Navigation Deployment Development containers Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Data usage Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Legal and compliance The preconfigured devcontainer setup works seamlessly with VS Code’s Remote - Containers extension and similar tools. The container’s enhanced security measures (isolation and firewall rules) allow you to run `claude --dangerously-skip-permissions` to bypass permission prompts for unattended operation. We’ve included a reference implementation that you can customize for your needs. While the devcontainer provides substantial protections, no system is completely immune to all attacks. When executed with `--dangerously-skip-permissions`, devcontainers do not prevent a malicious project from exfiltrating anything accessible in the devcontainer including Claude Code credentials. We recommend only using devcontainers when developing with trusted repositories. Always maintain good security practices and monitor Claude’s activities. ​ Key features Production-ready Node.js : Built on Node.js 20 with essential development dependencies Security by design : Custom firewall restricting network access to only necessary services Developer-friendly tools : Includes git, ZSH with productivity enhancements, fzf, and more Seamless VS Code integration : Pre-configured extensions and optimized settings Session persistence : Preserves command history and configurations between container restarts Works everywhere : Compatible with macOS, Windows, and Linux development environments ​ Getting started in 4 steps Install VS Code and the Remote - Containers extension Clone the Claude Code reference implementation repository Open the repository in VS Code When prompted, click “Reopen in Container” (or use Command Palette: Cmd+Shift+P → “Remote-Containers: Reopen in Container”) ​ Configuration breakdown The devcontainer setup consists of three primary components: devcontainer.json : Controls container settings, extensions, and volume mounts Dockerfile : Defines the container image and installed tools init-firewall.sh : Establishes network security rules ​ Security features The container implements a multi-layered security approach with its firewall configuration: Precise access control : Restricts outbound connections to whitelisted domains only (npm registry, GitHub, Anthropic API, etc.) Allowed outbound connections : The firewall permits outbound DNS and SSH connections Default-deny policy : Blocks all other external network access Startup verification : Validates firewall rules when the container initializes Isolation : Creates a secure development environment separated from your main system ​ Customization options The devcontainer configuration is designed to be adaptable to your needs: Add or remove VS Code extensions based on your workflow Modify resource allocations for different hardware environments Adjust network access permissions Customize shell configurations and developer tooling ​ Example use cases ​ Secure client work Use devcontainers to isolate different client projects, ensuring code and credentials never mix between environments. ​ Team onboarding New team members can get a fully configured development environment in minutes, with all necessary tools and settings pre-installed. ​ Consistent CI/CD environments Mirror your devcontainer configuration in CI/CD pipelines to ensure development and production environments match. ​ Related resources VS Code devcontainers documentation Claude Code security best practices Corporate proxy configuration Was this page helpful? Yes No LLM gateway Advanced installation On this page Key features Getting started in 4 steps Configuration breakdown Security features Customization options Example use cases Secure client work Team onboarding Consistent CI/CD environments Related resources

---

### Set up Claude Code - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/setup

Set up Claude Code - Anthropic Anthropic home page English Search... Search... Navigation Administration Set up Claude Code Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance ​ System requirements Operating Systems : macOS 10.15+, Ubuntu 20.04+/Debian 10+, or Windows 10+ (with WSL 1, WSL 2, or Git for Windows) Hardware : 4GB+ RAM Software : Node.js 18+ Network : Internet connection required for authentication and AI processing Shell : Works best in Bash, Zsh or Fish Location : Anthropic supported countries ​ Standard installation To install Claude Code, run the following command: 

```
npm install -g @anthropic-ai/claude-code
```

 Do NOT use `sudo npm install -g` as this can lead to permission issues and security risks. If you encounter permission errors, see configure Claude Code for recommended solutions. Some users may be automatically migrated to an improved installation method. Run `claude doctor` after installation to check your installation type. After the installation process completes, navigate to your project and start Claude Code: 

```
cd your-awesome-project
claude
```

 Claude Code offers the following authentication options: Anthropic Console : The default option. Connect through the Anthropic Console and complete the OAuth process. Requires active billing at console.anthropic.com . Claude App (with Pro or Max plan) : Subscribe to Claude’s Pro or Max plan for a unified subscription that includes both Claude Code and the web interface. Get more value at the same price point while managing your account in one place. Log in with your Claude.ai account. During launch, choose the option that matches your subscription type. Enterprise platforms : Configure Claude Code to use Amazon Bedrock or Google Vertex AI for enterprise deployments with your existing cloud infrastructure. Claude Code securely stores your credentials. See Credential Management for details. ​ Windows setup Option 1: Claude Code within WSL Both WSL 1 and WSL 2 are supported Option 2: Claude Code on native Windows with Git Bash Requires Git for Windows For portable Git installations, specify the path to your `bash.exe`: 

```
$env:CLAUDE_CODE_GIT_BASH_PATH="C:\Program Files\Git\bin\bash.exe"
```

 ​ Alternative installation methods Claude Code offers multiple installation methods to suit different environments. If you encounter any issues during installation, consult the troubleshooting guide . Run `claude doctor` after installation to check your installation type and version. ​ Global npm installation Traditional method shown in the install steps above ​ Local installation After global install via npm, use `claude migrate-installer` to move to local Avoids autoupdater npm permission issues Some users may be automatically migrated to this method ​ Native binary installation (Alpha) Use `claude install` from an existing installation or `curl -fsSL claude.ai/install.sh | bash` for a fresh install Currently in alpha testing Platform support: macOS, Linux, Windows (via WSL) ​ Running on AWS or GCP By default, Claude Code uses Anthropic’s API. For details on running Claude Code on AWS or GCP, see third-party integrations . ​ Update Claude Code ​ Auto updates Claude Code automatically keeps itself up to date to ensure you have the latest features and security fixes. Update checks : Performed on startup and periodically while running Update process : Downloads and installs automatically in the background Notifications : You’ll see a notification when updates are installed Applying updates : Updates take effect the next time you start Claude Code Disable auto-updates: 

```
# Via configuration
claude config set autoUpdates false --global
<!-- -->
# Or via environment variable
export DISABLE_AUTOUPDATER=1
```

 ​ Update manually 

```
claude update
```

 Was this page helpful? Yes No Development containers Identity and Access Management On this page System requirements Standard installation Windows setup Alternative installation methods Global npm installation Local installation Native binary installation (Alpha) Running on AWS or GCP Update Claude Code Auto updates Update manually

---

### Identity and Access Management - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/iam

Identity and Access Management - Anthropic Anthropic home page English Search... Search... Navigation Administration Identity and Access Management Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance ​ Authentication methods Setting up Claude Code requires access to Anthropic models. For teams, you can set up Claude Code access in one of three ways: Anthropic API via the Anthropic Console Amazon Bedrock Google Vertex AI ​ Anthropic API authentication To set up Claude Code access for your team via Anthropic API: Use your existing Anthropic Console account or create a new Anthropic Console account You can add users through either method below: Bulk invite users from within the Console (Console -> Settings -> Members -> Invite) Set up SSO When inviting users, they need one of the following roles: “Claude Code” role means users can only create Claude Code API keys “Developer” role means users can create any kind of API key Each invited user needs to complete these steps: Accept the Console invite Check system requirements Install Claude Code Login with Console account credentials ​ Cloud provider authentication To set up Claude Code access for your team via Bedrock or Vertex: Follow the Bedrock docs or Vertex docs Distribute the environment variables and instructions for generating cloud credentials to your users. Read more about how to manage configuration here . Users can install Claude Code ​ Access control and permissions We support fine-grained permissions so that you’re able to specify exactly what the agent is allowed to do (e.g. run tests, run linter) and what it is not allowed to do (e.g. update cloud infrastructure). These permission settings can be checked into version control and distributed to all developers in your organization, as well as customized by individual developers. ​ Permission system Claude Code uses a tiered permission system to balance power and safety: Tool Type Example Approval Required ”Yes, don’t ask again” Behavior Read-only File reads, LS, Grep No N/A Bash Commands Shell execution Yes Permanently per project directory and command File Modification Edit/write files Yes Until session end ​ Configuring permissions You can view & manage Claude Code’s tool permissions with `/permissions`. This UI lists all permission rules and the settings.json file they are sourced from. Allow rules will allow Claude Code to use the specified tool without further manual approval. Deny rules will prevent Claude Code from using the specified tool. Deny rules take precedence over allow rules. Additional directories extend Claude’s file access to directories beyond the initial working directory. Default mode controls Claude’s permission behavior when encountering new requests. Permission rules use the format: `Tool` or `Tool(optional-specifier)` A rule that is just the tool name matches any use of that tool. For example, adding `Bash` to the list of allow rules would allow Claude Code to use the Bash tool without requiring user approval. ​ Permission modes Claude Code supports several permission modes that can be set as the `defaultMode` in settings files : Mode Description `default` Standard behavior - prompts for permission on first use of each tool `acceptEdits` Automatically accepts file edit permissions for the session `plan` Plan mode - Claude can analyze but not modify files or execute commands `bypassPermissions` Skips all permission prompts (requires safe environment - see warning below) ​ Working directories By default, Claude has access to files in the directory where it was launched. You can extend this access: During startup : Use `--add-dir <path>` CLI argument During session : Use `/add-dir` slash command Persistent configuration : Add to `additionalDirectories` in settings files Files in additional directories follow the same permission rules as the original working directory - they become readable without prompts, and file editing permissions follow the current permission mode. ​ Tool-specific permission rules Some tools support more fine-grained permission controls: Bash `Bash(npm run build)` Matches the exact Bash command `npm run build` `Bash(npm run test:*)` Matches Bash commands starting with `npm run test`. Claude Code is aware of shell operators (like `&&`) so a prefix match rule like `Bash(safe-cmd:*)` won’t give it permission to run the command `safe-cmd && other-cmd` Read & Edit `Edit` rules apply to all built-in tools that edit files. Claude will make a best-effort attempt to apply `Read` rules to all built-in tools that read files like Grep, Glob, and LS. Read & Edit rules both follow the gitignore specification. Patterns are resolved relative to the directory containing `.claude/settings.json`. To reference an absolute path, use `//`. For a path relative to your home directory, use `~/`. `Edit(docs/**)` Matches edits to files in the `docs` directory of your project `Read(~/.zshrc)` Matches reads to your `~/.zshrc` file `Edit(//tmp/scratch.txt)` Matches edits to `/tmp/scratch.txt` WebFetch `WebFetch(domain:example.com)` Matches fetch requests to example.com MCP `mcp__puppeteer` Matches any tool provided by the `puppeteer` server (name configured in Claude Code) `mcp__puppeteer__puppeteer_navigate` Matches the `puppeteer_navigate` tool provided by the `puppeteer` server ​ Additional permission control with hooks Claude Code hooks provide a way to register custom shell commands to perform permission evaluation at runtime. When Claude Code makes a tool call, PreToolUse hooks run before the permission system runs, and the hook output can determine whether to approve or deny the tool call in place of the permission system. ​ Enterprise managed policy settings For enterprise deployments of Claude Code, we support enterprise managed policy settings that take precedence over user and project settings. This allows system administrators to enforce security policies that users cannot override. System administrators can deploy policies to: macOS: `/Library/Application Support/ClaudeCode/managed-settings.json` Linux and WSL: `/etc/claude-code/managed-settings.json` Windows: `C:\ProgramData\ClaudeCode\managed-settings.json` These policy files follow the same format as regular settings files but cannot be overridden by user or project settings. This ensures consistent security policies across your organization. ​ Settings precedence When multiple settings sources exist, they are applied in the following order (highest to lowest precedence): Enterprise policies Command line arguments Local project settings (`.claude/settings.local.json`) Shared project settings (`.claude/settings.json`) User settings (`~/.claude/settings.json`) This hierarchy ensures that organizational policies are always enforced while still allowing flexibility at the project and user levels where appropriate. ​ Credential management Claude Code securely manages your authentication credentials: Storage location : On macOS, API keys, OAuth tokens, and other credentials are stored in the encrypted macOS Keychain. Supported authentication types : Claude.ai credentials, Anthropic API credentials, Bedrock Auth, and Vertex Auth. Custom credential scripts : The `apiKeyHelper` setting can be configured to run a shell script that returns an API key. Refresh intervals : By default, `apiKeyHelper` is called after 5 minutes or on HTTP 401 response. Set `CLAUDE_CODE_API_KEY_HELPER_TTL_MS` environment variable for custom refresh intervals. Was this page helpful? Yes No Advanced installation Security On this page Authentication methods Anthropic API authentication Cloud provider authentication Access control and permissions Permission system Configuring permissions Permission modes Working directories Tool-specific permission rules Additional permission control with hooks Enterprise managed policy settings Settings precedence Credential management

---

### Security - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/security

Security - Anthropic Anthropic home page English Search... Search... Navigation Administration Security Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Data usage Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Legal and compliance ​ How we approach security ​ Security foundation Your code’s security is paramount. Claude Code is built with security at its core, developed according to Anthropic’s comprehensive security program. Learn more and access resources (SOC 2 Type 2 report, ISO 27001 certificate, etc.) at Anthropic Trust Center . ​ Permission-based architecture Claude Code uses strict read-only permissions by default. When additional actions are needed (editing files, running tests, executing commands), Claude Code requests explicit permission. Users control whether to approve actions once or allow them automatically. We designed Claude Code to be transparent and secure. For example, we require approval for `git` commands before executing them, giving you direct control. This approach enables users and organizations to configure permissions directly. For detailed permission configuration, see Identity and Access Management . ​ Built-in protections To mitigate risks in agentic systems: Folder access restriction : Claude Code can only access the folder where it was started and its subfolders—it cannot go upstream to parent directories. This creates a clear security boundary, ensuring Claude Code only operates within the intended project scope Prompt fatigue mitigation : Support for allowlisting frequently used safe commands per-user, per-codebase, or per-organization Accept Edits mode : Batch accept multiple edits while maintaining permission prompts for commands with side effects ​ User responsibility Claude Code only has the permissions you grant it. You’re responsible for reviewing proposed code and commands for safety before approval. ​ Protect against prompt injection Prompt injection is a technique where an attacker attempts to override or manipulate an AI assistant’s instructions by inserting malicious text. Claude Code includes several safeguards against these attacks: ​ Core protections Permission system : Sensitive operations require explicit approval Context-aware analysis : Detects potentially harmful instructions by analyzing the full request Input sanitization : Prevents command injection by processing user inputs Command blocklist : Blocks risky commands that fetch arbitrary content from the web like `curl` and `wget` ​ Privacy safeguards We have implemented several safeguards to protect your data, including: Limited retention periods for sensitive information Restricted access to user session data Clear policies against using feedback for model training For full details, please review our Commercial Terms of Service and Privacy Policy . ​ Additional safeguards Network request approval : Tools that make network requests require user approval by default Isolated context windows : Web fetch uses a separate context window to avoid injecting potentially malicious prompts Trust verification : First-time codebase runs and new MCP servers require trust verification Command injection detection : Suspicious bash commands require manual approval even if previously allowlisted Fail-closed matching : Unmatched commands default to requiring manual approval Natural language descriptions : Complex bash commands include explanations for user understanding Secure credential storage : API keys and tokens are encrypted. See Credential Management Best practices for working with untrusted content : Review suggested commands before approval Avoid piping untrusted content directly to Claude Verify proposed changes to critical files Use virtual machines (VMs) to run scripts and make tool calls, especially when interacting with external web services Report suspicious behavior with `/bug` While these protections significantly reduce risk, no system is completely immune to all attacks. Always maintain good security practices when working with any AI tool. ​ MCP security Claude Code allows users to configure Model Context Protocol (MCP) servers. The list of allowed MCP servers is configured in your source code, as part of Claude Code settings engineers check into source control. We encourage either writing your own MCP servers or using MCP servers from providers that you trust. You are able to configure Claude Code permissions for MCP servers. Anthropic does not manage or audit any MCP servers. ​ Data flow and dependencies Claude Code is installed from NPM . Claude Code runs locally. In order to interact with the LLM, Claude Code sends data over the network. This data includes all user prompts and model outputs. The data is encrypted in transit via TLS and is not encrypted at rest. Claude Code is compatible with most popular VPNs and LLM proxies. Claude Code is built on Anthropic’s APIs. For details regarding our API’s security controls, including our API logging procedures, please refer to compliance artifacts offered in the Anthropic Trust Center . ​ Security best practices ​ Working with sensitive code Review all suggested changes before approval Use project-specific permission settings for sensitive repositories Consider using devcontainers for additional isolation Regularly audit your permission settings with `/permissions` ​ Team security Use enterprise managed policies to enforce organizational standards Share approved permission configurations through version control Train team members on security best practices Monitor Claude Code usage through OpenTelemetry metrics ​ Reporting security issues If you discover a security vulnerability in Claude Code: Do not disclose it publicly Report it through our HackerOne program Include detailed reproduction steps Allow time for us to address the issue before public disclosure ​ Related resources Identity and Access Management - Configure permissions and access controls Monitoring usage - Track and audit Claude Code activity Development containers - Secure, isolated environments Anthropic Trust Center - Security certifications and compliance Was this page helpful? Yes No Identity and Access Management Data usage On this page How we approach security Security foundation Permission-based architecture Built-in protections User responsibility Protect against prompt injection Core protections Privacy safeguards Additional safeguards MCP security Data flow and dependencies Security best practices Working with sensitive code Team security Reporting security issues Related resources

---

### Monitoring - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/monitoring-usage

Monitoring - Anthropic Anthropic home page English Search... Search... Navigation Administration Monitoring Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance Claude Code supports OpenTelemetry (OTel) metrics and events for monitoring and observability. All metrics are time series data exported via OpenTelemetry’s standard metrics protocol, and events are exported via OpenTelemetry’s logs/events protocol. It is the user’s responsibility to ensure their metrics and logs backends are properly configured and that the aggregation granularity meets their monitoring requirements. OpenTelemetry support is currently in beta and details are subject to change. ​ Quick Start Configure OpenTelemetry using environment variables: 

```
# 1. Enable telemetry
export CLAUDE_CODE_ENABLE_TELEMETRY=1
<!-- -->
# 2. Choose exporters (both are optional - configure only what you need)
export OTEL_METRICS_EXPORTER=otlp       # Options: otlp, prometheus, console
export OTEL_LOGS_EXPORTER=otlp          # Options: otlp, console
<!-- -->
# 3. Configure OTLP endpoint (for OTLP exporter)
export OTEL_EXPORTER_OTLP_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
<!-- -->
# 4. Set authentication (if required)
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer your-token"
<!-- -->
# 5. For debugging: reduce export intervals
export OTEL_METRIC_EXPORT_INTERVAL=10000  # 10 seconds (default: 60000ms)
export OTEL_LOGS_EXPORT_INTERVAL=5000     # 5 seconds (default: 5000ms)
<!-- -->
# 6. Run Claude Code
claude
```

 The default export intervals are 60 seconds for metrics and 5 seconds for logs. During setup, you may want to use shorter intervals for debugging purposes. Remember to reset these for production use. For full configuration options, see the OpenTelemetry specification . ​ Administrator Configuration Administrators can configure OpenTelemetry settings for all users through the managed settings file. This allows for centralized control of telemetry settings across an organization. See the settings precedence for more information about how settings are applied. The managed settings file is located at: macOS: `/Library/Application Support/ClaudeCode/managed-settings.json` Linux and WSL: `/etc/claude-code/managed-settings.json` Windows: `C:\ProgramData\ClaudeCode\managed-settings.json` Example managed settings configuration: 

```
{
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_LOGS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_PROTOCOL": "grpc",
    "OTEL_EXPORTER_OTLP_ENDPOINT": "http://collector.company.com:4317",
    "OTEL_EXPORTER_OTLP_HEADERS": "Authorization=Bearer company-token"
  }
}
```

 Managed settings can be distributed via MDM (Mobile Device Management) or other device management solutions. Environment variables defined in the managed settings file have high precedence and cannot be overridden by users. ​ Configuration Details ​ Common Configuration Variables Environment Variable Description Example Values `CLAUDE_CODE_ENABLE_TELEMETRY` Enables telemetry collection (required) `1` `OTEL_METRICS_EXPORTER` Metrics exporter type(s) (comma-separated) `console`, `otlp`, `prometheus` `OTEL_LOGS_EXPORTER` Logs/events exporter type(s) (comma-separated) `console`, `otlp` `OTEL_EXPORTER_OTLP_PROTOCOL` Protocol for OTLP exporter (all signals) `grpc`, `http/json`, `http/protobuf` `OTEL_EXPORTER_OTLP_ENDPOINT` OTLP collector endpoint (all signals) `http://localhost:4317` `OTEL_EXPORTER_OTLP_METRICS_PROTOCOL` Protocol for metrics (overrides general) `grpc`, `http/json`, `http/protobuf` `OTEL_EXPORTER_OTLP_METRICS_ENDPOINT` OTLP metrics endpoint (overrides general) `http://localhost:4318/v1/metrics` `OTEL_EXPORTER_OTLP_LOGS_PROTOCOL` Protocol for logs (overrides general) `grpc`, `http/json`, `http/protobuf` `OTEL_EXPORTER_OTLP_LOGS_ENDPOINT` OTLP logs endpoint (overrides general) `http://localhost:4318/v1/logs` `OTEL_EXPORTER_OTLP_HEADERS` Authentication headers for OTLP `Authorization=Bearer token` `OTEL_EXPORTER_OTLP_METRICS_CLIENT_KEY` Client key for mTLS authentication Path to client key file `OTEL_EXPORTER_OTLP_METRICS_CLIENT_CERTIFICATE` Client certificate for mTLS authentication Path to client cert file `OTEL_METRIC_EXPORT_INTERVAL` Export interval in milliseconds (default: 60000) `5000`, `60000` `OTEL_LOGS_EXPORT_INTERVAL` Logs export interval in milliseconds (default: 5000) `1000`, `10000` `OTEL_LOG_USER_PROMPTS` Enable logging of user prompt content (default: disabled) `1` to enable ​ Metrics Cardinality Control The following environment variables control which attributes are included in metrics to manage cardinality: Environment Variable Description Default Value Example to Disable `OTEL_METRICS_INCLUDE_SESSION_ID` Include session.id attribute in metrics `true` `false` `OTEL_METRICS_INCLUDE_VERSION` Include app.version attribute in metrics `false` `true` `OTEL_METRICS_INCLUDE_ACCOUNT_UUID` Include user.account_uuid attribute in metrics `true` `false` These variables help control the cardinality of metrics, which affects storage requirements and query performance in your metrics backend. Lower cardinality generally means better performance and lower storage costs but less granular data for analysis. ​ Dynamic Headers For enterprise environments that require dynamic authentication, you can configure a script to generate headers dynamically: ​ Settings Configuration Add to your `.claude/settings.json`: 

```
{
  "otelHeadersHelper": "/bin/generate_opentelemetry_headers.sh"
}
```

 ​ Script Requirements The script must output valid JSON with string key-value pairs representing HTTP headers: 

```
#!/bin/bash
# Example: Multiple headers
echo "{\"Authorization\": \"Bearer $(get-token.sh)\", \"X-API-Key\": \"$(get-api-key.sh)\"}"
```

 ​ Important Limitations Headers are fetched only at startup, not during runtime. This is due to OpenTelemetry exporter architecture limitations. For scenarios requiring frequent token refresh, use an OpenTelemetry Collector as a proxy that can refresh its own headers. ​ Multi-Team Organization Support Organizations with multiple teams or departments can add custom attributes to distinguish between different groups using the `OTEL_RESOURCE_ATTRIBUTES` environment variable: 

```
# Add custom attributes for team identification
export OTEL_RESOURCE_ATTRIBUTES="department=engineering,team.id=platform,cost_center=eng-123"
```

 These custom attributes will be included in all metrics and events, allowing you to: Filter metrics by team or department Track costs per cost center Create team-specific dashboards Set up alerts for specific teams ​ Example Configurations 

```
# Console debugging (1-second intervals)
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=console
export OTEL_METRIC_EXPORT_INTERVAL=1000
<!-- -->
# OTLP/gRPC
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
<!-- -->
# Prometheus
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=prometheus
<!-- -->
# Multiple exporters
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=console,otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=http/json
<!-- -->
# Different endpoints/backends for metrics and logs
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=otlp
export OTEL_LOGS_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_METRICS_PROTOCOL=http/protobuf
export OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://metrics.company.com:4318
export OTEL_EXPORTER_OTLP_LOGS_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_LOGS_ENDPOINT=http://logs.company.com:4317
<!-- -->
# Metrics only (no events/logs)
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
<!-- -->
# Events/logs only (no metrics)
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_LOGS_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
```

 ​ Available Metrics and Events ​ Standard Attributes All metrics and events share these standard attributes: Attribute Description Controlled By `session.id` Unique session identifier `OTEL_METRICS_INCLUDE_SESSION_ID` (default: true) `app.version` Current Claude Code version `OTEL_METRICS_INCLUDE_VERSION` (default: false) `organization.id` Organization UUID (when authenticated) Always included when available `user.account_uuid` Account UUID (when authenticated) `OTEL_METRICS_INCLUDE_ACCOUNT_UUID` (default: true) `terminal.type` Terminal type (e.g., `iTerm.app`, `vscode`, `cursor`, `tmux`) Always included when detected ​ Metrics Claude Code exports the following metrics: Metric Name Description Unit `claude_code.session.count` Count of CLI sessions started count `claude_code.lines_of_code.count` Count of lines of code modified count `claude_code.pull_request.count` Number of pull requests created count `claude_code.commit.count` Number of git commits created count `claude_code.cost.usage` Cost of the Claude Code session USD `claude_code.token.usage` Number of tokens used tokens `claude_code.code_edit_tool.decision` Count of code editing tool permission decisions count `claude_code.active_time.total` Total active time in seconds s ​ Metric Details ​ Session Counter Incremented at the start of each session. Attributes : All standard attributes ​ Lines of Code Counter Incremented when code is added or removed. Attributes : All standard attributes `type`: (`"added"`, `"removed"`) ​ Pull Request Counter Incremented when creating pull requests via Claude Code. Attributes : All standard attributes ​ Commit Counter Incremented when creating git commits via Claude Code. Attributes : All standard attributes ​ Cost Counter Incremented after each API request. Attributes : All standard attributes `model`: Model identifier (e.g., “claude-3-5-sonnet-20241022”) ​ Token Counter Incremented after each API request. Attributes : All standard attributes `type`: (`"input"`, `"output"`, `"cacheRead"`, `"cacheCreation"`) `model`: Model identifier (e.g., “claude-3-5-sonnet-20241022”) ​ Code Edit Tool Decision Counter Incremented when user accepts or rejects Edit, MultiEdit, Write, or NotebookEdit tool usage. Attributes : All standard attributes `tool`: Tool name (`"Edit"`, `"MultiEdit"`, `"Write"`, `"NotebookEdit"`) `decision`: User decision (`"accept"`, `"reject"`) `language`: Programming language of the edited file (e.g., `"TypeScript"`, `"Python"`, `"JavaScript"`, `"Markdown"`). Returns `"unknown"` for unrecognized file extensions. ​ Active Time Counter Tracks actual time spent actively using Claude Code (not idle time). This metric is incremented during user interactions such as typing prompts or receiving responses. Attributes : All standard attributes ​ Events Claude Code exports the following events via OpenTelemetry logs/events (when `OTEL_LOGS_EXPORTER` is configured): ​ User Prompt Event Logged when a user submits a prompt. Event Name : `claude_code.user_prompt` Attributes : All standard attributes `event.name`: `"user_prompt"` `event.timestamp`: ISO 8601 timestamp `prompt_length`: Length of the prompt `prompt`: Prompt content (redacted by default, enable with `OTEL_LOG_USER_PROMPTS=1`) ​ Tool Result Event Logged when a tool completes execution. Event Name : `claude_code.tool_result` Attributes : All standard attributes `event.name`: `"tool_result"` `event.timestamp`: ISO 8601 timestamp `tool_name`: Name of the tool `success`: `"true"` or `"false"` `duration_ms`: Execution time in milliseconds `error`: Error message (if failed) `decision`: Either `"accept"` or `"reject"` `source`: Decision source - `"config"`, `"user_permanent"`, `"user_temporary"`, `"user_abort"`, or `"user_reject"` `tool_parameters`: JSON string containing tool-specific parameters (when available) For Bash tool: includes `bash_command`, `full_command`, `timeout`, `description`, `sandbox` ​ API Request Event Logged for each API request to Claude. Event Name : `claude_code.api_request` Attributes : All standard attributes `event.name`: `"api_request"` `event.timestamp`: ISO 8601 timestamp `model`: Model used (e.g., “claude-3-5-sonnet-20241022”) `cost_usd`: Estimated cost in USD `duration_ms`: Request duration in milliseconds `input_tokens`: Number of input tokens `output_tokens`: Number of output tokens `cache_read_tokens`: Number of tokens read from cache `cache_creation_tokens`: Number of tokens used for cache creation ​ API Error Event Logged when an API request to Claude fails. Event Name : `claude_code.api_error` Attributes : All standard attributes `event.name`: `"api_error"` `event.timestamp`: ISO 8601 timestamp `model`: Model used (e.g., “claude-3-5-sonnet-20241022”) `error`: Error message `status_code`: HTTP status code (if applicable) `duration_ms`: Request duration in milliseconds `attempt`: Attempt number (for retried requests) ​ Tool Decision Event Logged when a tool permission decision is made (accept/reject). Event Name : `claude_code.tool_decision` Attributes : All standard attributes `event.name`: `"tool_decision"` `event.timestamp`: ISO 8601 timestamp `tool_name`: Name of the tool (e.g., “Read”, “Edit”, “MultiEdit”, “Write”, “NotebookEdit”, etc.) `decision`: Either `"accept"` or `"reject"` `source`: Decision source - `"config"`, `"user_permanent"`, `"user_temporary"`, `"user_abort"`, or `"user_reject"` ​ Interpreting Metrics and Events Data The metrics exported by Claude Code provide valuable insights into usage patterns and productivity. Here are some common visualizations and analyses you can create: ​ Usage Monitoring Metric Analysis Opportunity `claude_code.token.usage` Break down by `type` (input/output), user, team, or model `claude_code.session.count` Track adoption and engagement over time `claude_code.lines_of_code.count` Measure productivity by tracking code additions/removals `claude_code.commit.count` & `claude_code.pull_request.count` Understand impact on development workflows ​ Cost Monitoring The `claude_code.cost.usage` metric helps with: Tracking usage trends across teams or individuals Identifying high-usage sessions for optimization Cost metrics are approximations. For official billing data, refer to your API provider (Anthropic Console, AWS Bedrock, or Google Cloud Vertex). ​ Alerting and Segmentation Common alerts to consider: Cost spikes Unusual token consumption High session volume from specific users All metrics can be segmented by `user.account_uuid`, `organization.id`, `session.id`, `model`, and `app.version`. ​ Event Analysis The event data provides detailed insights into Claude Code interactions: Tool Usage Patterns : Analyze tool result events to identify: Most frequently used tools Tool success rates Average tool execution times Error patterns by tool type Performance Monitoring : Track API request durations and tool execution times to identify performance bottlenecks. ​ Backend Considerations Your choice of metrics and logs backends will determine the types of analyses you can perform: ​ For Metrics: Time series databases (e.g., Prometheus) : Rate calculations, aggregated metrics Columnar stores (e.g., ClickHouse) : Complex queries, unique user analysis Full-featured observability platforms (e.g., Honeycomb, Datadog) : Advanced querying, visualization, alerting ​ For Events/Logs: Log aggregation systems (e.g., Elasticsearch, Loki) : Full-text search, log analysis Columnar stores (e.g., ClickHouse) : Structured event analysis Full-featured observability platforms (e.g., Honeycomb, Datadog) : Correlation between metrics and events For organizations requiring Daily/Weekly/Monthly Active User (DAU/WAU/MAU) metrics, consider backends that support efficient unique value queries. ​ Service Information All metrics and events are exported with the following resource attributes: `service.name`: `claude-code` `service.version`: Current Claude Code version `os.type`: Operating system type (e.g., `linux`, `darwin`, `windows`) `os.version`: Operating system version string `host.arch`: Host architecture (e.g., `amd64`, `arm64`) `wsl.version`: WSL version number (only present when running on Windows Subsystem for Linux) Meter Name: `com.anthropic.claude_code` ​ Security/Privacy Considerations Telemetry is opt-in and requires explicit configuration Sensitive information like API keys or file contents are never included in metrics or events User prompt content is redacted by default - only prompt length is recorded. To enable user prompt logging, set `OTEL_LOG_USER_PROMPTS=1` Was this page helpful? Yes No Security Costs On this page Quick Start Administrator Configuration Configuration Details Common Configuration Variables Metrics Cardinality Control Dynamic Headers Settings Configuration Script Requirements Important Limitations Multi-Team Organization Support Example Configurations Available Metrics and Events Standard Attributes Metrics Metric Details Session Counter Lines of Code Counter Pull Request Counter Commit Counter Cost Counter Token Counter Code Edit Tool Decision Counter Active Time Counter Events User Prompt Event Tool Result Event API Request Event API Error Event Tool Decision Event Interpreting Metrics and Events Data Usage Monitoring Cost Monitoring Alerting and Segmentation Event Analysis Backend Considerations For Metrics: For Events/Logs: Service Information Security/Privacy Considerations

---

### Data usage - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/data-usage

Data usage - Anthropic Anthropic home page English Search... Search... Navigation Administration Data usage Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Data usage Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Legal and compliance ​ Data policies ​ Data training policy By default, Anthropic does not train generative models using code or prompts that are sent to Claude Code. We aim to be fully transparent about how we use your data. We may use feedback to improve our products and services, but we will not train generative models using your feedback from Claude Code. ​ Development Partner Program If you explicitly opt in to methods to provide us with materials to train on, such as via the Development Partner Program , we may use those materials provided to train our models. An organization admin can expressly opt-in to the Development Partner Program for their organization. Note that this program is available only for Anthropic first-party API, and not for Bedrock or Vertex users. ​ Feedback transcripts If you choose to send us feedback about Claude Code, such as transcripts of your usage, Anthropic may use that feedback to debug related issues and improve Claude Code’s functionality (e.g., to reduce the risk of similar bugs occurring in the future). We will not train generative models using this feedback. Given their potentially sensitive nature, we store user feedback transcripts for only 30 days. ​ Data retention You can use an API key from a zero data retention organization. When doing so, Claude Code will not retain your chat transcripts on our servers. Users’ local Claude Code clients may store sessions locally for up to 30 days so that users can resume them. This behavior is configurable. ​ Privacy safeguards We have implemented several safeguards to protect your data, including: Limited retention periods for sensitive information Restricted access to user session data Clear policies against using feedback for model training For full details, please review our Commercial Terms of Service and Privacy Policy . ​ Telemetry services Claude Code connects from users’ machines to the Statsig service to log operational metrics such as latency, reliability, and usage patterns. This logging does not include any code or file paths. Data is encrypted in transit using TLS and at rest using 256-bit AES encryption. Read more in the Statsig security documentation . To opt out of Statsig telemetry, set the `DISABLE_TELEMETRY` environment variable. Claude Code connects from users’ machines to Sentry for operational error logging. The data is encrypted in transit using TLS and at rest using 256-bit AES encryption. Read more in the Sentry security documentation . To opt out of error logging, set the `DISABLE_ERROR_REPORTING` environment variable. When users run the `/bug` command, a copy of their full conversation history including code is sent to Anthropic. The data is encrypted in transit and at rest. Optionally, a Github issue is created in our public repository. To opt out of bug reporting, set the `DISABLE_BUG_COMMAND` environment variable. ​ Default behaviors by API provider By default, we disable all non-essential traffic (including error reporting, telemetry, and bug reporting functionality) when using Bedrock or Vertex. You can also opt out of all of these at once by setting the `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` environment variable. Here are the full default behaviors: Service Anthropic API Vertex API Bedrock API Statsig (Metrics) Default on. `DISABLE_TELEMETRY=1` to disable. Default off. `CLAUDE_CODE_USE_VERTEX` must be 1. Default off. `CLAUDE_CODE_USE_BEDROCK` must be 1. Sentry (Errors) Default on. `DISABLE_ERROR_REPORTING=1` to disable. Default off. `CLAUDE_CODE_USE_VERTEX` must be 1. Default off. `CLAUDE_CODE_USE_BEDROCK` must be 1. Anthropic API (`/bug` reports) Default on. `DISABLE_BUG_COMMAND=1` to disable. Default off. `CLAUDE_CODE_USE_VERTEX` must be 1. Default off. `CLAUDE_CODE_USE_BEDROCK` must be 1. All environment variables can be checked into `settings.json` ( read more ). Was this page helpful? Yes No Security Monitoring On this page Data policies Data training policy Development Partner Program Feedback transcripts Data retention Privacy safeguards Telemetry services Default behaviors by API provider

---

### Manage costs effectively - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/costs

Manage costs effectively - Anthropic Anthropic home page English Search... Search... Navigation Administration Manage costs effectively Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Data usage Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Legal and compliance Claude Code consumes tokens for each interaction. The average cost is $6 per developer per day, with daily costs remaining below $12 for 90% of users. For team usage, Claude Code charges by API token consumption. On average, Claude Code costs ~$100-200/developer per month with Sonnet 4 though there is large variance depending on how many instances users are running and whether they’re using it in automation. ​ Track your costs Use `/cost` to see current session usage Anthropic Console users : Check historical usage in the Anthropic Console (requires Admin or Billing role) Set workspace spend limits for the Claude Code workspace (requires Admin role) Pro and Max plan users : Usage is included in your subscription ​ Managing costs for teams When using Anthropic API, you can limit the total Claude Code workspace spend. To configure, follow these instructions . Admins can view cost and usage reporting by following these instructions . On Bedrock and Vertex, Claude Code does not send metrics from your cloud. In order to get cost metrics, several large enterprises reported using LiteLLM , which is an open-source tool that helps companies track spend by key . This project is unaffiliated with Anthropic and we have not audited its security. ​ Rate limit recommendations When setting up Claude Code for teams, consider these Token Per Minute (TPM) per-user recommendations based on your organization size: Team size TPM per user 1-5 users 200k-300k 5-20 users 100k-150k 20-50 users 50k-75k 50-100 users 25k-35k 100-500 users 15k-20k 500+ users 10k-15k For example, if you have 200 users, you might request 20k TPM for each user, or 4 million total TPM (200*20,000 = 4 million). The TPM per user decreases as team size grows because we expect fewer users to use Claude Code concurrently in larger organizations. These rate limits apply at the organization level, not per individual user, which means individual users can temporarily consume more than their calculated share when others aren’t actively using the service. If you anticipate scenarios with unusually high concurrent usage (such as live training sessions with large groups), you may need higher TPM allocations per user. ​ Reduce token usage Compact conversations: Claude uses auto-compact by default when context exceeds 95% capacity Toggle auto-compact: Run `/config` and navigate to “Auto-compact enabled” Use `/compact` manually when context gets large Add custom instructions: `/compact Focus on code samples and API usage` Customize compaction by adding to CLAUDE.md: 

```
# Summary instructions
<!-- -->
When you are using compact, please focus on test output and code changes
```

 Write specific queries: Avoid vague requests that trigger unnecessary scanning Break down complex tasks: Split large tasks into focused interactions Clear history between tasks: Use `/clear` to reset context Costs can vary significantly based on: Size of codebase being analyzed Complexity of queries Number of files being searched or modified Length of conversation history Frequency of compacting conversations Background processes (haiku generation, conversation summarization) ​ Background token usage Claude Code uses tokens for some background functionality even when idle: Haiku generation : Small creative messages that appear while you type (approximately 1 cent per day) Conversation summarization : Background jobs that summarize previous conversations for the `claude --resume` feature Command processing : Some commands like `/cost` may generate requests to check status These background processes consume a small amount of tokens (typically under $0.04 per session) even without active interaction. For team deployments, we recommend starting with a small pilot group to establish usage patterns before wider rollout. Was this page helpful? Yes No Monitoring Analytics On this page Track your costs Managing costs for teams Rate limit recommendations Reduce token usage Background token usage

---

### Analytics - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/analytics

Analytics - Anthropic Anthropic home page English Search... Search... Navigation Administration Analytics Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Data usage Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Legal and compliance Claude Code provides an analytics dashboard that helps organizations understand developer usage patterns, track productivity metrics, and optimize their Claude Code adoption. Analytics are currently available only for organizations using Claude Code with the Anthropic API through the Anthropic Console. ​ Access analytics Navigate to the analytics dashboard at console.anthropic.com/claude_code . ​ Required roles Primary Owner Owner Billing Admin Developer Users with User , Claude Code User or Membership Admin roles cannot access analytics. ​ Available metrics ​ Lines of code accepted Total lines of code written by Claude Code that users have accepted in their sessions. Excludes rejected code suggestions Doesn’t track subsequent deletions ​ Suggestion accept rate Percentage of times users accept code editing tool usage, including: Edit MultiEdit Write NotebookEdit ​ Activity users : Number of active users in a given day (number on left Y-axis) sessions : Number of active sessions in a given day (number on right Y-axis) ​ Spend users : Number of active users in a given day (number on left Y-axis) spend : Total dollars spent in a given day (number on right Y-axis) ​ Team insights Members : All users who have authenticated to Claude Code API key users are displayed by API key identifier OAuth users are displayed by email address Avg daily spend: Per-user average spend for the current month. For example, on July 10, this reflects the average daily spend over 10 days. Avg lines/day: Per-user average of accepted code lines for the current month. ​ Using analytics effectively ​ Monitor adoption Track team member status to identify: Active users who can share best practices Overall adoption trends across your organization ​ Measure productivity Tool acceptance rates and code metrics help you: Understand developer satisfaction with Claude Code suggestions Track code generation effectiveness Identify opportunities for training or process improvements ​ Related resources Monitoring usage with OpenTelemetry for custom metrics and alerting Identity and access management for role configuration Was this page helpful? Yes No Costs Settings On this page Access analytics Required roles Available metrics Lines of code accepted Suggestion accept rate Activity Spend Team insights Using analytics effectively Monitor adoption Measure productivity Related resources

---

### Claude Code settings - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/settings

Claude Code settings - Anthropic Anthropic home page English Search... Search... Navigation Configuration Claude Code settings Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance Claude Code offers a variety of settings to configure its behavior to meet your needs. You can configure Claude Code by running the `/config` command when using the interactive REPL. ​ Settings files The `settings.json` file is our official mechanism for configuring Claude Code through hierarchical settings: User settings are defined in `~/.claude/settings.json` and apply to all projects. Project settings are saved in your project directory: `.claude/settings.json` for settings that are checked into source control and shared with your team `.claude/settings.local.json` for settings that are not checked in, useful for personal preferences and experimentation. Claude Code will configure git to ignore `.claude/settings.local.json` when it is created. For enterprise deployments of Claude Code, we also support enterprise managed policy settings . These take precedence over user and project settings. System administrators can deploy policies to: macOS: `/Library/Application Support/ClaudeCode/managed-settings.json` Linux and WSL: `/etc/claude-code/managed-settings.json` Windows: `C:\ProgramData\ClaudeCode\managed-settings.json` Example settings.json 

```
{
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm run test:*)",
      "Read(~/.zshrc)"
    ],
    "deny": [
      "Bash(curl:*)"
    ]
  },
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp"
  }
}
```

 ​ Available settings `settings.json` supports a number of options: Key Description Example `apiKeyHelper` Custom script, to be executed in `/bin/sh`, to generate an auth value. This value will be sent as `X-Api-Key` and `Authorization: Bearer` headers for model requests `/bin/generate_temp_api_key.sh` `cleanupPeriodDays` How long to locally retain chat transcripts (default: 30 days) `20` `env` Environment variables that will be applied to every session `{"FOO": "bar"}` `includeCoAuthoredBy` Whether to include the `co-authored-by Claude` byline in git commits and pull requests (default: `true`) `false` `permissions` See table below for structure of permissions. `hooks` Configure custom commands to run before or after tool executions. See hooks documentation `{"PreToolUse": {"Bash": "echo 'Running command...'"}}` `model` Override the default model to use for Claude Code `"claude-3-5-sonnet-20241022"` `forceLoginMethod` Use `claudeai` to restrict login to Claude.ai accounts, `console` to restrict login to Anthropic Console (API usage billing) accounts `claudeai` `enableAllProjectMcpServers` Automatically approve all MCP servers defined in project `.mcp.json` files `true` `enabledMcpjsonServers` List of specific MCP servers from `.mcp.json` files to approve `["memory", "github"]` `disabledMcpjsonServers` List of specific MCP servers from `.mcp.json` files to reject `["filesystem"]` `awsAuthRefresh` Custom script that modifies the `.aws` directory (see advanced credential configuration ) `aws sso login --profile myprofile` `awsCredentialExport` Custom script that outputs JSON with AWS credentials (see advanced credential configuration ) `/bin/generate_aws_grant.sh` ​ Permission settings Keys Description Example `allow` Array of permission rules to allow tool use `[ "Bash(git diff:*)" ]` `deny` Array of permission rules to deny tool use `[ "WebFetch", "Bash(curl:*)" ]` `additionalDirectories` Additional working directories that Claude has access to `[ "../docs/" ]` `defaultMode` Default permission mode when opening Claude Code `"acceptEdits"` `disableBypassPermissionsMode` Set to `"disable"` to prevent `bypassPermissions` mode from being activated. See managed policy settings `"disable"` ​ Settings precedence Settings are applied in order of precedence: Enterprise policies (see IAM documentation ) Command line arguments Local project settings Shared project settings User settings ​ Subagent configuration Claude Code supports custom AI subagents that can be configured at both user and project levels. These subagents are stored as Markdown files with YAML frontmatter: User subagents : `~/.claude/agents/` - Available across all your projects Project subagents : `.claude/agents/` - Specific to your project and can be shared with your team Subagent files define specialized AI assistants with custom prompts and tool permissions. Learn more about creating and using subagents in the subagents documentation . ​ Environment variables Claude Code supports the following environment variables to control its behavior: All environment variables can also be configured in `settings.json` . This is useful as a way to automatically set environment variables for each session, or to roll out a set of environment variables for your whole team or organization. Variable Purpose `ANTHROPIC_API_KEY` API key sent as `X-Api-Key` header, typically for the Claude SDK (for interactive usage, run `/login`) `ANTHROPIC_AUTH_TOKEN` Custom value for the `Authorization` header (the value you set here will be prefixed with `Bearer`) `ANTHROPIC_CUSTOM_HEADERS` Custom headers you want to add to the request (in `Name: Value` format) `ANTHROPIC_MODEL` Name of custom model to use (see Model Configuration ) `ANTHROPIC_SMALL_FAST_MODEL` Name of Haiku-class model for background tasks `ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION` Override AWS region for the small/fast model when using Bedrock `AWS_BEARER_TOKEN_BEDROCK` Bedrock API key for authentication (see Bedrock API keys ) `BASH_DEFAULT_TIMEOUT_MS` Default timeout for long-running bash commands `BASH_MAX_TIMEOUT_MS` Maximum timeout the model can set for long-running bash commands `BASH_MAX_OUTPUT_LENGTH` Maximum number of characters in bash outputs before they are middle-truncated `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR` Return to the original working directory after each Bash command `CLAUDE_CODE_API_KEY_HELPER_TTL_MS` Interval in milliseconds at which credentials should be refreshed (when using `apiKeyHelper`) `CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL` Skip auto-installation of IDE extensions `CLAUDE_CODE_MAX_OUTPUT_TOKENS` Set the maximum number of output tokens for most requests `CLAUDE_CODE_USE_BEDROCK` Use Bedrock `CLAUDE_CODE_USE_VERTEX` Use Vertex `CLAUDE_CODE_SKIP_BEDROCK_AUTH` Skip AWS authentication for Bedrock (e.g. when using an LLM gateway) `CLAUDE_CODE_SKIP_VERTEX_AUTH` Skip Google authentication for Vertex (e.g. when using an LLM gateway) `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` Equivalent of setting `DISABLE_AUTOUPDATER`, `DISABLE_BUG_COMMAND`, `DISABLE_ERROR_REPORTING`, and `DISABLE_TELEMETRY` `CLAUDE_CODE_DISABLE_TERMINAL_TITLE` Set to `1` to disable automatic terminal title updates based on conversation context `DISABLE_AUTOUPDATER` Set to `1` to disable automatic updates. This takes precedence over the `autoUpdates` configuration setting. `DISABLE_BUG_COMMAND` Set to `1` to disable the `/bug` command `DISABLE_COST_WARNINGS` Set to `1` to disable cost warning messages `DISABLE_ERROR_REPORTING` Set to `1` to opt out of Sentry error reporting `DISABLE_NON_ESSENTIAL_MODEL_CALLS` Set to `1` to disable model calls for non-critical paths like flavor text `DISABLE_TELEMETRY` Set to `1` to opt out of Statsig telemetry (note that Statsig events do not include user data like code, file paths, or bash commands) `HTTP_PROXY` Specify HTTP proxy server for network connections `HTTPS_PROXY` Specify HTTPS proxy server for network connections `MAX_THINKING_TOKENS` Force a thinking for the model budget `MCP_TIMEOUT` Timeout in milliseconds for MCP server startup `MCP_TOOL_TIMEOUT` Timeout in milliseconds for MCP tool execution `MAX_MCP_OUTPUT_TOKENS` Maximum number of tokens allowed in MCP tool responses (default: 25000) `VERTEX_REGION_CLAUDE_3_5_HAIKU` Override region for Claude 3.5 Haiku when using Vertex AI `VERTEX_REGION_CLAUDE_3_5_SONNET` Override region for Claude 3.5 Sonnet when using Vertex AI `VERTEX_REGION_CLAUDE_3_7_SONNET` Override region for Claude 3.7 Sonnet when using Vertex AI `VERTEX_REGION_CLAUDE_4_0_OPUS` Override region for Claude 4.0 Opus when using Vertex AI `VERTEX_REGION_CLAUDE_4_0_SONNET` Override region for Claude 4.0 Sonnet when using Vertex AI ​ Configuration options To manage your configurations, use the following commands: List settings: `claude config list` See a setting: `claude config get <key>` Change a setting: `claude config set <key> <value>` Push to a setting (for lists): `claude config add <key> <value>` Remove from a setting (for lists): `claude config remove <key> <value>` By default `config` changes your project configuration. To manage your global configuration, use the `--global` (or `-g`) flag. ​ Global configuration To set a global configuration, use `claude config set -g <key> <value>`: Key Description Example `autoUpdates` Whether to enable automatic updates (default: `true`). When enabled, Claude Code automatically downloads and installs updates in the background. Updates are applied when you restart Claude Code. `false` `preferredNotifChannel` Where you want to receive notifications (default: `iterm2`) `iterm2`, `iterm2_with_bell`, `terminal_bell`, or `notifications_disabled` `theme` Color theme `dark`, `light`, `light-daltonized`, or `dark-daltonized` `verbose` Whether to show full bash and command outputs (default: `false`) `true` ​ Tools available to Claude Claude Code has access to a set of powerful tools that help it understand and modify your codebase: Tool Description Permission Required Bash Executes shell commands in your environment Yes Edit Makes targeted edits to specific files Yes Glob Finds files based on pattern matching No Grep Searches for patterns in file contents No LS Lists files and directories No MultiEdit Performs multiple edits on a single file atomically Yes NotebookEdit Modifies Jupyter notebook cells Yes NotebookRead Reads and displays Jupyter notebook contents No Read Reads the contents of files No Task Runs a sub-agent to handle complex, multi-step tasks No TodoWrite Creates and manages structured task lists No WebFetch Fetches content from a specified URL Yes WebSearch Performs web searches with domain filtering Yes Write Creates or overwrites files Yes Permission rules can be configured using `/allowed-tools` or in permission settings . ​ Extending tools with hooks You can run custom commands before or after any tool executes using Claude Code hooks . For example, you could automatically run a Python formatter after Claude modifies Python files, or prevent modifications to production configuration files by blocking Write operations to certain paths. ​ See also Identity and Access Management - Learn about Claude Code’s permission system IAM and access control - Enterprise policy management Troubleshooting - Solutions for common configuration issues Was this page helpful? Yes No Analytics Add Claude Code to your IDE On this page Settings files Available settings Permission settings Settings precedence Subagent configuration Environment variables Configuration options Global configuration Tools available to Claude Extending tools with hooks See also

---

### Add Claude Code to your IDE - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/ide-integrations

Add Claude Code to your IDE - Anthropic Anthropic home page English Search... Search... Navigation Configuration Add Claude Code to your IDE Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance Claude Code works great with any Integrated Development Environment (IDE) that has a terminal. Just run `claude`, and you’re ready to go. In addition, Claude Code provides dedicated integrations for popular IDEs, which provide features like interactive diff viewing, selection context sharing, and more. These integrations currently exist for: Visual Studio Code (including popular forks like Cursor, Windsurf, and VSCodium) JetBrains IDEs (including IntelliJ, PyCharm, Android Studio, WebStorm, PhpStorm and GoLand) ​ Features Quick launch : Use `Cmd+Esc` (Mac) or `Ctrl+Esc` (Windows/Linux) to open Claude Code directly from your editor, or click the Claude Code button in the UI Diff viewing : Code changes can be displayed directly in the IDE diff viewer instead of the terminal. You can configure this in `/config` Selection context : The current selection/tab in the IDE is automatically shared with Claude Code File reference shortcuts : Use `Cmd+Option+K` (Mac) or `Alt+Ctrl+K` (Linux/Windows) to insert file references (e.g., @File#L1-99) Diagnostic sharing : Diagnostic errors (lint, syntax, etc.) from the IDE are automatically shared with Claude as you work ​ Installation VS Code+ JetBrains To install Claude Code on VS Code and popular forks like Cursor, Windsurf, and VSCodium: Open VS Code Open the integrated terminal Run `claude` - the extension will auto-install To install Claude Code on VS Code and popular forks like Cursor, Windsurf, and VSCodium: Open VS Code Open the integrated terminal Run `claude` - the extension will auto-install To install Claude Code on JetBrains IDEs like IntelliJ, PyCharm, Android Studio, WebStorm, PhpStorm and GoLand, find and install the Claude Code plugin from the marketplace and restart your IDE. The plugin may also be auto-installed when you run `claude` in the integrated terminal. The IDE must be restarted completely to take effect. Remote Development Limitations : When using JetBrains Remote Development, you must install the plugin in the remote host via `Settings > Plugin (Host)`. ​ Usage ​ From your IDE Run `claude` from your IDE’s integrated terminal, and all features will be active. ​ From external terminals Use the `/ide` command in any external terminal to connect Claude Code to your IDE and activate all features. If you want Claude to have access to the same files as your IDE, start Claude Code from the same directory as your IDE project root. ​ Configuration IDE integrations work with Claude Code’s configuration system: Run `claude` Enter the `/config` command Adjust your preferences. Setting the diff tool to `auto` will enable automatic IDE detection ​ Troubleshooting ​ VS Code extension not installing Ensure you’re running Claude Code from VS Code’s integrated terminal Ensure that the CLI corresponding to your IDE is installed: For VS Code: `code` command should be available For Cursor: `cursor` command should be available For Windsurf: `windsurf` command should be available For VSCodium: `codium` command should be available If not installed, use `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux) and search for “Shell Command: Install ‘code’ command in PATH” (or the equivalent for your IDE) Check that VS Code has permission to install extensions ​ JetBrains plugin not working Ensure you’re running Claude Code from the project root directory Check that the JetBrains plugin is enabled in the IDE settings Completely restart the IDE. You may need to do this multiple times For JetBrains Remote Development, ensure that the Claude Code plugin is installed in the remote host and not locally on the client For additional help, refer to our troubleshooting guide . Was this page helpful? Yes No Settings Terminal configuration On this page Features Installation Usage From your IDE From external terminals Configuration Troubleshooting VS Code extension not installing JetBrains plugin not working

---

### Optimize your terminal setup - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/terminal-config

Optimize your terminal setup - Anthropic Anthropic home page English Search... Search... Navigation Configuration Optimize your terminal setup Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Data usage Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Legal and compliance ​ Themes and appearance Claude cannot control the theme of your terminal. That’s handled by your terminal application. You can match Claude Code’s theme to your terminal any time via the `/config` command. ​ Line breaks You have several options for entering linebreaks into Claude Code: Quick escape : Type `\` followed by Enter to create a newline Keyboard shortcut : Set up a keybinding to insert a newline ​ Set up Shift+Enter (VS Code or iTerm2): Run `/terminal-setup` within Claude Code to automatically configure Shift+Enter. ​ Set up Option+Enter (VS Code, iTerm2 or macOS Terminal.app): For Mac Terminal.app: Open Settings → Profiles → Keyboard Check “Use Option as Meta Key” For iTerm2 and VS Code terminal: Open Settings → Profiles → Keys Under General, set Left/Right Option key to “Esc+“ ​ Notification setup Never miss when Claude completes a task with proper notification configuration: ​ Terminal bell notifications Enable sound alerts when tasks complete: 

```
claude config set --global preferredNotifChannel terminal_bell
```

 For macOS users : Don’t forget to enable notification permissions in System Settings → Notifications → [Your Terminal App]. ​ iTerm 2 system notifications For iTerm 2 alerts when tasks complete: Open iTerm 2 Preferences Navigate to Profiles → Terminal Enable “Silence bell” and Filter Alerts → “Send escape sequence-generated alerts” Set your preferred notification delay Note that these notifications are specific to iTerm 2 and not available in the default macOS Terminal. ​ Custom notification hooks For advanced notification handling, you can create notification hooks to run your own logic. ​ Handling large inputs When working with extensive code or long instructions: Avoid direct pasting : Claude Code may struggle with very long pasted content Use file-based workflows : Write content to a file and ask Claude to read it Be aware of VS Code limitations : The VS Code terminal is particularly prone to truncating long pastes ​ Vim Mode Claude Code supports a subset of Vim keybindings that can be enabled with `/vim` or configured via `/config`. The supported subset includes: Mode switching: `Esc` (to NORMAL), `i`/`I`, `a`/`A`, `o`/`O` (to INSERT) Navigation: `h`/`j`/`k`/`l`, `w`/`e`/`b`, `0`/`Optimize your terminal setup - Anthropic Anthropic home page English Search... Search... Navigation Configuration Optimize your terminal setup Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Data usage Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Legal and compliance ​ Themes and appearance Claude cannot control the theme of your terminal. That’s handled by your terminal application. You can match Claude Code’s theme to your terminal any time via the `/config` command. ​ Line breaks You have several options for entering linebreaks into Claude Code: Quick escape : Type `\` followed by Enter to create a newline Keyboard shortcut : Set up a keybinding to insert a newline ​ Set up Shift+Enter (VS Code or iTerm2): Run `/terminal-setup` within Claude Code to automatically configure Shift+Enter. ​ Set up Option+Enter (VS Code, iTerm2 or macOS Terminal.app): For Mac Terminal.app: Open Settings → Profiles → Keyboard Check “Use Option as Meta Key” For iTerm2 and VS Code terminal: Open Settings → Profiles → Keys Under General, set Left/Right Option key to “Esc+“ ​ Notification setup Never miss when Claude completes a task with proper notification configuration: ​ Terminal bell notifications Enable sound alerts when tasks complete: 

```
claude config set --global preferredNotifChannel terminal_bell
```

 For macOS users : Don’t forget to enable notification permissions in System Settings → Notifications → [Your Terminal App]. ​ iTerm 2 system notifications For iTerm 2 alerts when tasks complete: Open iTerm 2 Preferences Navigate to Profiles → Terminal Enable “Silence bell” and Filter Alerts → “Send escape sequence-generated alerts” Set your preferred notification delay Note that these notifications are specific to iTerm 2 and not available in the default macOS Terminal. ​ Custom notification hooks For advanced notification handling, you can create notification hooks to run your own logic. ​ Handling large inputs When working with extensive code or long instructions: Avoid direct pasting : Claude Code may struggle with very long pasted content Use file-based workflows : Write content to a file and ask Claude to read it Be aware of VS Code limitations : The VS Code terminal is particularly prone to truncating long pastes ​ Vim Mode Claude Code supports a subset of Vim keybindings that can be enabled with `/vim` or configured via `/config`. The supported subset includes: Mode switching: `Esc` (to NORMAL), `i`/`I`, `a`/`A`, `o`/`O` (to INSERT) Navigation: `h`/`j`/`k`/`l`, `w`/`e`/`b`, `0`//`^`, `gg`/`G` Editing: `x`, `dw`/`de`/`db`/`dd`/`D`, `cw`/`ce`/`cb`/`cc`/`C`, `.` (repeat) Was this page helpful? Yes No Add Claude Code to your IDE Memory management On this page Themes and appearance Line breaks Set up Shift+Enter (VS Code or iTerm2): Set up Option+Enter (VS Code, iTerm2 or macOS Terminal.app): Notification setup Terminal bell notifications iTerm 2 system notifications Custom notification hooks Handling large inputs Vim Mode

---

### Manage Claude&#x27;s memory - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/memory

Manage Claude's memory - Anthropic Anthropic home page English Search... Search... Navigation Configuration Manage Claude's memory Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance Claude Code can remember your preferences across sessions, like style guidelines and common commands in your workflow. ​ Determine memory type Claude Code offers three memory locations, each serving a different purpose: Memory Type Location Purpose Use Case Examples Project memory `./CLAUDE.md` Team-shared instructions for the project Project architecture, coding standards, common workflows User memory `~/.claude/CLAUDE.md` Personal preferences for all projects Code styling preferences, personal tooling shortcuts Project memory (local) `./CLAUDE.local.md` Personal project-specific preferences (Deprecated, see below) Your sandbox URLs, preferred test data All memory files are automatically loaded into Claude Code’s context when launched. ​ CLAUDE.md imports CLAUDE.md files can import additional files using `@path/to/import` syntax. The following example imports 3 files: 

```
See @README for project overview and @package.json for available npm commands for this project.
<!-- -->
# Additional Instructions
- git workflow @docs/git-instructions.md
```

 Both relative and absolute paths are allowed. In particular, importing files in user’s home dir is a convenient way for your team members to provide individual instructions that are not checked into the repository. Previously CLAUDE.local.md served a similar purpose, but is now deprecated in favor of imports since they work better across multiple git worktrees. 

```
# Individual Preferences
- @~/.claude/my-project-instructions.md
```

 To avoid potential collisions, imports are not evaluated inside markdown code spans and code blocks. 

```
This code span will not be treated as an import: `@anthropic-ai/claude-code`
```

 Imported files can recursively import additional files, with a max-depth of 5 hops. You can see what memory files are loaded by running `/memory` command. ​ How Claude looks up memories Claude Code reads memories recursively: starting in the cwd, Claude Code recurses up to (but not including) the root directory / and reads any CLAUDE.md or CLAUDE.local.md files it finds. This is especially convenient when working in large repositories where you run Claude Code in foo/bar/ , and have memories in both foo/CLAUDE.md and foo/bar/CLAUDE.md . Claude will also discover CLAUDE.md nested in subtrees under your current working directory. Instead of loading them at launch, they are only included when Claude reads files in those subtrees. ​ Quickly add memories with the `#` shortcut The fastest way to add a memory is to start your input with the `#` character: 

```
# Always use descriptive variable names
```

 You’ll be prompted to select which memory file to store this in. ​ Directly edit memories with `/memory` Use the `/memory` slash command during a session to open any memory file in your system editor for more extensive additions or organization. ​ Set up project memory Suppose you want to set up a CLAUDE.md file to store important project information, conventions, and frequently used commands. Bootstrap a CLAUDE.md for your codebase with the following command: 

```
> /init
```

 Tips: Include frequently used commands (build, test, lint) to avoid repeated searches Document code style preferences and naming conventions Add important architectural patterns specific to your project CLAUDE.md memories can be used for both instructions shared with your team and for your individual preferences. ​ Memory best practices Be specific : “Use 2-space indentation” is better than “Format code properly”. Use structure to organize : Format each individual memory as a bullet point and group related memories under descriptive markdown headings. Review periodically : Update memories as your project evolves to ensure Claude is always using the most up to date information and context. Was this page helpful? Yes No Terminal configuration CLI reference On this page Determine memory type CLAUDE.md imports How Claude looks up memories Quickly add memories with the # shortcut Directly edit memories with /memory Set up project memory Memory best practices

---

### CLI reference - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/cli-reference

CLI reference - Anthropic Anthropic home page English Search... Search... Navigation Reference CLI reference Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Data usage Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Legal and compliance ​ CLI commands Command Description Example `claude` Start interactive REPL `claude` `claude "query"` Start REPL with initial prompt `claude "explain this project"` `claude -p "query"` Query via SDK, then exit `claude -p "explain this function"` `cat file | claude -p "query"` Process piped content `cat logs.txt | claude -p "explain"` `claude -c` Continue most recent conversation `claude -c` `claude -c -p "query"` Continue via SDK `claude -c -p "Check for type errors"` `claude -r "<session-id>" "query"` Resume session by ID `claude -r "abc123" "Finish this PR"` `claude update` Update to latest version `claude update` `claude mcp` Configure Model Context Protocol (MCP) servers See the Claude Code MCP documentation . ​ CLI flags Customize Claude Code’s behavior with these command-line flags: Flag Description Example `--add-dir` Add additional working directories for Claude to access (validates each path exists as a directory) `claude --add-dir ../apps ../lib` `--allowedTools` A list of tools that should be allowed without prompting the user for permission, in addition to settings.json files `"Bash(git log:*)" "Bash(git diff:*)" "Read"` `--disallowedTools` A list of tools that should be disallowed without prompting the user for permission, in addition to settings.json files `"Bash(git log:*)" "Bash(git diff:*)" "Edit"` `--print`, `-p` Print response without interactive mode (see SDK documentation for programmatic usage details) `claude -p "query"` `--output-format` Specify output format for print mode (options: `text`, `json`, `stream-json`) `claude -p "query" --output-format json` `--input-format` Specify input format for print mode (options: `text`, `stream-json`) `claude -p --output-format json --input-format stream-json` `--verbose` Enable verbose logging, shows full turn-by-turn output (helpful for debugging in both print and interactive modes) `claude --verbose` `--max-turns` Limit the number of agentic turns in non-interactive mode `claude -p --max-turns 3 "query"` `--model` Sets the model for the current session with an alias for the latest model (`sonnet` or `opus`) or a model’s full name `claude --model claude-sonnet-4-20250514` `--permission-mode` Begin in a specified permission mode `claude --permission-mode plan` `--permission-prompt-tool` Specify an MCP tool to handle permission prompts in non-interactive mode `claude -p --permission-prompt-tool mcp_auth_tool "query"` `--resume` Resume a specific session by ID, or by choosing in interactive mode `claude --resume abc123 "query"` `--continue` Load the most recent conversation in the current directory `claude --continue` `--dangerously-skip-permissions` Skip permission prompts (use with caution) `claude --dangerously-skip-permissions` The `--output-format json` flag is particularly useful for scripting and automation, allowing you to parse Claude’s responses programmatically. For detailed information about print mode (`-p`) including output formats, streaming, verbose logging, and programmatic usage, see the SDK documentation . ​ See also Interactive mode - Shortcuts, input modes, and interactive features Slash commands - Interactive session commands Quickstart guide - Getting started with Claude Code Common workflows - Advanced workflows and patterns Settings - Configuration options SDK documentation - Programmatic usage and integrations Was this page helpful? Yes No Memory management Interactive mode On this page CLI commands CLI flags See also

---

### Interactive mode - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/interactive-mode

Interactive mode - Anthropic Anthropic home page English Search... Search... Navigation Reference Interactive mode Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance ​ Keyboard shortcuts ​ General controls Shortcut Description Context `Ctrl+C` Cancel current input or generation Standard interrupt `Ctrl+D` Exit Claude Code session EOF signal `Ctrl+L` Clear terminal screen Keeps conversation history `Up/Down arrows` Navigate command history Recall previous inputs `Esc` + `Esc` Edit previous message Double-escape to modify ​ Multiline input Method Shortcut Context Quick escape `\` + `Enter` Works in all terminals macOS default `Option+Enter` Default on macOS Terminal setup `Shift+Enter` After `/terminal-setup` Paste mode Paste directly For code blocks, logs ​ Quick commands Shortcut Description Notes `#` at start Memory shortcut - add to CLAUDE.md Prompts for file selection `/` at start Slash command See slash commands ​ Vim mode Enable vim-style editing with `/vim` command or configure permanently via `/config`. ​ Mode switching Command Action From mode `Esc` Enter NORMAL mode INSERT `i` Insert before cursor NORMAL `I` Insert at beginning of line NORMAL `a` Insert after cursor NORMAL `A` Insert at end of line NORMAL `o` Open line below NORMAL `O` Open line above NORMAL ​ Navigation (NORMAL mode) Command Action `h`/`j`/`k`/`l` Move left/down/up/right `w` Next word `e` End of word `b` Previous word `0` Beginning of line `Interactive mode - Anthropic Anthropic home page English Search... Search... Navigation Reference Interactive mode Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance ​ Keyboard shortcuts ​ General controls Shortcut Description Context `Ctrl+C` Cancel current input or generation Standard interrupt `Ctrl+D` Exit Claude Code session EOF signal `Ctrl+L` Clear terminal screen Keeps conversation history `Up/Down arrows` Navigate command history Recall previous inputs `Esc` + `Esc` Edit previous message Double-escape to modify ​ Multiline input Method Shortcut Context Quick escape `\` + `Enter` Works in all terminals macOS default `Option+Enter` Default on macOS Terminal setup `Shift+Enter` After `/terminal-setup` Paste mode Paste directly For code blocks, logs ​ Quick commands Shortcut Description Notes `#` at start Memory shortcut - add to CLAUDE.md Prompts for file selection `/` at start Slash command See slash commands ​ Vim mode Enable vim-style editing with `/vim` command or configure permanently via `/config`. ​ Mode switching Command Action From mode `Esc` Enter NORMAL mode INSERT `i` Insert before cursor NORMAL `I` Insert at beginning of line NORMAL `a` Insert after cursor NORMAL `A` Insert at end of line NORMAL `o` Open line below NORMAL `O` Open line above NORMAL ​ Navigation (NORMAL mode) Command Action `h`/`j`/`k`/`l` Move left/down/up/right `w` Next word `e` End of word `b` Previous word `0` Beginning of line  End of line `^` First non-blank character `gg` Beginning of input `G` End of input ​ Editing (NORMAL mode) Command Action `x` Delete character `dd` Delete line `D` Delete to end of line `dw`/`de`/`db` Delete word/to end/back `cc` Change line `C` Change to end of line `cw`/`ce`/`cb` Change word/to end/back `.` Repeat last change Configure your preferred line break behavior in terminal settings. Run `/terminal-setup` to install Shift+Enter binding for iTerm2 and VS Code terminals. ​ Command history Claude Code maintains command history for the current session: History is stored per working directory Cleared with `/clear` command Use Up/Down arrows to navigate (see keyboard shortcuts above) Ctrl+R : Reverse search through history (if supported by terminal) Note : History expansion (`!`) is disabled by default ​ See also Slash commands - Interactive session commands CLI reference - Command-line flags and options Settings - Configuration options Memory management - Managing CLAUDE.md files Was this page helpful? Yes No CLI reference Slash commands On this page Keyboard shortcuts General controls Multiline input Quick commands Vim mode Mode switching Navigation (NORMAL mode) Editing (NORMAL mode) Command history See also

---

### Slash commands - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/slash-commands

Slash commands - Anthropic Anthropic home page English Search... Search... Navigation Reference Slash commands Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Data usage Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Legal and compliance ​ Built-in slash commands Command Purpose `/add-dir` Add additional working directories `/agents` Manage custom AI subagents for specialized tasks `/bug` Report bugs (sends conversation to Anthropic) `/clear` Clear conversation history `/compact [instructions]` Compact conversation with optional focus instructions `/config` View/modify configuration `/cost` Show token usage statistics `/doctor` Checks the health of your Claude Code installation `/help` Get usage help `/init` Initialize project with CLAUDE.md guide `/login` Switch Anthropic accounts `/logout` Sign out from your Anthropic account `/mcp` Manage MCP server connections and OAuth authentication `/memory` Edit CLAUDE.md memory files `/model` Select or change the AI model `/permissions` View or update permissions `/pr_comments` View pull request comments `/review` Request code review `/status` View account and system statuses `/terminal-setup` Install Shift+Enter key binding for newlines (iTerm2 and VSCode only) `/vim` Enter vim mode for alternating insert and command modes ​ Custom slash commands Custom slash commands allow you to define frequently-used prompts as Markdown files that Claude Code can execute. Commands are organized by scope (project-specific or personal) and support namespacing through directory structures. ​ Syntax 

```
/<command-name> [arguments]
```

 ​ Parameters Parameter Description `<command-name>` Name derived from the Markdown filename (without `.md` extension) `[arguments]` Optional arguments passed to the command ​ Command types ​ Project commands Commands stored in your repository and shared with your team. When listed in `/help`, these commands show “(project)” after their description. Location : `.claude/commands/` In the following example, we create the `/optimize` command: 

```
# Create a project command
mkdir -p .claude/commands
echo "Analyze this code for performance issues and suggest optimizations:" > .claude/commands/optimize.md
```

 ​ Personal commands Commands available across all your projects. When listed in `/help`, these commands show “(user)” after their description. Location : `~/.claude/commands/` In the following example, we create the `/security-review` command: 

```
# Create a personal command
mkdir -p ~/.claude/commands
echo "Review this code for security vulnerabilities:" > ~/.claude/commands/security-review.md
```

 ​ Features ​ Namespacing Organize commands in subdirectories. The subdirectories determine the command’s full name. The description will show whether the command comes from the project directory (`.claude/commands`) or the user-level directory (`~/.claude/commands`). Conflicts between user and project level commands are not supported. Otherwise, multiple commands with the same base file name can coexist. For example, a file at `.claude/commands/frontend/component.md` creates the command `/frontend:component` with description showing “(project)”. Meanwhile, a file at `~/.claude/commands/component.md` creates the command `/component` with description showing “(user)”. ​ Arguments Pass dynamic values to commands using the `$ARGUMENTS` placeholder. For example: 

```
# Command definition
echo 'Fix issue #$ARGUMENTS following our coding standards' > .claude/commands/fix-issue.md
<!-- -->
# Usage
> /fix-issue 123
```

 ​ Bash command execution Execute bash commands before the slash command runs using the `!` prefix. The output is included in the command context. You must include `allowed-tools` with the `Bash` tool, but you can choose the specific bash commands to allow. For example: 

```
---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
description: Create a git commit
---
<!-- -->
## Context
<!-- -->
- Current git status: !`git status`
- Current git diff (staged and unstaged changes): !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -10`
<!-- -->
## Your task
<!-- -->
Based on the above changes, create a single git commit.
```

 ​ File references Include file contents in commands using the `@` prefix to reference files . For example: 

```
# Reference a specific file
Review the implementation in @src/utils/helpers.js
<!-- -->
# Reference multiple files
Compare @src/old-version.js with @src/new-version.js
```

 ​ Thinking mode Slash commands can trigger extended thinking by including extended thinking keywords . ​ File format Command files support: Markdown format (`.md` extension) YAML frontmatter for metadata: `allowed-tools`: List of tools the command can use `description`: Brief description of the command `argument-hint`: The arguments expected for the slash command. Example: `argument-hint: add [tagId] | remove [tagId] | list`. This hint is shown to the user when auto-completing the slash command. Dynamic content with bash commands (`!`) and file references (`@`) Prompt instructions as the main content ​ MCP slash commands MCP servers can expose prompts as slash commands that become available in Claude Code. These commands are dynamically discovered from connected MCP servers. ​ Command format MCP commands follow the pattern: 

```
/mcp__<server-name>__<prompt-name> [arguments]
```

 ​ Features ​ Dynamic discovery MCP commands are automatically available when: An MCP server is connected and active The server exposes prompts through the MCP protocol The prompts are successfully retrieved during connection ​ Arguments MCP prompts can accept arguments defined by the server: 

```
# Without arguments
> /mcp__github__list_prs
<!-- -->
# With arguments
> /mcp__github__pr_review 456
> /mcp__jira__create_issue "Bug title" high
```

 ​ Naming conventions Server and prompt names are normalized Spaces and special characters become underscores Names are lowercased for consistency ​ Managing MCP connections Use the `/mcp` command to: View all configured MCP servers Check connection status Authenticate with OAuth-enabled servers Clear authentication tokens View available tools and prompts from each server ​ See also Interactive mode - Shortcuts, input modes, and interactive features CLI reference - Command-line flags and options Settings - Configuration options Memory management - Managing Claude’s memory across sessions Was this page helpful? Yes No Interactive mode Hooks reference On this page Built-in slash commands Custom slash commands Syntax Parameters Command types Project commands Personal commands Features Namespacing Arguments Bash command execution File references Thinking mode File format MCP slash commands Command format Features Dynamic discovery Arguments Naming conventions Managing MCP connections See also

---

### Hooks reference - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/hooks

Hooks reference - Anthropic Anthropic home page English Search... Search... Navigation Reference Hooks reference Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance For a quickstart guide with examples, see Get started with Claude Code hooks . ​ Configuration Claude Code hooks are configured in your settings files : `~/.claude/settings.json` - User settings `.claude/settings.json` - Project settings `.claude/settings.local.json` - Local project settings (not committed) Enterprise managed policy settings ​ Structure Hooks are organized by matchers, where each matcher can have multiple hooks: 

```
{
  "hooks": {
    "EventName": [
      {
        "matcher": "ToolPattern",
        "hooks": [
          {
            "type": "command",
            "command": "your-command-here"
          }
        ]
      }
    ]
  }
}
```

 matcher : Pattern to match tool names, case-sensitive (only applicable for `PreToolUse` and `PostToolUse`) Simple strings match exactly: `Write` matches only the Write tool Supports regex: `Edit|Write` or `Notebook.*` Use `*` to match all tools. You can also use empty string (`""`) or leave `matcher` blank. hooks : Array of commands to execute when the pattern matches `type`: Currently only `"command"` is supported `command`: The bash command to execute (can use `$CLAUDE_PROJECT_DIR` environment variable) `timeout`: (Optional) How long a command should run, in seconds, before canceling that specific command. For events like `UserPromptSubmit`, `Notification`, `Stop`, and `SubagentStop` that don’t use matchers, you can omit the matcher field: 

```
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "/path/to/prompt-validator.py"
          }
        ]
      }
    ]
  }
}
```

 ​ Project-Specific Hook Scripts You can use the environment variable `CLAUDE_PROJECT_DIR` (only available when Claude Code spawns the hook command) to reference scripts stored in your project, ensuring they work regardless of Claude’s current directory: 

```
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/check-style.sh"
          }
        ]
      }
    ]
  }
}
```

 ​ Hook Events ​ PreToolUse Runs after Claude creates tool parameters and before processing the tool call. Common matchers: `Task` - Subagent tasks (see subagents documentation ) `Bash` - Shell commands `Glob` - File pattern matching `Grep` - Content search `Read` - File reading `Edit`, `MultiEdit` - File editing `Write` - File writing `WebFetch`, `WebSearch` - Web operations ​ PostToolUse Runs immediately after a tool completes successfully. Recognizes the same matcher values as PreToolUse. ​ Notification Runs when Claude Code sends notifications. Notifications are sent when: Claude needs your permission to use a tool. Example: “Claude needs your permission to use Bash” The prompt input has been idle for at least 60 seconds. “Claude is waiting for your input” ​ UserPromptSubmit Runs when the user submits a prompt, before Claude processes it. This allows you to add additional context based on the prompt/conversation, validate prompts, or block certain types of prompts. ​ Stop Runs when the main Claude Code agent has finished responding. Does not run if the stoppage occurred due to a user interrupt. ​ SubagentStop Runs when a Claude Code subagent (Task tool call) has finished responding. ​ PreCompact Runs before Claude Code is about to run a compact operation. Matchers: `manual` - Invoked from `/compact` `auto` - Invoked from auto-compact (due to full context window) ​ SessionStart Runs when Claude Code starts a new session or resumes an existing session (which currently does start a new session under the hood). Useful for loading in development context like existing issues or recent changes to your codebase. Matchers: `startup` - Invoked from startup `resume` - Invoked from `--resume`, `--continue`, or `/resume` `clear` - Invoked from `/clear` ​ Hook Input Hooks receive JSON data via stdin containing session information and event-specific data: 

```
{
  // Common fields
  session_id: string
  transcript_path: string  // Path to conversation JSON
  cwd: string              // The current working directory when the hook is invoked
<!-- -->
  // Event-specific fields
  hook_event_name: string
  ...
}
```

 ​ PreToolUse Input The exact schema for `tool_input` depends on the tool. 

```
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "PreToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.txt",
    "content": "file content"
  }
}
```

 ​ PostToolUse Input The exact schema for `tool_input` and `tool_response` depends on the tool. 

```
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "PostToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.txt",
    "content": "file content"
  },
  "tool_response": {
    "filePath": "/path/to/file.txt",
    "success": true
  }
}
```

 ​ Notification Input 

```
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "Notification",
  "message": "Task completed successfully"
}
```

 ​ UserPromptSubmit Input 

```
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "UserPromptSubmit",
  "prompt": "Write a function to calculate the factorial of a number"
}
```

 ​ Stop and SubagentStop Input `stop_hook_active` is true when Claude Code is already continuing as a result of a stop hook. Check this value or process the transcript to prevent Claude Code from running indefinitely. 

```
{
  "session_id": "abc123",
  "transcript_path": "~/.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "hook_event_name": "Stop",
  "stop_hook_active": true
}
```

 ​ PreCompact Input For `manual`, `custom_instructions` comes from what the user passes into `/compact`. For `auto`, `custom_instructions` is empty. 

```
{
  "session_id": "abc123",
  "transcript_path": "~/.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "hook_event_name": "PreCompact",
  "trigger": "manual",
  "custom_instructions": ""
}
```

 ​ SessionStart Input 

```
{
  "session_id": "abc123",
  "transcript_path": "~/.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "hook_event_name": "SessionStart",
  "source": "startup"
}
```

 ​ Hook Output There are two ways for hooks to return output back to Claude Code. The output communicates whether to block and any feedback that should be shown to Claude and the user. ​ Simple: Exit Code Hooks communicate status through exit codes, stdout, and stderr: Exit code 0 : Success. `stdout` is shown to the user in transcript mode (CTRL-R), except for `UserPromptSubmit` and `SessionStart`, where stdout is added to the context. Exit code 2 : Blocking error. `stderr` is fed back to Claude to process automatically. See per-hook-event behavior below. Other exit codes : Non-blocking error. `stderr` is shown to the user and execution continues. Reminder: Claude Code does not see stdout if the exit code is 0, except for the `UserPromptSubmit` hook where stdout is injected as context. ​ Exit Code 2 Behavior Hook Event Behavior `PreToolUse` Blocks the tool call, shows stderr to Claude `PostToolUse` Shows stderr to Claude (tool already ran) `Notification` N/A, shows stderr to user only `UserPromptSubmit` Blocks prompt processing, erases prompt, shows stderr to user only `Stop` Blocks stoppage, shows stderr to Claude `SubagentStop` Blocks stoppage, shows stderr to Claude subagent `PreCompact` N/A, shows stderr to user only `SessionStart` N/A, shows stderr to user only ​ Advanced: JSON Output Hooks can return structured JSON in `stdout` for more sophisticated control: ​ Common JSON Fields All hook types can include these optional fields: 

```
{
  "continue": true, // Whether Claude should continue after hook execution (default: true)
  "stopReason": "string" // Message shown when continue is false
  "suppressOutput": true, // Hide stdout from transcript mode (default: false)
}
```

 If `continue` is false, Claude stops processing after the hooks run. For `PreToolUse`, this is different from `"permissionDecision": "deny"`, which only blocks a specific tool call and provides automatic feedback to Claude. For `PostToolUse`, this is different from `"decision": "block"`, which provides automated feedback to Claude. For `UserPromptSubmit`, this prevents the prompt from being processed. For `Stop` and `SubagentStop`, this takes precedence over any `"decision": "block"` output. In all cases, `"continue" = false` takes precedence over any `"decision": "block"` output. `stopReason` accompanies `continue` with a reason shown to the user, not shown to Claude. ​ `PreToolUse` Decision Control `PreToolUse` hooks can control whether a tool call proceeds. `"allow"` bypasses the permission system. `permissionDecisionReason` is shown to the user but not to Claude. ( Deprecated `"approve"` value + `reason` has the same behavior. ) `"deny"` prevents the tool call from executing. `permissionDecisionReason` is shown to Claude. ( `"block"` value + `reason` has the same behavior. ) `"ask"` asks the user to confirm the tool call in the UI. `permissionDecisionReason` is shown to the user but not to Claude. 

```
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow" | "deny" | "ask",
    "permissionDecisionReason": "My reason here (shown to user)"
  },
  "decision": "approve" | "block" | undefined, // Deprecated for PreToolUse but still supported
  "reason": "Explanation for decision" // Deprecated for PreToolUse but still supported
}
```

 ​ `PostToolUse` Decision Control `PostToolUse` hooks can control whether a tool call proceeds. `"block"` automatically prompts Claude with `reason`. `undefined` does nothing. `reason` is ignored. 

```
{
  "decision": "block" | undefined,
  "reason": "Explanation for decision"
}
```

 ​ `UserPromptSubmit` Decision Control `UserPromptSubmit` hooks can control whether a user prompt is processed. `"block"` prevents the prompt from being processed. The submitted prompt is erased from context. `"reason"` is shown to the user but not added to context. `undefined` allows the prompt to proceed normally. `"reason"` is ignored. `"hookSpecificOutput.additionalContext"` adds the string to the context if not blocked. 

```
{
  "decision": "block" | undefined,
  "reason": "Explanation for decision",
  "hookSpecificOutput": {
    "hookEventName": "UserPromptSubmit",
    "additionalContext": "My additional context here"
  }
}
```

 ​ `Stop`/`SubagentStop` Decision Control `Stop` and `SubagentStop` hooks can control whether Claude must continue. `"block"` prevents Claude from stopping. You must populate `reason` for Claude to know how to proceed. `undefined` allows Claude to stop. `reason` is ignored. 

```
{
  "decision": "block" | undefined,
  "reason": "Must be provided when Claude is blocked from stopping"
}
```

 ​ `SessionStart` Decision Control `SessionStart` hooks allow you to load in context at the start of a session. `"hookSpecificOutput.additionalContext"` adds the string to the context. 

```
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "My additional context here"
  }
}
```

 ​ Exit Code Example: Bash Command Validation 

```
#!/usr/bin/env python3
import json
import re
import sys
<!-- -->
# Define validation rules as a list of (regex pattern, message) tuples
VALIDATION_RULES = [
    (
        r"\bgrep\b(?!.*\|)",
        "Use 'rg' (ripgrep) instead of 'grep' for better performance and features",
    ),
    (
        r"\bfind\s+\S+\s+-name\b",
        "Use 'rg --files | rg pattern' or 'rg --files -g pattern' instead of 'find -name' for better performance",
    ),
]
<!-- -->
<!-- -->
def validate_command(command: str) -> list[str]:
    issues = []
    for pattern, message in VALIDATION_RULES:
        if re.search(pattern, command):
            issues.append(message)
    return issues
<!-- -->
<!-- -->
try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
    sys.exit(1)
<!-- -->
tool_name = input_data.get("tool_name", "")
tool_input = input_data.get("tool_input", {})
command = tool_input.get("command", "")
<!-- -->
if tool_name != "Bash" or not command:
    sys.exit(1)
<!-- -->
# Validate the command
issues = validate_command(command)
<!-- -->
if issues:
    for message in issues:
        print(f"• {message}", file=sys.stderr)
    # Exit code 2 blocks tool call and shows stderr to Claude
    sys.exit(2)
```

 ​ JSON Output Example: UserPromptSubmit to Add Context and Validation For `UserPromptSubmit` hooks, you can inject context using either method: Exit code 0 with stdout: Claude sees the context (special case for `UserPromptSubmit`) JSON output: Provides more control over the behavior 

```
#!/usr/bin/env python3
import json
import sys
import re
import datetime
<!-- -->
# Load input from stdin
try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
    sys.exit(1)
<!-- -->
prompt = input_data.get("prompt", "")
<!-- -->
# Check for sensitive patterns
sensitive_patterns = [
    (r"(?i)\b(password|secret|key|token)\s*[:=]", "Prompt contains potential secrets"),
]
<!-- -->
for pattern, message in sensitive_patterns:
    if re.search(pattern, prompt):
        # Use JSON output to block with a specific reason
        output = {
            "decision": "block",
            "reason": f"Security policy violation: {message}. Please rephrase your request without sensitive information."
        }
        print(json.dumps(output))
        sys.exit(0)
<!-- -->
# Add current time to context
context = f"Current time: {datetime.datetime.now()}"
print(context)
<!-- -->
"""
The following is also equivalent:
print(json.dumps({
  "hookSpecificOutput": {
    "hookEventName": "UserPromptSubmit",
    "additionalContext": context,
  },
}))
"""
<!-- -->
# Allow the prompt to proceed with the additional context
sys.exit(0)
```

 ​ JSON Output Example: PreToolUse with Approval 

```
#!/usr/bin/env python3
import json
import sys
<!-- -->
# Load input from stdin
try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
    sys.exit(1)
<!-- -->
tool_name = input_data.get("tool_name", "")
tool_input = input_data.get("tool_input", {})
<!-- -->
# Example: Auto-approve file reads for documentation files
if tool_name == "Read":
    file_path = tool_input.get("file_path", "")
    if file_path.endswith((".md", ".mdx", ".txt", ".json")):
        # Use JSON output to auto-approve the tool call
        output = {
            "decision": "approve",
            "reason": "Documentation file auto-approved",
            "suppressOutput": True  # Don't show in transcript mode
        }
        print(json.dumps(output))
        sys.exit(0)
<!-- -->
# For other cases, let the normal permission flow proceed
sys.exit(0)
```

 ​ Working with MCP Tools Claude Code hooks work seamlessly with Model Context Protocol (MCP) tools . When MCP servers provide tools, they appear with a special naming pattern that you can match in your hooks. ​ MCP Tool Naming MCP tools follow the pattern `mcp__<server>__<tool>`, for example: `mcp__memory__create_entities` - Memory server’s create entities tool `mcp__filesystem__read_file` - Filesystem server’s read file tool `mcp__github__search_repositories` - GitHub server’s search tool ​ Configuring Hooks for MCP Tools You can target specific MCP tools or entire MCP servers: 

```
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "mcp__memory__.*",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Memory operation initiated' >> ~/mcp-operations.log"
          }
        ]
      },
      {
        "matcher": "mcp__.*__write.*",
        "hooks": [
          {
            "type": "command",
            "command": "/home/user/scripts/validate-mcp-write.py"
          }
        ]
      }
    ]
  }
}
```

 ​ Examples For practical examples including code formatting, notifications, and file protection, see More Examples in the get started guide. ​ Security Considerations ​ Disclaimer USE AT YOUR OWN RISK : Claude Code hooks execute arbitrary shell commands on your system automatically. By using hooks, you acknowledge that: You are solely responsible for the commands you configure Hooks can modify, delete, or access any files your user account can access Malicious or poorly written hooks can cause data loss or system damage Anthropic provides no warranty and assumes no liability for any damages resulting from hook usage You should thoroughly test hooks in a safe environment before production use Always review and understand any hook commands before adding them to your configuration. ​ Security Best Practices Here are some key practices for writing more secure hooks: Validate and sanitize inputs - Never trust input data blindly Always quote shell variables - Use `"$VAR"` not `$VAR` Block path traversal - Check for `..` in file paths Use absolute paths - Specify full paths for scripts (use `$CLAUDE_PROJECT_DIR` for the project path) Skip sensitive files - Avoid `.env`, `.git/`, keys, etc. ​ Configuration Safety Direct edits to hooks in settings files don’t take effect immediately. Claude Code: Captures a snapshot of hooks at startup Uses this snapshot throughout the session Warns if hooks are modified externally Requires review in `/hooks` menu for changes to apply This prevents malicious hook modifications from affecting your current session. ​ Hook Execution Details Timeout : 60-second execution limit by default, configurable per command. A timeout for an individual command does not affect the other commands. Parallelization : All matching hooks run in parallel Environment : Runs in current directory with Claude Code’s environment The `CLAUDE_PROJECT_DIR` environment variable is available and contains the absolute path to the project root directory Input : JSON via stdin Output : PreToolUse/PostToolUse/Stop: Progress shown in transcript (Ctrl-R) Notification: Logged to debug only (`--debug`) ​ Debugging ​ Basic Troubleshooting If your hooks aren’t working: Check configuration - Run `/hooks` to see if your hook is registered Verify syntax - Ensure your JSON settings are valid Test commands - Run hook commands manually first Check permissions - Make sure scripts are executable Review logs - Use `claude --debug` to see hook execution details Common issues: Quotes not escaped - Use `\"` inside JSON strings Wrong matcher - Check tool names match exactly (case-sensitive) Command not found - Use full paths for scripts ​ Advanced Debugging For complex hook issues: Inspect hook execution - Use `claude --debug` to see detailed hook execution Validate JSON schemas - Test hook input/output with external tools Check environment variables - Verify Claude Code’s environment is correct Test edge cases - Try hooks with unusual file paths or inputs Monitor system resources - Check for resource exhaustion during hook execution Use structured logging - Implement logging in your hook scripts ​ Debug Output Example Use `claude --debug` to see hook execution details: 

```
[DEBUG] Executing hooks for PostToolUse:Write
[DEBUG] Getting matching hook commands for PostToolUse with query: Write
[DEBUG] Found 1 hook matchers in settings
[DEBUG] Matched 1 hooks for query "Write"
[DEBUG] Found 1 hook commands to execute
[DEBUG] Executing hook command: <Your command> with timeout 60000ms
[DEBUG] Hook command completed with status 0: <Your stdout>
```

 Progress messages appear in transcript mode (Ctrl-R) showing: Which hook is running Command being executed Success/failure status Output or error messages Was this page helpful? Yes No Slash commands Data usage On this page Configuration Structure Project-Specific Hook Scripts Hook Events PreToolUse PostToolUse Notification UserPromptSubmit Stop SubagentStop PreCompact SessionStart Hook Input PreToolUse Input PostToolUse Input Notification Input UserPromptSubmit Input Stop and SubagentStop Input PreCompact Input SessionStart Input Hook Output Simple: Exit Code Exit Code 2 Behavior Advanced: JSON Output Common JSON Fields PreToolUse Decision Control PostToolUse Decision Control UserPromptSubmit Decision Control Stop/SubagentStop Decision Control SessionStart Decision Control Exit Code Example: Bash Command Validation JSON Output Example: UserPromptSubmit to Add Context and Validation JSON Output Example: PreToolUse with Approval Working with MCP Tools MCP Tool Naming Configuring Hooks for MCP Tools Examples Security Considerations Disclaimer Security Best Practices Configuration Safety Hook Execution Details Debugging Basic Troubleshooting Advanced Debugging Debug Output Example

---

### Legal and compliance - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/legal-and-compliance

Legal and compliance - Anthropic Anthropic home page English Search... Search... Navigation Resources Legal and compliance Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Data usage Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Legal and compliance ​ Legal agreements ​ License Claude Code is provided under Anthropic’s Commercial Terms of Service . ​ Commercial agreements Whether you’re using Anthropic’s API directly (1P) or accessing it through AWS Bedrock or Google Vertex (3P), your existing commercial agreement will apply to Claude Code usage, unless we’ve mutually agreed otherwise. ​ Compliance ​ Healthcare compliance (BAA) If a customer has a Business Associate Agreement (BAA) with us, and wants to use Claude Code, the BAA will automatically extend to cover Claude Code if the customer has executed a BAA and has Zero Data Retention (ZDR) activated. The BAA will be applicable to that customer’s API traffic flowing through Claude Code. ​ Security and trust ​ Trust and safety You can find more information in the Anthropic Trust Center and Transparency Hub . ​ Security vulnerability reporting Anthropic manages our security program through HackerOne. Use this form to report vulnerabilities . © Anthropic PBC. All rights reserved. Use is subject to Anthropic’s Commercial Terms of Service . Was this page helpful? Yes No Hooks reference On this page Legal agreements License Commercial agreements Compliance Healthcare compliance (BAA) Security and trust Trust and safety Security vulnerability reporting

---

### Add Claude Code to your IDE - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/ide-integrations#features

Add Claude Code to your IDE - Anthropic Anthropic home page English Search... Search... Navigation Configuration Add Claude Code to your IDE Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance Claude Code works great with any Integrated Development Environment (IDE) that has a terminal. Just run `claude`, and you’re ready to go. In addition, Claude Code provides dedicated integrations for popular IDEs, which provide features like interactive diff viewing, selection context sharing, and more. These integrations currently exist for: Visual Studio Code (including popular forks like Cursor, Windsurf, and VSCodium) JetBrains IDEs (including IntelliJ, PyCharm, Android Studio, WebStorm, PhpStorm and GoLand) ​ Features Quick launch : Use `Cmd+Esc` (Mac) or `Ctrl+Esc` (Windows/Linux) to open Claude Code directly from your editor, or click the Claude Code button in the UI Diff viewing : Code changes can be displayed directly in the IDE diff viewer instead of the terminal. You can configure this in `/config` Selection context : The current selection/tab in the IDE is automatically shared with Claude Code File reference shortcuts : Use `Cmd+Option+K` (Mac) or `Alt+Ctrl+K` (Linux/Windows) to insert file references (e.g., @File#L1-99) Diagnostic sharing : Diagnostic errors (lint, syntax, etc.) from the IDE are automatically shared with Claude as you work ​ Installation VS Code+ JetBrains To install Claude Code on VS Code and popular forks like Cursor, Windsurf, and VSCodium: Open VS Code Open the integrated terminal Run `claude` - the extension will auto-install To install Claude Code on VS Code and popular forks like Cursor, Windsurf, and VSCodium: Open VS Code Open the integrated terminal Run `claude` - the extension will auto-install To install Claude Code on JetBrains IDEs like IntelliJ, PyCharm, Android Studio, WebStorm, PhpStorm and GoLand, find and install the Claude Code plugin from the marketplace and restart your IDE. The plugin may also be auto-installed when you run `claude` in the integrated terminal. The IDE must be restarted completely to take effect. Remote Development Limitations : When using JetBrains Remote Development, you must install the plugin in the remote host via `Settings > Plugin (Host)`. ​ Usage ​ From your IDE Run `claude` from your IDE’s integrated terminal, and all features will be active. ​ From external terminals Use the `/ide` command in any external terminal to connect Claude Code to your IDE and activate all features. If you want Claude to have access to the same files as your IDE, start Claude Code from the same directory as your IDE project root. ​ Configuration IDE integrations work with Claude Code’s configuration system: Run `claude` Enter the `/config` command Adjust your preferences. Setting the diff tool to `auto` will enable automatic IDE detection ​ Troubleshooting ​ VS Code extension not installing Ensure you’re running Claude Code from VS Code’s integrated terminal Ensure that the CLI corresponding to your IDE is installed: For VS Code: `code` command should be available For Cursor: `cursor` command should be available For Windsurf: `windsurf` command should be available For VSCodium: `codium` command should be available If not installed, use `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux) and search for “Shell Command: Install ‘code’ command in PATH” (or the equivalent for your IDE) Check that VS Code has permission to install extensions ​ JetBrains plugin not working Ensure you’re running Claude Code from the project root directory Check that the JetBrains plugin is enabled in the IDE settings Completely restart the IDE. You may need to do this multiple times For JetBrains Remote Development, ensure that the Claude Code plugin is installed in the remote host and not locally on the client For additional help, refer to our troubleshooting guide . Was this page helpful? Yes No Settings Terminal configuration On this page Features Installation Usage From your IDE From external terminals Configuration Troubleshooting VS Code extension not installing JetBrains plugin not working

---

### Optimize your terminal setup - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/terminal-config#themes-and-appearance

Optimize your terminal setup - Anthropic Anthropic home page English Search... Search... Navigation Configuration Optimize your terminal setup Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Data usage Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Legal and compliance ​ Themes and appearance Claude cannot control the theme of your terminal. That’s handled by your terminal application. You can match Claude Code’s theme to your terminal any time via the `/config` command. ​ Line breaks You have several options for entering linebreaks into Claude Code: Quick escape : Type `\` followed by Enter to create a newline Keyboard shortcut : Set up a keybinding to insert a newline ​ Set up Shift+Enter (VS Code or iTerm2): Run `/terminal-setup` within Claude Code to automatically configure Shift+Enter. ​ Set up Option+Enter (VS Code, iTerm2 or macOS Terminal.app): For Mac Terminal.app: Open Settings → Profiles → Keyboard Check “Use Option as Meta Key” For iTerm2 and VS Code terminal: Open Settings → Profiles → Keys Under General, set Left/Right Option key to “Esc+“ ​ Notification setup Never miss when Claude completes a task with proper notification configuration: ​ Terminal bell notifications Enable sound alerts when tasks complete: 

```
claude config set --global preferredNotifChannel terminal_bell
```

 For macOS users : Don’t forget to enable notification permissions in System Settings → Notifications → [Your Terminal App]. ​ iTerm 2 system notifications For iTerm 2 alerts when tasks complete: Open iTerm 2 Preferences Navigate to Profiles → Terminal Enable “Silence bell” and Filter Alerts → “Send escape sequence-generated alerts” Set your preferred notification delay Note that these notifications are specific to iTerm 2 and not available in the default macOS Terminal. ​ Custom notification hooks For advanced notification handling, you can create notification hooks to run your own logic. ​ Handling large inputs When working with extensive code or long instructions: Avoid direct pasting : Claude Code may struggle with very long pasted content Use file-based workflows : Write content to a file and ask Claude to read it Be aware of VS Code limitations : The VS Code terminal is particularly prone to truncating long pastes ​ Vim Mode Claude Code supports a subset of Vim keybindings that can be enabled with `/vim` or configured via `/config`. The supported subset includes: Mode switching: `Esc` (to NORMAL), `i`/`I`, `a`/`A`, `o`/`O` (to INSERT) Navigation: `h`/`j`/`k`/`l`, `w`/`e`/`b`, `0`/`Optimize your terminal setup - Anthropic Anthropic home page English Search... Search... Navigation Configuration Optimize your terminal setup Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Data usage Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Legal and compliance ​ Themes and appearance Claude cannot control the theme of your terminal. That’s handled by your terminal application. You can match Claude Code’s theme to your terminal any time via the `/config` command. ​ Line breaks You have several options for entering linebreaks into Claude Code: Quick escape : Type `\` followed by Enter to create a newline Keyboard shortcut : Set up a keybinding to insert a newline ​ Set up Shift+Enter (VS Code or iTerm2): Run `/terminal-setup` within Claude Code to automatically configure Shift+Enter. ​ Set up Option+Enter (VS Code, iTerm2 or macOS Terminal.app): For Mac Terminal.app: Open Settings → Profiles → Keyboard Check “Use Option as Meta Key” For iTerm2 and VS Code terminal: Open Settings → Profiles → Keys Under General, set Left/Right Option key to “Esc+“ ​ Notification setup Never miss when Claude completes a task with proper notification configuration: ​ Terminal bell notifications Enable sound alerts when tasks complete: 

```
claude config set --global preferredNotifChannel terminal_bell
```

 For macOS users : Don’t forget to enable notification permissions in System Settings → Notifications → [Your Terminal App]. ​ iTerm 2 system notifications For iTerm 2 alerts when tasks complete: Open iTerm 2 Preferences Navigate to Profiles → Terminal Enable “Silence bell” and Filter Alerts → “Send escape sequence-generated alerts” Set your preferred notification delay Note that these notifications are specific to iTerm 2 and not available in the default macOS Terminal. ​ Custom notification hooks For advanced notification handling, you can create notification hooks to run your own logic. ​ Handling large inputs When working with extensive code or long instructions: Avoid direct pasting : Claude Code may struggle with very long pasted content Use file-based workflows : Write content to a file and ask Claude to read it Be aware of VS Code limitations : The VS Code terminal is particularly prone to truncating long pastes ​ Vim Mode Claude Code supports a subset of Vim keybindings that can be enabled with `/vim` or configured via `/config`. The supported subset includes: Mode switching: `Esc` (to NORMAL), `i`/`I`, `a`/`A`, `o`/`O` (to INSERT) Navigation: `h`/`j`/`k`/`l`, `w`/`e`/`b`, `0`//`^`, `gg`/`G` Editing: `x`, `dw`/`de`/`db`/`dd`/`D`, `cw`/`ce`/`cb`/`cc`/`C`, `.` (repeat) Was this page helpful? Yes No Add Claude Code to your IDE Memory management On this page Themes and appearance Line breaks Set up Shift+Enter (VS Code or iTerm2): Set up Option+Enter (VS Code, iTerm2 or macOS Terminal.app): Notification setup Terminal bell notifications iTerm 2 system notifications Custom notification hooks Handling large inputs Vim Mode

---

### Optimize your terminal setup - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/terminal-config#line-breaks

Optimize your terminal setup - Anthropic Anthropic home page English Search... Search... Navigation Configuration Optimize your terminal setup Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Data usage Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Legal and compliance ​ Themes and appearance Claude cannot control the theme of your terminal. That’s handled by your terminal application. You can match Claude Code’s theme to your terminal any time via the `/config` command. ​ Line breaks You have several options for entering linebreaks into Claude Code: Quick escape : Type `\` followed by Enter to create a newline Keyboard shortcut : Set up a keybinding to insert a newline ​ Set up Shift+Enter (VS Code or iTerm2): Run `/terminal-setup` within Claude Code to automatically configure Shift+Enter. ​ Set up Option+Enter (VS Code, iTerm2 or macOS Terminal.app): For Mac Terminal.app: Open Settings → Profiles → Keyboard Check “Use Option as Meta Key” For iTerm2 and VS Code terminal: Open Settings → Profiles → Keys Under General, set Left/Right Option key to “Esc+“ ​ Notification setup Never miss when Claude completes a task with proper notification configuration: ​ Terminal bell notifications Enable sound alerts when tasks complete: 

```
claude config set --global preferredNotifChannel terminal_bell
```

 For macOS users : Don’t forget to enable notification permissions in System Settings → Notifications → [Your Terminal App]. ​ iTerm 2 system notifications For iTerm 2 alerts when tasks complete: Open iTerm 2 Preferences Navigate to Profiles → Terminal Enable “Silence bell” and Filter Alerts → “Send escape sequence-generated alerts” Set your preferred notification delay Note that these notifications are specific to iTerm 2 and not available in the default macOS Terminal. ​ Custom notification hooks For advanced notification handling, you can create notification hooks to run your own logic. ​ Handling large inputs When working with extensive code or long instructions: Avoid direct pasting : Claude Code may struggle with very long pasted content Use file-based workflows : Write content to a file and ask Claude to read it Be aware of VS Code limitations : The VS Code terminal is particularly prone to truncating long pastes ​ Vim Mode Claude Code supports a subset of Vim keybindings that can be enabled with `/vim` or configured via `/config`. The supported subset includes: Mode switching: `Esc` (to NORMAL), `i`/`I`, `a`/`A`, `o`/`O` (to INSERT) Navigation: `h`/`j`/`k`/`l`, `w`/`e`/`b`, `0`/`Optimize your terminal setup - Anthropic Anthropic home page English Search... Search... Navigation Configuration Optimize your terminal setup Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Data usage Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Legal and compliance ​ Themes and appearance Claude cannot control the theme of your terminal. That’s handled by your terminal application. You can match Claude Code’s theme to your terminal any time via the `/config` command. ​ Line breaks You have several options for entering linebreaks into Claude Code: Quick escape : Type `\` followed by Enter to create a newline Keyboard shortcut : Set up a keybinding to insert a newline ​ Set up Shift+Enter (VS Code or iTerm2): Run `/terminal-setup` within Claude Code to automatically configure Shift+Enter. ​ Set up Option+Enter (VS Code, iTerm2 or macOS Terminal.app): For Mac Terminal.app: Open Settings → Profiles → Keyboard Check “Use Option as Meta Key” For iTerm2 and VS Code terminal: Open Settings → Profiles → Keys Under General, set Left/Right Option key to “Esc+“ ​ Notification setup Never miss when Claude completes a task with proper notification configuration: ​ Terminal bell notifications Enable sound alerts when tasks complete: 

```
claude config set --global preferredNotifChannel terminal_bell
```

 For macOS users : Don’t forget to enable notification permissions in System Settings → Notifications → [Your Terminal App]. ​ iTerm 2 system notifications For iTerm 2 alerts when tasks complete: Open iTerm 2 Preferences Navigate to Profiles → Terminal Enable “Silence bell” and Filter Alerts → “Send escape sequence-generated alerts” Set your preferred notification delay Note that these notifications are specific to iTerm 2 and not available in the default macOS Terminal. ​ Custom notification hooks For advanced notification handling, you can create notification hooks to run your own logic. ​ Handling large inputs When working with extensive code or long instructions: Avoid direct pasting : Claude Code may struggle with very long pasted content Use file-based workflows : Write content to a file and ask Claude to read it Be aware of VS Code limitations : The VS Code terminal is particularly prone to truncating long pastes ​ Vim Mode Claude Code supports a subset of Vim keybindings that can be enabled with `/vim` or configured via `/config`. The supported subset includes: Mode switching: `Esc` (to NORMAL), `i`/`I`, `a`/`A`, `o`/`O` (to INSERT) Navigation: `h`/`j`/`k`/`l`, `w`/`e`/`b`, `0`//`^`, `gg`/`G` Editing: `x`, `dw`/`de`/`db`/`dd`/`D`, `cw`/`ce`/`cb`/`cc`/`C`, `.` (repeat) Was this page helpful? Yes No Add Claude Code to your IDE Memory management On this page Themes and appearance Line breaks Set up Shift+Enter (VS Code or iTerm2): Set up Option+Enter (VS Code, iTerm2 or macOS Terminal.app): Notification setup Terminal bell notifications iTerm 2 system notifications Custom notification hooks Handling large inputs Vim Mode

---

### Manage Claude&#x27;s memory - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/memory#determine-memory-type

Manage Claude's memory - Anthropic Anthropic home page English Search... Search... Navigation Configuration Manage Claude's memory Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance Claude Code can remember your preferences across sessions, like style guidelines and common commands in your workflow. ​ Determine memory type Claude Code offers three memory locations, each serving a different purpose: Memory Type Location Purpose Use Case Examples Project memory `./CLAUDE.md` Team-shared instructions for the project Project architecture, coding standards, common workflows User memory `~/.claude/CLAUDE.md` Personal preferences for all projects Code styling preferences, personal tooling shortcuts Project memory (local) `./CLAUDE.local.md` Personal project-specific preferences (Deprecated, see below) Your sandbox URLs, preferred test data All memory files are automatically loaded into Claude Code’s context when launched. ​ CLAUDE.md imports CLAUDE.md files can import additional files using `@path/to/import` syntax. The following example imports 3 files: 

```
See @README for project overview and @package.json for available npm commands for this project.
<!-- -->
# Additional Instructions
- git workflow @docs/git-instructions.md
```

 Both relative and absolute paths are allowed. In particular, importing files in user’s home dir is a convenient way for your team members to provide individual instructions that are not checked into the repository. Previously CLAUDE.local.md served a similar purpose, but is now deprecated in favor of imports since they work better across multiple git worktrees. 

```
# Individual Preferences
- @~/.claude/my-project-instructions.md
```

 To avoid potential collisions, imports are not evaluated inside markdown code spans and code blocks. 

```
This code span will not be treated as an import: `@anthropic-ai/claude-code`
```

 Imported files can recursively import additional files, with a max-depth of 5 hops. You can see what memory files are loaded by running `/memory` command. ​ How Claude looks up memories Claude Code reads memories recursively: starting in the cwd, Claude Code recurses up to (but not including) the root directory / and reads any CLAUDE.md or CLAUDE.local.md files it finds. This is especially convenient when working in large repositories where you run Claude Code in foo/bar/ , and have memories in both foo/CLAUDE.md and foo/bar/CLAUDE.md . Claude will also discover CLAUDE.md nested in subtrees under your current working directory. Instead of loading them at launch, they are only included when Claude reads files in those subtrees. ​ Quickly add memories with the `#` shortcut The fastest way to add a memory is to start your input with the `#` character: 

```
# Always use descriptive variable names
```

 You’ll be prompted to select which memory file to store this in. ​ Directly edit memories with `/memory` Use the `/memory` slash command during a session to open any memory file in your system editor for more extensive additions or organization. ​ Set up project memory Suppose you want to set up a CLAUDE.md file to store important project information, conventions, and frequently used commands. Bootstrap a CLAUDE.md for your codebase with the following command: 

```
> /init
```

 Tips: Include frequently used commands (build, test, lint) to avoid repeated searches Document code style preferences and naming conventions Add important architectural patterns specific to your project CLAUDE.md memories can be used for both instructions shared with your team and for your individual preferences. ​ Memory best practices Be specific : “Use 2-space indentation” is better than “Format code properly”. Use structure to organize : Format each individual memory as a bullet point and group related memories under descriptive markdown headings. Review periodically : Update memories as your project evolves to ensure Claude is always using the most up to date information and context. Was this page helpful? Yes No Terminal configuration CLI reference On this page Determine memory type CLAUDE.md imports How Claude looks up memories Quickly add memories with the # shortcut Directly edit memories with /memory Set up project memory Memory best practices

---

### Manage Claude&#x27;s memory - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/memory#claude-md-imports

Manage Claude's memory - Anthropic Anthropic home page English Search... Search... Navigation Configuration Manage Claude's memory Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance Claude Code can remember your preferences across sessions, like style guidelines and common commands in your workflow. ​ Determine memory type Claude Code offers three memory locations, each serving a different purpose: Memory Type Location Purpose Use Case Examples Project memory `./CLAUDE.md` Team-shared instructions for the project Project architecture, coding standards, common workflows User memory `~/.claude/CLAUDE.md` Personal preferences for all projects Code styling preferences, personal tooling shortcuts Project memory (local) `./CLAUDE.local.md` Personal project-specific preferences (Deprecated, see below) Your sandbox URLs, preferred test data All memory files are automatically loaded into Claude Code’s context when launched. ​ CLAUDE.md imports CLAUDE.md files can import additional files using `@path/to/import` syntax. The following example imports 3 files: 

```
See @README for project overview and @package.json for available npm commands for this project.
<!-- -->
# Additional Instructions
- git workflow @docs/git-instructions.md
```

 Both relative and absolute paths are allowed. In particular, importing files in user’s home dir is a convenient way for your team members to provide individual instructions that are not checked into the repository. Previously CLAUDE.local.md served a similar purpose, but is now deprecated in favor of imports since they work better across multiple git worktrees. 

```
# Individual Preferences
- @~/.claude/my-project-instructions.md
```

 To avoid potential collisions, imports are not evaluated inside markdown code spans and code blocks. 

```
This code span will not be treated as an import: `@anthropic-ai/claude-code`
```

 Imported files can recursively import additional files, with a max-depth of 5 hops. You can see what memory files are loaded by running `/memory` command. ​ How Claude looks up memories Claude Code reads memories recursively: starting in the cwd, Claude Code recurses up to (but not including) the root directory / and reads any CLAUDE.md or CLAUDE.local.md files it finds. This is especially convenient when working in large repositories where you run Claude Code in foo/bar/ , and have memories in both foo/CLAUDE.md and foo/bar/CLAUDE.md . Claude will also discover CLAUDE.md nested in subtrees under your current working directory. Instead of loading them at launch, they are only included when Claude reads files in those subtrees. ​ Quickly add memories with the `#` shortcut The fastest way to add a memory is to start your input with the `#` character: 

```
# Always use descriptive variable names
```

 You’ll be prompted to select which memory file to store this in. ​ Directly edit memories with `/memory` Use the `/memory` slash command during a session to open any memory file in your system editor for more extensive additions or organization. ​ Set up project memory Suppose you want to set up a CLAUDE.md file to store important project information, conventions, and frequently used commands. Bootstrap a CLAUDE.md for your codebase with the following command: 

```
> /init
```

 Tips: Include frequently used commands (build, test, lint) to avoid repeated searches Document code style preferences and naming conventions Add important architectural patterns specific to your project CLAUDE.md memories can be used for both instructions shared with your team and for your individual preferences. ​ Memory best practices Be specific : “Use 2-space indentation” is better than “Format code properly”. Use structure to organize : Format each individual memory as a bullet point and group related memories under descriptive markdown headings. Review periodically : Update memories as your project evolves to ensure Claude is always using the most up to date information and context. Was this page helpful? Yes No Terminal configuration CLI reference On this page Determine memory type CLAUDE.md imports How Claude looks up memories Quickly add memories with the # shortcut Directly edit memories with /memory Set up project memory Memory best practices

---

### Manage Claude&#x27;s memory - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/memory#how-claude-looks-up-memories

Manage Claude's memory - Anthropic Anthropic home page English Search... Search... Navigation Configuration Manage Claude's memory Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Data usage Legal and compliance Claude Code can remember your preferences across sessions, like style guidelines and common commands in your workflow. ​ Determine memory type Claude Code offers three memory locations, each serving a different purpose: Memory Type Location Purpose Use Case Examples Project memory `./CLAUDE.md` Team-shared instructions for the project Project architecture, coding standards, common workflows User memory `~/.claude/CLAUDE.md` Personal preferences for all projects Code styling preferences, personal tooling shortcuts Project memory (local) `./CLAUDE.local.md` Personal project-specific preferences (Deprecated, see below) Your sandbox URLs, preferred test data All memory files are automatically loaded into Claude Code’s context when launched. ​ CLAUDE.md imports CLAUDE.md files can import additional files using `@path/to/import` syntax. The following example imports 3 files: 

```
See @README for project overview and @package.json for available npm commands for this project.
<!-- -->
# Additional Instructions
- git workflow @docs/git-instructions.md
```

 Both relative and absolute paths are allowed. In particular, importing files in user’s home dir is a convenient way for your team members to provide individual instructions that are not checked into the repository. Previously CLAUDE.local.md served a similar purpose, but is now deprecated in favor of imports since they work better across multiple git worktrees. 

```
# Individual Preferences
- @~/.claude/my-project-instructions.md
```

 To avoid potential collisions, imports are not evaluated inside markdown code spans and code blocks. 

```
This code span will not be treated as an import: `@anthropic-ai/claude-code`
```

 Imported files can recursively import additional files, with a max-depth of 5 hops. You can see what memory files are loaded by running `/memory` command. ​ How Claude looks up memories Claude Code reads memories recursively: starting in the cwd, Claude Code recurses up to (but not including) the root directory / and reads any CLAUDE.md or CLAUDE.local.md files it finds. This is especially convenient when working in large repositories where you run Claude Code in foo/bar/ , and have memories in both foo/CLAUDE.md and foo/bar/CLAUDE.md . Claude will also discover CLAUDE.md nested in subtrees under your current working directory. Instead of loading them at launch, they are only included when Claude reads files in those subtrees. ​ Quickly add memories with the `#` shortcut The fastest way to add a memory is to start your input with the `#` character: 

```
# Always use descriptive variable names
```

 You’ll be prompted to select which memory file to store this in. ​ Directly edit memories with `/memory` Use the `/memory` slash command during a session to open any memory file in your system editor for more extensive additions or organization. ​ Set up project memory Suppose you want to set up a CLAUDE.md file to store important project information, conventions, and frequently used commands. Bootstrap a CLAUDE.md for your codebase with the following command: 

```
> /init
```

 Tips: Include frequently used commands (build, test, lint) to avoid repeated searches Document code style preferences and naming conventions Add important architectural patterns specific to your project CLAUDE.md memories can be used for both instructions shared with your team and for your individual preferences. ​ Memory best practices Be specific : “Use 2-space indentation” is better than “Format code properly”. Use structure to organize : Format each individual memory as a bullet point and group related memories under descriptive markdown headings. Review periodically : Update memories as your project evolves to ensure Claude is always using the most up to date information and context. Was this page helpful? Yes No Terminal configuration CLI reference On this page Determine memory type CLAUDE.md imports How Claude looks up memories Quickly add memories with the # shortcut Directly edit memories with /memory Set up project memory Memory best practices

---

### CLI reference - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/cli-reference#cli-commands

CLI reference - Anthropic Anthropic home page English Search... Search... Navigation Reference CLI reference Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Data usage Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Legal and compliance ​ CLI commands Command Description Example `claude` Start interactive REPL `claude` `claude "query"` Start REPL with initial prompt `claude "explain this project"` `claude -p "query"` Query via SDK, then exit `claude -p "explain this function"` `cat file | claude -p "query"` Process piped content `cat logs.txt | claude -p "explain"` `claude -c` Continue most recent conversation `claude -c` `claude -c -p "query"` Continue via SDK `claude -c -p "Check for type errors"` `claude -r "<session-id>" "query"` Resume session by ID `claude -r "abc123" "Finish this PR"` `claude update` Update to latest version `claude update` `claude mcp` Configure Model Context Protocol (MCP) servers See the Claude Code MCP documentation . ​ CLI flags Customize Claude Code’s behavior with these command-line flags: Flag Description Example `--add-dir` Add additional working directories for Claude to access (validates each path exists as a directory) `claude --add-dir ../apps ../lib` `--allowedTools` A list of tools that should be allowed without prompting the user for permission, in addition to settings.json files `"Bash(git log:*)" "Bash(git diff:*)" "Read"` `--disallowedTools` A list of tools that should be disallowed without prompting the user for permission, in addition to settings.json files `"Bash(git log:*)" "Bash(git diff:*)" "Edit"` `--print`, `-p` Print response without interactive mode (see SDK documentation for programmatic usage details) `claude -p "query"` `--output-format` Specify output format for print mode (options: `text`, `json`, `stream-json`) `claude -p "query" --output-format json` `--input-format` Specify input format for print mode (options: `text`, `stream-json`) `claude -p --output-format json --input-format stream-json` `--verbose` Enable verbose logging, shows full turn-by-turn output (helpful for debugging in both print and interactive modes) `claude --verbose` `--max-turns` Limit the number of agentic turns in non-interactive mode `claude -p --max-turns 3 "query"` `--model` Sets the model for the current session with an alias for the latest model (`sonnet` or `opus`) or a model’s full name `claude --model claude-sonnet-4-20250514` `--permission-mode` Begin in a specified permission mode `claude --permission-mode plan` `--permission-prompt-tool` Specify an MCP tool to handle permission prompts in non-interactive mode `claude -p --permission-prompt-tool mcp_auth_tool "query"` `--resume` Resume a specific session by ID, or by choosing in interactive mode `claude --resume abc123 "query"` `--continue` Load the most recent conversation in the current directory `claude --continue` `--dangerously-skip-permissions` Skip permission prompts (use with caution) `claude --dangerously-skip-permissions` The `--output-format json` flag is particularly useful for scripting and automation, allowing you to parse Claude’s responses programmatically. For detailed information about print mode (`-p`) including output formats, streaming, verbose logging, and programmatic usage, see the SDK documentation . ​ See also Interactive mode - Shortcuts, input modes, and interactive features Slash commands - Interactive session commands Quickstart guide - Getting started with Claude Code Common workflows - Advanced workflows and patterns Settings - Configuration options SDK documentation - Programmatic usage and integrations Was this page helpful? Yes No Memory management Interactive mode On this page CLI commands CLI flags See also

---

### CLI reference - Anthropic

**Source:** https://docs.anthropic.com/en/docs/claude-code/cli-reference#cli-flags

CLI reference - Anthropic Anthropic home page English Search... Search... Navigation Reference CLI reference Welcome Developer Platform Claude Code Model Context Protocol (MCP) API Reference Resources Release Notes Getting started Overview Quickstart Common workflows Build with Claude Code Claude Code SDK Subagents Claude Code hooks GitHub Actions Model Context Protocol (MCP) Troubleshooting Deployment Overview Amazon Bedrock Google Vertex AI Corporate proxy LLM gateway Development containers Administration Advanced installation Identity and Access Management Security Data usage Monitoring Costs Analytics Configuration Settings Add Claude Code to your IDE Terminal configuration Memory management Reference CLI reference Interactive mode Slash commands Hooks reference Resources Legal and compliance ​ CLI commands Command Description Example `claude` Start interactive REPL `claude` `claude "query"` Start REPL with initial prompt `claude "explain this project"` `claude -p "query"` Query via SDK, then exit `claude -p "explain this function"` `cat file | claude -p "query"` Process piped content `cat logs.txt | claude -p "explain"` `claude -c` Continue most recent conversation `claude -c` `claude -c -p "query"` Continue via SDK `claude -c -p "Check for type errors"` `claude -r "<session-id>" "query"` Resume session by ID `claude -r "abc123" "Finish this PR"` `claude update` Update to latest version `claude update` `claude mcp` Configure Model Context Protocol (MCP) servers See the Claude Code MCP documentation . ​ CLI flags Customize Claude Code’s behavior with these command-line flags: Flag Description Example `--add-dir` Add additional working directories for Claude to access (validates each path exists as a directory) `claude --add-dir ../apps ../lib` `--allowedTools` A list of tools that should be allowed without prompting the user for permission, in addition to settings.json files `"Bash(git log:*)" "Bash(git diff:*)" "Read"` `--disallowedTools` A list of tools that should be disallowed without prompting the user for permission, in addition to settings.json files `"Bash(git log:*)" "Bash(git diff:*)" "Edit"` `--print`, `-p` Print response without interactive mode (see SDK documentation for programmatic usage details) `claude -p "query"` `--output-format` Specify output format for print mode (options: `text`, `json`, `stream-json`) `claude -p "query" --output-format json` `--input-format` Specify input format for print mode (options: `text`, `stream-json`) `claude -p --output-format json --input-format stream-json` `--verbose` Enable verbose logging, shows full turn-by-turn output (helpful for debugging in both print and interactive modes) `claude --verbose` `--max-turns` Limit the number of agentic turns in non-interactive mode `claude -p --max-turns 3 "query"` `--model` Sets the model for the current session with an alias for the latest model (`sonnet` or `opus`) or a model’s full name `claude --model claude-sonnet-4-20250514` `--permission-mode` Begin in a specified permission mode `claude --permission-mode plan` `--permission-prompt-tool` Specify an MCP tool to handle permission prompts in non-interactive mode `claude -p --permission-prompt-tool mcp_auth_tool "query"` `--resume` Resume a specific session by ID, or by choosing in interactive mode `claude --resume abc123 "query"` `--continue` Load the most recent conversation in the current directory `claude --continue` `--dangerously-skip-permissions` Skip permission prompts (use with caution) `claude --dangerously-skip-permissions` The `--output-format json` flag is particularly useful for scripting and automation, allowing you to parse Claude’s responses programmatically. For detailed information about print mode (`-p`) including output formats, streaming, verbose logging, and programmatic usage, see the SDK documentation . ​ See also Interactive mode - Shortcuts, input modes, and interactive features Slash commands - Interactive session commands Quickstart guide - Getting started with Claude Code Common workflows - Advanced workflows and patterns Settings - Configuration options SDK documentation - Programmatic usage and integrations Was this page helpful? Yes No Memory management Interactive mode On this page CLI commands CLI flags See also

---


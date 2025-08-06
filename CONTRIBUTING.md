# Contributing to Flashbacker

Thank you for your interest in contributing to Flashbacker! This document provides guidelines for contributing to this project.

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x, 20.x, or 22.x LTS
- npm 9.x or later
- Git

### Development Setup
```bash
# 1. Fork and clone the repository
git clone https://github.com/agentsea/flashbacker.git
cd flashbacker

# 2. Install dependencies
npm install

# 3. Build the project
npm run build

# 4. Link globally for testing
npm link

# 5. Verify installation
flashback --version
```

## 🔧 Development Workflow

### Making Changes
1. **Create a branch**: `git checkout -b feature/your-feature-name`
2. **Make your changes**: Follow the coding standards below
3. **Test thoroughly**: Ensure your changes work as expected
4. **Run quality checks**: `npm run lint && npm run build`
5. **Commit**: Use clear, descriptive commit messages
6. **Push and create PR**: Submit a pull request with description

### Code Quality Standards
```bash
# Before submitting PRs, ensure:
npm run lint          # ESLint passes
npm run lint:fix      # Auto-fix formatting issues
npm run build         # TypeScript compiles successfully
```

## 📋 Pull Request Process

### Requirements
- [ ] Code follows existing patterns and conventions
- [ ] All lint checks pass (`npm run lint`)
- [ ] TypeScript compiles without errors (`npm run build`)
- [ ] Changes are well-documented
- [ ] PR description clearly explains the changes

### PR Template
When creating a PR, please include:
- **What**: Brief description of the change
- **Why**: Reason for the change
- **How**: Technical approach taken
- **Testing**: How you tested the changes

## 🏗️ Architecture Guidelines

### Template-Driven System
- **Never hardcode file lists**: Use dynamic template scanning
- **Follow existing patterns**: Check `src/commands/` for examples
- **Use proper error handling**: All functions should handle errors gracefully

### Code Patterns
- **CLI Commands**: Add to `src/commands/` with Commander.js integration
- **Utilities**: Use `src/utils/` for shared functionality
- **Templates**: Add to `templates/.claude/` directory structure

## 🐛 Bug Reports

### Before Reporting
1. Check existing issues to avoid duplicates
2. Test with the latest version
3. Run `flashback doctor` for diagnostics

### Bug Report Template
- **Environment**: Node.js version, OS, Flashback version
- **Steps to reproduce**: Clear, step-by-step instructions
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Additional context**: Screenshots, error messages, etc.

## 💡 Feature Requests

### Guidelines
- Check existing issues and discussions first
- Clearly explain the use case and benefit
- Consider if it fits Flashback's core mission
- Provide examples of how it would work

## 🎯 Areas for Contribution

### High-Impact Areas
- **New AI Personas**: Add specialized analysis personas
- **Code Quality Commands**: Enhance debt-hunter or add new analyzers
- **Documentation**: Improve guides, examples, and clarity
- **Testing**: Add comprehensive test coverage
- **Performance**: Optimize CLI responsiveness

### Good First Issues
- Documentation improvements
- Error message enhancements
- Template additions
- Bug fixes in existing commands

## 📚 Development Resources

### Key Files
- `src/cli.ts`: Main CLI entry point
- `src/commands/`: Individual command implementations
- `templates/`: Template-driven architecture files
- `docs/`: Documentation and user guides

### Understanding the Codebase
- **Hybrid AI+Computer Pattern**: CLI handles data, AI handles intelligence
- **Template System**: Dynamic scanning prevents hardcoded paths
- **Session Continuity**: Memory and working plan management
- **Project Name**: Flashbacker (app) with `flashback` CLI binary

## 🤝 Community

### Communication
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and community interaction
- **Pull Requests**: Code contributions and improvements

### Code of Conduct
This project adheres to a Code of Conduct. By participating, you agree to uphold a respectful, inclusive environment for all contributors.

## 📄 License

By contributing to Flashbacker, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Flashbacker!** 🚀

Your contributions help make Claude Code session continuity better for everyone.
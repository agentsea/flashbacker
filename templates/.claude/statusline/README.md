# Claude Context Status Line

This script prints a single-line status showing the Claude model, project, branch, and real token usage from a transcript.

Example output:

```
[Claude Sonnet 4] 📁 my-project | 🌿 main | 🧠 25.6K/1M (2.6%)
```

## Usage

- Input: JSON via stdin with fields `{ model, transcriptPath, cwd }`
- Output: One status line to stdout

Example:

```bash
node .claude/statusline/claude_context_monitor.js <<'JSON'
{ "model": "claude-4.1", "transcriptPath": ".claude/statusline/examples/sample-transcript-1m.json", "cwd": "." }
JSON
```

## Model detection

- Sonnet 4 / Claude 4 variants → 1,000,000 token context
- All other Claude models → 200,000 token context

## Color thresholds

- Green: < 40%
- Yellow: 40–75%
- Red: > 75%

## Examples

See `examples/` for two sample transcripts you can test with.

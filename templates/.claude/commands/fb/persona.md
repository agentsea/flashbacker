---
allowed-tools: "*"
---

# 🎭 AI Persona System

Apply specialized AI persona templates directly in the current conversation for focused analysis and expertise.

## Usage
`/fb:persona <persona-name> <your request>`

## Available Personas
Use `flashback persona --list` to see current available personas and descriptions

**Important**: If the persona requested by the user does not exist, return "❌ Persona '{persona_name}' does not exist" and then run `flashback persona --list` to show available personas. Do NOT proceed with the analysis if the requested persona is missing.

ELSE (if the requested persona exists), proceed with the rest of this command.

## Examples
- `/fb:persona architect review our API design`
- `/fb:persona security analyze authentication flow`
- `/fb:persona refactorer identify technical debt`

---

## Persona Request Processing

Parse the `$ARGUMENTS` to extract:
1. **First argument**: Persona name (required)
2. **Remaining arguments**: User's request/question (required)

If no persona name provided, show the usage and available personas above.

If persona name provided:
1. **Read Persona Template**: Use Read tool to load `.claude/flashback/personas/{persona-name}.md`
2. **Apply Persona**: Follow the persona template's guidelines and principles
3. **Process User Request**: Address the user's specific request using the persona's expertise
4. **Provide Analysis**: Give focused analysis based on the persona's specialization

## Response Format
When applying a persona:

```
# 🎭 {Persona Name} Analysis

{Apply the persona template's principles and approach to analyze the user's request}

## Recommendations
{Provide specific recommendations based on the persona's expertise}
```

## Error Handling
If persona file not found, return error message and run `flashback persona --list` to show available personas dynamically.
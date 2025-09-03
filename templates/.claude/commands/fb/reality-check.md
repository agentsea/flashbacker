# Reality Check

Ensure what you implement Always Works™ with comprehensive testing and validation following systematic development methodology.

## Core Philosophy

**"Should work" ≠ "does work"** - Pattern matching isn't enough. Untested code is just a guess, not a solution.

### The 30-Second Reality Check - Must answer YES to ALL:

- Did I run/build the code?
- Did I trigger the exact feature I changed?
- Did I see the expected result with my own observation (including GUI)?
- Did I check for error messages?
- Would I bet $100 this works?

### Phrases to Avoid:
- "This should work now"
- "I've fixed the issue" (especially 2nd+ time)
- "Try it now" (without trying it myself)
- "The logic is correct so..."
- "It's production ready now"

---

## Command Implementation

Parse the command arguments:
- **Argument 1** (optional): Implementation scope (feature, bugfix, refactor, config)
- **Argument 2** (optional): Validation level (basic, comprehensive, production)

### Argument Parsing Logic
1. **Default Behavior**: Comprehensive reality check with all validation steps
2. **Scope Filter**: Focus validation on specific implementation area
3. **Validation Level**: Adjust thoroughness based on criticality

## How It Works

### Step 1: Pre-Implementation Reality Check
1. **Understand the Problem**: What exactly needs to work?
2. **Define Success Criteria**: What does "working" look like?
3. **Identify Test Scenarios**: How will I prove it works?
4. **Plan Validation Steps**: Specific actions to verify success

### Step 2: Implementation with Built-in Validation
1. **Write Minimal Viable Code**: Smallest change that could work
2. **Test Immediately**: Don't accumulate untested changes
3. **Observe Actual Behavior**: See it work with your own eyes
4. **Check Error States**: Verify error handling and edge cases

### Step 3: The Embarrassment Test
**"If the user records trying this and it fails, will I feel embarrassed to see his face?"**

If yes → More testing needed
If no → Ready to deliver

## Specific Test Requirements

### UI Changes: Actually click the button/link/form
- Navigate to the actual interface
- Perform the user action yourself
- Observe the visual result
- Check browser console for errors

### API Changes: Make the actual API call  
- Use curl, Postman, or direct HTTP calls
- Verify request/response format
- Test both success and error cases
- Check logs and monitoring

### Data Changes: Query the database
- Run SELECT statements to verify data
- Check foreign key relationships
- Validate data formats and constraints
- Test with actual production-like data

### Logic Changes: Run the specific scenario
- Execute the exact code path modified  
- Test with realistic input data
- Verify outputs match expectations
- Check side effects and state changes

### Config Changes: Restart and verify it loads
- Actually restart the service/application
- Verify configuration is loaded correctly
- Test that dependent services still work
- Check for configuration validation errors

## Time Reality

**Time saved skipping tests: 30 seconds**
**Time wasted when it doesn't work: 30 minutes**  
**User trust lost: Immeasurable**

A user describing a bug for the third time isn't thinking "this AI is trying hard" - they're thinking "why am I wasting time with this incompetent tool?"

## Implementation Methodology

### For Each Change Made:
1. **Build/Compile**: Ensure code compiles without errors
2. **Deploy/Install**: Actually deploy the change to test environment
3. **Execute**: Perform the specific action that should now work
4. **Observe**: See the result with your own senses
5. **Validate**: Confirm it matches expected behavior exactly
6. **Edge Cases**: Test boundary conditions and error scenarios

### Quality Gates:
- **Compilation**: Code must build without errors or warnings
- **Functionality**: Core feature must work as intended
- **Error Handling**: Graceful degradation when things go wrong
- **User Experience**: Interface behaves intuitively
- **Performance**: Acceptable response times under load

## Anti-Patterns to Avoid

### 🚫 Never Say These Without Testing:
- "This should fix it"
- "The code looks correct"
- "It's just a simple change"
- "I don't see any issues"
- "Try it and let me know"

### ✅ Say This Instead:
- "I've tested this change and verified it works"
- "I can confirm the issue is resolved"
- "I've validated this across multiple scenarios"
- "The fix has been tested and is working correctly"

## Usage Examples

### Basic Reality Check
```bash
/fb:reality-check
```
Runs comprehensive validation on recent changes with all test requirements.

### Feature-Specific Validation  
```bash
/fb:reality-check feature
```
Focuses on user-facing feature validation with UI/UX testing.

### Production-Ready Validation
```bash
/fb:reality-check bugfix production
```
Comprehensive testing for critical bugfixes including edge cases and error handling.

## Integration with Development Workflow

### Before Committing Code:
- Run reality check on all changes
- Verify each modified component works independently
- Test integration points and dependencies
- Validate error handling and recovery

### Before Deployment:
- Execute production-level reality check
- Test with production-like data and load
- Verify monitoring and logging work correctly
- Confirm rollback procedures if needed

### After User Reports Issues:
- Acknowledge testing gaps honestly
- Implement more comprehensive validation
- Add specific test cases for reported scenarios
- Update reality check procedures to prevent recurrence

---

**Core Message**: Every implementation must pass the reality check. If you haven't seen it work with your own eyes, it's not ready for users.

**Usage**: `/fb:reality-check [scope] [level]`  
**Philosophy**: Always Works™ - No guessing, no assumptions, no "should work" - only verified, tested, working solutions.
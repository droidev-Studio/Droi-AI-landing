# Droi AI P0 Closed Loop Test Report

Date: 2026-05-22
Workspace: `C:\Users\admin\.codex\worktrees\8797\Droi-AI-landing-temp`
Test URL: `http://127.0.0.1:4181`

## Summary

Result: PASS after the final fixes in `script.js?v=3.2`.

Validated areas:

- Static script syntax.
- Page load and cache version.
- One natural-language prompt to automatic generation.
- Guided automatic generation flow.
- Unsupported idea to manual email fallback.
- Regression guard for invalid `Progression System` free-text answers.

## Environment

- Browser target: Codex in-app browser.
- Local server: static HTTP server on `127.0.0.1:4181`.
- Loaded assets:
  - `script.js?v=3.2`
  - `style.css?v=1.9`
- Console errors: none from the app during the final passing cases.

## Test 1: Static Syntax

Command:

```powershell
node --check .\script.js
```

Result: PASS.

## Test 2: Page Load

Steps:

1. Open `http://127.0.0.1:4181`.
2. Confirm landing input is visible.
3. Confirm page loads `script.js?v=3.2`.
4. Check browser console errors.

Result: PASS.

Observed:

- Page title: `MINI-AI | AI Mini-Game Platform`
- Landing prompt input visible.
- `Create` button visible.
- No app console errors.

## Test 3: Direct Natural-Language Auto Generation

Input typed into the landing prompt:

```text
cyberpunk bullet hell shooter with boss phases dodge projectiles survive and defeat the boss
```

Steps:

1. Type the prompt into the landing input using real keyboard events.
2. Click landing `Create`.
3. Confirm chat summary.
4. Click chat `Create`.
5. Wait for generation output.

Expected:

- `P0 Template: Bullet Hell`
- `Decision: Auto generation ready`
- `P0 GameSpec ready`
- Canvas preview visible.
- Generated spec includes `runtimeProfile`, `styleLock`, `qualityGates`.

Actual:

- `P0 Template: Bullet Hell (98%)`
- `Decision: Auto generation ready`
- `P0 GameSpec ready` appeared.
- Canvas preview appeared.
- Generated spec included `runtimeProfile`, `styleLock`, `qualityGates`.

Result: PASS.

## Test 4: Guided Auto Generation Flow

Selections:

1. `Inspire Me`
2. `Inspire Me`
3. `Roguelike`
4. `Cyberpunk`
5. `Cyberpunk City`
6. `Auto-attack survival`
7. `Defeat final boss`
8. `Elite enemies`
9. `Level-up choices`
10. `Normal`
11. `Create`

Expected:

- Auto-generation path.
- Playable preview.
- Common GameSpec fields visible.

Actual:

- `P0 Template: Roguelike Survival (98%)`
- `Decision: Auto generation ready`
- After waiting for generation: `P0 GameSpec ready`, canvas, `runtimeProfile`, `styleLock`, `qualityGates`.

Result: PASS.

Note: some option groups are paginated, so the tester sometimes must click `More options` before a target option appears.

## Test 5: Guided Manual Fallback Flow

Selections:

1. `Inspire Me`
2. `Inspire Me`
3. `Puzzle`
4. `Minimalist`
5. `Underwater World`
6. `Puzzle exploration`
7. `Reach destination`
8. `Environmental hazards`
9. `Crafting upgrades`
10. `Easy`
11. `Create`

Expected:

- No crash.
- Manual fallback.
- Email collection modal appears.

Actual:

- `P0 Template: Roguelike Survival (45%)`
- `Decision: Manual queue fallback`
- After generation progress completed, email collection modal appeared with:
  - `Apologies for the delay`
  - `Please provide your personal email...`

Result: PASS.

## Test 6: Invalid Progression Answer Regression

Purpose: verify the bug reported by the user does not recur.

Setup selections:

1. `Inspire Me`
2. `Inspire Me`
3. `Roguelike`
4. `Cyberpunk`
5. `Cyberpunk City`
6. `Auto-attack survival`
7. `Defeat final boss`
8. `Elite enemies`

At the question:

```text
How should the player progress or grow stronger?
```

Typed input:

```text
progression system
```

Expected:

- Do not advance to Difficulty.
- Do not finalize.
- Show an invalid-answer message.
- Keep the user on the Progression System step.

Actual:

- Did not advance to `What difficulty level should we tune for?`
- Did not show final summary.
- Displayed:
  - `That is the module name. Please choose a concrete progression system option.`
  - `Try: Level-up choices, Skill tree, Equipment drops`
- Kept progression options visible.

Result: PASS.

## Fixes Made During This Test Pass

Two issues were found and fixed during self-test:

1. Old guided wizard free-text input was not using the same validation path as the analysis flow.
   - Fix: added `isWizardStepActive()` and routed wizard free text through `handleFreeTextForStep()`.

2. `matchChoice()` was matching broad text like `progression system` against option descriptions before invalid-answer checks.
   - Fix: run reserved invalid-answer checks before choice matching.

Final script cache version after these fixes: `script.js?v=3.3`.

Additional recognition details are recorded in `AI_RECOGNITION_REPORT.md`.

## Remaining Notes

- Browser automation `fill/type` methods failed because the in-app browser virtual clipboard was unavailable. Real keyboard events worked and were used for the final direct natural-language prompt test.
- The local product still has known P0 limitations listed in `BASE_RULES.md`, especially backend persistence, full template export, and real asset manifest validation.

# Interactive AI Game Spec Workflow

This document is the project-local, implementation-ready version of `AI交互式生成系统设计.md`.

## Feasibility Verdict

The design is feasible, but it should be implemented in phases.

Current implementation already supports:

- AI-assisted prompt analysis through the platform backend.
- A public model selector backed by the platform model allowlist.
- Usage tracking for successful AI calls.
- An 8-module clarification flow: `Game Type`, `Art Style`, `Game Setting`, `Core Gameplay`, `Player Goal`, `Main Challenge`, `Progression System`, `Difficulty Level`.
- Fixed internal M9 output-package intent.
- AI-generated game-plan summary after the required modules are present.

Current implementation does not yet support:

- Schema-level confidence/status validation.
- Schema validation for final `GameSpec`.
- Real project-file generation or export package creation.

Because of that, the next step should not be “one-shot game generation”. The web AI role should be defined as a game requirements analyst first.

## Product Role

The web AI workflow is a game requirements analysis assistant.

It should:

- Understand the user's natural-language game idea.
- Extract known game design modules.
- Detect missing or ambiguous modules.
- Ask targeted follow-up questions only for missing modules.
- Suggest concrete choices when the user needs guidance.
- Produce a structured `GameSpec` preview when the required modules are complete.

It should not:

- Modify the chat UI design while adding AI logic.
- Expose model/provider badges inside assistant messages.
- Pretend that the progress animation is real game generation.
- Claim export-package generation until a real export pipeline exists.

## UI Preservation Rule

AI logic changes must not alter chat visual structure unless explicitly requested as a UI redesign.

- No provider badges, model chips, debug labels, or telemetry inside chat messages.
- No unrequested changes to spacing, bubble layout, option button layout, typography, colors, or animation timing.
- Model/provider information belongs in the model selector, admin panel, logs, or usage views.
- Any chat-message markup change is a separate UI task and must be reviewed against the existing design.

## Optimized Module Scope

Use 8 user-facing modules plus 1 fixed internal output rule.

| ID | Module | Purpose | User Asked? |
| --- | --- | --- | --- |
| M1 | Game Type | What kind of game this is | Yes, if missing |
| M2 | Art Style | Visual direction | Yes, if missing |
| M3 | Game Setting | World, role, premise | Yes, if missing |
| M4 | Core Gameplay | What the player mainly does | Yes, if missing |
| M5 | Player Goal | Win/clear/survival condition | Yes, if missing |
| M6 | Progression System | How the player grows stronger | Yes, if missing |
| M7 | Main Challenge | What blocks or pressures the player | Yes, if missing |
| M8 | Difficulty Level | Easy/normal/hard/nightmare | Ask only if needed; default to normal |
| M9 | Output Package | Export strategy | No, fixed internal rule |

## Clarification Priority

Ask in dependency order:

1. Foundation: M1, M2, M3.
2. Core play: M4, M5, M7.
3. System tuning: M6, M8.
4. Fixed output: M9 is not asked.

The assistant must not ask again for modules already confirmed by the user.

## Module Status Model

Each module should have a state:

```json
{
  "id": "coreGameplay",
  "status": "missing | suggested | confirmed | auto_filled | fixed",
  "value": null,
  "confidence": 0,
  "userEdited": false
}
```

Status rules:

- `confirmed`: explicitly provided or selected by the user.
- `suggested`: AI inferred a likely value but should let the user adjust it.
- `auto_filled`: AI filled a conventional default from game type.
- `missing`: not enough information.
- `fixed`: internal rule, not user-facing. M9 uses this.

## AI Extraction Contract

Prompt analysis should return strict JSON:

```json
{
  "modules": {
    "gameType": { "status": "confirmed", "value": "Roguelike survival", "confidence": 0.9 },
    "artStyle": { "status": "missing", "value": null, "confidence": 0 },
    "gameSetting": { "status": "confirmed", "value": "Tang dynasty battlefield", "confidence": 0.8 },
    "coreGameplay": { "status": "suggested", "value": "Move, fight waves, survive wars", "confidence": 0.7 },
    "playerGoal": { "status": "suggested", "value": "Win five wars and become Grand General", "confidence": 0.8 },
    "progressionSystem": { "status": "missing", "value": null, "confidence": 0 },
    "mainChallenge": { "status": "suggested", "value": "Escalating enemy armies and rival generals", "confidence": 0.7 },
    "difficultyLevel": { "status": "auto_filled", "value": "normal", "confidence": 0.6 },
    "outputPackage": { "status": "fixed", "value": "Complete project folder and in-page preview", "confidence": 1 }
  },
  "nextQuestionModule": "artStyle",
  "nextQuestion": "What art style should this Tang dynasty roguelike use?"
}
```

## Smart Defaults

Use game type to reduce unnecessary questions.

Examples:

- Roguelike survival:
  - Core Gameplay: move, fight waves, collect upgrades.
  - Player Goal: survive a target time or defeat a final boss.
  - Progression: XP, level-up choices, unlockable weapons.
  - Main Challenge: enemy volume, elites, boss waves.
  - Difficulty: normal.

- Tower defense:
  - Core Gameplay: place defenses, manage lanes.
  - Player Goal: survive all waves.
  - Progression: upgrade towers, economy, unlock tower types.
  - Main Challenge: enemy types, path pressure, bosses.
  - Difficulty: normal.

AI may suggest defaults, but user edits override defaults.

## Final GameSpec Preview

When required modules are complete, show a structured preview:

```json
{
  "title": "string",
  "gameType": "string",
  "artStyle": "string",
  "gameSetting": "string",
  "coreGameplay": "string",
  "playerGoal": "string",
  "progressionSystem": "string",
  "mainChallenge": "string",
  "difficultyLevel": "easy | normal | hard | nightmare",
  "outputPackage": {
    "mode": "fixed",
    "preview": true,
    "exportProjectFolder": true
  }
}
```

## Implementation Plan

Phase 1: Expand analysis without changing UI.

- Replace the current 3-field extraction with module-state JSON. Implemented in the current web flow.
- Keep the existing chat layout intact.
- Keep asking one missing module at a time.
- Continue routing AI calls through `/api/chat` with the currently selected platform model.
- Continue recording usage through `recordUsage()`.

Phase 2: Add module state and smart defaults.

- Introduce a `gameSpecModules` state object.
- Add default mappings for common game types.
- Allow user answers to update specific module state.
- Generate progress summaries from state, not hardcoded strings.

Phase 3: Add validation.

- Define a `GameSpec` schema.
- Clamp numeric values to safe ranges.
- Reject mechanisms outside the whitelist.
- Use AI repair only after validation errors.

Phase 4: Real generation/export.

- Only after `GameSpec` is valid, start actual game generation.
- Replace the current progress-only animation with real generation steps.
- M9 remains fixed: in-page preview plus complete project folder export.

## Current Project Gap

At the time this document was added, all connected platform models share the same product responsibility. Whichever model is selected in the model selector is used for:

- Prompt analysis.
- Game-plan summary.
- Usage tracking from successful AI calls.

Connected platform models are not yet used for:

- Complete game code generation.
- Project folder export.
- Schema-validated `GameSpec` production.

Those should be implemented as later phases, not implied by the current progress animation.

## Testing Notes

Use different prompts for different paths:

- Complete-path prompt: include all 8 modules. The assistant should skip missing-module questions and move directly to GameSpec building.
- Clarification-path prompt: intentionally omit several modules. The assistant should ask for the first missing module in priority order.

Example complete-path prompt:

`I want a cyberpunk roguelike survival game. The player auto-attacks while moving, survives 15 minutes, defeats a final boss, gains XP to choose weapon upgrades, faces enemy swarms, elites and boss phases, normal difficulty.`

Expected result: direct GameSpec flow, because all 8 user-facing modules are present.

Example clarification-path prompt:

`I want to make a small game.`

Expected result: ask for `Game Type` first.

# Droi AI Current User Flow Report

Date: 2026-05-22
Current validated script: `script.js?v=3.3`

## 1. Direct Prompt Flow

User path:

1. User opens landing page.
2. User types one natural-language prompt.
3. User clicks landing `Create`.
4. App opens chat and analyzes the prompt.
5. App fills the module summary.
6. App shows either:
   - `Decision: Auto generation ready`
   - `Decision: Manual queue fallback`
7. User clicks chat `Create`.
8. Auto path shows playable preview and Common GameSpec.
9. Fallback path shows email collection modal.

Validated direct prompt:

```text
cyberpunk bullet hell shooter with boss phases dodge projectiles survive and defeat the boss
```

Observed result:

- `P0 Template: Bullet Hell (98%)`
- `Decision: Auto generation ready`
- `P0 GameSpec ready`
- Canvas preview visible.
- GameSpec includes `runtimeProfile`, `styleLock`, `qualityGates`.

## 2. Guided Wizard Flow

User path:

1. User clicks `Inspire Me`.
2. User clicks chat `Inspire Me`.
3. User answers module questions in order:
   - Game Type
   - Art Style
   - Game Setting
   - Core Gameplay
   - Player Goal
   - Main Challenge
   - Progression System
   - Difficulty Level
4. App shows final summary.
5. User clicks chat `Create`.
6. App follows auto or fallback decision.

Validated auto selections:

```text
Roguelike
Cyberpunk
Cyberpunk City
Auto-attack survival
Defeat final boss
Elite enemies
Level-up choices
Normal
```

Observed result:

- `P0 Template: Roguelike Survival (98%)`
- `Decision: Auto generation ready`
- Generated playable preview and Common GameSpec.

## 3. Manual Fallback Flow

Validated fallback selections:

```text
Puzzle
Minimalist
Underwater World
Puzzle exploration
Reach destination
Environmental hazards
Crafting upgrades
Easy
```

Observed result:

- `P0 Template: Roguelike Survival (45%)`
- `Decision: Manual queue fallback`
- Email collection modal appeared after progress animation.

## 4. Invalid Answer Flow

Bug scenario:

At `Progression System`, user types:

```text
progression system
```

Correct behavior now:

- App does not advance to Difficulty.
- App does not finalize the game plan.
- App shows:

```text
That is the module name. Please choose a concrete progression system option.
Try: Level-up choices, Skill tree, Equipment drops
```

The same guard also rejects system-status text such as:

```text
Auto generation ready
Manual queue fallback
P0 GameSpec ready
```

## 5. Notes for Manual QA

- Some option groups are paginated. If an option is not visible, click `More options`.
- Generation output can take around 10-15 seconds after clicking final `Create`.
- For fallback, the email modal appears after the progress animation completes.

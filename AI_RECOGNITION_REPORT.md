# AI Recognition and Summary Copy Report

Date: 2026-05-22  
Validated script after latest fixes: `script.js?v=3.4`

This report records the AI/module recognition structure and the visible summary copy after each QA flow.

## Test 1: Direct Natural-Language Prompt

User input:

```text
cyberpunk bullet hell shooter with boss phases dodge projectiles survive and defeat the boss
```

Recognized structure:

```text
Game Type: Bullet Hell
Art Style: Cyberpunk
Game Setting: Cyberpunk City
Background/Story: cyberpunk bullet hell shooter with boss phases dodge projectiles survive and defeat the boss
Core Gameplay: Manual action combat
Player Goal: Survive timer and defeat final boss
Main Challenge: Enemy swarms, elites, and boss phases
Progression System: Level-up choices
Difficulty Level: Normal
P0 Template: Bullet Hell (98%)
Decision: Auto generation ready
```

Detailed concept copy:

```text
Detailed game concept
Neon Prism Storm

Hook: A precision dodging shooter where the player cuts through corporate signal swarms and dismantles a boss core phase by phase.

Story Premise: The city is controlled by hostile broadcast towers. The pilot enters the aerial grid to break the transmission chain before it locks the district down.

Core Loop: Read bullet patterns, slip through narrow lanes, fire focused shots, collect power drops, and spend bomb energy when the screen becomes unsafe.

Moment-to-Moment: The player alternates between fast movement for repositioning and focus movement for micro-dodging. Each wave teaches a pattern that returns harder in the boss fight.

Visual Direction: Use Cyberpunk as the rendering style, with dark streets, high-contrast projectile colors, clean silhouettes, and readable warning effects instead of repeated neon decoration.

Enemy / Challenge Design: Drones use aimed shots, weavers create fan lanes, lotus enemies build ring pressure, and the boss rotates through spiral, flower, and burst phases.

Progression Plan: Level-up choices increase shot count, spread control, bomb recharge, graze score, or shield capacity without hiding the player hitbox.

Player Fantasy: The player should feel like a calm ace pilot surviving impossible traffic through skill, timing, and disciplined resource use.

P0 Prototype Scope: P0 scope: one playable stage in Cyberpunk City, one enemy wave table, one multi-phase boss, keyboard movement, shooting, pause, win and fail states tuned for Normal.
```

Visible recognized-module copy:

```text
Recognized GameSpec modules
Game Type: Bullet Hell
Art Style: Cyberpunk
Game Setting: Cyberpunk City
Background/Story: The city is controlled by hostile broadcast towers. The pilot enters the aerial grid to break the transmission chain before it locks the district down.
Core Gameplay: Manual action combat
Player Goal: Survive timer and defeat final boss
Main Challenge: Enemy swarms, elites, and boss phases
Progression System: Level-up choices
Difficulty Level: Normal
P0 Template: Bullet Hell (98%)
Decision: Auto generation ready

I've collected all the basic information. Ready to generate the game! Shall we start?
```

Generated result copy:

```text
Auto generation path
P0 GameSpec ready
Bullet Hell
98% match
```

Important note:

- During the previous QA pass, this prompt was recognized as `P0 Template: Bullet Hell`, but the module field `Game Type` still showed `Roguelike`. That was a bug in the P0 default-fill logic. It is now fixed by adding `Bullet Hell` to `GAME_TYPES` and preferring the matched template label before any fallback.
- The latest summary no longer uses the raw prompt as the only story text. It expands the concept into premise, loop, encounter design, progression, fantasy, and P0 scope.

## Test 2: Guided Auto Generation

User selections:

```text
Game Type: Roguelike
Art Style: Cyberpunk
Game Setting: Cyberpunk City
Core Gameplay: Auto-attack survival
Player Goal: Defeat final boss
Main Challenge: Elite enemies
Progression System: Level-up choices
Difficulty Level: Normal
```

Recognized structure:

```text
Game Type: Roguelike
Art Style: Cyberpunk
Game Setting: Cyberpunk City
Background/Story: Navigate neon-lit streets controlled by corporations and high-tech rebels.
Core Gameplay: Auto-attack survival
Player Goal: Defeat final boss
Main Challenge: Elite enemies
Progression System: Level-up choices
Difficulty Level: Normal
P0 Template: Roguelike Survival (98%)
Decision: Auto generation ready
```

Visible summary copy:

```text
I've finalized your game plan:
Game Type: Roguelike
Art Style: Cyberpunk
Game Setting: Cyberpunk City
Background/Story: Navigate neon-lit streets controlled by corporations and high-tech rebels.
Core Gameplay: Auto-attack survival
Player Goal: Defeat final boss
Main Challenge: Elite enemies
Progression System: Level-up choices
Difficulty Level: Normal
P0 Template: Roguelike Survival (98%)
Decision: Auto generation ready

I've collected all the basic information. Ready to generate the game! Shall we start?
```

Generated result copy:

```text
Auto generation path
P0 GameSpec ready
Roguelike Survival
98% match
```

Generated GameSpec markers verified:

```text
runtimeProfile
styleLock
qualityGates
```

## Test 3: Guided Manual Fallback

User selections:

```text
Game Type: Puzzle
Art Style: Minimalist
Game Setting: Underwater World
Core Gameplay: Puzzle exploration
Player Goal: Reach destination
Main Challenge: Environmental hazards
Progression System: Crafting upgrades
Difficulty Level: Easy
```

Recognized structure:

```text
Game Type: Puzzle
Art Style: Minimalist
Game Setting: Underwater World
Background/Story: Discover bioluminescent cities and deep-sea creatures in the ocean depths.
Core Gameplay: Puzzle exploration
Player Goal: Reach destination
Main Challenge: Environmental hazards
Progression System: Crafting upgrades
Difficulty Level: Easy
P0 Template: Roguelike Survival (45%)
Decision: Manual queue fallback
```

Visible summary copy:

```text
I've finalized your game plan:
Game Type: Puzzle
Art Style: Minimalist
Game Setting: Underwater World
Background/Story: Discover bioluminescent cities and deep-sea creatures in the ocean depths.
Core Gameplay: Puzzle exploration
Player Goal: Reach destination
Main Challenge: Environmental hazards
Progression System: Crafting upgrades
Difficulty Level: Easy
P0 Template: Roguelike Survival (45%)
Decision: Manual queue fallback

I've collected all the basic information. Ready to generate the game! Shall we start?
```

Fallback copy after clicking `Create`:

```text
This idea is outside the current automatic template coverage. Please leave an email and we will route it to the manual queue.

Apologies for the delay
Please provide your personal email, and we will send the generated game to your inbox~
Send
Skip for now
```

## Test 4: Invalid Progression System Free-Text

Setup selections before invalid input:

```text
Game Type: Roguelike
Art Style: Cyberpunk
Game Setting: Cyberpunk City
Core Gameplay: Auto-attack survival
Player Goal: Defeat final boss
Main Challenge: Elite enemies
```

Question shown:

```text
How should the player progress or grow stronger?
```

User typed:

```text
progression system
```

Recognized behavior:

```text
The input was rejected as a module name, not accepted as Progression System data.
The flow did not advance to Difficulty Level.
The final summary was not shown.
```

Visible correction copy:

```text
That is the module name. Please choose a concrete progression system option.
Try: Level-up choices, Skill tree, Equipment drops
```

Options remained visible:

```text
Crafting upgrades
Permanent unlocks
More options
```

Result: PASS.

## Current Manual QA Inputs

Use these to manually verify the same outcomes:

Auto direct prompt:

```text
cyberpunk bullet hell shooter with boss phases dodge projectiles survive and defeat the boss
```

Fallback prompt:

```text
make a 3d multiplayer open world mmo with voice chat and server authoritative networking
```

Invalid progression answer:

```text
progression system
```

## Main Directory Sync Note

The main directory now uses the synced closed-loop cache versions:

```text
style.css?v=2.6-closed-loop-chat
script.js?v=3.4-closed-loop-secure-embed
```

The synced implementation preserves the main-directory secure roll showcase iframe and voice transcription backend integration while adding the detailed GameSpec recognition and summary flow described above.

## Latest Self-Test Recognition Outcomes

Additional DOM self-test results after the sync:

- Homepage natural-language prompt recognized `Bullet Hell` and produced `Auto generation ready`.
- Detailed concept expansion included the generated title `Neon Prism Storm`.
- Generated preview exposed `runtimeProfile`, `styleLock`, and `qualityGates`.
- Unsupported prompt with `3d`, `multiplayer`, `blockchain`, `vr`, and `voice chat` entered `Manual queue fallback` and opened the email modal.
- Guided wizard answer `progression system` was rejected as a module name and did not advance to difficulty or final summary.
- Full natural-language prompt pasted directly into the chat wizard first step now enters the same automatic recognition path.

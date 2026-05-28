const assert = require('assert');
const fs = require('fs');
const path = require('path');
const {
  compileTemplateProject,
  saveManualQueueSubmission,
  detectTemplateId,
  buildCompiledGameSpec,
  listPublicModels
} = require('./server');

function makePatchPlan(overrides = {}) {
  return {
    aiGenerated: true,
    modelMeta: { providerId: 'openai', modelId: 'gpt-5.5-high', label: 'GPT 5.5 High' },
    gameName: 'AI Patched Skybreak',
    userIntentSummary: 'AI generated flying shooter plan with boss phases.',
    settingsPatch: { objectiveSeconds: 180, difficulty: 'normal' },
    stylePatch: { palette: ['#00e5ff', '#ff4fd8'] },
    contentPatch: {
      waves: [{ t: 0, enemy: 'patched_drone', count: 12 }],
      bosses: [{ id: 'patched_boss', hp: 1800, phases: ['spiral', 'burst'] }]
    },
    assetPrompts: { player: 'sleek neon ship', boss: 'giant prism core' },
    playabilityChecklist: ['move', 'shoot', 'dodge', 'boss', 'win'],
    requiresRuntimeCodePatch: false,
    ...overrides
  };
}

function testTemplateDetection() {
  assert.strictEqual(
    detectTemplateId({}, { gameType: 'space shooter', background: 'vertical shmup with boss bullets' }),
    'bullet_hell'
  );
  assert.strictEqual(
    detectTemplateId({}, { gameType: '飞机大战', background: '躲子弹 打 boss' }),
    'bullet_hell'
  );
  assert.strictEqual(
    detectTemplateId({}, { gameType: 'Vampire Survivors style', background: 'auto weapons and upgrades' }),
    'roguelike_survival'
  );
  assert.strictEqual(
    detectTemplateId({}, { gameType: '割草生存', background: '升级三选一 自动武器' }),
    'roguelike_survival'
  );
}

function testCompiledSpec() {
  const bulletSpec = buildCompiledGameSpec(
    {
      gameType: 'Bullet Hell / Flying Shooter',
      artStyle: 'Cyberpunk',
      gameSetting: 'Neon city',
      coreGameplay: 'Dodge bullets and shoot',
      playerGoal: 'Defeat final boss',
      progressionSystem: 'Weapon upgrades',
      difficultyLevel: 'Normal'
    },
    { templateId: 'bullet_hell' },
    'bullet_hell',
    { label: 'GPT 5.5 High' }
  );
  assert.strictEqual(bulletSpec.meta.templateId, 'bullet_hell');
  assert.ok(bulletSpec.content.bosses.length >= 1);
  assert.ok(bulletSpec.runtime.controls.includes('bomb'));

  const rogueSpec = buildCompiledGameSpec(
    {
      gameType: 'Roguelike Survival',
      artStyle: 'Dark Gothic',
      gameSetting: 'Cursed cathedral',
      coreGameplay: 'Auto attack survival',
      progressionSystem: 'Level-up choices'
    },
    { templateId: 'roguelike_survival' },
    'roguelike_survival',
    { label: 'Gemini 3.5 Flash' }
  );
  assert.strictEqual(rogueSpec.meta.templateId, 'roguelike_survival');
  assert.ok(rogueSpec.content.upgrades.includes('projectile_count'));
  assert.ok(rogueSpec.runtime.controls.includes('upgrade-choice'));
}

function testCompilerOutput() {
  const project = compileTemplateProject({
    gameSpec: {
      gameType: 'space shooter',
      artStyle: 'Pixel retro',
      gameSetting: 'Orbit station',
      background: 'A flying shooter with boss phases.'
    },
    templateDecision: { templateId: 'bullet_hell', templateLabel: 'Bullet Hell / Flying Shooter' },
    selectedModel: { label: 'GPT 5.5 High' },
    aiPlanDraft: 'AI generated plan',
    templatePatchPlan: makePatchPlan()
  });
  assert.strictEqual(project.templateId, 'bullet_hell');
  assert.ok(project.previewUrl.includes('/generated/'));
  assert.ok(project.files.includes('spec/game.json'));
  assert.ok(!project.files.includes('README.md'));
  assert.strictEqual(project.validationReport.ok, true);
  const generatedSpecPath = path.join(__dirname, 'data', 'generated', project.id, 'spec', 'game.json');
  const generatedSpec = JSON.parse(fs.readFileSync(generatedSpecPath, 'utf8'));
  const generatedGameJs = fs.readFileSync(path.join(__dirname, 'data', 'generated', project.id, 'game.js'), 'utf8');
  assert.strictEqual(generatedSpec.meta.gameName, 'AI Patched Skybreak');
  assert.strictEqual(generatedSpec.content.bosses[0].id, 'patched_boss');
  assert.deepStrictEqual(generatedSpec.artDirection.palette, ['#00e5ff', '#ff4fd8']);
  assert.ok(generatedGameJs.includes('const isBullet'));
  assert.ok(generatedGameJs.includes('function shootAt'));
  assert.ok(generatedGameJs.includes('enemyShots'));
  assert.ok(generatedGameJs.includes('pickups'));
  assert.ok(generatedGameJs.includes('Prototype Cleared'));

  assert.throws(
    () => compileTemplateProject({
      gameSpec: { gameType: 'space shooter' },
      templateDecision: { templateId: 'bullet_hell' },
      selectedModel: { label: 'GPT 5.5 High' }
    }),
    /AI-generated game plan/
  );

  assert.throws(
    () => compileTemplateProject({
      gameSpec: { gameType: 'space shooter' },
      templateDecision: { templateId: 'bullet_hell' },
      selectedModel: { label: 'GPT 5.5 High' },
      aiPlanDraft: 'AI generated plan'
    }),
    /TemplatePatchPlan/
  );

  assert.throws(
    () => compileTemplateProject({
      gameSpec: { gameType: 'space shooter' },
      templateDecision: { templateId: 'bullet_hell' },
      selectedModel: { label: 'GPT 5.5 High' },
      aiPlanDraft: 'AI generated plan',
      templatePatchPlan: makePatchPlan({ aiGenerated: false })
    }),
    /selected AI model/
  );
}

function testPublicModels() {
  const models = listPublicModels();
  assert.ok(models.some(model => model.provider === 'openai' && model.model === 'gpt-5.5-high'));
  assert.ok(models.some(model => model.provider === 'gemini' && model.model === 'gemini-3.5-flash'));
  assert.ok(models.every(model => !Object.prototype.hasOwnProperty.call(model, 'apiKey')));
}

function testManualQueue() {
  const submission = saveManualQueueSubmission({
    email: 'player@example.com',
    prompt: 'manual queue prompt',
    context: {
      currentModel: { label: 'GPT 5.5 High' },
      gameSpec: { gameType: 'space shooter' },
      lastError: { code: 'MODEL_TIMEOUT' }
    }
  });
  assert.ok(submission.id.startsWith('manual-'));
  const recordPath = path.join(__dirname, 'data', 'manual-queue', `${submission.id}.json`);
  const record = JSON.parse(fs.readFileSync(recordPath, 'utf8'));
  assert.strictEqual(record.email, 'player@example.com');
  assert.strictEqual(record.context.lastError.code, 'MODEL_TIMEOUT');

  assert.throws(
    () => saveManualQueueSubmission({ email: 'bad-email', prompt: 'x', context: {} }),
    /valid email/
  );
}

function testNoClientSecrets() {
  const clientScript = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');
  const envExample = fs.readFileSync(path.join(__dirname, '..', '.env.example'), 'utf8');
  assert.ok(!clientScript.includes('access_key'));
  assert.ok(!clientScript.includes('web3forms.com'));
  assert.ok(!clientScript.includes('ad7acb48'));
  assert.match(clientScript, /code:\s*'MODEL_TIMEOUT'[\s\S]*actions:\s*\['retry_current_model'\]/);
  assert.ok(!clientScript.includes('check_config'));
  assert.ok(!clientScript.includes('manual_queue'));
  assert.ok(envExample.includes('WEB3FORMS_ACCESS_KEY='));
}

testTemplateDetection();
testCompiledSpec();
testCompilerOutput();
testPublicModels();
testManualQueue();
testNoClientSecrets();

console.log('backend tests passed');

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const {
  createServer,
  compileTemplateProject,
  saveManualQueueSubmission,
  detectTemplateId,
  buildCompiledGameSpec,
  getRuntimeStatus,
  getFrontendOrigins,
  isAllowedCorsOrigin,
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
  assert.ok(project.files.includes('template-config.js'));
  assert.ok(project.files.includes('spec/minimal.json'));
  assert.ok(project.files.includes('spec/waves.json'));
  assert.ok(project.files.includes('spec/enemies.json'));
  assert.ok(project.files.includes('spec/weapons.json'));
  assert.ok(project.files.includes('spec/balance.json'));
  assert.ok(project.files.includes('spec/effects.json'));
  assert.ok(!project.files.includes('README.md'));
  assert.strictEqual(project.validationReport.ok, true);
  const generatedSpecPath = path.join(__dirname, 'data', 'generated', project.id, 'spec', 'game.json');
  const generatedSpec = JSON.parse(fs.readFileSync(generatedSpecPath, 'utf8'));
  const wavesSpec = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'generated', project.id, 'spec', 'waves.json'), 'utf8'));
  const enemiesSpec = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'generated', project.id, 'spec', 'enemies.json'), 'utf8'));
  const balanceSpec = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'generated', project.id, 'spec', 'balance.json'), 'utf8'));
  const templateConfig = fs.readFileSync(path.join(__dirname, 'data', 'generated', project.id, 'template-config.js'), 'utf8');
  const generatedGameJs = fs.readFileSync(path.join(__dirname, 'data', 'generated', project.id, 'game.js'), 'utf8');
  assert.strictEqual(generatedSpec.meta.gameName, 'AI Patched Skybreak');
  assert.strictEqual(generatedSpec.content.bosses[0].id, 'patched_boss');
  assert.strictEqual(wavesSpec[0].enemy, 'patched_drone');
  assert.strictEqual(enemiesSpec[0].id, 'patched_drone');
  assert.strictEqual(balanceSpec.bosses[0].id, 'patched_boss');
  assert.deepStrictEqual(generatedSpec.artDirection.palette, ['#00e5ff', '#ff4fd8']);
  assert.ok(templateConfig.includes('window.DROI_TEMPLATE_CONFIG'));
  assert.ok(generatedGameJs.includes('const isBullet'));
  assert.ok(generatedGameJs.includes('const content = spec.content'));
  assert.ok(generatedGameJs.includes('const palette = Array.isArray'));
  assert.ok(generatedGameJs.includes('const upgradesConfig'));
  assert.ok(generatedGameJs.includes('function shootAt'));
  assert.ok(generatedGameJs.includes('enemyShots'));
  assert.ok(generatedGameJs.includes('pickups'));
  assert.ok(generatedGameJs.includes('Prototype Cleared'));

  const rogueProject = compileTemplateProject({
    gameSpec: {
      gameType: 'Vampire Survivors style',
      artStyle: 'Dark Gothic',
      gameSetting: 'Cursed cathedral',
      background: 'Auto-attack survival with level-up choices.'
    },
    templateDecision: { templateId: 'roguelike_survival', templateLabel: 'Roguelike Survival' },
    selectedModel: { label: 'Gemini 3.5 Flash' },
    aiPlanDraft: 'AI generated roguelike plan',
    templatePatchPlan: makePatchPlan({
      gameName: 'AI Patched Cathedral Run',
      contentPatch: {
        waves: [{ t: 0, enemy: 'ghoul', interval: 0.9 }],
        enemies: [{ id: 'ghoul', hp: 18 }, { id: 'abbot_boss', hp: 900, type: 'boss' }],
        weapons: [{ id: 'auto_orbit_blade', cadence: 0.6 }],
        upgrades: ['damage', 'cooldown', 'orbit_count'],
        balance: { survivalSeconds: 600, bossAtSeconds: 540 },
        effects: { hit: 'violet sparks' }
      }
    })
  });
  assert.strictEqual(rogueProject.templateId, 'roguelike_survival');
  assert.ok(rogueProject.files.includes('spec/weapons.json'));
  const rogueWeapons = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'generated', rogueProject.id, 'spec', 'weapons.json'), 'utf8'));
  const rogueEnemies = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'generated', rogueProject.id, 'spec', 'enemies.json'), 'utf8'));
  assert.strictEqual(rogueWeapons[0].id, 'auto_orbit_blade');
  assert.strictEqual(rogueEnemies[1].id, 'abbot_boss');

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

function testRuntimeStatus() {
  const status = getRuntimeStatus();
  const serialized = JSON.stringify(status);
  assert.strictEqual(status.service, 'droi-ai-backend');
  assert.ok(Array.isArray(status.templates));
  assert.ok(status.templates.includes('bullet_hell'));
  assert.ok(status.templates.includes('roguelike_survival'));
  assert.ok(Number.isInteger(status.modelCount));
  assert.ok(!serialized.includes('API_KEY'));
  assert.ok(!serialized.includes('sk-'));
}

function testCorsOriginRules() {
  const origins = getFrontendOrigins();
  assert.ok(origins.includes('https://droidev-studio.github.io'));
  assert.strictEqual(isAllowedCorsOrigin('https://droidev-studio.github.io'), true);
  assert.strictEqual(isAllowedCorsOrigin('http://127.0.0.1:4173'), true);
  assert.strictEqual(isAllowedCorsOrigin('http://localhost:5500'), true);
  assert.strictEqual(isAllowedCorsOrigin('https://example.com'), false);
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
  const phaseContract = fs.readFileSync(path.join(__dirname, '..', 'docs', 'phase-1-ai-platform-contract.md'), 'utf8');
  const deploymentDoc = fs.readFileSync(path.join(__dirname, '..', 'docs', 'backend-deployment.md'), 'utf8');
  const renderBlueprint = fs.readFileSync(path.join(__dirname, '..', 'render.yaml'), 'utf8');
  const ciWorkflow = fs.readFileSync(path.join(__dirname, '..', '.github', 'workflows', 'ci.yml'), 'utf8');
  const runtimeConfigExample = fs.readFileSync(path.join(__dirname, '..', 'droi-config.example.json'), 'utf8');
  assert.ok(!clientScript.includes('access_key'));
  assert.ok(!clientScript.includes('web3forms.com'));
  assert.ok(!clientScript.includes('ad7acb48'));
  assert.match(clientScript, /code:\s*'MODEL_TIMEOUT'[\s\S]*actions:\s*\['retry_current_model', 'switch_model'\]/);
  assert.ok(clientScript.includes('Switch faster model'));
  assert.ok(clientScript.includes('open_deployment_guide'));
  assert.ok(clientScript.includes('Deployment guide'));
  assert.ok(clientScript.includes('docs/backend-deployment.md'));
  assert.ok(clientScript.includes('droi-config.json'));
  assert.ok(clientScript.includes('apiBaseUrl'));
  assert.ok(clientScript.includes('Static frontend is missing droi-config.json'));
  assert.ok(clientScript.includes('Backend is unreachable. Check droi-config.json apiBaseUrl'));
  assert.ok(clientScript.includes('Backend is connected, but no provider API key is configured.'));
  assert.ok(clientScript.includes('getTemplateCapabilitySummary'));
  assert.ok(clientScript.includes('templateCapability'));
  assert.ok(clientScript.includes('expectedGeneratedFiles'));
  assert.ok(clientScript.includes('templateUsage'));
  assert.ok(clientScript.includes('patchTargets'));
  assert.ok(clientScript.indexOf('TEMPLATE_CATALOG = [') > clientScript.indexOf('let TEMPLATE_CATALOG'));
  assert.ok(clientScript.includes('\\u98de\\u884c\\u5c04\\u51fb'));
  assert.ok(clientScript.includes('\\u8089\\u9e3d'));
  assert.ok(clientScript.includes('\\u5854\\u9632'));
  assert.ok(clientScript.includes("'飞行射击', '飞机大战', '太空射击'"));
  assert.ok(clientScript.includes("'肉鸽', '肉鸽生存', '类吸血鬼幸存者'"));
  assert.ok(clientScript.includes("'塔防', '防御塔', '防守'"));
  assert.ok(clientScript.includes('spec/waves.json'));
  assert.ok(clientScript.includes('spec/enemies.json'));
  assert.ok(clientScript.includes('spec/weapons.json'));
  assert.ok(!clientScript.includes('check_config'));
  assert.ok(!clientScript.includes('manual_queue'));
  assert.ok(envExample.includes('WEB3FORMS_ACCESS_KEY='));
  assert.ok(!envExample.includes('GOOGLE_CLIENT_SECRET='));
  assert.ok(!envExample.includes('SESSION_SECRET='));
  assert.ok(runtimeConfigExample.includes('apiBaseUrl'));
  assert.ok(phaseContract.includes('must not generate local fallback copy'));
  assert.ok(phaseContract.includes('P0 model keys are configured as backend environment variables'));
  assert.ok(deploymentDoc.includes('/api/ready'));
  assert.ok(deploymentDoc.includes('droi-config.json'));
  assert.ok(deploymentDoc.includes('FRONTEND_ORIGIN=https://droidev-studio.github.io'));
  assert.ok(renderBlueprint.includes('healthCheckPath: /api/health'));
  assert.ok(renderBlueprint.includes('sync: false'));
  assert.ok(!renderBlueprint.includes('sk-'));
  assert.ok(ciWorkflow.includes('npm run check'));
  assert.ok(ciWorkflow.includes('npm run test:backend'));
}

async function testGeneratedStaticServing() {
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
  const server = createServer();
  await new Promise(resolve => server.listen(0, resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const previewResponse = await fetch(`${base}${project.previewUrl}`);
    assert.strictEqual(previewResponse.status, 200);
    const previewHtml = await previewResponse.text();
    assert.ok(previewHtml.includes('AI Patched Skybreak'));

    const wavesResponse = await fetch(`${base}${project.previewUrl.replace('/index.html', '/spec/waves.json')}`);
    assert.strictEqual(wavesResponse.status, 200);
    const waves = await wavesResponse.json();
    assert.strictEqual(waves[0].enemy, 'patched_drone');
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
}

async function run() {
  testTemplateDetection();
  testCompiledSpec();
  testCompilerOutput();
  testPublicModels();
  testRuntimeStatus();
  testCorsOriginRules();
  testManualQueue();
  testNoClientSecrets();
  await testGeneratedStaticServing();
  console.log('backend tests passed');
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});

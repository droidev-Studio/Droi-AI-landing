const imageModelName = document.body.dataset.assetModel || window.DROI_IMAGE_MODEL || 'gpt-image-2';

const SHOWCASE_CACHE_KEY = 'droi_showcase_cache_v1';
const SHOWCASE_POLL_MS = 5 * 60 * 1000;
const PUBLIC_API_BASE_URL = 'https://droi-ai-backend-dev-585034669241.asia-east1.run.app';

const DEFAULT_GAMES = [
    {
        title: 'Neon Dungeon Survivor',
        slug: 'neon-dungeon-survivor',
        genre: 'ROGUELIKE SURVIVAL',
        typeShort: 'ROGUE',
        buildTime: '14 MIN',
        image: 'assets/showcase/neon-dungeon-survivor-gpt-image-2.png',
        prompt: 'A neon dungeon roguelike where a lone mage survives shadow waves and unlocks unstable spells.',
        caption: 'shadow waves, spell unlocks',
        tags: ['Auto-spells', 'XP Drafts', 'Boss Waves'],
        breakdown: 'The AI split the idea into arena survival, escalating enemy waves, draft upgrades, enemy telegraphs, and readable HUD feedback.',
        output: 'A playable top-down survival prototype with spell cooldowns, XP pickups, wave pacing, and generated dungeon art.',
        hook: 'Survive shadow waves, gather XP, and draft unstable spells after every level.'
    },
    {
        title: 'Sky Rail Runner',
        slug: 'sky-rail-runner',
        genre: 'ACTION RUNNER',
        typeShort: 'RUNNER',
        buildTime: '11 MIN',
        image: 'assets/showcase/sky-rail-runner-gpt-image-2.png',
        prompt: 'A sky-city rail runner where players swap glowing tracks, dodge drones, and chain yellow energy shards.',
        caption: 'speed lanes, combo shards',
        tags: ['Track Swap', 'Combo Meter', 'Drone Dodge'],
        breakdown: 'The AI mapped the prompt into three-lane rail movement, speed ramps, collectible timing windows, and readable danger lanes.',
        output: 'A fast browser runner with lane switching, obstacle cadence, score combos, and neon city game art.',
        hook: 'Swap tracks at high speed, hold a combo, and outrun drone patrols above the city.'
    },
    {
        title: 'Moon Farm Builder',
        slug: 'moon-farm-builder',
        genre: 'COZY BUILDER',
        typeShort: 'BUILDER',
        buildTime: '16 MIN',
        image: 'assets/showcase/moon-farm-builder-gpt-image-2.png',
        prompt: 'A cozy moon farming builder where astronauts grow luminous crops and expand biodomes before oxygen runs low.',
        caption: 'biodomes, oxygen loops',
        tags: ['Build Toolbar', 'Crop Timers', 'Oxygen Budget'],
        breakdown: 'The AI translated the concept into tile placement, crop timers, oxygen economy, dome expansion, and gentle quest goals.',
        output: 'A playable builder loop with crop harvesting, resource spending, oxygen pressure, and generated lunar farm visuals.',
        hook: 'Grow glowing crops under glass domes while balancing oxygen, credits, and expansion space.'
    },
    {
        title: 'Cyber Cat Detective',
        slug: 'cyber-cat-detective',
        genre: 'NOIR ADVENTURE',
        typeShort: 'NOIR',
        buildTime: '13 MIN',
        image: 'assets/showcase/cyber-cat-detective-gpt-image-2.png',
        prompt: 'A cyberpunk cat detective game where players inspect holographic clues and solve memory crimes in rainy alleys.',
        caption: 'clues, dialogue, case flow',
        tags: ['Evidence UI', 'Dialogue', 'Case Board'],
        breakdown: 'The AI extracted clue hotspots, dialogue branching, inventory evidence, suspect states, and case progress milestones.',
        output: 'A playable investigation scene with clickable evidence, dialogue choices, clue inventory, and generated noir artwork.',
        hook: 'Inspect neon clues, question suspects, and close a memory crime before the trail disappears.'
    },
    {
        title: 'Tiny Mech Arena',
        slug: 'tiny-mech-arena',
        genre: 'ARCADE ARENA',
        typeShort: 'ARENA',
        buildTime: '12 MIN',
        image: 'assets/showcase/tiny-mech-arena-gpt-image-2.png',
        prompt: 'A tiny mech arena battler where players dash around cover, collect energy cores, and upgrade weapons mid-match.',
        caption: 'dash fights, weapon upgrades',
        tags: ['Dash Combat', 'Cooldowns', 'Arena Waves'],
        breakdown: 'The AI structured arena movement, cover rules, weapon cooldowns, pickup economy, enemy waves, and upgrade pacing.',
        output: 'A playable arcade arena with mech movement, destructible cover, weapon cooldowns, pickups, and generated battle art.',
        hook: 'Dash through cover, manage cooldowns, and turn small power cores into bigger weapons.'
    }
];

let games = [...DEFAULT_GAMES];
let catalogGames = [
    ...games,
    {
        title: 'Crystal Core Defense',
        typeShort: 'TOWER',
        buildTime: '18 MIN'
    },
    {
        title: 'Pixel Storm Racer',
        typeShort: 'RACING',
        buildTime: '09 MIN'
    },
    {
        title: 'Void Garden Tactics',
        typeShort: 'STRATEGY',
        buildTime: '21 MIN'
    }
];
let showcaseBusy = false;
let pendingGames = null;

const elements = {
    rollView: document.getElementById('rollView'),
    detailView: document.getElementById('detailView'),
    activeIndexLabel: document.getElementById('activeIndexLabel'),
    selectedLabel: document.getElementById('selectedLabel'),
    hoverStatus: document.getElementById('hoverStatus'),
    gameDirectory: document.getElementById('gameDirectory'),
    filmRail: document.getElementById('filmRail'),
    rollDots: document.getElementById('rollDots'),
    rollFilmPanel: document.querySelector('.roll-film-panel'),
    detailSections: document.getElementById('detailSections'),
    backToRollBtn: document.getElementById('backToRollBtn')
};

let previewIndex = 0;
let selectedIndex = 0;
let detailIndex = 0;
let carouselTimer = null;
let carouselPaused = false;
let observerPaused = false;
let embeddedPageFlow = false;
const parentOrigin = (() => {
    try {
        return document.referrer ? new URL(document.referrer).origin : window.location.origin;
    } catch (error) {
        return window.location.origin;
    }
})();

const carouselDelay = 3500;

function resolveApiBase() {
    const params = new URLSearchParams(window.location.search);
    const queryBase = params.get('apiBase') || '';
    if (queryBase) return queryBase.replace(/\/+$/, '');
    if (window.DROI_API_BASE) return String(window.DROI_API_BASE).replace(/\/+$/, '');
    if (['127.0.0.1', 'localhost'].includes(window.location.hostname)) return 'http://127.0.0.1:3000';
    return '';
}

let apiBase = resolveApiBase();

async function loadShowcaseRuntimeConfig() {
    if (apiBase) return apiBase;
    try {
        const response = await fetch('../../droi-config.json', { cache: 'no-store' });
        if (!response.ok) throw new Error(`Config request failed with ${response.status}`);
        const config = await response.json();
        const configuredBase = config.apiBaseUrl || config.apiBase || config.backendUrl || '';
        if (configuredBase) {
            apiBase = String(configuredBase).replace(/\/+$/, '');
            return apiBase;
        }
    } catch (error) {
        console.info('Showcase runtime config unavailable; using public backend fallback.', error);
    }
    apiBase = PUBLIC_API_BASE_URL;
    return apiBase;
}

function apiUrl(path) {
    return `${apiBase}${path}`;
}

function resolveAssetUrl(value) {
    const url = String(value || '');
    if (!url) return '';
    if (/^https?:\/\//i.test(url)) return url;
    if (url.startsWith('/api/') && apiBase) return apiUrl(url);
    return url;
}

function sanitizeGame(game, index) {
    const title = String(game.title || `Generated Game ${index + 1}`).trim();
    return {
        title,
        slug: String(game.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || `game-${index + 1}`),
        genre: String(game.genre || 'ARCADE GAME'),
        typeShort: String(game.typeShort || game.genre || 'GAME').slice(0, 16),
        buildTime: String(game.buildTime || ''),
        image: resolveAssetUrl(game.image),
        playUrl: String(game.playUrl || ''),
        embedMode: game.embedMode === 'new_tab' ? 'new_tab' : 'iframe',
        prompt: String(game.prompt || ''),
        caption: String(game.caption || ''),
        tags: Array.isArray(game.tags) ? game.tags.map(tag => String(tag || '').trim()).filter(Boolean) : [],
        breakdown: String(game.breakdown || ''),
        output: String(game.output || ''),
        hook: String(game.hook || game.caption || ''),
        gameId: String(game.gameId || ''),
        source: String(game.source || 'minigame'),
        orientation: String(game.orientation || 'vertical'),
        status: String(game.status || 'online'),
        category: String(game.category || ''),
        gameType: String(game.gameType || 'H5'),
        enabled: game.enabled !== false,
        order: Number(game.order) || index + 1
    };
}

function syncCatalogGames() {
    const queued = [
        { title: 'Crystal Core Defense', typeShort: 'TOWER', buildTime: '18 MIN' },
        { title: 'Pixel Storm Racer', typeShort: 'RACING', buildTime: '09 MIN' },
        { title: 'Void Garden Tactics', typeShort: 'STRATEGY', buildTime: '21 MIN' }
    ];
    catalogGames = [...games, ...queued];
}

function applyShowcaseGames(nextGames) {
    if (!Array.isArray(nextGames) || !nextGames.length) return;
    games = nextGames
        .map(sanitizeGame)
        .filter(game => game.enabled && game.status === 'online' && game.image)
        .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
    if (!games.length) games = [...DEFAULT_GAMES];
    selectedIndex = Math.min(selectedIndex || 0, games.length - 1);
    previewIndex = Math.min(previewIndex || 0, games.length - 1);
    detailIndex = Math.min(detailIndex || 0, games.length - 1);
    syncCatalogGames();
    renderDirectory();
    renderFilmRail();
    renderDots();
    renderDetailSections();
    previewGame(selectedIndex || 0);
    elements.selectedLabel.textContent = totalLabel(selectedIndex || 0);
    notifyEmbeddedReady();
}

function readCachedShowcaseGames() {
    try {
        const cached = JSON.parse(localStorage.getItem(SHOWCASE_CACHE_KEY) || 'null');
        if (cached && Array.isArray(cached.games)) return cached.games;
    } catch (error) {
        // Ignore cache parse errors and keep bundled games.
    }
    return [];
}

async function loadBackendGames({ background = false } = {}) {
    if (!apiBase) return;
    try {
        const response = await fetch(apiUrl('/api/showcase/games'), {
            credentials: 'include',
            cache: 'no-store'
        });
        if (!response.ok) throw new Error(`showcase config ${response.status}`);
        const data = await response.json();
        const nextGames = Array.isArray(data.games) ? data.games : [];
        if (!nextGames.length) return;
        localStorage.setItem(SHOWCASE_CACHE_KEY, JSON.stringify({
            updatedAt: data.updatedAt || new Date().toISOString(),
            games: nextGames
        }));
        if (showcaseBusy && background) {
            pendingGames = nextGames;
            return;
        }
        applyShowcaseGames(nextGames);
    } catch (error) {
        const cached = readCachedShowcaseGames();
        if (cached.length && !background) applyShowcaseGames(cached);
    }
}

function startShowcasePolling() {
    window.setInterval(() => {
        loadBackendGames({ background: true });
    }, SHOWCASE_POLL_MS);
}

function setShowcaseBusy(nextBusy) {
    showcaseBusy = Boolean(nextBusy);
    if (!showcaseBusy && pendingGames) {
        const nextGames = pendingGames;
        pendingGames = null;
        applyShowcaseGames(nextGames);
    }
}

function numberLabel(index) {
    return String(index + 1).padStart(2, '0');
}

function totalLabel(index) {
    return `${numberLabel(index)} / ${String(games.length).padStart(2, '0')}`;
}

function renderDirectory() {
    elements.gameDirectory.innerHTML = '';

    catalogGames.forEach((game, index) => {
        const isShowcaseItem = index < games.length;
        const row = document.createElement('button');
        row.type = 'button';
        row.className = `directory-row ${isShowcaseItem ? 'is-showcase-item' : 'is-queued'}`;
        row.dataset.index = String(index);
        row.role = 'option';
        row.setAttribute('aria-selected', isShowcaseItem && selectedIndex === index ? 'true' : 'false');
        if (!isShowcaseItem) {
            row.setAttribute('aria-disabled', 'true');
        }
        row.innerHTML = `
            <span class="directory-number">${numberLabel(index)}</span>
            <span class="directory-build">${game.buildTime}</span>
            <span class="directory-title">${game.title}</span>
            <span class="directory-type">${game.typeShort}</span>
        `;
        if (isShowcaseItem) {
            row.addEventListener('mouseenter', () => previewGame(index));
            row.addEventListener('focus', () => previewGame(index));
            row.addEventListener('mouseleave', restoreSelectedPreview);
            row.addEventListener('blur', restoreSelectedPreview);
            row.addEventListener('click', () => selectGame(index));
        } else {
            row.addEventListener('mouseenter', () => row.classList.add('is-hovered'));
            row.addEventListener('focus', () => row.classList.add('is-hovered'));
            row.addEventListener('mouseleave', () => row.classList.remove('is-hovered'));
            row.addEventListener('blur', () => row.classList.remove('is-hovered'));
        }
        elements.gameDirectory.appendChild(row);
    });
}

function renderFilmRail() {
    elements.filmRail.innerHTML = '';

    games.forEach((game, index) => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'film-card';
        card.dataset.index = String(index);
        card.role = 'option';
        card.setAttribute('aria-selected', selectedIndex === index ? 'true' : 'false');
        card.innerHTML = `
            <img src="${game.image}" alt="" loading="lazy" decoding="async">
            <span class="film-card-copy">
                <span class="film-number">${numberLabel(index)}</span>
                <span class="film-title">${game.title}</span>
                <span class="film-genre">${game.genre}</span>
                <span class="film-caption">${game.caption}</span>
            </span>
        `;
        card.addEventListener('mouseenter', () => previewGame(index));
        card.addEventListener('focus', () => previewGame(index));
        card.addEventListener('mouseleave', restoreSelectedPreview);
        card.addEventListener('blur', restoreSelectedPreview);
        card.addEventListener('click', () => handleFilmClick(index));
        elements.filmRail.appendChild(card);
    });
}

function renderDots() {
    if (!elements.rollDots) return;
    elements.rollDots.innerHTML = '';

    games.forEach((game, index) => {
        const dot = document.createElement('span');
        dot.className = 'roll-dot';
        dot.dataset.index = String(index);
        dot.title = game.title;
        elements.rollDots.appendChild(dot);
    });
}

function updatePreviewClasses() {
    const expandedIndex = previewIndex ?? selectedIndex;

    document.querySelectorAll('.directory-row').forEach((row, index) => {
        const isShowcaseItem = index < games.length;
        const isSelected = isShowcaseItem && index === selectedIndex;
        const isPreviewed = isShowcaseItem && index === previewIndex;
        row.classList.toggle('is-selected', isSelected);
        row.classList.toggle('is-previewed', isPreviewed && !isSelected);
        row.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    document.querySelectorAll('.film-card').forEach((card, index) => {
        const isSelected = index === selectedIndex;
        const isPreviewed = index === previewIndex;
        card.classList.toggle('is-selected', isSelected);
        card.classList.toggle('is-previewed', isPreviewed && !isSelected);
        card.classList.toggle('is-expanded', index === expandedIndex);
        card.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    document.querySelectorAll('.roll-dot').forEach((dot, index) => {
        dot.classList.toggle('is-active', index === selectedIndex);
    });

    const progressIndex = selectedIndex ?? previewIndex ?? 0;
    const progress = catalogGames.length > 1 ? progressIndex / (catalogGames.length - 1) : 1;
    const windowProgress = catalogGames.length ? games.length / catalogGames.length : 1;
    if (elements.rollFilmPanel) {
        elements.rollFilmPanel.style.setProperty('--roll-progress', `${Math.round(progress * 100)}%`);
        elements.rollFilmPanel.style.setProperty('--roll-window-progress', `${Math.round(windowProgress * 100)}%`);
    }
}

function previewGame(index) {
    if (index < 0 || index >= games.length) return;
    previewIndex = index;
    const game = games[index];
    elements.activeIndexLabel.textContent = totalLabel(index);
    elements.hoverStatus.textContent = `${index === selectedIndex ? 'NOW SELECTED' : 'NOW HOVERING'} · ${game.title.toUpperCase()}`;
    updatePreviewClasses();
}

function clearPreview() {
    previewIndex = null;
    updatePreviewClasses();
}

function restoreSelectedPreview() {
    if (selectedIndex === null) {
        clearPreview();
        return;
    }

    previewGame(selectedIndex);
}

function selectGame(index) {
    if (index < 0 || index >= games.length) return;
    selectedIndex = index;
    previewGame(index);
    elements.selectedLabel.textContent = totalLabel(index);
    restartCarousel();
}

function handleFilmClick(index) {
    if (index === selectedIndex) {
        navigateToGame(index);
        return;
    }
    selectGame(index);
}

function advanceCarousel() {
    if (carouselPaused || document.body.classList.contains('is-in-detail')) return;
    const nextIndex = (selectedIndex + 1) % games.length;
    selectedIndex = nextIndex;
    previewGame(nextIndex);
    elements.selectedLabel.textContent = totalLabel(nextIndex);
}

function startCarousel() {
    stopCarousel();
    carouselTimer = window.setInterval(advanceCarousel, carouselDelay);
}

function stopCarousel() {
    if (carouselTimer) {
        window.clearInterval(carouselTimer);
        carouselTimer = null;
    }
}

function restartCarousel() {
    startCarousel();
}

function pauseCarousel() {
    carouselPaused = true;
}

function resumeCarousel() {
    carouselPaused = false;
}

function renderDetailSections() {
    elements.detailSections.innerHTML = games.map((game, index) => {
        const tagMarkup = game.tags.map((tag) => `<span>${tag}</span>`).join('');
        const thumbMarkup = games.map((thumbGame, thumbIndex) => `
            <button class="detail-thumb ${thumbIndex === index ? 'is-active' : ''}" type="button" data-index="${thumbIndex}" aria-label="View ${thumbGame.title}">
                <img src="${thumbGame.image}" alt="" loading="lazy" decoding="async">
                <span>${numberLabel(thumbIndex)}</span>
            </button>
        `).join('');

        return `
            <section class="detail-page" id="game-${game.slug}" data-index="${index}" aria-labelledby="detail-title-${game.slug}">
                <section class="detail-copy" aria-labelledby="detail-title-${game.slug}">
                    <div class="roll-meta detail-meta">
                        <span>${totalLabel(index)}</span>
                        <span>${game.genre}</span>
                        <span>GENERATED BY DROI AI</span>
                    </div>
                    <h2 class="detail-title" id="detail-title-${game.slug}">${game.title}</h2>
                    <p class="detail-hook">${game.hook}</p>
                    <div class="tag-row">${tagMarkup}</div>
                    <dl class="build-facts">
                        <div>
                            <dt>BUILD TIME</dt>
                            <dd>${game.buildTime}</dd>
                        </div>
                        <div>
                            <dt>ASSET SOURCE</dt>
                            <dd>${imageModelName.toUpperCase()}</dd>
                        </div>
                        <div>
                            <dt>OUTPUT</dt>
                            <dd>WEB GAME</dd>
                        </div>
                    </dl>
                    <div class="prompt-flow">
                        <div class="prompt-stage">
                            <span>01 USER INPUT</span>
                            <p>${game.prompt}</p>
                        </div>
                        <div class="prompt-stage">
                            <span>02 AI BREAKDOWN</span>
                            <p>${game.breakdown}</p>
                        </div>
                        <div class="prompt-stage">
                            <span>03 FINISHED GAME</span>
                            <p>${game.output}</p>
                        </div>
                    </div>
                    ${game.playUrl ? `
                    <div class="detail-play-panel">
                        <div class="detail-play-heading">
                            <span>Playable game</span>
                            <a href="${game.playUrl}" target="_blank" rel="noopener noreferrer">${game.embedMode === 'new_tab' ? 'Open game in new tab' : 'Open game'}</a>
                        </div>
                        ${game.embedMode === 'new_tab' ? '' : `<iframe src="${game.playUrl}" title="${game.title} playable preview" loading="lazy" allowfullscreen></iframe>`}
                    </div>` : ''}
                </section>

                <section class="detail-visual" aria-label="${game.title} generated game detail">
                    <div class="detail-image-frame">
                        <img src="${game.image}" alt="${game.title} game detail" loading="lazy" decoding="async">
                        <div class="detail-image-caption">
                            <span>${numberLabel(index)}</span>
                            <p>${game.caption}</p>
                        </div>
                    </div>
                    <div class="detail-thumbs" aria-label="Other generated games">
                        ${thumbMarkup}
                    </div>
                </section>
            </section>
        `;
    }).join('');

    elements.detailSections.querySelectorAll('.detail-thumb').forEach((thumb) => {
        thumb.addEventListener('click', () => navigateToGame(Number(thumb.dataset.index)));
    });
}

function markCurrentDetail(index) {
    detailIndex = index;
    document.querySelectorAll('.detail-page').forEach((section, sectionIndex) => {
        section.classList.toggle('is-current', sectionIndex === index);
    });
    document.querySelectorAll('.detail-thumb').forEach((thumb) => {
        thumb.classList.toggle('is-active', Number(thumb.dataset.index) === index);
    });
}

function navigateToGame(index, pushHash = true) {
    if (index < 0 || index >= games.length) return;
    const game = games[index];
    selectedIndex = index;
    previewIndex = index;
    markCurrentDetail(index);
    updatePreviewClasses();
    elements.selectedLabel.textContent = totalLabel(index);
    document.body.classList.add('is-in-detail');
    pauseCarousel();
    stopCarousel();

    if (pushHash) {
        window.history.pushState(null, '', `#game-${game.slug}`);
    }

    if (embeddedPageFlow) {
        window.parent?.postMessage({
            type: 'droi-roll-scroll-to',
            pageIndex: index + 1
        }, parentOrigin);
        return;
    }

    requestAnimationFrame(() => {
        const target = document.getElementById(`game-${game.slug}`);
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

function closeDetail(updateHistory = true) {
    document.body.classList.remove('is-in-detail');
    if (updateHistory) {
        window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
    if (embeddedPageFlow) {
        window.parent?.postMessage({
            type: 'droi-roll-scroll-to',
            pageIndex: 0
        }, parentOrigin);
    } else {
        elements.rollView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    resumeCarousel();
    startCarousel();
}

function openFromHash(pushHash = false) {
    const slug = window.location.hash.replace(/^#game-/, '');
    if (!slug) return;
    const index = games.findIndex((game) => game.slug === slug);
    if (index >= 0) {
        window.setTimeout(() => navigateToGame(index, pushHash), 100);
    }
}

function syncDetailState(index, updateHash = true) {
    if (index < 0 || index >= games.length) return;
    selectedIndex = index;
    previewIndex = index;
    markCurrentDetail(index);
    updatePreviewClasses();
    elements.selectedLabel.textContent = totalLabel(index);
    document.body.classList.add('is-in-detail');
    pauseCarousel();
    stopCarousel();

    if (updateHash) {
        const nextHash = `#game-${games[index].slug}`;
        if (window.location.hash !== nextHash) {
            window.history.replaceState(null, '', nextHash);
        }
    }
}

function initSectionObservers() {
    if (embeddedPageFlow) return;
    if (!('IntersectionObserver' in window)) return;

    const rollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                document.body.classList.remove('is-in-detail');
                if (window.location.hash.startsWith('#game-')) {
                    window.history.replaceState(null, '', window.location.pathname + window.location.search);
                }
                resumeCarousel();
                startCarousel();
            }
        });
    }, { threshold: [0.5, 0.75] });

    rollObserver.observe(elements.rollView);

    const detailObserver = new IntersectionObserver((entries) => {
        const visibleEntry = entries
            .filter((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) return;
        syncDetailState(Number(visibleEntry.target.dataset.index));
    }, { threshold: [0.5, 0.62] });

    document.querySelectorAll('.detail-page').forEach((section) => {
        detailObserver.observe(section);
    });
}

function applyEmbeddedViewport(height) {
    const nextHeight = Math.max(480, Math.round(Number(height) || window.innerHeight));
    embeddedPageFlow = true;
    document.documentElement.classList.add('is-embedded-page-flow');
    document.documentElement.style.setProperty('--roll-page-height', `${nextHeight}px`);
}

function notifyEmbeddedReady() {
    if (!window.parent || window.parent === window) return;
    window.parent.postMessage({
        type: 'droi-roll-ready',
        pageCount: games.length + (window.matchMedia('(max-width: 760px)').matches ? 2 : 1)
    }, parentOrigin);
}

function initEmbeddedPageFlow() {
    window.addEventListener('message', (event) => {
        if (window.parent && event.source !== window.parent) return;
        if (event.origin !== parentOrigin) return;
        const data = event.data || {};
        if (!data || typeof data !== 'object' || data.type !== 'droi-roll-viewport') return;
        applyEmbeddedViewport(data.height);
    });

    if (window.parent && window.parent !== window) {
        applyEmbeddedViewport(window.innerHeight);
        notifyEmbeddedReady();
    }
}

function createStarlights() {
    const container = document.getElementById('starlightContainer');
    if (!container) return;

    const colors = ['rgba(164, 130, 255, 0.9)', 'rgba(240, 147, 251, 0.9)', 'rgba(129, 140, 248, 0.9)'];
    const count = window.matchMedia('(max-width: 760px)').matches ? 110 : 200;

    for (let i = 0; i < count; i += 1) {
        const star = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        star.className = 'starlight';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.background = color;
        star.style.boxShadow = `0 0 ${size * 4}px ${color}, 0 0 ${size * 8}px ${color}`;
        star.style.animationDuration = `${Math.random() * 4 + 3}s`;
        star.style.animationDelay = `-${Math.random() * 5}s`;
        container.appendChild(star);
    }
}

function initSpotlight() {
    const spotlightOverlay = document.querySelector('.spotlight-overlay');
    const spotlightGlow = document.querySelector('.spotlight-glow');
    let currentX = 0.5;
    let currentY = 0.5;
    let targetX = 0.5;
    let targetY = 0.5;
    const smoothing = 0.15;

    document.addEventListener('mousemove', (event) => {
        targetX = event.clientX / window.innerWidth;
        targetY = event.clientY / window.innerHeight;
    });

    function animateSpotlight() {
        currentX += (targetX - currentX) * smoothing;
        currentY += (targetY - currentY) * smoothing;
        const posPercentX = currentX * 100;
        const posPercentY = currentY * 100;

        if (spotlightOverlay) {
            spotlightOverlay.style.background = `
                radial-gradient(
                    circle at ${posPercentX}% ${posPercentY}%,
                    transparent 0%,
                    transparent 120px,
                    rgba(18, 16, 23, 0.2) 250px,
                    rgba(18, 16, 23, 0.4) 100%
                )
            `;
        }

        if (spotlightGlow) {
            spotlightGlow.style.background = `
                radial-gradient(
                    circle at ${posPercentX}% ${posPercentY}%,
                    rgba(129, 140, 248, 0.15) 0%,
                    rgba(129, 140, 248, 0.05) 80px,
                    transparent 180px
                )
            `;
        }

        requestAnimationFrame(animateSpotlight);
    }

    if (!('ontouchstart' in window)) {
        animateSpotlight();
    }
}

function initRipples() {
    document.addEventListener('click', (event) => {
        const ripple = document.createElement('div');
        ripple.className = 'spotlight-ripple';
        ripple.style.left = `${event.clientX}px`;
        ripple.style.top = `${event.clientY}px`;
        document.body.appendChild(ripple);

        ripple.animate([
            { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
            { opacity: 0, transform: 'translate(-50%, -50%) scale(40)' }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => ripple.remove();
    });
}

function bindEvents() {
    elements.backToRollBtn.addEventListener('click', closeDetail);
    elements.rollFilmPanel.addEventListener('mouseenter', pauseCarousel);
    elements.rollFilmPanel.addEventListener('mouseleave', resumeCarousel);
    elements.rollFilmPanel.addEventListener('focusin', pauseCarousel);
    elements.rollFilmPanel.addEventListener('focusout', resumeCarousel);
    window.addEventListener('hashchange', () => {
        if (window.location.hash.startsWith('#game-')) {
            openFromHash(false);
            return;
        }
        closeDetail(false);
    });
    window.addEventListener('popstate', () => {
        if (window.location.hash.startsWith('#game-')) {
            openFromHash(false);
            return;
        }
        closeDetail(false);
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && document.body.classList.contains('is-in-detail')) {
            closeDetail();
        }
    });
}

async function initShowcase() {
    createStarlights();
    initSpotlight();
    initRipples();
    const cached = readCachedShowcaseGames();
    if (cached.length) {
        applyShowcaseGames(cached);
    } else {
        syncCatalogGames();
    }
    await loadShowcaseRuntimeConfig();
    await loadBackendGames();
    renderDirectory();
    renderFilmRail();
    renderDots();
    renderDetailSections();
    previewGame(0);
    elements.selectedLabel.textContent = totalLabel(0);
    initEmbeddedPageFlow();
    bindEvents();
    initSectionObservers();
    openFromHash(false);
    startCarousel();
    startShowcasePolling();
}

window.addEventListener('message', (event) => {
    if (window.parent && window.parent !== window && event.source !== window.parent) return;
    const data = event.data || {};
    if (!data || typeof data !== 'object' || data.type !== 'droi-chat-busy') return;
    setShowcaseBusy(data.busy);
});

initShowcase();

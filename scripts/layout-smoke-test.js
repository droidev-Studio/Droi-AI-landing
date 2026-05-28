const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const style = fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8');
const index = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const script = fs.readFileSync(path.join(ROOT, 'script.js'), 'utf8');
const showcaseCss = fs.readFileSync(path.join(ROOT, 'showcase', 'roll', 'showcase.css'), 'utf8');

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

function cssBlock(source, selector) {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = source.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`, 'm'));
    return match ? match[1] : '';
}

const chatHistory = cssBlock(style, '.chat-history');
const profileChatHistory = cssBlock(style, '.inspire-view.has-profile-sidebar .chat-history');
const inputBar = cssBlock(style, '.chat-input-bar.unified-pill');
const previewViewport = cssBlock(style, '.game-preview-viewport');
const mobileViewport = style.match(/@media \(max-width: 720px\)[\s\S]*?\.game-preview-viewport\s*\{([\s\S]*?)\}/m)?.[1] || '';
const previewOpenViewport = cssBlock(style, '.playable-shell.preview-open .game-preview-viewport');

assert(
    /--chat-stage-width:\s*min\(880px,\s*calc\(100vw - 48px\)\)/.test(chatHistory) &&
        /margin-left:\s*auto/.test(style) &&
        /margin-right:\s*auto/.test(style),
    'Chat messages must keep a centered stage width.'
);

assert(
    profileChatHistory &&
        /--chat-stage-width:\s*min\(880px,\s*calc\(100vw - 48px\)\)/.test(profileChatHistory) &&
        !/padding-(left|right)\s*:/.test(profileChatHistory),
    'Right profile sidebar must not push or pad the centered chat stage.'
);

assert(
    /max-width:\s*880px/.test(inputBar) && /margin:\s*0 auto/.test(inputBar),
    'Chat input dock must align with the centered chat stage.'
);

assert(
    /scrolling="no"/.test(index) &&
        /allowtransparency="true"/.test(index) &&
        /--roll-embed-page-count:\s*2/.test(style),
    'Homepage showcase iframe must use page-flow carousel behavior without native scrolling chrome.'
);

assert(
    /html\.is-embedded-page-flow \.scanline,\s*html\.is-embedded-page-flow \.spotlight-overlay,\s*html\.is-embedded-page-flow \.spotlight-glow[\s\S]*?display:\s*none/.test(showcaseCss) &&
        /html\.is-embedded-page-flow body::before[\s\S]*?-webkit-mask-image:\s*none/.test(showcaseCss) &&
        /html\.is-embedded-page-flow body::before[\s\S]*?mask-image:\s*none/.test(showcaseCss),
    'Embedded homepage showcase must remove overlay and background mask treatment.'
);

assert(
    /aspect-ratio:\s*16 \/ 9/.test(previewViewport) &&
        /overflow:\s*hidden/.test(previewViewport) &&
        /display:\s*none/.test(mobileViewport) &&
        /display:\s*block/.test(previewOpenViewport),
    'Generated game preview must stay contained, with mobile preview collapsed until opened.'
);

assert(
    script.includes('buildGeneratedFilesHtml') &&
        script.includes('Project Resource Sidebar') &&
        script.includes('Production Assets') &&
        script.includes('template-preview-frame') &&
        script.includes('web-preview-trigger') &&
        script.includes('apiUrl(project.previewUrl)'),
    'Generated workspace should expose template preview, production resource sidebar, and template file list.'
);

console.log('layout-smoke-test passed');

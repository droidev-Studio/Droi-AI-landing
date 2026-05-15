document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('waitlistForm');
    const mainInput = document.getElementById('mainInput');
    const submitBtn = document.getElementById('mainSubmitBtn');
    const backToPromptBtn = document.getElementById('backToPromptBtn');

    const progressContainer = document.getElementById('progressContainer');
    const generationSteps = document.getElementById('generationSteps');
    const progressBarFill = document.getElementById('progressBarFill');
    const progressText = document.getElementById('progressText');
    const progressBarBg = document.getElementById('progressBarBg');
    const progressMessage = document.getElementById('progressMessage');
    const statsContainer = document.getElementById('statsContainer');

    // Inspire Chat View Elements
    const inspireEntryBtn = document.getElementById('inspireEntryBtn');
    const inspireView = document.getElementById('inspireView');
    const chatCloseBtn = document.getElementById('chatCloseBtn');
    const chatHistory = document.getElementById('chatHistory');
    const chatOptionsList = document.getElementById('chatOptionsList');
    const chatMoreBtn = document.getElementById('chatMoreBtn');
    const mainHero = document.querySelector('.hero');
    const inspireSection = document.querySelector('.inspire-section');

    // === WIZARD DATA ===
    const GAME_TYPES = [
        { label: '🎮 RPG', value: 'RPG', mechanic: 'deep character progression and branching story choices' },
        { label: '🧩 Puzzle', value: 'Puzzle', mechanic: 'clever logic puzzles and satisfying aha moments' },
        { label: '⚔️ Action', value: 'Action Platformer', mechanic: 'fast-paced combat and fluid movement mechanics' },
        { label: '🔮 Roguelike', value: 'Roguelike', mechanic: 'procedurally generated levels and permadeath mechanics' },
        { label: '🌿 Simulation', value: 'Life Simulation', mechanic: 'relaxing life management and cozy progression loops' },
        { label: '🧟 Horror', value: 'Horror Survival', mechanic: 'tension-building atmosphere and scarce resource management' },
        { label: '🎵 Rhythm', value: 'Rhythm Battle', mechanic: 'music-synced gameplay and beat-perfect combos' },
        { label: '🏙️ Strategy', value: 'Strategy', mechanic: 'resource management and tactical decision-making' },
        { label: '🌊 Survival', value: 'Open-World Survival', mechanic: 'crafting, exploration and staying alive against the odds' },
    ];

    const ART_STYLES = [
        { label: '🎨 Pixel Art', value: 'pixel art' },
        { label: '🌑 Dark Gothic', value: 'dark gothic' },
        { label: '🌸 Anime / Cartoon', value: 'anime cartoon' },
        { label: '✏️ Minimalist', value: 'minimalist' },
        { label: '💜 Cyberpunk', value: 'cyberpunk neon' },
        { label: '🖌️ Fantasy Illustration', value: 'fantasy illustration' },
        { label: '📼 Retro / Lo-Fi', value: 'retro lo-fi' },
        { label: '🔭 Realistic', value: 'realistic 3D' },
    ];

    const SETTINGS = [
        { label: '🏰 Fantasy Medieval', value: 'a fantasy medieval world', desc: 'Journey through kingdoms of magic, knights, and legendary dragons.' },
        { label: '🌆 Cyberpunk City', value: 'a cyberpunk megalopolis', desc: 'Navigate neon-lit streets controlled by corporations and high-tech rebels.' },
        { label: '🚀 Outer Space', value: 'the depths of outer space', desc: 'Explore distant galaxies, alien planets, and the silent mysteries of the void.' },
        { label: '☢️ Post-Apocalyptic', value: 'a post-apocalyptic wasteland', desc: 'Survive in a world reclaimed by nature after the fall of civilization.' },
        { label: '🌊 Underwater World', value: 'a mysterious underwater kingdom', desc: 'Discover bioluminescent cities and deep-sea creatures in the ocean depths.' },
        { label: '⛩️ Ancient East', value: 'an ancient eastern empire', desc: 'Experience the beauty and mythology of floating temples and cherry blossoms.' },
        { label: '❄️ Arctic / Ice World', value: 'a frozen arctic wilderness', desc: 'Endure the extreme cold of a world locked in a perpetual blizzard.' },
        { label: '👻 Haunted Realm', value: 'a haunted cursed realm', desc: 'Uncover dark secrets in a dimension where shadows come to life.' },
    ];

    const CHAT_POOLS = [null, GAME_TYPES, ART_STYLES, SETTINGS];
    const BOT_MESSAGES = [
        null,
        "Awesome! What vibes are we channeling today? Choose a game type.",
        "Great choice! What art style should we use?",
        "Perfect! And what about the setting?"
    ];

    let chatStep = 1;
    let chatSelections = { type: null, style: null, setting: null };
    let chatShown = { 1: new Set(), 2: new Set(), 3: new Set() };
    let chatCurrent = { 1: [], 2: [], 3: [] };

    let analysisState = {
        active: false,
        type: null,
        style: null,
        setting: null,
        background: null
    };

    function startAnalysisFlow(prompt) {
        analysisState.active = true;
        analysisState.type = null;
        analysisState.style = null;
        analysisState.setting = null;
        analysisState.background = prompt;

        addBotMessage("Analyzing your prompt... ✨");

        setTimeout(() => {
            const p = prompt.toLowerCase();

            // Basic keyword matching for identification
            GAME_TYPES.forEach(t => {
                const val = t.value.toLowerCase();
                const lab = t.label.toLowerCase().replace(/[^\w\s]/g, '').trim();
                if (p.includes(val) || p.includes(lab)) analysisState.type = t;
            });
            ART_STYLES.forEach(s => {
                const val = s.value.toLowerCase();
                const lab = s.label.toLowerCase().replace(/[^\w\s]/g, '').trim();
                if (p.includes(val) || p.includes(lab)) analysisState.style = s;
            });
            SETTINGS.forEach(st => {
                const val = st.value.toLowerCase();
                const lab = st.label.toLowerCase().replace(/[^\w\s]/g, '').trim();
                if (p.includes(val) || p.includes(lab)) analysisState.setting = st;
            });

            // If the prompt is reasonably detailed, assume they provided a custom setting/story
            if (!analysisState.setting && p.length > 30) {
                analysisState.setting = {
                    label: 'Custom World',
                    value: 'the world described in your prompt',
                    desc: prompt
                };
            }

            continueClarification();
        }, 1500);
    }

    let typingTimeout = null;

    function continueClarification() {
        if (!analysisState.type) {
            askClarification(1, `I've analyzed your prompt, but I'm missing the <span class="highlight-text">game type</span>. Which one fits best?`);
            return;
        }
        if (!analysisState.style) {
            askClarification(2, `Got it. And what <span class="highlight-text">art style</span> should we use for this?`);
            return;
        }
        if (!analysisState.setting) {
            askClarification(3, `Almost there! What <span class="highlight-text">setting</span> are we imagining?`);
            return;
        }

        // All补齐了
        finalizeAnalysis();
    }

    function askClarification(step, msgHtml) {
        chatStep = step;
        addBotMessage(msgHtml);

        clearTimeout(typingTimeout);
        // Start 3-second countdown
        typingTimeout = setTimeout(() => {
            // Only show inspire button if input is still empty
            if (chatInputField.value.trim() === '') {
                showInspireMePrompt(step);
            }
        }, 3000);
    }

    function showInspireMePrompt(step) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message bot';
        msgDiv.id = 'inspirePromptContainer';
        // Give it a special class to remove bubble background later
        msgDiv.innerHTML = `
            <div class="chat-content-wrap">
                <div class="bot-avatar" style="opacity: 0;">✨</div>
                <div class="chat-bubble typing-indicator" id="inspireBubble">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        chatHistory.appendChild(msgDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;

        setTimeout(() => {
            if (!document.getElementById('inspirePromptContainer')) return;
            const bubble = msgDiv.querySelector('#inspireBubble');
            if (bubble) {
                // Remove bubble styling so it looks exactly like the external button
                bubble.className = '';
                bubble.style.padding = '0';
                bubble.style.background = 'transparent';
                bubble.style.boxShadow = 'none';

                bubble.innerHTML = `
                    <div class="inspire-section" style="margin: 0; justify-content: flex-start;">
                        <span class="inspire-text">No idea? Just</span>
                        <button type="button" class="inspire-entry-btn" id="chatInspireBtn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sparkle-icon">
                                <path d="M12 3v18M3 12h18M6.3 6.3l11.4 11.4M6.3 17.7l11.4-11.4" opacity="0.3"></path>
                                <path d="M12 1v22M1 12h22M4.2 4.2l15.6 15.6M4.2 19.8l15.6-15.6" stroke="currentColor"></path>
                            </svg>
                            Inspire Me
                        </button>
                    </div>
                `;
                chatHistory.scrollTop = chatHistory.scrollHeight;

                const btn = bubble.querySelector('#chatInspireBtn');
                btn.addEventListener('click', () => {
                    msgDiv.remove();
                    renderChatOptions(step);
                });
            }
        }, 1200);
    }

    function finalizeAnalysis() {
        // Transfer analysis data to chatSelections for the summary logic
        chatSelections.type = analysisState.type;
        chatSelections.style = analysisState.style;
        chatSelections.setting = analysisState.setting;

        composeAndReturn();
        analysisState.active = false;
    }

    function getNextBatch(step) {
        const pool = CHAT_POOLS[step];
        let available = pool.map((_, i) => i).filter(i => !chatShown[step].has(i));
        if (available.length < 3) {
            chatShown[step] = new Set(chatCurrent[step]);
            available = pool.map((_, i) => i).filter(i => !chatShown[step].has(i));
        }
        for (let i = available.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [available[i], available[j]] = [available[j], available[i]];
        }
        const picked = available.slice(0, Math.min(3, available.length));
        picked.forEach(i => chatShown[step].add(i));
        chatCurrent[step] = picked;
        return picked.map(i => pool[i]);
    }

    const chatInputField = document.getElementById('chatInputField');
    const chatSendBtn = document.getElementById('chatSendBtn');

    function handleChatSubmit() {
        const text = chatInputField.value.trim();
        if (!text) return;

        addUserMessage(text);
        chatInputField.value = '';
        const countDisplay = document.getElementById('chatCharCount');
        if (countDisplay) countDisplay.textContent = '0/1000';

        // 清理当前显示的选项
        chatOptionsList.innerHTML = '';
        const optContainer = document.getElementById('chatOptionsContainer');
        if (optContainer) optContainer.style.display = 'none';

        if (analysisState.active) {
            // 在分析流中，用户手动输入替代选项选择（消息已在函数顶部添加）
            if (!analysisState.type) {
                analysisState.type = { label: text, value: text, mechanic: text };
            } else if (!analysisState.style) {
                analysisState.style = { label: text, value: text };
            } else if (!analysisState.setting) {
                analysisState.setting = { label: text, value: text, desc: text };
            }
            continueClarification();
        } else {
            // 非分析流：用户自由输入新 prompt，启动新一轮分析（消息已在函数顶部添加）
            savedPrompt = text;
            startAnalysisFlow(text);
        }
    }

    if (chatInputField) {
        chatInputField.addEventListener('input', () => {
            const countDisplay = document.getElementById('chatCharCount');
            const length = chatInputField.value.length;
            if (countDisplay) {
                countDisplay.textContent = `${length}/1000`;
                if (length >= 1000) {
                    countDisplay.style.color = '#ef4444';
                } else if (length >= 800) {
                    countDisplay.style.color = 'var(--accent-yellow)';
                } else if (length >= 500) {
                    countDisplay.style.color = 'rgba(255, 255, 255, 0.6)'; // Subtle warning color
                } else {
                    countDisplay.style.color = 'rgba(255, 255, 255, 0.3)';
                }
            }

            if (chatInputField.value.trim() !== '') {
                clearTimeout(typingTimeout);
                // Remove prompt container if user starts typing
                const promptContainer = document.getElementById('inspirePromptContainer');
                if (promptContainer) {
                    promptContainer.remove();
                }
            }
        });
        chatInputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleChatSubmit();
        });
        chatInputField.addEventListener('focus', () => {
            document.querySelector('.chat-input-bar').style.borderColor = 'rgba(124, 93, 250, 0.4)';
        });
        chatInputField.addEventListener('blur', () => {
            document.querySelector('.chat-input-bar').style.borderColor = 'rgba(0,0,0,0.05)';
        });
    }
    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', handleChatSubmit);
    }

    // 为新按钮添加反馈
    const plusBtn = document.querySelector('.plus-btn');
    const micBtn = document.querySelector('.mic-btn');
    const voiceBtn = document.querySelector('.voice-btn');

    [plusBtn, micBtn, voiceBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                btn.style.transform = 'scale(0.9)';
                setTimeout(() => btn.style.transform = '', 100);
                // 这里可以扩展实际功能，目前先做视觉反馈
            });
        }
    });

    function addBotMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message bot';
        msgDiv.innerHTML = `
            <div class="chat-content-wrap">
                <div class="bot-avatar">✨</div>
                <div class="chat-bubble typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        chatHistory.appendChild(msgDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;

        // 模拟思考和打字延迟
        setTimeout(() => {
            const bubble = msgDiv.querySelector('.chat-bubble');
            if (bubble) {
                bubble.className = 'chat-bubble';
                bubble.innerHTML = text;
                chatHistory.scrollTop = chatHistory.scrollHeight;
            }
        }, 1200);
    }

    function addUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message user';
        const timeStr = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
        msgDiv.innerHTML = `
            <div class="chat-bubble">${text}</div>
            <div class="chat-time">${timeStr}</div>
        `;
        chatHistory.appendChild(msgDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function renderOptions(step) {
        chatOptionsList.innerHTML = '';
        const items = getNextBatch(step);
        items.forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.textContent = item.label;
            btn.addEventListener('click', () => {
                addUserMessage(item.label);
                chatOptionsList.innerHTML = '';

                if (analysisState.active) {
                    // Update analysis state
                    if (step === 1) analysisState.type = item;
                    if (step === 2) analysisState.style = item;
                    if (step === 3) analysisState.setting = item;
                    continueClarification();
                } else {
                    // Standard Wizard flow
                    if (step === 1) chatSelections.type = item;
                    if (step === 2) chatSelections.style = item;
                    if (step === 3) chatSelections.setting = item;

                    if (step < 3) {
                        chatStep++;
                        setTimeout(() => {
                            addBotMessage(BOT_MESSAGES[chatStep]);
                            renderOptions(chatStep);
                        }, 600);
                    } else {
                        composeAndReturn();
                    }
                }
            });
            chatOptionsList.appendChild(btn);
        });
    }

    function renderChatOptions(step) {
        const items = getNextBatch(step);
        const container = document.getElementById('chatOptionsContainer');

        // Re-trigger animation
        container.style.animation = 'none';
        container.offsetHeight;
        container.style.animation = null;

        chatOptionsList.innerHTML = '';
        const isSettingStep = step === 3;

        items.forEach((item, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';

            if (isSettingStep) {
                btn.className = 'quick-tag setting-card';
                btn.innerHTML = `
                    <div class="card-title">${item.label}</div>
                    <div class="card-desc">${item.desc}</div>
                `;
            } else {
                btn.className = 'quick-tag';
                btn.textContent = item.label;
            }

            btn.style.animationDelay = `${idx * 0.07}s`;
            btn.addEventListener('click', () => onChatOptionClick(step, item, btn));
            chatOptionsList.appendChild(btn);
        });

        chatMoreBtn.style.display = 'inline-flex';
        chatMoreBtn.style.animationDelay = `${items.length * 0.07}s`;

        container.style.display = 'flex';
        chatHistory.appendChild(container);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function onChatOptionClick(step, item, btn) {
        // Disable all options
        const allBtns = document.querySelectorAll('#chatOptionsList .quick-tag');
        allBtns.forEach(b => b.style.pointerEvents = 'none');
        btn.classList.add('selected');

        // 同时更新两套状态
        if (step === 1) { chatSelections.type = item; if (analysisState.active) analysisState.type = item; }
        if (step === 2) { chatSelections.style = item; if (analysisState.active) analysisState.style = item; }
        if (step === 3) { chatSelections.setting = item; if (analysisState.active) analysisState.setting = item; }

        setTimeout(() => {
            const container = document.getElementById('chatOptionsContainer');
            container.style.display = 'none';
            chatOptionsList.innerHTML = '';

            if (step === 3) {
                addUserMessage(`<strong>${item.label}</strong><br><span style="font-size: 0.9em; opacity: 0.7; display: block; margin-top: 4px; line-height: 1.4;">${item.desc}</span>`);
            } else {
                addUserMessage(item.label);
            }

            setTimeout(() => {
                if (analysisState.active) {
                    // 分析流：调用 continueClarification 继续补全
                    continueClarification();
                } else if (step < 3) {
                    // 标准 Wizard 流
                    chatStep = step + 1;
                    addBotMessage(BOT_MESSAGES[chatStep]);
                    setTimeout(() => renderChatOptions(chatStep), 400);
                } else {
                    composeAndReturn();
                }
            }, 600);
        }, 300);
    }

    function composeAndReturn() {
        const { type, style, setting } = chatSelections;

        // If we came from the analysis flow, preserve their original prompt
        if (analysisState.background) {
            savedPrompt = `Your Concept: ${analysisState.background}\nGame Type: ${type.label}\nArt Style: ${style.label}\nSetting: ${setting.label}`;
            addBotMessage('<div class="selection-summary"><div class="summary-title">I\'ve finalized your game plan:</div><div class="summary-item"><strong>Your Concept:</strong> ' + analysisState.background + '</div><div class="summary-item"><strong>Game Type:</strong> ' + type.label + '</div><div class="summary-item"><strong>Art Style:</strong> ' + style.label + '</div><div class="summary-item"><strong>Setting:</strong> ' + setting.label + '</div></div>');
        } else {
            savedPrompt = `Your Concept: ${setting.desc}\nGame Type: ${type.label}\nArt Style: ${style.label}\nSetting: ${setting.label}`;
            addBotMessage('<div class="selection-summary"><div class="summary-title">I\'ve analyzed your choices and here\'s the game plan:</div><div class="summary-item"><strong>Game Type:</strong> ' + type.label + '</div><div class="summary-item"><strong>Art Style:</strong> ' + style.label + '</div><div class="summary-item"><strong>Game Setting:</strong> ' + setting.label + '</div><div class="summary-item"><strong>Background/Story:</strong> ' + setting.desc + '</div></div>');
        }

        setTimeout(() => {
            // Focus on the final summary by scrolling it to the top
            const messages = chatHistory.querySelectorAll('.chat-message');
            const summaryMessage = messages[messages.length - 1];
            if (summaryMessage) {
                summaryMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            chatHistory.classList.add('is-generating');

            // UI Transition: hide chat input
            const inputArea = document.querySelector('.chat-input-wrapper');
            if (inputArea) inputArea.style.display = 'none';

            // Move progress bar into chat
            progressContainer.style.display = 'flex';
            chatHistory.appendChild(progressContainer);

            // Ensure scroll to see the progress bar
            setTimeout(() => {
                chatHistory.scrollTop = chatHistory.scrollHeight;
            }, 100);

            // Start animation
            runGenerationAnimation();
        }, 1200);
    }

    function openInspireView() {
        mainHero.style.display = 'none';
        inspireView.style.display = 'flex';

        chatStep = 1;
        chatSelections = { type: null, style: null, setting: null };
        chatShown = { 1: new Set(), 2: new Set(), 3: new Set() };
        chatCurrent = { 1: [], 2: [], 3: [] };

        chatHistory.innerHTML = '';
        chatOptionsList.innerHTML = '';
        document.getElementById('chatOptionsContainer').style.display = 'none';

        // Initial chat flow
        setTimeout(() => {
            addBotMessage("Hey there! What kind of game do you want to create?");
            setTimeout(() => {
                addUserMessage("Inspire me!");
                setTimeout(() => {
                    addBotMessage(BOT_MESSAGES[1]);
                    setTimeout(() => renderChatOptions(1), 400);
                }, 800);
            }, 800);
        }, 400);
    }

    // Event Listeners
    if (inspireEntryBtn) {
        inspireEntryBtn.addEventListener('click', openInspireView);
    }

    if (chatCloseBtn) {
        chatCloseBtn.addEventListener('click', () => {
            inspireView.style.display = 'none';
            mainHero.style.display = 'flex';

            // Reset states so user can restart the flow
            analysisState.active = false;
            analysisState.type = null;
            analysisState.style = null;
            analysisState.setting = null;
            analysisState.background = null;

            // Restore UI elements that might have been hidden
            const inputArea = document.querySelector('.chat-input-wrapper');
            if (inputArea) inputArea.style.display = 'flex';
            chatHistory.classList.remove('is-generating');

            // Hide and move progress container back to main hero
            progressContainer.style.display = 'none';
            mainHero.appendChild(progressContainer);

            // Reset progress steps for next time
            document.querySelectorAll('.step').forEach(step => {
                step.classList.remove('active', 'completed');
            });
            if (progressBarFill) progressBarFill.style.width = '0%';
            if (progressText) progressText.textContent = '0%';
        });
    }

    if (chatMoreBtn) {
        let moreThrottle = false;
        chatMoreBtn.addEventListener('click', () => {
            if (moreThrottle) return;
            moreThrottle = true;
            chatMoreBtn.classList.add('spinning');
            setTimeout(() => {
                chatMoreBtn.classList.remove('spinning');
                moreThrottle = false;
            }, 420);
            renderChatOptions(chatStep);
        });
    }

    // Modal & Success State Elements
    const emailModal = document.getElementById('emailModal');
    const emailSubmitForm = document.getElementById('emailSubmitForm');
    const modalEmailInput = document.getElementById('modalEmailInput');
    const modalEmailSubmitBtn = document.getElementById('modalEmailSubmitBtn');
    const closeEmailModalBtn = document.getElementById('closeEmailModalBtn');

    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const successStateContainer = document.getElementById('successStateContainer');
    const newIdeaBtn = document.getElementById('newIdeaBtn');

    // Sidebar Elements
    const historySidebar = document.getElementById('historySidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const historyList = document.getElementById('historyList');
    const joinedCountEl = document.getElementById('joinedCount');

    let currentMode = 'prompt'; // 'prompt' or 'email'
    let savedPrompt = ''; // Store the user's prompt

    // Initialize Joined Count
    let currentJoinedCount = parseInt(localStorage.getItem('droi_ai_joined_count') || '842', 10);
    if (joinedCountEl) {
        joinedCountEl.textContent = `${currentJoinedCount} people`;
    }

    // Sidebar Toggle
    sidebarToggle.addEventListener('click', () => {
        historySidebar.classList.toggle('open');
    });

    // Sidebar Close Button (mobile)
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', () => {
            historySidebar.classList.remove('open');
        });
    }

    // Local Storage Logic
    function loadHistory() {
        const historyData = JSON.parse(localStorage.getItem('droi_ai_history') || '[]');
        historyList.innerHTML = '';
        if (historyData.length === 0) {
            historyList.innerHTML = '<div style="color: #6b6972; font-size: 0.875rem; text-align: center; margin-top: 2rem;">No previous inspirations found.</div>';
            return;
        }

        historyData.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `
                <div class="history-item-date">${new Date(item.timestamp).toLocaleString()}</div>
                <div class="history-item-text">${item.text}</div>
                <button class="history-delete-btn" aria-label="Delete history">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            `;

            // Item click to populate prompt
            div.addEventListener('click', () => {
                if (currentMode === 'prompt') {
                    mainInput.value = item.text;
                    historySidebar.classList.remove('open');
                }
            });

            // Delete button click
            const deleteBtn = div.querySelector('.history-delete-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent item click
                historyData.splice(index, 1);
                localStorage.setItem('droi_ai_history', JSON.stringify(historyData));
                loadHistory(); // Reload UI
            });

            historyList.appendChild(div);
        });
    }

    function saveToHistory(text) {
        if (!text) return;
        const historyData = JSON.parse(localStorage.getItem('droi_ai_history') || '[]');
        historyData.unshift({ text: text, timestamp: Date.now() });
        if (historyData.length > 20) historyData.pop();
        localStorage.setItem('droi_ai_history', JSON.stringify(historyData));
        loadHistory();
    }

    // Initialize History
    loadHistory();

    // Modal Close Logic -> Transition to Success State
    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
        setTimeout(() => {
            successModal.style.display = 'none';
            // Only show legacy success state if we are NOT in the chat view
            if (inspireView.style.display !== 'flex') {
                // Hide previous elements
                form.style.display = 'none';
                if (progressContainer) progressContainer.style.setProperty('display', 'none', 'important');
                backToPromptBtn.style.display = 'none';
                // Show new success state
                successStateContainer.style.display = 'flex';
            }
        }, 300); // match CSS transition
    });

    // Email Modal Submit Logic
    if (emailSubmitForm) {
        emailSubmitForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = modalEmailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            modalEmailSubmitBtn.disabled = true;
            modalEmailSubmitBtn.textContent = 'Sending...';

            const formData = new FormData();
            formData.append("access_key", "ad7acb48-28cd-4aca-9a3f-b497205b84b9");
            formData.append("email", email);
            formData.append("prompt", savedPrompt);
            formData.append("subject", "New Droi AI Waitlist Submission (Inspire Me)");

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
                .then(async response => {
                    modalEmailSubmitBtn.disabled = false;
                    modalEmailSubmitBtn.textContent = 'Send to Email';

                    if (response.status === 200) {
                        currentJoinedCount++;
                        const joinedCountEl = document.getElementById('joinedCount');
                        if (joinedCountEl) joinedCountEl.textContent = `${currentJoinedCount} people`;
                        localStorage.setItem('droi_ai_joined_count', currentJoinedCount.toString());

                        // Hide email modal
                        emailModal.classList.remove('active');
                        setTimeout(() => { emailModal.style.display = 'none'; }, 300);

                        // Show success modal
                        if (successModal) {
                            successModal.style.display = 'flex';
                            successModal.offsetWidth;
                            successModal.classList.add('active');
                        }

                        // Append bot messages
                        addBotMessage("✨ All systems go! Your game assets and logic are finalized. We'll send it to your inbox within 15 working days");
                        addBotMessage("Would you like to explore another creative spark?");

                        const msgDiv = document.createElement('div');
                        msgDiv.className = 'chat-message bot';
                        msgDiv.innerHTML = `
                        <div class="chat-content-wrap">
                            <div class="bot-avatar" style="opacity:0">✨</div>
                            <div class="chat-options-list" style="margin-top: 10px;">
                                <button type="button" class="inspire-entry-btn" id="chatNewIdeaBtn" style="margin-top: 10px; font-size: 0.9rem;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sparkle-icon">
                                        <path d="M12 3v18M3 12h18M6.3 6.3l11.4 11.4M6.3 17.7l11.4-11.4" opacity="0.3"></path>
                                        <path d="M12 1v22M1 12h22M4.2 4.2l15.6 15.6M4.2 19.8l15.6-15.6" stroke="currentColor"></path>
                                    </svg>
                                    Start New Idea
                                </button>
                            </div>
                        </div>
                    `;
                        chatHistory.appendChild(msgDiv);
                        chatHistory.scrollTop = chatHistory.scrollHeight;

                        msgDiv.querySelector('#chatNewIdeaBtn').addEventListener('click', resetChat);
                    } else {
                        throw new Error("Form submission failed");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Something went wrong with the submission. Please try again.");
                    modalEmailSubmitBtn.disabled = false;
                    modalEmailSubmitBtn.textContent = 'Send to Email';
                });
        });
    }

    if (closeEmailModalBtn) {
        closeEmailModalBtn.addEventListener('click', () => {
            emailModal.classList.remove('active');
            setTimeout(() => { emailModal.style.display = 'none'; }, 300);

            addBotMessage("No problem! You can always share an email with me later if you change your mind.");
            addBotMessage("Would you like to explore another creative spark?");

            const msgDiv = document.createElement('div');
            msgDiv.className = 'chat-message bot';
            msgDiv.innerHTML = `
                <div class="chat-content-wrap">
                    <div class="bot-avatar" style="opacity:0">✨</div>
                    <div class="chat-options-list" style="margin-top: 10px;">
                        <button type="button" class="inspire-entry-btn" id="chatNewIdeaBtn" style="margin-top: 10px; font-size: 0.9rem;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sparkle-icon">
                                <path d="M12 3v18M3 12h18M6.3 6.3l11.4 11.4M6.3 17.7l11.4-11.4" opacity="0.3"></path>
                                <path d="M12 1v22M1 12h22M4.2 4.2l15.6 15.6M4.2 19.8l15.6-15.6" stroke="currentColor"></path>
                            </svg>
                            Start New Idea
                        </button>
                    </div>
                </div>
            `;
            chatHistory.appendChild(msgDiv);
            chatHistory.scrollTop = chatHistory.scrollHeight;

            msgDiv.querySelector('#chatNewIdeaBtn').addEventListener('click', resetChat);
        });
    }

    function resetChat() {
        // UI View Transition
        if (inspireView) inspireView.style.display = 'none';
        if (mainHero) mainHero.style.display = 'flex';

        // Hide success states
        successStateContainer.style.display = 'none';

        // Reset state variables
        currentMode = 'prompt';
        savedPrompt = '';
        chatStep = 1;
        chatSelections = { type: null, style: null, setting: null };
        chatShown = { 1: new Set(), 2: new Set(), 3: new Set() };
        chatCurrent = { 1: getNextBatch(1), 2: getNextBatch(2), 3: getNextBatch(3) };
        analysisState.active = false;

        // Reset Form UI
        mainInput.value = '';
        localStorage.removeItem('droi_prompt_draft');
        mainInput.type = 'text';
        mainInput.placeholder = 'Enter your creative prompt~';
        form.classList.remove('email-mode');
        form.classList.add('prompt-mode');

        // Reset Button UI
        submitBtn.innerHTML = 'Create';
        submitBtn.disabled = false;

        // Hide back button
        backToPromptBtn.style.display = 'none';

        // Restore UI visibility
        form.style.display = 'flex';
        statsContainer.style.display = 'flex';
        if (inspireSection) inspireSection.style.display = 'flex';

        // CRITICAL: Move progress container back to main hero
        if (progressContainer) {
            mainHero.appendChild(progressContainer);
            // We keep it visible if it was already showing, 
            // BUT if we want a full reset, we might want to hide it.
            // Let's reset the actual progress values here:
            if (progressBarFill) progressBarFill.style.width = '0%';
            if (progressText) progressText.textContent = '0%';
            if (progressMessage) progressMessage.style.display = 'none';
            document.querySelectorAll('.step').forEach(step => {
                step.classList.remove('active', 'completed');
            });
            
            // Hide it until the next generation starts
            // Wait: User wants it to "一直保持展示" (always show)
            // But for a NEW idea, we should probably hide it to avoid confusion.
            // Let's hide it ONLY if they actually click Start New Idea.
            progressContainer.style.display = 'none';
        }

        // Reset chat history and options
        chatHistory.innerHTML = '';
        chatHistory.classList.remove('is-generating');
        chatOptionsList.innerHTML = '';
        document.getElementById('chatOptionsContainer').style.display = 'none';

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Helper to get next batch (already defined at top)
    // newIdeaBtn listener
    newIdeaBtn.addEventListener('click', resetChat);

    const charCountWarning = document.getElementById('charCountWarning');

    // Textarea Auto-resize and Cursor Logic
    mainInput.addEventListener('input', function () {
        if (currentMode === 'prompt') {
            const length = this.value.length;
            const remaining = 2000 - length;

            // Show warning if over 1500 chars
            if (length >= 1500) {
                charCountWarning.style.display = 'block';
                charCountWarning.textContent = `最多支持文案上线在2000字符，还剩余${remaining}个字符可输入`;
                if (remaining <= 100) {
                    charCountWarning.style.color = '#ef4444'; // Red if very close
                } else {
                    charCountWarning.style.color = 'var(--accent-yellow)';
                }
            } else {
                charCountWarning.style.display = 'none';
            }

            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';

            // Auto-save draft to prevent data loss
            localStorage.setItem('droi_prompt_draft', this.value);
        }
    });

    // Restore draft on load
    const savedDraft = localStorage.getItem('droi_prompt_draft');
    if (savedDraft && mainInput) {
        mainInput.value = savedDraft;
        // Trigger resize
        mainInput.style.height = 'auto';
        mainInput.style.height = mainInput.scrollHeight + 'px';
    }

    mainInput.addEventListener('focus', function () {
        if (currentMode === 'prompt' && this.value.trim() !== '') {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';

            // Move cursor to the end
            const len = this.value.length;
            setTimeout(() => {
                this.setSelectionRange(len, len);
            }, 0);
        }
    });

    mainInput.addEventListener('blur', function () {
        if (currentMode === 'prompt') {
            // Shrink back to 1 row
            this.style.height = '56px';
        }
    });

    // Handle keyboard events (Enter for submit, ArrowUp for history)
    mainInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        } else if (e.key === 'ArrowUp' && currentMode === 'prompt') {
            const historyData = JSON.parse(localStorage.getItem('droi_ai_history') || '[]');
            if (historyData.length > 0) {
                e.preventDefault(); // Prevent default cursor moving
                this.value = historyData[0].text;
                // Auto-resize
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
                // Enter edit mode by selecting the text
                this.select();
            }
        }
    });

    // Back Button Logic
    backToPromptBtn.addEventListener('click', () => {
        currentMode = 'prompt';

        // Hide back button and progress UI
        backToPromptBtn.style.display = 'none';
        progressContainer.style.display = 'none';

        // Restore prompt mode
        form.classList.remove('email-mode');
        form.classList.add('prompt-mode');
        mainInput.placeholder = 'Enter your creative prompt~';
        mainInput.value = savedPrompt; // Restore their text

        // Auto-resize textarea to fit restored prompt
        mainInput.style.height = 'auto';
        mainInput.style.height = (mainInput.scrollHeight) + 'px';

        submitBtn.innerHTML = 'Create';
        submitBtn.disabled = false;

        if (statsContainer) statsContainer.style.display = 'flex';
        if (inspireSection) inspireSection.style.display = 'flex';
        mainInput.focus();
    });

    // Animation Sequence Logic with Progress Bar
    async function runGenerationAnimation() {
        progressContainer.style.display = 'flex';
        statsContainer.style.display = 'none';
        progressMessage.style.display = 'none';

        if (progressBarFill) progressBarFill.style.width = '0%';
        if (progressText) progressText.textContent = '0%';
        if (progressBarBg) progressBarBg.style.display = 'block';

        const step1 = document.getElementById('step1');
        const step2 = document.getElementById('step2');
        const step3 = document.getElementById('step3');

        const completeStep = (stepElement) => {
            stepElement.classList.remove('active');
            stepElement.classList.add('completed');
        };

        const activateStep = (stepElement) => {
            stepElement.classList.add('active');
        };

        let currentProgress = 0;
        const targetProgress = Math.floor(Math.random() * (92 - 82 + 1)) + 82;

        // Start Progress Bar
        const progressInterval = setInterval(() => {
            currentProgress += 1;
            if (progressBarFill) progressBarFill.style.width = currentProgress + '%';
            if (progressText) progressText.textContent = currentProgress + '%';

            if (currentProgress >= targetProgress) {
                clearInterval(progressInterval);
                if (progressMessage) progressMessage.style.display = 'block';

                // Keep step 3 active (spinning) indefinitely, wait a bit, then switch to email
                // STAY IN CHAT and trigger email flow
                setTimeout(() => {
                    // Show Email Modal
                    if (emailModal) {
                        emailModal.style.display = 'flex';
                        emailModal.offsetWidth;
                        emailModal.classList.add('active');
                        modalEmailInput.focus();
                    }
                }, 2000);
            }
        }, 120); // Testing mode: ~10 seconds total to reach ~85%

        // Start Steps Sequence asynchronously
        // Step 1: ~3 seconds
        activateStep(step1);
        await new Promise(r => setTimeout(r, 3000));
        completeStep(step1);

        // Step 2: ~3 seconds
        activateStep(step2);
        await new Promise(r => setTimeout(r, 3000));
        completeStep(step2);

        // Step 3
        activateStep(step3);
        // Step 3 never explicitly completes, it gets interrupted by the progress bar reaching its limit
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const inputValue = mainInput.value.trim();

        if (currentMode === 'prompt') {
            if (!inputValue) return;

            savedPrompt = inputValue;
            saveToHistory(savedPrompt);
            localStorage.removeItem('droi_prompt_draft');

            // 完整重置 chat 状态
            chatStep = 1;
            chatSelections = { type: null, style: null, setting: null };
            chatShown = { 1: new Set(), 2: new Set(), 3: new Set() };
            chatCurrent = { 1: [], 2: [], 3: [] };
            analysisState = { active: false, type: null, style: null, setting: null, background: null };

            // UI Transition: Enter Chat View
            inspireView.style.display = 'flex';
            mainHero.style.display = 'none';
            chatHistory.innerHTML = '';
            chatHistory.classList.remove('is-generating');
            chatOptionsList.innerHTML = '';
            document.getElementById('chatOptionsContainer').style.display = 'none';

            // 恢复输入区域可见性（进度条完成后可能被隐藏）
            const chatInputWrapper = document.querySelector('.chat-input-wrapper');
            if (chatInputWrapper) chatInputWrapper.style.display = '';

            // 添加用户消息并启动分析
            addUserMessage(savedPrompt);
            startAnalysisFlow(savedPrompt);

            // 自动聚焦到 chat 输入框
            setTimeout(() => { if (chatInputField) chatInputField.focus(); }, 500);

        }
    });

    // 1. 先生成星光效果，这样后续才能被 querySelectorAll 抓取到
    function createStarlights() {
        const container = document.getElementById('starlightContainer');
        if (!container) return;

        const colors = ['rgba(164, 130, 255, 0.9)', 'rgba(240, 147, 251, 0.9)', 'rgba(129, 140, 248, 0.9)']; // 紫色、粉紫、蓝紫色
        const count = 200; // 星星数量

        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'starlight';

            // 随机大小
            const size = Math.random() * 3 + 1; // 1px - 4px
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            // 星星保持明亮清晰，稍微保留一点透明度差异增加层次
            if (i % 3 === 0) {
                star.style.opacity = '0.9';
            } else if (i % 3 === 1) {
                star.style.opacity = '0.7';
            } else {
                star.style.opacity = '0.5';
            }

            // 随机颜色
            const color = colors[Math.floor(Math.random() * colors.length)];
            star.style.background = color;
            star.style.boxShadow = `0 0 ${size * 4}px ${color}, 0 0 ${size * 8}px ${color}`;

            // 随机位置
            star.style.left = `${Math.random() * 100}vw`;
            star.style.top = `${Math.random() * 100}vh`;

            // 随机动画时长和延迟
            const duration = Math.random() * 4 + 3; // 3s - 7s
            const delay = Math.random() * 5; // 0s - 5s
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `-${delay}s`; // 负延迟让动画直接以不同进度开始

            container.appendChild(star);
        }
    }

    createStarlights();

    // 2. 探照灯移动逻辑
    const spotlightOverlay = document.querySelector('.spotlight-overlay');
    const spotlightGlow = document.querySelector('.spotlight-glow');

    // 平滑跟随参数
    let currentX = 0.5;
    let currentY = 0.5;
    let targetX = 0.5;
    let targetY = 0.5;
    const smoothing = 0.15; // 跟随速度

    document.addEventListener('mousemove', (e) => {
        // 鼠标坐标转换成百分比
        targetX = e.clientX / window.innerWidth;
        targetY = e.clientY / window.innerHeight;
    });

    // 动画循环
    function animateSpotlight() {
        // 缓动跟随
        currentX += (targetX - currentX) * smoothing;
        currentY += (targetY - currentY) * smoothing;

        // 更新渐变中心位置
        const posPercentX = currentX * 100;
        const posPercentY = currentY * 100;

        // 应用到两个层
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

    // 启动动画 (移动端可选关闭)
    if (!('ontouchstart' in window)) {
        animateSpotlight();
    }

    // 3. 鼠标波纹效果
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'spotlight-ripple';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        document.body.appendChild(ripple);

        // 扩散动画
        ripple.animate([
            { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
            { opacity: 0, transform: 'translate(-50%, -50%) scale(40)' }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => ripple.remove();
    });

    // 4. Volumetric Data Stream Wave Animation Logic
    const waveCanvas = document.getElementById('dataWaveCanvas');
    if (waveCanvas) {
        const ctx = waveCanvas.getContext('2d');
        let time = 0;

        function resizeCanvas() {
            const container = waveCanvas.parentElement;
            if (!container) return;
            waveCanvas.width = container.offsetWidth;
            waveCanvas.height = container.offsetHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const numLines = 22; // 线条密度
        const pointsPerLine = 100; // 每条线的点数
        const dataPulses = Array.from({ length: 15 }, () => ({
            lineIndex: Math.floor(Math.random() * numLines),
            progress: Math.random(),
            speed: 0.002 + Math.random() * 0.005
        }));

        function drawWave() {
            ctx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);

            const width = waveCanvas.width;
            const height = waveCanvas.height;
            const centerY = height * 0.5;

            for (let i = 0; i < numLines; i++) {
                // 深度计算: 0 为背景, 1 为前景
                const depth = i / numLines;
                const opacity = 0.05 + depth * 0.25;
                const lineWidth = 0.5 + depth * 1.5;
                const amplitude = 40 + depth * 60;
                const freq = 0.002 + depth * 0.002;

                ctx.beginPath();
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = `rgba(77, 207, 255, ${opacity})`;

                const lineOffset = i * 0.5; // 每条线的相位差

                for (let j = 0; j <= pointsPerLine; j++) {
                    const xProgress = j / pointsPerLine;
                    const x = xProgress * width;

                    // 核心波动方程: 叠加多层正弦波创造有机感
                    const wave1 = Math.sin(x * freq + time + lineOffset);
                    const wave2 = Math.sin(x * freq * 2.5 - time * 0.5 + lineOffset);
                    const wave3 = Math.cos(x * freq * 0.8 + time * 1.2);

                    const yOffset = (wave1 * 0.6 + wave2 * 0.3 + wave3 * 0.1) * amplitude;
                    const y = centerY + yOffset + (depth - 0.5) * 100; // 分层垂直分布

                    if (j === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();

                // 为某些线条添加发光粒子（拓扑点）
                if (i % 3 === 0) {
                    ctx.fillStyle = `rgba(164, 130, 255, ${opacity * 1.5})`;
                    for (let j = 0; j <= pointsPerLine; j += 10) {
                        const xProgress = j / pointsPerLine;
                        const x = xProgress * width;
                        const wave1 = Math.sin(x * freq + time + lineOffset);
                        const wave2 = Math.sin(x * freq * 2.5 - time * 0.5 + lineOffset);
                        const yOffset = (wave1 * 0.6 + wave2 * 0.3) * amplitude;
                        const y = centerY + yOffset + (depth - 0.5) * 100;

                        ctx.beginPath();
                        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            // 绘制数据脉冲 (Data Pulses)
            dataPulses.forEach(pulse => {
                pulse.progress += pulse.speed;
                if (pulse.progress > 1) {
                    pulse.progress = 0;
                    pulse.lineIndex = Math.floor(Math.random() * numLines);
                }

                const depth = pulse.lineIndex / numLines;
                const amplitude = 40 + depth * 60;
                const freq = 0.002 + depth * 0.002;
                const lineOffset = pulse.lineIndex * 0.5;

                const x = pulse.progress * width;
                const wave1 = Math.sin(x * freq + time + lineOffset);
                const wave2 = Math.sin(x * freq * 2.5 - time * 0.5 + lineOffset);
                const yOffset = (wave1 * 0.6 + wave2 * 0.3) * amplitude;
                const y = centerY + yOffset + (depth - 0.5) * 100;

                const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
                gradient.addColorStop(0.5, `rgba(77, 207, 255, ${0.4 * depth})`);
                gradient.addColorStop(1, 'rgba(77, 207, 255, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, 8, 0, Math.PI * 2);
                ctx.fill();
            });

            time += 0.015;
            requestAnimationFrame(drawWave);
        }

        drawWave();
    }

    // 5. Plexus (Mind Chain) Animation Logic
    const plexusCanvas = document.getElementById('plexusCanvas');
    if (plexusCanvas) {
        const ctx = plexusCanvas.getContext('2d');
        let points = [];
        const maxPoints = 40;
        const connectionDistance = 150;

        function resizePlexus() {
            plexusCanvas.width = plexusCanvas.offsetWidth;
            plexusCanvas.height = plexusCanvas.offsetHeight;
            initPoints();
        }

        function initPoints() {
            points = [];
            for (let i = 0; i < maxPoints; i++) {
                points.push({
                    x: Math.random() * plexusCanvas.width,
                    y: Math.random() * plexusCanvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5
                });
            }
        }

        window.addEventListener('resize', resizePlexus);
        window.initPlexus = resizePlexus;
        resizePlexus();

        function drawPlexus() {
            ctx.clearRect(0, 0, plexusCanvas.width, plexusCanvas.height);

            // Move points
            points.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > plexusCanvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > plexusCanvas.height) p.vy *= -1;
            });

            // Draw connections
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const dx = points[i].x - points[j].x;
                    const dy = points[i].y - points[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(164, 130, 255, ${0.1 * (1 - dist / connectionDistance)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw points
            points.forEach(p => {
                ctx.beginPath();
                ctx.fillStyle = 'rgba(164, 130, 255, 0.3)';
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(drawPlexus);
        }

        drawPlexus();
    }
});

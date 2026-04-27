document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('waitlistForm');
    const mainInput = document.getElementById('mainInput');
    const submitBtn = document.getElementById('mainSubmitBtn');
    const backToPromptBtn = document.getElementById('backToPromptBtn');
    
    const progressContainer = document.getElementById('progressContainer');
    const generationSteps = document.getElementById('generationSteps');
    const progressBarFill = document.getElementById('progressBarFill');
    const progressText = document.getElementById('progressText');
    const progressMessage = document.getElementById('progressMessage');
    const statsContainer = document.getElementById('statsContainer');
    
    // Quick Tags Elements
    const quickTagsContainer = document.getElementById('quickTagsContainer');
    const quickTags = document.querySelectorAll('.quick-tag');
    
    // Modal & Success State Elements
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

    // Quick Tags Logic
    if (quickTags && mainInput) {
        quickTags.forEach(tag => {
            tag.addEventListener('click', () => {
                const promptText = tag.getAttribute('data-prompt');
                mainInput.value = promptText;
                mainInput.focus();
                
                // Trigger auto-resize if needed
                mainInput.style.height = 'auto';
                mainInput.style.height = (mainInput.scrollHeight) + 'px';
            });
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
            // Hide previous elements
            form.style.display = 'none';
            progressContainer.style.display = 'none';
            backToPromptBtn.style.display = 'none';
            // Show new success state
            successStateContainer.style.display = 'flex';
        }, 300); // match CSS transition
    });

    // Reset Flow for New Idea
    newIdeaBtn.addEventListener('click', () => {
        // Hide success state
        successStateContainer.style.display = 'none';
        
        // Reset state variables
        currentMode = 'prompt';
        savedPrompt = '';
        
        // Reset Form UI
        mainInput.value = '';
        mainInput.type = 'text';
        mainInput.placeholder = 'Enter your creative prompt~';
        form.classList.remove('email-mode');
        form.classList.add('prompt-mode');
        
        // Reset Button UI
        submitBtn.innerHTML = 'Create';
        submitBtn.disabled = false;
        
        // Hide back button and show quick tags
        backToPromptBtn.style.display = 'none';
        if (quickTagsContainer) quickTagsContainer.style.display = 'flex';
        
        // Reset Progress UI
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active', 'completed');
        });
        const step4 = document.getElementById('step4');
        if(step4) step4.style.display = 'none';
        
        if(progressBarFill) progressBarFill.style.width = '0%';
        if(progressText) progressText.textContent = '0%';
        if(progressMessage) progressMessage.style.display = 'none';
        
        // Show initial elements
        form.style.display = 'flex';
        statsContainer.style.display = 'flex';
    });

    // Textarea Auto-resize and Cursor Logic
    mainInput.addEventListener('input', function() {
        if (currentMode === 'prompt') {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        }
    });

    mainInput.addEventListener('focus', function() {
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

    mainInput.addEventListener('blur', function() {
        if (currentMode === 'prompt') {
            // Shrink back to 1 row
            this.style.height = '56px';
        }
    });

    // Handle Enter key for submission (since it's a textarea now)
    mainInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });

    // Back Button Logic
    backToPromptBtn.addEventListener('click', () => {
        currentMode = 'prompt';
        
        // Hide back button and progress UI
        backToPromptBtn.style.display = 'none';
        progressContainer.style.display = 'none';
        if (quickTagsContainer) quickTagsContainer.style.display = 'flex';
        
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
        mainInput.focus();
    });

    // Animation Sequence Logic with Progress Bar
    async function runGenerationAnimation() {
        progressContainer.style.display = 'block';
        statsContainer.style.display = 'none';
        progressMessage.style.display = 'none';
        
        if(progressBarFill) progressBarFill.style.width = '0%';
        if(progressText) progressText.textContent = '0%';
        
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
        const targetProgress = Math.floor(Math.random() * (92 - 80 + 1)) + 80;
        
        // Start Progress Bar
        const progressInterval = setInterval(() => {
            currentProgress += 1;
            if(progressBarFill) progressBarFill.style.width = currentProgress + '%';
            if(progressText) progressText.textContent = currentProgress + '%';
            
            if (currentProgress >= targetProgress) {
                clearInterval(progressInterval);
                if(progressMessage) progressMessage.style.display = 'block';
                
                // Keep step 3 active (spinning) indefinitely, wait a bit, then switch to email
                setTimeout(() => {
                    currentMode = 'email';
                    form.classList.remove('prompt-mode');
                    form.classList.add('email-mode');
                    mainInput.style.height = '56px'; 
                    mainInput.placeholder = 'Enter your email...';
                    mainInput.value = '';
                    submitBtn.innerHTML = 'Send to Email';
                    submitBtn.disabled = false;
                    
                    backToPromptBtn.style.display = 'inline-flex';
                    if (quickTagsContainer) quickTagsContainer.style.display = 'none';
                    
                    progressContainer.style.display = 'none'; // Hide steps during email input
                    form.style.display = 'flex';
                    mainInput.focus();
                }, 2000);
            }
        }, 400); // 整体减慢进度条速度，匹配加长后的步骤时间 (85% 约等于 34 秒)

        // Start Steps Sequence asynchronously
        // Step 1: 7-10 seconds
        activateStep(step1);
        await new Promise(r => setTimeout(r, 7000 + Math.random() * 3000));
        completeStep(step1);

        // Step 2: 7-10 seconds
        activateStep(step2);
        await new Promise(r => setTimeout(r, 7000 + Math.random() * 3000));
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
            
            // Hide form and quick tags during animation
            form.style.display = 'none';
            if (quickTagsContainer) quickTagsContainer.style.display = 'none';
            
            // UI changes for loading
            submitBtn.disabled = true;
            
            runGenerationAnimation();

        } else if (currentMode === 'email') {
            if (!inputValue) return;
            
            // 简单邮箱验证
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(inputValue)) {
                alert("Please enter a valid email address.");
                return;
            }

            // Disable UI during submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Show Step 4 during submission
            form.style.display = 'none';
            backToPromptBtn.style.display = 'none';
            
            // Hide progress bar specifically, but show generation steps container
            progressContainer.style.display = 'block';
            if (progressBarFill) document.getElementById('progressBarBg').style.display = 'none';
            if (progressText) progressText.style.display = 'none';
            if (progressMessage) progressMessage.style.display = 'none';
            
            // Re-show previous completed steps and show step 4
            document.querySelectorAll('.step').forEach(step => step.style.display = 'flex');
            const step4 = document.getElementById('step4');
            if (step4) {
                step4.style.display = 'flex';
                step4.classList.add('active');
            }

            // Collect Form Data
            const formData = new FormData();
            formData.append("access_key", "ad7acb48-28cd-4aca-9a3f-b497205b84b9");
            formData.append("email", inputValue);
            formData.append("prompt", savedPrompt);
            formData.append("subject", "New Droi AI Waitlist Submission");

            // Submit to Web3Forms
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(async response => {
                if (response.status === 200) {
                    if (step4) {
                        step4.classList.remove('active');
                        step4.classList.add('completed');
                    }
                    
                    // Increment joined count
                    currentJoinedCount++;
                    if (joinedCountEl) {
                        joinedCountEl.textContent = `${currentJoinedCount} people`;
                    }
                    localStorage.setItem('droi_ai_joined_count', currentJoinedCount.toString());
                    
                    await new Promise(r => setTimeout(r, 600)); // small delay for visual effect
                    
                    // Show success modal
                    successModal.style.display = 'flex';
                    // Trigger reflow
                    successModal.offsetWidth;
                    successModal.classList.add('active');
                    progressContainer.style.display = 'none';
                } else {
                    throw new Error("Form submission failed");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Something went wrong. Please try again.");
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send to Email';
                form.style.display = 'flex';
                progressContainer.style.display = 'none';
            });
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

    // 2. 探照灯效果跟随逻辑
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
});

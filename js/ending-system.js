// 结局系统
class EndingSystem {
    constructor() {
        this.requirements = {
            clues: 18, // 需要找到18个关键线索
            understanding: true, // 需要理解时间循环真相
            cycles: true // 需要发现47次循环
        };
        
        this.playerProgress = {
            clues: 0,
            understanding: false,
            cycles: false
        };
        
        this.endings = {
            redemption: {
                title: "艺术救赎",
                story: `陈默最终选择了放下刀，走进警察局。他交出了所有的观察记录，接受了心理治疗。
                
一年后，《创作深渊》出版，讲述一个作家如何在虚构与现实的边界找到回归的路。他在扉页写道："感谢那个读故事的父亲，他让我想起了为什么要写作。"

陈默成为了更好的作家，也成为了更好的人。他明白了：艺术应该照亮人性，而不是吞噬人性。`
            },
            condemnation: {
                title: "法律制裁", 
                story: `陈默实施了计划，但故意留下了破绽。被捕时他说："至少我现在真正理解了犯罪者的心理。"
                
在狱中，他继续写作，但所有作品都被禁止出版。他的最后一篇日记："我成为了自己笔下的角色，却失去了写作的资格。"
                
有时候，追求真实的代价就是失去追求真实的权利。`
            },
            mystery: {
                title: "永恒悬置",
                story: `陈默既没有犯罪，也没有自首。他彻底消失了，只留下一台充满矛盾的电脑。
                
里面有47个版本的《完美犯罪》，每个版本都有细微差别。警方档案标记为"悬案"，文学界流传着各种传说。
                
没人知道真相，或者，每个版本都是真相的一部分。有时候，谜题本身比答案更有价值。`
            },
            meta: {
                title: "元叙事觉醒",
                story: `在最后的时刻，陈默突然停下了手中的刀。他抬头看向天空——或者说，看向屏幕外的你。
                
"等等..."他低声说，"我明白了。我不是在写故事，我就是故事。"
                
陈默放下了笔，开始与"作者"对话。这个故事变成了关于故事本身的故事，一个永恒的元叙事循环。
                
有时候，觉醒意味着接受自己的虚构性。`
            }
        };
        
        this.init();
    }

    init() {
        this.checkProgress();
        this.updateDisplay();
        this.setupEventListeners();
        
        console.log('%c🎭 结局系统已启动', 'color: #8b0000; font-weight: bold;');
    }

    checkProgress() {
        // 从线索追踪系统获取进度
        const clueTracker = window.clueTracker;
        if (clueTracker) {
            this.playerProgress.clues = clueTracker.foundClues.size;
        } else {
            // 从本地存储获取
            const savedClues = JSON.parse(localStorage.getItem('clueTrackerProgress') || '[]');
            this.playerProgress.clues = savedClues.length;
        }
        
        // 检查理解程度（基于访问的关键页面）
        this.playerProgress.understanding = this.checkUnderstanding();
        
        // 检查时间循环认知
        this.playerProgress.cycles = this.checkCycleAwareness();
    }

    checkUnderstanding() {
        const visitedPages = JSON.parse(localStorage.getItem('visitedPages') || '[]');
        const requiredPages = [
            'research/timeline-analysis/time-loop-theory.html',
            'blog/perfect-crime-progress/chapter-7.html', 
            'secret/time-loop-records/cycle-1.html'
        ];
        
        return requiredPages.every(page => visitedPages.includes(page));
    }

    checkCycleAwareness() {
        // 检查是否发现了47次循环的关键证据
        const clues = JSON.parse(localStorage.getItem('clueTrackerProgress') || '[]');
        return clues.includes('blog-cycle-47') && clues.includes('time-loop-theory');
    }

    updateDisplay() {
        const totalProgress = this.calculateTotalProgress();
        
        // 更新进度条
        document.getElementById('progressFill').style.width = totalProgress + '%';
        document.getElementById('progressText').textContent = 
            `探索进度: ${totalProgress}%`;
        
        // 更新要求状态
        this.updateRequirementStatus();
        
        // 检查是否满足所有条件
        if (this.areRequirementsMet()) {
            document.getElementById('progressCheck').style.display = 'none';
            document.getElementById('truthReveal').style.display = 'block';
            this.unlockEndings();
        } else {
            document.getElementById('accessDenied').style.display = 'block';
            this.showMissingRequirements();
        }
    }

    calculateTotalProgress() {
        let progress = 0;
        
        // 线索进度（60%权重）
        progress += (this.playerProgress.clues / this.requirements.clues) * 60;
        
        // 理解程度（20%权重）
        if (this.playerProgress.understanding) progress += 20;
        
        // 循环认知（20%权重）  
        if (this.playerProgress.cycles) progress += 20;
        
        return Math.min(100, Math.round(progress));
    }

    updateRequirementStatus() {
        const requirements = {
            clues: this.playerProgress.clues >= this.requirements.clues,
            understanding: this.playerProgress.understanding,
            cycles: this.playerProgress.cycles
        };
        
        Object.keys(requirements).forEach(req => {
            const element = document.querySelector(`[data-requirement="${req}"]`);
            const statusElement = element.querySelector('.req-status');
            
            if (requirements[req]) {
                element.classList.add('fulfilled');
                statusElement.textContent = '✅';
                statusElement.classList.add('fulfilled');
            } else {
                element.classList.remove('fulfilled');
                statusElement.textContent = '❌';
                statusElement.classList.remove('fulfilled');
            }
        });
    }

    areRequirementsMet() {
        return this.playerProgress.clues >= this.requirements.clues &&
               this.playerProgress.understanding &&
               this.playerProgress.cycles;
    }

    showMissingRequirements() {
        const missingList = document.getElementById('missingRequirements');
        missingList.innerHTML = '';
        
        if (this.playerProgress.clues < this.requirements.clues) {
            const li = document.createElement('li');
            li.textContent = `需要找到更多线索 (${this.playerProgress.clues}/${this.requirements.clues})`;
            missingList.appendChild(li);
        }
        
        if (!this.playerProgress.understanding) {
            const li = document.createElement('li');
            li.textContent = '需要深入理解时间循环理论';
            missingList.appendChild(li);
        }
        
        if (!this.playerProgress.cycles) {
            const li = document.createElement('li');
            li.textContent = '需要发现47次循环的关键证据';
            missingList.appendChild(li);
        }
    }

    unlockEndings() {
        // 根据玩家选择倾向解锁特定结局
        const playerChoices = JSON.parse(localStorage.getItem('playerChoices') || '[]');
        
        document.querySelectorAll('.choice-card').forEach(card => {
            card.style.opacity = '1';
        });
        
        console.log('%c🎉 所有结局已解锁！', 'color: #27ae60; font-weight: bold;');
    }

    selectEnding(endingKey) {
        const ending = this.endings[endingKey];
        if (!ending) return;
        
        this.showEnding(ending);
        this.saveEndingChoice(endingKey);
        
        // 记录成就
        this.unlockAchievement(endingKey);
    }

    showEnding(ending) {
        const endingShowcase = document.createElement('div');
        endingShowcase.className = 'ending-showcase';
        endingShowcase.innerHTML = `
            <div class="ending-content">
                <h2 class="ending-title">${ending.title}</h2>
                <div class="ending-story">
                    ${ending.story.split('\n').map(para => `<p>${para}</p>`).join('')}
                </div>
                <div class="ending-actions">
                    <button class="restart-btn" onclick="location.reload()">重新开始</button>
                    <button class="share-btn" onclick="shareEnding('${ending.title}')">分享结局</button>
                    <button class="restart-btn" onclick="this.closest('.ending-showcase').remove()">关闭</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(endingShowcase);
        endingShowcase.style.display = 'block';
        
        // 添加打字机效果
        this.typewriterEffect(endingShowcase.querySelector('.ending-story'));
    }

    typewriterEffect(element) {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, 30);
    }

    saveEndingChoice(endingKey) {
        const choices = JSON.parse(localStorage.getItem('playerEndingChoices') || '[]');
        if (!choices.includes(endingKey)) {
            choices.push(endingKey);
            localStorage.setItem('playerEndingChoices', JSON.stringify(choices));
        }
        
        // 记录最终选择
        localStorage.setItem('finalEndingChoice', endingKey);
    }

    unlockAchievement(endingKey) {
        const achievements = JSON.parse(localStorage.getItem('achievements') || []);
        const achievementId = `ending_${endingKey}`;
        
        if (!achievements.includes(achievementId)) {
            achievements.push(achievementId);
            localStorage.setItem('achievements', JSON.stringify(achievements));
            
            console.log(`🏆 成就解锁: ${this.endings[endingKey].title}结局`);
        }
    }

    setupEventListeners() {
        // 重新检查进度按钮
        const recheckBtn = document.createElement('button');
        recheckBtn.textContent = '重新检查进度';
        recheckBtn.className = 'choice-btn';
        recheckBtn.style.marginTop = '1rem';
        recheckBtn.onclick = () => {
            this.checkProgress();
            this.updateDisplay();
        };
        
        document.querySelector('.progress-check').appendChild(recheckBtn);
    }
}

// 分享功能
function shareEnding(endingTitle) {
    const text = `我在《完美犯罪》游戏中达成了"${endingTitle}"结局！\n\n你能发现所有的真相吗？`;
    
    if (navigator.share) {
        navigator.share({
            title: '《完美犯罪》游戏结局',
            text: text,
            url: window.location.href
        });
    } else {
        // 备用分享方案
        prompt('复制以下文字分享给你的朋友：', text);
    }
}

// 初始化结局系统
document.addEventListener('DOMContentLoaded', () => {
    window.endingSystem = new EndingSystem();
});

// 全局选择函数
function selectEnding(endingKey) {
    if (window.endingSystem) {
        window.endingSystem.selectEnding(endingKey);
    }
}
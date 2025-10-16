// 线索追踪系统
class ClueTracker {
    constructor() {
        this.clues = {
            // 创作线索
            'blog-cycle-47': {
                id: 'blog-cycle-47',
                title: '博客中的时间循环暗示',
                description: '在陈默的博客中发现多次提到"第47次"和循环的概念',
                location: 'blog/perfect-crime-progress/chapter-7.html',
                category: 'creation',
                requirements: ['read-blog-chapter7'],
                unlocks: ['writing-reality']
            },
            'writing-reality': {
                id: 'writing-reality',
                title: '现实与虚构的边界模糊',
                description: '陈默在创作笔记中表现出对现实和虚构界限的困惑',
                location: 'blog/writing-notes/reality-boundary.html',
                category: 'creation',
                requirements: ['blog-cycle-47'],
                unlocks: ['chapter-7-breakdown']
            },
            // 更多线索定义...
        };
        
        this.foundClues = new Set();
        this.init();
    }

    init() {
        this.loadProgress();
        this.renderClues();
        this.updateStats();
        this.setupEventListeners();
        
        console.log('%c🔍 线索追踪系统已启动', 'color: #8b0000; font-weight: bold;');
    }

    loadProgress() {
        const saved = localStorage.getItem('clueTrackerProgress');
        if (saved) {
            this.foundClues = new Set(JSON.parse(saved));
        }
        
        // 检查URL参数中的自动解锁
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('debug') === 'true') {
            this.unlockAllClues();
        }
    }

    saveProgress() {
        localStorage.setItem('clueTrackerProgress', 
            JSON.stringify([...this.foundClues]));
    }

    unlockClue(clueId) {
        if (this.clues[clueId] && !this.foundClues.has(clueId)) {
            this.foundClues.add(clueId);
            this.saveProgress();
            this.renderClues();
            this.updateStats();
            this.showClueUnlocked(clueId);
            
            console.log(`🔓 线索解锁: ${this.clues[clueId].title}`);
        }
    }

    renderClues() {
        const clueItems = document.querySelectorAll('.clue-item');
        
        clueItems.forEach(item => {
            const clueId = item.dataset.clue;
            const clue = this.clues[clueId];
            
            if (clue) {
                // 检查是否满足解锁条件
                const requirementsMet = clue.requirements.every(req => 
                    this.foundClues.has(req));
                
                if (this.foundClues.has(clueId) || requirementsMet) {
                    item.classList.remove('locked');
                    item.classList.add('unlocked');
                    item.querySelector('.clue-icon').textContent = '🔓';
                } else {
                    item.classList.remove('unlocked');
                    item.classList.add('locked');
                    item.querySelector('.clue-icon').textContent = '🔒';
                }
            }
        });
    }

    updateStats() {
        const totalClues = Object.keys(this.clues).length;
        const foundCount = this.foundClues.size;
        const progress = Math.round((foundCount / totalClues) * 100);
        
        document.getElementById('foundClues').textContent = foundCount;
        document.getElementById('puzzleProgress').textContent = progress + '%';
        
        this.updateNextSteps();
    }

    updateNextSteps() {
        const nextSteps = document.getElementById('nextSteps');
        const availableClues = Object.values(this.clues).filter(clue => 
            !this.foundClues.has(clue.id) && 
            clue.requirements.every(req => this.foundClues.has(req))
        );
        
        nextSteps.innerHTML = '';
        
        if (availableClues.length === 0) {
            nextSteps.innerHTML = '<li>所有线索已找到！前往秘密实验室查看最终真相。</li>';
        } else {
            availableClues.forEach(clue => {
                const li = document.createElement('li');
                li.textContent = `探索: ${clue.title}`;
                nextSteps.appendChild(li);
            });
        }
    }

    showClueUnlocked(clueId) {
        const clue = this.clues[clueId];
        if (!clue) return;
        
        // 创建解锁通知
        const notification = document.createElement('div');
        notification.className = 'clue-notification';
        notification.innerHTML = `
            <h4>🔓 新线索解锁！</h4>
            <p><strong>${clue.title}</strong></p>
            <p>${clue.description}</p>
            <button onclick="this.parentElement.remove()">关闭</button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            border-left: 4px solid #28a745;
            z-index: 1000;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // 3秒后自动消失
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    setupEventListeners() {
        // 线索点击事件
        document.addEventListener('click', (e) => {
            const clueItem = e.target.closest('.clue-item.unlocked');
            if (clueItem) {
                const clueId = clueItem.dataset.clue;
                this.showClueDetail(clueId);
            }
        });
        
        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'd') {
                this.unlockAllClues();
            }
        });
    }

    showClueDetail(clueId) {
        const clue = this.clues[clueId];
        if (!clue) return;
        
        // 创建详情弹窗
        const modal = document.createElement('div');
        modal.className = 'clue-detail-modal';
        modal.innerHTML = `
            <div class="clue-detail-content">
                <button class="close-modal">&times;</button>
                <h2>${clue.title}</h2>
                <p>${clue.description}</p>
                <div class="clue-meta">
                    <p><strong>位置:</strong> ${clue.location}</p>
                    <p><strong>类别:</strong> ${this.getCategoryName(clue.category)}</p>
                </div>
                <div class="clue-actions">
                    <button onclick="window.location.href='../${clue.location}'">前往查看</button>
                    <button onclick="this.closest('.clue-detail-modal').remove()">关闭</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'block';
        
        // 关闭按钮事件
        modal.querySelector('.close-modal').onclick = () => modal.remove();
        
        // 点击背景关闭
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
    }

    getCategoryName(category) {
        const categories = {
            'creation': '创作线索',
            'research': '研究线索',
            'experiment': '实验线索'
        };
        return categories[category] || category;
    }

    unlockAllClues() {
        Object.keys(this.clues).forEach(clueId => {
            this.foundClues.add(clueId);
        });
        this.saveProgress();
        this.renderClues();
        this.updateStats();
        console.log('%c🎮 调试模式：所有线索已解锁', 'color: #e74c3c; font-weight: bold;');
    }
}

// 自动解锁某些线索的函数（在其他页面调用）
function unlockClueFromPage(clueId) {
    if (window.clueTracker) {
        window.clueTracker.unlockClue(clueId);
    } else {
        // 如果线索追踪器未加载，保存到临时存储
        const pendingUnlocks = JSON.parse(localStorage.getItem('pendingClueUnlocks') || '[]');
        if (!pendingUnlocks.includes(clueId)) {
            pendingUnlocks.push(clueId);
            localStorage.setItem('pendingClueUnlocks', JSON.stringify(pendingUnlocks));
        }
    }
}

// 初始化线索追踪系统
document.addEventListener('DOMContentLoaded', () => {
    window.clueTracker = new ClueTracker();
    
    // 处理待解锁的线索
    const pendingUnlocks = JSON.parse(localStorage.getItem('pendingClueUnlocks') || '[]');
    pendingUnlocks.forEach(clueId => {
        window.clueTracker.unlockClue(clueId);
    });
    localStorage.removeItem('pendingClueUnlocks');
});
// 404页面交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 控制台隐藏信息
    console.log('%c🔍 404页面 - 隐藏的真相', 'color: #8b0000; font-size: 16px; font-weight: bold;');
    console.log('%c这里不是终点，而是新的起点。', 'color: #666;');
    console.log('%c尝试在URL中添加参数：?access=researcher', 'color: #2f4f4f;');
    console.log('%c或者探索源代码中的隐藏注释...', 'color: #2f4f4f;');
    
    // 检查URL参数
    checkUrlParameters();
    
    // 设置时间戳
    setTimestamp();
    
    // 启动特殊效果
    startSpecialEffects();
});

// 检查URL参数
function checkUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('access') === 'researcher') {
        // 显示隐藏链接
        document.getElementById('secretLinks').style.display = 'block';
        console.log('%c🎉 研究员权限已激活！', 'color: #27ae60; font-weight: bold;');
    }
    
    if (urlParams.get('debug') === 'true') {
        // 调试模式
        showAllClues();
    }
}

// 设置动态时间戳
function setTimestamp() {
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 16);
    document.getElementById('timestamp').textContent = timestamp;
    
    // 随机循环次数（47附近）
    const loopCount = 47 + Math.floor(Math.random() * 3) - 1;
    document.getElementById('loopCount').textContent = loopCount;
}

// 揭示更多线索
function revealMoreClues() {
    const clues = document.querySelectorAll('.clue');
    clues.forEach(clue => {
        clue.style.animation = 'fadeInUp 1s ease forwards';
    });
    
    // 控制台反馈
    console.log('%c📖 更多线索已揭示', 'color: #8b0000;');
    console.log('时间循环理论：每个创作者都是时间囚徒');
    console.log('关键数字：47');
    console.log('密码提示：第一本书的出版年份');
}

// 检查时间循环
function checkTimeLoop() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    
    if (hours === 2 && minutes === 30) {
        alert('⚠️ 检测到时间异常！当前处于时间循环的关键时刻。');
        console.log('%c⏰ 时间异常确认：02:30', 'color: #e74c3c; font-weight: bold;');
    } else {
        alert('时间流动正常。但某些时刻比其他时刻更重要...');
    }
}

// 访问秘密实验室
function accessSecretLab() {
    const password = prompt('请输入访问密码（提示：第一本书的出版年份）：');
    
    if (password === '2020') {
        window.location.href = 'lab/index.html?access=granted';
    } else if (password === '47') {
        // 彩蛋密码
        alert('🎭 你发现了循环的真相！直接跳转到时间循环记录...');
        window.location.href = 'secret/time-loop-records/cycle-47.html';
    } else {
        alert('密码错误。或许你应该先找到正确的线索...');
    }
}

// 显示所有线索
function showAllClues() {
    const hiddenElements = document.querySelectorAll('[style*="display: none"]');
    hiddenElements.forEach(el => {
        el.style.display = 'block';
    });
}

// 特殊效果
function startSpecialEffects() {
    // 每47秒闪烁一次
    setInterval(() => {
        document.body.style.transition = 'all 0.5s ease';
        document.body.style.filter = 'hue-rotate(180deg)';
        
        setTimeout(() => {
            document.body.style.filter = 'hue-rotate(0deg)';
        }, 1000);
    }, 47000);
    
    // 鼠标移动效果
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.querySelector('.error-code').style.transform = 
            `translate(${x * 10 - 5}px, ${y * 10 - 5}px)`;
    });
}

// 键盘快捷键
document.addEventListener('keydown', (e) => {
    // Ctrl + Alt + 4 显示调试信息
    if (e.ctrlKey && e.altKey && e.key === '4') {
        console.log('%c🐛 调试模式激活', 'color: #e74c3c; font-weight: bold;');
        console.log('当前页面：404.html');
        console.log('隐藏链接数量：3');
        console.log('时间循环次数：47');
        showAllClues();
    }
    
    // 输入"truth"显示真相
    if (e.key === 't') {
        // 简单的作弊码检测
        let cheatCode = '';
        const cheatListener = (e) => {
            cheatCode += e.key;
            if (cheatCode.includes('truth')) {
                alert('🎯 你找到了真相！所有秘密现在对你开放。');
                window.location.href = 'secret/final-truth.html';
                document.removeEventListener('keydown', cheatListener);
            }
        };
        document.addEventListener('keydown', cheatListener);
    }
});
// 页面访问跟踪
function trackPageVisit() {
    const currentPage = window.location.pathname;
    const visitedPages = JSON.parse(localStorage.getItem('visitedPages') || '[]');
    
    if (!visitedPages.includes(currentPage)) {
        visitedPages.push(currentPage);
        localStorage.setItem('visitedPages', JSON.stringify(visitedPages));
    }
}

// 在每个页面调用
document.addEventListener('DOMContentLoaded', trackPageVisit);
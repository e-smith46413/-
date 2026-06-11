/**
 * 墨韵 — 共享 JavaScript 工具 v2.0
 */

// ========== Toast 提示 ==========
function showToast(message, duration) {
  duration = duration || 2500;
  var existing = document.querySelector('.ink-toast');
  if (existing) existing.remove();
  var toast = document.createElement('div');
  toast.className = 'ink-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(function() { if (toast.parentNode) toast.remove(); }, duration + 400);
}

// ========== 视差背景 ==========
function initParallax() {
  document.addEventListener('mousemove', function(e) {
    var bg = document.getElementById('background');
    if (bg) {
      var x = (e.clientX / window.innerWidth - 0.5) * 8;
      var y = (e.clientY / window.innerHeight - 0.5) * 8;
      bg.style.transform = 'translate(' + x + 'px, ' + y + 'px) scale(1.03)';
    }
  });
}

// ========== 设置持久化 ==========
var SETTINGS_KEY = 'moyun_user_settings';

function loadSettings() {
  try {
    var raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? JSON.parse(raw) : getDefaultSettings();
  } catch(e) { return getDefaultSettings(); }
}

function saveSettings(settings) {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch(e) {}
}

function getDefaultSettings() {
  return {
    theme: 'classic', fontSize: 'medium',
    notification: true, like: true, follow: false, email: false,
    public: true, location: false, comment: true
  };
}

// ========== 主题 & 字体应用 ==========
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  // ★ 动态注入文字颜色覆盖（Tailwind CDN 后加载，必须用 JS 强制覆盖）
  var styleId = 'theme-dynamic-overrides';
  var styleEl = document.getElementById(styleId);
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = styleId;
    document.head.appendChild(styleEl);
  }

  if (theme === 'dark') {
    styleEl.textContent =
      /* 主要文字 — 高对比度浅色 */
      '[data-theme="dark"] .text-gray-800, [data-theme="dark"] .text-gray-700, [data-theme="dark"] .text-gray-600,' +
      '[data-theme="dark"] h1, [data-theme="dark"] h2, [data-theme="dark"] h3,' +
      '[data-theme="dark"] .ink-write-label, [data-theme="dark"] .settings-item-title, [data-theme="dark"] .settings-title,' +
      '[data-theme="dark"] .brush-title, [data-theme="dark"] .stat-number, [data-theme="dark"] .stat-mini-number,' +
      '[data-theme="dark"] .action-title, [data-theme="dark"] .artwork-title, [data-theme="dark"] .info-label {' +
      '  color: rgba(235, 225, 215, 0.92) !important;' +
      '}' +
      /* 主要文字 — 高对比度浅色（续） */
      '[data-theme="dark"] a:not(.ink-nav-link):not(.ink-write-btn):not(.follow-btn) {' +
      '  color: rgba(220, 195, 160, 0.9) !important;' +
      '}' +
      /* 次要文字 — 中对比度 */
      '[data-theme="dark"] .text-gray-500, [data-theme="dark"] p, [data-theme="dark"] span:not(.ink-toast span):not(.ink-write-btn span):not(.send-btn span):not(.follow-btn span),' +
      '[data-theme="dark"] .artwork-author, [data-theme="dark"] .info-value, [data-theme="dark"] .list-text,' +
      '[data-theme="dark"] .upload-text {' +
      '  color: rgba(235, 225, 215, 0.72) !important;' +
      '}' +
      /* 辅助文字 — 低对比度 */
      '[data-theme="dark"] .text-gray-400, [data-theme="dark"] .text-gray-300,' +
      '[data-theme="dark"] .settings-item-desc, [data-theme="dark"] .ink-hint-text, [data-theme="dark"] .stat-label,' +
      '[data-theme="dark"] .stat-mini-label, [data-theme="dark"] .comment-meta, [data-theme="dark"] .artwork-meta,' +
      '[data-theme="dark"] .action-desc, [data-theme="dark"] .list-time {' +
      '  color: rgba(235, 225, 215, 0.45) !important;' +
      '}' +
      /* 按钮文字 — 深色（按钮背景为浅色） */
      '[data-theme="dark"] .ink-write-btn, [data-theme="dark"] .ink-write-btn *,' +
      '[data-theme="dark"] .ink-toast, [data-theme="dark"] .ink-toast *,' +
      '[data-theme="dark"] .send-btn, [data-theme="dark"] .send-btn *,' +
      '[data-theme="dark"] .follow-btn:not(.following), [data-theme="dark"] .follow-btn:not(.following) * {' +
      '  color: rgba(28, 25, 22, 0.95) !important;' +
      '}' +
      /* 危险/成功文字 */
      '[data-theme="dark"] .ink-error-text, [data-theme="dark"] .ink-error-text * {' +
      '  color: rgba(255, 130, 110, 0.92) !important;' +
      '}' +
      '[data-theme="dark"] .ink-success-text, [data-theme="dark"] .ink-success-text * {' +
      '  color: rgba(130, 210, 130, 0.92) !important;' +
      '}';
  } else if (theme === 'blue') {
    styleEl.textContent =
      /* 主要文字 — 深蓝色 */
      '[data-theme="blue"] .text-gray-800, [data-theme="blue"] .text-gray-700, [data-theme="blue"] .text-gray-600,' +
      '[data-theme="blue"] h1, [data-theme="blue"] h2, [data-theme="blue"] h3,' +
      '[data-theme="blue"] .ink-write-label, [data-theme="blue"] .settings-item-title, [data-theme="blue"] .settings-title,' +
      '[data-theme="blue"] .brush-title, [data-theme="blue"] .stat-number, [data-theme="blue"] .stat-mini-number,' +
      '[data-theme="blue"] .action-title, [data-theme="blue"] .artwork-title, [data-theme="blue"] .info-label {' +
      '  color: rgba(30, 40, 60, 0.92) !important;' +
      '}' +
      '[data-theme="blue"] a:not(.ink-nav-link):not(.ink-write-btn):not(.follow-btn) {' +
      '  color: rgba(40, 60, 100, 0.85) !important;' +
      '}' +
      /* 次要文字 */
      '[data-theme="blue"] .text-gray-500, [data-theme="blue"] p, [data-theme="blue"] span:not(.ink-toast span):not(.ink-write-btn span):not(.send-btn span):not(.follow-btn span),' +
      '[data-theme="blue"] .artwork-author, [data-theme="blue"] .info-value, [data-theme="blue"] .list-text,' +
      '[data-theme="blue"] .upload-text {' +
      '  color: rgba(30, 40, 60, 0.72) !important;' +
      '}' +
      /* 辅助文字 */
      '[data-theme="blue"] .text-gray-400, [data-theme="blue"] .text-gray-300,' +
      '[data-theme="blue"] .settings-item-desc, [data-theme="blue"] .ink-hint-text, [data-theme="blue"] .stat-label,' +
      '[data-theme="blue"] .stat-mini-label, [data-theme="blue"] .comment-meta, [data-theme="blue"] .artwork-meta,' +
      '[data-theme="blue"] .action-desc, [data-theme="blue"] .list-time {' +
      '  color: rgba(30, 40, 60, 0.48) !important;' +
      '}' +
      /* 按钮文字 */
      '[data-theme="blue"] .ink-write-btn, [data-theme="blue"] .ink-write-btn *,' +
      '[data-theme="blue"] .ink-toast, [data-theme="blue"] .ink-toast *,' +
      '[data-theme="blue"] .send-btn, [data-theme="blue"] .send-btn *,' +
      '[data-theme="blue"] .follow-btn:not(.following), [data-theme="blue"] .follow-btn:not(.following) * {' +
      '  color: rgba(245, 243, 240, 0.95) !important;' +
      '}' +
      /* 危险/成功文字 */
      '[data-theme="blue"] .ink-error-text, [data-theme="blue"] .ink-error-text * {' +
      '  color: rgba(139, 69, 19, 0.92) !important;' +
      '}' +
      '[data-theme="blue"] .ink-success-text, [data-theme="blue"] .ink-success-text * {' +
      '  color: rgba(34, 85, 34, 0.92) !important;' +
      '}';
  } else {
    // 经典主题：移除动态覆盖
    styleEl.textContent = '';
  }
}

function applyFontSize(size) {
  document.documentElement.setAttribute('data-font', size);
}

function initSettings() {
  var s = loadSettings();
  applyTheme(s.theme);
  applyFontSize(s.fontSize);
  return s;
}

// ========== 登录状态管理 ==========
var AUTH_KEY = 'moyun_auth';

function saveAuth(email, remember) {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ email: email, loggedIn: true }));
  } catch(e) {}
}

function getSavedEmail() {
  try {
    var raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw).email || '' : '';
  } catch(e) { return ''; }
}

function isLoggedIn() {
  try {
    var raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw).loggedIn === true : false;
  } catch(e) { return false; }
}

function clearAuth() {
  try { localStorage.removeItem(AUTH_KEY); } catch(e) {}
}

// ========== 强制登录检查 ==========
function requireAuth() {
  if (!isLoggedIn()) {
    var currentPage = window.location.href;
    var loginUrl = 'login.html';
    // 如果不在登录页/注册页，跳转并带上当前页面地址
    if (currentPage.indexOf('login.html') === -1 && currentPage.indexOf('register.html') === -1) {
      loginUrl += '?redirect=' + encodeURIComponent(currentPage);
    }
    window.location.href = loginUrl;
  }
}

// ========== 退出登录 ==========
function handleLogout(event) {
  if (event) event.preventDefault();
  if (confirm('确定要退出登录吗？')) {
    clearAuth();
    window.location.href = 'login.html';
  }
}

// ========== 手机导航切换 ==========
function toggleNav() {
  var links = document.getElementById('navLinks');
  var toggle = document.getElementById('navToggle');
  if (links) {
    links.classList.toggle('show');
    toggle.classList.toggle('active');
  }
}
// 点击导航链接后自动关闭菜单
document.addEventListener('click', function(e) {
  var links = document.getElementById('navLinks');
  var toggle = document.getElementById('navToggle');
  if (links && links.classList.contains('show') && !links.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)) {
    links.classList.remove('show');
    toggle.classList.remove('active');
  }
});

// ========== 获取注册用户列表 ==========
function getRegisteredUsers() {
  try { return JSON.parse(localStorage.getItem('moyun_users') || '[]'); } catch(e) { return []; }
}

// ========== 验证登录密码 ==========
function verifyLogin(email, password) {
  var users = getRegisteredUsers();
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      return users[i];
    }
  }
  return null;
}

// ========== 自动初始化 ==========
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    initParallax();
    initSettings();
  });
}

// auth.js
function getCurrentUser() {
    return localStorage.getItem('lactolyze_user');
}

function login(username) {
    localStorage.setItem('lactolyze_user', username);
    const redirect = localStorage.getItem('redirect_after_login') || 'index.html';
    localStorage.removeItem('redirect_after_login');
    window.location.href = redirect;
}

function logout() {
    localStorage.removeItem('lactolyze_user');
    window.location.reload();
}

function requireAuth(redirectUrl = 'login.html') {
    if (!getCurrentUser()) {
        localStorage.setItem('redirect_after_login', window.location.href);
        window.location.href = redirectUrl;
        return false;
    }
    return true;
}

function updateNavbarAuth() {
    const user = getCurrentUser();
    const authLi = document.getElementById('nav-auth-link');
    
    if (authLi) {
        if (user) {
            authLi.innerHTML = `<span style="font-weight:600; color:var(--accent-teal);">Hi, ${user}</span> <a href="#" onclick="logout(); return false;" style="margin-left: 12px; font-size: 0.875rem; color: #EF4444;">Logout</a>`;
        } else {
            authLi.innerHTML = `<a href="login.html">Login</a>`;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateNavbarAuth();
});

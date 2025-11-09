const TOKEN_KEY = 'idea_platform_jwt';
const CUSTOMER_KEY = 'idea_platform_customer';

function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

function getCustomer() {
    const customerData = localStorage.getItem(CUSTOMER_KEY);
    return customerData ? JSON.parse(customerData) : null;
}

function saveAuthData(token, customer) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
    updateNav();
}

function clearAuthData() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(CUSTOMER_KEY);
    updateNav();
    window.location.href = '/login'; 
}

function updateNav() {
    const customer = getCustomer();
    const navBar = document.getElementById('navbarNav');
    if (!navBar) return;

    const authItems = navBar.querySelectorAll('.nav-item');
    authItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && (link.href.includes('/auth/login') || link.href.includes('/auth/register') || link.id === 'logout-link' || link.href.includes('/auth/profile') || link.href.includes('/ideas/create'))) {
            item.remove();
        }
    });

    const ul = navBar.querySelector('.navbar-nav');

    if (customer) {
        ul.innerHTML += `
            <li class="nav-item">
                <a class="nav-link" href="/ideas/create">Nova Ideia</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/profile">Perfil (${customer.name})</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" id="logout-link">Sair</a>
            </li>
        `;
        document.getElementById('logout-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            clearAuthData();
        });
    } else {
        ul.innerHTML += `
            <li class="nav-item">
                <a class="nav-link" href="/login">Entrar</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/register">Cadastrar</a>
            </li>
        `;
    }
}

async function fetchAuth(url, options = {}) {
    const token = getToken();
    options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
    };
    
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, options);

    if (response.status === 401) {
        clearAuthData();
    }

    return response;
}

document.addEventListener('DOMContentLoaded', updateNav);

window.getToken = getToken;
window.getCustomer = getCustomer;
window.saveAuthData = saveAuthData;
window.clearAuthData = clearAuthData;
window.fetchAuth = fetchAuth;
window.updateNav = updateNav;

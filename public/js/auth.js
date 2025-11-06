// public/js/auth.js

const TOKEN_KEY = 'idea_platform_jwt';
const CUSTOMER_KEY = 'idea_platform_customer';

// Função para obter o token JWT
function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

// Função para obter os dados do usuário
function getCustomer() {
    const customerData = localStorage.getItem(CUSTOMER_KEY);
    return customerData ? JSON.parse(customerData) : null;
}

// Função para salvar o token e os dados do usuário
function saveAuthData(token, customer) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
    updateNav();
}

// Função para remover o token e os dados do usuário (Logout)
function clearAuthData() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(CUSTOMER_KEY);
    updateNav();
    window.location.href = '/login'; // Redireciona para login após logout
}

// Função para atualizar a barra de navegação com base no status de login
function updateNav() {
    const customer = getCustomer();
    const navBar = document.getElementById('navbarNav');
    if (!navBar) return;

    // Limpa a navegação existente (apenas os itens de auth)
    const authItems = navBar.querySelectorAll('.nav-item');
    authItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && (link.href.includes('/auth/login') || link.href.includes('/auth/register') || link.id === 'logout-link' || link.href.includes('/auth/profile') || link.href.includes('/ideas/create'))) {
            item.remove();
        }
    });

    const ul = navBar.querySelector('.navbar-nav');

    if (customer) {
        // Usuário logado
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
        // Usuário deslogado
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

// Função para fazer requisições autenticadas
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

    // Se for 401 (Não Autorizado), limpa o token e redireciona
    if (response.status === 401) {
        clearAuthData();
        // Não precisa de throw, pois o clearAuthData já redireciona
    }

    return response;
}

// Inicializa a navegação ao carregar a página
document.addEventListener('DOMContentLoaded', updateNav);

// Exporta as funções para uso em outros scripts
window.getToken = getToken;
window.getCustomer = getCustomer;
window.saveAuthData = saveAuthData;
window.clearAuthData = clearAuthData;
window.fetchAuth = fetchAuth;
window.updateNav = updateNav;

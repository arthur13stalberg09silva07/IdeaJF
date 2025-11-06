// public/js/ideas.js
// Arquivo para funções específicas de ideias, como CRUD e votos.

// As funções de voto e carregamento de ideias estão no script inline do home.handlebars
// para garantir que o DOM esteja pronto e o auth.js carregado.
// Este arquivo pode ser usado para funções de CRUD de ideias (criar, editar)

/**
 * Função para lidar com o envio de formulários de Ideia (Criar/Editar).
 * @param {HTMLFormElement} form O elemento do formulário.
 * @param {string} url A URL da API.
 * @param {string} method O método HTTP (POST ou PUT).
 * @param {function} successCallback A função a ser chamada em caso de sucesso.
 */
async function handleIdeaFormSubmit(form, url, method, successCallback) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await window.fetchAuth(url, {
            method: method,
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            window.showMessage(result.message || 'Ideia salva com sucesso!', 'success');
            successCallback(result);
        } else {
            window.showMessage(result.error || 'Erro ao salvar ideia.', 'danger');
        }
    } catch (error) {
        console.error('Erro de rede ou servidor:', error);
        window.showMessage('Não foi possível conectar ao servidor.', 'danger');
    }
}

window.handleIdeaFormSubmit = handleIdeaFormSubmit;

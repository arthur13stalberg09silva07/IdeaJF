// public/js/auth-forms.js

/**
 * Função genérica para lidar com o envio de formulários de autenticação (Login/Cadastro).
 * @param {HTMLFormElement} form O elemento do formulário.
 * @param {string} url A URL da API de autenticação.
 * @param {string} messageContainerId O ID do container para exibir mensagens.
 * @param {function} successCallback A função a ser chamada em caso de sucesso.
 */
async function handleAuthFormSubmit(form, url, messageContainerId, successCallback) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Remove a confirmação de senha se existir
    delete data.confirmpassword;

    const messageContainer = document.getElementById(messageContainerId);
    messageContainer.innerHTML = ''; // Limpa mensagens anteriores

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            // Sucesso
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success';
            successMessage.textContent = result.message || 'Operação realizada com sucesso!';
            messageContainer.appendChild(successMessage);
            
            // Chama o callback de sucesso (ex: salvar token e redirecionar)
            successCallback(result);
        } else {
            // Erro da API
            const errorMessage = document.createElement('div');
            errorMessage.className = 'alert alert-danger';
            errorMessage.textContent = result.error || 'Ocorreu um erro desconhecido.';
            messageContainer.appendChild(errorMessage);
        }
    } catch (error) {
        console.error('Erro de rede ou servidor:', error);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'alert alert-danger';
        errorMessage.textContent = 'Não foi possível conectar ao servidor.';
        messageContainer.appendChild(errorMessage);
    }
}

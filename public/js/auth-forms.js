async function handleAuthFormSubmit(form, url, messageContainerId, successCallback) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    delete data.confirmpassword;

    const messageContainer = document.getElementById(messageContainerId);
    messageContainer.innerHTML = ''; 

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
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success';
            successMessage.textContent = result.message || 'Operação realizada com sucesso!';
            messageContainer.appendChild(successMessage);
            
            successCallback(result);
        } else {
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

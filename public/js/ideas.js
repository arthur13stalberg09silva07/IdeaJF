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

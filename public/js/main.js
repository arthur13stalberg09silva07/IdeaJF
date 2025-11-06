// public/js/main.js
// Arquivo para funcionalidades gerais do site, como helpers de UI e mensagens.

function showMessage(message, type = 'success') {
    const messageContainer = document.getElementById('message-container');
    if (!messageContainer) {
        console.log(`Mensagem: ${message} (${type})`);
        return;
    }

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    messageContainer.appendChild(alertDiv);

    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

window.showMessage = showMessage;

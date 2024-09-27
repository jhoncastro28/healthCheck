let intervalId;

document.getElementById('startCheckBtn').addEventListener('click', () => {
    const intervalInput = document.getElementById('intervalInput').value;
    const responseDiv = document.getElementById('response');

    const interval = parseInt(intervalInput);

    if (isNaN(interval) || interval <= 0) {
        responseDiv.textContent = 'Por favor, ingrese un intervalo válido en milisegundos.';
        return;
    }

    if (intervalId) {
        clearInterval(intervalId);
    }
    const checkStatus = () => {
        responseDiv.textContent = 'Checking...';

        fetch('/middleware-endpoint')
            .then(response => response.json())
            .then(data => {
                responseDiv.innerHTML = '';
                data.forEach(serverData => {
                    const serverInfo = `
                        <p>${serverData.server}: ${serverData.status} - ${serverData.timestamp}</p>
                    `;
                    responseDiv.innerHTML += serverInfo;
                });
            })
            .catch(error => {
                responseDiv.textContent = 'Error communicating with the middleware';
                console.error('Error:', error);
            });
    };

    // Iniciar el proceso de verificación tantos milisegundos
    intervalId = setInterval(checkStatus, interval);

    // Ejecutar inmediatamente la primera verificación
    checkStatus();
});
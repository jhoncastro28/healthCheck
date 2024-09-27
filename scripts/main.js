document.getElementById('checkStatusBtn').addEventListener('click', () => {
    const responseDiv = document.getElementById('response');
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
});

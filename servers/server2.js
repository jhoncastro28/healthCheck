const express = require('express');
const app = express();
const port = 3002;

app.get('/status', (req, res) => {
    const currentTime = new Date().toISOString();
    const isTimeout = Math.random() > 0.5;

    res.json({
        status: isTimeout ? 'timeout' : 'ok',
        timestamp: currentTime
    });
});

app.listen(port, () => {
    console.log(`Server 2 listening at http://localhost:${port}`);
});
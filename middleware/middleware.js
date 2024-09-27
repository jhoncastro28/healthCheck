const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '..')));

app.get('/middleware-endpoint', async (req, res) => {
    try {
        const [response1, response2] = await Promise.all([
            fetch('http://localhost:3001/status'),
            fetch('http://localhost:3002/status')
        ]);

        const data1 = await response1.json();
        const data2 = await response2.json();

        res.json([
            { server: 'Server 1', status: data1.status, timestamp: data1.timestamp },
            { server: 'Server 2', status: data2.status, timestamp: data2.timestamp }
        ]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error communicating with servers' });
    }
});

app.listen(port, () => {
    console.log(`Middleware listening at http://localhost:${port}`);
});
const express = require('express');
const cors = require('cors');
const path = require('path');

const app =express();
const PORT=3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Salut de la serverul Node.js!');
});

app.post('/api/portfolio', (req, res) => {
    const portfolioData=req.body;
    console.log('Am primit urmatoarele date de la API:');
    console.log(portfolioData);
    res.status(201).json({
        succecs: true,
        message: 'Portfoliul a fost primit cu succes!',
        receivedData: portfolioData
    });
});

app.listen(PORT, () => {
    console.log(`Serverul rulează pe http://localhost:${PORT}`);
});
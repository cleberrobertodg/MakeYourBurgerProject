const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Caminho para o arquivo db.json
const dbFilePath = path.join(__dirname, 'db.json');

// Função para ler o arquivo db.json
function readDb() {
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
}

// Função para escrever no arquivo db.json
function writeDb(data) {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
}

// Rota para obter os ingredientes
app.get('/ingredientes', (req, res) => {
    const db = readDb();
    res.json(db.ingredientes);
});

// Rota para criar um novo burger e gravar no db.json
app.post('/burgers', (req, res) => {
    const db = readDb();
    const newBurger = req.body;

    // Assumindo que cada burger tem um id único, você pode gerar um id simples
    newBurger.id = db.burgers.length + 1;
    db.burgers.push(newBurger);

    // Escreve no db.json
    writeDb(db);

    res.json(newBurger);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

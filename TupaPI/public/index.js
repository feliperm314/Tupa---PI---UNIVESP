const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 8080;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Univesp2@23',
    database: 'weather_alert'
});

app.use(bodyParser.urlencoded({ extended: false }));

// Cria um servidor de static file para servir os arquivos javascript e css
app.use(express.static('C:\\TupaPI\\public', {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.css')) {
            res.set('Content-Type', 'text/css');
        } else if (path.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript');
        }
    }
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/register', (req, res) => {
    const phoneNumber = req.body.phone;

    // Isso vai gerar uma label única para um número de telefone
    const label = generateLabel();

    // Guardar a label e o telefone no banco de dados
    const sql = 'INSERT INTO registrations (phone, label) VALUES (?, ?)';
    db.query(sql, [phoneNumber, label], (err, result) => {
        if (err) throw err;

        // Mostrar a label pro usuário
        res.send(`Your phone number (${phoneNumber}) has been registered with label ${label}.`);
    });
});

app.listen(port, () => {
    console.log(`Server running and serving files from C:\\TupaPI\\public directory on port ${port}`);
});

function generateLabel() {
    // Isso vai gerar uma label randômica de 8 caractéres
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let label = '';
    for (let i = 0; i < 8; i++) {
        label += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return label;
}














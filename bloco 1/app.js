const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'postgres',      
    password: 'root',      
    database: 'teste_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Conectado!');
});

app.get('/api/tarefas', (req, res) => {
    db.query('SELECT * FROM tarefas', (err, results) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(results);
    });
});

app.post('/api/tarefas', (req, res) => {
    const { titulo } = req.body;
    
    if (!titulo) {
        return res.status(400).json({ erro: 'O título é obrigatório.' });
    }

    db.query('INSERT INTO tarefas (titulo) VALUES (?)', [titulo], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ id: result.insertId, titulo, concluida: 0 });
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

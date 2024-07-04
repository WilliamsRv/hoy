const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 4000;
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'mysql.cx6ywqwc6n1s.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Polula3128',
    database: 'formularioWeb',
    port: 3306
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para crear un usuario
app.post('/users', (req, res) => {
    const { usuario, email, contraseña } = req.body;
    const query = 'INSERT INTO usuarios (usuario, email, contraseña) VALUES (?, ?, ?)';
    db.query(query, [usuario, email, contraseña], (err, result) => {
        if (err) {
            console.error('Error al insertar usuario:', err);
            return res.status(500).send(err);
        }
        res.send('Usuario creado');
    });
});

// Ruta para leer todos los usuarios
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM usuarios';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://127.0.0.1:${port}`);
});

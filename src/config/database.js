// database.js
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'usuario_db',
    password: 'contraseña_db',
    database: 'nombre_db'
});

module.exports = pool;

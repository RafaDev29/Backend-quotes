

const mysql = require('mysql');

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const connection = mysql.createConnection(dbConfig);

connection.connect(error => {
  if (error) {
    console.error('Error al conectar con la base de datos:', error.message);
    process.exit(1);
  }
  console.log('Conexión a la base de datos establecida correctamente');
});

module.exports = connection;

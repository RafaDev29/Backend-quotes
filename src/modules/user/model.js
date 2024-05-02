// model.js
const pool = require('../../config/database');

function getUsers() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// Implementar otros métodos de CRUD según sea necesario...

module.exports = {
    getUsers,
    // Otros métodos...
};

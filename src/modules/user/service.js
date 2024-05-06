const db = require('../../config/database');

// Crear un nuevo usuario
exports.createUser = (userData) => {
  return new Promise((resolve, reject) => {
      // Verifica si el usuario ya existe
      const checkUserQuery = 'SELECT * FROM tb_user WHERE name = ?';
      db.query(checkUserQuery, [userData.name], (err, existingUser) => {
          if (err) {
              // En caso de error al realizar la consulta, rechaza la promesa
              return reject(err);
          }

          // Si el usuario ya existe, devuelve un mensaje indicando el error
          if (existingUser.length > 0) {
              return resolve({ message: "El usuario ya existe", status: false });
          }

          // Si el usuario no existe, establece automáticamente el idRole en 2 si no se proporciona en el cuerpo de la solicitud
          const idRole = userData.idRole || 2;

          // Crea un nuevo objeto de usuario con los datos proporcionados y el idRole
          const user = {
              name: userData.name,
              password: userData.password,
              idRole: idRole
          };

          // Inserta el nuevo usuario en la base de datos
          const insertUserQuery = 'INSERT INTO tb_user SET ?';
          db.query(insertUserQuery, user, (err, result) => {
              if (err) {
                  // En caso de error al insertar el usuario, rechaza la promesa
                  return reject(err);
              }

              // Si la inserción fue exitosa, devuelve un objeto con el mensaje y los datos del usuario
              const createdUser = {
                  id: result.insertId,
                  name: user.name,
                  idRole: user.idRole
              };
              resolve({ message: "Usuario creado exitosamente", data: createdUser, status: true });
          });
      });
  });
};

// Obtener todos los usuarios
exports.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tb_user';
        db.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Obtener un usuario por su ID
exports.getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tb_user WHERE id = ?';
        db.query(sql, userId, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result[0]);
        });
    });
};

// Actualizar un usuario por su ID
exports.updateUser = (userId, userData) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE tb_user SET ? WHERE id = ?';
        db.query(sql, [userData, userId], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

// Eliminar un usuario por su ID
exports.deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM tb_user WHERE id = ?';
        db.query(sql, userId, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

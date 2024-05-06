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
              // En caso de error, rechaza la promesa con un mensaje de error
              return reject({ message: 'Error al obtener usuarios', status: false });
          }
          // Si la consulta fue exitosa, devuelve un objeto con el resultado y un mensaje de éxito
          resolve({ message: 'Usuarios obtenidos correctamente', data: results, status: true });
      });
  });
};


// Obtener un usuario por su ID
exports.getUserById = (userId) => {
  return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM tb_user WHERE id = ?';
      db.query(sql, userId, (err, result) => {
          if (err) {
              // En caso de error al realizar la consulta, rechazar la promesa con un objeto de error
              return reject({ message: 'Error al obtener usuario por ID', status: false });
          }
          // Si se encontró el usuario, resolver la promesa con un objeto que contenga los datos del usuario
          if (result.length > 0) {
              resolve({ data: result[0], message: 'Usuario encontrado', status: true });
          } else {
              // Si no se encontró el usuario, resolver la promesa con un mensaje indicando que no se encontró
              resolve({ message: 'Usuario no encontrado', status: false });
          }
      });
  });
};
// Actualizar un usuario por su ID
// Actualizar un usuario por su ID
exports.updateUser = (userId, userData) => {
  return new Promise((resolve, reject) => {
      // Primero, verifica si el usuario existe
      const checkUserQuery = 'SELECT * FROM tb_user WHERE id = ?';
      db.query(checkUserQuery, userId, (err, existingUser) => {
          if (err) {
              return reject(err);
          }

          // Si el usuario no existe, devuelve un mensaje de error
          if (existingUser.length === 0) {
              return resolve({ message: 'Usuario no encontrado', status: false });
          }

          // Si el usuario existe, procede con la actualización
          const updateUserQuery = 'UPDATE tb_user SET ? WHERE id = ?';
          db.query(updateUserQuery, [userData, userId], (err, result) => {
              if (err) {
                  return reject(err);
              }
              resolve({ message: 'Usuario actualizado exitosamente', data: userData, status: true });
          });
      });
  });
};




// Eliminar un usuario por su ID
exports.deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
      const getUserQuery = 'SELECT name FROM tb_user WHERE id = ?';
      db.query(getUserQuery, userId, (err, userData) => {
          if (err) {
              return reject(err);
          }
          if (userData.length === 0) {
              return resolve({ message: "Usuario no encontrado", status: false });
          }
          const userName = userData[0].name;
          const deleteUserQuery = 'DELETE FROM tb_user WHERE id = ?';
          db.query(deleteUserQuery, userId, (err, result) => {
              if (err) {
                  return reject(err);
              }
              resolve({ message: "Usuario eliminado exitosamente", data: { usuario: userName }, status: true });
          });
      });
  });
};

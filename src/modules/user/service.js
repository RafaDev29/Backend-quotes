const connection = require('../../config/database');

const userService = {
  createUser: async (userData) => {
    try {
      // Consultar el id del rol "ADMIN"
      const [roleRows] = await connection.query('SELECT id FROM tb_roleUser WHERE nameRole = ?', ['ADMIN']);
    console.log("#########################################################")
      if (roleRows && roleRows.length > 0) {
        const adminRoleId = roleRows[0].id;

        // Insertar el usuario con el id del rol "ADMIN"
        const newUser = {
          name: userData.name,
          password: userData.password,
          idRole: adminRoleId
        };
        const result = await connection.query('INSERT INTO tb_user SET ?', newUser);
        return result.insertId;
      } else {
        throw new Error('No se encontró ningún rol "ADMIN" en la base de datos.');
      }
    } catch (error) {
      throw error;
    }
  },
  getUserById: async (userId) => {
    try {
      const [userRows] = await connection.query('SELECT * FROM tb_user WHERE id = ?', [userId]);
      return userRows[0];
    } catch (error) {
      throw error;
    }
  },
  updateUserById: async (userId, updatedUserData) => {
    try {
      await connection.query('UPDATE tb_user SET ? WHERE id = ?', [updatedUserData, userId]);
      return true;
    } catch (error) {
      throw error;
    }
  },
  deleteUserById: async (userId) => {
    try {
      await connection.query('DELETE FROM tb_user WHERE id = ?', [userId]);
      return true;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = userService;

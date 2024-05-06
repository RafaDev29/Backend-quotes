const userService = require('./service');

// Crear un nuevo usuario
exports.createUser = (req, res) => {
  const { nombre, contraseña } = req.body;


  // Si el campo rol no se proporciona en el cuerpo de la solicitud, establecerlo automáticamente en 2
  
  // Validar que se proporcionen todas las propiedades requeridas y no existan propiedades no deseadas
  if (!nombre || !contraseña || Object.keys(req.body).length !== 2) {
      return res.status(400).json({ message: "El cuerpo de la solicitud debe contener solo 'nombre', 'contraseña' e 'rol'.", status: false });
  }

  // Validar el tipo de datos de las propiedades
  if (typeof nombre !== 'string' || typeof contraseña !== 'string' ) {
      return res.status(400).json({ message: "Los tipos de datos de las propiedades son incorrectos.", status: false });
  }

  // Validar restricciones de longitud para nombre y contraseña
  if (nombre.length < 3 || nombre.length > 50 || contraseña.length < 6 || contraseña.length > 50) {
      return res.status(400).json({ message: "Longitud inválida para nombre o contraseña.", status: false });
  }



  // Transformar el cuerpo de la solicitud
  const transformedBody = {
      name: nombre,
      password: contraseña,

  };

  // Llamar al servicio para crear el usuario
  userService.createUser(transformedBody)
      .then(result => res.status(200).json(result))
      .catch(error => res.status(500).json({ message: error.message || 'Error al crear usuario', status: false }));
};



// Obtener todos los usuarios
exports.getAllUsers = (req, res) => {
    userService.getAllUsers()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(500).send(error.message || 'Error al obtener usuarios'));
};

// Obtener un usuario por su ID
exports.getUserById = (req, res) => {
    const userId = req.params.id;
    userService.getUserById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).send('Usuario no encontrado');
            }
            res.status(200).json(user);
        })
        .catch(error => res.status(500).send(error.message || 'Error al obtener usuario por ID'));
};

// Actualizar un usuario por su ID
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    userService.updateUser(userId, req.body)
        .then(result => res.status(200).send('Usuario actualizado exitosamente'))
        .catch(error => res.status(500).send(error.message || 'Error al actualizar usuario'));
};

// Eliminar un usuario por su ID
exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    userService.deleteUser(userId)
        .then(result => res.status(200).send('Usuario eliminado exitosamente'))
        .catch(error => res.status(500).send(error.message || 'Error al eliminar usuario'));
};

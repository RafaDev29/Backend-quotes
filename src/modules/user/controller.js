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
           
            res.status(200).json(user);
        })
        .catch(error => res.status(500).json(error.message || 'Error al obtener usuario por ID'));
};


// Actualizar un usuario por su ID
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const { name, password } = req.body;
  
  // Verificar si se proporciona tanto el nombre como la contraseña en el cuerpo de la solicitud
  if (!name || !password || Object.keys(req.body).length !== 2) {
      return res.status(400).json({ message: "El cuerpo de la solicitud debe contener solo 'name' y 'password'.", status: false });
  }
  const userData = { name, password };
  userService.updateUser(userId, userData)
      .then(result => {
          // Verificar si la respuesta contiene una propiedad de datos (data)
          if (result.data) {
            res.status(200).json({ message: result.message, data: result.data, status: result.status });
          } else if (result.status === false) {
              res.status(400).json({ message: result.message, status: result.status });
          } 
      })
      .catch(error => res.status(500).json({ message: error.message || 'Error al actualizar usuario', status: false }));
};


// Eliminar un usuario por su ID
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  userService.deleteUser(userId)
      .then(result => {
          // Verificar si la respuesta contiene un mensaje de error
          if (result.status === false) {
              // Si hay un mensaje de error, devuelve un objeto con el mensaje y el estado correspondiente
              return res.status(400).json({ message: result.message, status: result.status });
          }
          // Si la eliminación fue exitosa, devuelve un objeto con el mensaje y el nombre del usuario eliminado
          res.status(200).json({ message: result.message, data: result.data, status: result.status });
      })
      .catch(error => res.status(500).json({ message: error.message || 'Error al eliminar usuario', status: false }));
};

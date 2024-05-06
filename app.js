const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); // para utilizar .env
const path = require('path');

const app = express();

// Configuración del middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para formatear la respuesta
const formatResponse = require('./src/middleware/formatResponse');
app.use(formatResponse);

// Importar las rutas de todos los módulos
const userRoutes = require('./src/modules/user/route');
// Importa más rutas si es necesario para otros módulos

// Montar las rutas en la aplicación
app.use('/api', userRoutes);
// Monta más rutas si es necesario para otros módulos

// Middleware de registro adicional
app.use((req, res, next) => {
    console.log("Request received:", req.method, req.url);
    next();
});


// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

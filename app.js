// app.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

// Configuración del middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importar las rutas de todas las entidades
const modulesDir = path.join(__dirname, 'src', 'modules');
const modules = fs.readdirSync(modulesDir);

modules.forEach(moduleName => {
    const moduleRoutesPath = path.join(modulesDir, moduleName, 'route.js');
    if (fs.existsSync(moduleRoutesPath)) {
        const moduleRoutes = require(moduleRoutesPath);
        app.use('/', moduleRoutes);
    }
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

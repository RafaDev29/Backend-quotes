// En el archivo formatResponse.js dentro de la carpeta middleware
const formatResponse = (req, res, next) => {
    // Crear una función para enviar respuestas formateadas
    res.sendResponse = (status, message, data) => {
        res.status(status).json({ message, data, status });
    };
    next();
};

module.exports = formatResponse;

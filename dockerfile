# Usa una imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /../src/app

# Copia los archivos de la aplicación al contenedor
COPY . .

# Instala las dependencias del proyecto
RUN npm install

# Expone el puerto en el que se ejecutará el servidor de Express
EXPOSE 3000

# Comando para iniciar la aplicación cuando se inicie el contenedor
CMD ["npm", "start"]

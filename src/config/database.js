// Importamos la clase Sequelize 
const { Sequelize } = require('sequelize');

// Importamos la configuración del archivo .env
require('dotenv').config();

// Creamos una nueva instancia de Sequelize
// Utilizamos las variables de entorno para la configuración
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql', // Especificamos que estamos usando MySQL
});

// Exportamos la instancia de Sequelize para su uso en otros módulos
module.exports = { sequelize };
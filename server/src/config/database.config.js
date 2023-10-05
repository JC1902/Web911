// Módulo de configuración de las credenciales
// para la conexión a la base de datos.
// Credenciales obtenidas del archivo .env

/*const dotenv = require('dotenv');
dotenv.config();*/

require('dotenv').config();

const databaseConfig = {
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

module.exports = databaseConfig;
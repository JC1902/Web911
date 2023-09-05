/*

// Código para una conexión a la Base de datos
// de manera forma "Vanilla"

const { databaseConfig } = require('./config/database.config');
const mysql2 = require('mysql2/promise');
// const mysql = require('mysql');
// const mysql2 = require('mysql2');

const connection = mysql2.createPool({
    connectionLimit: 10,
    host: databaseConfig.host,
    database: databaseConfig.database,
    user: databaseConfig.user,
    password: databaseConfig.password
});

const getConnetion = () => {
    return connection;
};

module.exports = {
    getConnetion
};
*/

// Código para verificar la conexión a la BD,
// sólo es para desarrollo.

/*

const mysql = require('mysql');
 
const connection = mysql.createConnection({
    host: databaseConfig.host,
    database: databaseConfig.database,
    user: databaseConfig.user,
    password: databaseConfig.password
});
 
connection.connect((err) => {
    if(err) throw err;
    console.log('Conexión exitosa');
});*/

// Conexión a  la base de datos a través de Sequelize
// se crea una piscina de conexiones
// para manejar múltiples conexiones
// de los módulos. 

const databaseConfig = require('./config/database.config');
const mysql2 = require('mysql2/promise');
const { Sequelize, DataTypes } = require('sequelize');

const connection = new Sequelize (
    databaseConfig.database,
    databaseConfig.user,
    databaseConfig.password,
    {
        host: databaseConfig.host,
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

module.exports = connection;
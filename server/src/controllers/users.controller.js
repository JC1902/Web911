// Controllador con funciones
// que permiten la manipulación o
// consulta de información de la base de datos.

const pool = require('../database'); // Reemplaza '../database' con la ruta correcta al archivo que exporta tu pool de conexión

const { encrypt } = require('../../utilities/encryption');
const bcrypt = require('bcrypt');

// Obtener los datos del usuario por ID
async function getUserById(id) {
    try {
        const connection = await pool.getConnection();
        const [user] = await connection.query('SELECT name, email, phone FROM Users WHERE id = ?', id); // Desestructura el resultado para obtener el objeto directamente
	connection.release();
	return user;
    } catch (error) {
        console.error(error);
    }
}

// Obtener los datos del usuario por su email
async function getUserByEmail(email) {
    try {
        const connection = await pool.getConnection();
        const user = await connection.query('SELECT id, name, phone FROM Users WHERE email = ?', email);
        connection.release();
        return user;
    } catch (error) {
        console.error(error);
    }
}

// Obtener obtener la cantidad de emails que coincidan con el parámetro de búsqueda.
async function getEmail(email) {
    try {
        const connection = await pool.getConnection();
        const userEmail = await connection.query('SELECT email FROM  Users WHERE email = ?', email);
        connection.release();
        return userEmail;
    } catch (error) {
        console.error(error);
    }
}

// Registrar a un nuevo usuario con su email y contraseña.
async function registerUser(email, password) {
    try {
        const connection = await pool.getConnection();
        const encryptedPassword = await encrypt(password);

        // Realiza la inserción del usuario
        const insertUserQuery = 'INSERT INTO Users (email, password) VALUES (?, ?)';
        const userRegistration = await connection.query(insertUserQuery, [email, encryptedPassword]);

        // Consulta los datos del usuario recién registrado
        const selectUserQuery = 'SELECT * FROM Users WHERE id = ?';
        const [user] = await connection.query(selectUserQuery, [userRegistration.insertId]);

        connection.release();
	    console.log("Registered user:", user);
        return user;
        
    } catch (error) {
        console.error(error);
    }
}

// Comparar la contraseña del usuario con la registrada en la base de datos
async function comparePassword(email, password) {
    try {
        const connection = await pool.getConnection();
        const storedPassword = await connection.query('SELECT password FROM Users WHERE email = ?', email);
        connection.release();
        
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, storedPassword[0].password, (err, result) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(result);
            });
        });
    } catch (error) {
        console.error(error);
    }
}

// Metodo para la comparacion de los roles de usuario
async function getRole(id) {
	
    try{
        const connection = await pool.getConnection();
        const [role] = await connection.query('SELECT role FROM Users WHERE id = ?', id);
        connection.release();
        return role;
    }catch(error) {
        console.log(error);
    }
}

module.exports = {
    getUserById,
    getUserByEmail,
    getEmail,
    registerUser,
    comparePassword,
    getRole
};

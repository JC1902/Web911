/* 
Controllador de las cuentas
con funciones
que permiten la manipulación o
consulta de información de la base de datos. */

// Reemplaza '../database' con la ruta correcta al archivo que exporta tu pool de conexión
const pool = require('../database'); 

const { encrypt } = require('../../utilities/encryption');
const bcrypt = require('bcrypt');

// ----- MÉTODOS DE CRUD PARA CUENTAS -----

async function getCuentas(req, res) {

}

async function getCuentaPorNumSiniestro(req, res) {

}


async function getCuentaPorID(id) {
    try {
        const connection = await pool.getConnection();
        const [cuenta] = await connection.query('SELECT cta_numeroSiniestro, cta_folio, cta_tipoCuenta, cta_fechaCreacion FROM Cuentas WHERE cta_id = ?', id); // Desestructura el resultado para obtener el objeto directamente
        connection.release();
        return cuenta;
    } catch (error) {
        console.error(error);
    }
}

async function getCuentaPorFolio(folio) {
    try{
        const connection = await pool.getConnection();
        const [cuenta] = await connection.query('SELECT cta_id, cta_numeroSiniestro, cta_folio, cta_tipoCuenta, cta_fechaCreacion FROM Cuentas WHERE cta_folio = ?', folio);
        console.log("Cuenta Obtenida: ", cuenta);
        connection.release();
        return cuenta;
    }catch(error){
        console.error(error);
    }
}

async function postCuenta(req, res) {

}

async function updateCuentaPorID(req, res) {

}

async function updateCuentaPorNumSiniestro(req, res) {

}

async function updateCuentaPorFolio(req, res) {

}

async function deleteCuentaPorID(req, res) {

}

async function deleteCuentaPorFolio(req, res) {

}

async function deleteCuentaPorNumSiniestro(req, res) {

}



// ----- MÉTODOS USADOS PARA AUTENTICACIÓN -----

async function comparePassword(folio, password) {
    try {
        const connection = await pool.getConnection();
        const [storedPassword] = await connection.query('SELECT cta_password FROM Cuentas WHERE cta_folio = ?', folio);

        console.log("Password: ", storedPassword.cta_password);

        connection.release();
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, storedPassword.cta_password, (err, result) => {
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


async function getTipoCuentaPorID(id) {
    try{
        const connection = await pool.getConnection();
        const [tipoCuenta] = await connection.query('SELECT cta_tipoCuenta FROM Cuentas WHERE cta_id = ?', id);
        connection.release();
        return tipoCuenta;
    }catch(error) {
        console.log(error);
    }
}

async function isAdmin(req, res) {

    const cuentaFolio = req.user.cta_folio;
    const cuenta = await getCuentaPorFolio(cuentaFolio);

    console.log("Tipo de cuenta: ", cuenta.cta_tipoCuenta);

    if (cuenta.cta_tipoCuenta !== "administrador" ) {
        return false; 
    }
    else {
        return true;
    }
}

module.exports = {
    getCuentas,
    getCuentaPorID,
    getCuentaPorNumSiniestro,
    getCuentaPorFolio,
    getTipoCuentaPorID,
    postCuenta,
    updateCuentaPorID,
    updateCuentaPorNumSiniestro,
    updateCuentaPorFolio,
    deleteCuentaPorID,
    deleteCuentaPorNumSiniestro,
    deleteCuentaPorFolio,
    comparePassword,
    isAdmin
};
















// Obtener los datos del usuario por su email

/*
async function getUserByEmail(email) {
    try {
        const connection = await pool.getConnection();
        const user = await connection.query('SELECT id, name, phone FROM Users WHERE email = ?', email);
        connection.release();
        return user;
    } catch (error) {
        console.error(error);
    }
}*/

// Obtener obtener la cantidad de emails que coincidan con el parámetro de búsqueda.

/*
async function getEmail(email) {
    try {
        const connection = await pool.getConnection();
        const userEmail = await connection.query('SELECT email FROM  Users WHERE email = ?', email);
        connection.release();
        return userEmail;
    } catch (error) {
        console.error(error);
    }
}*/

// Registrar a un nuevo usuario con su email y contraseña.

/*
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
}*/
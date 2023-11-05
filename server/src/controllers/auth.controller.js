/*
 * Módulo que contiene
 * los métodos necesarios
 * para la autenticación 
 * de usuarios y validación
 * de rutas de autenticación
 */

const pool = require('../database');
// const { encrypt } = require('../../utilities/encryption');
const bcrypt = require('bcrypt');

// Método getCuentaPorFolio de un parámetro

async function getCuentaPorFolio(folio) {

    console.log('Folio de authController: ', folio);
	
	let connection;

	try {

		if ( isNaN(folio) ) {
			throw new Error('TypeError: Folio must be an Int');	
		}
		
		connection = await pool.getConnection();
		
		const getCuentaQuery = 'SELECT cta_id, cta_folio, cta_tipoCuenta, cta_fechaCreacion FROM Cuentas WHERE cta_folio = ?;';

		const cuenta = connection.query(getCuentaQuery, [folio]);

		return cuenta;

	} catch (error) {
		console.log( `Error: ${error.message}` );
	} finally {
		if (connection) connection.release();
	}
}

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

async function isAdmin(req, res) {

    // console.log('Request de isAdmin: ', req);

    const cuentaFolio = req.user[0].cta_folio;
    // console.log('Cuenta folio de isAdmin: ', cuentaFolio);
    const [cuenta] = await getCuentaPorFolio(cuentaFolio);

    // console.log('Cuenta de isAdmin: ', cuenta);

    // console.log("Tipo de cuenta: ", cuenta.cta_tipoCuenta);

    if (cuenta.cta_tipoCuenta == "administrador" ) {

        return true; 
    }
    else {

        return false;
    }
}



module.exports = { 
	getCuentaPorFolio,
	comparePassword,
	isAdmin
};

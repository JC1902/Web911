const pool = require('../database');
const bcrypt = require('bcrypt');

async function getCuentaPorFolio(folio) {
	
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
		console.error('Error: ', error.message);
        return;
	} finally {
		if (connection) connection.release();
	}
}

async function comparePassword(folio, password) {
    try {
        const connection = await pool.getConnection();
        const [storedPassword] = await connection.query('SELECT cta_password FROM Cuentas WHERE cta_folio = ?', folio);

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
        console.error('Error: ', error.message);
        return;
    }
}

async function isAdmin(req, res) {

    const cuentaFolio = req.user[0].cta_folio;
    const [cuenta] = await getCuentaPorFolio(cuentaFolio);
    

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

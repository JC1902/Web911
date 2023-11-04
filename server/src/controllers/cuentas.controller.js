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
	
	let connection;

	try {

		connection = await pool.getConnection();

		const [cuentas] = await connection.query('SELECT * FROM Cuentas;');
		console.log(cuentas);
		res.status(200).json(cuentas);

	} catch(error) {

		console.error( error.message );
		res.status(500).json({ mensaje: `No se pudieron obtener las cuentas. Error: ${error.message} ` });

	} finally {

		if ( connection ) connection.release();
	}
}

// async function getCuentaPorNumSiniestro(req, res) {

// }

/* async function getCuentaPorID(req, res){

    if(arguments.length == 1) {
        
        try {
            const connection = await pool.getConnection();
            const [cuenta] = await connection.query('SELECT cta_numeroSiniestro, cta_folio, cta_tipoCuenta, cta_fechaCreacion FROM Cuentas WHERE cta_id = ?', id); // Desestructura el resultado para obtener el objeto directamente
            connection.release();
            return cuenta;
        } catch (error) {
            console.error(error);
        }

    } else if(arguments.length == 2) {

		let connection;

		try {

			const { id } = req.params;

			if ( isNaN(id) ) {
				throw new Error('TypeError: ID must be an Int');
			}

			connection = await pool.getConnection();

			const getCuentaQuery = 'SELECT cta_id, cta_folio, cta_password, cta_tipoCuenta, cta_fechaCreacion FROM Cuentas WHERE cta_id = ?;';
			const [cuenta] = await connection.query( getCuentaQuery, [id] );

			console.log('Cuenta: ', cuenta);
			res.status(200).json({ cuenta });
			
		} catch(error) {

			console.error(error.message);
			res.status(500).json({ mensaje: `No se pudo obtener la cuenta. Error: ${error.message}` });	

		} finally {

			if (connection) connection.release();
		}
    }

} */


async function getCuentaPorID(req, res) {

	let connection;

	try {

		const { id } = req.params;

		if ( isNaN(id) ) {
			throw new Error('TypeError: ID must be an Int');
		}

		connection = await pool.getConnection();

		const getCuentaQuery = 'SELECT cta_id, cta_folio, cta_password, cta_tipoCuenta, cta_fechaCreacion FROM Cuentas WHERE cta_id = ?;';
		const [cuenta] = await connection.query( getCuentaQuery, [id] );

		console.log('Cuenta: ', cuenta);
		res.status(200).json( cuenta );
		
	} catch(error) {

		console.error(error.message);
		res.status(500).json({ mensaje: `No se pudo obtener la cuenta. Error: ${error.message}` });	

	} finally {

		if (connection) connection.release();
	}
}


// async function getCuentaPorID(id) {
//     try {
//         const connection = await pool.getConnection();
//         const [cuenta] = await connection.query('SELECT cta_numeroSiniestro, cta_folio, cta_tipoCuenta, cta_fechaCreacion FROM Cuentas WHERE cta_id = ?', id); // Desestructura el resultado para obtener el objeto directamente
//         connection.release();
//         return cuenta;
//     } catch (error) {
//         console.error(error);
//     }
// }

// async function getCuentaPorFolio(folio) {
//     try{
//         const connection = await pool.getConnection();
//         const [cuenta] = await connection.query('SELECT cta_id, cta_numeroSiniestro, cta_folio, cta_tipoCuenta, cta_fechaCreacion FROM Cuentas WHERE cta_folio = ?', folio);
//         console.log("Cuenta Obtenida: ", cuenta);
//         connection.release();
//         return cuenta;
//     }catch(error){
//         console.error(error);
//     }
// }

/*
async function getCuentaPorFolio(req, res){

    if(arguments.length == 1) {

        try{
            const folio  = req;
            const connection = await pool.getConnection();
            const [cuenta] = await connection.query('SELECT cta_id, cta_folio, cta_tipoCuenta, cta_fechaCreacion FROM Cuentas WHERE cta_folio = ?', folio);
            console.log("Cuenta Obtenida: ", cuenta);
            connection.release();
            return cuenta;
        }catch(error){
            console.error(error);
        }

    } else if (arguments.length == 2) {



    }
} */


async function getCuentaPorFolio(req, res) {

	console.log('GetCuentaPorFolio Request: ', req);

	/* let connection;

	try {

		const folio = req;
		
		if ( isNaN(folio) ) {
			throw new Error('TypeError: Folio must be an Int');
		}
        
		const connection = await pool.getConnection();

		const getCuentaQuery = 'SELECT cta_id, cta_folio, cta_tipoCuenta, cta_fechaCreacion FROM Cuentas WHERE cta_folio = ?;';

		const [cuenta] = await connection.query( getCuentaQuery, [folio] );

        console.log("Cuenta: ", cuenta);
		res.status(200).json( cuenta );

	} catch(error) {

		console.log(error.message);
		res.status(500).json({ mensaje: `No se pudo obtener la cuenta por folio. Error: ${error.message}` });

	} finally {
		if (connection) connection.release();
	} */
}


async function postCuenta(req, res) {

}

async function updateCuentaPorID(req, res) {

}

/*
async function updateCuentaPorNumSiniestro(req, res) {

} */

/*
async function updateCuentaPorFolio(req, res) {

} */

async function deleteCuentaPorID(req, res) {

}

/*
async function deleteCuentaPorFolio(req, res) {

}

async function deleteCuentaPorNumSiniestro(req, res) {

} */



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

    if (cuenta.cta_tipoCuenta == "administrador" ) {

        return true; 
    }
    else {

        return false;
    }
}

module.exports = {
    getCuentas,
    getCuentaPorID,
    // getCuentaPorNumSiniestro,
    getCuentaPorFolio,
    getTipoCuentaPorID,
    postCuenta,
    updateCuentaPorID,
    // updateCuentaPorNumSiniestro,
    // updateCuentaPorFolio,
    deleteCuentaPorID,
    // deleteCuentaPorNumSiniestro,
    // deleteCuentaPorFolio,
    comparePassword,
    isAdmin
};

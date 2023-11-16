const pool = require('../database'); 
const { encrypt } = require('../../utilities/encryption');

async function getCuentas(req, res) {
	
	let connection;

	try {

		connection = await pool.getConnection();

		const cuentas = await connection.query('SELECT cta_id, cta_folio, cta_password, cta_tipoCuenta, cta_fechaCreacion FROM Cuentas;');
		res.status(200).json(cuentas);

	} catch(error) {

		console.error('Error: ', error.message );
		res.status(500).json({ 
			mensaje: "No se pudieron obtener las cuentas.",
			error: `Error: ${error.message}` 
		});

	} finally {

		if ( connection ) connection.release();
	}
}

async function getCuentaPorID(req, res) {

	let connection;

	try {

		const { id } = req.params;

		if ( isNaN(id) ) {
			throw new Error('TypeError: ID must be an Int');
		}

		connection = await pool.getConnection();

		const getCuentaQuery = 'SELECT cta_id, cta_folio, cta_tipoCuenta, cta_fechaCreacion FROM Cuentas WHERE cta_id = ?;';
		const [cuenta] = await connection.query( getCuentaQuery, [id] );

		res.status(200).json( cuenta );
		
	} catch(error) {

		console.error('Error: ', error.message);
		res.status(500).json({ 
			mensaje: "No se pudo obtener la cuenta.",
			error: `Error: ${error.message}`
	 	});	

	} finally {
		if (connection) connection.release();
	}
}

async function getCuentaPorFolio(req, res) {

	let connection;

	try {

		const { folio } = req.params;
		
		if ( isNaN(folio) ) {
			throw new Error('TypeError: Folio must be an Int');
		}
        
		const connection = await pool.getConnection();

		const getCuentaQuery = 'SELECT cta_id, cta_folio, cta_tipoCuenta, cta_fechaCreacion FROM Cuentas WHERE cta_folio = ?;';
		const [cuenta] = await connection.query( getCuentaQuery, [folio] );

		res.status(200).json( cuenta );

	} catch(error) {

		console.log(error.message);
		res.status(500).json({ 
			mensaje: "No se pudo obtener la cuenta por folio.",
			error: `Error: ${error.message}` 
		
		});

	} finally {
		if (connection) connection.release();
	}
}

async function postCuenta(req, res) {

	let connection;

	try {
		
		const { cta_folio, cta_password, cta_tipoCuenta, cta_fechaCreacion } = req.body;

		let password = cta_password;
		password = await encrypt(cta_password);

		connection = await pool.getConnection();		
		const postCuentaQuery = 'INSERT INTO Cuentas (cta_folio, cta_password, cta_tipoCuenta, cta_fechaCreacion) VALUES (?, ?, ?, ?);';
		await connection.query( postCuentaQuery, [cta_folio, password, cta_tipoCuenta, cta_fechaCreacion] );

		res.status(200).json({ mensaje: "La cuenta fue registrada con éxito" });

	} catch(error) {

		console.error('Error: ', error.message);
		res.status(500).json({ 
			mensaje: "No se pudo registrar la cuenta.",
			error: `Error: ${error.message}`
		});

	} finally {
		if (connection) connection.release();
	}
}

async function updateCuentaPorID(req, res) {

	let connection;

	try {

		const { id } = req.params;
		const { cta_folio, cta_password, cta_tipoCuenta, cta_fechaCreacion } = req.body;

		if ( isNaN(id) ) {
			throw new Error('TypeError: id must be an Int');
		}

		let password = cta_password;
		password = await encrypt(cta_password);

		connection = await pool.getConnection();
		const updateCuentaQuery = 'UPDATE Cuentas SET cta_folio = ?, cta_password = ?, cta_tipoCuenta = ?, cta_fechaCreacion = ? WHERE cta_id = ?;';
		await connection.query( updateCuentaQuery, [cta_folio, password, cta_tipoCuenta, cta_fechaCreacion, id] );

		res.status(200).json({ mensaje: "La información de la cuenta se actualizó con éxito" });
		
	} catch(error) {

		console.error('Error: ', error.message);
		res.status(500).json({
			mensaje: "No se pudo actualizar la información de la cuenta.",
			error: `Error: ${error.message}`
		});

	} finally { 
		if (connection) connection.release();
	}
}

async function deleteCuentaPorID(req, res) {

	let connection;

	try {

		const { id } = req.params;

		connection = await pool.getConnection();

		const deleteCuentaQuery = 'DELETE FROM Cuentas WHERE cta_id = ?;'; 
		await connection.query( deleteCuentaQuery, [id] );

		res.status(200).json({ mensaje: "La cuenta fue eliminada con éxito" });

	} catch (error) {
		console.error('Error: ', error.message);
		res.status(500).json({ 
			mensaje: "No se pudo eliminar la cuenta.",
			error: `Error: ${error.message}`
		 });

	} finally {
		if (connection) connection.release();
	}
}

module.exports = {
    getCuentas,
    getCuentaPorID,
    getCuentaPorFolio,
    postCuenta,
    updateCuentaPorID,
    deleteCuentaPorID,
};

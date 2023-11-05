/*
Modulo encargado de controlador
encargado de la manipulación de
datos de la tabla Clientes de la
BD */

const pool = require('../database')

async function getClientes(req, res) {

    let connection;

    try{
        connection = await pool.getConnection();
        const [clientes] = await connection.query("SELECT * FROM Clientes;");
        console.log("Clientes: ", clientes);

        res.status(200).json(clientes);
        
    } catch(error) {
        console.error(error.message);
        res.status(500).json({ mensaje: `Error al obntener el listado de clientes. Error: ${error.messsage}`});
    } finally {
        if (connection) connection.release();
    }

}

async function getClientePorID(req, res) {

    let connection;

    try {

        const {id} = req.params;

        if( isNaN(id) ){
            throw new Error('TypeError: ID must be an Int');
        }

        connection = await pool.getConnection();
	const getClienteQuery = 'SELECT cte_apPaterno, cte_apMaterno, cte_nombres, cte_sexo, cte_correo, cte_codigoPostal, cte_calle, cte_colonia, cte_municipio, cte_estado, cte_telefono, cta_id, cta_folio FROM Clientes WHERE cte_id = ?;'
        
        const [cliente] = await connection.query( getClienteQuery, [id] );

        console.log(cliente);
        res.status(200).json(cliente);

    } catch(error) {

        console.error(error.message);
        res.status(500).json({ mensaje: `Error al obtener el cliente. Error: ${error.message}` });

    } finally {
        if (connection) connection.release();
    }

}

// async function getClientePorNumSiniestro(req, res) {

// }

async function getClientePorFolio(req, res) {

    let connection;

    try {

	    const { folio } = req.params;

        if( isNaN( folio ) ){
            throw new Error('TypeError: Folio must be an Int');
        }

        connection = await pool.getConnection();

        const getClienteQuery = 'SELECT cte_id, cte_apPaterno, cte_apMaterno, cte_nombres, cte_sexo, cte_correo, cte_codigoPostal, cte_calle, cte_colonia, cte_municipio, cte_estado cte_telefono, cta_id FROM Clientes WHERE cta_folio = ?;'
        
        const [cliente] = await connection.query( getClienteQuery, [folio] );

        console.log(cliente);
        res.status(200).json(cliente);

    } catch(error) {

        console.error(error.message);
        res.status(500).json({ mensaje: `Error al obtener el cliente. Error: ${error.message}` });

    } finally {
        if (connection) connection.release();
    }

}

async function postCliente(req, res) {


    let connection;

	try {

		const { cte_apPaterno, cte_apMaterno, cte_nombres, cte_sexo, cte_correo, cte_codigoPostal, cte_calle, cte_colonia, cte_municipio, cte_estado, cte_telefono, cta_id, cta_folio } = req.body;

        connection = await pool.getConnection();

		const postClienteQuery = 'INSERT INTO Clientes (cte_apPaterno, cte_apMaterno, cte_nombres, cte_sexo, cte_correo, cte_codigoPostal, cte_calle, cte_colonia, cte_municipio, cte_estado, cte_telefono, cta_id, cta_folio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
        
        const okPacket = await connection.query( postClienteQuery, [cte_apPaterno, cte_apMaterno, cte_nombres, cte_sexo, cte_correo, cte_codigoPostal, cte_calle, cte_colonia, cte_municipio, cte_estado, cte_telefono, cta_id, cta_folio] );

		console.log(okPacket);
		res.status(200).json({ mensaje: "Cliente registrado con éxito" });

    } catch(error) {
		console.error(error.message);
		res.status(500).json({ mensaje: `Error al registrar el cliente. Error: ${error.message}` });
    } finally {
        if (connection) connection.release();
    }

}

async function updateClientePorID(req, res) {

	let connection;

	try {

		const { id } = req.params;
		const { cte_apPaterno, cte_apMaterno, cte_nombres, cte_sexo, cte_correo, cte_codigoPostal, cte_calle, cte_colonia, cte_municipio, cte_estado, cte_telefono, cta_id, cta_folio } = req.body;

        connection = await pool.getConnection();

		const updateClienteQuery = 'UPDATE Clientes SET cte_apPaterno = ?, cte_apMaterno = ?, cte_nombres = ?, cte_sexo = ?, cte_correo = ?, cte_codigoPostal = ?, cte_calle = ?, cte_colonia = ?, cte_municipio = ?, cte_estado = ?, cte_telefono = ?, cta_id = ?, cta_folio = ? WHERE cte_id = ?;'

        const okPacket = await connection.query( updateClienteQuery, [cte_apPaterno, cte_apMaterno, cte_nombres, cte_sexo, cte_correo, cte_codigoPostal, cte_calle, cte_colonia, cte_municipio, cte_estado, cte_telefono, cta_id, cta_folio, id] );

		console.log(okPacket);
		res.status(200).json({ mensaje: "Información actualizada con éxito" });

	} catch(error) {

		console.error(error.message);
		res.status(500).json({ mensaje: `Error al actualizar la información. Error: ${error.message}` });

	} finally {
		if (connection) connection.release();
	}

}

// async function updateClientePorNumSiniestro(req, res) {

// }

// async function updateClientePorFolio(req, res) {

// }

async function deleteClientePorID(req, res) {

	let connection;

	try{

		const { id } = req.params;

		if ( isNaN(id) ) {
			throw new Error('TypeError: id must be an Int');
		}

		connection = await pool.getConnection();

		const deleteClienteQuery = 'DELETE FROM Clientes WHERE cte_id = ?;';
		const okPacket = await connection.query( deleteClienteQuery, [id] );

		console.log(okPacket);
		res.status(200).json({ mensaje: "Cliente eliminado con éxito" })

			
	} catch(error) {

		console.error(error.message);
		res.status(500).json({ mensaje: `Error al eliminar al cliente. Error: ${error.message}`});

	} finally {
		if (connection) connection.release();
	}

}

// async function deleteClientePorNumSiniestro(req, res) {
    
//}

// async function deleteClientePorFolio(req, res) {

// }


module.exports = {
    getClientes,
    getClientePorID,
    // getClientePorNumSiniestro,
    getClientePorFolio,
    postCliente,
    updateClientePorID,
    // updateClientePorNumSiniestro,
    // updateClientePorFolio,
    deleteClientePorID,
    // deleteClientePorNumSiniestro,
    // deleteClientePorFolio
}

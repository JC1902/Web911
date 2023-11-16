const pool = require('../database')

async function getClientes(req, res) {

    let connection;

    try{
        connection = await pool.getConnection();
        const clientes = await connection.query("SELECT * FROM Clientes;");
        res.status(200).json(clientes);
        
    } catch(error) {
        console.error('Error: ', error.message);
        res.status(500).json({ 
            mensaje: "Error al obntener el listado de clientes.",
            error: `Error: ${error.messsage}`
        });

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

        res.status(200).json(cliente);

    } catch(error) {

        console.error('Error: ', error.message);
        res.status(500).json({ 
            mensaje: "Error al obtener el cliente.",
            error: `Error: ${error.message}`
        });

    } finally {
        if (connection) connection.release();
    }

}

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

        res.status(200).json(cliente);

    } catch(error) {

        console.error('Error: ', error.message);
        res.status(500).json({ 
            mensaje: "Error al obtener el cliente.",
            error: `Error: ${error.message}`
        });

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
        
        await connection.query( postClienteQuery, [cte_apPaterno, cte_apMaterno, cte_nombres, cte_sexo, cte_correo, cte_codigoPostal, cte_calle, cte_colonia, cte_municipio, cte_estado, cte_telefono, cta_id, cta_folio] );

		res.status(200).json({ mensaje: "Cliente registrado con éxito" });

    } catch(error) {

		console.error('Error: ', error.message);
		res.status(500).json({ 
            mensaje: "Error al registrar el cliente.",
            error: `Error: ${error.message}`
        });

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

        await connection.query( updateClienteQuery, [cte_apPaterno, cte_apMaterno, cte_nombres, cte_sexo, cte_correo, cte_codigoPostal, cte_calle, cte_colonia, cte_municipio, cte_estado, cte_telefono, cta_id, cta_folio, id] );

		res.status(200).json({ mensaje: "Información actualizada con éxito" });

	} catch(error) {

		console.error('Error: ', error.message);
		res.status(500).json({ 
            mensaje: "Error al actualizar la información.",
            error: `Error: ${error.message}`
        });

	} finally {
		if (connection) connection.release();
	}

}

async function deleteClientePorID(req, res) {

	let connection;

	try{

		const { id } = req.params;

		if ( isNaN(id) ) {
			throw new Error('TypeError: id must be an Int');
		}

		connection = await pool.getConnection();

		const deleteClienteQuery = 'DELETE FROM Clientes WHERE cte_id = ?;';
		await connection.query( deleteClienteQuery, [id] );

		res.status(200).json({ mensaje: "Cliente eliminado con éxito" })

			
	} catch(error) {

		console.error('Error: ', error.message);
		res.status(500).json({ mensaje: `Error al eliminar al cliente. Error: ${error.message}`});

	} finally {
		if (connection) connection.release();
	}

}

module.exports = {
    getClientes,
    getClientePorID,
    getClientePorFolio,
    postCliente,
    updateClientePorID,
    deleteClientePorID,
}

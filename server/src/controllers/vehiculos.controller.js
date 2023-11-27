const pool = require('../database');
const mailer = require('../../utilities/mailer');

async function getVehiculos(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();
        const vehiculos = await connection.query('SELECT * FROM Vehiculos;');
        res.status(200).json(vehiculos);

    } catch (error) {

        console.error('Error: ', error.message);

        res.status(500).json({ 
            mensaje: "Error al devolver los vehículos",
            error: `Error: ${error.message}`        
        });
        
    } finally {
        if (connection) connection.release();
    }
}

async function getVehiculoPorID(req, res) {

    let connection;

    try {

		const {id} = req.params;

		if( isNaN(id) ){
			throw new Error('TypeErrorID');
		}

        connection = await pool.getConnection();

        const getVehiculoQuery = 'SELECT veh_folioInterno, veh_numPaseAdmision, veh_numeroSiniestro, veh_tipoVehiculo, veh_fechaIngreso, veh_fechaEgreso,veh_estatusReparacion, cta_id, cte_id, cta_folio FROM Vehiculos WHERE veh_id = ?';
        const [vehiculo] = await connection.query(getVehiculoQuery, [id]);

        res.status(200).json(vehiculo);

    } catch (error) {

        console.error('Error: ', error.message);

        res.status(500).json({ 
            mensaje: "Error al devolver el vehiculo",
            error: `Error: ${error.message}`
        });
        
    } finally {
        if (connection) connection.release();
    }
}


async function getVehiculoPorFolioInterno(req, res) {
    let connection;

    try{

		const {folio} = req.params;

		if(isNaN(folio)) {
			throw new Error('TypeErrorFolio');
		}

        connection = await pool.getConnection();

        const getVehiculoQuery = 'SELECT veh_id, veh_numPaseAdmision, veh_numeroSiniestro, veh_tipoVehiculo, veh_fechaIngreso, veh_fechaEgreso, veh_estatusReparacion, cta_id, cte_id, cta_folio FROM Vehiculos WHERE veh_folioInterno = ?';

        const [vehiculo] = await connection.query(getVehiculoQuery, [folio]);

        res.status(200).json(vehiculo);


    } catch(error) {

        console.error(error.message);

        res.status(500).json({ 
            mensaje: "Error al devolver el vehiculo", 
            error: `Error: ${error.message}`
        });

    } finally {
        if (connection) connection.release();
    }

}


async function postVehiculo(req, res) {

    let connection;

    try {

		const {veh_folioInterno, veh_numPaseAdmision, veh_numeroSiniestro, veh_tipoVehiculo, veh_fechaIngreso, veh_estatusReparacion, cta_id, cte_id, cta_folio} = req.body;

        connection = await pool.getConnection();

        const postVehiculosQuery = 'INSERT INTO Vehiculos (veh_folioInterno, veh_numPaseAdmision, veh_numeroSiniestro, veh_tipoVehiculo, veh_fechaIngreso, veh_estatusReparacion, cta_id, cte_id, cta_folio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

        await connection.query(postVehiculosQuery, [veh_folioInterno, veh_numPaseAdmision, veh_numeroSiniestro, veh_tipoVehiculo, veh_fechaIngreso, veh_estatusReparacion, cta_id, cte_id, cta_folio]);

        res.status(200).json({ mensaje: "El vehículo fue registrado con éxito" });

    } catch(error) {

        console.error(error.message);
        
        res.status(500).json({ 
            mensaje: "Error al insertar un nuevo vehiculo",
            error: `Error: ${error.message}`
         });

    } finally {
        if(connection) connection.release();
    }
}


async function updateVehiculoPorID(req, res) {

    let connection;

    try {

		const {id} = req.params;
		const {veh_folioInterno, veh_numPaseAdmision, veh_numeroSiniestro, veh_tipoVehiculo, veh_fechaIngreso, veh_fechaEgreso, veh_estatusReparacion, cta_id, cte_id, cta_folio} = req.body;

		if( isNaN(id) ) {
			throw new Error('TypeErrorID');
		}

        const estatusPrevioReparacion = await getEstatusReparacion(id);

        connection = await pool.getConnection();

        const updateVehiculoQuery = 'UPDATE Vehiculos SET veh_folioInterno = ?, veh_numPaseAdmision = ?, veh_numeroSiniestro = ?, veh_tipoVehiculo = ?, veh_fechaIngreso = ?, veh_fechaEgreso = ?, veh_estatusReparacion = ?, cta_id = ?, cte_id = ?, cta_folio = ? WHERE veh_id = ?';

        const okPacket = await connection.query(updateVehiculoQuery, [veh_folioInterno, veh_numPaseAdmision, veh_numeroSiniestro, veh_tipoVehiculo, veh_fechaIngreso, veh_fechaEgreso, veh_estatusReparacion, cta_id, cte_id, cta_folio, id] );

        if( okPacket.affectedRows >= 1 &&  estatusPrevioReparacion.veh_estatusReparacion !== veh_estatusReparacion ) {

			const getAdresseDataQuery = 'SELECT cte_nombres, cte_correo FROM Clientes WHERE cte_id = ?;';
            const [{ cte_correo, cte_nombres }] = await connection.query( getAdresseDataQuery, [cte_id] );

            await mailer.sendUpdateEmail(cte_correo, cte_nombres, veh_tipoVehiculo, veh_estatusReparacion);

        }

        res.status(200).json({mensaje: "Datos del vehiculo acualizados con éxito"});

    } catch (error) {

        console.error('Erorr: ', error.message);

        res.status(500).json({ 
            mensaje: "Error al actualizar los datos del vehículo",
            error: `Error: ${error.message}`
        });
        
    } finally {
        if (connection) connection.release();
    }
}


async function deleteVehiculoPorID(req, res) {

    let connection;

    try {

		const {id} = req.params;

		if ( isNaN (id) ) {
			throw new Error ('TypeErrorID');
		}

        connection = await pool.getConnection();

        const deleteVehiculoQuery = 'DELETE FROM Vehiculos WHERE veh_id = ?';
        await connection.query(deleteVehiculoQuery, [id]);
        
        res.status(200).json({ mensaje: "Vehiculo eliminado con éxito" });

    } catch(error) {

        console.error(error.message);

        res.status(500).json({ 
            mensaje: "Error al eliminar el vehiculo",
            error: `Error: ${error.message}`
        });

    } finally {
        if(connection) connection.release();
    }
}

async function getVehiculosCliente(req, res) {

    const id = req.user[0].cta_id

    let connection;

    try {
        connection = await pool.getConnection();
        const getVehiculosQuery = "SELECT cte_nombres, cte_apPaterno, veh_numPaseAdmision, veh_numeroSiniestro, veh_tipoVehiculo, veh_fechaIngreso, veh_fechaEgreso, veh_estatusReparacion FROM Vehiculos LEFT JOIN Cuentas ON Vehiculos.cta_id = Cuentas.cta_id LEFT JOIN Clientes ON Cuentas.cta_id = Clientes.cta_id WHERE Vehiculos.cta_id = ?;";

        const vehiculos = await connection.query(getVehiculosQuery, [id]);

        res.status(200).json(vehiculos);

    } catch(error) {

        console.error("Error: ", error.message);

        res.status(500).json({
            mensaje: "Error al devolver los vehiculos",
            error: `Error: ${error.message}`
        });

    } finally {
        if(connection) connection.release();
    }
}

// ---- MÉTODOS AUXILIARES -----

async function getEstatusReparacion(id) {

    let connection;

    try { 
        connection = await pool.getConnection();

        const getEstatusReparacionQuery = 'SELECT veh_estatusReparacion FROM Vehiculos WHERE veh_id = ?';
        const [estatusReparacion] = await connection.query(getEstatusReparacionQuery, [id]);

        return estatusReparacion;

    } catch (error) {
        console.error('Error: ', error.message);
        return; 
    } finally { 
        if (connection) connection.release();
    }
}

module.exports = {
    getVehiculos,
    getVehiculoPorID,
    getVehiculoPorFolioInterno,
    postVehiculo,
    updateVehiculoPorID,
    deleteVehiculoPorID,
    getVehiculosCliente
}

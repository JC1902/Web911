/* Controlador con las funciones necesarias
que permitne la manipulación o consulta
de información de la tabla vehiculos */

const pool = require('../database');
const mailer = require('../../utilities/mailer');

async function getVehiculos(req, res) {
    let connection;
    try {

        connection = await pool.getConnection();
        const [vehiculos] = await connection.query('SELECT * FROM Vehiculos;');
        console.log(vehiculos);
        res.status(200).json(vehiculos);

    } catch (error) {

        console.error(error.message);
        res.status(500).json({ mensaje: "Error al devolver los vehículos" });
        
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
        console.log(vehiculo);
        res.status(200).json(vehiculo);

    } catch (error) {

        console.error(error.message);
        res.status(500).json({ mensaje: "Error al devolver el vehiculo" });
        
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

        const getVehiculoQuery = 'SELECT veh_id, veh_numPaseAdmision, veh_tipoVehiculo, veh_fechaIngreso, veh_fechaEgreso, veh_estatusReparacion, cta_id, cte_id, cta_numeroSiniestro FROM Vehiculos WHERE veh_folioInterno = ?';

        const [vehiculo] = await connection.query(getVehiculoQuery, [folio]);

        console.log(vehiculo);
        res.status(200).json(vehiculo);


    } catch(error) {

        console.error(error.message);
        res.status(500).json({ mensaje: "Error al devolver el vehiculo" });

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

        const insertion = await connection.query(postVehiculosQuery, [veh_folioInterno, veh_numPaseAdmision, veh_numeroSiniestro, veh_tipoVehiculo, veh_fechaIngreso, veh_estatusReparacion, cta_id, cte_id, cta_folio]);

        console.log(insertion);
        res.status(200).json({mensaje: "Se insertó un nuevo vehiculo"})

    } catch(error) {

        console.error(error.message);
        res.status(500).json({mensaje: "Error al insertar un nuevo vehiculo"});

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
        console.log('Estatus Previo Reparacion: ', estatusPrevioReparacion);

        connection = await pool.getConnection();

        const updateVehiculoQuery = 'UPDATE Vehiculos SET veh_folioInterno = ?, veh_numPaseAdmision = ?, veh_numeroSiniestro = ?, veh_tipoVehiculo = ?, veh_fechaIngreso = ?, veh_fechaEgreso = ?, veh_estatusReparacion = ?, cta_id = ?, cte_id = ?, cta_folio = ? WHERE veh_id = ?';

        const okPacket = await connection.query(updateVehiculoQuery, [veh_folioInterno, veh_numPaseAdmision, veh_numeroSiniestro, veh_tipoVehiculo, veh_fechaIngreso, veh_fechaEgreso, veh_estatusReparacion, cta_id, cte_id, cta_folio, id] );

        console.log('okPacket: ', okPacket);

        if( okPacket.affectedRows >= 1 &&  estatusPrevioReparacion.veh_estatusReparacion !== veh_estatusReparacion) {

			const getAdresseDataQuery = 'SELECT cte_nombres, cte_correo FROM Clientes WHERE cte_id = ?;';
            const [{ cte_correo, cte_nombres }] = await connection.query( getAdresseDataQuery, [cte_id] );

            await mailer.sendUpdateEmail(cte_correo, cte_nombres, veh_tipoVehiculo, veh_estatusReparacion);

        }

        res.status(200).json({mensaje: "Datos del vehiculo acualizados con éxito"});

    } catch (error) {

        console.error('Erorr: ', error.message);
        res.status(500).json({ mensaje: `Error: ${error.message}` });
        
    } finally {
        if (connection) connection.release();
    }
}

// async function updateVehiculoPorFolioInterno(req, res) {

//}

async function deleteVehiculoPorID(req, res) {

    let connection;

    try {

		const {id} = req.params;

		if ( isNaN (id) ) {
			throw new Error ('TypeErrorID');
		}

        connection = await pool.getConnection();

        const deleteVehiculoQuery = 'DELETE FROM Vehiculos WHERE veh_id = ?';
        const deletion = await connection.query(deleteVehiculoQuery, [id]);
        
        console.log(deletion);
        res.status(200).json({mensaje: "Vehiculo eliminado con éxito"});

    } catch(error) {

        console.error(error.message);
        res.status(500).json({mensaje: "Error al eliminar el vehiculo"});


    } finally {

        if(connection) connection.release();

    }
}

// async function deleteVehiculoPorFolioInterno(req, res) {

// }

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
    // updateVehiculoPorFolioInterno,
    deleteVehiculoPorID,
    // deleteVehiculoPorFolioInterno
}

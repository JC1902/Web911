// Módulo vehiculos.routes.js
// encargado de controlar
// las rutas del API.
// Actualización de los datos en la BD
// respecto a los vehículos
// de los clientes.

const express = require('express');
const router = express.Router();
const vehiculosController = require('../controllers/vehiculos.controller');

// ---- ROUTES ----
router.get('/api/vehicles/:cta_id', vehiculosController.getInfo);
router.put('/api/vehicles/:veh_id', vehiculosController.updateInfo);
router.post('/api/vehicles/', vehiculosController.postInfo);

module.exports = router;

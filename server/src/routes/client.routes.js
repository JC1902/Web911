// Módulo client.routes.js
// encargado de contener las
// rutas para la visualización
// de datos del cliente.

const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('./auth.routes');
const vehiculosController = require('../controllers/vehiculos.controller');


// ---- MIDDLEWARE ----
router.use( (req, res, next) => {
    isAuthenticated(req, res, next);
    next();
});

// ---- ROUTES ----
router.get('/api/client/:cta_id', vehiculosController.getInfo);
    
module.exports = router;
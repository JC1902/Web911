/*
Módulo vehiculos.routes.js
encargado de controlar
las rutas del API.
Actualización de los datos en la BD*/

// ***Sólo el usuario administrador
// puede hacer uso de estas rutas***

const express = require('express');
const router = express.Router();
const passport = require('passport'); // importación de passport.
// const { isAuthenticated } = require('./auth.routes');
const cuentasController = require('../controllers/cuentas.controller');
const clientesController = require('../controllers/clientes.controller');
const vehiculosController = require('../controllers/vehiculos.controller');
const authController = require('../controllers/auth.controller');


// ---- MIDDLEWARE ----
router.use( async (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/'); 
    }

    if (!await authController.isAdmin(req)) {
        return res.status(403).json({ mensaje: "No tienes permiso para acceder a este recurso" });
    }

    next();
});

// ---- ROUTES VEHICULOS ----
router.get('/api/vehicles/info', vehiculosController.getVehiculos);
router.get('/api/vehicles/info/:id/ID', vehiculosController.getVehiculoPorID);
router.get('/api/vehicles/info/:folio/folio', vehiculosController.getVehiculoPorFolioInterno)

router.post('/api/vehicles/info', vehiculosController.postVehiculo);

router.put('/api/vehicles/info/:id/ID', vehiculosController.updateVehiculoPorID);
// router.put('/api/vehicles/info/:folio/folio', vehiculosController.updateVehiculoPorFolioInterno);

router.delete('/api/vehicles/info/:id/ID', vehiculosController.deleteVehiculoPorID);
// router.delete('/api/vehicles/info/:folio/folio', vehiculosController.deleteVehiculoPorFolioInterno);

// ---- ROUTES CLIENTES ----
router.get('/api/clients/info', clientesController.getClientes);
router.get('/api/clients/info/:id/ID', clientesController.getClientePorID);
router.get('/api/clients/info/:folio/folio', clientesController.getClientePorFolio);

router.post('/api/clients/info', clientesController.postCliente);

router.put('/api/clients/info/:id/ID', clientesController.updateClientePorID);
// router.put('/api/clients/info/:folio/folio', clientesController.updateClientePorFolio);

router.delete('/api/clients/info/:id/ID', clientesController.deleteClientePorID);
// router.delete('/api/clients/info/:folio/folio', clientesController.deleteClientePorFolio);

// ---- ROUTES CUENTAS ----
router.get('/api/cuentas/info', cuentasController.getCuentas);
router.get('/api/cuentas/info/:id/ID', cuentasController.getCuentaPorID);
router.get('/api/cuentas/info/:folio/folio', cuentasController.getCuentaPorFolio);

router.post('/api/cuentas/info/', cuentasController.postCuenta);

router.put('/api/cuentas/info/:id/ID', cuentasController.updateCuentaPorID);
// router.put('/api/cuentas/info/:folio/folio', cuentasController.updateCuentaPorFolio);

router.delete('/api/cuentas/info/:id/ID', cuentasController.deleteCuentaPorID);
// router.delete('/api/cuentas/info/:folio/folio', cuentasController.deleteCuentaPorFolio);

module.exports = router;

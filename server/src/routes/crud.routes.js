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
const { isAuthenticated } = require('./auth.routes');
const cuentasController = require('../controllers/cuentas.controller');
const clientesController = require('../controllers/clientes.controller');
const vehiculosController = require('../controllers/vehiculos.controller');


// ---- MIDDLEWARE ----
router.use( (req, res, next) => {
    isAuthenticated(req, res, next);
    cuentasController.isAdmin(req, res);
    next();
});

// ---- ROUTES CUENTAS ----
router.get('/api/cuentas/info', cuentasController.getCuentas);
router.get('/api/cuentas/info/:id', cuentasController.getCuentaPorID);
router.get('/api/cuentas/info/:numeroSiniestro', cuentasController.getCuentaPorNumSiniestro);
router.get('/api/cuentas/info/:folio', cuentasController.getCuentaPorFolio);

router.post('/api/cuentas/info/', cuentasController.postCuenta);

router.put('/api/cuentas/info/:id', cuentasController.updateCuentaPorID);
router.put('/api/cuentas/info/:numeroSiniestro', cuentasController.updateCuentaPorNumSiniestro);
router.put('/api/cuentas/info/:folio', cuentasController.updateCuentaPorFolio);

router.delete('/api/cuentas/info/:id', cuentasController.deleteCuentaPorID);
router.delete('/api/cuentas/info/:numeroSiniestro', cuentasController.deleteCuentaPorNumSiniestro);
router.delete('/api/cuentas/info/:folio', cuentasController.deleteCuentaPorFolio);

// ---- ROUTES CLIENTES ----
router.get('/api/clients/info', clientesController.getClientes);
router.get('/api/clients/info/:id', clientesController.getClientePorID);
router.get('/api/clients/info/:numeroSiniestro', clientesController.getClientePorNumSiniestro);
router.get('/api/clients/info/:folio', clientesController.getClientePorFolio);

router.post('/api/clients/info', clientesController.postCliente);

router.put('/api/clients/info/:id', clientesController.updateClientePorID);
router.put('/api/clients/info/:numeroSiniestro', clientesController.updateClientePorNumSiniestro);
router.put('/api/clients/info/:folio', clientesController.updateClientePorFolio);

router.delete('/api/clients/info/:id', clientesController.deleteClientePorID);
router.delete('/api/clients/info/:numeroSiniestro', clientesController.deleteClientePorNumSiniestro);
router.delete('/api/clients/info/:folio', clientesController.deleteClientePorFolio);


// ---- ROUTES VEHICULOS ----
router.get('/api/vehicles/info', vehiculosController.getVehiculos);
router.get('/api/vehicles/info/:id', vehiculosController.getVehiculoPorID);
router.get('api/vehicles/info/:folio', vehiculosController.getVehiculoPorFolioInterno)

router.post('/api/vehicles/info', vehiculosController.postVehiculo);

router.put('/api/vehicles/info/:id', vehiculosController.updateVehiculoPorID);
router.put('/api/vehicles/info/:folio', vehiculosController.updateVehiculoPorFolioInterno);

router.delete('/api/vehicles/info/:id', vehiculosController.deleteVehiculoPorID);
router.delete('/api/vehicles/info/:folio', vehiculosController.deleteVehiculoPorFolioInterno);

module.exports = router;
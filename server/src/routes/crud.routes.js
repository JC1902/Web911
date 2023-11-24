const express = require('express');
const router = express.Router();
const passport = require('passport');
const cuentasController = require('../controllers/cuentas.controller');
const clientesController = require('../controllers/clientes.controller');
const vehiculosController = require('../controllers/vehiculos.controller');
const authController = require('../controllers/auth.controller');

router.use( async (req, res, next) => {

    if (!req.isAuthenticated()) {
        return res.redirect('/'); 
    }
    
    next();
});

// Rutas para el cliente

router.get('/api/vehicles/myvehicles', authController.clientAccess, vehiculosController.getVehiculosCliente);

// Rutas del administrador

router.get('/api/vehicles/info', authController.adminAccess, vehiculosController.getVehiculos);
router.get('/api/vehicles/info/:id/ID', authController.adminAccess, vehiculosController.getVehiculoPorID);
router.get('/api/vehicles/info/:folio/folio', authController.adminAccess, vehiculosController.getVehiculoPorFolioInterno)
router.post('/api/vehicles/info', authController.adminAccess, vehiculosController.postVehiculo);
router.put('/api/vehicles/info/:id/ID', authController.adminAccess, vehiculosController.updateVehiculoPorID);
router.delete('/api/vehicles/info/:id/ID', authController.adminAccess, vehiculosController.deleteVehiculoPorID);

router.get('/api/clients/info', authController.adminAccess, clientesController.getClientes);
router.get('/api/clients/info/:id/ID', authController.adminAccess, clientesController.getClientePorID);
router.get('/api/clients/info/:folio/folio', authController.adminAccess, clientesController.getClientePorFolio);
router.post('/api/clients/info', authController.adminAccess, clientesController.postCliente);
router.put('/api/clients/info/:id/ID', authController.adminAccess, clientesController.updateClientePorID);
router.delete('/api/clients/info/:id/ID', authController.adminAccess, clientesController.deleteClientePorID);

router.get('/api/cuentas/info', authController.adminAccess, cuentasController.getCuentas);
router.get('/api/cuentas/info/:id/ID', authController.adminAccess, cuentasController.getCuentaPorID);
router.get('/api/cuentas/info/:folio/folio', authController.adminAccess, cuentasController.getCuentaPorFolio);
router.post('/api/cuentas/info/', authController.adminAccess, cuentasController.postCuenta);
router.put('/api/cuentas/info/:id/ID', authController.adminAccess, cuentasController.updateCuentaPorID);
router.delete('/api/cuentas/info/:id/ID', authController.adminAccess, cuentasController.deleteCuentaPorID);

module.exports = router;

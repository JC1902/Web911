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

    if (!await authController.isAdmin(req)) {
        return res.status(404).json({ mensaje: "Página no encontrada" });
    }

    next();
});

router.get('/api/vehicles/info', vehiculosController.getVehiculos);
router.get('/api/vehicles/info/:id/ID', vehiculosController.getVehiculoPorID);
router.get('/api/vehicles/info/:folio/folio', vehiculosController.getVehiculoPorFolioInterno)
router.post('/api/vehicles/info', vehiculosController.postVehiculo);
router.put('/api/vehicles/info/:id/ID', vehiculosController.updateVehiculoPorID);
router.delete('/api/vehicles/info/:id/ID', vehiculosController.deleteVehiculoPorID);

router.get('/api/clients/info', clientesController.getClientes);
router.get('/api/clients/info/:id/ID', clientesController.getClientePorID);
router.get('/api/clients/info/:folio/folio', clientesController.getClientePorFolio);
router.post('/api/clients/info', clientesController.postCliente);
router.put('/api/clients/info/:id/ID', clientesController.updateClientePorID);
router.delete('/api/clients/info/:id/ID', clientesController.deleteClientePorID);

router.get('/api/cuentas/info', cuentasController.getCuentas);
router.get('/api/cuentas/info/:id/ID', cuentasController.getCuentaPorID);
router.get('/api/cuentas/info/:folio/folio', cuentasController.getCuentaPorFolio);
router.post('/api/cuentas/info/', cuentasController.postCuenta);
router.put('/api/cuentas/info/:id/ID', cuentasController.updateCuentaPorID);
router.delete('/api/cuentas/info/:id/ID', cuentasController.deleteCuentaPorID);

module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/agencias', (req, res, next) => {
    res.render('agencias');
});

router.get('/contacto', (req, res, next) => {
    res.render('contacto');
});

router.get('/servicios', (req, res, next) => {
    res.render('servicios');
});

router.get('admin/dashboard', (req, res, next) => {
    res.render('adminDashboard');
});

module.exports = router;
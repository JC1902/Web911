// Módulo index.routes.js encargado
// de gestionar las rutas del servidor,
// se gestionan peticiones
// y sus respuestas correspondientes

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index');
});

// rutas de la barra de navegación
router.get('/agencias', (req, res, next) => {
    res.render('agencias');
});

router.get('/contacto', (req, res, next) => {
    res.render('contacto');
});

router.get('/servicios', (req, res, next) => {
    res.render('servicios');
});

module.exports = router;
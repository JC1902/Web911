// Módulo index.routes.js encargado
// de gestionar las rutas del servidor,
// se gestionan peticiones
// y sus respuestas correspondientes

const express = require('express');
const router = express.Router();
const passport = require('passport');

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


// rutas de manejo de sesión

router.get('/signup', (req, res, next) => {
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

router.get('/signin', (req, res, next) => {
    res.render('signin');

});

router.post('/signin', passport.authenticate('local-signin',{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
    req.logout( (err) => {
        if(err){return next(err);}
        res.redirect('/');
    });
});

// Rutas protegidas
router.use((req, res, next) => {
    isAuthenticated(req, res, next);
    next();
});

router.get('/profile', (req, res, next) => {
    res.render('profile');
});

// middleware de protección de las rutas
function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
}

module.exports = router;
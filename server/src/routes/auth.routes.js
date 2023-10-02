// Módulo auth.routes.js encargado
// de gestionar las peticiones y
// enrutamiento hacia el servidor
// para la autenticación y registro
// del usuario.

const express = require('express');
const router = express.Router();
const passport = require('passport');

// Rutas registro de usuario
router.get('/auth/signup', (req, res, next) => {
    res.render('signup');
});

router.post('/auth/signup', passport.authenticate('local-signup', {
    successRedirect: '/auth/profile',
    failureRedirect: '/auth/signup',
    passReqToCallback: true
}));

// Rutas de manejo de registro de usuario
router.get('/auth/signin', (req, res, next) => {
    res.render('signin');
});

router.post('/auth/signin', passport.authenticate('local-signin', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/signin',
    passReqToCallback: true
}));

router.get('/auth/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// El 'use' se ejecuta primero antes de dar
// dar paso a las siguientes rutas
router.use((req, res, next) => {
    isAuthenticated(req, res, next);
    next();
});

router.get('/dashboard', (req, res, next) => {
    res.render('dashboard');
});


// Middleware que verifica que el usuario
// este autenticado.
function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/auth/signin');
}

module.exports = router;

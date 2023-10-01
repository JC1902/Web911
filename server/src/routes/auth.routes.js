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
    successRedirect: '/auth/profile',
    failureRedirect: '/auth/signin',
    passReqToCallback: true
}));

router.get('/auth/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.get('/auth/profile', (req, res, next) => {
    res.render('profile');
});

module.exports = router;

// Módulo auth.routes.js encargado
// de gestionar las peticiones y
// enrutamiento hacia el servidor
// para la autenticación y registro
// del usuario.

const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users.controller');


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
    //successRedirect: '/dashboard',
    successRedirect: '/auth',
    failureRedirect: '/auth/signin',
    passReqToCallback: true
}));

router.get('/auth/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});


// Ruta de verificacion de autenticacion 
router.get('/auth', (req, res, next) => {
    console.log("Usuario:", req.user);
    res.send("Ruta /auth")

    const userRole = req.user.role;

    if( isAdmin(userRole) ){
        res.render('adminDashboard');
    }

    next();
});



// El 'use' se ejecuta primero antes de dar
// dar paso a las siguientes rutas
router.use((req, res, next) => {
    isAuthenticated(req, res, next);
    next();
});




// Verificamos que el usuario sea administrador

/*
router.use((req, res, next) => {
  isAdmin(req, res, next);
});
*/

// Ruta que nos redirecciona al panel de control
// del usuario
router.get('/dashboard', (req, res, next) => {
    res.render('dashboard');
});


// -------- Middlewares ------------


// Middleware que verifica que el usuario
// este autenticado.
function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/auth/signin');
}


// Middleware que verifica si el usuaio es o no administrador.
function isAdmin(userRole) {

    let role = userController.identifyRole(userRole);

    if( role == "Admin" ){
        return true;
    }

    return false;
}

module.exports = router;
/* Módulo auth.routes.js encargado
de gestionar las peticiones y
enrutamiento hacia el servidor
para la autenticación y registro
del usuario. */

const express = require('express');
const router = express.Router();
const passport = require('passport');
const cuentasController = require('../controllers/cuentas.controller');

// ---- ROUTES -----
router.get('/auth/signin', (req, res, next) => {
    res.render('signin');
});

router.post('/auth/signin', passport.authenticate('local-signin', {
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

// ---- MIDDLEWARE ----
router.use((req, res, next) => {
    isAuthenticated(req, res, next);
});


// ---- ROUTES -----
router.get('/auth', async (req, res/*, next*/) => {
    
    let resolution = await cuentasController.isAdmin(req, res);

    if( resolution ) { 
        res.render('adminDashboard');
    }
    else{
        res.render('dashboard')
    }
    // next();
});

// -------- MIDDLEWARES ------------
function isAuthenticated(req, res, next) {

    let auth = req.isAuthenticated();
    console.log("Authentication: ", auth);

    if(!req.isAuthenticated()) {
        res.redirect('/'); 
        return;
    }
    next();
}

// Exportamos el router
module.exports.authRoutes = router;

// Exportamos las funciones
module.exports.isAuthenticated = isAuthenticated;
const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');

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

router.use((req, res, next) => {
    isAuthenticated(req, res, next);
});

router.get('/auth', async (req, res) => {
    
    let resolution = await authController.isAdmin(req, res);

    if( resolution ) { 
        res.render('adminDashboard');
    }
    else{
        res.render('dashboard')
    }
});

router.get('/auth/createVehicle', (req, res, next) => {
    res.render('createVehicle');
});

router.get('/auth/editVehicle', (req, res, next) => {
    res.render('editVehicle');
});

function isAuthenticated(req, res, next) {

    if(!req.isAuthenticated()) {
        res.redirect('/'); 
        return;
    }
    next();
}

module.exports.authRoutes = router;
module.exports.isAuthenticated = isAuthenticated;
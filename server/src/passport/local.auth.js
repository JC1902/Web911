"use strict";

// Módulo local.auth.js
// que hace uso de la librería passport. 
// Código encargado de administrar 
// la autenticación del usuario
// así cómo manejar los archivos
// del navegador para mantener la sesión

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

// Control de la serialización del usuario
// se guarda en archivos del navegador
// para que las páginas no reuieran una
// nueva autenticación

passport.serializeUser((user, done) => {

    // console.log("User -> ", user);
    done(null, user.id);
});

passport.deserializeUser( (id, done) => {
    const user = User.findByPk(id);
    // console.log("User -> ", user);
    done(null, user);
});


// Control del registro de usuario
passport.use('local-signup', new LocalStrategy(

    {usernameField: 'email',
     passwordField: 'password',
     passReqToCallback: true
    },
    async (req, email, password, done) => {

        const userExist = await User.findOne({
            where: {email:email}
        });

        if(userExist){
            return done(null, false, req.flash(
                'signupMessage',
                'The email is already taken.'
            ));
        }else{
            const newUser = new User();
            newUser.email = email;
            newUser.password = password;
            await newUser.save();
            done(null, newUser);
        }
    }));

// Control de inicio de sesión de usuario
passport.use('local-signin', new LocalStrategy(
    {usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true},
    
    async (req, email, password, done)=>{

        const user = await User.findOne({
            where: {email:email}
        });

        // Compara si existe el usuario
        if(!user){
            return done(null, false, req.flash('signinMessage','No user found.'));
        }
        // Comparación de contraseñas

        const correctPassword = await user.comparePassword(password);

        if(!correctPassword){
            return done(null, false, req.flash('signinMessage','Incorrect Password'));
        }

        done(null, user);

    }));



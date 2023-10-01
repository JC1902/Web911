// Módulo local.auth.js
// que hace uso de la librería passport. 
// Código encargado de administrar 
// la autenticación del usuario
// así cómo manejar los archivos
// del navegador para mantener la sesión

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userController = require('../controllers/users.controller');

// Control de la serialización del usuario
// se guarda en archivos del navegador
// para que las páginas no requieran
// autenticación una vez la sesión haya sido
// iniciada.

passport.serializeUser( (user, done) => {

    console.log("Se serializó el usuario:", user);
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {

    const user = await userController.getUserById(id);
    console.log("Se deserializó el usuario: ", user);
    done(null, user);
});

// Control del registro de usuario
passport.use('local-signup', new LocalStrategy(

    {usernameField: 'email',
     passwordField: 'password',
     passReqToCallback: true
    },

    async (req, email, password, done) => {

        console.log('Recibida una solicitud desde: ' + req.url);
        console.log('Email de llegada: ', email);
        console.log('Contraseña de llegada: ', password);

        const registeredMail = await userController.getEmail(email);

        console.log('Resultado búsqueda de mail', registeredMail);

        if (registeredMail.length !== 0) {

            console.log('Email ya ocupado');

            return done(null, false, req.flash(
                'signupMessage',
                'The email is already taken.'
            ));

        } else {

            console.log('Registrando usuario...');

            const newUser = await userController.registerUser(email, password);
            console.log('Usuario registrado: ', newUser);
            done(null, newUser);
        }
    }));

// Control de inicio de sesión de usuario
passport.use('local-signin', new LocalStrategy(
    {usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true},
    
    async (req, email, password, done)=>{

        const userEmail = await userController.getEmail(email);

        // Compara si existe el usuario
        if(userEmail == null){
            return done(null, false, req.flash('signinMessage','No user found.'));
        }

        // Comparación de contraseñas
        const correctPassword = await userController.comparePassword(email, password);

        if(!correctPassword){
            return done(null, false, req.flash('signinMessage','Incorrect Password'));
        }

        const user = await userController.getUserByEmail(email);
        console.log('Sesión iniciada');
        done(null, user);
    }));
// Módulo local.auth.js
// que hace uso de la librería passport. 
// Código encargado de administrar 
// la autenticación del usuario
// así cómo manejar los archivos
// del navegador para mantener la sesión

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cuentasController = require('../controllers/cuentas.controller');

// Control de la serialización del usuario
// se guarda en archivos del navegador
// para que las páginas no requieran
// autenticación una vez la sesión haya sido
// iniciada.

passport.serializeUser( (cuenta, done) => {
    console.log("Se serializó la cuenta:", cuenta);
    done(null, cuenta);
});

passport.deserializeUser( async (cuentaObject, done) => {
    console.log("Parametro: ", cuentaObject);

	const cuentaID = cuentaObject.cta_id;
    const cuenta = await cuentasController.getCuentaPorID(cuentaID);
    console.log("Se deserializó la cuenta: ", cuenta);
    done(null, cuenta);
});

// Control del registro de usuario
/*
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
*/

// Control de inicio de sesión de usuario
passport.use('local-signin', new LocalStrategy(
    {usernameField: 'folio',
    passwordField: 'password',
    passReqToCallback: true},
    
    async (req, folio, password, done)=> {

	    console.log("Folio: ", folio);
	    console.log("Password: ", password);

	    const cuenta = await cuentasController.getCuentaPorFolio(folio);

        // Compara si existe el usuario
        if(cuenta == null){
            return done(null, false, req.flash('signinMessage','Cuenta no encontrada.'));
        }

        // Comparación de contraseñas
        const correctPassword = await cuentasController.comparePassword(folio, password);

        if(!correctPassword){
            return done(null, false, req.flash('signinMessage','Contraseña incorrecta'));
		}

        console.log("Cuenta: ", cuenta);
        console.log('Sesión iniciada');
        done(null, cuenta);
        
    }));

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

passport.deserializeUser( async (cuenta, done) => {
    
    // console.log("Parametro: ", cuentaObject);

	// const cuentaID = cuentaObject.cta_id;
    // const cuenta = await cuentasController.getCuentaPorID(cuentaID);
    // console.log("Se deserializó la cuenta: ", cuenta);

    done(null, cuenta);
});

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

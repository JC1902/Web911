const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authController = require('../controllers/auth.controller');

passport.serializeUser( (cuenta, done) => {
    done(null, cuenta);
});

passport.deserializeUser( async (cuenta, done) => {
    done(null, cuenta);
});

passport.use('local-signin', new LocalStrategy(
    {usernameField: 'folio',
    passwordField: 'password',
    passReqToCallback: true},
    
    async (req, folio, password, done)=> {

		const cuenta = await authController.getCuentaPorFolio(folio);

        if(cuenta == null){
            return done(null, false, req.flash('signinMessage','Cuenta no encontrada.'));
        }

        const correctPassword = await authController.comparePassword(folio, password);

        if(!correctPassword){
            return done(null, false, req.flash('signinMessage','Contraseña incorrecta'));
		}
        
        done(null, cuenta);        
    }));

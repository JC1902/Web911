const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session'); 
const flash = require('connect-flash');

// initializations
const app = express();
require('./database');
require('./passport/local.auth');

// settings
app.set('views', path.join(__dirname, '../../views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'hbyUxauH6Rxuojj2hwrA6jDBfDLgoJ',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    next();
});

// Acceso y uso de nuestros assets en la carpeta public
app.use( express.static(path.join(__dirname, '../../public') ) );

// routes
const indexRoutes = require('./routes/index.routes');
const mailRoutes = require('./routes/correo.routes');

app.use('/', indexRoutes);
app.use('/mail', mailRoutes);

app.listen( app.get('port'), () => {
    console.log('Server running on port', app.get('port') );
} );
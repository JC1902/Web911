const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session'); 
const flash = require('connect-flash');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./database');
require('./passport/local.auth');


app.set('views', path.join(__dirname, '../../views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);


app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'hbyUxauH6Rxuojj2hwrA6jDBfDLgoJ',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    next();
});


app.use( express.static(path.join(__dirname, '../../public') ) );


const indexRoutes = require('./routes/index.routes');
const { authRoutes } = require('./routes/auth.routes');
const crudRoutes = require('./routes/crud.routes')

app.use((req, res, next) => {
    console.log('Request URL:', req.url);
    next();
});

app.use(indexRoutes);
app.use(authRoutes);
app.use(crudRoutes);

app.listen( app.get('port'), () => {
    console.log('Server running on port', app.get('port') );
} );

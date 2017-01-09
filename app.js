var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local'), Strategy;

var index = require('./routes/index');
var user = require('./routes/user');
var dashboard = require('./routes/dashboard');
var profile = require('./routes/profile');
var community = require('./routes/community');


//Initialize Ignition API
var app = express();

app.disable('x-powered-by');

//Views
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout:'main' }));
app.set('view engine', 'hbs');

//Middleware - BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//Static Folder - Where all publicly available files must be found
app.use(express.static(path.join(__dirname, 'public')));
 
//Express Session
app.use(session({
	secret: 'victoriacourt',
	saveUninitialized: true,
	resave: true 
}));

//Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(expressValidator({
  	errorFormatter: function(param, msg) {
	    var namespace = param.split('.')
	    , root    = namespace.shift()
	    , formParam = root;

	    while(namespace.length) {
	      	formParam += '[' + namespace.shift() + ']';
	    }
	    return {
	      	param : formParam,
	      	msg   : msg
	    };
  	}
}));

//Connect flash
app.use(flash());

//Global Variables
app.use(function(req, res, next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.profile = req.session.profile || null;
	next();
});

app.use('/', index);
app.use('/user', user);
app.use('/dashboard', dashboard);
app.use('/profile', profile);
app.use('/community', community);

//Set Port
app.set('port', (process.env.PORT || 9001));

//Initialize App
app.listen(app.get('port'), function(){
	console.log('Ignition Website started on port ' + app.get('port'));
});
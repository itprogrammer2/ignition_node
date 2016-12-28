var express = require('express');
var router = express.Router();
var csurf = require('csurf');
var session = require('client-sessions');

//CSRF
var csrfProtection = csurf({ cookie: true });

var customers = require('../models/customers.js');

// I defined a default login form 
// class and icons.
// These will be changed  
// if the form is submitted
// with missing fields

var loginclass = {
	email : {
		class : ''
	},
	password : {
		class : ''
	}
};

// I defined a default register form 
// class and icons.
// These will be changed  
// if the form is submitted
// with missing fields

var registerclass = {
	name_of_business : {
		class : '',
		icon : 'default-icon'
	},
	nature_of_business : {
		class : '',
		icon : 'default-icon'
	},
	contact_person : {
		class : '',
		icon : 'default-icon'
	},
	contact_number : {
		class : '',
		icon : 'default-icon-sm'
	},
	email_address : {
		class : '',
		icon : 'default-icon-sm'
	}
}

var user_data = {};

router.use(function (err, req, res, next) {
  	if (err.code !== 'EBADCSRFTOKEN') return next(err);

  	// handle CSRF token errors here
  	res.status(403);
  	res.send('form tampered with');
})

// router.use(session({
//   	cookieName: 'session',
//   	secret: 'Caffeine_Derived_Dangerous_Pumpkins',
//   	duration: 2 * 60 * 60 * 1000,
//   	activeDuration: 2 * 60 * 60 * 1000
// }));

//ROUTES
router.get('/signin', csrfProtection, SignIn);
router.post('/signin', csrfProtection, SignInPost);
router.get('/register', csrfProtection, Register);
router.post('/register', csrfProtection, RegisterPost);
router.get('/interest', csrfProtection, Interest);
router.post('/interest', csrfProtection, InterestPost);

//Signin Template
function SignIn(req, res){
	if (req.session && req.session.profile) {
		res.redirect('/dashboard');
	}
	else{
		res.render('signin', {
								loginclass: loginclass,
								csrfToken: req.csrfToken()
							});
	}		
};

//Signin Post
function SignInPost(req, res){
	//Validate first
	req.checkBody('email', 'User not found.').isEmail();
	req.checkBody('password', 'Invalid password.').notEmpty();
	
	var errors = req.validationErrors();

	if(errors){
		// let's loop the errors
		// to check if we should change
		// the appearance of any field

		for(var i in errors){
			loginclass[errors[i].param].class = 'isEmpty';
		}

		res.render('signin', {
								csrfToken: req.csrfToken(),
								userdata: req.body,
								errors: errors,
								loginclass: loginclass
							});
	}
	else {
		var customer = customers.auth(req.body, res, function(result){
			var result = JSON.parse(result);

			if(result.status){
				//set session
				req.session.profile = result;
				//redirect to dashboard
				res.redirect('/dashboard/');
				//do cookies here
			}
			else {
				req.flash('error_msg', 'Account not found.');
				res.render('signin', {
								csrfToken: req.csrfToken(),
								userdata: req.body
							});
			}
			//res.end(data);
			
			//
		});		
	}
};

//Register Template
function Register(req, res){
	res.render('register', { 
								registerclass: registerclass,
								csrfToken: req.csrfToken()
							});
};

//Register Post
function RegisterPost(req, res){
	//Validate first
	req.checkBody('name_of_business', 'Please tell us the name of your business.').notEmpty();
	req.checkBody('nature_of_business', 'Please tell us the nature of your business.').notEmpty();
	req.checkBody('contact_person', 'Please tell us your name.').notEmpty();
	req.checkBody('contact_number', 'Please tell us your contact number.').notEmpty();
	req.checkBody('email_address', 'Please tell us your email address.').isEmail();
	
	var errors = req.validationErrors();

	if(errors){
		// let's loop the errors
		// to check if we should change
		// the appearance of any field

		for(var i in errors){
			registerclass[errors[i].param].class = 'isEmpty';
			if(errors[i].param == 'contact_number' || errors[i].param == 'email_address'){
				registerclass[errors[i].param].icon = 'required-icon-sm';
			}
			else {
				registerclass[errors[i].param].icon = 'required-icon';
			}
		}

		res.render('register', {
			userdata:req.body,
			errors:errors,
			registerclass:registerclass
		});
	}
	else {

		var customer = customers.register(req.body, res, function(data){
			user_data = JSON.parse(data);
			//res.end(data);
			//req.flash('success_msg', 'Thank you for signing up. Our team will contact you within 48 hours.');
			res.redirect('interest');
		});		
	}
};

//Interests Template
function Interest(req, res){
	res.render('interest', {user_data:user_data});
};

//Interests Post
function InterestPost(req, res){
	var customer = customers.save_interests(req.body, res, function(data){
		//req.flash('success_msg', 'Thank you for signing up. Our team will contact you within 48 hours.');
		//res.render('/', {data:data});
		res.end(data);
	});
};


module.exports = router;
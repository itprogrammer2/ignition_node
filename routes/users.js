var express = require('express');
var router = express.Router();

var customers = require('../models/customers.js');

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

//Register
router.get('/register', function(req, res){
	res.render('register', {registerclass:registerclass});
});

//Register's Interests
router.get('/interest', function(req, res){
	res.render('interest', {user_data:user_data});
});

//Registration's Interests
router.post('/interest', function(req, res){
	var customer = customers.save_interests(req.body, res, function(data){
		//req.flash('success_msg', 'Thank you for signing up. Our team will contact you within 48 hours.');
		//res.render('/', {data:data});
		res.end(data);
	});
});

//Login
router.get('/login', function(req, res){
	res.render('login');
});

//Register a User
router.post('/register', function(req, res){
	//Validate first
	req.checkBody('name_of_business', 'Please tell us the name of your business.').notEmpty();
	req.checkBody('nature_of_business', 'Please tell us the nature of your business.').notEmpty();
	req.checkBody('contact_person', 'Please tell us your name.').notEmpty();
	req.checkBody('contact_number', 'Please tell us your contact number.').notEmpty();
	req.checkBody('email_address', 'Please tell us your email address.').notEmpty();
	
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
});

module.exports = router;
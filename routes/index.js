var express = require('express');
var router = express.Router();
var session = require('client-sessions');

var md5      		= require('md5');
var cookieParser = require('cookie-parser');

// router.use(session({
//   	cookieName: 'session',
//   	secret: 'Caffeine_Derived_Dangerous_Pumpkins',
//   	duration: 2 * 60 * 60 * 1000,
//   	activeDuration: 2 * 60 * 60 * 1000
// }));

router.use(cookieParser())

//Home
router.get('/', function(req, res){	
	res.render('index' , {
		_id: req.cookies[md5('_id')],
		_token: req.cookies[md5('_token')],
		_profile: req.cookies[md5('_profile')]?JSON.parse(req.cookies[md5('_profile')]):null
	});
});

//Logout
router.get('/logout', function(req, res){
	//req.session.profile = null;

	res.redirect('/user/signin');
});

module.exports = router;
var express = require('express');
var router = express.Router();
var session = require('client-sessions');

router.use(session({
  	cookieName: 'session',
  	secret: 'Caffeine_Derived_Dangerous_Pumpkins',
  	duration: 2 * 60 * 60 * 1000,
  	activeDuration: 2 * 60 * 60 * 1000
}));

//Home
router.get('/', function(req, res){
	res.render('index' , {
		profile: req.session.profile
	});
});

//Logout
router.get('/logout', function(req, res){
	req.session.profile = null;

	res.redirect('/user/signin');
});

module.exports = router;
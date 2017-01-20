var express = require('express');
var router = express.Router();
var csurf = require('csurf');
var session = require('client-sessions');

var md5      		= require('md5');

//CSRF
var csrfProtection = csurf({ cookie: true });

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
router.get('/', csrfProtection, Index);

//Signin Template
function Index(req, res){
	if (req.cookies[md5('_id')]) {
		res.render('dashboard/index', {
			_id: req.cookies[md5('_id')],
			_token: req.cookies[md5('_token')],
			_profile: req.cookies[md5('_profile')]?JSON.parse(req.cookies[md5('_profile')]):null
		});
	}
	else{
		res.redirect('/user/signin');
	}
};

module.exports = router;
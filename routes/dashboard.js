var express = require('express');
var router = express.Router();
var csurf = require('csurf');
var session = require('client-sessions');

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
	if (req.session && req.session.profile) {
		res.render('dashboard/index');
	}
	else{
		res.redirect('/user/signin');
	}
};

module.exports = router;
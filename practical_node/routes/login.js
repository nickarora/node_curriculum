var express = require('express');
var router = express.Router();


// app.get('/login', routes.user.login);

router.get('/', function(req, res, next) {
	res.render('login');
});

// app.post('/login', routes.user.authenticate);

router.post('/', function(req, res, next) {
	res.redirect('/');
});

module.exports = router;
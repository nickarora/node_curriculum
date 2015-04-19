var express = require('express');
var router = express.Router();

// app.get('/logout', routes.user.logout);
router.get('/', function(req, res, next) {
	res.redirect('/');
});

module.exports = router;
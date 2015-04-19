var express = require('express');
var router = express.Router();

// app.get('/admin',  routes.article.admin);
router.get('/', function(req, res, next) {
	req.collections.articles.find({}, {sort: {_id: -1}}).toArray(function(error, articles){
		if (error) return next(error);
		res.render('admin', {articles: articles});
	});
});

module.exports = router;
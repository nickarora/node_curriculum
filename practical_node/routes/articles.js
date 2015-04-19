var express = require('express');
var router = express.Router();

// app.get('/articles/:slug', routes.article.show);

router.get('/:slug', function(req, res, next) {
	if (!req.params.slug) return next(new Error('No article slug.'));

	req.collections.articles.findOne({slug: req.params.slug}, function(error, article){
		if (error) return next(error);
		if (!article.published) return res.send(401);
		res.render('article', article);
	});

});

module.exports = router;
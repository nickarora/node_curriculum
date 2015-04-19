var express = require('express');
var router = express.Router();

// app.get('/post',  routes.article.post);
router.get('/', function(req, res, next) {
	if (!req.body.title) res.render('post');
});

// app.post('/post', routes.article.postArticle);

router.post('/', function(req, res, next) {
	if (!req.body.title || !req.body.slug || !req.body.text) {
		return res.render('post', { error: 'Fill title, slug, and text.'});
	}

	var article = {
		title: req.body.title,
		slug: req.body.slug,
		text: req.body.text,
		published: false
	};

	req.collections.articles.insert(article, function(error, articleResponse){
		if (error) return next(error);
		res.render('post', {error: 'Article was added. Publish it on Admin Page'});
	});

});

module.exports = router;
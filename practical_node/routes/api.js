var express = require('express');
var router = express.Router();

// app.get('/api/articles', routes.article.list)
router.get('/articles', function(req, res, next) {
	req.collections.articles.find({}).toArray(function(error, articles){
		if (error) return next(error);
		res.send({articles: articles});
	});
});

// app.post('/api/articles', routes.article.add);
router.post('/articles', function(req, res, next) {
	if (!req.body.article) return next(new Error('No Article payload!'));

	var article = req.body.article;
	article.published = false;

	req.collections.articles.insert(article, function(error, articleResponse){
		if (error) return next(error);
		res.send(articleResponse);
	});
});

// app.put('/api/articles/:id', routes.article.edit);
router.put('/articles/:id', function(req, res, next) {
	if (!req.params.id) return next(new Error('No Article ID.'));
	req.collections.articles.updateById(req.params.id, {$set: req.body.article},
		function(error, count){
			if (error) return next(error);
			res.send({affectedCount: count});
		});
});

// app.del('/api/articles/:id', routes.article.del);
router.delete('/articles/:id', function(req, res, next) {
	if (!req.params.id) return next(new Error('No article ID.'));
	req.collections.articles.removeById(req.params.id, function(error, count){
		if (error) return next(error);
		res.send({affectedCount: count});
	});
});

module.exports = router;
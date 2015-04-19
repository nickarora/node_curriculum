var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals = { 
    title: 'Blogger',
    admin: true,
    loggedIn: true
  };

  req.collections.articles.find({ published: true}).toArray(function(error, articles){
    if (error) return next(error);
    res.render('index', {articles: articles});
  });

  // res.render( 'index', { 
  // 	partials: { 
  		
  // 	} 
  // });
});

module.exports = router;

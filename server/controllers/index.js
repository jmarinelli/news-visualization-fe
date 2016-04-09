var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/word-cloud', function(req, res, next) {
  res.render('word-cloud', { title: 'Word Cloud' });
});

router.get('/categories', function(req, res, next) {
  res.render('categories', { title: 'Media placement by type' });
});

module.exports = router;

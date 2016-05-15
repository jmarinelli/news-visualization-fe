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

router.get('/categories2', function(req, res, next) {
  res.render('categories2', { title: 'Media placement by type' });
});

router.get('/title-contest', function(req, res, next) {
  res.render('title-contest', { title: 'Header contest by date' });
});

module.exports = router;

var express = require('express');
var unirest = require('unirest');
var router = express.Router();

/* GET users listing. */
router.get('/statistics', function(req, res, next) {
  unirest.get('https://news-visualization-be.herokuapp.com/news-visualization/api/statistics')
      .header('Accept', 'application/json')
      .query(req.query)
      .end(function(response) {
    res.status(response.status).json(flattenStatisticsResponse(response.body));
  });
});

router.get('/statistics/word-count', function(req, res, next) {
  unirest.get('https://news-visualization-be.herokuapp.com/news-visualization/api/statistics/word-count')
      .header('Accept', 'application/json')
      .header('Accept-Encoding', 'gzip, deflate')
      .query(req.query)
      .end(function(response) {
        res.status(response.status).json(formatWordCountResponse(response.body));
      });
});

router.get('/media', function(req, res, next) {
  unirest.get('https://news-visualization-be.herokuapp.com/news-visualization/api/media')
      .header('Accept', 'application/json')
      .query(req.query)
      .end(function(response) {
        res.status(response.status).json(response.body);
      });
});

router.get('/categories', function(req, res, next) {
  unirest.get('https://news-visualization-be.herokuapp.com/news-visualization/api/categories')
      .header('Accept', 'application/json')
      .query(req.query)
      .end(function(response) {
        res.status(response.status).json(response.body);
      });
});

router.get('/by-category', function(req, res, next) {
  unirest.get('https://news-visualization-be.herokuapp.com/news-visualization/api/statistics/by-category')
      .header('Accept', 'application/json')
      .query(req.query)
      .end(function(response) {
        res.status(response.status).json(response.body);
      });
});

router.get('/titles', function(req, res, next) {
    unirest.get('http://news-visualization-be.herokuapp.com/news-visualization/api/titles')
        .header('Accept', 'application/json')
        .query(req.query)
        .end(function(response) {
            res.status(response.status).json(response.body);
        });
});

function formatWordCountResponse(response) {
  var myMax = 100, myMin = 10;
  return response.word_count.map(function(d) {
    return {
      text: d.word,
      size: ((d.quantity - response.min) / (response.max - response.min)) * (myMax - myMin) + myMin
    }
  });
};

function flattenStatisticsResponse(response) {
  if (response == undefined) return [];
  return response.reduce(function(acum, it) {
    return acum.concat(it.stats.reduce(function(prev, stat){
      return prev.concat([{media: it.value, date: stat.value, count: stat.count}]);
    }, []));
  }, []);
};

module.exports = router;

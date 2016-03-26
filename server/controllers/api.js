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
  unirest.get('http://localhost:8080/news-visualization/api/statistics/word-count')
      .header('Accept', 'application/json')
      .query(req.query)
      .end(function(response) {
        res.status(response.status).json(formatWordCountResponse(response.body));
      });
});

function formatWordCountResponse(response) {
  return response.map(function(d) { return { text: d.word, size: d.quantity } });
}

function flattenStatisticsResponse(response) {
  return response.reduce(function(acum, it) {
    return acum.concat(it.stats.reduce(function(prev, stat){
      return prev.concat([{media: it.value, date: stat.value, count: stat.count}]);
    }, []));
  }, []);
};

module.exports = router;

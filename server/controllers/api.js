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

router.get('/media', function(req, res, next) {
  unirest.get('https://news-visualization-be.herokuapp.com/news-visualization/api/media')
      .header('Accept', 'application/json')
      .query(req.query)
      .end(function(response) {
        res.status(response.status).json(response.body);
      });
});

function flattenStatisticsResponse(response) {
  if (response == undefined) return [];
  return response.reduce(function(acum, it) {
    return acum.concat(it.stats.reduce(function(prev, stat){
      return prev.concat([{media: it.value, date: stat.value, count: stat.count}]);
    }, []));
  }, []);
};

module.exports = router;

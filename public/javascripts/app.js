var hitslineChart = dc.seriesChart("#chart-line-hitsperday");
var ndx, dateDim, counts, minDate, maxDate;
var parseDate = d3.time.format("%Y-%m-%d").parse;
d3.json("api/statistics?from=2016-01-01&to=2016-01-20", function(error, experiments) {
    experiments.forEach(function(d){
        d.date = parseDate(d.date);
    })
    ndx = crossfilter(experiments);
    dateDim  = ndx.dimension(function(d) { return [d.media, d.date] });
    counts = dateDim.group().reduceSum(function(d) { return d.count; });
    minDate = dateDim.bottom(1)[0].date;
    maxDate = dateDim.top(1)[0].date;
    hitslineChart
        .chart(function(c) { return dc.lineChart(c).interpolate('basis'); })
        .width(1000).height(500)
        .elasticY(true)
        .dimension(dateDim)
        .group(counts)
        .seriesAccessor(function(d) {return "Media: " + d.key[0];})
        .keyAccessor(function(d) {return +d.key[1];})
        .x(d3.time.scale().domain([minDate,maxDate]));
    dc.renderAll();
});
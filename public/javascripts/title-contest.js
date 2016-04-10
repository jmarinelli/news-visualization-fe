var hitslineChart = dc.seriesChart("#chart");
d3.json("api/titles", function(error, data) {
    ndx = crossfilter(data);
    dateDim  = ndx.dimension(function(d) { return [d.title, d.date] });
    counts = dateDim.group().reduceSum(function(d) { return d.position; });
    minDate = dateDim.bottom(1)[0].date;
    maxDate = dateDim.top(1)[0].date;
    hitslineChart
        .chart(function(c) { return dc.lineChart(c).interpolate('basis'); })
        .width(1000).height(600)
        .elasticY(true)
        .xAxisLabel("Date")
        .yAxisLabel("Position")
        .dimension(dateDim)
        .group(counts)
        .brushOn(false)
        .mouseZoomable(true)
        .seriesAccessor(function(d) {return "Title: " + d.key[0];})
        .keyAccessor(function(d) {return +d.key[1];})
        .valueAccessor(function(d) {return d.value;})
        .legend(dc.legend().x(50).y(100).itemHeight(13).gap(5))
        .x(d3.time.scale().domain([minDate,maxDate]));
    dc.renderAll();
    });
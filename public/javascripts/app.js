var hitslineChart = dc.seriesChart("#chart-line-hitsperday");
var ndx, dateDim, counts, minDate, maxDate;
var parseDate = d3.time.format("%Y-%m-%d").parse;

refresh("2016-01-01", "2016-01-20");

d3.json("api/media", function(error, media) {
    media.forEach(function(d){
        $('#mediaChooser')
            .append($("<option></option>")
                .attr("value", d)
                .text(d));
    });
    $(".chosen-select").chosen({max_selected_options: 5});
});

$(function() {
    $.datepicker.setDefaults(
        $.extend($.datepicker.regional[""])
    );
    $('#startDate').datepicker({dateFormat: 'yy-mm-dd'});
    $('#endDate').datepicker({dateFormat: 'yy-mm-dd'});
});

function refresh(startDate, endDate) {
    if (startDate == null) startDate = $("#startDate").data('datepicker').getFormattedDate('yyyy-mm-dd');
    if (endDate == null) endDate = $("#endDate").data('datepicker').getFormattedDate('yyyy-mm-dd');

    var url = "api/statistics?from=" + startDate + "&to=" + endDate;
    d3.json(url, function(error, experiments) {
        ndx = crossfilter(experiments);
        experiments.forEach(function(d){
            d.date = parseDate(d.date);
        });
        dateDim  = ndx.dimension(function(d) { return [d.media, d.date] });
        counts = dateDim.group().reduceSum(function(d) { return d.count; });
        minDate = dateDim.bottom(1)[0].date;
        maxDate = dateDim.top(1)[0].date;
        hitslineChart
            .chart(function(c) { return dc.lineChart(c).interpolate('basis'); })
            .width(1000).height(500)
            .elasticY(true)
            .xAxisLabel("Date")
            .yAxisLabel("Hits")
            .dimension(dateDim)
            .group(counts)
            .seriesAccessor(function(d) {return "Media: " + d.key[0];})
            .keyAccessor(function(d) {return +d.key[1];})
            .x(d3.time.scale().domain([minDate,maxDate]));
        dc.renderAll();
    });
}
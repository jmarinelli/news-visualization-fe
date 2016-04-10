//var categoriesChart = dc.rowChart("#dc-bar-chart");

d3.json("api/categories", function(error, media) {
    media.forEach(function(d){
        $('#categoryChooser')
            .append($("<option></option>")
                .attr("value", d)
                .text(d));
    });
});

function refresh() {
    d3.select("svg").remove();
    d3.select("svg").remove();

    var url = "api/by-category?from=" + $("#startDate").val() + "&to=" + $("#endDate").val() + "&category=" + $('#categoryChooser').val();
    d3.json(url, function(error, data) {
        var ndx = crossfilter(data),
            mediaDimension  = ndx.dimension(function(d) {return d.media;}),
            countGroup = mediaDimension.group().reduceSum(function(d) {return d.count;});

        rowChart(ndx, mediaDimension, countGroup);
        pieChart(ndx, mediaDimension, countGroup);

        $("svg").width(1200);
    });
}

function rowChart(ndx, mediaDimension, countGroup) {
    var chart = dc.rowChart("#rowChart");

    // row chart day of week
    chart.width(1000)
        .height(500)
        .margins({top: 5, left: 10, right: 10, bottom: 20})
        .dimension(mediaDimension)
        .group(countGroup)
        .colors(d3.scale.category10())
        .ordering(function(d){return -d.value;})
        .label(function (d){
            return d.key;
        })
        .title(function(d){return d.value;})
        .elasticX(true)
        .xAxis().ticks(4);
    chart.render();
}

function pieChart(ndx, mediaDimension, countGroup) {
    var chart = dc.pieChart("#pieChart");
    chart
        .width(768)
        .height(480)
        .slicesCap(10)
        .innerRadius(100)
        .dimension(mediaDimension)
        .group(countGroup)
        .legend(dc.legend())
        .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
                return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
            })
        });
    chart.render();
}
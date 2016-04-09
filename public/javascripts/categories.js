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

    var url = "api/by-category?from=" + $("#startDate").val() + "&to=" + $("#endDate").val() + "&category=" + $('#categoryChooser').val();
    d3.json(url, function(error, data) {
        // Dimensions
        var margin = {
                top: 20,
                right: 20,
                bottom: 20,
                left: 200
            },
            width = parseInt(d3.select('#chart').style('width'), 10),
            width = width - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom,
            barHeight = 40,
            percent = d3.format('%');

        // Create the scale for the axis
        var xScale = d3.scale.linear()
            .range([0, width]); // the pixel range to map to

        var yScale = d3.scale.ordinal()
            // SECOND PARAM IS PADDING
            .rangeRoundBands([0, height], 0.5);

        // Create the axis
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom')
            .ticks(5);

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left');

        // TODO: Use max for range
        var max = d3.max(data, function(d) { return d.count; })

        xScale.domain([0, max]); // min/max extent of your data (this is usually dynamic e.g. max)
        yScale.domain(data.map(function (d) {
            return d.media;
        }));

        // Render the SVG
        var svg = d3.select('#chart')
            .append('svg')
            .attr('height', height + margin.top + margin.bottom)
            .append('g') // Group the content and add margin
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        // Render the axis
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        // Render the bars
        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('y', function (d) {
                return yScale(d.media);
            })
            .attr('width', function (d) {
                return xScale(d.count)
            })
            .attr('height', yScale.rangeBand);

        $("svg").width(1200);
    });
}
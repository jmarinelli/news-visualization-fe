$.get(
    "api/statistics/word-count",
    function(data) {
        var words = data;
        var fill = d3.scale.category20();
        var draw = function(words) {
            d3.select("body").append("svg")
                .attr("width", window.screen.width)
                .attr("height", window.screen.height)
                .append("g")
                //.attr("transform", "translate(150,150)")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-family", "Impact")
                .style("fill", function(d, i) { return fill(i); })
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
        }

        d3.layout.cloud().size([window.screen.width, window.screen.height])
            .words(words)
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            .font("Impact")
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();
    }
);
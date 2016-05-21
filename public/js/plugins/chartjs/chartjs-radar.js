window.onload = function() {
    d3.json("api/media", function(error, media) {
        media.forEach(function(d){
            $('#mediaChooser')
                .append($("<option></option>")
                    .attr("value", d)
                    .text(d));
        });
        $(".chosen-select").chosen();
    });

    refresh();
};

function refresh() {
    var media = $('#mediaChooser').val();

    if (media == undefined) return;

    var mediaQuery = "?";
    if (media != null) {
        mediaQuery += "medias=";

        media.forEach(function(media){
            mediaQuery += media;
            mediaQuery += ",";
        });
    }

    var url = "api/media/by-category" + mediaQuery;
    console.log(url);
    d3.json(url, function(error, data) {
        if (data == undefined) return;

        var media = [];

        data[0].categories.forEach(function(d2) {
            media.push(d2.value);
        });

        $("#charts-container").empty();

        data.forEach(function(d, i) {
            $("#charts-container").append('<label style="display:inline-block;" for="chart-' + d.media + '">' + d.media + '<br/><canvas id="chart-' + d.media + '"/></label>');

            var counts = [];

            d.categories.forEach(function(d2) {
                counts.push(d2.count);
            });

            // Radar Chart
            var radarChartData = {
                labels: media,
                datasets: [
                    {
                        label: "News published by media",
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: counts
                    }
                ]
            };

            var DOMElement = document.getElementById("chart-" + d.media);
            if (DOMElement != null) {
                var chart = new Chart(document.getElementById("chart-" + d.media).getContext("2d")).Radar(
                    radarChartData,{
                    responsive:false,
                });
            }


        });

    });

}

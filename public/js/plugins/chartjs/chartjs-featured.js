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
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    var media = $('#mediaChooser').val();

    if (startDate == "" || endDate == "" || media == undefined) return;

    var mediaQuery = "";
    if (media != null) {
        mediaQuery += "&media=";

        media.forEach(function(media){
            mediaQuery += media;
            mediaQuery += ",";
        });
    }

    var url = "api/statistics?from=" + formatDate(startDate) + "&to=" + formatDate(endDate) + mediaQuery;
    console.log(url);
    d3.json(url, function(error, data) {
        if (data == undefined) return;

        var dateList = {};
        var dateArray = [];
        var mediaList = [];
        var mediaCount = [];

        // Generate date list
        data.forEach(function(d) {
            if (dateList[d.date] == undefined) dateList[d.date] = {};
            dateList[d.date][d.media] = d.count;
            dateArray = $.map(dateList, function(obj, date) { return {date: date, value: obj} });

            var mediaContained = false;
            mediaList.forEach(function(media) {
                if (media == d.media) mediaContained = true;
            });
            if(!mediaContained) (mediaList.push(d.media));
        });

        dateArray.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(a.date) - new Date(b.date);
        });

        var mediaDatasets = [];

        var lineColors = ["rgba(220,220,220,0.2)", "rgba(151,187,205,0.2)", "rgba(205,151,187,0.2)", "rgba(187,205,151,0.2)"];
        var strokeColors = ["rgba(220,220,220,1)", "rgba(151,187,205,1)", "rgba(205,151,187,1)", "rgba(187,205,151,1)"];

        var i = 0;
        mediaList.forEach(function(media) {
            var dataset = {
                label: media,
                fillColor: lineColors[i % 4],
                strokeColor: strokeColors[i % 4],
                pointColor: strokeColors[i % 4],
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)"
            };

            var counts = [];

            dateArray.forEach(function(d) {
                if (d.value[media] == undefined) {
                    counts.push(0);
                } else {
                    counts.push(d.value[media]);
                }
            });

            dataset.data = counts;

            mediaDatasets.push(dataset);
            i++;
        });

        // Line Chart
        var lineChartData = {
            labels: $.map(dateArray, function(obj) { return obj.date; }),
            datasets: mediaDatasets
        };
        // End line chart

        if (window.LineChartSample != undefined) window.LineChartSample.destroy();
        window.LineChartSample = new Chart(document.getElementById("line-chart-sample").getContext("2d")).Line(lineChartData,{
            responsive:true,
            multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
        });

    });
}

function formatDate(date) {
    var d = new Date(date);
    return d.getUTCFullYear() +"-"+
        ("0" + (d.getUTCMonth()+1)).slice(-2) +"-"+
        ("0" + d.getUTCDate()).slice(-2);
}

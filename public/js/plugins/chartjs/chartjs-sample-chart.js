window.onload = function() {

     d3.json("api/categories", function(error, media) {
         media.forEach(function(d){
             $('#categoryChooser')
                 .append($("<option></option>")
                     .attr("value", d)
                     .text(d));
         });
     });

    refresh();
 };

 function refresh() {
     var startDate = $("#startDate").val();
     var endDate = $("#endDate").val();
     var category = $('#categoryChooser').val();

     if (startDate == "" || endDate == "" || category == "") return;

     var url = "api/by-category?from=" + formatDate($("#startDate").val()) + "&to=" + formatDate($("#endDate").val()) + "&category=" + category;
     d3.json(url, function(error, data) {
         if (data == undefined) return;

         mediaLabels = [];
         mediaCounts = [];

         data.forEach(function(d) {
             mediaLabels.push(d.media);
             mediaCounts.push(d.count);
         });

         // Bar chart
         var barChartData = {
             labels: mediaLabels,
             datasets: [
                 {
                     label: "News published by media",
                     fillColor: "rgba(151,187,205,0.5)",
                     strokeColor: "rgba(151,187,205,0.8)",
                     highlightFill: "rgba(151,187,205,0.75)",
                     highlightStroke: "rgba(151,187,205,1)",
                     data: mediaCounts
                 }
             ]
         };
         // End bar chart

         // Radar Chart
         var radarChartData = {
             labels: mediaLabels,
             datasets: [
                 {
                     label: "News published by media",
                     fillColor: "rgba(151,187,205,0.2)",
                     strokeColor: "rgba(151,187,205,1)",
                     pointColor: "rgba(151,187,205,1)",
                     pointStrokeColor: "#fff",
                     pointHighlightFill: "#fff",
                     pointHighlightStroke: "rgba(151,187,205,1)",
                     data: mediaCounts
                 }
             ]
         };
         // End radar chart

         // Polar and pie charts
         newData = [];

         var i;
         for (i = 0; i < 3; i++) {
             var obj = {};
             obj.value = data[i].count;
             obj.label = data[i].media;
             newData.push(obj);
         }

         newData[0].color = "#F7464A";
         newData[0].highlight = "#FF5A5E";

         newData[1].color = "#46BFBD";
         newData[1].highlight = "#5AD3D1";

         newData[2].color = "#FDB45C";
         newData[2].highlight = "#FFC870";
         // End polar and pie charts
         if (window.BarChartSample != undefined) window.BarChartSample.destroy();
         window.BarChartSample = new Chart(document.getElementById("bar-chart-sample").getContext("2d")).Bar(barChartData,{
             responsive:true
         });

         if (window.RadarChartSample != undefined) window.RadarChartSample.destroy();
         window.RadarChartSample = new Chart(document.getElementById("radar-chart-sample").getContext("2d")).Radar(radarChartData,{
             responsive:true
         });

         if (window.PolarChartSample != undefined) window.PolarChartSample.destroy();
         window.PolarChartSample = new Chart(document.getElementById("polar-chart-sample").getContext("2d")).PolarArea(newData,{
             responsive:true
         });

         if (window.PieChartSample != undefined) window.PieChartSample.destroy();
         window.PieChartSample = new Chart(document.getElementById("pie-chart-sample").getContext("2d")).Pie(newData,{
             responsive:true
         });

     });
 }

 function formatDate(date) {
     var d = new Date(date);
     return d.getUTCFullYear() +"-"+
     ("0" + (d.getUTCMonth()+1)).slice(-2) +"-"+
     ("0" + d.getUTCDate()).slice(-2);
 }
 
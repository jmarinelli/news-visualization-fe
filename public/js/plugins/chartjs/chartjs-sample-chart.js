 //Sampel Line Chart 
 var LineChartSampleData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [{
   label: "My First dataset",
   fillColor: "rgba(220,220,220,0.2)",
   strokeColor: "rgba(220,220,220,1)",
   pointColor: "rgba(220,220,220,1)",
   pointStrokeColor: "#fff",
   pointHighlightFill: "#fff",
   pointHighlightStroke: "rgba(220,220,220,1)",
   data: [65, 59, 80, 81, 56, 55, 40]
  }, {
   label: "My Second dataset",
   fillColor: "rgba(151,187,205,0.2)",
   strokeColor: "rgba(151,187,205,1)",
   pointColor: "rgba(151,187,205,1)",
   pointStrokeColor: "#fff",
   pointHighlightFill: "#fff",
   pointHighlightStroke: "rgba(151,187,205,1)",
   data: [28, 48, 40, 19, 86, 27, 90]
  }]
 };
 
 //Sampel Bar Chart
 var BarChartSampleData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};


//Sampel Radar Chart
var RadarChartSampleData = {
    labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 96, 27, 100]
        }
    ]
};

//Sampel Polor Chart
var PolarChartSampleData = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    },
    {
        value: 40,
        color: "#949FB1",
        highlight: "#A8B3C5",
        label: "Grey"
    },
    {
        value: 120,
        color: "#4D5360",
        highlight: "#616774",
        label: "Dark Grey"
    }

];

//Sampel Pie Doughnut Chart
var PieDoughnutChartSampleData = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    }
]

 window.onload = function() {

     refreshBarChart();
  
  window.RadarChartSample = new Chart(document.getElementById("radar-chart-sample").getContext("2d")).Radar(RadarChartSampleData,{
   responsive:true
  });
  
  window.PolarChartSample = new Chart(document.getElementById("polar-chart-sample").getContext("2d")).PolarArea(PolarChartSampleData,{
   responsive:true
  });
  
  window.PieChartSample = new Chart(document.getElementById("pie-chart-sample").getContext("2d")).Pie(PieDoughnutChartSampleData,{
   responsive:true
  });
  window.DoughnutChartSample = new Chart(document.getElementById("doughnut-chart-sample").getContext("2d")).Pie(PieDoughnutChartSampleData,{
   responsive:true
  });
  

 };

 function refreshBarChart() {
     var url = "api/by-category?from=" + $("#startDate").val() + "&to=" + $("#endDate").val() + "&category=Deportes";
     d3.json(url, function(error, data) {
         mediaLabels = [];
         mediaCounts = [];

         data.forEach(function(d) {
             mediaLabels.push(d.media);
             mediaCounts.push(d.count);
         });

         //Sampel Bar Chart
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

         window.BarChartSample = new Chart(document.getElementById("bar-chart-sample").getContext("2d")).Bar(barChartData,{
             responsive:true
         });
     });
 }
 
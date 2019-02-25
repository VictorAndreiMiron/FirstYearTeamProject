var myChart = document.getElementById('myChart').getContext('2d');
var t = 1065120;
var choice = [0,0,0];
var labels = ['option1','option2','option3'];
let massPopChart = new Chart(myChart, {
     type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
     data:{
       labels:labels,
       datasets:[{
         label:'Votes',
         data:choice,
         //backgroundColor:'green',
         backgroundColor:[
           'rgba(255, 99, 132, 0.6)',
           'rgba(54, 162, 235, 0.6)',
           'rgba(255, 162, 132, 0.6)'
         ],
         borderWidth:1,
         borderColor:'#777',
         hoverBorderWidth:2,
         hoverBorderColor:'#000'
       }]
     },
     options:{
       title:{
         display:true,
         text:'Number of Votes',
         fontSize:25
       },
       legend:{
         display:true,
         position:'right',
         labels:{
           fontColor:'#000'
         }
       },
       layout:{
         padding:{
           left:40,
           right:0,
           bottom:0,
           top:0
         }
       },
       tooltips:{
         enabled:true
       }
     }
   });

  var socket = io.connect('http://localhost:4000/');
   socket.on('newScenario', function(datas){
     document.getElementById('plot').innerHTML = datas.scenario.plot;
     document.getElementById('option1').innerHTML = datas.scenario.option1;
     document.getElementById('option2').innerHTML = datas.scenario.option2;
     document.getElementById('option3').innerHTML = datas.scenario.option3;
     updateLabels(datas.scenario.option1,datas.scenario.option2,datas.scenario.option3);
     updateScores(datas.votes);
   });
   socket.on('testEvent', function(data){
     document.getElementById("plot").innerHTML = data.plot;
   });
   socket.on('currentTime', function(data){
     document.getElementById('time').innerHTML = data.time;
   });

   function updateLabels(var1,var2,var3) {

   var newLabels = [var1,var2,var3];


massPopChart.data.labels = newLabels;
massPopChart.update();

 }

 function updateScores(votes)
 {
  choice[0]=votes[0];
  choice[1]=votes[1];
  choice[2]=votes[2];
   massPopChart.update();
 }

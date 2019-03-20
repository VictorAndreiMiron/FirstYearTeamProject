let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var socket = require('socket.io');
var urlbodyparser = bodyParser.urlencoded({extended : false});
var server = app.listen(port,function(){
  console.log("e pe fenta");
});
//DB connection
const mongoose = require('mongoose');
const Scenario = require('./models/scenario');
//Connect to mongodb
mongoose.Promise = global.Promise;

  mongoose.connect(process.env.MONGODB_URI ||'mongodb://butterfly:parola123@ds247327.mlab.com:47327/heroku_gfhrhs5t',{useNewUrlParser: true});
  mongoose.connection.once('open',function(){
      console.log('db connected');
      app.emit('dbReady');

    }).on('error', function(error){
      console.log(error);
    });


var io = socket(server);
var votes = [0,0,0];
var currentScenarioIndex = 0;
var currentScenario;





var roundTimeLeft = 30;
var scenarios = [{plot:"Scenario1" , option1: {q:"goScenario2", next: 1 },option2: {q:"goScenario2", next: 2  }, option3: {q:"goScenario2", next: 3  }},
{plot:"Scenario2" , option1: {q:"goScenario2", next: -1 },option2: {q:"goScenario2", next: -1  }, option3: {q:"goScenario2", next: -1  }},
{plot:"Scenario3" , option1: {q:"goScenario2", next: -1 },option2: {q:"goScenario2", next: -1  }, option3: {q:"goScenario2", next: -1  }},
{plot:"Scenario4" , option1: {q:"goScenario2", next: 0 },option2: {q:"goScenario2", next: 0  }, option3: {q:"goScenario2", next: 0  }}];

app.set('view engine', 'ejs');
app.use('/javaScript',express.static('javaScript'));
app.use('/css', express.static('css'));
app.use('/img', express.static('img'));
app.get('/',function(req,res){
 res.render('index');
});
app.get('/index',function(req,res){
 res.render('index');
});
app.get('/hostView',function(req,res){
  res.render('hostView',{question : "" , answer1: "" , answer2 : "",answer3: ""});


  });
io.on('connection',function(socket){
  console.log('conectat');

 Scenario.findOne({idTree:currentScenarioIndex},function(err,scenariof){
  if(scenariof.option1 != "Kill")
  io.emit("initialScenario",{
    scenario: scenariof,votes : votes});
  else {
    {
      io.emit("initialScenario",{
        scenario: scenariof,votes : votes});
      io.emit("ending",{
        scenario: scenariof,votes : votes
      });
    }
}

});
if(ended)
io.emit('disableVotes');
  socket.on('vote',function(data){
    votes[data.option]++;
    console.log(votes);
    io.emit("votesUpdate", {
      votes: votes
    });



  });
});
var ended = false;
setInterval(function(){
  /*Scenario.findOne({idTree:currentScenarioIndex},function(err,scenariof){
  io.emit("newScenario",{
    scenario: scenariof,votes : votes});
});*/
  io.emit("currentTime", {time : roundTimeLeft});

  roundTimeLeft--;
  if(roundTimeLeft == 0)
  {
    io.emit("disableVotes");
    if(findMaxVotes() == 0)
      currentScenarioIndex = 3* currentScenarioIndex +1 ;
    else if (findMaxVotes() == 1)
      currentScenarioIndex = 3* currentScenarioIndex + 2;
    else {
      currentScenarioIndex = 3* currentScenarioIndex + 3;
    }
    console.log(currentScenarioIndex);
    Scenario.findOne({idTree:currentScenarioIndex},function(err,scenariof){
    if(scenariof.option1 != "Kill"){
      ended=false;
    io.emit("newScenario",{
      scenario: scenariof,votes : votes});
      io.emit("enableVote");
    }
    else {
      {
       ended = true;
        io.emit("ending",{
          scenario: scenariof,votes : votes});
        currentScenarioIndex = -1/3;
      }
    }

  });
    roundTimeLeft = 30;
    votes = [0,0,0];

  }
},1000);

function findMaxVotes()
{
  var max = votes[0];
  var maxi=0;
  for(var i = 1 ; i < votes.length;i++)
  {
    if(max < votes[i])
    {
      max = votes[i];
      maxi = i;
    }
  }
  return maxi;
}
app.get('/playerView',function(req,res){
  res.render('playerView');
});
app.get('/contact',function(req,res){
  res.render('contact');
});

var socket = io.connect('https://butterfly-effect-w3.herokuapp.com/' ||'http://localhost:5000/');
function vote(option)
{
   socket.emit("vote",{option : option});
   document.getElementById('button0').disabled = true;
   document.getElementById('button1').disabled = true;
   document.getElementById('button2').disabled = true;

}

socket.on("disableVotes",function(){
  document.getElementById('button0').disabled = false;
  document.getElementById('button1').disabled = false;
  document.getElementById('button2').disabled = false;
});

socket.on("enableVote",function(){
  document.getElementById('button0').disabled = false;
  document.getElementById('button1').disabled = false;
  document.getElementById('button2').disabled = false;
});

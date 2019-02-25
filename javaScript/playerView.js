  var socket = io.connect('http://localhost:4000/');

  function vote(option)
  {
    socket.emit("vote",{option : option});
     document.getElementById('plot').innerHTML = 'test1';
     document.getElementById('button1').disabled = true;
     document.getElementById('button2').disabled = true;
     document.getElementById('button3').disabled = true;

  }

  socket.on("enableVote",function(){
    document.getElementById('button1').disabled = false;
    document.getElementById('button2').disabled = false;
    document.getElementById('button3').disabled = false;
  });

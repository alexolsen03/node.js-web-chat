var express = require('express');

var app = express.createServer();
var io = require('socket.io').listen(app);

app.listen(4000);

//set the folder where our static documents are located
app.use(express.static('c:/xampp/htdocs/node-js-chat/'));

var users = [];

io.sockets.on('connection', function(socket){

	socket.on('join', function(username){
		users.push(username);
		io.sockets.emit('update', users);
	});

	socket.on('display', function(message){
		io.sockets.send(message);
	});
	
	socket.on('leave', function(username){
		for(var i=0;i<users.length;i++){
			if(users[i] == username){
				users.splice(i,1);
			}
		}
		io.sockets.emit('update', users);
	});

});
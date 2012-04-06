var username;

function join(){

	username = $('#username').val();
	
	$('#chat_box').addClass('active');
	$('#sign_in').css('display', 'none');
	
	socket = io.connect('http://localhost:4000');

	socket.on('connect', function(){
		socket.emit('join', username);
		socket.emit('display', "<b style='color: green;'>" + username + ' connected</b><br>');
	});
	
	socket.on('update', function(users){
		$('#results').empty();
		$.each(users, function(i, member){
			$('#results').append('<li>'+ member +'</li>');
		});
	});

	socket.on('message', function(message){
		$('#messages').html(message + $('#messages').html());
	});
	
	socket.on('disconnect', function(username){
		socket.emit('leave', username);
		socket.emit('display',"<span class='left'>" + username + ' disconnected</span><br>');
		socket.disconnect();
	});
	
	$('#message').keydown(function(event){
		if(event.keyCode === 13){
			socket.emit('display', "<b><span class='user'>" + username + ": </span></b><span class='message'>" + $('#message').val() + '</span><br>');
			$('#message').val('');
		}
	});

}

function leave(){
	socket.emit('leave', username);
	socket.emit('display',"<span class='left'>" + username + ' disconnected</span><br>');
	socket.disconnect();
	window.location.replace("http://localhost:4000");
}
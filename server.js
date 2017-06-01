// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
	console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

// Chatroom

var userList = [];

io.on('connection', function (socket) {

	// 新用户加入
	socket.on('join', function (data) {
		userList.push(data);
		socket.broadcast.emit('login', {
			username: data.username,
			userList
		});
	});

	socket.on('disconnect', function () {
		userList = userList.filter(x => x.name != socket.username);
		socket.broadcast.emit('leave', {
			username: socket.username,
			userList
		});
	});
});
var log = function (message) {
	//alert(message);
};

window.onload = function () {
	var username;
	var socket = io();

	socket.on('login', function (data) {
		addUser(data);
	});

	socket.on('join', function (data) {
		log(data.username + ' joined');
		socket.emit('join', data);
	});

	socket.on('disconnect', function () {
		log('you have been disconnected');
	});

	socket.on('reconnect', function () {
		log('you have been reconnected');
		if (username) {
			socket.emit('add user', username);
		}
	});

	socket.on('reconnect_error', function () {
		log('attempt to reconnect has failed');
	});

	var addUser = function (user) {
		document.getElementsByClassName('userList')[0].innerHTML += `<li>${user.username}</li>`;
	};

	document.getElementsByClassName('btnLogin')[0].onclick = function (){
		var username = document.getElementsByClassName('username')[0].value;
		var data = {username};
		addUser(data);
		socket.emit('join', data);
	};

};

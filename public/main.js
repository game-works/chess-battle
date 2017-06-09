/**
 * Created by likaituan on 02/06/2017.
 */

window.onload = function () {
	window.username = '';
	window.addUser = function (user) {
		document.getElementsByClassName('userList')[0].innerHTML += `<li>${user.username}</li>`;
	};
	window.socket = io();

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


	window.Data = {};
	go('gate');
};
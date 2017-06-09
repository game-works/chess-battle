var log = function (message) {
	//alert(message);
};

Page.gate = {
	getHTML: function () {
		return `
		<div>
            <p><input class="username" placeholder="input your name"/></p>
            <p><input class="password" placeholder="input your password"/></p>
            <button class="btnLogin" data-event="login">login</button>
            <span data-event="enterByGuess">guess</span>
        </div>
        `;
	},
	onInit: function () {

	},
	login: function (){
		var username = document.getElementsByClassName('username')[0].value;
		var data = {username};
		addUser(data);
		socket.emit('join', data);
	},
	enterByGuess: function () {
		var username = document.getElementsByClassName('username')[0].value;
		var data = {username};
		addUser(data);
		socket.emit('join', data);
	}
};

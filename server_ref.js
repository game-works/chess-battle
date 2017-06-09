var express = require('express');
var app = express();
var interface = require('./interface');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({limit: 10 * 1024 * 1024, extended: true}));
app.use(express.static('public'));

Object.keys(interface).forEach(method => {
	app.post(`/service/${method}`, (req, res) => interface[method](req, res));
});

var port = 9002;
app.listen(port, err => {
	if (err) {
		return console.log(err);
	}
	console.log(`Node Is Running At http://localhost:${port}`);
});
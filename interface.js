var data = require('./data.json');
var fs = require('fs');

// 获取数据
exports.getData = function (req, res) {
	res.json(data);
};

// 保存数据
exports.saveData = function (req, res) {
	var dateTime = new Date().toISOString();
	var file = `./data/${dateTime}.json`;
	var code = req.body.json;
	fs.writeFileSync(file, code);
	res.json({ok: 1});
};
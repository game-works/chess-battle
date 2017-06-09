/**
 * Created by likaituan on 05/06/2017.
 */

var getParams = function (data){
	var params = [];
	for(var key in data) {
		var val = data[key];
		if (typeof val === 'object') {
			val = JSON.stringify(val);
		}
		params.push(`${key}=${val}`);
	}
	return params.join('&');
};

var Ajax = function (ops) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open(ops.type || 'get', ops.url);
		xhr.onload = function () {
			resolve(xhr.response, xhr);
		};
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
		xhr.responseType = ops.dataType || 'json';
		var data = getParams(ops.data || '');
		xhr.send(data || null);
	});
};

Ajax.get = function (url) {
	return Ajax({type: 'get', url});
};

Ajax.post = function (url, data) {
	return Ajax({type: 'post', url, data});
};
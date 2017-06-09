/**
 * Created by likaituan on 05/06/2017.
 */

window.Page = {};

var parseEvent = function (obj, view) {
	var methods = obj.dataset.event;
	var [method, params] = methods.split(/\s*:\s*/);
	var fun = view[method];
	if (!fun) {
		throw `warning: method [${method}] is not defined!`;
	}
	fun = fun.bind(view);
	params = params || '';
	params = params.split(/\s*,\s*/) || [];
	params = params.map(x => /\D/.test(x) ? x : +x);
	obj.tap(fun, params, view);
};

window.go = function (page, params) {
	var view = Page[page];
	view.render = view.render || function () {
		document.body.innerHTML = view.getHTML(Data, page);
		document.body.querySelectorAll('[data-event]').forEach(obj => parseEvent(obj, view));
	};
	view.render();
};

var bind_events = {};

HTMLElement.prototype.unbind = function (evt){
	var fun = bind_events[this];
	fun && this.removeEventListener(evt, fun);
	return this;
};

HTMLElement.prototype.bind = function (evt, fun){
	bind_events[this] = fun;
	this.addEventListener(evt, fun);
	return this;
};

HTMLElement.prototype.tap = function (srcFun, params, view){
	this.unbind('click');
	var fun = function () {
		view.element = this;
		srcFun(...params);
	};
	this.bind('click', fun);
	return this;
};
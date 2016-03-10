// 所需工具包
var util = {
	//节流器
	throttle: (function() {
		var task;
		return function(handle) {
			clearTimeout(task);
			task = setTimeout(handle, 500);
		};
	})(),
	//TODO:需要考虑到其他常规dom元素转换
	strToDom: function(str) {
		var oTbody = document.createElement('tbody');
		oTbody.innerHTML = str;
		return oTbody;
	},
	addEvent: (function() {
		if (document.addEventListener) {
			return function(dom, type, handler) {
				dom.addEventListener(type, handler, false);
			};
		} else if (document.attachEvent) {
			return function(dom, type, handler) {
				dom.attachEvent("on" + type, handler);
			};
		} else {
			return function(dom, type, handler) {
				dom["on" + type] = handler;
			};
		}
	})()
};


var dealTable = (function() {

	// 获取所需dom
	var tableWrap = null,
		oTable = null,
		bLong = 0;

	// 引入外部工具函数
	var utilCopy = util;

	//TODO:需要改成ajax
	var loadData = function() {

		var str = '',
			strDom;
		for (var i = 0; i < 10; i++) {
			str += '<tr><td>' + (i + 1) + '</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>';
		}
		strDom = utilCopy.strToDom(str);
		oTable.appendChild(strDom);
	};

	// 判断是否可以加载数据
	var judLoad = function() {

		var tableHeight = tableWrap.scrollHeight,
			tableWrapHeight = tableWrap.clientHeight,
			scrollBottom = tableHeight - tableWrapHeight - tableWrap.scrollTop;
		if (scrollBottom < bLong) {
			loadData();
		}
	};

	// 模块初始化，给表格复合自添加滚动事件
	var start = function() {

		utilCopy.addEvent(tableWrap, 'scroll', function() {
			utilCopy.throttle(judLoad);
		});
	};

	// 初始化内部所需变量
	var setValue = function(id, distance) {

		tableWrap = document.querySelector('#' + id);
		oTable = tableWrap.querySelector('table');
		bLong = distance;
	};
	/**启动懒加载
	 *@param id {String}  表格容器的id
	 *@param distance {Number}  根据距离判断什么时候触发加载
	 */
	var lazyLoad = function(id, distance) {

		setValue(id, distance);
		start();

	};
	return {
		lazyLoad: lazyLoad
	};

})();
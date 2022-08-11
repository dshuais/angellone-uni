export function Sort(obj) { //排序的函数
	var newkey = Object.keys(obj).sort();
	//先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
	var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
	for (var i = 0; i < newkey.length; i++) { //遍历newkey数组
		newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
	}
	return newObj; //返回排好序的新对象
}

export function gettime() {
	let data = new Date()
	let yy = data.getFullYear()
	let mo = data.getMonth() + 1
	let dd = data.getDate()
	let hh = data.getHours()
	let mm = data.getMinutes()
	let ss = data.getSeconds()
	let tt = data.getTime()
	if (mo < 10) {
		mo = '0' + mo
	}
	if (dd < 10) {
		dd = '0' + dd
	}
	if (hh < 10) {
		hh = '0' + hh
	}
	if (mm < 10) {
		mm = '0' + mm
	}
	if (ss < 10) {
		ss = '0' + ss
	}
	return yy.toString() + mo.toString() + dd.toString() + hh.toString() + mm.toString() + ss.toString()
}

export function gettime1() {
	let data = new Date()
	let yy = data.getFullYear()
	let mo = data.getMonth() + 1
	let dd = data.getDate()
	let hh = data.getHours()
	let mm = data.getMinutes()
	let ss = data.getSeconds()
	let tt = data.getTime()
	if (mo < 10) {
		mo = '0' + mo
	}
	if (dd < 10) {
		dd = '0' + dd
	}
	if (hh < 10) {
		hh = '0' + hh
	}
	if (mm < 10) {
		mm = '0' + mm
	}
	if (ss < 10) {
		ss = '0' + ss
	}
	return yy.toString() + '-' + mo.toString() + '-' + dd.toString()
}

export function getDays(timer) {
	let dd = timer * 1000

	// 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
	let date = new Date(dd);
	let Y = date.getFullYear() + '-';
	let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
	let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())

	// console.log(Y + M + D + h + m + s); //呀麻碟
	return Y + M + D + h + m + s
}

export function getDayymd(timer) {
	let dd = timer

	// 比如需要这样的格式 yyyy-MM-dd
	let date = new Date(dd);
	let Y = date.getFullYear() + '-';
	let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate()
	// let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	// let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	// let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())

	// console.log(Y + M + D); //呀麻碟
	return Y + M + D
}

export function getDay(timer) {
	let dd = timer * 1000
	// 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
	let date = new Date(dd);

	// Y = date.getFullYear() + '-';
	let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	let D = date.getDate() + ' ';

	let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
	// s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())

	return M + D + h + m
}

export function getD(timer) {
	let dd = timer * 1000
	// 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
	let date = new Date(dd);

	// Y = date.getFullYear() + '-';

	let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
	// s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())

	return h + m
}

export function gettimer() {
	let data = new Date()

	let tt = data.getTime()
	return tt
}

export function gettimer1() {
	let data = new Date()
	let tt = data.getTime() / 1000
	return tt.toFixed(0)
}

// : gettime,  //获取当前时间
// : gettimer, // 获取当前js时间戳  (JS时间戳比标准的精确1000)
// : gettimer1, // 获取标准时间戳
// : getDay //时间戳转日期

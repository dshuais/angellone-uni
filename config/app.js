

// 请求配置
module.exports = {
	// 请求域名 格式： https://您的域名
	// #ifdef MP
	HTTP_REQUEST_URL: '',
	// #endif
	// #ifdef H5
	//H5接口是浏览器地址
	HTTP_REQUEST_URL: window.location.protocol + "//" + window.location.host,
	// #endif
	// HTTP_REQUEST_URL: "http://127.0.0.1:9529/api/", // 本地
	HTTP_REQUEST_URL: "https://angellone.dshuais.com/api/", // 线上
	HEADER: {
		// 'content-type': 'application/json'
		'content-type': 'application/x-www-form-urlencoded',
		// 'content-type': 'application/json;charset=UTF-8'
	},
	// 回话密钥名称 请勿修改此配置
	TOKENNAME: 'Authorization',
	// 缓存时间 0 永久
	EXPIRE: 0,
	//分页最多显示条数
	LIMIT: 10,
}

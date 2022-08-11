import {
	HTTP_REQUEST_URL,
	HEADER,
	TOKENNAME,
	ANGELLONE_USERINFO
} from '@/config/app';
import { getToken, removeToken, remove } from '@/utils/cache.js'

/**
 * 发送请求
 */
function baseRequest(url, method, data, opt) {
	let Url = HTTP_REQUEST_URL, header = HEADER
	if (getToken()) header[TOKENNAME] = 'Bearer ' + getToken()
	
	// header[TOKENNAME] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjYsInNjb3BlIjo4LCJleHAiOjE2NDQwMjk5MDQsImlhdCI6MTY0MTQzNzkwNH0.H29jFp9wlvlOVuDGDJrjl4O8iwfwanV-Gpq0Qno9yss'
	return new Promise((reslove, reject) => {
		// if (!opt.noAuth) {	
		// 	console.log('login')
		// 	uni.showLoading({
		// 		title: "加载中"
		// 	})
		// }
		// if(opt.contentType){
		// 	header = opt.contentType;
		// 	if (token) header[TOKENNAME] = 'Bearer ' + token;
		// }
		const { isModal = true, loading } = opt
		if(loading) {
			uni.showLoading({
				title: '加载中...'
			})
		}
		uni.request({
			url: Url + url,
			method: method || 'GET',
			header: header,
			data: data || {},
			success: (res) => {
				uni.hideLoading()
				// console.log('请求状态码', res.data)
				const { msg, code } = res.data
				if (msg == '非法访问' || code == 401) {
					removeToken()
					remove(ANGELLONE_USERINFO)
					isModal && uni.showModal({
						title: '提示!',
						content: '您还未登录!请登录后再试',
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/subUser/login/index'
								})
							} else {}
						}
					})
				}
				//  else if(code == 500) { // [400,500].includes(code)
				// 	uni.showToast({
				// 		title: msg,
				// 		icon: 'none',
				// 		duration: 1500
				// 	})
				// }
				reslove(res.data)
			},
			fail: (msg) => {
				uni.hideLoading()
				reject('请求失败')
			}
		})
	});
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data, opt) => baseRequest(api, method, data, opt || {})
});



export default request;

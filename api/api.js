import request from "@/utils/request.js";

/**
 * 之前的请求格式 已弃用并优化
 * noAuth 并没有做什么处理 就加了个loading 已关闭 继续添加无效
 */
// export function login(data) {
//     return request.post("/bar/user/wxapp/auth", data, {
//         noAuth: true
//     });
// }

/**
 * 新写法 添加一个{loading} 加个统一处理的loading而已 某些场景需要时触发
 * export const wxlogin = data => request.post("", data, {loading:true}) // 登陆 - 需要请求loading
 * export const getTokenStatus = data => request.get('', data, {isModal:false}) // 查询token状态 - 当401的时候不需要弹出去登陆
 *  @param {*} data 参数
 * 	@param {
		loading:true 是否需要全局loading 默认false
		isModal:false 当401时是否需要全局弹出modal 默认true
	} 
 */
/**
 *  用户相关
 */
export const wxlogin = data => request.post("user/wxlogin", data, {loading:true}) // 登陆

export const getTokenStatus = data => request.get('user/status', data, {isModal:false}) // 查询token状态

export const resetPwd = data => request.patch('user/changePwd', data) // 修改密码

export const updateUserInfo = data => request.put('user/update', data) // 修改用户信息

export const getUserInfo = _ => request.get('user/info') // 获取用户信息


/**
 *  图片池相关
 */
export const getSquareList = data => request.post('selected/list', data) // 查询图片列表

export const getTodaySelected = () => request.get('selected') // 查询每日精选图片

export const getTodayGuide = id => request.get(`selected/guide/${id}`) // 查询每日的引导页

export const getNewestSwiper = _ => request.get('selected/swiper') // 查询最新的轮播图

export const getStarMaxUser = _ => request.get('selected/staruser') // 查询当前star最高的用户信息


/**
 *  意见反馈相关
 */
export const submitFeedback = data => request.post('feedback/add', data) // 添加反馈意见

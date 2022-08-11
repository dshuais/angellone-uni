
export const systemInfo = {
	data: () => ({
		// custom: {},
		statusBarHeight: 0, // 状态栏高度
		navigationBarHeight: 0, // 导航栏高度
		navHeight: 0, // 总体顶部高度
		windowHeight: 0, // 可使用窗口高度
		windowWidth: 0, // 屏幕宽度
		
	}),
	
	methods: {
		getSystemInfo() {
			// this.custom = getApp().globalData.custom
			this.statusBarHeight = getApp().globalData.statusBarHeight
			this.navigationBarHeight = getApp().globalData.navigationBarHeight
			this.navHeight = getApp().globalData.navHeight
			this.windowHeight = getApp().globalData.windowHeight
			this.windowWidth = getApp().globalData.windowWidth
		}
	}
}
<script>
	export default {
		globalData: {
			statusBarHeight: 0, // 状态导航栏高度
			navHeight: 0, // 总体高度
			navigationBarHeight: 0, // 导航栏高度(标题栏)
			custom: {}, // 胶囊的信息
			
			windowWidth: 0,
			windowHeight: 0,
			
			networkStatus: void 0, // 当前网络状态
		},
		onLaunch: function() {
			console.log('Angell One App onLaunch')
			const { statusBarHeight, windowHeight, windowWidth } = uni.getSystemInfoSync()
			
			this.globalData.windowHeight = windowHeight
			this.globalData.windowWidth = windowWidth
			// 状态栏的高度
			this.globalData.statusBarHeight = statusBarHeight
			// #ifdef MP-WEIXIN
			// 获取微信胶囊的位置信息 width，height，top，right，left，bottom
			const custom = wx.getMenuButtonBoundingClientRect()
			this.globalData.custom = custom
			// 导航栏高度 = 胶囊高度  + (顶部距离 - 状态栏高度) * 2
			this.globalData.navigationBarHeight = custom.height + (custom.top - this.globalData.statusBarHeight) * 2
			// 总体高度 = 状态栏高度 + 导航栏高度
			this.globalData.navHeight = this.globalData.statusBarHeight + this.globalData.navigationBarHeight
			// #endif
			
			// console.log(this.globalData);
			
			// 监听网络状态变化
			uni.onNetworkStatusChange(function(res) {
				console.log('网络状态' ,res)
			})
			// this.getNetwork()
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
		methods: {
			getNetwork () {
				uni.getNetworkType({
					success: ({ networkType }) => {
						this.globalData.networkStatus = networkType
						// console.log('网络状态2',networkType)
						switch (networkType) {
							case 'none': 
								setTimeout(() => {
									uni.showToast({
										title: '网络开小差了，请检查网络设置哦~',
										icon: 'none',
										duration: 2000
									})
									setTimeout(() => {
										uni.reLaunch({
											url: '/pages/noneNetwork/index'
										})
									}, 500)
								}, 200)
								break
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	@import url('@/static/style/index.scss');
</style>

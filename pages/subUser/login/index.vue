<template>
	<div class='container'>
		<u--image :src="selected.url" :lazy-load="true" width='100%' height='100%'></u--image>
		<img class='posi-a logo' src="@/static/image/logo.png" alt="">
		<div class='posi-a words fons-28 mr10'>
			<!-- <p style='margin-bottom: -112rpx;'>为 你 而 来</p>
			<p>总 有 人 山 高 水 远</p> -->
			<p style='margin-bottom: -152rpx;'>{{ endR }}</p>
			<p>{{ startR }}</p>
		</div>
		<div class='posi-a start c-fff'>
			<button class='mt30 flex btn-login' @click="handleLogin">S T A R T</button>
			<p class='flex mt20 fons-16' @click='logInLater'>log in later</p>
			<p class='text-c posi-a flex text'>仅用于登录，不会获取您的手机号等敏感信息。</p>
		</div>
	</div>
</template>

<script>
	import { wxlogin, getTodaySelected } from '@/api/api'
	import { setStoreage, setToken } from '@/utils/cache'
	import { ANGELLONE_USERINFO } from '@/config/app'
	export default {
		name: 'Login',
		data() {
			return{
				code: void 0,
				defaultSelected: {url:'http://ds.dshuais.com/425708edd0ca6e4610de25b0f.jpg'},
				selected: void 0, // 查询每日推荐 在这里数据当作背景
				startR: void 0, // remark文本第一句
				endR: void 0, // 2
			}
		},
		onLoad() {
			this.getToday()
			this.getLoginCode()
		},
		methods: {
			// 获取每日精选
			async getToday() {
				const { data } = await getTodaySelected()
				this.selected = data[0] || this.defaultSelected
				this.startR = this.selected.remark?.split('，')[0]
				this.endR = this.selected.remark?.split('，')[1]
			},
			
			// 获取login code
			getLoginCode() {
				uni.login({
					success: res => {
						this.code = res.code
					}
				})
			},
			
			// 点击登陆
			handleLogin() {
				uni.getUserProfile({
					desc: '用于完善用户信息',
					success: res => {
						const {encryptedData,iv} = res
						// this.$load()
						uni.checkSession({
							success: response => {
								this.login(encryptedData, iv, this.code)
							},
							fail: err => {
								uni.login({
									success: ress => {
										this.login(encryptedData, iv, ress.code)
									}
								})
							}
						})
					},
					fail: err => {
						this.$msg('已取消授权')
					}
				})
			},
			
			async login (encryptedData,iv,code) {
				const { data, token,msg } = await wxlogin({encryptedData,iv,code})
				if(!token) return this.$msg(msg)
				setToken(token)
				setStoreage(ANGELLONE_USERINFO, data)
				this.$msg('登录成功',1)
				setTimeout(() => {
					uni.navigateBack()
				}, 1000)
			},
			
			// 稍后登录
			logInLater () {
				uni.navigateBack()
			},
			
		}
	}
</script>

<style lang="scss" scoped>
::v-deep.container{
	 .u-transition{
		width: 100%;
		height: 100%;
	}
	.start {
		bottom: 0;
		left: 0;
		width: 100%;
		height: 25%;
		// background: #fff;
		// border-radius: 56rpx;
		// filter: opacity(0.75);
		
		.btn-login {
			// border: none;
			width: 70%;
			height: 80rpx;
			border-radius: 40rpx;
			background: transparent;
			border: 4rpx solid #fff;
			color: #fff;
			font-weight: bold;
			box-shadow: 0px 5px 12px -5px #fff;
		}
		
		.text {
			width: 100%;
			bottom: 68rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}
	
	.logo {
		top: 152rpx;
		left: 20rpx;
		width: 480rpx;
		height: 80rpx;
	}
	
	.words {
		top: 250rpx;
		right: 0;
		color: #fff;
		writing-mode: vertical-lr;
		text-align: end;
		p {
			letter-spacing: 20rpx;
		}
	}
}
</style>
<template>
	<view class="container">
		<u--image :src="recommend.url" :lazy-load="true" width='100%' height='100%'></u--image>
		<!-- <view class="posi-a down c-fff flex" @click="countDownFinish">
			<p class='fons-12'>跳过</p>
			<u-count-down :time="5 * 1000" format="ss" autoStart @finish='countDownFinish'></u-count-down>
		</view> -->
		<view class="posi-a cavas-dd c-fff flex">
			<canvas class="canvas" canvas-id="canvas" width='50px' height='50px' @click="countDownFinish"></canvas>
		</view>
	</view>
</template>

<script>
	import { getToken, remove, setToken, setStoreage } from '@/utils/cache'
	import { ANGELLONE_USERINFO } from '@/config/app'
	import { getTokenStatus, getTodayGuide } from '@/api/api'
	export default {
		data() {
			return {
				guide: {
					url: 'http://ds.dshuais.com/425708edd0ca6e4610de25b18.jpg'
				},
				recommend: void 0,
				timer: void 0,
				timerS: void 0,
				ss: 5,
				val: 0
			}
		},
		onLoad() {
			uni.getNetworkType({
				success: ({ networkType }) => {
					if(networkType == 'none') return (
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
							}, 1000)
						}, 200))
					// this.canvasInit(this.ss)
					// this.timer = setInterval(() => {
					// 	this.canvasInit(this.ss, this.val)
					// }, 10)
					// this.timerS = setInterval(() => {
					// 	this.ss -= 1
					// }, 1000)
					
					this.getTodaySelectGuide()
					this.getUserLoginState()
				}
			})
		},
		methods: {
			// 引导页时查询token是否有效 有效则更新用户信息 无效则清除
			async getUserLoginState() {
				if(!getToken()) return remove(ANGELLONE_USERINFO)
				const { data, token } = await getTokenStatus()
				setToken(token)
				setStoreage(ANGELLONE_USERINFO, data)
			},
			
			async getTodaySelectGuide() {
				const day = new Date().getDay()
				const { data } = await getTodayGuide(day == 0 ? 7 : day)
				this.recommend = data[0] ? data[0] : this.guide
				this.canvasInit(this.ss)
				this.timer = setInterval(() => {
					this.canvasInit(this.ss, this.val)
				}, 10)
				this.timerS = setInterval(() => {
					this.ss -= 1
				}, 1000)
			},
			
			canvasInit(ss,val = 0) {
				// console.log('chufale', val)
				if(this.val >= 2) {
					clearInterval(this.timer)
					clearInterval(this.timerS)
					this.countDownFinish()
				}
				this.val += 0.005
				let ctx = uni.createCanvasContext('canvas')
				ctx.beginPath()
				ctx.arc(42, 42, 22, 0, 2 * Math.PI) // 42为canvas宽度一班代表居中
				// ctx.setFillStyle('#FAF7F7')
				ctx.fillStyle = 'rgba(0, 0, 0, .3)'
				ctx.setStrokeStyle('#E8736F')
				ctx.setLineWidth(2)
				ctx.stroke()
				ctx.fill()
				// 进度
				ctx.beginPath()
				ctx.arc(42, 42, 22, 0, val * Math.PI) // FAF7F7
				ctx.setStrokeStyle('#FAF7F7')
				ctx.setLineWidth(2)
				ctx.stroke()
				
				// ctx.font='24rpx'
				ctx.setFillStyle('#fff')
				ctx.setFontSize(14)
				ctx.setTextAlign('center')
				ctx.fillText('跳过', 42, 41)
				ctx.stroke()
				ctx.setFillStyle('#fff')
				ctx.setFontSize(13)
				ctx.setTextAlign('center')
				ctx.fillText('0' + ss, 42, 58)
				ctx.stroke()
				ctx.draw()
			},
			
			// 当倒计时结束时
			countDownFinish() {
				console.log('我计时结束了')
				clearInterval(this.timer)
				clearInterval(this.timerS)
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}, 300)
			},
			
		}
	}
</script>

<style lang="scss" scoped>
::v-deep.container{
	overflow: hidden;
	.u-transition{
		width: 100%;
		height: 100%;
	}
	
	.down {
		bottom: 80rpx;
		right: 40rpx;
		background: rgba(0, 0, 0, .3);
		width: 80rpx;
		height: 80rpx;
		// border: 4rpx solid #BAD296; // #E8736F
		border-radius: 50%;
		flex-direction: column;
		.u-count-down{
			.u-count-down__text {
				font-size: 24rpx;
				line-height: normal;
				color: #fff;
			}
		}
	}
	
	.cavas-dd{
		bottom: -80rpx;
		right: -390rpx;
	}
}
</style>

<template>
	<view class="container">
		<view class="user flex-f" :style="'height:'+((navHeight-0)*2+200)+'rpx;padding:'+(navHeight*2)+'rpx 32rpx 0;'">
			<u--image :showMenuByLongpress='false' @click="handelClickUserInfo" width='120' height='120' shape='circle'
			 :src="userInfo.avatar || `https://angellone.dshuais.com/img/avatar/default-avatar%20(${defaultNumber}).png`"></u--image>
			<view class="ml20">
				<p class='fons-18'><span>{{ userInfo.nickName || 'ANGELL ONE' + (Date.now() + '').slice(-4) }}</span>
				<u--image :showMenuByLongpress='false' :showLoading="true" :src="require(`@/static/image/${
					userInfo.gender == 0 ? 'ysnan' : userInfo.gender == 1 ? 'ysnv' : 'ysnone'}.png`)" width="55rpx" height="55rpx" shape='circle'></u--image>
					</p>
				<p v-if="token" @click='$copy(userInfo.username)'><span>angell_one: {{ userInfo.username }}</span>
				<u--image :showMenuByLongpress='false' :showLoading="true" :src="require('@/static/image/copy.png')" width="28rpx" height="28rpx" shape='circle'></u--image>
				</p>
				<p v-if="!token">点击头像登录</p>
			</view>
		</view>
		
		<view class="userbox">
			<u-grid @click='handelClickGrid'>
				<u-grid-item v-for="item in gridList" :key="item.name" :name='item.name'>
					<text class="fons-16 mb5 fonw-bold">{{ item.number }}</text>
					<text>{{ item.title }}</text>
				</u-grid-item>
			</u-grid>
		</view>
		
		<view class="angell-serve">
			<p class='fons-16 ml10' style='padding-left: 32rpx;'>Angell One服务星球</p>
			<view class="serve-linkage" @touchstart="serveStart" @touchend="serveEnd" @touchmove="serveMove">
				<view class="mt10 serve-list">
					<view class="serve c-999 fons-12" v-for="(serve, index) in serveList" :key="index" @click="handelClickServe(serve)">
						<view class="">
							<p class='c-20262E fons-14 mb5'>{{ serve.title }}</p>
							<p style='margin-bottom: 5rpx;'>{{ serve.content }}</p>
							<p>{{ serve.text }}</p>
						</view>
						<u--image :showMenuByLongpress='false' :showLoading="true" :src="require(`@/static/image/serve${index + 1}.jpg`)" width="240rpx" height="150rpx"></u--image>
					</view>
				</view>
			</view>
		</view>
		
		<view class="individual">
			<p class='fons-16 ml10 mb10'>{{ fourSeasons.statement }}</p>
			<!-- http://ds.dshuais.com/425708edd0ca6e4610de25b20.jpg  春天里就适合讲一讲花的故事 -->
			<!-- http://ds.dshuais.com/425708edd0ca6e4610de25b21.jpg  去吹吹夏日晚风，也许会遇见浪漫 -->
			<!-- http://ds.dshuais.com/425708edd0ca6e4610de25b22.jpg  像秋天枫叶等落地，你是我最美的风景 (秋天短到没有，你我短到不能回头)-->
			<!-- http://ds.dshuais.com/425708edd0ca6e4610de25b23.jpg  见一面吧，在冬季在下雪天 -->
			<u--image radius='8' :showLoading="true" :src="fourSeasons.picture" width="100%" height="300rpx"></u--image>
			<span class='c-999 fons-10'>如有更好的思路建议或交个朋友可在首页找到我们...</span>
			<p class='c-999 fons-10 text-c mt20'>本程序内图片素材多数均来自于网络，侵删！</p>
		</view>
		
		<you-touchbox ref="userinfo" customStyle="border-radius:50rpx;" initTop="min" minTop="80" maxTop="380"
			:auto='true' :disable="isTouchDisable" @get-end-detail="getTouchboxDetail">
			<view>
				<p class='flex mb30'><span>{{ isUpDown ? '向下滑动关闭哦~' : '上滑试试~' }}</span>
					<u--image :showMenuByLongpress='false' :showLoading="true" :src="require(`@/static/image/${isUpDown ? 'down' : 'top'}.png`)" width="40rpx" height="40rpx"></u--image>
				</p>
				<u-cell-group :border='false'>
					<u-cell :isLink="true" :rightIconStyle="{'font-size':'26rpx'}" v-for="(cell, index) in cellList" :key="index"
					 @click='handelCell(cell.path)'>
						<view slot="title" class="u-slot-title flex-a">
							<u--image :showMenuByLongpress='false' :showLoading="true" :src="require(`@/static/image/${cell.icon}.png`)" width="40rpx" height="40rpx"></u--image>
							<text class="u-cell-text ml10">{{ cell.title }}</text>
						</view>
					</u-cell>
				</u-cell-group>
				<!-- <p class='text-c c-999 fons-10 mt50'>AngellOne版权所有</p> -->
			</view>
		</you-touchbox>
	</view>
</template>

<script>
	import { systemInfo } from '@/mixin/navigation'
	import { getToken, getStorage } from '@/utils/cache'
	import { ANGELLONE_USERINFO } from '@/config/config'
	export default {
		name: 'Personal',
		mixins: [systemInfo],
		components: {
		},
		data() {
			return{
				token: getToken(),
				defaultNumber: 1, // 默认头像的随机数
				isTouchDisable: false, // 是否禁止滑动
				userInfo: getStorage(ANGELLONE_USERINFO) || {},
				gridList: [
					{ name: 'focus', title: '关注', number: 0 },
					{ name: 'star', title: 'Star', number: 0 },
					{ name: 'fan', title: '粉丝', number: 0 },
				],
				serveList: [
					{ id: 1, title: '上线啦！', content: 'angell one小程序上线啦', text: '小伙伴们一起来踩一踩吧~' },
					{ id: 2, title: 'angell one怎么用？', content: '开发者全面介绍', text: '有兴趣的宝子们快来围观~' },
					{ id: 3, title: '开发人员介绍', content: '什么什么？', text: '一扭，二舔，再泡一泡~' },
					{ id: 4, title: '暖心服务', content: '生活小指南', text: '有事没事多喝热水哦~' }
				],
				fourSeasons: {
					statement: void 0,
					picture: void 0,
				},
				curTop: 400, // 上下滑动的状态值 (根据getTouchboxDetail自己取)
				isUpDown: false,
				cellList: [
					{ title: '设置', icon: 'system', path: 'system' },
					{ title: '个人信息', icon: 'userinfo', path: 'user' },
					{ title: '意见反馈', icon: 'opinion', path: 'opinion' },
					{ title: '联系客服', icon: 'customer', path: 'customer' },
					{ title: '关于AngellOne', icon: 'about', path: 'about' },
				],
				
				startData: {
					clientX: '',
					clientY: ''
				},
				touch: {},
			}
		},
		onLoad() {
			this.getSystemInfo()
			const month = new Date().getMonth() + 1
			if([3,4,5].includes(month)) {
				this.fourSeasons.statement = '春天里就适合讲一讲花的故事'
				this.fourSeasons.picture = 'http://ds.dshuais.com/425708edd0ca6e4610de25b20.jpg'
			} else if([6,7,8].includes(month)) {
				this.fourSeasons.statement = '去吹吹夏日晚风，也许会遇见浪漫'
				this.fourSeasons.picture = 'http://ds.dshuais.com/425708edd0ca6e4610de25b21.jpg'
			} else if([6,7,8].includes(month)) {
				this.fourSeasons.statement = '秋天短到没有，你我短到不能回头'
				this.fourSeasons.picture = 'http://ds.dshuais.com/425708edd0ca6e4610de25b22.jpg'
			} else {
				this.fourSeasons.statement = '见一面吧，在冬季在下雪天'
				this.fourSeasons.picture = 'http://ds.dshuais.com/425708edd0ca6e4610de25b23.jpg'
			}
		},
		onShow() {
			this.defaultNumber = Math.ceil(Math.random() * 24) // 随机头像编号

			this.token = getToken()
			this.userInfo = getStorage(ANGELLONE_USERINFO) || {}
			getApp().getNetwork()
		},
		methods: {
			
			// 获取触摸屏的滑动结束时的top的信息(curTop, maxTop, minTop) ps:简单用不到(auto为false时可能会用)
			getTouchboxDetail({ curTop, minTop, maxTop }) {
				// console.log('滑动结束了', curTop, this.curTop)
				if(curTop > this.curTop) this.isUpDown = false
				 else this.isUpDown = true
			},
			
			// 点击用户头像 有token修改用户信息 没token去登陆
			handelClickUserInfo() {
				if(this.token) {
					console.log('有tokenle');
				} else {
					this.$jump('/pages/subUser/login/index')
				}
			},
			
			// 点击关注 star 粉丝 grid
			handelClickGrid(name){
				console.log('name', name);
			},
			
			// 服务星球
			handelClickServe(serve) {
				return this.$msg('敬请期待')
				console.log('当前服务', serve)
			},
			
			// 点击cell列表
			handelCell (path) {
				this.$jump(`/pages/subUser/${path}/index`)
			},
			
			
			
			
			// 触摸开始
			serveStart({ changedTouches }) {
				return
				// console.log('触摸开始了', e);
				// this.transition = '.1s'
				this.startData.clientX = changedTouches[0].clientX   //手指按下时的X坐标         
				this.startData.clientY = changedTouches[0].clientY
			},
			
			// 触摸结束
			serveEnd({ changedTouches }) {
				return
				// if(changedTouches[0].)
				// console.log('触摸结束了', e);
				// this.moveX = 0;  //触摸事件结束恢复原状
				// this.transition = '.5s';
				// if(Math.abs(this.touch.clientX-this.startData.clientX) > 100) {  //在事件结束时，判断滑动的距离是否达到出发需要执行事件的要求
				// 	console.log('执行查看跳转事件');
				// 	// this.touch = {};
				// 	this.moveX = '(100vh - 64rpx)'
				// } else {
				// 	console.log('滑动距离不够，不执行跳转')
				// 	// this.touch = {};
				// 	this.moveX = '0rpx'
				// }
				const { clientX, clientY } = this.startData,{ clientX: x } = this.touch, width = x - clientX
				
				if(x < clientX) { // 向左移动
					console.log('屏幕宽度', this.windowWidth, Math.ceil(parseInt(Math.abs(width)) / this.windowWidth ))
					console.log('向左移动', width, parseInt(Math.abs(width)))
				} 
				if(x > clientX){
					console.log('向右移动', width)
				}
				
				
				
			},
			
			// 触摸移动
			serveMove(e) {
				return
				console.log('触摸移动了', e);
				let touch = e.touches[0]
				this.touch = touch
				let data = touch.clientX - this.startData.clientX
				if(touch.clientX < this.startData.clientX) {  //向左移动
					if(data < -250) {
						data = -250
					}
				}
				if(touch.clientX > this.startData.clientX) {  //向右移动
					if(this.moveX == 0) {
						data = 0
					} else {
						if(data > 50) {
							data = 50
						}
					}
				}
				this.moveX = data * 2 + 'px'
			},
			
			
			
		}
	}
</script>

<style lang="scss" scoped>
::v-deep.container{
	background: #f7f7f7;
	overflow-y: auto;
	padding-bottom: 160rpx;
	
	.user {
		width: 100%;
		// height: 400rpx;
		color: #f1f2e5;
		background: url('@/static/image/userbg2.png') center no-repeat;
		background-size: cover;
		// border-radius: 0 0 30rpx 30rpx;
		// padding: 192rpx 32rpx 0;
		view {
			p{
				margin-top: 10rpx;
				display: flex;
				align-items: center;
				span {
					margin-right: 10rpx;
				}
			}
		}
		view:nth-child(1) {
			font-weight: bold;
		}
	}
	
	.userbox {
		width: calc(100% - 64rpx);
		height: 200rpx;
		margin: -40rpx auto 0;
		background: rgba(255,255,255,0.8);
		border-radius: 20rpx;
		box-shadow: 0 20rpx 20rpx -20rpx #eaeaea;
		.u-grid {
			height: 100%;
			.u-grid-item {
				height: 100%;
			}
		}
	}
	
	.angell-serve {
		height: 260rpx;
		margin-top: 40rpx;
		// padding: 0 32rpx;
		
		.serve-linkage {
			overflow-x: auto;
			.serve-list {
				width: max-content;
				display: flex;
				// justify-content: space-between;
				// align-items: center;
			}
			.serve {
				width: calc(100vw - 64rpx);
				margin: 0 32rpx;
				background: #fff;
				border-radius: 8rpx;
				box-shadow: 0 20rpx 20rpx -20rpx #eaeaea;
				height: 170rpx;
				padding: 30rpx 20rpx;
				display: flex;
				justify-content: space-between;
				flex-shrink: 0;
				
				.u-image {
					margin-top: -15rpx;
				}
			}
		}
	}
	
	.individual {
		width: calc(100 - 64rpx);
		padding: 20rpx 32rpx;
	}
}
</style>

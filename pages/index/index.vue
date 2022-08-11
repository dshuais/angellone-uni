<template>
	<scroll-view class="container" scroll-y @scroll='handelScroll' enable-back-to-top>
		<view :class="['posi-a top', isTopShow ? 'top-show' : 'top-none']" :style="'height:'+navHeight+'px;'"></view>
		<view class="search" :style="'height:'+navigationBarHeight +'px;line-height:'+navigationBarHeight+'px;top:'+
		 statusBarHeight+'px;'">
			<u-search placeholder="Angell One" v-model="search" :showAction='false' height='59' color='#fff' searchIconColor='rgba(255,255,255,.8)'
			bgColor='rgba(0,0,0,.2)' searchIconSize='30' placeholderColor='rgba(255,255,255,.8)' @search='handelSearch'></u-search>
		</view>
		
		<u-swiper :list="imglist" indicator indicatorMode="line" circular height='800' :loading='false' @click='handelSwiper'
		 indicatorStyle='bottom:60rpx'></u-swiper>
		 
		<view class="main-tab flex">
			<u-grid col='1'>
				<view class="grid-one">
				<u-grid-item  @click="handelGridItem('imgs')">
					<u--image :showMenuByLongpress='false' :showLoading="true" :src="require('../../static/image/imgs.png')" width="160rpx" height="160rpx"></u--image>
					<text class="grid-text fons-12" style='z-index:9;margin-top:-30rpx;'>素材池</text>
				</u-grid-item>
				<u-grid-item  @click="handelGridItem('files')">
					<u--image :showMenuByLongpress='false' :showLoading="true" :src="require('../../static/image/files.png')" width="80rpx" height="80rpx"></u--image>
					<text class="grid-text fons-12">文件池</text>
				</u-grid-item>
				</view>
			</u-grid>
			<view class="line"></view>
			<u-grid col='1'>
				<view class="grid-two">
					<u-grid-item @click="handelGridItem('square')">
						<!-- <u-icon name="photo" :size="172"></u-icon> -->
						<u--image :showMenuByLongpress='false' :showLoading="true" :src="require('../../static/image/wind.png')" width="180rpx" height="180rpx"></u--image>
						<text class="grid-text">每日精选</text>
					</u-grid-item>
				</view>
			</u-grid>
		</view>
	
		<view class="cart">
			<view class="flex-a horn">
				<u--image :showMenuByLongpress='false' :showLoading="true" :src="require('../../static/image/bo.png')" width="50rpx" height="40rpx"></u--image>
				<span class='ml5 fons-12'>小主，{{ goodsMsg }}！欢迎访问Angell One~</span>
			</view>
			<view class="cart-call c-333">
				<p class='flex-a c-333 mt5 mb5'>今日打call
					<u--image :showMenuByLongpress='false' :showLoading="true" :src="require('../../static/image/lamp.png')" width="55rpx" height="55rpx"></u--image>
				</p>
				<view class="flex-f">
					<u--image :showLoading="true" :showMenuByLongpress='false' :src="starUserInfo.avatar" width="125rpx" height="125rpx" shape='circle'></u--image>
					<view class="ml10 mr30">
						<p class='flex-a'><span class='mr5'>{{ starUserInfo.nickName }}</span>
							<u--image :showMenuByLongpress='false' :showLoading="true" :src="require(`../../static/image/${
								starUserInfo.gender == 0 ? 'ysnan' : starUserInfo.gender == 1 ? 'ysnv' : 'ysnone'}.png`)" width="55rpx" height="55rpx" shape='circle'></u--image>
						</p>
						<p class='c-999 fons-10 signature'>{{ starUserInfo.signature || '该用户太懒，没有留下个性签名~' }}</p>
					</view>
				</view>
			</view>
			<p class='fons-10 c-999 ml20 mt10'>打call功能通过精选素材的star计算~</p>
		</view>
		
		<view class="footer flex">
			<view v-for="(foo, index) in footerList" :key="foo.id" :class="['foo', index == 1 ? 'mr10 ml10' : '']" @click="handelFooter">
				<view class="flex flex-c pt10">
					<u--image :showMenuByLongpress='false' :showLoading="true" :src="require(`../../static/image/${foo.img}.png`)" width="120rpx" height="120rpx"></u--image>
					<p class='mt10 fons-16'>{{ foo.title }}</p>
					<p class='fons-10 text-c c-999 ml10 mr10 mt10'>{{ foo.text }}</p>
				</view>
			</view>
		</view>
		
		<view class="c-999 fons-10 mt20 text-c pb10">没有底线的程序猿，写不出好的APP...</view>
		
	</scroll-view>
</template>

<script>
	import { getStoreage } from '@/utils/cache.js'
	import { systemInfo } from '@/mixin/navigation'
	import { getNewestSwiper, getStarMaxUser, } from '@/api/api'
	export default {
		name: 'Index',
		mixins: [systemInfo],
		data() {
			return{
				search: void 0,
				imageList: [], // 全部轮播图信息
				defaultlist: [
					'http://ds.dshuais.com/425708edd0ca6e4610de25b17.png',
					'http://ds.dshuais.com/425708edd0ca6e4610de25b16.png',
					'http://ds.dshuais.com/425708edd0ca6e4610de25b19.png',
					'http://ds.dshuais.com/425708edd0ca6e4610de25b1a.png',
				],
				imglist: [], // 轮播图
				isTopShow: void 0,
				goodsMsg: '您好', // 按时间段播报
				footerList: [
					{ id: 1, img: 'phone', title: '绑定手机号', text: '为了您的账号信息安全与完整' },
					{ id: 2, img: 'tea2', title: '一键三连', text: '您的支持，是我们最大的动力' },
					{ id: 3, img: 'email2', title: '联系我们', text: '有什么建议和问题，请找到我们' },
				],
				isCall: false,
				// starUserInfo: getStoreage('angellone-userinfo'),
				starUserInfo: {},
			}
		},
		onLoad() {
			this.getSystemInfo()
			this.getSwiper()
			this.getStarUser()
		},
		onShow() {
			getApp().getNetwork()
			const date = new Date(), hh = date.getHours()
			if(hh > 5 && hh < 9) {
				this.goodsMsg = '早上好'
			} else if(hh >= 9 && hh <= 12) {
				this.goodsMsg = '上午好'
			} else if(hh > 12 && hh < 14) {
				this.goodsMsg = '中午好'
			} else if(hh >= 14 && hh <= 18) {
				this.goodsMsg = '下午好'
			} else if(hh > 19 && hh <= 5) {
				this.goodsMsg = '晚上好'
			}
		},
		onHide() {
			this.search = ''
		},
		onPageScroll(obj) {
			console.log('我滚动了哦', obj)
		},
		methods: {
			// 监听页面滚动
			handelScroll({ detail: { scrollTop } }) {
				if(scrollTop >= this.navHeight) return this.isTopShow = true
				this.isTopShow = false
			},
			
			// 查询轮播图
			async getSwiper() {
				const { data } = await getNewestSwiper(), list = data.map(({url}) => url)
				this.imageList = data
				this.imglist = list.length ? list : this.defaultlist
			},
			
			// 查询当日明星用户
			async getStarUser() {
				const { data } = await getStarMaxUser()
				this.starUserInfo = data
			},
			
			// 点击轮播图 查看图片
			handelSwiper(current) {
				uni.previewImage({
					// urls: Array.from(new Set([this.imglist[current], ...this.imglist]))
					urls: this.imglist,
					current
				})
			},
			
			// 点击块状 跳转
			handelGridItem(val) {
				setTimeout(() => {
					if(val == 'square') {
						uni.switchTab({
							url: '/pages/square/index'
						})
					} else {
						uni.navigateTo({
							url: `/pages/subSquare/${val}/index`
						})
					}
				}, 300)
			},
			
			// 点击最下面的三块区域 --> 功能待完善
			handelFooter () {
				this.$load()
				setTimeout(() => {
					uni.hideLoading()
				}, 2000)
			},
			
			
			// 搜索
			handelSearch (val) {
				console.log(val, this.search)
			}
			
			
		}
	}
</script>

<style lang="scss" scoped>
::v-deep.container {
	background: #f7f7f7;
	// overflow-y: auto;
	overflow-x: hidden;
	
	.top {
		background: #fff;
		// height: 88px;
		width: 100%;
		// top: 0;
		z-index: 1;
	}
	.top-show {
		position: fixed;
		animation: nav-top .3s ease;
	}
	
	@keyframes nav-top {
		from {
			top: -160rpx;
		}
		to {
			top: 0;
		}
	}
	
	.top-none {
		top: -200rpx;
		animation: nav-top-none .5s linear;
	}
	
	@keyframes nav-top-none {
		0% {
			top: 0rpx;
		}
		20% {
			top: -40rpx;
		}
		40% {
			top: -80rpx;
		}
		60% {
			top: -120rpx;
		}
		80% {
			top: -160rpx;
		}
		100% {
			top: -200rpx;
		}
	}
	
	.search {
		// top: 88rpx;
		position: fixed;
		left: 20rpx;
		z-index: 9;
		width: 520rpx;
		// height: 88rpx;
		// line-height: 88rpx;
		.u-search__content {
			.u-search__content__input {
				background-color: transparent !important;
			}
		}
	}

	.main-tab {
		background: #fff;
		height: 340rpx;
		position: absolute;
		width: calc(100% - 64rpx);
		margin: -40rpx 32rpx 0;
		border-radius: 32rpx 32rpx 0 0;
		box-shadow: 0 20rpx 20rpx -20rpx #eaeaea;
		
		.u-grid {
			height: 100%;
			.grid-one {
				width: 100%;
				height: 100%;
				.u-grid-item {
					left: 50%;
					transform: translateX(-25%);
					height: 50%;
				}
			}
			.grid-two {
				width: 100%;
				height: 100%;
				.u-grid-item {
					right: 50%;
					transform: translateX(25%);
					height: 100%;
				}
			}
		}
		
		.line {
			width: 1rpx;
			background: #f7f7f7;
			height: 90%;
			position: absolute;
		}
	}
	
	.cart {
		background: #fff;
		height: 330rpx;
		width: calc(100% - 64rpx);
		margin: 325rpx 32rpx 0;
		box-shadow: 0 20rpx 20rpx -20rpx #eaeaea;
		border-radius: 10rpx;
		
		.horn {
			background: #36cc852e; // #36CC85
			height: 60rpx;
			padding-left: 40rpx;
			border-radius: 10rpx 10rpx 0 0;
			box-shadow: inset 0px -10rpx 10rpx -10rpx #cbe4d6;
		}
		
		.cart-call {
			padding-left: 35rpx;
			.signature{
				height: 65rpx;
				text-overflow: ellipsis;
				-webkit-line-clamp: 2;
				overflow: hidden;
				-webkit-box-orient: vertical;
				display: -webkit-box;
			}
		}
	}
	
	.footer {
		height: 300rpx;
		width: calc(100% - 64rpx);
		margin: 25rpx 32rpx;
		.foo {
			flex: 1;
			background: #fff;
			height: 100%;
			border-radius: 10rpx;
			box-shadow: 0 20rpx 20rpx -20rpx #eaeaea;
			
		}
		.center{
			margin: 0 20rpx;
		}
	}
}
</style>
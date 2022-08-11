<template>
	<view style="width: 100%;height: 100%;">
		<view class="content" v-if="!isLogin">
			<view class="log-input">
				<view class="input flex">
					邀请码：<u--input placeholder="请输入邀请码" v-model="yqmInput" :disabled="true"></u--input>
				</view>
				<view class="input flex">
					手机号：<u--input placeholder="请输入手机号" v-model="phoneInput"></u--input>
				</view>
				<view class="input flex two">
					验证码：<u--input placeholder="请输入验证码" v-model="yzmInput"></u--input>
					<u-button color="#57ABFF" type="primary" :text="yzm ? '发送验证码' : `${endtimeM}s`" :disabled="!yzm" @click="handelSeeCode"></u-button>
				</view>
			</view>
			<view class="con-btn">
				<u-button color="#fff" text="注册" @click="register" :disabled="isReg"></u-button>
			</view>
		</view>
		
		<view v-if="isLogin" style="text-align: center; padding-top: 40rpx;">
			注册成功，{{endtimeS}}s后<span style="color: #007AFF;" @click="toWx()">跳转到小程序</span>...
			<!-- weixin://dl/business/?t=cew27btOSKb -->
		</view>
	</view>
</template>

<script>
	import {
		sendCode,
		login
	} from '../../api/api.js'
	export default {
		data() {
			return {
				yqmInput: '555',
				yzmInput: '',
				phoneInput: '',
				yzm: true,
				timer: false,
				overDate: '',
				isLogin: false,
				isReg: false,
				timerT: false,
				overDateT: '',
			}
		},
		onLoad(opt) {
			this.yqmInput = opt.spread
			console.log(this.yqmInput)
		},
		computed: {
			endtimeM() {
				// let m = parseInt(this.overDate / 1000 / 60 % 60) // m
				// m = m < 10 ? '0' + m : m
				let s = parseInt(this.overDate / 1000 % 60) // s
				s = s < 10 ? '0' + s : s
				return s
			},
			
			endtimeS() {
				// let m = parseInt(this.overDate / 1000 / 60 % 60) // m
				// m = m < 10 ? '0' + m : m
				let s = parseInt(this.overDateT / 1000 % 60) // s
				s = s < 10 ? '0' + s : s
				return s
			}
		},
		methods: {
			resPhone (phone) {
				// 验证手机号
				const phoneReg = /^1[0-9]{10,10}$/
				return phoneReg.test(phone)
			},
			
			handelSeeCode () {
				if (!this.phoneInput) {
					uni.showToast({
						title: '请先输入手机号',
						icon: 'none',
						duration: 1500
					})
					return
				}
				if(!this.resPhone(this.phoneInput)) {
					uni.showToast({
						title: '请输入正确手机号',
						icon: 'none',
						duration: 1500
					})
					return
				}
				let data = {
					phone: this.phoneInput
				}
				sendCode(data).then(res => {
					if(res.status==200) {
						uni.showToast({
							title: '发送成功',
							duration: 1500
						})
						this.yzm = false
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						})
					}
				})
				const date = new Date().getTime()
				const next = date + 1000 * 60
				if (!this.timer) {
					this.overDate = next - date
					this.timer = setInterval(() => {
						if (this.overDate > 0) {
							this.overDate -= 1000
						} else {
							clearInterval(this.timer)
							this.yzm = true
							this.timer = null
						}
					}, 1000)
				}
			},
			
			// 注册
			register () {
				if(!this.yqmInput) {
					uni.showToast({
						title: '请输入邀请码',
						icon: 'none',
						duration: 1500
					})
					return
				}
				if(!this.resPhone(this.phoneInput)) {
					uni.showToast({
						title: '请输入正确手机号',
						icon: 'none',
						duration: 1500
					})
					return
				}
				if(!this.yzmInput) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none',
						duration: 1500
					})
					return
				}
				let data = {
					phone: this.phoneInput,
					captcha: this.yzmInput,
					spread: this.yqmInput
				}
				console.log(data)
				this.isReg = true
				login(data).then(res => {
					if(res.status==200) {
						console.log(res)
						uni.showToast({
							title: '注册成功，请返回小程序登陆',
							duration: 4000
						})
						this.isReg = false
						setTimeout(() => {
							const date = new Date().getTime()
							const next = date + 1000 * 5
							if (!this.timerT) {
								this.overDateT = next - date
								this.timerT = setInterval(() => {
									if (this.overDateT > 0) {
										this.overDateT -= 1000
									} else {
										clearInterval(this.timerT)
										this.timerT = null
									}
								}, 1000)
							}
							this.isLogin = true
							setTimeout(() => {
								console.log('跳转到微信')
								this.toWx()
							}, 4900)
						}, 3000)
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						})
						this.isReg = false
					}
				})
			},
			
			// 跳转微信小程序
			toWx () {
				// location.href = 'weixin://dl/business/?t=cew27btOSKb'
				const aLink = document.createElement("a");
				aLink.className = 'call_up_a_link';
				aLink.href = 'weixin://dl/business/?t=cew27btOSKb'
				aLink.style.cssText = "width:0px;height:0px;";
				document.body.appendChild(aLink);
				aLink.click();
				// const iframe = document.createElement('iframe');
				// iframe.className = 'call_up_iframe';
				// iframe.src = 'weixin://dl/business/?t=cew27btOSKb'
				// iframe.style.cssText = "width:0px;height:0px;";
				// document.body.appendChild(iframe);
			}
			
			
		}
	}
</script>

<style lang="scss" scoped>
	uni-page-body {
		height: 100%;
	}
	.flex {
		display: flex;
		// justify-content: center;
		align-items: center;
	}
	.content {
		width: 100%;
		height: 100%;
		background: url(../../static/back.png) no-repeat;
		background-size: cover;
		.log-input {
			position: absolute;
			top: 505rpx;
			left: 150rpx;
			/deep/.input {
				color: #333333;
				font-size: 24rpx;
				margin-bottom: 20rpx;
				.u-input {
					flex: none;
					width: 370rpx;
					height: 55rpx;
					background: #F0F4FF;
					border-radius: 12rpx;
					border: none;
				}
			}
			.two {
				.u-input {
					flex: none;
					width: 210rpx;
					height: 55rpx;
					background: #F0F4FF;
					border-radius: 12rpx;
					border: none;
					margin-right: 10rpx;
				}
				/deep/.u-button {
					margin: 0;
					width: 154rpx;
					height: 72rpx;
					border-radius: 12rpx;
					.u-button__text {
						font-size: 20rpx;
					}
				}
			}
		}
		
		.con-btn {
			// position: absolute;
			// top: 930rpx;
			// left: 218rpx;
			padding-top: 930rpx;
			/deep/.u-button {
				width: 540rpx;
				height: 76rpx;
				border-radius: 50rpx;
				.u-button__text {
					color: #1879FB;
					font-size: 32rpx;
					font-weight: bold;
				}
			}
		}
	}
</style>

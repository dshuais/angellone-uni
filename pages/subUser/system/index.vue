<template>
	<view class='container'>
		<view class="main">
			<view class="list bor-r8" v-if="!isLock">
				<view class="li fons-12 pl12" v-for="(i,index) in list" :key="i.type" @click="handleClickOperate(i.type)">
					<view class="flex-a h-50">
						<u--image :showMenuByLongpress='false' :showLoading="true" :src="require(`@/static/image/${i.type}.png`)"
							width="48rpx" height="48rpx"></u--image>
						<p class='ml8'>{{ i.title }}</p>
					</view>
					<view class="line" v-if="index != (list.length - 1)"></view>
				</view>
			</view>
			
			<view v-else>
				<view class="list bor-r8 list2 mb40">
					<view class="li fons-12 pl12" v-for="(i, index) in setPwdList" :key="i.value">
						<view class="flex-a h-50">
							<text class="pwd-label">{{ i.label }}</text>
							<u--input :placeholder="i.placeholder" border="none" v-model="setPwd[i.value]" :customStyle="{
								paddingLeft: '24rpx'
							}" :password="index === 0 ? false : true"></u--input>
						</view>
						<view class="line2"></view>
					</view>
				</view>
				
				<u-button :hairline='false' type="primary" text="修改" color='#4242E1' :loading='btnLoad' :customStyle="{
					width: '534rpx', height: '80rpx'
				}" shape='circle' @click='handleSetPwd'></u-button>
				<text class="fons-10 c-999 mt5 text-c block">改密码为AngellOne后台登录密码，并不是小程序密码</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	import { removeToken, remove, getToken } from '@/utils/cache'
	import { ANGELLONE_USERINFO } from '@/config/config'
	import { resetPwd } from '@/api/api'
	export default {
		name: 'List',
		data() {
			return{
				list: [
					{ type: 'unlock', title: '修改密码' },
					{ type: 'logout', title: '退出登录' },
				],
				isLock: false,
				setPwdList: [
					{ value: 'oldPwd', label: '原密码', placeholder: '请输入原密码' },
					{ value: 'password', label: '新密码', placeholder: '请输入新密码' },
					{ value: 'confirmPwd', label: '确认密码', placeholder: '请再次输入新密码' },
				],
				setPwd: {
					oldPwd: void 0,
					password: void 0,
					confirmPwd: void 0,
				},
				btnLoad: false
			}
		},
		onLoad() {
			
		},
		methods: {
			// 点击操作
			handleClickOperate(type) {
				if(!getToken()) return this.$msg('您还未登录')
				if(type == 'logout') {
					uni.showModal({
						title: '退出提示',
						content: '退出将清除您的个人信息，是否确认继续',
						confirmText: '确认',
						confirmColor: '#4242E1',
						cancelText: '我点错了',
						success: ({ confirm }) => {
							confirm && (
								removeToken(),
								remove(ANGELLONE_USERINFO),
								this.$msg('退出成功', 1),
								setTimeout(() => {
									uni.navigateBack()
								}, 500)
							)
						}
					})
				} else {
					uni.setNavigationBarTitle({
						title: '修改密码'
					})
					this.isLock = true
				}
			},
			
			// 确认修改密码
			async handleSetPwd() {
				const { oldPwd, password, confirmPwd } = this.setPwd
				for(let i = 0; i < this.setPwdList.length; i++) {
					const li = this.setPwdList[i]
					if(!this.setPwd[li.value]) return this.$msg(`${li.label}不能为空`)
				}
				if(password !== confirmPwd) return  this.$msg('两次输入密码不相同')
				if(password === oldPwd) return  this.$msg('新密码与旧密码相同')
				this.btnLoad = true
				try{
					await resetPwd({ oldPwd, password })
					this.$msg('修改成功', 1)
					this.btnLoad = false
					setTimeout(() => {
						uni.setNavigationBarTitle({title: '设置'})
						this.isLock = false
						this.setPwd = {
							oldPwd: void 0,
							password: void 0,
							confirmPwd: void 0
						}
					}, 1000)
				}catch({ message }){
					this.$msg(message)
					this.btnLoad = false
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.container {
		padding-top: 16rpx;
		.main {
			.list {
				background: #fff;
				.li {
					.line {
						margin-left: 64rpx;
						// width: 100%;
						height: 2rpx;
						background: rgba(0,0,0,0.1);
					}
					.line2 {
						margin-left: 136rpx;
						margin-right: 32rpx;
						// width: 100%;
						height: 2rpx;
						background: rgba(0,0,0,0.1);
					}
				}
				
				.pwd-label {
					width: 112rpx;
					text-align: end;
				}
			}
			
			.list2 {
				padding-bottom: 28rpx;
			}
		}
	}
</style>
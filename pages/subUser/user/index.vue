<template>
	<view class="container pt12">
		<view class="main">
			<view class="info posi-r bor-r8 mb30">
				<view class="avatar posi-a">
					<u--image :showMenuByLongpress='false' width='160' height='160' shape='circle'
					 :src="userInfo.avatar || `https://angellone.dshuais.com/img/avatar/default-avatar%20(${defaultNumber}).png`"></u--image>
				</view>
				<view class="flex fons-16" style="padding-top: 90rpx;">
					 angell_one: {{ angell_one || 'ANGELL ONE007' }}
					 <u--image v-if="userInfo.username" :showMenuByLongpress='false' :showLoading="true" :src="require('@/static/image/copy.png')"
					  width="28rpx" height="28rpx" shape='circle' @click='$copy(userInfo.username)'></u--image>
				</view>
				
				<view class="form">
					<u--form labelWidth='130rpx' :model="userInfo">
						<u-form-item label="昵称" borderBottom>
							<u--input v-model="userInfo.nickName" placeholder='请输入您的昵称' border="none"></u--input>
						</u-form-item>
						<u-form-item label="angell_one" borderBottom>
							<u--input v-model="userInfo.username" placeholder='请输入angellone账户' border="none"></u--input>
						</u-form-item>
						<u-form-item label="性别" borderBottom>
							<u-radio-group v-model="userInfo.gender" size="28rpx" activeColor='#4242E1'>
								<u-radio :customStyle="{marginRight: '28rpx'}" labelSize='28rpx' label="男" :name="0" />
								<u-radio :customStyle="{marginRight: '28rpx'}" labelSize='28rpx' label="女" :name="1" />
								<u-radio label="外星人" :name="-1" labelSize='28rpx' />
							</u-radio-group>
						</u-form-item>
						<u-form-item label="生日" borderBottom @click="showBirthday = true">
							<u--input v-model="userInfo.birthday" disabled disabledColor="#ffffff"
							 placeholder="点击选择生日" border="none"></u--input>
							<u-icon slot="right" name="arrow-right" />
						</u-form-item>
						<u-form-item label="所在地" borderBottom  @click="handleCityShow">
							<!-- <u--input v-model="userInfo.birthday" disabled disabledColor="#ffffff"
							 placeholder="请选择您的所在地" border="none"></u--input> -->
							 <span v-if="!userInfo.province && !userInfo.city">点击选择您的所在地</span>
							 <span v-else>{{ userInfo.province + ' - ' + userInfo.city }}</span>
							<u-icon slot="right" name="arrow-right" />
						</u-form-item>
						<u-form-item label="个性签名">
							<u--input v-model="userInfo.signature" placeholder='请留下您的座右铭~' border="none"></u--input>
						</u-form-item>
					</u--form>
				</view>
			</view>
			
			<u-button type="primary" text="点击完善成功" color='#4242E1' @click='handleComplete' :loading='btnLoad'></u-button>
		</view>
		
		<!-- v-model="userInfo.birthday"  	:defaultIndex="[[2000],[3],[28]]" -->
		<u-datetime-picker
			:show="showBirthday"
			mode="date"
			v-model="birthday"
			closeOnClickOverlay
			@confirm="birthdayConfirm"
			@cancel="showBirthday = false"
			@close="showBirthday = false"
		></u-datetime-picker>
		
		<u-picker :show="showCity" ref="cityPicker" :columns="cityColumns" @confirm="cityConfirm"  @change="changeHandler"
		 @cancel="showCity = false" @close="showCity = false" :defaultIndex='defaultIndex'></u-picker>
	</view>
</template>

<script>
	import { getStorage, getToken, setStorage } from '@/utils/cache'
	import { ANGELLONE_USERINFO } from '@/config/config'
	import { provinceCityData, cityData } from '@/common/common'
	import { updateUserInfo, getUserInfo } from '@/api/api'
		export default {
		data() {
			return{
				defaultNumber: 1, // 默认头像的随机数
				userInfo: getStorage(ANGELLONE_USERINFO) || {},
				angell_one: void 0,
				showBirthday: false, // 选择生日弹框的状态
				birthday: Number(new Date()), // 打开的默认时间
				showCity: false, // 所在地
				cityColumns: provinceCityData, // 所在地联动数据
				columnData: cityData,
				defaultIndex: [],
				btnLoad: false
			}
		},
		onShow() {
			// this.$jump('/pages/subUser/login/index')
			if(!getToken()) return this.$msg('您还未登录 可先前往登录')
			
			this.defaultNumber = Math.ceil(Math.random() * 24) // 随机头像编号
			
			this.userInfo = getStorage(ANGELLONE_USERINFO) || {}
			this.angell_one = this.userInfo.username // 防止浅拷贝数据变化太明显
		},
		methods: {
			
			// 选择了生日 格式化时间
			birthdayConfirm({ value }) { 
				this.showBirthday = false
				this.userInfo.birthday = uni.$u.timeFormat(value, 'yyyy-mm-dd')
			},
			
			// 打开选择所在地的选择器
			handleCityShow() {
				const { province, city } = this.userInfo
				if(province && city) {
					const star = this.cityColumns[0].indexOf(province)
					this.$refs.cityPicker.setColumnValues(1, this.columnData[star])
					const end = this.columnData[star].indexOf(city)
					this.$nextTick(() => {
						this.defaultIndex = [star, end]
					})
				} else {
					this.$nextTick(() => {
						this.defaultIndex = []
					})
				}
				this.showCity = true
			},
			
			// 选择城市 联动数据
			changeHandler(e) {
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.cityPicker
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					picker.setColumnValues(1, this.columnData[index])
				}
			},
			
			cityConfirm({ indexs, value }) {
				this.showCity = false
				this.userInfo.province = value[0]
				this.userInfo.city = value[1]
			},
			
			// 点击完善信息
			async handleComplete() {
				if(!getToken()) return this.$msg('您还未登录 请先前往登录')
				const { id, username, nickName, gender, birthday, signature, province, city } = this.userInfo
				try{
					this.btnLoad = true
					await updateUserInfo({id, username, nickName, gender, birthday, signature, province, city })
					const { data } = await getUserInfo()
					this.userInfo = data
					setStorage(ANGELLONE_USERINFO, data)
					this.$msg('信息更新成功', 1)
					setTimeout(() => {
						uni.navigateBack()
					}, 1000)
					this.btnLoad = false
				} catch({ message }) {
					this.$msg(message)
					this.btnLoad = false
				}
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep.container {
		background-color: #fcfcfc;
		.main {
			.info {
				width: 100%;
				margin-top: 80rpx;
				// box-shadow: 0 12rpx 20rpx 2rpx rgba(40,87,63,0.16);
				box-shadow: 0 8rpx 16rpx 2rpx rgba(0,0,0,0.12);
				.avatar {
					left: 50%;
					transform: translateX(-50%);
					top: -80rpx;
				}
				
				.form {
					padding: 24rpx 32rpx;
					.u-form-item {
						height: 100rpx;
						.u-form-item__body__right {
							position: absolute;
							right: 44rpx;
							.u-input {
								.u-input__content__field-wrapper {
									.u-input__content__field-wrapper__field {
										text-align: right !important;
										padding-right: 12rpx;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
<template>
	<view class="container">
		<view class="main">
			<view class="c-999 fons-12 ml10 mb5">能力成本有限，客服为线下联系电话，直接联系~~海涵~~</view>
			<view class="customer flex-a bor-r8 fons-16 pl12 mb12" v-for="(phone, index) in phoneList" :key="index" @click="handleMakePhone(phone.phone)">
				<u--image :showMenuByLongpress='false' :showLoading="true" :src="require(`@/static/image/customer2.png`)"
				 width="60rpx" height="60rpx"></u--image>
				 <text class="ml10">{{ phone.phone | phone }}</text><text class="ml12">({{ phone.name.slice(0, 1)}})</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		filters: {
			phone(phoneNumber) {
				if(!phoneNumber) return
				const tel = phoneNumber + '', start = tel.substr(0,3), end = tel.substr(-4)
				return start + '**点击拨打**' + end
			}
		},
		data() {
			return{
				phoneList: [
					{ phone: '15926689137', name: '杜帅' },
					// { phone: '18271901824', name: '秦帅' }
				]
			}
		},
		methods: {
			handleMakePhone(phone) {
				uni.makePhoneCall({
					phoneNumber: phone,
					success: res => { },
					fail: err => { }
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-top: 32rpx;
		.customer {
			height: 120rpx;
			background: #fff;
		}
	}
</style>
<template>
	<view class="container">
		<view class="main">
			<u--image :src="require('../../static/image/none.png')" width="400rpx" height="400rpx"></u--image>
			<p class='c-999 mb20'>世界上最远的距离就是断网...</p>
			<u-button text="重新进入" color='#6C63FF' @click='handelReload'></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'NoneNetwork',
		methods: {
			handelReload() {
				uni.showToast({
					title: '正在拼命加载',
					icon: "loading",
					duration: 1500
				})
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}, 1500)
			}
		}
	}
</script>

<style lang="scss" scoped>
.container {
	.main {
		transform: translateX(-50%);
		margin: 20% 0 0 50%;
		text-align: center;
	}
}
</style>
<template>
	<view class="container">
		<view class="file-list">
			<view class="file flex-between" @click="handleSeeFile('https://cdn.uviewui.com/uview/album/1.jpg')"
			 v-for="(item,index) in 60" :key="index">
				<view class="flex-a">
					<u--image :showMenuByLongpress='false' :showLoading="true" src='https://cdn.uviewui.com/uview/album/1.jpg'
					 width="80rpx" height="80rpx" radius='8rpx'></u--image>
					 <view class="ml8">
						 <view>名字</view>
						 <text class="fons-10 c-6a">2022-08-08 14:23</text>
					 </view>
				</view>
				<view class="flex-a h-40" @click.stop>
					<u-icon name="star-fill"></u-icon>
					<text class="ml5">1</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {
			
		},
		methods: {
			
			// 点击查看
			handleSeeFile(src) {
				uni.previewImage({
					urls: [src]
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep.container {
		background-color: #fff;
		padding-bottom: 86rpx;
		.file-list {
			padding: 0 32rpx;
			.file {
				// margin-bottom: 32rpx;
				padding: 16rpx 0;
			}
		}
	}
</style>
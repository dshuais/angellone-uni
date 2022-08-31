<template>
	<view class="container">
		<view class="fons-12 ml10 mb10">socialist core values</view>
		<view class="main">
			<view class="list bor-r8" :style="
				'background: linear-gradient(136deg, ' + bg1 + ' 0%, ' + bg2 + ' 100%);'">
				<view class="values" @click="getBackground" v-for="(i, index) in list" :key="index"
				 :style="{
					background: 'linear-gradient(136deg, ' + bg1 + ' 0%, ' + bg2 + ' 100%);',
					marginRight: (index+1)%4==0?'0':'21rpx'
				}">
					{{ i }}
				</view>
			</view>
			<view class="text-c c-999 fons-12">此致、敬礼~</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				list: ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善'],
				bg1: void 0,
				bg2: void 0,
			}
		},
		onLoad() {
			this.bg1 = this.randomColor(0, 255)
			this.bg2 = this.randomColor(0, 255)
		},
		methods: {
			// 从新生成颜色
			getBackground() {
				this.bg1 = this.randomColor(0, 255)
				this.bg2 = this.randomColor(0, 255)
				// uni.setNavigationBarColor({
				// 	backgroundColor: `linear-gradient(136deg, ${this.bg1} 0%, ${this.bg2} 100%)`
				// })
			},
			
			// 生成rgba颜色
			randomColor(min, max) {
			  const r = this.randomNum(min, max)
			  const g = this.randomNum(min, max)
			  const b = this.randomNum(min, max)
			  return `rgba(${r},${g},${b},${Math.random()})`
			},
			// 随机生成数字
			randomNum(min, max) {
			  const num = Math.floor(Math.random() * (max - min) + min)
			  return num
			},
		}
	}
</script>

<style scoped lang="scss">
	.container {
		padding-top: 32rpx;
		
		.list {
			padding: 24rpx 24rpx 0;
			.values {
				width: 144rpx;
				height: 66rpx;
				border-radius: 34rpx;
				display: inline-flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				margin-bottom: 24rpx;
			}
		}
	}
</style>
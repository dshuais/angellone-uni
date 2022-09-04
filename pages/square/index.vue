<template>
	<view class="container">
		<Tinder ref="tinder" key-name="id" :queue.sync="queueList" :offset-y="10" @submit="onSlide">
			<!-- slot-scope="scope"  v-slot -->
		  <template v-slot="{ data }">
			<div
			  class="pic"
			  :style="{
				'background-image': `url(${data.url})`
			  }"
			/>
		  </template>
		  <img class="like-pointer" slot="like" src="/static/image/like-t.png">
		  <img class="nope-pointer" slot="nope" src="/static/image/nope-t.png">
		  <img class="super-pointer" slot="super" src="/static/image/super-t.png">
		  <img class="rewind-pointer" slot="rewind" src="/static/image/rewind-t.png">
		</Tinder>
		
		<div class="btns">
		  <img src="/static/image/rewind.png" @click="decide('rewind')">
		  <img src="/static/image/nope.png" @click="decide('nope')">
		  <img src="/static/image/super-like.png" @click="decide('super')">
		  <img src="/static/image/like.png" @click="decide('like')">
		  <img src="/static/image/help.png" @click="decide('help')">
		</div>
		
		
		<u-popup :show="isPopupShow" mode='right' @close='close' bgColor='#20262E'>
			<view class="popup-con">
				<text>设置推荐查询</text>
				<u--form labelPosition="top" :model="queryParams" labelWidth='auto'>
					<u-form-item label="推荐类型" prop="order" borderBottom>
						<u-radio-group v-model="queryParams.order" @change='changeRadio' activeColor='#20262E'>
							<u-radio shape="circle" label="热度" name='star' labelColor='#fff' labelSize='20'></u-radio>
							<u-radio shape="circle" label="最新" name='update_time' labelColor='#fff' labelSize='20'></u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="选择分类" prop="tag" borderBottom @click='isTagShow = true'>
						<span class='c-fff fons-10'>{{ tag }}</span>
						<u-picker :show="isTagShow" :columns="tagColumns" @cancel='isTagShow = false' @confirm='handelTag'></u-picker>
					</u-form-item>
				</u--form>
			</view>
		</u-popup>
		
		<u-notify ref="uNotify"></u-notify>
		
	</view>
</template>

<script>
	// import Tinder from 'vue-tinder'
	import Tinder from '@/components/tinder/vue-tinder/Tinder.vue'
	
	import { getSquareList } from '@/api/api'
	export default {
		name: 'Square',
		components: {
			Tinder
		},
		data() {
			return{
				queueList: [
					// { id: 1, url: 'http://ds.dshuais.com/425708edd0ca6e4610de25b17.png' },
					// { id: 2, url: 'http://ds.dshuais.com/425708edd0ca6e4610de25b0e.jpg' },
					// { id: 3, url: 'http://ds.dshuais.com/425708edd0ca6e4610de25b0f.jpg' },
					// { id: 4, url: 'http://ds.dshuais.com/425708edd0ca6e4610de25b10.jpg' },
					// { id: 5, url: 'http://ds.dshuais.com/425708edd0ca6e4610de25b11.jpg' },
				],
				history: [],
				next: true,
				queryParams: {
					pageNum: 1,
					pageSize: 5,
					order: 'star',
				},
				isPopupShow: false,
				isTagShow: false,
				tagColumns: [['测试', '仅供测试', '选择无效']],
				tag: '点击选择',
			}
		},
		onLoad() {
			this.dataInit()
		},
		onShow() {
			getApp().getNetwork()
		},
		methods: {
			// 加载数据
			async dataInit (flag) {
				let dd = Object.assign({}, this.queryParams)
				const { data } = await getSquareList(dd)
				if(!flag) {
					this.queueList = this.queueList.concat(data)
				} else {
					this.queueList = data
				}
				if(!data.length) this.next = false
			},
			
			// 滑动数据
			onSlide ({ type, item }) {
				// console.log('移除啦')
				// console.log('当前滑动的图', type, item )
				if(this.queueList.length <= 3 && this.next) {
					this.queryParams.pageNum++
					this.dataInit()
				}
				this.history.push(item)
				// console.log('his', this.history, this.queueList)
			},
			
			async decide(choice) {
				console.log(choice);
			  if (choice === "rewind") {
				if (this.history.length) {
				  this.$refs.tinder.rewind([this.history.pop()]);
				}
			  } else if (choice === "help") {
				  this.isPopupShow = true
			  } else if(choice === 'super') {
				this.queryParams.pageNum = 1
				this.history = []
				this.dataInit(true)
				return this.$refs.uNotify.show({
					message: '刷新成功',
					// top: 88,
					color: '#fff',
					bgColor: '#20262E',
					fontSize: 30,
					duration: 1000,
					safeAreaInsetTop: true
				})
				// return this.$msg('敬请期待')
				this.$refs.tinder.decide(choice) // 正常的操作 现在不会执行
			  } else {
				  this.$jump('/pages/subSquare/squareList/index')
			  }
			},
			
			// 切换查看模式
			changeRadio(val) {
				// console.log(val)
				this.queryParams.pageNum = 1
				this.dataInit(true)
				this.close()
			},
			
			
			close() {
				this.isPopupShow = false
			},
			
			// 选择不同的标签 暂时没有
			handelTag(val) {
				this.isTagShow = false
				this.close()
				this.tag = val.value[0]
				// console.log(val)
			},
			
		}
	}
</script>

<style lang="scss" scoped>
::v-deep.container{
	background: #20262E;
	
	.popup-con {
		color: #fff;
		padding: 190rpx 20rpx;
		width: 350rpx;
		.u-form-item {
			.u-form-item__body__left__content__label {
				color: #fff !important;
			}
			.u-form-item__body__right {
				.u-radio-group{
					.u-radio{
						margin-right: 20rpx;
					}
				}
			}
		}
	}
	
	
	
	.vue-tinder {
	  position: absolute;
	  z-index: 1;
	  left: 0;
	  right: 0;
	  // top: 46rpx;
	  top: 80rpx;
	  margin: auto;
	  width: calc(100% - 40rpx);
	  height: calc(100% - 46rpx - 130rpx - 96rpx - 32rpx);
	  min-width: 600rpx;
	  max-width: 710rpx;
	}
	
	.nope-pointer,
	.like-pointer {
	  position: absolute;
	  z-index: 1;
	  top: 40rpx;
	  width: 208rpx;
	  height: 128rpx;
	}
	
	.nope-pointer {
	  right: 20rpx;
	}
	
	.like-pointer {
	  left: 20rpx;
	}
	
	.super-pointer {
	  position: absolute;
	  z-index: 1;
	  bottom: 64rpx;
	  left: 0;
	  right: 0;
	  margin: auto;
	  width: 224rpx;
	  height: 156rpx;
	}
	
	.rewind-pointer {
	  position: absolute;
	  z-index: 1;
	  top: 40rpx;
	  right: 20rpx;
	  width: 224rpx;
	  height: 156rpx;
	}
	
	.pic {
	  width: 100%;
	  height: 100%;
	  background-size: cover;
	  background-position: center;
	}
	
	.btns {
	  position: absolute;
	  left: 0;
	  right: 0;
	  bottom: 30rpx;
	  margin: auto;
	  height: 130rpx;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  min-width: 600rpx;
	  max-width: 710rpx;
	}
	
	.btns img {
	  margin-right: 24rpx;
	  box-shadow: 0 8rpx 18rpx rgba(0, 0, 0, 0.15);
	  border-radius: 50%;
	  cursor: pointer;
	  -webkit-tap-highlight-color: transparent;
	}
	
	.btns img:nth-child(2n + 1) {
	  height: 80%;
	  width: 106rpx;
	}
	
	.btns img:nth-child(2n) {
		height: 100%;
		width: 130rpx;
	}
	
	.btns img:nth-last-child(1) {
	  margin-right: 0;
	}
}
</style>
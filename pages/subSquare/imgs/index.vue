<template>
	<view class="container">
		<scroll-view scroll-y enable-back-to-top refresher-enabled @refresherrefresh='handleRefresh' @scrolltolower='handleMore'
		 :refresher-triggered='triggered' lower-threshold="30" show-scrollbar style="height: 100%;">
			<!-- <view :class="['loading', triggered ? '' : 'not']">
				<loading :top='30' />
			</view> -->
			
			<view class="mb16 pl12 pr12 pt12">
				<u-search showAction actionText="搜索" :animation="false" v-model="query.name" height='64' searchIconSize='42' 
				:actionStyle="{color:'#000',fontSize:'28rpx'}" color='#000' placeholder='输入素材名称' @search='_=>datainit()'
				@custom='_=>datainit()' @clear='_=>datainit()'></u-search>
			</view>
			
			<view class="file-list">
				<view class="file flex-between" @click="handleSeeFile(item.url)"
				 v-for="(item,index) in list" :key="item.id">
					<view class="flex-a">
						<u--image :showMenuByLongpress='false' :showLoading="true" :src='item.url'
						 width="80rpx" height="80rpx" radius='8rpx'></u--image>
						 <view class="ml8">
							 <view>{{ item.name }}</view>
							 <text class="fons-10 c-6a">{{ item.create_time }}</text>
							 <text class="fons-10 ml10">{{ item.size | bytesToSize }}</text>
						 </view>
					</view>
					<view class="flex-a h-40" @click.stop>
						<u-icon name="star-fill"></u-icon>
						<text class="ml5">{{ item.star }}</text>
					</view>
				</view>
			</view>
			
			<u-empty v-if="!list.length" mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" textSize='32rpx'
			 height='300rpx' width='300rpx'></u-empty>
			
			<loading-text :status="status" v-if="list.length"></loading-text>
		</scroll-view>
	</view>
</template>

<script>
	import loading from '@/components/mix-loading/index'
	import loadingText from '@/components/Loading-text/index'
	import { getToken } from '@/utils/cache'
	import { getPictureList } from '@/api/api'
	export default {
		components: {
			loading, loadingText
		},
		data() {
			return {
				triggered: false, // 页面触发下拉事件
				status: 1, // 加载的状态 1上拉加载 2正在加载 3没有了
				query: {
					pageNum: 1,
					pageSize: 15,
					status: 0,
					name: ''
				},
				list: [],
			}
		},
		onLoad() {
			if(!getToken()) this.$msg('登录了才能拥有自己的小世界哦')
			 else this.datainit()
		},
		methods: {
			
			// 加载书籍数据
			async datainit(flag) {
				if(!getToken()) return
				const { data, total } = await getPictureList(this.query)
				if(!flag) {
					this.list = data
					this.status = this.list.length >= total ? 3 : 1
				} else {
					this.list = this.list.concat(data)
					this.status = this.list.length >= total ? 3 : 1
				}
			},
			
			// 下拉加载
			handleRefresh() {
				this.query.pageNum = 1
				this.triggered = true
				setTimeout(()=>{
					if(getToken()) this.datainit()
					this.triggered = false
				},500)
			},
			
			// 上滑加载更多
			handleMore() {
				if(this.status == 3) return
				this.status = 2
				this.query.pageNum++
				this.datainit(1)
				// console.log('到底部了');
			},
			
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
		.file-list {
			padding: 0 32rpx;
			.file {
				// margin-bottom: 32rpx;
				padding: 16rpx 0;
			}
		}
	}
</style>
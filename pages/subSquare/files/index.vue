<template>
	<view class="container">
		<view class="top">
			<u-subsection :list="subList" :current="query.sea" inactiveColor='#707070' @change="sectionChange"
				activeColor='#333333' bgColor='#f7f7f7' fontSize='24rpx' :bold='false'></u-subsection>
		</view>
		
		<scroll-view scroll-y enable-back-to-top refresher-enabled @refresherrefresh='handleRefresh' @scrolltolower='handleMore'
		 :refresher-triggered='triggered' lower-threshold="30" show-scrollbar style="height: calc(100% - 100rpx);">
			<!-- <view :class="['loading', triggered ? '' : 'not']">
				<loading :top='30' />
			</view> -->
			
			<view class="mb16 pl12 pr12 pt12">
				<u-search showAction actionText="搜索" :animation="false" v-model="query.name" height='64' searchIconSize='42' 
				:actionStyle="{color:'#000',fontSize:'28rpx'}" color='#000' placeholder='输入文件名称' @search='_=>datainit()'
				@custom='_=>datainit()' @clear='_=>datainit()'></u-search>
			</view>
			
			<view class="file-list">
				<view class="file flex-between" @click="handleSeeFile(item, index)"
				 v-for="(item,index) in list" :key="item.id">
					<view class="flex-a">
						<u--image :showMenuByLongpress='false' :showLoading="true" width="60rpx" height="70rpx" radius='8rpx'
						 :src="require(`@/static/image/filetype/${item.typeName}.png`)"></u--image>
						 <view class="ml8">
							 <view>{{ item.name }}</view>
							 <text class="fons-10 c-6a">{{ item.create_time }}</text>
							 <text class="fons-10 ml10">{{ item.size | bytesToSize }}</text>
						 </view>
					</view>
					<view class="flex-a h-40" @click.stop>
						<u-icon name="download" color='#000'></u-icon>
						<text class="ml5">{{ item.downNumber }}</text>
					</view>
				</view>
			</view>
			
			<u-empty v-if="!list.length" mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" textSize='32rpx'
			 height='300rpx' width='300rpx'></u-empty>
			
			<loading-text :status="status" v-if="list.length"></loading-text>
		</scroll-view>
		
		<Popup :show.sync="popupShow" :mode="popupMode" :file="curFile" />
	</view>
</template>

<script>
	import loading from '@/components/mix-loading/index'
	import loadingText from '@/components/Loading-text/index'
	import Popup from '@/components/Popup/index'
	import { getToken } from '@/utils/cache'
	import { getFilesList } from '@/api/api'
	export default {
		components: {
			loading, loadingText, Popup
		},
		data() {
			return {
				triggered: false, // 页面触发下拉事件
				status: 1, // 加载的状态 1上拉加载 2正在加载 3没有了
				query: {
					pageNum: 1,
					pageSize: 15,
					// status: 0,
					name: '',
					sea: 0 // 当前所在的分断器的index
				},
				list: [],
				subList: ['公共文件', '私密文件'],
				currentSub: 0, // 当前所在的分断器的index
				
				popupShow: false,
				popupMode: 'bottom',
				curFile: {}, // 当前选中的文件信息
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
				const { data, total } = await getFilesList(this.query)
				 // ['ai','pdf','ppt','txt','word','xlsx','zip','png'].includes(item.downUrl.split('.').at(-1)) ? item.downUrl.split('.').at(-1) : 'files'
				data.forEach(d => {
					const type = d.downUrl.split('.').at(-1),
						types = ['ai', 'pdf', 'ppt', 'txt', 'docx', 'xlsx', 'zip', 'png']
					if(types.includes(type)) d.typeName = type
					else {
						switch(type) {
							case 'jpg': case 'jpeg': case 'gif':
								d.typeName = 'png'
								break
							case 'doc':
								d.typeName = 'docx'
								break
							case 'xls':
								d.typeName = 'xlsx'
								break
							case 'rar':
								d.typeName = 'zip'
								break
							default:
								d.typeName = 'files'
						}
					}
				})
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
			
			// 切换分段器
			sectionChange(index) {
				this.query.sea = index
				this.datainit()
			},
			
			// 点击文件
			handleSeeFile(item, ind) {
				// console.log(item)
				this.curFile = item
				if(ind & 1) this.popupMode = 'top'
					else this.popupMode = 'bottom'
				this.popupShow = true
			},
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep.container {
		overflow-y: hidden;
		background-color: #fcfcfc;
		.top {
			background-color: #fff;
			padding: 0 32rpx;
			height: 100rpx;
			.u-subsection {
				height: 64rpx;
				line-height: 64rpx;
				padding: 4rpx;
				border-radius: 32rpx;
				.u-subsection__bar {
					height: 56rpx;
					border-radius: 28rpx !important;
					border: 2rpx solid #e8e8e8;
				}
			}
		}
		
		
		
		.file-list {
			padding: 0 32rpx;
			.file {
				// margin-bottom: 32rpx;
				padding: 16rpx 0;
			}
		}
	}
</style>
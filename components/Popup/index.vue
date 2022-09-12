<template>
	<view class="popup">
		<u-popup :show="popShow" @close="close" @open="open" :round="10" :mode="mode">
			<view class="content mt16">
				<!-- <view class="text-c mt16">尽请期待</view> -->
				<view class="flex">
					<u--image :showMenuByLongpress='false' :showLoading="true" width="80rpx" height="100rpx"
					 :src="require(`@/static/image/filetype/${file.typeName || 'ai'}.png`)"></u--image>
				</view>
				<view class="mt16">
					<view class="flex mb16" v-for="(item, index) in fileInfoData" :key="item.id">
						<text class="c-999">{{ item.label }} :</text>
						<view class="ml16 file-info" :class="item.data == 'remark'?'text-hidden3':'text-hidden'">{{ file[item.data] }}</view>
					</view>
				</view>
				<view class="c-999 fons-10 text-c">
					为保护隐私安全，文件无法查看上传人
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			mode: {
				type: String,
				default: 'top'
			},
			file: {
				type: Object,
				default: {}
			}
			
		},
		computed: {
			popShow: {
				get() {
					return this.show
				},
				set(show) {
					this.$emit('update:show', show)
				}
			}
		},
		data() {
			return {
				fileInfoData: [
					{ id: 1, label: '文件名', data: 'name' },
					// { id: 2, label: '大小', data: 'size' },
					// { id: 3, label: '下载次数', data: 'downNumber' },
					{ id: 4, label: '备注', data: 'remark' },
					{ id: 5, label: '上传时间', data: 'create_time' },
					{ id: 6, label: '更新时间', data: 'update_time' },
				]
			}
		},
		methods: {
			close() {
				this.popShow = false
			},
			
			open() {
			},
			
		}
	}
</script>

<style scoped lang="scss">
	::v-deep.popup {
		.content {
			height: 420rpx;
			.file-info {
				width: 60%;
			}
		}
	}
</style>
export default {
	data() {
		return {
		   //这个share可以在每个页面的data中设置相应的转发内容
			share:{
				title:'Angell One小程序',
				path:'/pages/guide/index',
				// imageUrl: ''
			}
		}
	},
	// 分享给好友
	onShareAppMessage(res) {
		return {
			title: this.share.title,
			path: this.share.path,
			imageUrl: this.share.imageUrl,
			// desc: this.share.desc,
			// content: this.share.content,
			success(res) {
				uni.showToast({
					title: '分享成功'
				})
			},
			fail(res) {
				uni.showToast({
					title: '分享失败',
					icon: 'none'
				})
			}
		}
	},
	//分享到朋友圈
	onShareTimeline(res) {
		return {
			title: this.share.title,
			path: this.share.path,
			imageUrl: this.share.imageUrl,
		}
	}
}



// <view v-if="isShowShare">
// 	<view class="shade" @click="closeShare" @touchmove.prevent></view>
// 	<!-- 邀请好友指引 -->
// 	<view class="invitezhi fons-14 c-fff">
// 		<view style="width: 100%;">
// 			<image src="@/static/image/shareLine.png" style="width: 121rpx;height: 113rpx;" />
// 		</view>
// 		<view>点击右上角</view>
// 		<view>将它发给指定朋友</view>
// 	</view>
// </view>

// css
// .shade {
// 	width: 100%;
// 	height: 100%;
// 	position: fixed;
// 	top: 0;
// 	left: 0;
// 	right: 0;
// 	bottom: 0;
// 	background: rgba(0, 0, 0, 0.4);
// 	/* z-index: 999; */
// }

// .inviteZHI {
// 	position: fixed;
// 	top: 0;
// 	right: 17%;
// 	text-align: right;
// 	width: 100%;
// }

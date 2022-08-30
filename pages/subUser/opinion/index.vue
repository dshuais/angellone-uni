<template>
	<view class="container">
		<view class="ml20 mb10 c-999 fons-12">
			如有侵权或更好的开发建议和思路，可以在这里反馈给我们嗷：
		</view>
		<view class="main bor-r8">
			<u--form
				labelPosition="left"
				labelWidth='140rpx'
				:model="feedback"
				:rules="rulesFeedback"
				ref="feedbackForm">
				<u-form-item label="反馈意见" prop="content" required>
					<u--textarea placeholder="如有侵权或开发建议,可在这里反馈给我!" v-model="feedback.content" count
						height='160rpx' maxlength="500"></u--textarea>
				</u-form-item>
				<u-form-item :label="input.name" :prop="input.data" v-for="(input, index) in inputList" :key="index">
					<u--input v-model="feedback[input.data]" border="none" :placeholder="`留下您的${input.name}`"></u--input>
				</u-form-item>
				<text class="c-999 fons-12 mt10 mb10 block">留下您的任意一种联系方式，好让我可以找到你鸭</text>
			</u--form>
		</view>
		
		<u-button type="primary" text="提交反馈" shape='circle' color='#4242E1' :customStyle="{
			width: '474rpx', height: '80rpx', marginTop: '80rpx'
		}" @click='handleSubmit'></u-button>
	</view>
</template>

<script>
	import reg from '@/utils/reg'
	import { submitFeedback } from '@/api/api'
	export default {
		data() {
			return{
				feedback: {
					content: '',
					phone: void 0,
					email: void 0,
					wechat: void 0,
					qq: void 0
				},
				rulesFeedback: {
					content: [
						{ required: true, message: '请输入反馈意见', trigger: ['blur', 'change'] }
					],
					phone: [
						{
							validator: (rule, value, callback) => reg.isPhone(value),
							message: '手机号不对哦', trigger: ['change','blur']
						}
					],
					email: [
						{
							validator: (rule, value, callback) => reg.isEmail(value),
							message: '邮箱不对哦', trigger: ['change','blur']
						}
					]
				},
				inputList: [
					{ name: '手机号', data: 'phone' },{ name: 'Email', data: 'email' },
					{ name: 'WeChat', data: 'wechat' },{ name: 'QQ', data: 'qq' },
				]
			}
		},
		onLoad() {
		},
		methods: {
			// 提交
			handleSubmit() {
				this.$refs.feedbackForm.validate().then(async res => {
					const { content, ...dd } = this.feedback,
					 some = Object.keys(dd).some(i => !!this.feedback[i])
					 for(let i in this.feedback) {
						 if(!this.feedback[i]) delete this.feedback[i]
					 }
					if(!some) return this.$msg("不给联系方式的话，我可就找不到你辣")
					await submitFeedback(this.feedback)
					this.$msg('剩下的交给我粑', 1)
					setTimeout(() => {
						uni.navigateBack()
						this.reset()
					}, 1000)
				}).catch(err=>{ })
			},
			
			reset() {
				this.feedback = {
					content: '',
					phone: void 0,
					email: void 0,
					wechat: void 0,
					qq: void 0
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-top: 32rpx;
		.main {
			background: #fff;
			padding: 16rpx 24rpx;
		}
	}
</style>
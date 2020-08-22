<template>
	<view class="star-container">
		<view class="top-bg-container">
			<view :style="'height:'+header+';width:100%;'"></view>
			<view class="index-avurl">
				<image @tap="navigateBack" style="width: 20rpx; position: absolute; left: 20rpx;" mode="widthFix" src="/static/image/back_white.png"></image>
				偶像圈
			</view>
		</view>
		
		<guildComponent ref="guildComponent"></guildComponent>
		<button open-type="getUserInfo" @getuserinfo="getUserInfo">
			<view v-if="tips" class="tips-container">
				<image src="/static/image/star/blank-3.png" mode="widthFix"></image>
			</view>
		</button>
	</view>

</template>

<script>
	import guildComponent from '@/components/guildComponent.vue'
	export default {
		components: {
			guildComponent,
		},
		data() {
			return {
				tips: false,
				header: '',
			};
		},
		onShareAppMessage() {
			return this.$app.commonShareAppMessage()
		},
		onLoad(option) {
			this.starid = option.starid
			if (this.starid == this.$app.getData('userStar').id) {
				this.$app.goPage('/pages/group/group')
			}
		},
		onReady() {},
		onShow() {
			this.header = uni.getSystemInfoSync()['statusBarHeight'] + 'px'
			if (!this.$app.getData('userStar').id) this.tips = true
			this.$refs.guildComponent.load(this.starid)
		},
		onUnload() {
			this.$refs.guildComponent.unLoad(this.starid)
			this.$refs.guildComponent.modal = ''

		},

		methods: {
			//退回上一层
			navigateBack() {
				uni.navigateBack()
			},
			getUserInfo(e) {
				const userInfo = e.detail.userInfo
				if (userInfo) {
					this.tips = false
					if (!this.$app.getData('userInfo').nickname) {

						this.$app.request(this.$app.API.USER_SAVEINFO, {
							iv: e.detail.iv,
							encryptedData: e.detail.encryptedData,
						}, res => {
							if (res.data.token) this.$app.token = res.data.token
							this.$app.request('page/app', {}, res => {
								this.$app.setData('userCurrency', res.data.userCurrency)
								this.$app.setData('userStar', res.data.userStar)
								this.$app.setData('userExt', res.data.userExt)
								this.$app.setData('userInfo', res.data.userInfo)
								this.$app.setData('config', res.data.config)
							})
						}, 'POST', true)
					}
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.star-container {
		position: relative;
		height: 100%;
		background-image: url(https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FmibDk8LrMNNib025upafEqqhEUGibBibYVXfsFS2GOqq8XDoBzgib1He6p3OSpwDCuhuMzMxa3yXp4icA/0);
		background-size: 100% 100%;
		.top-bg-container {
			width: 100%;
			
			.top-bg{
				width: 100%; 
			}
			
			.index-avurl {
				padding: 0 40rpx;
				height: 80rpx;
				font-size: 32rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		
		.tips-container {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(#000, 0.8);
			z-index: 3;

			image {
				width: 100%;
			}
		}
	}
</style>

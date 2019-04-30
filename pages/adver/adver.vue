<template>
	<view>
		<button type="primary" @tap="openAdver">看广告</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoAd: null
			};
		},
		onLoad() {
			this.videoAd = wx.createRewardedVideoAd({
				adUnitId: "adunit-f1aae5d7bd2ce0a4"
			})

			this.videoAd.onClose(status => {
				if (status && status.isEnded || status === undefined) {
					this.$app.toast('正常播放结束，可以下发游戏奖励')
				} else {
					this.$app.toast('播放中途退出，不下发游戏奖励')
				}
			})
			
			this.videoAd.onError(err => {
				console.error('onError', err)
			})

		},
		methods: {
			openAdver() {
				if (this.videoAd) {
					this.videoAd.show().catch(err => {
						// 失败重试
						this.videoAd.load().then(() => {
							this.videoAd.show()
						})
					})
				}

			}
		}
	}
</script>

<style lang="scss">

</style>

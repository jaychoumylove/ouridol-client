<!-- 开屏 -->
<template>
	<view class="open-container" @tap="$app.goPage('/pages/index/index')">
		<image class="img" :src="imgUrl" mode="aspectFill"></image>

		<view class="cut-time">{{time}} 秒</view>
	</view>
</template>

<script>
	var timeId;
	export default {
		data() {
			return {
				imgUrl: '',
				time: 5,
			};
		},
		onLoad() {
			this.getConfig()
		},
		onUnload() {
			clearInterval(timeId)
		},
		methods: {
			getConfig() {
				this.$app.request(this.$app.API.CONFIG, {
					key: 'open_img'
				}, res => {
					if (!res.data) {
						this.$app.goPage('/pages/index/index')
					} else {
						this.imgUrl = res.data
						// 开屏图
						timeId = setInterval(() => {
							if (--this.time <= 0) {
								clearInterval(timeId)
								this.$app.goPage('/pages/index/index')
							}
						}, 1000)
					}

				})
			},
		},
	}
</script>

<style lang="scss" scoped="">
	.open-container {
		height: 100%;
		position: relative;

		.cut-time {
			position: fixed;
			width: 120upx;
			text-align: center;
			bottom: 40upx;
			right: 40upx;
			color: #EEE;
			background-color: rgba(#FFF, 0.3);
			padding: 10upx 20upx;
			border-radius: 20upx;
		}
	}
</style>

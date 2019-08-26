<!-- 开屏 -->
<template>
	<view class="open-container" @tap="goPage('/pages/open/rank/rank')">
		<image class="img" :src="imgUrl" mode="aspectFill"></image>
		<view class="userflag-wrap flex-set" v-if="userFlag">
			<image :src="userFlag.user.avatarurl" class="avatar" mode=""></image>
			<text class='username text-overflow'>{{userFlag.user.nickname}}</text>助力<text>{{starname}}</text>开屏
		</view>
		<view class="cut-time" @tap.stop="goPage()">{{time}}跳过</view>
	</view>
</template>

<script>
	var timeId;
	export default {
		data() {
			return {
				imgUrl: '',
				time: 5,
				starname: '',
				userFlag: null,
			};
		},
		onLoad() {
			this.getConfig()
		},
		onUnload() {
			clearInterval(timeId)
		},
		methods: {
			goPage(url = '') {
				uni.reLaunch({
					url: '/pages/index/index?path=' + url
				})
			},
			getConfig() {
				this.$app.request('open/today', {}, res => {
					if (!res.data) {
						this.goPage()
					} else {
						this.imgUrl = res.data.img
						this.userFlag = res.data.user
						this.starname = res.data.starname
						// 开屏图
						timeId = setInterval(() => {
							if (--this.time <= 0) {
								clearInterval(timeId)
								this.goPage()
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

		.img {
			width: 100%;
			height: 100%;
		}

		.cut-time {
			position: fixed;
			text-align: center;
			bottom: 40upx;
			right: 40upx;
			height: 66upx;
			color: #FFF;
			background-color: rgba(0, 0, 0, 0.5);
			padding: 10upx 20upx;
			font-size: 32upx;
			border-radius: 60upx;
		}

		.userflag-wrap {
			position: fixed;
			bottom: 40upx;
			left: 30upx;
			white-space: nowrap;
			border-radius: 60upx;
			background: linear-gradient(to right, rgba(#FEEEB2, 0.9), rgba(#FEEEB2, 0.6));
			color: #777;
			font-size: 30upx;
			padding-right: 10upx;
			.avatar {
				width: 66upx;
				height: 66upx;
				border-radius: 50%;
			}
			
			.username {
				max-width: 150upx;
			}
			
			text {
				color: #DC6B0C;
				margin: 0 5upx;
			}
		}
	}
</style>

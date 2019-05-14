<template>
	<view class="container">
		

		<view class="item" v-for="(item,index) in list" :key="index" :class="{send:item.type == 2}">
			<image class="avatar" :src="item.avatarurl" mode="aspectFill"></image>
			<view class="content">
				<view class="left-content">
					<view class="name">
						<view class="nickname">{{item.nickname}}</view>
						<view class="starname">{{item.star}}</view>
					</view>
					<view class="bottom" v-if="item.type==1">偷偷盗走<text>{{starname}}</text>能量</view>
					<view class="bottom" v-if="item.type==2">给<text>{{starname}}</text>赠送能量</view>
				</view>

				<view class="right-content">
					<view class="time">{{item.time}}</view>
					<view class="bottom flex-set">
						<image src="/static/image/user/b1.png" mode="widthFix"></image>
						<view class="count">{{item.coin}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				requestCount: 1,

				starid: null,
				starname: '',
				list: [],
			};
		},
		onLoad(option) {
			this.starid = option.starid
			this.starname = option.starname
			this.getDynamic()
		},
		methods: {
			getDynamic() {
				this.$app.request(this.$app.API.STAR_DYNAMIC, {
					starid: this.starid
				}, res => {
					const resList = []
					for (let v of res.data) {
						resList.push({
							type: v.type,
							avatarurl: v.user && v.user.avatarurl || this.$app.AVATAR,
							nickname: v.user && v.user.nickname || this.$app.NICKNAME,
							star: v.user && v.user.user_star && v.user.user_star.star.name || '???',
							time: v.create_time.slice(11),
							coin: Math.abs(v.coin),
						})
					}

					this.list = resList

					this.$app.closeLoading(this)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		font-size: 26upx;

		.item {
			height: 120upx;
			margin: 20upx 0;
			background: url(http://wx1.sinaimg.cn/large/0060lm7Tly1g2h8p2voudg30k203d3ya.gif) right center no-repeat/contain;
			display: flex;
			align-items: center;

			.avatar {
				width: 90upx;
				height: 90upx;
				border-radius: 50%;
				margin-left: 100upx;
			}

			.content {
				display: flex;
				justify-content: space-between;
				flex: 1;
				padding-left: 20upx;
				padding-right: 30upx;
			}

			.left-content {

				.name {
					display: flex;

					.starname {
						background-color: #d2781e;
						border-radius: 20upx;
						color: #FFF;
						font-size: 24upx;
						padding: 0upx 8upx;
						margin-left: 4upx;
					}
				}

				.bottom {
					color: #FFF;
					font-size: 24upx;

					text {
						color: #703ba3;
						margin: 0 4upx;
					}
				}
			}

			.right-content {
				margin-left: 150upx;

				.bottom {
					image {
						width: 26upx;
						margin-right: 10upx;
					}

					color: #348036;
				}

			}
		}

		.item.send {
			background: url(http://wx3.sinaimg.cn/large/0060lm7Tly1g2hf1do6hwg30k203d3ya.gif) right center no-repeat/contain;

			.left-content {
				.starname {
					background-color: #c50083;
				}
			}


			.right-content {
				.bottom {
					color: #c50083;
				}
			}
		}
	}
</style>

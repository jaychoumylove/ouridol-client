<template>
	<view class="container">
		<!-- 列表 -->
		<view class="list-wrapper">
			<view class="item" v-for="(item,index) in userRank" :key="index">
				<view class="rank-num">
					<image v-if="index<3" :src="'/static/image/guild/'+(index+1)+'.png'" mode="widthFix"></image>
					<view v-else>{{index+1}}</view>
				</view>
				<view class='avatar'>
					<image :src="item.user.avatarurl" mode="aspectFill"></image>
				</view>
				<view class="text-container">
					<view class="star-name text-overflow">{{item.user.nickname}}</view>

				</view>
				<!-- <view class="level">lv10</view> -->
				<view class="count">{{item.count}}</view>
			</view>

		</view>
		<!-- 我的 -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				requestCount: 1,

				starid: null,
				userRank: [],
				page: 1,
				myInfo: {},
			};
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: "开屏助力贡献榜"
			})
			this.open_id = option.oid
			this.loadData()
		},

		methods: {
			loadData() {
				this.$app.request(this.$app.API.USER_RANK, {
					open_id: this.open_id,
					page: this.page
				}, res => {
					this.userRank = res.data.list
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.list-wrapper {
			background: #FFFFFF;

			.item {
				margin: 20upx 0;
				height: 100upx;
				background-color: rgba(#FFF, .3);
				border-bottom: 1rpx solid $text-color-10;
				display: flex;
				align-items: center;

				.rank-num {
					margin-left: 40upx;
					width: 40rpx;
					display: flex;
					justify-content: center;
					
					image {
						width: 40upx;
						min-height: 40upx;
					}
				}

				.avatar image {
					margin-left: 40upx;
					width: 70upx;
					height: 70upx;
					border-radius: 50%;
				}

				.text-container {
					margin-left: 30upx;
					width: 250upx;
					line-height: 44upx;
					color: $text-color-4;

					.bottom-text {
						display: flex;
						align-items: center;
					}
				}

				.level {
					// margin-left: 30upx;
				}

				.count {
					margin-left: 30upx;
					color: $text-color-3;
				}


			}

			// .item.one {
			// 	background: url(http://tva1.sinaimg.cn/large/0060lm7Tly1g2enrl4pe1g30j703n0sk.gif) right center no-repeat/contain;
			// }

			// .item.two {
			// 	background: url(http://tva1.sinaimg.cn/large/0060lm7Tly1g2enrl5aerg30j703ndfn.gif) right center no-repeat/contain;
			// }

			// .item.three {
			// 	background: url(http://tva1.sinaimg.cn/large/0060lm7Tly1g2enrl4zd6g30j703ngle.gif) right center no-repeat/contain;
			// }
		}

		.my-wrap {
			position: fixed;
			bottom: 0;
			width: 100%;
			margin: 20upx 0;
			height: 130upx;
			display: flex;
			background-color: $text-color-1;
			align-items: center;

			.rank-num {
				margin-left: 106upx;
			}

			.avatar image {
				margin-left: 60upx;
				width: 100upx;
				height: 100upx;
				border-radius: 50%;
			}

			.text-container {
				margin-left: 30upx;
				width: 250upx;
				line-height: 44upx;

				.bottom-text {
					display: flex;
					align-items: center;
					color: $color_2;
				}
			}

			.level {
				// margin-left: 30upx;
			}

			.count {
				margin-left: 30upx;
			}

		}
	}
</style>

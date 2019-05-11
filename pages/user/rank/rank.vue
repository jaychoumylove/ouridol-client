<template>
	<view class="container">
		<loadIconComponent v-if="requestCount>0" type='whole'></loadIconComponent>

		<scroll-view scroll-y class="list-wrapper">
			<view class="item" :class="{one:index==0,two:index==1,three:index==2}" v-for="(item,index) in userRank" :key="index">
				<view class="rank-num">
					<view>{{index+1}}</view>
				</view>
				<view class='avatar'>
					<image :src="item.avatar" mode="aspectFill"></image>
				</view>
				<view class="text-container">
					<view class="star-name text-overflow">{{item.nickname}}</view>

				</view>
				<!-- <view class="level">lv10</view> -->
				<view class="count">{{item.hot}}</view>
			</view>

		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				requestCount: 1,

				starid: null,
				userRank: [],
			};
		},
		onLoad(option) {
			this.starid = option.starid
			this.getUserRank()
		},
		methods: {
			getUserRank() {
				this.$app.request(this.$app.API.USER_RANK, {
					starid: this.starid,
				}, res => {
					const resList = []
					res.data.forEach((e, i) => {
						resList.push({
							avatar: e.user && e.user.avatarurl || this.$app.AVATAR,
							nickname: e.user && e.user.nickname || this.$app.NICKNAME,
							hot: this.$app.formatNumberRgx(e.thisweek_count),
						})
					})
					this.userRank = resList
					this.$app.closeLoading(this)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.list-wrapper {

			.item {
				margin: 20upx 0;
				height: 130upx;
				background: url(http://wx1.sinaimg.cn/large/0060lm7Tly1g2enrl619ng30j703n741.gif) right center no-repeat/contain;
				display: flex;
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

			.item.one {
				background: url(http://wx3.sinaimg.cn/large/0060lm7Tly1g2enrl4pe1g30j703n0sk.gif) right center no-repeat/contain;
			}

			.item.two {
				background: url(http://wx4.sinaimg.cn/large/0060lm7Tly1g2enrl5aerg30j703ndfn.gif) right center no-repeat/contain;
			}

			.item.three {
				background: url(http://wx4.sinaimg.cn/large/0060lm7Tly1g2enrl4zd6g30j703ngle.gif) right center no-repeat/contain;
			}
		}
	}
</style>

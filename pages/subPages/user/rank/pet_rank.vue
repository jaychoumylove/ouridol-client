<template>
	<view class="container">
		<!-- 列表 -->
		<view class="list-wrapper">
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

		</view>
		<!-- 我的 -->
		<view class="my-wrap" v-if="$app.getData('userStar').id == starid">
			<view class="rank-num">
				<view>{{myInfo.rank}}</view>
			</view>
			<view class='avatar'>
				<image :src="$app.getData('userInfo').avatarurl" mode="aspectFill"></image>
			</view>
			<view class="text-container">
				<view class="star-name text-overflow">{{$app.getData('userInfo').nickname}}</view>

			</view>
			<!-- <view class="level">lv10</view> -->
			<view class="count">{{myInfo.score}}</view>
		</view>
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
			this.starid = option.starid
			this.loadData()
		},
		onReachBottom() {
			if (this.$app.getData('userStar').id == this.starid && ++this.page <= 10) {
				this.loadData()
			}
		},
		methods: {
			loadData() {
				this.$app.request(this.$app.API.USER_RANK, {
					starid: this.starid,
					page: this.page
				}, res => {
					this.myInfo = res.data.my
					const resList = []
					res.data.list.forEach((e, i) => {
						resList.push({
							avatar: e.user && e.user.avatarurl || this.$app.getData('AVATAR'),
							nickname: e.user && e.user.nickname || this.$app.getData('NICKNAME'),
							hot: this.$app.formatNumberRgx(e.thisweek_count),
						})
					})

					if (this.page == 1) {
						this.userRank = resList
					} else {
						this.userRank = this.userRank.concat(resList)
					}
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
				background: url(https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Hf1Erx2q066sKAsgEzqUsxtR4IyxJscPr234VZVlMPb9Z2TSwvzWYBOMtribqMrLGIUAbJGtyERqA/0) right center no-repeat/contain;
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
				background: url(http://tva1.sinaimg.cn/large/0060lm7Tly1g2enrl4pe1g30j703n0sk.gif) right center no-repeat/contain;
			}

			.item.two {
				background: url(http://tva1.sinaimg.cn/large/0060lm7Tly1g2enrl5aerg30j703ndfn.gif) right center no-repeat/contain;
			}

			.item.three {
				background: url(http://tva1.sinaimg.cn/large/0060lm7Tly1g2enrl4zd6g30j703ngle.gif) right center no-repeat/contain;
			}
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

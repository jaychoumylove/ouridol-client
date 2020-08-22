<template>
	<view class="container">


		<view class="item-wrapper" v-for="(item,index) in history" :key="index">
			<view class="title">{{item.date}}</view>
			<view class="topthree-container">
				<view class="content">
					<view class="avatar">
						<image class='crown' src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FmibDk8LrMNNib025upafEqqHmueeZYKuacYia8j4bAp6QvdV6QiaEOnbkHrmldib4cWCX0Z9zH9icI0Fw/0" mode="widthFix"></image>
						<image class='star-img star-img2' :src="item.rankList[1]&&item.rankList[1].avatar" mode="aspectFill"></image>
					</view>
					<view class="starname">{{item.rankList[1]&&item.rankList[1].name}}</view>
					<view class="hot">{{item.rankList[1]&&item.rankList[1].hot}}
						<image src="/static/image/user/b1.png" mode=""></image>
					</view>
				</view>
				<view class="content">
					<view class="avatar">
						<image class='crown' src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FmibDk8LrMNNib025upafEqqh1dCicMH9zslul4jQDl03ibeuBmTKsICIS3b0qpO60uiamrNjakg7AUEA/0" mode="widthFix"></image>
						<image class='star-img star-img1' :src="item.rankList[0]&&item.rankList[0].avatar" mode="aspectFill"></image>
					</view>
					<view class="starname">{{item.rankList[0]&&item.rankList[0].name}}</view>
					<view class="hot">{{item.rankList[0]&&item.rankList[0].hot}}
						<image src="/static/image/user/b1.png" mode=""></image>
					</view>
				</view>
				<view class="content">
					<view class="avatar">
						<image class='crown' src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FmibDk8LrMNNib025upafEqqboqMXAAOFaApkN81oVuJVgE61VOLl522ZZKMVTMJ4tJhQibIz6GpJNQ/0" mode="widthFix"></image>
						<image class='star-img star-img3' :src="item.rankList[2]&&item.rankList[2].avatar" mode="aspectFill"></image>
					</view>
					<view class="starname">{{item.rankList[2]&&item.rankList[2].name}}</view>
					<view class="hot">{{item.rankList[2]&&item.rankList[2].hot}}
						<image src="/static/image/user/b1.png" mode=""></image>
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
				rankField: 'week_hot',
				history: [],
			};
		},
		onLoad(option) {
			if (option.rankField) this.rankField = option.rankField
			this.getRankList()
		},
		methods: {
			/**
			 * 去偶像圈打榜
			 */
			goGroup(starid) {
				if (this.$app.getData('userStar')['id'] == starid) {
					this.$app.goPage('/pages/group/group')
				} else {
					this.$app.goPage('/pages/subPages/star/star?starid=' + starid)
				}
			},
			getRankList() {
				this.$app.request(this.$app.API.STAR_RANK_HISTORY, {
					rankField: this.rankField
				}, res => {
					const resList = []
					res.data.forEach(thisItem => {
						const item = {
							date: thisItem.date,
							rankList: [],
						}

						thisItem.value.forEach(rankItem => {
							item.rankList.push({
								starid: rankItem.star.id,
								name: rankItem.star.name,
								avatar: rankItem.star.head_img_s ? rankItem.star.head_img_s : rankItem.star.head_img_l,
								hot: this.$app.formatNumberRgx(rankItem[this.rankField]),
							})
						})

						resList.push(item)
					})
					this.history = resList

					this.$app.closeLoading(this)
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20upx;

		.item-wrapper {
			margin-bottom: 20upx;
			height: 480upx;
			background-color: #FFF;
			border-radius: 10upx;
			overflow: hidden;
			position: relative;
			background: url(http://tva1.sinaimg.cn/large/0060lm7Tly1g2eq8fhy4pg30jh0cjwe9.gif) center no-repeat/cover;

			.title {
				text-align: center;
				padding-top: 18upx;
				font-weight: 700;
				font-size: 32upx;
				color: $text-color-7;
			}

			.topthree-container {
				display: flex;
				justify-content: space-between;
				margin-top: 50rpx;

				.content {
					width: 100%;
					height: 100%;
					border-radius: 10upx;
					display: flex;
					flex-direction: column;
					align-items: center;

					.avatar {
						width: 160upx;
						border-radius: 50%;
						margin-top: -10upx;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						.crown {
							width: 100rpx;
						}
						
						.star-img1 {
							border: 10rpx solid #ffde5d;
						}
						.star-img2 {
							border: 10rpx solid #e7f1f6;
						}
						.star-img3 {
							border: 10rpx solid #ead0ba;
						}

						.star-img {
							border-radius: 50%;
							width: 180upx;
							height: 180upx;
							margin-top: -10rpx;
						}
					}

					.starname {
						margin-top: 10upx;
					}

					.hot {
						margin-top: 10upx;
						margin-bottom: 10upx;
						display: flex;
						align-items: center;
						color: $text-color-2;

						image {
							width: 30upx;
							height: 30upx;
							margin-left: 4upx;
						}
					}

				}

			}
		}
	}
</style>

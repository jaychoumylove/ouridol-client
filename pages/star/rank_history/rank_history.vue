<template>
	<view class="container">
		

		<view class="item-wrapper" v-for="(item,index) in history" :key="index">
			<view class="title">{{item.date}}</view>
			<view class="topthree-container">
				<view class="content">
					<image class='crown' src="/static/image/index/ic_huangguang_2.png" mode=""></image>
					<view class="avatar" style="background-color: #9E9095;">
						<image class='position-set' :src="item.rankList[1]&&item.rankList[1].avatar" mode="aspectFill"></image>
					</view>
					<view class="starname">{{item.rankList[1]&&item.rankList[1].name}}</view>
					<view class="hot">{{item.rankList[1]&&item.rankList[1].hot}}
						<image src="/static/image/index/ic_hot.png" mode=""></image>
					</view>
				</view>
				<view class="content">
					<image class='crown' src="/static/image/index/ic_huangguang_1.png" mode=""></image>
					<view class="avatar" style="background-color: #FFC329;">
						<image class='position-set' :src="item.rankList[0]&&item.rankList[0].avatar" mode="aspectFill"></image>
					</view>
					<view class="starname">{{item.rankList[0]&&item.rankList[0].name}}</view>
					<view class="hot">{{item.rankList[0]&&item.rankList[0].hot}}
						<image src="/static/image/index/ic_hot.png" mode=""></image>
					</view>
				</view>
				<view class="content">
					<image class='crown' src="/static/image/index/ic_huangguang_3.png" mode=""></image>
					<view class="avatar" style="background-color: #EC7E3D;">
						<image class='position-set' :src="item.rankList[2]&&item.rankList[2].avatar" mode="aspectFill"></image>
					</view>
					<view class="starname">{{item.rankList[2]&&item.rankList[2].name}}</view>
					<view class="hot">{{item.rankList[2]&&item.rankList[2].hot}}
						<image src="/static/image/index/ic_hot.png" mode=""></image>
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

				history: [],
			};
		},
		onLoad() {
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
					this.$app.goPage('/pages/star/star?starid=' + starid)
				}
			},
			getRankList() {
				this.$app.request(this.$app.API.STAR_RANK_HISTORY, {}, res => {
					const resList = []
					res.data.forEach(weekItem => {
						const item = {
							date: weekItem.date.toString().slice(0, 4) + '第' + weekItem.date.toString().slice(4) + '周',
							rankList: [],
						}

						weekItem.value.forEach(rankItem => {
							item.rankList.push({
								starid: rankItem.star.id,
								name: rankItem.star.name,
								avatar: rankItem.star.head_img_s ? rankItem.star.head_img_s : rankItem.star.head_img_l,
								hot: this.$app.formatNumberRgx(rankItem['week_hot']),
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
			background: url(http://wx4.sinaimg.cn/large/0060lm7Tly1g2eq8fhy4pg30jh0cjwe9.gif) center no-repeat/cover;

			.title {
				text-align: center;
				padding-top: 18upx;
				font-weight: 700;
				font-size: 32upx;
			}

			.topthree-container {
				display: flex;
				justify-content: space-between;

				.content {
					width: 100%;
					height: 100%;
					border-radius: 10upx;
					display: flex;
					flex-direction: column;
					align-items: center;

					.crown {
						width: 82upx;
						height: 66upx;
						margin-top: 60upx;
					}

					.avatar {
						width: 160upx;
						height: 160upx;
						border-radius: 50%;
						margin-top: -10upx;
						position: relative;

						image {
							border-radius: 50%;
							width: 140upx;
							height: 140upx;
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
						color: $color_1;

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

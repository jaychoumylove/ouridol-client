<template>
	<view class="container">
		<view class='tab-container'>
			<view class="tab">
				<view class="tab-item" :class='{active:current==0}' @tap='switchAct(0)'>周榜</view>
				<view class="tab-item" :class='{active:current==1}' @tap='switchAct(1)'>月榜</view>
				<view class="tab-item" :class='{active:current==2}' @tap='switchAct(2)'>总榜</view>
			</view>
		
		</view>
		
		<view class="top-three">
			<view class="top-three-img">
				<view class="two">
					<image style="width: 141rpx; height: 149rpx; z-index: 5;" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HYKTMib185fwujoD0wb2EuDGjh9MawJOZ61J0ykJHzKrksSf1zBfVFHCictohBCicA4JWwNC5YljiaSQ/0" mode="aspectFill"></image>
					<image class="user_avatar" :src="userRank[1].avatar || AVATAR" mode="aspectFill"></image>
				</view>
				<view class="one">
					<image style="width: 184rpx; height: 194rpx; z-index: 5;" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HYKTMib185fwujoD0wb2EuDCEt2u0s0qbuu6RF8k8252ttLQyWmf5XFfH5jV8F5Gc4857pPXkR5Tw/0" mode="aspectFill"></image>
					<image class="user_avatar" :src="userRank[0].avatar || AVATAR" mode="aspectFill"></image>
				</view>
				<view class="three">
					<image style="width: 128rpx; height: 135rpx; z-index: 5;" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HYKTMib185fwujoD0wb2EuDONRAdg8QLbTibHjChAgSQicUh6H037akJyQAicnDGvBK7DHGWrniapU4Bg/0" mode="aspectFill"></image>
					<image class="user_avatar" :src="userRank[2].avatar || AVATAR" mode="aspectFill"></image>
				</view>
				
			</view>
			<view class="top-three-bg">
				<view class="top-three-name">
					<view class="two-name">
						<view class="name">{{userRank[1].nickname || NICKNAME}}</view>
						<view class="hot">{{userRank[1].hot || 0}}</view>
					</view>
					<view class="one-name">
						<view class="name">{{userRank[0].nickname || NICKNAME}}</view>
						<view class="hot">{{userRank[0].hot || 0}}</view>
					</view>
					<view class="three-name">
						<view class="name">{{userRank[2].nickname || NICKNAME}}</view>
						<view class="hot">{{userRank[2].hot || 0}}</view>
					</view>
				</view>
				<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HYKTMib185fwujoD0wb2EuDDuXPbPbxY7bF3JR1HoIEWiakdicq8qkXDm02jwxkwD2td0prT2PnSBCw/0" mode="widthFix"></image>
				
			</view>
		</view>
		
		<view class="list-wrapper">
			<view class="item" v-for="(item,index) in userRank" :key="index" v-if="index>2">
				<view class="rank-num">
					<view>{{index+1}}</view>
				</view>
				<view class='avatar'>
					<image :src="item.avatar || AVATAR" mode="aspectFill"></image>
				</view>
				<view class="text-container">
					<view class="star-name text-overflow">{{item.nickname || NICKNAME}}</view>

				</view>
				<!-- <view class="level">lv10</view> -->
				<view class="count">{{item.hot}}</view>
			</view>

		</view>
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
				current: 0,
				AVATAR: this.$app.getData('AVATAR'),
				NICKNAME: this.$app.getData('NICKNAME'),
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
			switchAct(current) {
				this.page = 1
				this.current = current
				this.loadData()
			},
			loadData() {
				if (this.page > 10) return
				let field;
				if (this.current == 0) {
					field = 'thisweek_count'
				} else if (this.current == 1) {
					field = 'thismonth_count'
				} else if (this.current == 2) {
					field = 'total_count'
				}
				this.$app.request(this.$app.API.USER_RANK, {
					starid: this.starid,
					page: this.page,
					field,
				}, res => {
					this.myInfo = res.data.my
					const resList = []
					res.data.list.forEach((e, i) => {
						resList.push({
							avatar: e.user && e.user.avatarurl || this.$app.getData('AVATAR'),
							nickname: e.user && e.user.nickname || this.$app.getData('NICKNAME'),
							hot: this.$app.formatNumberRgx(e.hot),
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
		.tab-container {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			padding-top: 40rpx;
		
			.tab {
				width: 100%;
				height: 80rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;
		
				.tab-item {
					width: 200rpx;
					padding: 15upx 0upx;
					margin: 0 40rpx;
					background:linear-gradient(0deg,rgba(208,208,208,1) 0%,rgba(175,175,175,1) 100%);
					justify-content: center;
					display: flex;
					font-size: 28upx;
					flex: 1;
					border-radius: 60rpx;
				}
		
				.tab-item.active {
					background:linear-gradient(to right bottom, #FF3A8A 20%, #fa6c9f 82%, #ffe140 100%) !important;
					text-align: center;
				}
			}
		
		}
		
		.top-three{
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 30rpx;
			
			.top-three-img{
				width: 90%;
				display: flex;
				padding-bottom: 20rpx;
				z-index: 5;
				view{
					width: 33%;
					display: flex;
					justify-content: center;
				}
				.one {
					position: relative;
					.user_avatar{
						width: 151rpx;
						height: 151rpx;
						position: absolute;
						border-radius: 50%;
						top: 37rpx;
						left: 46rpx;
						z-index: 4;

					}
				}
				
				.two {
					margin-top: 110rpx;
					position: relative;
					.user_avatar{
						width: 112rpx;
						height: 112rpx;
						position: absolute;
						border-radius: 50%;
						top: 34rpx;
						left: 68rpx;
						z-index: 4;
					}
				}
				
				.three {
					margin-top: 140rpx;
					position: relative;
					.user_avatar{
						width: 104rpx;
						height: 104rpx;
						position: absolute;
						border-radius: 50%;
						top: 28rpx;
						left: 68rpx;
						z-index: 4;

					}
				}
			}
			.top-three-bg{
				width: 90%;
				z-index: 1;
				display: flex;
				flex-direction: column;
				image{
					margin-top: -200rpx;
				}
			
				.top-three-name{
					display: flex;
					flex-direction: row;
					color: #FFFFFF;
					padding-top: 20rpx;
					z-index: 1;
					
					view{
						width: 33%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						text-align: center;
						.name{
							width: 100%;
							font-size: 32rpx;
							padding-bottom: 10rpx;
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
						}
						.hot{
							width: 100%;
						}
					}
					.one-name{
						margin-top: -120rpx;
					}
					
				}
			}
		}
		
		.list-wrapper {
			display: flex;
			flex-direction: column;
			background: #FFFFFF;
			border-radius: 20rpx;
			padding: 0 20rpx;
			z-index: 9;
			margin-top: -30rpx;
			margin-bottom: 150rpx;

			.item {
				height: 130upx;
				background: #FFFFFF;
				border-bottom: 2rpx solid #F3F3F3;
				display: flex;
				align-items: center;
				color: #4D2D2D;
				font-weight: bold;
				z-index: 9;

				.rank-num {
					margin-left: 30upx;
					
				}

				.avatar image {
					margin-left: 60upx;
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
				}

				.text-container {
					margin-left: 30upx;
					width: 250upx;
					line-height: 44upx;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					
					.star-name{
					}

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
					padding-right: 30upx;
					flex: 1 0%;
					text-align: right;
					color: #E99990;
				}


			}

			
		}

		.my-wrap {
			position: fixed;
			bottom: 0;
			width: 100%;
			margin: 20upx 0;
			height: 130upx;
			display: flex;
			background-color: #EFCCC8;
			align-items: center;
			font-weight: bold;
			z-index: 99;

			.rank-num {
				margin-left: 30upx;
				
			}

			.avatar image {
				margin-left: 60upx;
				width: 80upx;
				height: 80upx;
				border-radius: 50%;
			}

			.text-container {
				margin-left: 30upx;
				width: 250upx;
				line-height: 44upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				
				.star-name{
				}
			
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
				padding-right: 30upx;
				flex: 1 0%;
				text-align: right;
			}

		}
	}
</style>

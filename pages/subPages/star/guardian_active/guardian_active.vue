<template>
	<view class="guardian-active-container">
		<view class="top-content">
			<view class="avatar-wrapper">
				<image class="avatar share" :src="$app.getData('userStar').head_img_s || $app.getData('userStar').head_img_l" mode="aspectFill"></image>
			</view>

			<view class="top-text-wrapper">
				<view class="star-name row">
					<view class="rank text-overflow">{{$app.getData('userStar').name}}</view>
				</view>
			</view>
		</view>
		<view class="active-time">
			<view class="">活动时间：{{active_time.start_time_text}}-{{active_time.end_time_text}}</view>
		</view>
		<view class="active-img">
			<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9F5gibp1LJCVsBLZ5naGiaX1w3N52ws1etxyvhZp1PG820JSRXagiaHBXTlCIk30SMPKW6rnhdkPMZdQ/0" mode="widthFix"></image>
		</view>
		<view class="active-desc">
			<!-- <view>精灵等级30级以上的用户，每天可守护爱豆不被偷取能量</view>
			<view>一个人每天最多可守护爱豆1-21小时不被偷取能量</view>
			<view>请选择需要守护的时间段：</view> -->
			<view class="user-info">
				<image class="avatar" :src="$app.getData('userInfo').avatarurl || $app.getData('AVATAR')" mode="aspectFill"></image>
				<view class="nickname text-overflow">{{$app.getData('userInfo').nickname || $app.getData('NICKNAME')}}</view>
				<view class="text" v-if="total_need_stone">到<text class="text-color-3">Lv.30</text>还需要<text class="text-color-3">{{total_need_stone}}</text>灵丹</view>
				<view class="text" v-else>您已达到<text class="text-color-8">Lv.{{sprite_level || 1}}</text>，剩余守护次数：<text class="text-color-3">{{sprite_level?(sprite_level-29-guardian_times):0}}</text>次</view>
			</view>
		</view>

		<view class="active-list-container">
			<view class='tab-container'>
				<view class="tab">
					<view class="tab-item" :class='{active:current==0}' @tap='switchAct(0)'>守护爱豆</view>
					<view class="tab-item" :class='{active:current==1}' @tap='switchAct(1)'>爱豆守护排行榜</view>
					<view class="tab-item" :class='{active:current==2}' @tap='switchAct(2)'>世界守护排行榜</view>
				</view>

			</view>
			<block v-if="current==0">
				<view class="active-list-desc">今天是{{today_time_text}}，{{$app.getData('userStar').name}}守护清单如下：</view>
				<view class="list-wrapper">
					<view class="list-wrapper">
						<view class="item" v-for="(item,index) in list" :key="index" v-if="today_hour!='' && index>=today_hour">
							<view class="left">
								<view class="time">{{index}}:00-{{index+1}}:00</view>
							</view>
							<view class="right">
								<view class='avatar'>
									<image :src="item.user.avatarurl || ''" mode="aspectFill"></image>
								</view>
								<view class="text-container">
									<view class="nickname text-overflow">{{item.user.nickname || '暂无守护者'}}</view>

									<block v-if="!item.timeout">
										<view class="bottom-text" style="color: #FF5174;" v-if="item.user">正在守护中</view>
										<view class="bottom-text" v-else @tap="guardianStar(index)">
											<btnComponent type="default">
												<view class="flex-set" style="width: 140upx;height: 40upx;">我来守护</view>
											</btnComponent>
										</view>
									</block>
									<block v-else>
										<view class="bottom-text" style="color: #F6AFAF;" v-if="item.user">已经守护过</view>
										<view class="bottom-text" v-else>守护时间已过</view>
									</block>

								</view>
							</view>

						</view>
						<view class="item" v-for="(item,index) in list" :key="index" v-if="today_hour!='' && index<today_hour">
							<view class="left">
								<view class="time">{{index}}:00-{{index+1}}:00</view>
							</view>
							<view class="right">
								<view class='avatar'>
									<image :src="item.user.avatarurl || ''" mode="aspectFill"></image>
								</view>
								<view class="text-container">
									<view class="nickname text-overflow">{{item.user.nickname || '暂无守护者'}}</view>
						
									<block v-if="!item.timeout">
										<view class="bottom-text" style="color: #FF5174;" v-if="item.user">正在守护中</view>
										<view class="bottom-text" v-else @tap="guardianStar(index)">
											<btnComponent type="default">
												<view class="flex-set" style="width: 140upx;height: 40upx;">我来守护</view>
											</btnComponent>
										</view>
									</block>
									<block v-else>
										<view class="bottom-text" style="color: #F6AFAF;" v-if="item.user">已经守护过</view>
										<view class="bottom-text" v-else>守护时间已过</view>
									</block>
						
								</view>
							</view>
						
						</view>
					</view>
				</view>
			</block>
			<block v-if="current!=0">
				<view class="active-list-desc">{{active_time.end_time_text}}活动截止，根据排名发放奖励</view>
				<view class="rank-list">
					<block v-if="guardianRankList.length>0" v-for="(item,index) in guardianRankList" :key="index">
						<view class="item">
							<view class="item-info">
								<image class="rank-img" v-if="index==0" src="/static/image/guild/1.png" mode="widthFix"></image>
								<image class="rank-img" v-else-if="index==1" src="/static/image/guild/2.png" mode="widthFix"></image>
								<image class="rank-img" v-else-if="index==2" src="/static/image/guild/3.png" mode="widthFix"></image>
								<view class="rank-img" v-else>{{index+1}}</view>
								<block v-if="current==1">
									<view class="avatar-img">
										<image :src="item.star.head_img_s || $app.getData('AVATAR')" mode="aspectFill"></image>
									</view>

									<view style="margin-left: 20rpx;">
										<view class="name">{{item.star.name || '神秘爱豆'}}</view>
										<view style="color: #909090; font-size: 24rpx;">
											被守护次数：<text style="color: #EF8392;">{{item.total_guardian_times || 0}}次</text>
										</view>
									</view>

								</block>
								<block v-if="current==2">
									<view class="avatar-img">
										<image :src="item.user.avatarurl || $app.getData('AVATAR')" mode="aspectFill"></image>
									</view>

									<view style="margin-left: 20rpx;">
										<view class="user-info">
											<view class="name">{{item.user.nickname || '神秘粉丝'}}</view>
											<image style="width: 76rpx; margin: 0 10rpx;" v-if="item.user.level" :src="'/static/image/icon/level/lv'+ item.user.level +'.png'"
											 mode="widthFix"></image>
											<view class="star-name" v-if="item.user.starname">{{item.user.starname}}</view>
										</view>
										<view style="color: #909090; font-size: 24rpx;">
											守护次数：<text style="color: #EF8392;">{{item.total_guardian_times || 0}}次</text>
										</view>

									</view>

								</block>
							</view>
							<view class="guardian-times" v-if="current==1 && index<=1">
								<view v-if="index==0">1314元奖金</view>
								<view v-if="index==1">520元奖金</view>
							</view>

						</view>
					</block>
				</view>
			</block>

		</view>

	</view>
</template>

<script>
	import btnComponent from '@/components/btnComponent.vue'
	export default {
		components: {
			btnComponent,
		},
		data() {
			return {
				sprite_level: 1,
				total_need_stone: 0,
				guardian_times: 0,
				current: 0,
				active_time: '',
				today_time_text: '',
				page: 1,
				list: [],
				guardianRankList: [],
				today_hour: '',
			};
		},
		onShow() {
			this.loadData()
		},
		onReachBottom() {
			if (this.current != 0) {
				this.page++
				this.getGuardianRank()
			}
		},
		methods: {
			switchAct(current) {
				this.page = 1
				this.current = current
				if (current != 0) {
					this.getGuardianRank()
				}else{
					this.loadData()
				}
			},
			guardianStar(index) {
				this.$app.modal(`确定守护该时间段吗`, () => {
					this.$app.request('active/guardian_star', {
						index: index
					}, res => {
						this.$app.toast('守护成功', 'success')
						this.loadData()
					}, 'POST', true)
				}, '确定')
				
			},
			loadData() {
				this.$app.request('active/guardian_info', {}, res => {
					this.sprite_level = res.data.sprite_level
					this.total_need_stone = res.data.total_need_stone
					this.guardian_times = res.data.guardian_times
					this.active_time = res.data.active_time
					this.today_time_text = res.data.today_time_text
					this.today_hour = res.data.today_hour

					this.list = res.data.list
				})
			},
			getGuardianRank() {
				this.$app.request('active/guardian_rank', {
					rank_type: this.current,
					page: this.page,
				}, res => {
			
					if (this.page == 1) {
						this.guardianRankList = res.data
					} else {
						this.guardianRankList = this.guardianRankList.concat(res.data)
					}
			
					this.$app.closeLoading(this)
				})
			}
		}
	}
</script>

<style lang="scss">
	.guardian-active-container {
		background-color: $text-color-10;

		.top-content {
			padding: 20upx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.avatar-wrapper {
				position: relative;
				display: flex;
				align-items: center;

				.avatar {
					position: relative;
					overflow: hidden;
					border-radius: 50%;
					width: 120upx;
					height: 120upx;
					z-index: 1;
				}

			}

			.top-text-wrapper {
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding-top: 10rpx;

				.star-name {
					font-size: 36upx;
					font-weight: 700;
					display: flex;
					align-items: center;
					color: $text-color-7;
				}

				.bottom {
					display: flex;
					align-items: center;
					font-size: 30upx;


				}
			}

		}

		.active-time {
			display: flex;
			align-items: center;
			justify-content: center;
			border-bottom: 2rpx solid $text-color-10;
			padding-bottom: 20rpx;
			font-size: 24rpx;

			view {
				padding: 5rpx 20rpx;
				border-radius: 40rpx;
				background-color: #FFFFFF;
				color: $text-color-8;
			}
		}
		
		.active-img{
			width: 100%;
		}

		.active-desc {
			padding: 20rpx 0;
			display: flex;
			flex-direction: column;
			border-bottom: 2rpx solid $text-color-10;

			.user-info {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				background-color: #FFFFFF;
				border-radius: 40rpx;
				padding: 10rpx 20rpx;

				.avatar {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
				}

				.nickname {
					padding: 0 20rpx;
					max-width: 150rpx;
				}
			}
		}

		.active-list-container {
			.tab-container {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;

				.tab {
					width: 100%;
					height: 80rpx;
					color: #FFFFFF;
					display: flex;
					align-items: center;

					.tab-item {
						width: 250rpx;
						padding: 15upx 0upx;
						margin: 0 20rpx;
						background: linear-gradient(0deg, rgba(208, 208, 208, 1) 0%, rgba(175, 175, 175, 1) 100%);
						box-shadow: 0 2upx 4upx rgba(#000, 0.3);
						justify-content: center;
						display: flex;
						font-size: 24upx;
						flex: 1;
						border-radius: 60rpx;
					}

					.tab-item.active {
						background: linear-gradient(90deg, rgba(254, 140, 175, 1), rgba(255, 120, 161, 1)) !important;
						text-align: center;
					}
				}

			}

			.active-list-desc {
				text-align: center;
				padding: 20rpx;
			}

			.list-wrapper {

				.item {
					display: flex;
					justify-content: space-around;
					align-items: center;
					padding: 10upx;
					background-color: #FFFFFF;
					margin: 15rpx 20rpx;
					border-radius: 60rpx;


					.left {
						padding: 10upx 0;
						font-size: 36rpx;
						line-height: 44upx;
						.time{
							color: $text-color-3;
						}
					}

					.right {
						display: flex;
						flex-direction: row;
						align-items: center;
						padding: 10rpx 20rpx;

						.avatar image {
							width: 80upx;
							height: 80upx;
							border-radius: 50%;
							border: 3rpx solid #EF8392;
						}

						.text-container {
							width: 220upx;
							padding: 0 30upx;
							line-height: 44upx;

							.nickname {
								max-width: 180rpx;
								color: $text-color-7;
							}

							.bottom-text {
								display: flex;
								align-items: center;
								font-size: 24rpx;
							}
						}
					}


				}

			}

			.rank-list {

				width: 100%;
				display: flex;
				flex-direction: column;
				background-color: #FFFFFF;

				.item {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					border-bottom: 1rpx solid $text-color-10;
					align-items: center;
					padding: 15rpx 20rpx;
					margin: 10rpx 0;
					border-radius: 30rpx;

					.item-info {
						display: flex;
						align-items: center;

						.rank-img {
							width: 40rpx;
							display: flex;
							justify-content: center;
						}

						.avatar-img {
							width: 80rpx;
							margin-left: 20rpx;

							image {
								width: 80rpx;
								height: 80rpx;
								border-radius: 50%;
								border: 3rpx solid #EF8392;
							}
						}

						.user-info {
							display: flex;
							flex-direction: row;
							align-items: center;

							.name {
								max-width: 300rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								font-size: 28rpx;

							}

							.star-name {
								font-size: 22rpx;
								color: #FFFFFF;
								background: #EF8392;
								border-radius: 20rpx;
								padding: 2rpx 10rpx;
							}
						}

					}

					.guardian-times {
						font-size: 24rpx;
						font-weight: bold;
						color: #EF8392;
						border: 4rpx solid #EF8392;
						border-radius: 40rpx;
						padding: 5rpx 10rpx;
						text-align: center;
					}

				}

			}
		}

	}
</style>

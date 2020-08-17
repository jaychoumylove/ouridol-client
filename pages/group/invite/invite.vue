<template>
	<view class="invite_new-container">
		<view class="top">
			<image class="top-img1" :src="invite_new_info.title_img?invite_new_info.title_img:'https://mmbiz.qpic.cn/mmbiz_png/CbJC0icY3EzbJr8mapPIWxKuKcJbWNsEWdawwzx3iaQ6ic98lPlR6GgswenIgrpscqGbhV2C1G7oicO9D3pmVK7RXQ/0'" mode="widthFix"></image>
			<view class="top-img2">
				<view class="text-wrap">
					<image src="/static/image/user/electricity.png" mode="widthFix"></image>
					<text>剩余时间</text>
				</view>
				<view class="countdown" v-if="my_remaining_time"><text>{{my_remaining_time.hour>=10?my_remaining_time.hour:'0'+my_remaining_time.hour}}</text>:<text>{{my_remaining_time.min>=10?my_remaining_time.min:'0'+my_remaining_time.min}}</text>:<text>{{my_remaining_time.sec>=10?my_remaining_time.sec:'0'+my_remaining_time.sec}}</text></view>
			</view>
		</view>
		<view class="content">
			<view class="schedule-help">
				<view class="get_help" @tap="$app.goPage('/pages/notice/notice?id='+invite_new_info.notice)">
					<text>拉新奖励</text>
					<image class="image_b5" src="/static/image/help-img.png" mode="widthFix"></image>
				</view>
				<view class="get_detail" @tap="$app.goPage('/pages/group/invite/invite_reward_log?type=reward')">
					<view style="padding-left: 10rpx;">领取记录</view>
				</view>
			</view>
			<view class="schedule">
				<view class="schedule-cont">
					<scroll-view scroll-x class="schedule-cont-scroll">
						<view class="schedule-list">
							<view class="dot finished" style="position: absolute; left: 0;"></view>

							<view class="item-box" v-for="(item,index) in invite_new_info.steps" :key="index">
								<view class="progress">
									<view class="progress-finished" :style="{width: item.precent+'%'}"></view>
								</view>
								<view class="dot" :class="{finished:item.precent==100}">
									<view class="name" @tap="invite_steps_reward(index)">
										<view class="reward">
											<image style="width: 100rpx;" v-if="index==0" src="/static/image/active/reward1.png" mode="widthFix"></image>
											<image style="width: 100rpx;" v-if="index==1" src="/static/image/active/reward2.png" mode="widthFix"></image>
											<image style="width: 100rpx;" v-if="index==2" src="/static/image/active/reward3.png" mode="widthFix"></image>
											<image style="width: 100rpx;" v-if="index==3" src="/static/image/active/reward4.png" mode="widthFix"></image>
										</view>
										<view class="reward-text">
											<btnComponent v-if="item.is_get" type="default">
												<view class="flex-set" style="width: 100upx;height: 35upx;">已领取</view>
											</btnComponent>
											<btnComponent v-else-if="!item.is_get && item.precent==100" type="success">
												<view class="flex-set" style="width: 100upx;height: 35upx;">待领取</view>
											</btnComponent>
											<btnComponent v-else type="disable">
												<view class="flex-set" style="width: 100upx;height: 35upx;">未完成</view>
											</btnComponent>
										</view>
										
										
									</view>
									
									<view class="value">{{item.invite_num}}</image></view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>

				<view class="schedule-invitenum">
					<view class="schedule-invitenum-today">
						今日电量:{{invite_new_info.my_invite_info.invite_energy?invite_new_info.my_invite_info.invite_energy:0}}
						<image style="width: 40rpx;" src="/static/image/user/electricity.png" mode="widthFix"></image>
					</view>
					<view class="schedule-invitenum-today">
						我的总电量:{{invite_new_info.my_invite_info.total_invite_energy?invite_new_info.my_invite_info.total_invite_energy:0}}
						<image style="width: 40rpx;" src="/static/image/user/electricity.png" mode="widthFix"></image>
					</view>
				</view>

				<view class="schedule-next-invitenum" v-if="invite_new_info">
					还差<text style="color: #FF9799;font-size: 32rpx;padding: 0 10rpx;">{{invite_new_info.my_next_invitenum-invite_new_info.my_invite_info.invite_energy>0?(invite_new_info.my_next_invitenum-invite_new_info.my_invite_info.invite_energy):0}}</text>电量,即可获得奖励
				</view>
			</view>
			<view class="notice">
				<view class="notice-cont">
					<swiper class="small" autoplay interval="3000" vertical="true" circular="true">
						<swiper-item class="swiper-item" v-for="(item,index) in getInviteReward" :key='index'>
							<view class="item">
								<image src="/static/image/guild/icon_gonggao.png" mode="widthFix"></image>
								<image class="avatar" style="width: 60rpx; border-radius: 50%;" :src="item.avatarurl" mode="widthFix"></image>
								<view class="item-text">
									恭喜<text style="padding: 0 10rpx;">{{item.nickname}}</text>获得
									<text style="padding: 0 10rpx;" v-if="item.reward.coin">能量:{{item.reward.coin}}</text>
									<text style="padding: 0 10rpx;" v-if="item.reward.stone">灵丹:{{item.reward.stone}}</text>
									<text style="padding: 0 10rpx;" v-if="item.reward.trumpet">喇叭:{{item.reward.trumpet}}</text>
									<text style="padding: 0 10rpx;" v-if="item.prop_text">{{item.prop_text}}</text>
								</view>
							</view>
						</swiper-item>
						<!-- <swiper-item class="swiper-item">
							<image src="/static/image/guild/icon_gonggao.png" mode="widthFix"></image>
							<view class="item-text">
								恭喜<text>哈哈哈</text>获得<text>嘿嘿嘿</text>
							</view>
						</swiper-item>
						<swiper-item class="swiper-item">
							<image src="/static/image/guild/icon_gonggao.png" mode="widthFix"></image>
							<view class="item-text">
								恭喜<text>哈滚滚滚哈哈</text>获得<text>嘿嘿斤斤计较嘿</text>
							</view>
						</swiper-item> -->
					
					</swiper>
				</view>
			</view>
			
		</view>

		<view class="invit-cont">
			<view class="list-wrapper">
				<view class="invit-title">
					<view class="get_help">
						<text>做任务得电量</text>
					</view>
					<view class="get_detail" @tap="$app.goPage('/pages/group/invite/invite_reward_log?type=user')">
						<view style="padding-left: 10rpx;">拉新记录</view>
					</view>
					
				</view>
				<view class="invit-list">
					<view class="invit-item">
						<view class="title flex-set">邀请新用户</view>
						<view class="num flex-set">
							<text style="padding-right: 10rpx;">+{{invite_new_info.my_invite_info.get_new_invite_energy||3}}</text>
							<image style="width: 40rpx;" src="/static/image/user/electricity.png" mode="widthFix"></image>
						</view>

						<view class="but flex-set">
							<btnComponent v-if="invite_new_info.my_invite_info.get_new_invite_energy==0" type="default">
								<button open-type="share">
									<view class="flex-set" style="width: 140upx;height: 60upx;">去拉新</view>
								</button>
							</btnComponent>
							<btnComponent v-else type="success" @tap="getInvitEnergy(1)">
								<view class="flex-set" style="width: 140upx;height: 60upx;">去领取</view>
							</btnComponent>
						</view>
					</view>
					<view class="invit-item">
						<view class="title flex-set">老用户回归</view>
						<view class="num flex-set">
							<text style="padding-right: 10rpx;">+{{invite_new_info.my_invite_info.get_old_invite_energy||1}}</text>
							<image style="width: 40rpx;" src="/static/image/user/electricity.png" mode="widthFix"></image>
						</view>
					
						<view class="but flex-set">
							<btnComponent v-if="invite_new_info.my_invite_info.get_old_invite_energy==0" type="default">
								<button open-type="share">
									<view class="flex-set" style="width: 140upx;height: 60upx;">去拉新</view>
								</button>
							</btnComponent>
							<btnComponent v-else type="success" @tap="getInvitEnergy(2)">
								<view class="flex-set" style="width: 140upx;height: 60upx;">去领取</view>
							</btnComponent>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="group-content">
			<view class="group-title">
				<view class="group-title-item" :class="{active:rank_type=='group'}" @tap="switchAct('group')">爱豆电量排行</view>
				<view class="group-title-item" :class="{active:rank_type=='world'}" @tap="switchAct('world')">世界电量排行</view>
			</view>
		</view>
		<view style="width: 100%; text-align: center; font-size: 24rpx;" v-if="rank_type=='group'">{{$app.getData('config').is_invite_active.end_time}}截止，根据排名发放奖励</view>
		<view class="rank-list">
			<view class="list">
				<block v-if="invitRankList.length>0" v-for="(item,index) in invitRankList" :key="index">
					<view class="item">
						<view class="item-info">
							<image class="rank-img" v-if="index==0" src="/static/image/guild/1.png"
							 mode="widthFix"></image>
							<image class="rank-img" v-else-if="index==1" src="/static/image/guild/2.png"
							 mode="widthFix"></image>
							<image class="rank-img" v-else-if="index==2" src="/static/image/guild/3.png"
							 mode="widthFix"></image>
							<view class="rank-img" v-else>{{index+1}}</view>
							<block v-if="rank_type=='group'">
								<view class="avatar-img">
									<image :src="item.star.head_img_s || $app.getData('AVATAR')" mode="aspectFill"></image>
								</view>
										
								<view style="margin-left: 20rpx;">
									<view class="name">{{item.star.name || '神秘爱豆'}}</view>
									<view style="color: #909090; font-size: 24rpx;">
										总电量:{{item.total_invite_energy || 0}}
										<image style="width: 40rpx; margin-left: 10rpx;" src="/static/image/user/electricity.png" mode="widthFix"></image>
									</view>
								</view>
								
							</block>
							<block v-if="rank_type=='world'">
								<view class="avatar-img">
									<image :src="item.user.avatarurl || $app.getData('AVATAR')" mode="aspectFill"></image>
								</view>
										
								<view style="margin-left: 20rpx;">
									<view class="user-info">
										<view class="name">{{item.user.nickname || '神秘粉丝'}}</view>
										<image style="width: 76rpx; margin: 0 10rpx;" :src="'/static/image/icon/level/lv'+ item.user.level +'.png'" mode="widthFix"></image>
										<view class="star-name" v-if="item.user.starname">{{item.user.starname}}</view>
									</view>
									<view>
										总电量：<text style="color: #EF8392;">{{item.total_invite_energy || 0}}</text>
										<image style="width: 40rpx; margin-left: 10rpx;" src="/static/image/user/electricity.png" mode="widthFix"></image>
									</view>
									
								</view>
								
							</block>
						</view>
						<view class="energy" v-if="rank_type=='group' && index<=1">
							<view v-if="index==0">1000元奖金</view>
							<view v-if="index==1">500元奖金</view>
						</view>
						
					</view>
				</block>
			</view>
		
		</view>

	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue'
	export default {
		components: {
			modalComponent,
			btnComponent,
		},
		data() {
			return {
				invite_new_info: '',
				invitFakePage: 1,
				hasInvitcount: 0,
				hasEarnCount: 0,
				invitRankList: [],
				my_remaining_time: 0,
				rankPage: 1,
				getInviteReward: this.$app.getInviteRewardQueue,
				rank_type:'group',
			};
		},
		onShow() {
			this.loadData();
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			console.log(e)
			return this.$app.commonShareAppMessage(shareType)
		},
		/**
		 * 上拉加载
		 */
		onReachBottom() {
			this.rankPage++;
			if(this.rankPage<=10){
				this.getInviteRank();
			}
		},
		methods: {
			switchAct(type) {
				this.rankPage = 1
				this.rank_type = type
				this.getInviteRank()
			},
			loadData() {
				this.$app.request(this.$app.API.INVITE_NEW_INFO, {}, res => {
					this.invite_new_info = res.data;
					this.addTimer(res.data.my_remaining_time);
					this.rankPage = 1
					this.getInviteRank();
				});
				
			},
			addTimer(my_remaining_time) { //倒计时
				let timeId = null;
				clearInterval(this.timeId)
				this.timeId = setInterval(() => {
					this.my_remaining_time = this.$app.timeGethms(--my_remaining_time)

					if (my_remaining_time <= 0) {
						clearInterval(this.timeId)
					}

				}, 1000)

			},
			invite_steps_reward(index) { //点击领取拉新额外奖励
				this.$app.request(this.$app.API.INVIT_STEPS_AWARD, {
					index: index
				}, res => {
					let text = '领取成功,';
					if (res.data.coin > 0) {
						text += '能量' + res.data.coin;
					}
					if (res.data.stone > 0) {
						text += ' 灵丹' + res.data.stone;
					}
					if (res.data.prop > 0) {
						text += res.data.prop_text + ' +1';
					}
					this.$app.toast(text)
					
					this.loadData();
				}, 'POST', true)
			},
			getInvitEnergy(type){
				this.$app.request(this.$app.API.INVIT_ENERGY, {
					type:type,
				}, res => {
				
					let text = '领取成功';
					if (res.data.energy > 0) {
						text += ',电量 +' + res.data.energy;
					}
					this.$app.toast(text)
					this.loadData();
				})
			},
			// 拉票
			getInviteRank() {
				this.$app.request(this.$app.API.INVIT_GROUP_INVITE_RANK, {
					rank_type:this.rank_type,
					page: this.rankPage,
				}, res => {

					if (this.rankPage == 1) {
						this.invitRankList = res.data
					} else {
						this.invitRankList = this.invitRankList.concat(res.data)
					}

					this.$app.closeLoading(this)
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.invite_new-container {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.image_b5 {
		width: 30rpx;
		margin-left: 10rpx;
		z-index: 99;
	}

	.top {
		width: 100%;
		padding: 20rpx;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.top-img1 {
			width: 100%;
			z-index: 1;
		}

		.top-img2 {
			width: 410rpx;
			height: 120rpx;
			background: url(https://mmbiz.qpic.cn/mmbiz_png/CbJC0icY3EzbJr8mapPIWxKuKcJbWNsEWsde1ErKIEhZ6oiaakmXkIZXkXf650ia2kMtwoG9rMMfWiaWblpOLicx5lA/0) center center/100% 100% no-repeat;
			margin-top: -60rpx;
			z-index: 2;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.text-wrap {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: center;
				padding: 0 0 5rpx 0;
				margin-top: -10rpx;

				image {
					width: 30rpx;
					z-index: 3;
				}

				text {
					padding-left: 10rpx;
					color: #747474;
					font-size: 22rpx;
					font-weight: bold;
				}
			}

			.countdown {
				color: #573014;
				font-size: 28rpx;
				font-weight: bold;

				text {
					padding: 0 5rpx;
					background-color: #FFD4D5;
					margin: 0 10rpx;
				}
			}
		}
	}

	.content {

		width: 100%;
		padding: 0rpx 20rpx;

		.schedule-help {
			padding: 10rpx 0;
			display: flex;
			justify-content: space-between;

			.get_help {
				font-size: 28rpx;
				font-weight: bold;
			}

			.get_detail {
				font-size: 24rpx;
				color: #FF9191;
				font-weight: bold;
				text-decoration: underline;
				display: flex;
				flex-direction: row;
				align-items: center;
				
			}
		}

		.schedule {
			background: #FFFFFF;
			box-shadow: 0px 10rpx 30rpx 0px rgba(255, 108, 121, 0.1);
			border-radius: 30rpx;
			border: 2px solid rgba(245, 224, 225, 1);
			padding: 10rpx 20rpx;
			display: flex;
			flex-direction: column;



			.schedule-invitenum {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.schedule-invitenum-today {
					display: flex;
					align-items: center;
					color: #909090;
					font-size: 24rpx;
					font-weight: bold;
				}

			}

			.schedule-next-invitenum {
				text-align: center;
				color: #909090;
				font-size: 24rpx;
				font-weight: bold;
				padding: 20rpx;
			}

			.schedule-cont {
				width: 100%;

				.schedule-cont-scroll {
					height: 260rpx;
				}

				.schedule-list {

					width: 100%;
					display: flex;
					align-items: center;
					padding: 50upx 20upx;
					margin-top: 160rpx;

					.dot {
						background-image: url(https://mmbiz.qpic.cn/mmbiz_png/CbJC0icY3EzbJr8mapPIWxKuKcJbWNsEW8KNCSdZCP7Hpe4yWQH4icGhRicKfBBPK4tK7iciajkNZHVS8vbMEWibibQnQ/0);
						background-size: 100% 100%;
						border-radius: 50%;
						width: 40upx;
						height: 40upx;
						z-index: 1;
						position: relative;

						.name {
							position: absolute;
							top: -160upx;
							left: 0;
							transform: translateX(-50%);
							font-size: 24upx;
							white-space: nowrap;
							.prop-img {
								width: 40rpx;
							}
							.reward{
								width: 100rpx;
								display: flex;
								flex-direction: column;
								align-items: center;
							}
							.reward-text{
								font-size: 22rpx;
								padding-top: 10rpx;
							}
						}

						.value {
							position: absolute;
							top: 5rpx;
							left: 50%;
							transform: translateX(-50%);
							font-size: 24upx;
							white-space: nowrap;
							color: #FFFFFF;
						}
					}

					.dot.finished {
						background-image: url(https://mmbiz.qpic.cn/mmbiz_png/CbJC0icY3EzbJr8mapPIWxKuKcJbWNsEWX5icyX9iaUpd1ZTVawu1d7ibUyP8BlVCjbOb01pRBggwiasFu7giboyibzQg/0) !important;
						background-size: 100% 100%;
					}

					.item-box {
						flex: 1;
						display: flex;
						align-items: center;

						.progress {
							margin: 0 -5upx;
							flex: 1;
							height: 20upx;
							background-color: #9a9899;

							.progress-finished {
								width: 0%;
								height: 100%;
								background-color: #66b8e1;
							}
						}
					}

				}

				.schedule-text {
					display: flex;
					align-items: center;
					justify-content: center;
					color: #541C21;
				}
			}

			.rule {
				background: rgba(252, 244, 245, 1);
				border-radius: 20rpx;
				border: 3rpx solid rgba(194, 155, 158, 1);
				padding: 20rpx;
			}
		}
		
		.notice {
			width: 100%;
			padding: 20rpx 0;
			display: flex;
			justify-content: center;
			.notice-cont{
				width: 600rpx;
				height: 70rpx;
				font-size: 22rpx;
				font-weight: bold;
				padding: 0rpx 15rpx;
				background: #FFFFFF;
				border-radius: 40rpx;
				overflow: hidden;
				image {
					width: 40rpx;
					margin: 5rpx 10rpx 0rpx 10rpx;
				}
				.swiper-item{
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: center;
					
					.item{
						width: 100%;
						height: 70rpx;
						display: flex;
						flex-direction: row;
						align-items: center;
						.item-text{
							width: 550rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							display: flex;
							flex-direction: row;
						}
						text {
							color: #F57FA3;
						}
					}
				}
			}
			
			
		}
	}

	.invit-cont {
		padding-top: 20rpx;
	
		.list-wrapper {
			overflow-y: auto;
			.invit-title{
				padding: 0 20rpx;
				display: flex;
				justify-content: space-between;
				
				.get_help {
					font-size: 28rpx;
					font-weight: bold;
				}
				
				.get_detail {
					font-size: 24rpx;
					color: #FF9191;
					font-weight: bold;
					text-decoration: underline;
					display: flex;
					flex-direction: row;
					align-items: center;
					
				}
			}
			
			.invit-list {
				padding: 0 20rpx;
	
				.invit-item {
					height: 100rpx;
					border-radius: 25rpx;
					background-color: #FFFFFF;
					border: 2rpx solid #F5E0E1;
					box-shadow: 0px 3px 3px #F5E0E1;
					display: flex;
					margin: 20rpx 0;
					padding: 0 40rpx;
					justify-content: space-between;
					align-items: center;
	
					.title {
						color: #541C21;
						font-size: 30rpx;
						font-weight: bold;
					}
	
					.num {
						display: flex;
						align-items: center;
						color: #FF9799;
						font-size: 24rpx;
	
						image {
							width: 30rpx;
							height: 30rpx;
							margin: 0 10rpx;
						}
	
					}
	
					.but {
						color: #C29B9E;
					}
	
					.buts {
						color: #F7B500;
					}
				}
			}
		}
	}
	
	.group-content {
		padding: 20rpx;

		.group-title {
			display: flex;
			flex-direction: row;

			.group-title-item {
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
			.group-title-item.active {
				background:linear-gradient(to right bottom, #FF3A8A 20%, #fa6c9f 82%, #ffe140 100%) !important;
				text-align: center;
				color: #FFFFFF;
			}
		}

		.group-top {
			padding-top: 20rpx;
			width: 100%;
			z-index: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.top-img1 {
				width: 100%;
				z-index: 1;
			}
			
			.total_coin{
				color: #FF9799;
				font-size: 34rpx;
				font-weight: bold;
				margin-top: -130rpx;
				z-index: 2;
			}

			.top-img2 {
				width: 420rpx;
				height: 100rpx;
				background: url(https://mmbiz.qpic.cn/mmbiz_png/CbJC0icY3EzbjrPQMia78VPbkz3u8Nehbpc9iaPOFibZ8lb8aM41ibfOPhWiaE0eqvRlgsXdHCbJnXXVz4WP9fIG9K7Q/0) center center/100% 100% no-repeat;
				margin-top: 50rpx;
				z-index: 2;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-weight: bold;
				letter-spacing: 4rpx;
				color: #FFFFFF;

			}
		}
	}

	.rank-list {
		width: 100%;
		padding: 0rpx 20rpx;
		margin-bottom: 20rpx;

		.list {
			width: 100%;
			display: flex;
			flex-direction: column;

			.item {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 15rpx 20rpx;
				background-color: #FFFFFF;
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
					.user-info{
						display: flex;
						flex-direction: row;
						align-items: center;
						.name {
							max-width: 300rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							font-size: 28rpx;
							color: #431618;
							font-weight: bold;
							
						}
						.star-name{
							font-size: 22rpx;
							color: #FFFFFF;
							background: #EF8392;
							border-radius: 20rpx;
							padding: 2rpx 10rpx;
						}
					}
					
				}

				.energy {
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

	.button {
		width: 100%;

		.get-times {
			width: 50%;
			float: left;
			padding: 30rpx 20rpx 0rpx 40rpx;
		}

		.share {
			width: 50%;
			float: left;
			padding: 30rpx 40rpx 0rpx 20rpx;
		}

	}
</style>

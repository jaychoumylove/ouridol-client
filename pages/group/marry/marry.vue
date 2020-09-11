<template>
	<view class="active-marry-container">
		<view class="top-container" v-if="top_img">
			<image class="top_img" :src="top_img" mode="widthFix"></image>
			<view class="rule" @tap="$app.goPage('/pages/notice/notice?id='+notice_id)">规则说明</view>
			<view class="top_cont">
				<view class="active-title flexcenter">秋日情书</view>
				<view class="active-time flexcenter" v-if="active_time">{{active_time.start_time_text || ''}}-{{active_time.end_time_text || ''}}</view>
				<view class="active-desc flexcenter">
					<view>组CP完成所有任务，解锁戒指及领能量双倍卡</view>
				</view>
			</view>
		</view>

		<view class="text-container flexcenter">
			<view class="text-color-7">CP贡献能量</view>
			<view class="text-color-3">{{marryInfo?marryInfo.count:0}}</view>
			<view class="text-color-7">完成结婚任务还差</view>
			<view class="text-color-3" v-if="marryInfo">{{list[1].need_coin-marryInfo.count>0?(list[1].need_coin-marryInfo.count):list[1].need_coin}}</view>
			<view class="text-color-3" v-else>{{list[1].need_coin}}</view>
		</view>
		
		<view class="marry-bottom">
			<view class="cp_list flexcenter" @tap="$app.goPage('/pages/group/marry/marry_list')">
				<btnComponent type="default">
					<view class="flex-set" style="width: 200upx;height: 60upx;">我的CP</view>
				</btnComponent>
			</view>
		</view>

		<view class="marry-info-container">
			<view class="marriage-cont">
				<view class="marriage">
					<image class="marriage_bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E9lB1uaR0AK0a1icXKrcZOndsGvwmLca9ViaeYczHNSyw9zcFyUlnHW2ibMLM8bwkiaFpCc2Ngpz6q3Q/0"
					 mode="widthFix"></image>
					<view class="cloud">
						<image class="cloud1" :class="{animation1:is_animation}" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E9lB1uaR0AK0a1icXKrcZOnanLQ123jKgM1CBoFeLiaTGRCv9yg7uX1aM44lnd1Ka3z8SiaIDJibSLGQ/0"
						 mode="widthFix"></image>
						<image class="cloud2" :class="{animation2:is_animation}" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E9lB1uaR0AK0a1icXKrcZOnanLQ123jKgM1CBoFeLiaTGRCv9yg7uX1aM44lnd1Ka3z8SiaIDJibSLGQ/0"
						 mode="widthFix"></image>
						<image class="cloud3" :class="{animation3:is_animation}" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E9lB1uaR0AK0a1icXKrcZOnanLQ123jKgM1CBoFeLiaTGRCv9yg7uX1aM44lnd1Ka3z8SiaIDJibSLGQ/0"
						 mode="widthFix"></image>
					</view>
				</view>
			</view>

			<view class="list-container">
				<view class="list">
					<view class="list-item" v-for="(item,index) in list" :key="index" v-if="index>0">
						<view class="left-cont">
							<view class="reward-bg flexcenter" v-if="index==1 || index==3 || index==5 || index==7" @tap="getReward(item.id)">
								<block v-if="item.status!=2">
									<view v-if="item.reward.coin">
										<image style="width: 30rpx;" src="/static/image/user/b1.png" mode="widthFix"></image>+{{item.reward.coin}}
									</view>
									<view v-if="item.reward.prop">
										<image class="avatarurl" :src="item.reward.prop_info.img" mode="widthFix"></image>
									</view>
									<view v-if="item.reward.ring">
										<image style="width: 70rpx;" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FkdUhHPgXyfkQlic4PyAIfcnqyeONpLgyQcnUgy5ItycTwWKd8Vc0wmb0KsB50rZkklof32EZzb6A/0" mode="widthFix"></image>
										<text style="font-size: 28rpx; font-weight: bold; display: flex;align-items: center;">+</text>
										<image class="avatarurl" :src="item.reward.ring" mode="widthFix"></image>
									</view>
								</block>
								<block v-if="item.status==2">
									已领取
								</block>
							</view>

							<view v-if="index==8" class="flexcenter" style="min-height: 100%;flex-direction: column;">
								<block v-if="marryInfo">
									<image class="avatarurl" :src="marryInfo.husband_info.avatarurl" mode="widthFix"></image>
									<view class="nickname text-overflow">{{marryInfo.husband_info.nickname}}</view>
								</block>
								<block v-else>
									<image class="avatarurl" :src="$app.getData('userInfo').avatarurl || $app.getData('AVATAR')" mode="widthFix"></image>
									<view class="nickname text-overflow">{{$app.getData('userInfo').nickname}}</view>
								</block>
							</view>
						</view>
						<view class="center-cont flexcenter">
							<block v-if="index!=8">
								<view style="flex-direction: row; display: flex; align-items: center; margin-top: 20rpx;" v-if="marryInfo && marryInfo.count>=item.need_coin">
									<block v-if="curId==item.id">
										<view class="marry_info_bg">
											<image class="avatarurl" style="margin-top: 13rpx; margin-left: 20rpx;" :src="marryInfo.husband_info.avatarurl"
											 mode="widthFix"></image>
										</view>
										<image style="width: 45rpx; margin: 0 10rpx;" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E9lB1uaR0AK0a1icXKrcZOnKItpibelh6myOywRtXRck5ZNPL8HickZcjxASk15rQ1UDjPQIbuHGA5g/0"
										 mode="widthFix"></image>
										<view class="marry_info_bg">
											<image class="avatarurl" style="margin-top: 13rpx; margin-left: 20rpx;" :src="marryInfo.wife_info.avatarurl"
											 mode="widthFix"></image>
										</view>
									</block>
									<block v-else>
										<view class="name">{{item.name}}</view>
									</block>
								</view>
								<view v-else>
									<view class="name">
										<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E9lB1uaR0AK0a1icXKrcZOnmGQKXVBvHDrBQw0fqibf2cqiaXnux9b4CrFUzkcm1f0NQD0FuVOeO06w/0"
										 mode="widthFix"></image>
										<text>{{item.name}}</text>
									</view>
									<view class="desc">贡献<text class="text-color-3">{{item.need_coin}}</text>能量解锁</view>
								</view>
							</block>
							<block v-else>
								<view class="name">{{item.name}}</view>
							</block>
						</view>
						<view class="right-cont">
							<view class="reward-bg flexcenter" v-if="index==2 || index==4 || index==6" @tap="getReward(item.id)">
								<block v-if="item.status!=2">
									<view v-if="item.reward.coin">
										<image style="width: 30rpx;" src="/static/image/user/b1.png" mode="widthFix"></image>+{{item.reward.coin}}
									</view>
									<view v-if="item.reward.prop">
										<image class="avatarurl" :src="item.reward.prop_info.img" mode="widthFix"></image>
									</view>
									<view v-if="item.reward.ring">
										<image class="avatarurl" :src="item.reward.ring" mode="widthFix"></image>
									</view>
								</block>
								<block v-if="item.status==2">
									已领取
								</block>
							</view>
							<view v-if="index==8" class="flexcenter" style="min-height: 100%;flex-direction: column;">
								<block v-if="marryInfo">
									<image class="avatarurl" :src="marryInfo.wife_info.avatarurl" mode="widthFix"></image>
									<view class="nickname text-overflow">{{marryInfo.wife_info.nickname}}</view>
								</block>
								<block v-else>
									<button open-type="share" data-share="13">
										<image class="avatarurl" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E9lB1uaR0AK0a1icXKrcZOnvRPOia0qJ634WWoRKBHiclxWr4cMIouSrIXpW5pUw8U2HCiaibZcRViaZtg/0"
										 mode="widthFix"></image>
										<view class="marry_apply flexcenter">求婚</view>
									</button>
								</block>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<modalComponent v-if="modal == 'tips'" title="提示" @closeModal="modal='';loadDate()">
		
			<view class="tips-modal-container">
				<view class="text-wrap">
					<view class="text">恭喜你，完成了结婚任务，成功组成CP</view>
					<view class="text">获得奖励：10张双倍领取能量卡+戒指一对</view>
					<view class="text">你与你的CP将获得一次解锁戒指的机会</view>
					<view class="text">戒指双方只能选择一个，一方选择双方拥有</view>
				</view>
				<view class="flex-set">
					<view class="btn" style="width: 240rpx;" @tap="$app.goPage('/pages/pet/dress_up/badge')">
						<btnComponent type="default">
							<view class="flex-set" style="width: 240upx;height: 80upx; font-size: 24rpx;">立即前往解锁</view>
						</btnComponent>
					</view>
				</view>
				
			</view>
		
		</modalComponent>

	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue';
	export default {
		components: {
			btnComponent,
			modalComponent,
		},
		data() {
			return {
				modal: '',
				list: [],
				marryInfo: [],
				top_img: '',
				active_time: {},
				is_animation: false,
				notice_id: '',
				curId: 1,
			};
		},
		onShow() {
			this.loadDate();
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			const otherparam = e.target && e.target.dataset.otherparam
			return this.$app.commonShareAppMessage(shareType, otherparam)
		},
		methods: {
			loadDate() {
				this.$app.request('active/get_marry_list', {}, res => {
					this.list = res.data.list;
					this.marryInfo = res.data.marryInfo;
					this.top_img = res.data.top_img;
					this.active_time = res.data.active_time;
					this.notice_id = res.data.notice_id;
					this.curId = res.data.curId;
					if(res.data.curId>=8){
						this.is_animation = true
					}
				})
			},
			getReward(id) {
				if(id==8){
					this.$app.modal('成功领取戒指你们将结婚，CP任务清空，请确认已领取其他奖励', () => {
						this.$app.request('active/get_marry_reward', {
							id: id
						}, res => {
							this.is_animation = true
							this.modal = 'tips'
							this.loadDate();
						})
					})
					
				}else{
					this.$app.request('active/get_marry_reward', {
						id: id
					}, res => {
						
						this.$app.toast('领取成功,对方也同时领取了');
						this.loadDate();
					})
				}
				
			},
		}
	}
</script>

<style lang="scss">
	.active-marry-container {
		min-height: 100%;
		background-color: $text-color-10;

		.avatarurl {
			width: 70rpx;
			border-radius: 50%;
			position: relative;
			z-index: 2;
		}
		.nickname{
			font-size: 22rpx;
			padding: 2rpx 10rpx;
			max-width: 180rpx;
			color: $text-color-3;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			position: relative;
			z-index: 3;
			margin-top: -10rpx;
		}

		.top-container {
			width: 100%;
			display: flex;
			position: relative;

			.top_img {
				width: 100%;
				position: relative;
				z-index: 1;
			}

			.rule {
				position: absolute;
				z-index: 3;
				right: 15rpx;
				top: 15rpx;
				color: $text-color-3;
				text-decoration: underline;
			}

			.top_cont {
				width: 100%;
				display: flex;
				flex-direction: column;
				position: absolute;
				z-index: 2;

				.active-title {
					color: $text-color-8;
					font-size: 32rpx;
					padding: 15rpx 0;
				}

				.active-time {
					color: $text-color-3;
					font-size: 32rpx;
					font-weight: bold;
				}

				.active-desc {
					padding-top: 15rpx;

					view {
						padding: 5rpx 20rpx;
						border-radius: 40rpx;
						background-color: #FFFFFF;
						color: #F6AFAF;
						font-size: 24rpx;
					}
				}
			}

		}

		.text-container {
			width: 220rpx;
			background-color: #FFFFFF;
			border-radius: 40rpx;
			flex-direction: column;
			padding: 10rpx 0;
			position: absolute;
			top: 200rpx;
			right: 20rpx;
			z-index: 2;

			view {
				font-size: 22rpx;
			}
		}

		.marry-info-container {
			width: 100%;
			padding: 20rpx 40rpx;
			display: flex;
			flex-direction: column;

			.marriage-cont {
				width: 100%;
				display: flex;
				justify-content: center;
				margin-bottom: -10rpx;

				.marriage {
					width: 30%;
					position: relative;

					.marriage_bg {
						width: 100%;
						position: relative;
					}

					.cloud {
						width: 100%;
						position: relative;
						top: -190rpx;

						.cloud1 {
							width: 120%;
							position: absolute;
							top: 15rpx;
						}

						.cloud2 {
							width: 120%;
							position: absolute;
							top: 80rpx;
							left: -50rpx;
						}

						.cloud3 {
							width: 120%;
							position: absolute;
							top: 60rpx;
							left: 50rpx;
						}

						.animation1 {
							animation: animation1 2s ease-in-out 1;
							animation-fill-mode: forwards;
						}

						.animation2 {
							animation: animation2 2s ease-in-out 1;
							animation-fill-mode: forwards;
						}

						.animation3 {
							animation: animation3 2s ease-in-out 1;
							animation-fill-mode: forwards;
						}

						@keyframes animation1 {

							0% {
								transform: translateX(0%);
							}

							100% {
								transform: translateX(-80%);
							}
						}

						@keyframes animation2 {

							0% {
								transform: translateX(0%);
							}

							100% {
								transform: translateX(-40%);
							}
						}

						@keyframes animation3 {

							0% {
								transform: translateX(0%);
							}

							100% {
								transform: translateX(30%);
							}
						}
					}

				}
			}

			.list-container {
				width: 100%;

				.list {
					width: 100%;
					display: flex;
					flex-direction: column;
					background-image: url(https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E9lB1uaR0AK0a1icXKrcZOnl35cxMwHwWPic6B4uYOgH4P7GaHh4UrGv8JADPuWMQrt7N4OtlqxBpw/0);
					background-size: 100%;
					justify-content: center;

					.list-item {
						width: 100%;
						height: 116rpx;
						display: flex;
						flex-direction: row;

						.reward-bg {
							width: 90rpx;
							height: 90rpx;
							background-image: url(https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E9lB1uaR0AK0a1icXKrcZOnXSXWRX9TicMkqKVE8hic8wriaxyqyKicKFmoybOJA2H0PGTljSxsmYy4lg/0);
							background-size: 100%;
							color: $text-color-3;
							font-size: 22rpx;

							view {
								display: flex;
								flex-direction: row;
							}
						}

						.left-cont {
							width: 20%;
							margin-top: 20rpx;
							padding-left: 15px;
						}

						.right-cont {
							width: 20%;
							margin-top: 20rpx;
							padding-left: 10px;

							image {
								position: relative;
								z-index: 1;
							}

							.marry_apply {
								width: 70rpx;
								height: 30rpx;
								background: linear-gradient(90deg, rgba(254, 140, 175, 1), rgba(255, 120, 161, 1));
								border-radius: 20rpx;
								margin-top: -15rpx;
								position: relative;
								z-index: 2;
								color: #FFFFFF;
								font-size: 20rpx;
							}
						}

						.center-cont {
							width: 60%;
							flex-direction: column;

							.marry_info_bg {
								width: 100rpx;
								height: 100rpx;
								background-image: url(https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E9lB1uaR0AK0a1icXKrcZOnq25fXCRPeybHG1d2XXqmVIoia2iay6p8lvp12Wn2kafBibDibibwzst99zA/0);
								background-size: 100%;
								display: flex;
								flex-direction: column;
								position: relative;
							}

							.name {
								display: flex;
								align-items: center;
								justify-content: center;
								font-size: 28rpx;
								color: #FFFFFF;
								padding: 10rpx;

								image {
									width: 30rpx;
									margin-right: 20rpx;
								}
							}

							.desc {
								background-color: rgba($color: #ffffff, $alpha: 0.4);
								padding: 5rpx 10rpx;
								border-radius: 30rpx;
								font-size: 20rpx;
								color: $text-color-2;
							}
						}
					}
				}

			}
		}
			
		.marry-bottom{
			position: absolute;
			top: 200rpx;
			left: 20rpx;
			padding-top: 20rpx;
			.cp_list {
				display: flex;
				flex: 1 0%;
			}
		}
		
		
		.tips-modal-container {
			height: 90%;
			padding: 20rpx 20rpx;
			font-size: 32rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
		
		
			.text-wrap {
				text-align: center;
				margin: 20upx;
		
				.title {
					font-size: 40upx;
					font-weight: 700;
					text-align: center;
					margin: 20upx;
				}
		
				.text {
					line-height: 1.7;
					font-size: 26rpx;
				}
		
				.avatar {
					width: 140upx;
					height: 140upx;
					border-radius: 50%;
					margin: 20upx;
				}
			}
		
			.btn {
				color: #FFF;
			}
		
		
		}
	}
</style>

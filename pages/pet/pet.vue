<template>
	<!-- http://wx1.sinaimg.cn/large/0060lm7Tly1g2ilx6fl3yg306b0a3abg.gif -->
	<!-- http://wx2.sinaimg.cn/large/0060lm7Tly1g2ilx6fjgwg306p0b6aci.gif -->
	<view class="container">
		<loadIconComponent v-if="requestCount>0" type='whole'></loadIconComponent>

		<view class="top-row-container">
			<view class="block">
				<image src="/static/image/user/b1.png" mode="widthFix"></image>
				{{userCurrency.coin}}
			</view>
			<view class="block">
				<image src="/static/image/user/b2.png" mode="widthFix"></image>
				{{userCurrency.stone}}
			</view>
			<view class="text-content">
				<text style="font-size: 36upx;">{{spriteInfo.earnPer}}</text>能量/100秒
			</view>
		</view>

		<view class="left-container">
			<btnComponent>
				<image @tap="getInvitList" src="/static/image/pet/add.png" mode="widthFix"></image>
			</btnComponent>
		</view>

		<!-- <view class="right-btn-container">
			<view class="btn-item">
				<image src="/static/image/pet/p1.png" mode="widthFix"></image>
			</view>
		</view> -->

		<view class="sprite" @tap="tapSprite">
			<view class="bounce-article">
				<view class="sprite-level position-set">
					<image src="/static/image/pet/fly.png" mode="widthFix"></image>
					<view class="text position-set">LV{{spriteInfo.sprite_level}}</view>
				</view>
				<image class="sprite-main" src="/static/image/pet/sprite.png" mode="widthFix"></image>
			</view>


			<view class="shadow"></view>

			<view class="progress flex-set" v-if="spriteInfo.need_stone">
				<view class="progress-bar" :style="{width:userCurrency.stone / spriteInfo.need_stone * 100 + '%'}"></view>
				{{userCurrency.stone}}/{{spriteInfo.need_stone}} {{userCurrency.stone>=spriteInfo.need_stone?'可升级！':''}}
			</view>
			<view class="progress flex-set" v-else>
				<view class="progress-bar" :style="{width:'100%'}"></view>
				已经是最高级了
			</view>
		</view>
		<view class="earn-container" @tap="settle">
			<image class="mountain" src="/static/image/pet/y2.png" mode="widthFix"></image>
			<view class="egg flex-set">
				<view class="num-wrapper position-set">{{spriteInfo.earn}}</view>
				<image class="flex-set" src="/static/image/pet/y5.png" mode="widthFix"></image>
				<view class="progress">
					<view class="progress-bar" :style="{width:earnCuttime + '%'}"></view>
					{{earnCuttime}}
				</view>
			</view>

		</view>

		<modalComponent v-if="modal == 'invit'" title="好友" @closeModal="modal=''">
			<view class="invit-modal-container">

				<scroll-view scroll-y class="list-wrapper">

					<view class="explain-wrapper">
						<view class="flex-set">
							<image src="/static/image/ic_haibao__bak.png" mode="widthFix"></image>
							加好友一起养精灵
						</view>
						<button class="btn" open-type="share">
							<btnComponent type="default">
								<view class="flex-set" style="width: 160upx; height: 80upx;">邀请好友</view>
							</btnComponent>
						</button>
					</view>
					<view class="item" v-for="(item,index) in invitList" :key="index">
						<view class="rank-num">
							<view>{{index+1}}</view>
						</view>
						<view class='avatar'>
							<image :src="item.avatar" mode="aspectFill"></image>
						</view>
						<view class="text-container">
							<view class="star-name">{{item.nickname}}</view>
							<view class="bottom-text">
								<view class="hot-count">{{item.week_count}}</view>
							</view>
						</view>

					</view>

				</scroll-view>
			</view>

		</modalComponent>
	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue'
	export default {
		components: {
			modalComponent,
			btnComponent
		},
		data() {
			return {
				requestCount: 1,

				userCurrency: {},
				spriteInfo: {},
				invitList: [],
				invitAward: '',
				modal: '',
				earnCuttime: 1,

			};
		},
		onShareAppMessage() {
			return this.$app.commonShareAppMessage()
		},
		onLoad() {
			this.getSpriteInfo()
			this.initInterval()
		},
		onShow() {
			// this.getSpriteInfo()
			this.userCurrency = this.$app.getData('userCurrency') || {
				coin: 0,
				stone: 0,
				trumpet: 0,
			}
		},
		methods: {
			initInterval() {
				clearInterval(this.$app.petTimeId)
				this.$app.petTimeId = setInterval(() => {
					this.earnCuttime++
					if (this.earnCuttime > 100) {
						this.earnCuttime = 1
						this.getSpriteInfo()
					}
				}, 1000)

			},
			tapSprite() {
				// 精灵升级
				if (this.spriteInfo.need_stone) {
					this.$app.request(this.$app.API.SPRITE_UPGRAGE, {}, res => {
						this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
							this.$app.setData('userCurrency', res.data)
							this.userCurrency = this.$app.getData('userCurrency')

						})
						this.getSpriteInfo()

						this.$app.toast('升级成功', 'success')

					}, 'POST', true)
				}

			},
			// 被邀请好友列表
			getInvitList() {
				this.modal = 'invit'
				this.$app.request(this.$app.API.USER_INVITLIST, {
					type: 1
				}, res => {
					this.invitAward = res.data.award
					const resList = []
					res.data.list.forEach((e, i) => {
						resList.push({
							avatar: e.user.avatarurl || this.$app.AVATAR,
							status: e.status,
							uid: e.ral_user_id,
							nickname: e.user.nickname,
							week_count: e.user.user_star.thisweek_count,
						})
					})
					this.invitList = resList
				})
			},
			//HTTP
			settle() {
				if (this.spriteInfo.earn == 0) {
					this.$app.toast('能量太少了，稍后再来吧')
				} else {
					this.$app.request(this.$app.API.SPRITE_SETTLE, {}, res => {
						this.getSpriteInfo()

						this.$app.toast('收集到能量:' + res.data)
						this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
							this.$app.setData('userCurrency', res.data)
							this.userCurrency = this.$app.getData('userCurrency')

						})
					}, 'POST', true)
				}

			},
			getSpriteInfo() {
				this.$app.request(this.$app.API.SPRITE_INFO, {}, res => {
					this.spriteInfo = res.data

					if (res.data.isFull) {
						this.$app.toast('能量已满了，快点收能量吧')
						clearInterval(this.$app.petTimeId)
						this.earnCuttime = 100
					} else {
						this.initInterval()
					}
					this.$app.closeLoading(this)
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 100%;
		overflow: hidden;
		position: relative;
		background: url(http://wx4.sinaimg.cn/large/0060lm7Tly1g2h7ro3ehvj30kv15pdig.jpg) center no-repeat/cover;


		.top-row-container {
			display: flex;
			align-items: center;
			justify-content: space-around;
			padding: 40upx 20upx;

			.block {
				display: flex;
				align-items: center;
				margin: 0 20upx;
				font-size: 22upx;
				color: #c5aaa0;

				image {
					width: 40upx;
					margin: 0 10upx;
				}

			}

			.text-content {
				margin: 0 20upx;

				font-size: 24upx;
				color: #aa877d;
			}
		}

		.left-container {
			position: absolute;
			left: 20upx;
			top: 50%;
			transform: translateY(-50%);

			image {
				width: 80upx;
			}
		}

		@keyframes bounce {

			0%,
			100% {
				transform: translateY(0%);
			}

			65% {
				transform: translateY(-10%);
			}
		}

		.sprite {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 5%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.bounce-article {
				animation: bounce 0.8s ease-in-out infinite;

			}

			.sprite-main {
				width: 230upx;
			}

			.sprite-level {
				top: -60upx;
				color: #FFF;
				font-size: 28upx;

				image {
					width: 160upx;
				}

				.text {
					top: 36upx;
				}
			}

			.shadow {
				height: 40upx;
				width: 140upx;
				height: 10upx;
				margin: auto;
				border-radius: 50%;
				background: #37a45b;
				box-shadow: 0 0 5upx #37a45b;
				animation: shadow 0.8s ease-in-out infinite;
			}

			.progress {
				height: 40upx;
				z-index: 1;
				margin-top: 20upx;
				width: 100%;
				border-radius: 20upx;
				color: #FFF;
				background-color: #97cee3;
				border: 4upx solid #68478e;
				font-size: 20upx;
				position: relative;
				overflow: hidden;

				.progress-bar {
					content: "";
					position: absolute;
					top: 0;
					left: 0;
					height: 100%;
					background-color: #c90186;
					z-index: -1;
				}

			}

			@keyframes shadow {

				0%,
				100% {
					transform: scaleX(1);
				}

				50% {
					transform: scaleX(0.9);
				}
			}
		}


		.earn-container {
			position: absolute;
			right: 0upx;
			bottom: 22%;

			.mountain {
				width: 230upx;
			}

			.egg {
				width: 90upx;
				position: absolute;
				top: 34upx;
				left: 90upx;
				flex-direction: column;

				.num-wrapper {
					z-index: 3;
					top: 32upx;
					font-size: 24upx;
					color: #FFF;
				}

				image {
					width: 60upx;
				}

				.progress {
					height: 30upx;
					z-index: 1;
					margin-top: -20upx;
					width: 100%;
					border-radius: 20upx;
					color: #FFF;
					background-color: #97cee3;
					border: 4upx solid #68478e;
					text-align: center;
					font-size: 20upx;
					line-height: 1;
					position: relative;
					overflow: hidden;

					.progress-bar {
						content: "";
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						height: 100%;
						background-color: #c90186;
						z-index: -1;
					}

					@keyframes progAnime {
						0% {
							transform: translateX(-100%);
						}

						100% {
							transform: translateX(0);
						}

					}
				}


			}

		}

		.invit-modal-container {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;

			.explain-wrapper {
				padding: 10upx 20upx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				image {
					width: 100upx;
					margin: 10upx 20upx;
				}
			}

			.list-wrapper {
				overflow-y: auto;
				height: 100%;

				.item {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					padding: 10upx 20upx;
					border-radius: 60upx;
					background-color: rgba(255, 255, 255, .3);
					margin: 10upx;

					.rank-num {
						width: 90upx;
						text-align: center;
					}

					.avatar {
						image {
							width: 90upx;
							height: 90upx;
							border-radius: 50%;
						}
					}



					.text-container {
						width: 300upx;
						padding: 0 30upx;
						line-height: 44upx;

						.bottom-text {
							display: flex;
							align-items: center;

							.hot-count {
								color: $color_2;
								margin-right: 4upx;
							}

							.icon-heart {
								width: 30upx;
								height: 30upx;
							}
						}
					}
				}
			}
		}

	}
</style>

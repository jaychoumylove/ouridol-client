<template>
	<view class="container">
		<view class="user-container">
			<image :src="userInfo.avatarurl" mode="widthFix"></image>
			<view class="nickname">
				{{userInfo.nickname}}
			</view>
		</view>

		<!-- <view class="left-container">
			<btnComponent>
				<image @tap="getInvitList" src="/static/image/pet/add.png" mode="widthFix"></image>
			</btnComponent>
		</view> -->

		<!-- <view class="right-btn-container">
			<view class="btn-item">
				<image src="/static/image/pet/p1.png" mode="widthFix"></image>
			</view>
		</view> -->

		<view class="sprite">
			<view class="bounce-article">
				<view class="sprite-level position-set">
					<image src="/static/image/pet/fly.png" mode="widthFix"></image>
					<view class="text position-set">LV{{spriteInfo.sprite_level}}</view>
				</view>
				<image class="sprite-main" src="/static/image/pet/sprite.png" mode="widthFix"></image>
			</view>


			<view class="shadow"></view>

			<!-- 	<view class="progress flex-set" v-if="spriteInfo.need_stone">
				<view class="progress-bar" :style="{width:userCurrency.stone / spriteInfo.need_stone * 100 + '%'}"></view>
				{{userCurrency.stone}}/{{spriteInfo.need_stone}} {{userCurrency.stone>=spriteInfo.need_stone?'可升级！':''}}
			</view>
			<view class="progress flex-set" v-else>
				<view class="progress-bar" :style="{width:'100%'}"></view>
				已经是最高级了
			</view> -->

			<!-- <view class="skill-container" :class="{show:skillShow}">
				
			</view> -->
		</view>

		<view class="earn-container" :class="{online:!off}" @tap="settle">
			<image class="mountain" src="/static/image/pet/y2.png" mode="widthFix"></image>
			<view class="egg flex-set">
				<view class="num-wrapper position-set">{{spriteInfo.earn}}</view>
				<image v-if="!off" class="flex-set" src="/static/image/pet/y5.png" mode="widthFix"></image>
				<image v-else class="flex-set" src="/static/image/pet/y5-off.png" mode="widthFix"></image>
				<!-- <view class="progress">
					<view class="progress-bar" :style="{width:earnCuttime + '%'}"></view>
					{{earnCuttime}}
				</view> -->
			</view>

			<view class="hand-wrap position-set" v-show="spriteInfo.earn >= 200 && !off">
				<image class='bubble flex-set' src="/static/image/pet/bubble.png" mode="widthFix"></image>
				<image class='hand' src="/static/image/pet/hand.png" mode="widthFix"></image>
			</view>

		</view>

		<!-- <modalComponent v-if="modal == 'invit'" title="好友" @closeModal="modal=''">
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

		</modalComponent> -->

		<modalComponent v-if="modal == 'tips_t'" title="提示" @closeModal="modal=''">
			<!-- this.$app.modal("好友已经很久没有打榜了\n提醒TA一起为偶像打榜\n") -->

			<view class="tips-modal-container-s">
				<view class="text-wrap">
					<image src="/static/image/user/blank.png" mode="widthFix"></image>
					<view class="text">好友已经很久没有打榜了</view>
					<view class="text">提醒TA一起为偶像打榜</view>
					<view class="text">才能帮TA收取能量</view>
				</view>
				<btnComponent type="css">
					<button open-type="share">
						<view class="flex-set" style="padding: 20upx 40upx;">唤醒好友</view>
					</button>
				</btnComponent>
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

				user_id: null,

				spriteInfo: {
					sprite_level: 0,
				},
				invitList: [],
				invitAward: '',
				modal: '',
				earnCuttime: 1, // 收益计时
				skillShow: false, // 显示技能
				off: false,
				userInfo: {
					nickname: this.$app.NICKNAME,

				},
			};
		},
		onShareAppMessage() {
			return this.$app.commonShareAppMessage()
		},
		onLoad(option) {
			this.user_id = option.user_id || 0

			if (option.off == 'true') {
				this.off = true
			}
			this.getSpriteInfo()
			this.getUserInfo()
		},

		methods: {
			//HTTP
			getUserInfo() {
				this.$app.request(this.$app.API.USER_INFO, {
					user_id: this.user_id
				}, res => {
					this.userInfo = res.data

					this.userInfo = {
						avatarurl: res.data['avatarurl'] || this.$app.AVATAR,
						nickname: res.data['nickname'] || this.$app.NICKNAME,
						id: res.data['id'] || null,
					}
				})
			},
			settle() {
				if (this.spriteInfo.earn < 200) {
					this.$app.toast('能量太少，请达到200能量再来帮TA收吧')
				} else if (this.off) {
					// 不能收
					this.modal = 'tips_t'
				} else {
					this.$app.request(this.$app.API.SPRITE_SETTLE, {
						user_id: this.user_id
					}, res => {

						this.getSpriteInfo()

						this.$app.toast('为TA收集能量，你获得:' + res.data + '能量')
						this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
							this.$app.setData('userCurrency', res.data)
						})
					}, 'POST', true)
				}
			},
			getSpriteInfo() {
				this.$app.request(this.$app.API.SPRITE_INFO, {
					user_id: this.user_id
				}, res => {
					this.spriteInfo = res.data

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
		background: url(http://tva1.sinaimg.cn/large/0060lm7Tly1g2h7ro3ehvj30kv15pdig.jpg) center no-repeat/cover;


		.user-container {
			position: absolute;
			height: 60upx;
			top: 40upx;
			left: 40upx;
			background-color: rgba(255, 255, 255, .3);
			display: flex;
			align-items: center;
			border-radius: 30upx;

			image {
				width: 60upx;
				border-radius: 50%;
				margin-right: 20upx;
			}

			.nickname {
				font-size: 32upx;
				margin-right: 30upx;
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

			@keyframes bounce {

				0%,
				100% {
					transform: translateY(0%);
				}

				65% {
					transform: translateY(-10%);
				}
			}

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

			@keyframes shadow {

				0%,
				100% {
					transform: scaleX(1);
				}

				50% {
					transform: scaleX(0.9);
				}
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



			.skill-container {
				width: 100upx;
				height: 100upx;
				background-color: red;
				transition: 0.3;
				transform: scale(0);
			}

			.skill-container.show {
				transform: scale(1);
			}
		}

		@keyframes shine {

			0%,
			100% {
				transform: scale(0.8);
			}

			50% {
				transform: scale(1);
			}
		}

		.earn-container.online::before {
			content: "";
			position: absolute;
			z-index: 1;
			width: 70upx;
			height: 90upx;
			top: 28upx;
			border-radius: 50%;
			left: 100upx;
			background-color: gold;
			filter: blur(10upx);
			animation: shine 1.5s linear infinite;
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
				z-index: 2;

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


			.hand-wrap {
				width: 100upx;
				top: -4upx;
				left: 134upx;
				z-index: 2;

				.bubble::before {
					content: "可收集";
					position: absolute;
					margin-top: -4upx;
					font-size: 24upx;
					font-weight: 700;
				}

				.hand {
					width: 80upx;
					position: absolute;
					right: -6upx;
					top: 20upx;
					animation: scale 1s linear infinite;
				}

				@keyframes scale {

					0%,
					100% {
						transform: scale(0.9);
					}

					50% {
						transform: scale(1.1);
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

		.tips-modal-container-s {
			height: 100%;
			padding: 20upx 40upx;
			font-size: 32upx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			flex-direction: column;

			.text-wrap {
				text-align: center;
				margin: 30upx;

				image {
					width: 120upx;
					height: 120upx;
					margin: 60upx;
				}

				.text {
					font-size: 32upx;
					font-weight: 700;

				}

			}


			.btn {
				margin: auto;
			}
		}

	}
</style>

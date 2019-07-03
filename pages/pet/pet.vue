<template>
	<view class="pet-container">
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
				<image @tap="openInvitModal" src="/static/image/pet/add.png" mode="widthFix"></image>
			</btnComponent>

			<view class="friend-wrapper">
				<image @tap="goOther(item)" v-for="(item,index) in invitList" :key="index" v-if="index<3" :src="item.avatar" mode="widthFix"></image>
			</view>
		</view>

		<view class="right-container">
			<btnComponent>
				<image src="/static/image/pet/help.png" mode="widthFix" @tap="$app.goPage('/pages/notice/notice?id=2')"></image>
			</btnComponent>
		</view>

		<!-- <view class="sprite-bubble">
			<image src="/static/image/bubble-1.png" mode="widthFix"></image>
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
				<image src="/static/image/user/b2.png" mode="widthFix" style="width: 30upx;"></image>
				{{userCurrency.stone}}/{{spriteInfo.need_stone}} {{userCurrency.stone>=spriteInfo.need_stone?'可升级！':''}}
			</view>
			<view class="progress flex-set" v-else>
				<view class="progress-bar" :style="{width:'100%'}"></view>
				已经是最高级了
			</view>
			<view class="bottom-tips" @tap="modal = 'tips'">如何获得灵丹升级</view>

			<view class="skill-container position-set" :class="{show:skillShow}">
				<btnComponent>
					<view class="skill-wrapper one" @tap="openSkillModal(1)">
						<image class="skill" src="/static/image/pet/skillone.png" mode="widthFix"></image>
						<!-- <view class="skill-level">{{spriteInfo.skillone_level}}</view> -->
					</view>
				</btnComponent>
			</view>
		</view>

		<view class="earn-container" @tap="settle">
			<image class="mountain" src="/static/image/pet/y2.png" mode="widthFix"></image>
			<view class="egg flex-set">
				<view class="num-wrapper position-set">{{spriteInfo.earn}}</view>
				<image class="flex-set" src="/static/image/pet/y5.png" mode="widthFix"></image>
				<view class="progress flex-set">
					<view class="progress-bar" :style="{width:earnCuttime + '%'}"></view>
					{{earnCuttime}}
				</view>
			</view>


			<view class="hand-wrap position-set" v-show="spriteInfo.earn">
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
						<button class="btn" open-type="share" data-share="1">
							<btnComponent type="default">
								<view class="flex-set" style="width: 160upx; height: 80upx;">邀请好友</view>
							</btnComponent>
						</button>
					</view>
					<block v-if="invitList.length > 0">

						<view class="item" v-for="(item,index) in invitList" :key="index" @tap="goOther(item.uid)">
							<view class="rank-num">
								<image v-if="index<3" :src="'/static/image/guild/'+(index+1)+'.png'" mode="widthFix"></image>
								<view v-else>{{index+1}}</view>
							</view>
							<view class='avatar'>
								<image :src="item.avatar" mode="aspectFill"></image>
							</view>
							<view class="text-container">
								<view class="star-name text-overflow">{{item.nickname}}</view>
							</view>
							<view class="egg flex-set">
								<view class="num-wrapper position-set">{{item.earn}}</view>
								<image class="flex-set" src="/static/image/pet/y5.png" mode="widthFix"></image>
							</view>
						</view>
					</block>
					<view v-else class="nodata flex-set" style="margin: 40upx 0;">
						帮好友收能量，自己也能获得额外能量奖励
					</view>
				</scroll-view>
			</view>

		</modalComponent> -->


		<modalComponent v-if="modal == 'invit'" title="好友" @closeModal="modal=''">
			<view class="invit-modal-container">

				<scroll-view scroll-y class="list-wrapper" @scrolltolower='invitListPage++; getInvitList()'>

					<!-- <view class="explain-wrapper">
						<view class="flex-set">
							<image src="/static/image/ic_haibao__bak.png" mode="widthFix"></image>
							加好友一起养精灵
						</view>
						<btnComponent type="default">
							<button class="btn" open-type="share" data-share="1">
								<view class="flex-set" style="width: 160upx; height: 80upx;">邀请好友</view>
							</button>
						</btnComponent>
					</view> -->
					<button class='explain-wrapper' open-type="share" data-share="1">
						<image style="width: 100%;" :src="$app.getData('config').zhuren_tips_img" mode="widthFix"></image>
					</button>

					<block v-if="invitList.length > 0">
						<view class="item" v-for="(item,index) in invitList" :key="index" @tap="goOther(item)">
							<view class="rank-num">
								<image v-if="index<3" :src="'/static/image/guild/'+(index+1)+'.png'" mode="widthFix"></image>
								<view v-else>{{index+1}}</view>
							</view>
							<view class='avatar'>
								<image :src="item.avatar" mode="aspectFill"></image>
							</view>
							<view class="text-container">
								<view class="star-name text-overflow">{{item.nickname}}</view>
							</view>
							<view class="egg flex-set" @tap.stop="settleSprite(index,item)">
								<image v-if="item.earn > 2 && !item.off" class='hand' src="/static/image/pet/hand.png" mode="widthFix"></image>

								<view class="num-wrapper position-set">{{item.earn}}</view>
								<image v-if="!item.off" class="flex-set" src="/static/image/pet/y5.png" mode="widthFix"></image>
								<image v-else class="flex-set" src="/static/image/pet/y5-off.png" mode="widthFix"></image>
							</view>
						</view>
					</block>

					<view v-else class="nodata flex-set">
						<view class="top">你还没有好友</view>
						<button open-type="share" data-share="1">
							<view class="bottom">加一位好友></view>
						</button>
					</view>

				</scroll-view>
			</view>

		</modalComponent>
		<modalComponent v-if="modal == 'skill'" :title="modalTitle" @closeModal="modal=''">
			<view class="skill-modal-container">

				<scroll-view scroll-y class="list-wrapper">
					<view class="item" v-for="(item,index) in skillList" :key="index">
						<!-- <view class="rank-num">
							<view>Lv{{item.level}}</view>
						</view> -->
						<view class='avatar'>
							<image :src="item.avatar" mode="aspectFill"></image>
							<view class="badge flex-set">{{item.level}}</view>
						</view>
						<view class="text-container">
							<view class="star-name">{{item.desc}}</view>
							<view class="bottom">{{item.need_stone}}</view>
						</view>
						<btnComponent type="default" v-if="item.status != 1">
							<view class="flex-set" style="width: 130upx;height: 65upx;" @tap="skillUpgrade">升级</view>
						</btnComponent>
					</view>

				</scroll-view>
			</view>
		</modalComponent>

		<modalComponent v-if="modal == 'tips'" title="提示" @closeModal="modal=''">
			<view class="tips-modal-container">
				<view class="text-wrap">

					<view class="text" style="font-size: 40upx;font-weight: 700;text-align: center;">如何获得灵丹</view>
					<view class="text">1.做任务可以获得灵丹</view>
					<view class="text">2.邀请好友加入偶像圈可以获得灵丹</view>
					<view class="text">3.补充能量可以获得灵丹</view>
					<view class="text">更多获取方式快去任务界面查看吧</view>
				</view>
				<view class="btn" @tap="$app.goPage('/pages/subPages/task/task')">
					<btnComponent type="default">
						<view class="flex-set" style="width: 200upx;height: 100upx;">去做任务</view>
					</btnComponent>
				</view>
			</view>

		</modalComponent>

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
	import listItemComponent from '@/components/listItemComponent.vue'
	export default {
		components: {
			modalComponent,
			btnComponent,
			listItemComponent
		},
		data() {
			return {
				requestCount: 1,
				invitListPage: 1,

				userCurrency: this.$app.getData('userCurrency') || {
					coin: 0,
					stone: 0,
					trumpet: 0,
				},
				spriteInfo: this.$app.getData('pet_spriteInfo') || {
					sprite_level: 0,
					earnPer: 0,
				},
				invitList: [],
				invitAward: '',
				modal: '',
				modalTitle: '',
				earnCuttime: 1, // 收益计时
				skillShow: false, // 显示技能
				skillList: [], // 技能升级列表
				currentSkillType: 1,
			};
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		onLoad() {
			uni.hideTabBarRedDot({
				index: 1
			})
		},
		onShow() {
			this.getSpriteInfo()

			this.initInterval()
			this.getInvitList()
			this.userCurrency = this.$app.getData('userCurrency') || {
				coin: 0,
				stone: 0,
				trumpet: 0,
			}
		},
		methods: {
			/**
			 * 收益计时器
			 */
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
				if (this.spriteInfo.need_stone && this.userCurrency.stone >= this.spriteInfo.need_stone) {
					// 精灵升级
					this.$app.request(this.$app.API.SPRITE_UPGRAGE, {}, res => {
						this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
							this.$app.setData('userCurrency', res.data)
							this.userCurrency = this.$app.getData('userCurrency')

						})
						this.getSpriteInfo()

						this.$app.toast('升级成功', 'success')

					}, 'POST', true)
				} else {
					// 显示技能
					// this.skillShow = !this.skillShow
				}

			},
			openSkillModal(type) {
				this.modal = 'skill'
				this.currentSkillType = type
				this.getSkill()
			},
			openInvitModal() {
				this.modal = 'invit'
				this.invitListPage = 1
				this.getInvitList()
			},
			/**精灵技能升级*/
			skillUpgrade() {
				this.modal = ''
				this.$app.request(this.$app.API.SPRITE_UPGRAGE, {
					type: this.currentSkillType
				}, res => {
					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						this.$app.setData('userCurrency', res.data)
						this.userCurrency = this.$app.getData('userCurrency')
					})
					this.getSpriteInfo()

					this.$app.toast('升级成功', 'success')
				})
			},
			getSkill() {
				this.$app.request(this.$app.API.SPRITE_SKILL, {
					type: this.currentSkillType
				}, res => {
					const resList = []
					if (this.currentSkillType == 1) {
						// 技能一
						this.modalTitle = '助人为乐'
						for (let v of res.data) {
							const item = {
								level: v.level,
								desc: '对方' + v.percent + '%能量的奖励',
								need_stone: '升级需要消耗' + v.need_stone + '灵丹',
								avatar: '/static/image/pet/skillone-n.png'
							}
							if (v.level <= this.spriteInfo.skillone_level) {
								item.status = 1
							}
							resList.push(item)
						}
					}
					this.skillList = resList

				})
			},
			// 被邀请好友列表
			// 			getInvitList() {
			// 
			// 				this.$app.request(this.$app.API.USER_INVITLIST, {
			// 					type: 1
			// 				}, res => {
			// 					this.invitAward = res.data.award
			// 					const resList = []
			// 					res.data.list.forEach((e, i) => {
			// 						resList.push({
			// 							avatar: e.user && e.user.avatarurl || this.$app.AVATAR,
			// 							status: e.status,
			// 							uid: e.user && e.user.id || 0,
			// 							nickname: e.user && e.user.nickname || this.$app.NICKNAME,
			// 							earn: e.sprite.earn,
			// 						})
			// 					})
			// 					this.invitList = resList
			// 				})
			// 			},
			settleSprite(index, item) {
				if (item.earn < 2) {
					this.$app.toast('TA的能量太少了，稍后再来吧')
				} else if (item.off) {
					// 不能收
					this.modal = 'tips_t'

				} else {
					this.$app.request(this.$app.API.SPRITE_SETTLE, {
						user_id: item.uid
					}, res => {
						this.invitList[index].earn = 0

						this.$app.toast('为TA收集能量，你获得:' + res.data + '能量')
						this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
							this.$app.setData('userCurrency', res.data)
						})
					}, 'POST', true)
				}
			},
			getInvitList() {
				this.$app.request(this.$app.API.USER_INVITLIST, {
					type: 1,
					page: this.invitListPage || 1
				}, res => {

					this.invitAward = res.data.award
					const resList = []
					this.spriteEarn = false
					res.data.list.forEach((e, i) => {
						resList.push({
							avatar: e.user && e.user.avatarurl || this.$app.AVATAR,
							status: e.status,
							uid: e.user && e.user.id || 0,
							nickname: e.user && e.user.nickname || this.$app.NICKNAME,
							earn: e.sprite.earn,
							off: e.off,
						})

						if (e.sprite.earn >= 100) {
							// 显示红点
							this.spriteEarn = true
						}
					})
					if (this.invitListPage == 1) {
						this.invitList = resList
					} else {
						this.invitList = this.invitList.concat(resList)
					}


					this.$app.closeLoading(this)
				})
			},
			goOther(item) {
				this.modal = ''
				this.$app.goPage('/pages/subPages/pet/other/other?user_id=' + item.uid + '&off=' + item.off)
			},
			//HTTP
			settle() {
				if (this.spriteInfo.earn == 0) {
					this.$app.toast('能量太少了，稍后再来吧')
				} else {
					this.$app.request(this.$app.API.SPRITE_SETTLE, {
						user_id: this.$app.getData('userInfo').id,
						settle: this.spriteInfo.earn
					}, res => {
						this.getSpriteInfo()

						this.$app.toast('收集成功,能量+' + res.data)
						this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
							this.$app.setData('userCurrency', res.data)
							this.userCurrency = this.$app.getData('userCurrency')
						})
						this.earnCuttime = 0

						this.initInterval()
					}, 'POST', true)
				}

			},
			getSpriteInfo() {
				this.$app.request(this.$app.API.SPRITE_INFO, {
					user_id: this.$app.getData('userInfo').id
				}, res => {
					this.spriteInfo = res.data

					if (res.data.isFull) {
						this.$app.toast('能量已满了，快点收能量吧')
						clearInterval(this.$app.petTimeId)
						this.earnCuttime = 100
					} else {
						this.initInterval()
					}

					this.$app.setData('pet_spriteInfo', this.spriteInfo)
					this.$app.closeLoading(this)
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.pet-container {
		height: 100%;
		background: url(http://tva1.sinaimg.cn/large/0060lm7Tly1g41l8g35szj30kv15pdig.jpg) center no-repeat/cover;

		.top-row-container {
			display: flex;
			align-items: center;
			justify-content: space-around;
			padding: 40upx 20upx;
			color: #aa877d;

			.block {
				display: flex;
				align-items: center;
				margin: 0 20upx;
				font-size: 36upx;

				image {
					width: 40upx;
					margin: 0 10upx;
				}

			}

			.text-content {
				margin: 0 20upx;

				font-size: 24upx;
			}
		}

		.left-container {
			position: absolute;
			left: 20upx;
			top: 30%;

			image {
				width: 80upx;
			}

			.friend-wrapper {
				margin-top: 10upx;
				background-color: rgba(255, 255, 255, .5);
				border-radius: 20upx;
				width: 80upx;
				height: 240upx;
				display: flex;
				justify-content: flex-start;
				flex-direction: column;
				align-items: center;

				image {
					width: 60upx;
					margin: 10upx 0;
					border-radius: 50%;
				}
			}
		}

		.right-container {
			position: absolute;
			right: 20upx;
			top: 50%;
			transform: translateY(-50%);

			image {
				width: 80upx;
			}
		}

		.sprite-bubble {
			width: 400upx;
			height: 300upx;
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

			.bottom-tips {
				margin-top: 10upx;
				font-size: 28upx;
				letter-spacing: 4upx;
				border-bottom: 2upx solid $color_1;

			}

			.skill-container {
				width: 500upx;
				height: 500upx;
				transition: .3s;

				transform: translate(-50%, -50%) scale(0);

				.skill-wrapper {
					position: absolute;
					top: 10upx;
					left: 10upx;

					image {
						width: 100upx;
					}

					.skill-level {
						position: absolute;
						right: 0upx;
						bottom: 0upx;
					}
				}
			}

			.skill-container.show {
				transform: translate(-50%, -50%) scale(1);
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

		.earn-container::before {
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
			position: absolute;

			display: flex;
			flex-direction: column;

			.explain-wrapper {
				display: flex;
				justify-content: space-between;
				align-items: center;

				// image {
				// 	width: 50upx;
				// 	margin: 10upx 40upx;
				// }
			}

			.list-wrapper {
				overflow-y: auto;
				height: 100%;
				display: flex;
				flex-direction: column;

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

						image {
							width: 40upx;
							min-height: 40upx;
						}
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

					.egg {
						margin-right: 20upx;
						position: relative;

						.hand {
							position: absolute;
							z-index: 2;
							right: -15upx;
							bottom: -15upx;
						}

						.num-wrapper {
							z-index: 1;
							color: #FFF;
						}

						image {
							width: 60upx;
							min-height: 60upx;
						}
					}
				}

				.nodata {
					height: 400upx;
					flex-direction: column;

					.bottom {
						color: $color_2;
						font-size: 40upx;
					}
				}
			}

		}

		.skill-modal-container {
			width: 100%;
			height: 100%;
			position: absolute;
			display: flex;
			flex-direction: column;

			.list-wrapper {
				overflow-y: auto;
				height: 100%;

				.item {
					display: flex;
					// justify-content: start;
					align-items: center;
					padding: 10upx 20upx;
					border-radius: 60upx;
					background-color: rgba(255, 255, 255, .3);
					margin: 10upx;

					.rank-num {
						width: 80upx;
						text-align: center;
					}

					.avatar {
						position: relative;

						image {
							width: 90upx;
							height: 90upx;
						}

						.badge {
							position: absolute;
							right: -4upx;
							bottom: 4upx;
							width: 30upx;
							height: 30upx;
							font-size: 20upx;
							color: #FFF;
							background-color: #F00;
							border: 1px solid #FFF;
							border-radius: 50%;
						}
					}

					.text-container {
						width: 350upx;
						padding: 0 20upx;
						font-size: 26upx;

						.bottom {
							display: flex;
							align-items: center;
							font-size: 22upx;
							color: #888;
						}
					}


				}
			}
		}


		.tips-modal-container {
			height: 100%;
			padding: 20upx 40upx;
			font-size: 32upx;
			
			.text-wrap {
				
				.text {
					
					line-height: 2.3;
					
				}
				margin: 30upx 0;

			}


			.btn {
				width: 200upx;
				margin: auto;
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
				margin:100upx auto;
			}
		}
		
		
	}
</style>

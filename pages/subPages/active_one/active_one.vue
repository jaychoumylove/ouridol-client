<template>
	<view class="active_one-container">

		<view class="top-container">
			<view class="top-btn-wrap">
				<button open-type="share" data-share='4'>
					<view class="btn">
						分享
					</view>
				</button>
				<view class="btn" @tap="$app.goPage('/pages/subPages/fanclub/fanclub?starname='+star.name)">
					后援会
				</view>
			</view>
			<image class="avatar" :src="star.avatar" mode="aspectFill"></image>
			<view class="nickname">{{star.name}}</view>
		</view>

		<view class="cardday">
			你已累计打卡<text>{{activeInfo.my_card_days}}</text>天
		</view>
		<view class="active-center-container">
			<view class="top-wrap">
				<view class="left">
					<view class="left-1">为爱解锁</view>
					<view class="left-2">剩余：{{activeInfo.left_time}}</view>
				</view>

				<view v-if="activeInfo.can_card" class="right" @tap="card()">
					<image src="/static/image/guild/card.png" mode=""></image>
					<view class="text">
						<view class="t">打卡</view>
						<view class="t" style="font-size: 24upx;">{{activeInfo.my_card_days}}/7天</view>
					</view>
				</view>
				<view v-else class="right" @tap="card()">
					<image src="/static/image/guild/card-c.png" mode=""></image>
					<view class="text">
						<view class="t">已打卡</view>
						<view class="t" style="font-size: 24upx;">{{activeInfo.my_card_days}}/7天</view>
					</view>
				</view>
			</view>

			<view class="progress-wrap">
				<view class="progress">
					<progress activeColor="#007EFF" stroke-width="15" backgroundColor="#f8c4be" :percent="activeInfo.join_people/activeInfo.active_info.target_people*100" />
					<text style="background-color:#007EFF;">{{(activeInfo.join_people/activeInfo.active_info.target_people*100).toFixed(1)}}%</text>
				</view>
				<view class="progress" style="color:#ff0000;">
					<progress activeColor="#ff0000" stroke-width="15" backgroundColor="#f8c4be" :percent="activeInfo.complete_people/activeInfo.active_info.target_people*100" />
					<text style="background-color:#ff0000;">{{(activeInfo.complete_people/activeInfo.active_info.target_people*100).toFixed(1)}}%</text>
				</view>
				<view class="bottom-text">
					<view>已参与人数：<text style="color:#007EFF;">{{activeInfo.join_people}}</text></view>
					<view>已完成人数：<text style="color:#ff0000;">{{activeInfo.complete_people}}</text></view>
					<view>目标人数：<text style="color:#ff5cf7;">{{activeInfo.active_info.target_people}}</text></view>
				</view>

			</view>

			<view class="notice-container">
				<view class="article-name">为爱解锁活动说明</view>

				<block v-for="(item,index) in article" :key="index">
					<view class="article-group">
						<view class="article-title" v-if="item.title">{{item.title}}</view>
						<text class="article-content" decode v-if="item.content.length>0" v-for="(item1,index1) in item.content" :key="index1">{{item1}}</text>
					</view>
				</block>
			</view>
		</view>

		<view class="rank-list-container">
			<view class="title">粉丝应援榜</view>
			<view class='scroll-view'>

				<view class='item-wrap' v-for="(item,index) in userRank" :key="index">
					<image class='avatar' :src="item.user.avatarurl" mode="aspectFill"></image>
					<view class="text-wrap">
						<view class="name">{{item.user.nickname}}</view>
						<view class="card">累计打卡天数：{{item.active_card_days}}天</view>
						<!-- <view class="progress">
							<progress activeColor="#007EFF" backgroundColor="#f8c4be" :percent="item.active_card_days/activeInfo.active_info.total_days*100" />
						</view> -->
					</view>

					<view class="rank flex-set">{{index+1}}</view>
				</view>
				<view class="item-wrap flex-set" v-if="userRank.length == 0">
					还没有人来打卡
				</view>
			</view>
		</view>

		<modalComponent v-if="modal == 'cardOver'" title="提示" @closeModal="modal=''">
			<view class="modal-container flex-set">
				<image class="complete" src="/static/image/guild/card-c.png" mode=""></image>
				<view class="title">
					{{cardOverContent}}
				</view>

				<view class="text">距{{star.name}}福利解锁还差
					{{activeInfo.active_info.target_people-activeInfo.complete_people>=0?activeInfo.active_info.target_people-activeInfo.complete_people:0}}人</view>

				<btnComponent type='css'>
					<button open-type="share" data-share='4'>
						<view class="bottom flex-set" style="height: 100upx;width: 400upx;">召集好友\n一起解锁福利</view>
					</button>
				</btnComponent>
				<!-- <btnComponent type='default'>
						<view class="bottom flex-set" style="height: 100upx;width: 300upx;">去为{{$app.getData('userStar').name}}打榜</view>
				</btnComponent> -->
			</view>
		</modalComponent>
	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue';
	export default {
		components: {
			modalComponent,
			btnComponent
		},
		data() {
			return {
				star: {},
				activeInfo: {
					active_info: {
						target_people: 2000
					},
					can_card: true,
					complete_people: 0,
					join_people: 0,
					left_time: '0天0小时0分',
					my_card_days: 0,
				},
				userRank: [],
				modal: '',
				cardOverContent: '',
				article: this.$app.getData('config').active_notice,

			};
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		onLoad(option) {

			this.starid = option.starid
			this.getActiveInfo()
			this.getStarInfo()
			this.getActiveUserRank()
		},
		methods: {
			getStarInfo() {
				this.$app.request(this.$app.API.STAR_INFO, {
					starid: this.starid
				}, res => {
					const star = res.data
					this.star = {
						id: star.id,
						avatar: star.head_img_s ? star.head_img_s : star.head_img_l,
						name: star.name,
						weekHot: this.$app.formatNumberRgx(star.star_rank.week_hot),
						weekRank: star.star_rank.week_hot_rank,
					}

					this.$app.closeLoading(this)
				})
			},
			card() {
				if (this.$app.getData('userStar').id == this.starid) {

					this.modal = 'cardOver'
					if (this.activeInfo.can_card) {
						this.$app.request(this.$app.API.EXT_ACTIVECARD, {}, res => {
							this.getActiveInfo()
							this.getActiveUserRank()
							this.cardOverContent = '打卡成功'
						}, 'POST', true)
					} else {
						this.cardOverContent = '今日已打卡'
					}

				} else {
					this.$app.toast('你怎么能为别的爱豆打卡呢')
				}

			},

			getActiveUserRank() {
				this.$app.request(this.$app.API.EXT_ACTIVE_USERRANK, {
					starid: this.starid
				}, res => {

					const resList = []

					for (let v of res.data) {
						if (v.user.nickname) {
							resList.push({
								active_card_days: v.active_card_days,
								user: v.user,
							})
						}
					}
					
					this.userRank = resList

				})
			},
			getActiveInfo() {
				this.$app.request(this.$app.API.EXT_ACTIVEINFO, {
					starid: this.starid
				}, res => {
					let left_time = this.$app.timeGethms(res.data.active_info.end_date - Math.round(new Date().getTime() / 1000))

					res.data.left_time = left_time.day + '天' + left_time.hour + '小时' + left_time.min + '分'
					this.activeInfo = res.data

					// if (this.activeInfo.my_card_days > 7) {
					// 	this.cardOverContent = `打卡成功，已成功为爱豆助力解锁福利。`
					// } else {
					// 	this.cardOverContent = `打卡成功，打卡进度${this.activeInfo.my_card_days}/7天，请继续保持。`
					// }
				})
			},
		}
	}
</script>

<style lang="scss" scoped="">
	.active_one-container {
		padding: 20upx;

		.top-container {
			display: flex;
			flex-direction: column;
			align-items: center;

			.top-btn-wrap {
				display: flex;
				width: 100%;
				justify-content: space-between;
				padding: 0 10upx;

				.btn {
					font-size: 32upx;
					font-weight: 700;
				}
			}

			.avatar {
				border: 4upx solid $color_1;
				border-radius: 50%;
				overflow: hidden;
				width: 120upx;
				height: 120upx;
			}

			.nickname {
				font-size: 32upx;
				font-weight: 700;
			}
		}

		.cardday {
			text-align: center;
			margin: 20upx;

			text {
				background-color: $color_1;
				border-radius: 10upx;
				color: #FFF;
				width: 40upx;
				display: inline-block;
				margin: 0 2upx;
			}
		}

		.active-center-container {
			border-radius: 30upx;
			overflow: hidden;

			.top-wrap {
				background-color: #c0ebe9;
				height: 90upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #007EFF;

				.left {
					display: flex;
					align-items: center;

					.left-1 {
						border-right: 2upx solid #fff;
						padding-left: 40upx;
						padding-right: 20upx;
						font-weight: 700;
					}

					.left-2 {
						padding: 20upx;
						font-size: 24upx;
					}
				}

				.right {
					color: $color_1;
					background-color: #ffd1b2;
					display: flex;
					align-items: center;

					border-top-left-radius: 50upx;
					border-bottom-left-radius: 50upx;

					image {
						height: 90upx;
						width: 90upx;
					}

					.text {
						padding: 0 20upx;
						text-align: center;
					}
				}
			}

			.progress-wrap {
				padding: 30upx;
				background-color: #F5EBE6;

				.progress {
					margin: 14upx 0;
					display: flex;
					align-items: center;

					progress {
						width: 100%;
						border-radius: 60upx;
						overflow: hidden;
						margin-right: 20upx;
					}

					text {
						border-radius: 30upx;
						padding: 0 20upx;
						color: #FFF;
						width: 120upx;
						text-align: center;
					}
				}

				.bottom-text {
					display: flex;
					justify-content: space-between;
				}
			}

			.notice-container {
				color: #FFF;
				background-color: #f1b3b0;
				padding: 10upx 20upx;

				.article-name {
					text-align: center;
					font-size: 32upx;
					font-weight: 700;
					text-shadow: 0 4upx 6upx rgba(#000, 0.3);
					padding: 5upx 10upx;

				}

				.article-group {
					display: flex;
					align-items: baseline;
					padding: 5upx 10upx;

					.article-title {
						border: none;
						font-size: 28upx;
						font-weight: 300;
						padding: 0;
						margin: 0;
						width: 150upx;
					}

					.article-content {
						flex: 1;
						text-indent: 0;
						font-size: 28upx;
						font-weight: 300;
						margin: 0;
					}
				}

			}
		}


		.rank-list-container {
			margin-top: 40upx;

			.title {
				border-top-left-radius: 30upx;
				border-top-right-radius: 30upx;
				height: 90upx;
				display: flex;
				align-items: center;
				background-color: #ff8195;
				font-weight: 700;
				padding: 0 40upx;
				color: #FFF;
			}

			.scroll-view {
				.item-wrap {
					min-height: 80upx;
					display: flex;
					position: relative;
					background-color: #fbdedb;
					padding: 10upx 40upx;

					.avatar {
						width: 100upx;
						height: 100upx;
						border-radius: 50%;
					}

					.text-wrap {
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						padding: 0 40upx;
						width: 350upx;

						.name {}

						.card {
							color: #db7979;
							font-size: 24upx;
						}

						.progress {
							border-radius: 30upx;
							overflow: hidden;
						}
					}

					.rank {
						width: 70upx;
						height: 70upx;
						position: absolute;
						right: 40upx;
						top: 50%;
						transform: translateY(-50%);
						border-radius: 50%;
						color: #FFF;
						background-color: #b90504;
						font-size: 32upx;

					}
				}
			}
		}

		.modal-container {
			flex-direction: column;
			height: 100%;

			.complete {
				width: 120upx;
				height: 120upx;
			}

			.title {
				font-weight: 700;
				margin-top: 30upx;
				font-size: 34upx;
			}

			.text {
				padding: 60upx;
				font-size: 32upx;
				line-height: 1.6;

			}
		}
	}
</style>

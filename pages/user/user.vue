<template>
	<view class="container">
		<view class="top-content-container">
			<view class="row userinfo">

				<button open-type="getUserInfo" @getuserinfo="getUserInfo">
					<view class="avatar">
						<image :src="userInfo.avatarurl" mode="aspectFill"></image>
						<view class="tips">点击获取</view>
					</view>
				</button>
				<view class="info-content">
					<view class="item-line top">
						<view class="username">{{userInfo.nickname}}</view>
						<!-- <image class='vip' src="/static/image/user/h2-1.png" mode=""></image>
						<view class="vip-expire">(2019年6月18日到期)</view> -->
						<view class="id-content flex-set" v-if="userInfo.id" @tap="$app.copy(userInfo.id*1234)">ID:{{userInfo.id*1234}}</view>
					</view>
					<view class="item-line middle">
						<view class="mystar flex-set" v-if="userStar.id" @tap="$app.goPage('/pages/group/group')">{{userStar.name}}偶像圈</view>
						<view class="mystar flex-set" style="background-color: #415236;" v-if="userStar.id" @tap="$app.goPage('/pages/subPages/fanclub_list/fanclub_list')">
							<image src="/static/image/user/s8.png" style="width: 30upx;height: 30upx;" mode="widthFix"></image>
							后援会
						</view>
						<view class="mystar flex-set" style="background-color: #67458F;" v-if="$app.getData('userInfo').type==1">
							管理员
						</view>

						<!-- <view class="fan-level">
							<image src="/static/image/user/h1-2.png" mode=""></image>
							<view class="fan-text">高积分</view>
						</view> -->
					</view>
					<!-- <view class="item-line bottom">"江城纯色美"</view> -->
				</view>
			</view>

		</view>
		<view class="row currency">
			<view class="item-content flex-set">
				<view class="item-content-top">
					<image src="/static/image/user/b1.png" mode="aspectFit"></image>
					<view class="num">{{userCurrency.coin}}</view>
				</view>
				<view class="item-content-bottom">能量</view>
			</view>
			<view class="item-content flex-set">
				<view class="item-content-top">
					<image src="/static/image/user/b2.png" mode="aspectFit"></image>
					<view class="num">{{userCurrency.stone}}</view>
				</view>
				<view class="item-content-bottom">灵丹</view>
			</view>
			<view class="item-content flex-set">
				<view class="item-content-top">
					<image src="/static/image/user/b3.png" mode="aspectFit"></image>
					<view class="num">{{userCurrency.trumpet}}</view>
				</view>
				<view class="item-content-bottom">喇叭</view>
			</view>
			<!-- <view class="item-content flex-set" @tap="$app.toast('敬请期待')">
					<view class="item-content-top">
						<image src="/static/image/user/b4.png" mode="aspectFit"></image>
						<badgeComponent size="6"></badgeComponent>
					</view>
					<view class="item-content-bottom">道具</view>
				</view> -->
		</view>

		<view class="function-container-list">
			<block v-if="$app.getData('config').version != $app.getVal('VERSION')">
				<block v-if="$app.getVal('platform')!='MP-QQ'">
					<!-- 微信小程序 -->
					<view class="list-item" @tap="$app.goPage('/pages/recharge/recharge')" v-if="!~$app.getData('sysInfo').system.indexOf('iOS')">
						<image src="/static/image/guild/gift/gift.png" mode="widthFix"></image>
						<view class="text">补充爱心</view>
						<!-- <view class="badge-wrapper">
					<badgeComponent></badgeComponent>
				</view> -->
					</view>
					<block v-else>
						<button open-type="contact" :session-from="$app.getData('userInfo').id" v-if="$app.getData('config').ios_switch == 1">
							<view class="list-item">
								<image src="/static/image/guild/gift/gift.png" mode="widthFix"></image>
								<view class="text">补充爱心 回复"1"</view>
							</view>
						</button>
					</block>
				</block>
				<!-- QQ小程序 -->
				<view v-else class="list-item" @tap="$app.preImg($app.getData('config').qq_tips_img)">
					<image src="/static/image/guild/gift/gift.png" mode="widthFix"></image>
					<view class="text">补充爱心</view>
					<!-- <view class="badge-wrapper">
					<badgeComponent></badgeComponent>
				</view> -->
				</view>
			</block>
			<view class="list-item" @tap="$app.goPage('/pages/gift_package/gift_package')">
				<image src="/static/image/user/r8.png" mode="widthFix"></image>
				<view class="text">礼物背包</view>
			</view>
			<view class="list-item" v-if="$app.getVal('platform')=='MP-WEIXIN'" @tap="$app.goPage('/pages/prop/prop')">
				<image src="/static/image/icon/magic-wand.png" mode="widthFix"></image>
				<view class="text">我的道具</view>
			</view>
			<view class="list-item" @tap="$app.goPage('/pages/subPages/task/task')">
				<image src="/static/image/user/r2.png" mode="widthFix"></image>
				<view class="text">每日任务</view>
			</view>

			<view class="list-item" @tap="$app.goPage('/pages/subPages/log/log')">
				<image src="/static/image/user/s2.png" mode="widthFix"></image>
				<view class="text">个人明细</view>
			</view>
			<button v-if="($app.getData('config').kefu_uid==$app.getData('userInfo').id ||$app.getData('userStar').captain==1)&& $app.getData('config').version != $app.getVal('VERSION')" open-type="share" data-share="6">
				<view class="list-item" @tap="$app.goPage('/pages/subPages/log/log')">
					<image src="/static/image/user/s2.png" mode="widthFix"></image>
					<view class="text">给新群员发群红包</view>
				</view>
			</button>
			<!-- <button open-type="contact" :session-from="$app.getData('userInfo').id">
				<view class="list-item">
					<image src="/static/image/user/r3.png" mode="widthFix"></image>
					<view class="text">联系客服</view>
				</view>
			</button> -->
			<view v-if="$app.getData('userExt').is_join_wxgroup == 0 && $app.getData('config').version != $app.getVal('VERSION')" class="list-item">
				<image src="/static/image/wxq.png" mode="widthFix"></image>
				<button class="btn" open-type="contact" :session-from="$app.getData('userInfo').id">
					<view class="text">加入{{$app.getData('userStar').name}}的官方群</view>
				</button>
			</view>
			<view class="list-item" v-if="$app.getData('config').version != $app.getVal('VERSION')" @tap="copy()">
				<image src="/static/image/user/r3.png" mode="widthFix"></image>
				<view class="text">客服微信号：{{$app.getData('config').kefu}}</view>
			</view>
			<view class="list-item" @tap="$app.goPage('/pages/game/game?type=1')" v-if="!~$app.getData('sysInfo').system.indexOf('iOS')&&$app.getData('config').version != $app.getVal('VERSION')">
				<image src="/static/image/icon/task-game.png" mode="widthFix"></image>
				<view class="text">游戏试玩</view>
			</view>

			<view v-if="userStar.id && $app.getData('userInfo').type == 0" class="list-item" @tap="exitGroup">
				<image src="/static/image/user/r4.png" mode="widthFix"></image>
				<view class="text">退出偶像圈</view>
			</view>

			<!-- <view class="list-item"  @tap="$app.goPage('/pages/subPages/msg/msg')">
				<image src="/static/image/user/s7.png" mode=""></image>
				<view class="text">我的消息</view>
			</view> -->

			<!-- <view class="list-item" @tap="$app.goPage('/pages/subPages/adver/adver')">
				<image src="/static/image/user/s7.png" mode="widthFix"></image>
				<view class="text">游戏试玩</view>
			</view> -->

		</view>
		
		<!--
		<modalComponent v-if="modal == 'joinGroup'" title=" " @closeModal="modal=''">
			<view class="tips-modal-container">
				<view class="text-wrap">

					<image class="avatar" :src="$app.getData('userStar').head_img_s" mode=""></image>
					<view class="text flex-set">加入<text style="color:#F00;">{{$app.getData('userStar').name}}</text>官方打榜群</view>
					<view class="text">加群需要注明爱豆名字</view>

				</view>
				<view class="row flex-set">
					<view class="btn" @tap="$app.copy($app.getData('config').kefu)">
						<btnComponent type="css">
							<view class="flex-set" style="width:400upx;height: 100upx;font-weight: 700;font-size: 34upx;">点击复制微信号加群</view>
						</btnComponent>
					</view>
				</view>
			</view>
		</modalComponent>-->

		<!-- <modalComponent v-if="modal == 'recharge'" title="充值" @closeModal="modal=''">
			<view class="recharge-modal-container">
				<view class="header">
					<view class="">我的 <image src="/static/image/user/b1.png" mode="widthFix"></image>：{{$app.getData('userCurrency')['coin']}}</view>
					<view class="">我的 <image src="/static/image/user/b2.png" mode="widthFix"></image>：{{$app.getData('userCurrency')['stone']}}</view>
				</view>

				<view class="btn-wrapper">
					<view class="btn" v-for="(item,index) in rechargeList" :key="index" @tap="payment(item.id)">
						<view class="line">
							<image src="../../static/image/user/b1.png" mode="widthFix"></image>
							<view class="">{{item.coin}}</view>
						</view>
						<view class="line">
							<image src="../../static/image/user/b2.png" mode="widthFix"></image>
							<view class="">{{item.stone}}</view>
						</view>
						<view class="line">
							<view class="">￥{{item.fee}}</view>
						</view>
					</view>
				</view>
			</view>

		</modalComponent> -->
	</view>
</template>

<script>
	import badgeComponent from "@/components/badgeComponent.vue"
	import btnComponent from "@/components/btnComponent.vue"
	import modalComponent from "@/components/modalComponent.vue"
	export default {
		components: {
			badgeComponent,
			modalComponent,
			btnComponent
		},
		data() {
			return {
				requestCount: 0,

				userInfo: {},
				userCurrency: {},
				userStar: {},
				modal: '',
				rechargeList: [],
			};
		},
		onLoad() {},
		onShow() {
			this.userInfo = {
				avatarurl: this.$app.getData('userInfo')['avatarurl'] || this.$app.AVATAR,
				nickname: this.$app.getData('userInfo')['nickname'] || this.$app.NICKNAME,
				id: this.$app.getData('userInfo')['id'] || null,
			}
			this.userCurrency = this.$app.getData('userCurrency') || {
				coin: 0,
				stone: 0,
				trumpet: 0
			}
			this.userStar = this.$app.getData('userStar') || {}

			this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
				this.$app.setData('userCurrency', res.data)
				this.userCurrency = this.$app.getData('userCurrency')
			})

			// this.$app.openInterstitialAd()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			copy() {
				uni.setClipboardData({
					data: 'ouridol',
					success: () => {
						this.$app.toast("微信号已复制\n请到微信中添加客服为好友")
					}
				})
			},
			exitGroup() {
				this.$app.modal(`只有一次机会\n并且会清除你的师徒关系\n是否退出${this.$app.getData('userStar').name}偶像圈？`, () => {
					this.$app.request(this.$app.API.USER_EXIT, {}, res => {
						this.$app.toast('退出成功')
						this.$app.setData('userStar', {}, true)
						this.userStar = {}
					})
				})
			},
			// HTTP
			/**
			 * 保存用户详细信息
			 */
			getUserInfo(e) {
				const userInfo = e.detail.userInfo
				if (userInfo) {
					this.$app.request(this.$app.API.USER_SAVEINFO, {
						iv: e.detail.iv,
						encryptedData: e.detail.encryptedData,
					}, res => {
						this.$app.request(this.$app.API.USER_INFO, {}, res => {
							this.$app.setData('userInfo', res.data)
							this.userInfo = res.data
							this.$app.toast('更新成功')
						})
					}, 'POST', true)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20upx;

		.top-content-container {
			border-radius: 10upx;
			// background-color: #fff;
			padding: 40upx 30upx;

			.row.userinfo {
				display: flex;

				.avatar {
					position: relative;
					overflow: hidden;
					border-radius: 50%;
					width: 140upx;
					height: 140upx;

					z-index: 1;
					// -webkit-backface-visibility: hidden;
					// -webkit-transform: translate3d(0, 0, 0);

					.tips {
						position: absolute;
						width: 100%;
						background-color: rgba(0, 0, 0, .3);
						bottom: 0;
						height: 40upx;
						color: #fff;
						font-size: 20upx;
						text-align: center;
						line-height: 30upx;
					}
				}

				.info-content {
					margin: 4upx 30upx;
					display: flex;
					justify-content: space-around;
					flex-direction: column;
					font-size: 26upx;

					.item-line {
						display: flex;
						align-items: center;

						.username {
							font-weight: 700;
							font-size: 30upx;
							margin-right: 8upx;
						}

						image.vip {
							width: 38upx;
							height: 38upx;
							margin-top: 4upx;
							margin-right: 6upx;
						}

						.vip-expire {
							font-size: 18upx;
							color: #999;
							margin-top: 12upx;
						}

						.id-content {
							border-radius: 20upx;
							// font-size: 24upx;
							background-color: #FDDE2F;
							padding: 0 10upx;
							color: #853E1D;
							margin: 0 10upx;
						}

						.mystar {
							margin: 0 10upx;
							border-radius: 20upx;
							// font-size: 24upx;
							background-color: #23aecf;
							padding: 0 10upx;
							color: #FFF;
							letter-spacing: 3upx;
							white-space: nowrap;
						}

						.fan-level {
							font-size: 24upx;
							position: relative;
							margin-left: 10upx;

							image {
								width: 44upx;
								height: 44upx;
								position: absolute;
								bottom: -2upx;
								left: 0;
							}

							.fan-text {
								background-color: #f1f1f1;
								color: #999;

								border-top-right-radius: 20upx;
								border-bottom-right-radius: 20upx;
								padding: 0 36upx;
								margin-left: 14upx;
							}
						}
					}

					.item-line.bottom {
						font-size: 20upx;
					}
				}
			}

		}

		.row.currency {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: rgba(#000, .05);
			margin-left: -20upx;
			margin-right: -20upx;
			padding: 30upx 0;

			.item-content {
				width: 100%;
				flex-direction: column;

				.item-content-top {
					display: flex;
					align-items: center;
					position: relative;

					image {
						width: 50upx;
						height: 50upx;
						margin-right: 4upx;
					}
				}

				.item-content-bottom {
					font-size: 28upx;
					margin-top: 4upx;
				}
			}
		}

		.function-container-list {
			border-radius: 10upx;
			// background-color: #fff;
			margin-top: 20upx;
			padding: 14upx;

			.list-item {
				height: 100upx;
				display: flex;
				align-items: center;
				padding: 14upx 30upx;

				image {
					width: 50upx;
					height: 50upx;
					margin-right: 30upx;
				}

				.badge-wrapper {
					position: relative;
					margin-left: 320upx;
					margin-top: 10upx;
					height: 10upx;
					width: 60upx;
				}
			}
		}

		.tips-modal-container {
			height: 100%;
			padding: 20upx 40upx;
			font-size: 32upx;

			.text-wrap {
				text-align: center;
				margin: 50upx;

				.title {
					font-size: 40upx;
					font-weight: 700;
					text-align: center;
					margin: 20upx;
				}

				.text {
					line-height: 1.7;
				}

				.avatar {
					width: 140upx;
					height: 140upx;
					border-radius: 50%;
					margin: 20upx;
				}
			}
		}


	}
</style>

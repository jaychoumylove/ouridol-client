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
				
		<view class="item-wrap" @tap="$app.preImg(levelImg)">
			<view class="left-wrap">
				<!-- <image class="icon" :src="`/static/image/icon/level/lv${userLevel}.png`" mode="aspectFill"></image> -->
				<view class="tips flex-set">粉丝等级<view class="highlight">LV{{userLevel}}</view>，再贡献 <view class="highlight">{{userGap}}</view> 人气可升至下一级</view>
			</view>
		</view>
		
		<view class="function-container-list">
			<view class="list-item red" @tap="$app.goPage('/pages/recharge/recharge')" v-if="$app.getData('config').version != $app.getData('VERSION') && $app.chargeSwitch()==0">
				<view class="left-wrap">
					<image src="/static/image/guild/gift/gift.png" mode="widthFix"></image>
					<view class="text">购买礼物给爱豆打榜</view>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>
			<button open-type="contact" :session-from="$app.getData('userInfo').id" v-if="$app.getData('config').version != $app.getData('VERSION') && $app.chargeSwitch()==2">
				<view class="list-item red">
					<view class="left-wrap">
						<image src="/static/image/user/r7.png" mode="widthFix"></image>
						<view class="text">回复"1" 获得更多能量</view>
					</view>
					<view class="right-wrap iconfont iconjiantou"></view>
				</view>
			</button>
			<view class="list-item" v-if="$app.getData('config').version != $app.getData('VERSION')" @tap="$app.goPage('/pages/gift_package/gift_package')">
				<view class="left-wrap">
					<image src="/static/image/user/r8.png" mode="widthFix"></image>
					<view class="text">礼物背包</view>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>
			<view class="list-item" v-if="$app.getData('config').version != $app.getData('VERSION')&&$app.getData('platform')=='MP-WEIXIN'"
			 @tap="$app.goPage('/pages/prop/prop')">
				<view class="left-wrap">
					<image src="/static/image/user/r6.png" mode="widthFix"></image>
					<view class="text">我的道具</view>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>
			<view class="list-item" @tap="$app.goPage('/pages/subPages/task/task')">
				<view class="left-wrap">
					<image src="/static/image/user/r2.png" mode="widthFix"></image>
					<view class="text">每日任务</view>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>

			<view class="list-item" @tap="$app.goPage('/pages/subPages/log/log')">
				<view class="left-wrap">
					<image src="/static/image/user/s2.png" mode="widthFix"></image>
					<view class="text">个人明细</view>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>
			<button v-if="($app.getData('config').kefu_uid==$app.getData('userInfo').id ||$app.getData('userStar').captain==1)&& $app.getData('config').version != $app.getData('VERSION')"
			 open-type="share" data-share="6">
				<view class="list-item" @tap="$app.goPage('/pages/subPages/log/log')">
					<view class="left-wrap">
						<image src="/static/image/user/s2.png" mode="widthFix"></image>
						<view class="text">给新群员发群红包</view>
					</view>
					<view class="right-wrap iconfont iconjiantou"></view>
				</view>
			</button>
			<!-- <button open-type="contact" :session-from="$app.getData('userInfo').id">
				<view class="list-item">
					<view class="left-wrap">
						<image src="/static/image/user/r3.png" mode="widthFix"></image>
						<view class="text">联系客服</view>
					</view>
					<view class="right-wrap iconfont iconjiantou"></view>
				</view>
			</button> -->
			<view v-if="$app.getData('platform')=='MP-WEIXIN'&&$app.getData('userExt').is_join_wxgroup == 0 && $app.getData('config').version != $app.getData('VERSION')"
			 class="list-item">
				 <view class="left-wrap">
					<image src="/static/image/user/r5.png" mode="widthFix"></image>
					<button class="btn" open-type="contact" :session-from="$app.getData('userInfo').id">
						<view class="text">加入{{$app.getData('userStar').name}}的官方群</view>
					</button>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>
			<view class="list-item" v-if="$app.getData('config').version != $app.getData('VERSION')" @tap="copy()">
				<view class="left-wrap">
					<image src="/static/image/user/r3.png" mode="widthFix"></image>
					<view class="text">客服微信号：{{$app.getData('config').kefu}}</view>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>
			<view class="list-item" @tap="$app.goPage('/pages/game/game?type=1')" v-if="$app.getData('config').version != $app.getData('VERSION')">
				<view class="left-wrap">
					<image src="/static/image/user/s7.png" mode="widthFix"></image>
					<view class="text">游戏试玩</view>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>

			<view v-if="userStar.id && $app.getData('userInfo').type == 0" class="list-item" @tap="exitGroup">
				<view class="left-wrap">
					<image src="/static/image/user/r4.png" mode="widthFix"></image>
					<view class="text">退出偶像圈</view>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>

		</view>
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
				userLevel:1,
				userGap:0,
				levelImg:this.$app.getData('config').level_img,
			};
		},
		onLoad() {},
		onShow() {
			this.userInfo = {
				avatarurl: this.$app.getData('userInfo')['avatarurl'] || this.$app.getData('AVATAR'),
				nickname: this.$app.getData('userInfo')['nickname'] || this.$app.getData('NICKNAME'),
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
			
			this.getUserLevel();
			// this.$app.openInterstitialAd()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			copy() {
				uni.setClipboardData({
					data: this.$app.getData('config').kefu,
					success: () => {
						this.$app.toast("微信号已复制\n请到微信中添加客服为好友")
					}
				})
			},
			exitGroup() {
				this.$app.modal(`${this.$app.getData('config').exitgroup_tips}\n\n是否退出${this.$app.getData('userStar').name}偶像圈？`, () => {
					this.$app.request(this.$app.API.USER_EXIT, {}, res => {
						this.$app.toast('退出成功')
						this.$app.setData('userStar', {}, true)
						this.userStar = {}
					})
				})
			},
			// HTTP
			getUserLevel() {
				this.$app.request('user/level', {
					user_id: this.userInfo.id
				}, res => {
					this.userLevel = res.data.level
					this.userGap = res.data.gap ? (res.data.gap / 10000).toFixed(1) + '万' : '0'
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
						if (res.data.token) this.$app.token = res.data.token
						this.$app.request('page/app', {}, res => {
							this.$app.setData('userCurrency', res.data.userCurrency)
							this.$app.setData('userStar', res.data.userStar)
							this.$app.setData('userExt', res.data.userExt)
							this.$app.setData('userInfo', res.data.userInfo)
							this.$app.setData('config', res.data.config)
							
							this.userInfo = res.data.userInfo
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
		
		.item-wrap {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 20upx;
			padding-top: 20upx;
		
			.left-wrap {
				font-size: 30upx;
				display: flex;
				align-items: center;
		
				.icon {
					width: 63upx;
					height: 24upx;
					margin-right: 10upx;
				}
				
				.tips {
					color: #999;
					margin: 0 20upx;
					font-size: 26upx;
						
					.highlight {
						color: #345;
						font-weight: 700;
					}
					
				}
			}
		
			.right-wrap {
				font-size: 22upx;
				color: #999;
			}
		}

		.function-container-list {
			margin-top: 20upx;
			.red{
				color: red;
			}
			.list-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 0 20upx;
				padding: 22upx 0;
				border-radius: 18rpx;
				border-bottom: 1rpx solid #EFEFEF;
				
				.left-wrap {
					display: flex;
					align-items: center;
					
					image {
						width: 48upx;
						height: 48upx;
						margin-right: 20upx;
					}
				}
				
				.right-wrap {
					font-size: 22upx;
					color: #999;
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

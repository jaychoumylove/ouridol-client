<template>
	<view class="container">
		<loadIconComponent v-if="requestCount>0" type='whole'></loadIconComponent>

		<view class="top-content-container">
			<view class="row userinfo">
				<button class="avatar" open-type="getUserInfo" @getuserinfo="getUserInfo">
					<image :src="userInfo.avatarurl" mode="aspectFill"></image>
					<view class="tips">点击获取</view>
				</button>
				<view class="info-content">
					<view class="item-line top">
						<view class="username">{{userInfo.nickname}}</view>
						<!-- <image class='vip' src="/static/image/user/h2-1.png" mode=""></image>
						<view class="vip-expire">(2019年6月18日到期)</view> -->
					</view>
					<view class="item-line middle">
						<view class="id-content" v-if="userInfo.id">ID:{{userInfo.id * 12345}}</view>
						<view class="mystar" v-if="$app.getData('userStar').id" @tap="$app.goPage('/pages/group/group')">我的公会</view>
						<!-- <view class="fan-level">
							<image src="/static/image/user/h1-2.png" mode=""></image>
							<view class="fan-text">高积分</view>
						</view> -->
					</view>
					<!-- <view class="item-line bottom">"江城纯色美"</view> -->
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
		</view>

		<view class="function-container-list">
			<view class="list-item" @tap="$app.goPage('/pages/recharge/recharge')">
				<image src="/static/image/user/s1.png" mode="widthFix"></image>
				<view class="text">鲜花充值</view>
				<view class="badge-wrapper">
					<badgeComponent></badgeComponent>
				</view>
			</view>
			<view class="list-item" @tap="$app.goPage('/pages/task/task')">
				<image src="/static/image/user/s7.png" mode="widthFix"></image>
				<view class="text">每日任务</view>
			</view>
			<!-- <view class="list-item" @tap="$app.toast('敬请期待')">
				<image src="/static/image/user/s2.png" mode="widthFix"></image>
				<view class="text">消息通知</view>
				<view class="badge-wrapper">
					<badgeComponent num="1256"></badgeComponent>
				</view>
			</view> -->
			<!-- <view class="list-item" @tap="$app.toast('敬请期待')">
				<image src="/static/image/user/s3.png" mode="widthFix"></image>
				<view class="text">个人明细</view>
			</view> -->

			<!-- <view class="list-item">
				<image src="/static/image/user/s4.png" mode=""></image>
				<view class="text">好友</view>
			</view>
			
			<view class="list-item">
				<image src="/static/image/user/s5.png" mode=""></image>
				<view class="text">我的荣誉</view>
			</view>
			
			<view class="list-item">
				<image src="/static/image/user/s6.png" mode=""></image>
				<view class="text">参与话题</view>
			</view> -->

			<!-- <view class="list-item" @tap="$app.goPage('/pages/adver/adver')">
				<image src="/static/image/user/s7.png" mode="widthFix"></image>
				<view class="text">游戏试玩</view>
			</view> -->

		</view>

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
	import modalComponent from "@/components/modalComponent.vue"
	export default {
		components: {
			badgeComponent,
			modalComponent
		},
		data() {
			return {
				requestCount: 0,

				userInfo: {},
				userCurrency: {},
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
		},
		methods: {
			
			// HTTP
			/**
			 * 保存用户详细信息
			 */
			getUserInfo(e) {
				const userInfo = e.detail.userInfo
				if (userInfo) {
					this.$app.request(this.$app.API.USER_SAVEINFO, userInfo, res => {
						this.$app.request(this.$app.API.USER_INFO, {}, res => {
							this.$app.setData('userInfo', res.data)
							this.userInfo = this.$app.getData('userInfo')
							this.$app.toast('更新成功')
						})
					}, 'POST', true)
				}
			},
		}
	}
</script>

<style lang="scss" scoped="true">
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

					.tips {
						position: absolute;
						width: 100%;
						background-color: rgba(0, 0, 0, .3);
						bottom: 0;
						height: 40upx;
						color: #fff;
						font-size: 16upx;
						text-align: center;
						line-height: 30upx;
					}
				}

				.info-content {
					margin: 4upx 30upx;
					display: flex;
					justify-content: space-around;
					flex-direction: column;

					.item-line {
						display: flex;
						align-items: center;
						.username {
							font-weight: 700;
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
							font-size: 24upx;
							background-color: #FDDE2F;
							padding: 0 10upx;
							color: #853E1D;
						}
						.mystar{
							margin-left: 10upx;
							border-radius: 20upx;
							font-size: 24upx;
							background-color: #23aecf;
							padding: 0 10upx;
							color: #FFF;
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

			.row.currency {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 40upx;

				.item-content {
					width: 100%;
					flex-direction: column;

					.item-content-top {
						display: flex;
						align-items: center;
						position: relative;

						image {
							width: 40upx;
							height: 40upx;
							margin-right: 4upx;
						}
					}

					.item-content-bottom {
						color: #999;
						font-size: 26upx;
						margin-top: 4upx;
					}
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

		
	}
</style>

<template>
	<view class="container">
		<view class="top-row">

			<view class="user-container">
				<image :src="userInfo.avatarurl" mode="widthFix"></image>
				<view class="nickname">
					{{userInfo.nickname}}
				</view>
			</view>
			<btnComponent type="css" @tap="modal='proxyRecharge'">
				<view class="proxy flex-set">
					<image src="/static/image/recharge/proxy.png" mode=""></image>
					<text>代充值</text>
				</view>
			</btnComponent>

		</view>
		<!-- <view class="row">
			<image class="bg" src="/static/image/recharge/top-title.png" mode="widthFix"></image>
			<view class="">能量充值</view>
		</view> -->

		<view class="count-wrap">
			<view class="top-title">我的能量：{{userCurrency.coin}}</view>
			<view class="top-title">我的灵丹：{{userCurrency.stone}}</view>
			<view class="top-title flex-set" @tap="$app.goPage('/pages/subPages/gift_package/gift_package')">
				<view class="" style="text-decoration: underline;">礼物背包</view>
				<view class="badge-wrap">{{giftNum}}</view>
			</view>

			<image class='hand' v-if="handShow" src="/static/image/pet/hand.png" mode="widthFix"></image>
		</view>
		<view class="count-wrap tips">
			购买的能量礼物不清零
		</view>
		<view class="btn-wrapper">
			<view class="btn" v-for="(item,index) in rechargeList" :key="index" @tap="payment(item.id)">
				<image class="icon" :src="item.item.icon" mode="widthFix"></image>
				<view class="line one flex-set">
					<image class="sicon" src="/static/image/user/b1.png" mode="widthFix"></image>{{item.item.count}}
				</view>
				<view class="name flex-set">{{item.item.name}}</view>
				<view class="line two flex-set">
					<image class="sicon" src="/static/image/user/b2.png" mode="widthFix"></image>+{{item.stone}}
				</view>

				<view class="fee flex-set">
					￥{{item.fee}}
				</view>
			</view>
		</view>

		<!-- 代充值 -->
		<modalComponent v-if="modal == 'proxyRecharge'" title="代充值" @closeModal="modal=''">
			<view class="userinfo-modal-container">
				<view class="top">
					<image class="avatar" :src="currentUser.avatarurl" mode="scaleToFill"></image>
					<view class="nickname">{{currentUser.nickname}}</view>
				</view>

				<view class="send-input">
					<input type="number" confirm-type="search" @confirm="searchUser()" :value="currentUserid" @input="currentUserid = $event.detail.value"
					 placeholder="请输入对方的ID" />
				</view>
				<btnComponent type="css">
					<view class="btn flex-set" @tap="searchUser()">查找用户</view>
				</btnComponent>
				<btnComponent type="css">
					<view class="btn flex-set" @tap="confirm()">为TA充值</view>
				</btnComponent>
			</view>
		</modalComponent>
	</view>
</template>

<script>
	var timeId;
	import btnComponent from '@/components/btnComponent.vue'
	import badgeComponent from "@/components/badgeComponent.vue"
	import modalComponent from "@/components/modalComponent.vue"
	export default {
		components: {
			btnComponent,
			badgeComponent,
			modalComponent,
		},
		data() {
			return {
				modal: '',
				requestCount: 1,
				userInfo: {
					avatarurl: this.$app.getData('userInfo')['avatarurl'] || this.$app.AVATAR,
					nickname: this.$app.getData('userInfo')['nickname'] || this.$app.NICKNAME,
					id: this.$app.getData('userInfo')['id'] || null,
				},
				userCurrency: this.$app.getData('userCurrency') || {
					coin: 0,
					stone: 0,
					trumpet: 0
				},
				rechargeList: this.$app.getData('goodsList') || [],
				handShow: false,
				giftNum: 0,
				currentUser: {
					avatarurl: this.$app.AVATAR,
				},
				currentUserid: '',
			};
		},
		onLoad() {
			this.getGoodsList()
			let timeId = setInterval(() => {
				if (this.$app.getData('userInfo').nickname) {
					clearInterval(timeId)
					this.userInfo = this.$app.getData('userInfo')
					this.userCurrency = this.$app.getData('userCurrency')
				}
			}, 300)

			this.$app.request('page/gift_num', {}, res => {
				this.giftNum = res.data || 0
			})
		},

		onUnload() {
			clearInterval(timeId)
		},
		methods: {
			// 确认代充
			confirm() {
				if (this.currentUser.nickname) {
					this.userInfo = this.currentUser
					this.modal = ''
				} else {
					this.$app.toast('请先查找用户')
				}
			},
			searchUser() {
				if (!this.currentUserid) return
				const uid = this.currentUserid / 1234
				this.$app.request('user/info', {
					user_id: uid
				}, res => {
					if (res.data.nickname) {
						this.currentUser = res.data
					} else {
						this.$app.toast('未找到用户')
					}
				}, 'POST', true)
			},
			payment(goods_id) {
				this.$app.request(this.$app.API.PAY_ORDER, {
					goods_id,
					user_id: this.userInfo.id
				}, res => {
					// #ifdef H5
					WeixinJSBridge.invoke('getBrandWCPayRequest', {
						"appId": res.data.appId, //公众号名称，由商户传入     
						"timeStamp": res.data.timeStamp, //时间戳，自1970年以来的秒数     
						"nonceStr": res.data.nonceStr, //随机串     
						"package": res.data.package,
						"signType": res.data.signType, //微信签名方式：     
						"paySign": res.data.paySign //微信签名 
					}, res => {
						console.log(res);
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							// 使用以上方式判断前端返回,微信团队郑重提示：
							//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。

							this.$app.toast('支付成功', 'success')
							this.$app.request('page/gift_num', {}, res => {
								this.giftNum = res.data || 0
							})
							this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
								this.$app.setData('userCurrency', res.data)
								this.userCurrency = this.$app.getData('userCurrency')
								this.modal = ''
							})
						}
					});
					// #endif
					// #ifndef H5
					uni.requestPayment({
						provider: 'wxpay',
						timeStamp: res.data.timeStamp,
						nonceStr: res.data.nonceStr,
						package: res.data.package,
						signType: res.data.signType,
						paySign: res.data.paySign,
						success: res => {
							this.$app.toast('支付成功', 'success')
							this.$app.request('page/gift_num', {}, res => {
								this.giftNum = res.data || 0
							})
							this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
								this.$app.setData('userCurrency', res.data)
								this.userCurrency = this.$app.getData('userCurrency')
								this.modal = ''
							})
						},
						fail: err => {
							this.$app.toast('支付失败')
						}
					});
					// #endif
				}, 'POST', true);

			},
			// HTTP
			getGoodsList() {
				this.$app.request(this.$app.API.PAY_GOODS, {}, res => {
					const resList = []
					for (let v of res.data) {
						resList.push({
							id: v.id,
							coin: v.coin,
							stone: v.stone,
							fee: v.fee,
							item: v.item,
						})
					}
					this.rechargeList = resList
					this.$app.setData('goodsList', this.rechargeList)
					this.$app.closeLoading(this)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 40upx;

		.top-row {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 40upx;

			.user-container {
				height: 70upx;
				background-color: rgba(255, 255, 255, .3);
				display: flex;
				align-items: center;
				border-radius: 30upx;

				image {
					width: 70upx;
					height: 70upx;
					border-radius: 50%;
					margin-right: 20upx;
				}

				.nickname {
					font-size: 32upx;
					margin-right: 30upx;
				}
			}

			.proxy {
				padding: 10upx 20upx;
				height: 70upx;

				image {
					width: 50upx;
					height: 50upx;
					margin: 0 10upx;
				}
			}
		}


		.row {
			position: relative;
			height: 115upx;
			text-align: center;
			line-height: 115upx;
			font-size: 40upx;
			font-weight: 700;

			.bg {
				position: absolute;
				z-index: -1;
				left: 0;
				top: 0;
			}
		}

		.count-wrap {
			background-color: #fac7cc;
			display: flex;
			justify-content: space-around;
			align-items: center;
			line-height: 100upx;
			position: relative;

			.top-title {
				position: relative;

				.badge-wrap {
					background-color: red;
					border-radius: 30upx;
					line-height: 1.5;
					padding: 5upx 10upx;
					color: #FFF;
					font-size: 18upx;
				}
			}

			.hand {
				width: 60upx;
				height: 60upx;
				animation: scale 1s linear infinite;
				position: absolute;
				right: 40upx;
				top: 60upx;
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

		.count-wrap.tips {
			border-top: 1px dashed #EEE;
			line-height: 1.6;
		}

		.btn-wrapper {
			display: flex;
			flex-wrap: wrap;
			background-color: #FFF;
			padding: 8upx;

			.btn {
				background-color: #fac7cc;
				width: 200upx;
				height: 320upx;
				margin: 8upx;
				position: relative;
				padding: 8upx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				border-radius: 10upx;

				.name {
					width: 125upx;
					color: #fa5e86;
					border-bottom: 2upx solid #EEE;
				}

				.icon {
					width: 125upx;
					height: 125upx;
				}

				.line {
					.sicon {
						width: 30upx;
					}
				}

				.line.one {
					position: absolute;
					right: 30upx;
					top: 120upx;

					border-radius: 20upx;
					background-color: rgba(255, 255, 255, .3);
					font-size: 24upx;
					padding: 0 4upx;
					color: #666;

					.sicon {
						width: 25upx;
					}
				}

				.fee {
					width: 125upx;
					background-color: #FFF;
					border-radius: 5upx;

				}
			}

		}

		.userinfo-modal-container {
			height: 640upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			padding: 40upx;

			.top {
				display: flex;
				flex-direction: column;
				align-items: center;
				line-height: 1.6;

				.avatar {
					width: 160rpx;
					height: 160rpx;
					border-radius: 50%;
				}

				.nickname {
					font-size: 36upx;
					font-weight: 600;
					height: 80upx;
				}
			}

			.btn-list {
				width: 100%;
				justify-content: space-around;

				.btn-item {
					display: flex;
					flex-direction: column;
					align-items: center;

					.bg {
						background-color: #FFF;
						border-radius: 20upx;
						width: 100upx;
						height: 100upx;

						image {
							width: 60upx;
							height: 60upx;
						}
					}

					.text {
						margin-top: 10upx;
					}
				}
			}



			.content {
				line-height: 1.6;
			}

			.btn {
				font-size: 32upx;
				font-weight: 700;
				width: 300upx;
				height: 80upx;
			}

			.row {
				width: 100%;
				justify-content: space-around;

				.btn {
					width: 200upx;
				}
			}

			.send-input {
				position: relative;

				input {
					background-color: #FFF;
					border-radius: 60upx;
					text-align: center;
					width: 300upx;
					height: 80upx;
					font-size: 32upx;
					font-weight: 700;
				}

				image {
					position: absolute;
					width: 50upx;
					height: 50upx;
					right: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}
</style>

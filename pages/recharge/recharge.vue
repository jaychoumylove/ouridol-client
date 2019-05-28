<template>
	<view class="container">

		<view class="user-container">
			<image :src="userInfo.avatarurl" mode="widthFix"></image>
			<view class="nickname">
				{{userInfo.nickname}}
			</view>
		</view>

		<view class="top-container flex-set">
			<view class="top-title one">能量充值</view>
			<view class="top-title two">我的能量：{{userCurrency.coin}}</view>
			<view class="top-title three">我的灵丹：{{userCurrency.stone}}</view>
			<!-- 			<view class="top-title two">我的<image src="/static/image/user/b1.png" mode="widthFix"></image>：4646</view>
			<view class="top-title three">我的<image src="/static/image/user/b2.png" mode="widthFix"></image>：55165</view> -->
		</view>

		<view class="btn-wrapper">
			<view class="" v-for="(item,index) in rechargeList" :key="index" @tap="payment(item.id)">
				<btnComponent type="fangde">
					<view class="btn flex-set" style="width: 240upx;height: 240upx;margin: -30upx 0 0 -30upx;">
						<view class="line">
							<image src="/static/image/user/b1.png" mode="widthFix"></image>
							<view class="">{{item.coin}}</view>
						</view>
						<view class="line">
							<image src="/static/image/user/b2.png" mode="widthFix"></image>
							<view class="">{{item.stone}}</view>
						</view>
						<view class="line">
							<view class="">￥{{item.fee}}</view>
						</view>
					</view>
				</btnComponent>
			</view>

		</view>
	</view>
</template>

<script>
	var timeId;
	import btnComponent from '@/components/btnComponent.vue'
	export default {
		components: {
			btnComponent
		},
		data() {
			return {
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
			};
		},
		onLoad() {
			this.getGoodsList()
			let timeId = setInterval(() => {
				if (this.$app.getData('userInfo').nickname) {
					this.userInfo = this.$app.getData('userInfo')
					this.userCurrency = this.$app.getData('userCurrency')
				}
			}, 300)
		},

		onUnload() {
			clearInterval(timeId)
		},
		methods: {
			payment(goods_id) {
				this.$app.request(this.$app.API.PAY_ORDER, {
					goods_id
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
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							// 使用以上方式判断前端返回,微信团队郑重提示：
							//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。

							this.$app.toast('支付成功', 'success')

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
				});

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
		padding-top: 100upx;

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

		.top-container {
			width: 604upx;
			height: 321upx;
			margin: auto;
			flex-direction: column;
			justify-content: flex-start;
			background: url(http://wx4.sinaimg.cn/large/0060lm7Tly1g2jvvysgsrg30gs08xweg.gif) center no-repeat/cover;

			.top-title {
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 30upx;
					margin: 0 4upx;
				}
			}

			.top-title.one {
				margin-top: 70upx;
				font-size: 36upx;
			}

			.top-title.two {
				margin-top: 56upx;
			}

			.top-title.three {
				margin-top: 46upx;
			}

		}

		.btn-wrapper {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			margin-top: 50upx;

			.btn {

				margin: 10upx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.line {
					display: flex;

					image {
						width: 34upx;
					}
				}
			}
		}


	}
</style>

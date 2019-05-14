<template>
	<view class="container">
		

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
	import btnComponent from '@/components/btnComponent.vue'

	export default {
		components: {
			btnComponent
		},
		data() {
			return {
				requestCount: 1,

				userCurrency: {},
				rechargeList: [],
			};
		},
		onLoad() {
			this.getGoodsList()

			this.userCurrency = this.$app.getData('userCurrency') || {
				coin: 0,
				stone: 0,
				trumpet: 0
			}
		},
		methods: {
			payment(goods_id) {
				this.$app.request(this.$app.API.PAY_ORDER, {
					goods_id
				}, res => {
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
				})
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

					this.$app.closeLoading(this)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.top-container {
			width: 604upx;
			height: 321upx;
			margin: auto;
			flex-direction: column;
			justify-content: flex-start;
			margin-top: 10%;
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

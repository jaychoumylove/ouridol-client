<template>

	<!-- #ifdef MP -->
	<view v-if="~$app.getData('sysInfo').system.indexOf('iOS')" class="buy-container flex-set">
		由于相关规范，iOS功能暂不可用
	</view>
	
	<view v-else-if="$app.getVal('platform')=='MP-QQ'" class="recharge-container flex-set">
		抱歉，QQ充值暂时无法使用
	</view>
	<view v-else class="buy-container">
	<!-- #endif -->

	<!-- #ifdef H5 -->
	<view class="buy-container">
	<!-- #endif -->

			<view class="list-wrapper">
				<view class="list-item" v-for="(item,index) in list" :key="index">
					<view class="row row-1">
						<view class="left flex-set">
							<image :src="item.img" class="icon" mode="aspectFill"></image>

							<view class="content">
								<view class="top text-overflow">{{item.name}}</view>
								<view class="bottom flex-set">
									<view class="price">￥{{item.fee}}</view>
									<view class="remain">剩余{{item.remain}}</view>
								</view>
							</view>
						</view>

						<view class="right flex-set">
							<view class="num-wrapper flex-set">
								<view class="btn flex-set" @tap="numChange(index, 0)">-</view>
								<input class="flex-set" type="number" :value="item.num" @input="numChange(index, $event)" />
								<view class="btn flex-set" @tap="numChange(index, 1)">+</view>
							</view>
							<btnComponent type="css">
								<view class="flex-set" style="width: 140upx;height:70upx;" @tap="payment(item)">购买</view>
							</btnComponent>
						</view>
					</view>

					<view class="row row-2">{{item.desc}}</view>

				</view>
			</view>
		</view>
</template>

<script>
	import btnComponent from "@/components/btnComponent.vue"

	export default {
		components: {
			btnComponent
		},
		data() {
			return {
				list: [],
				num: 1
			};
		},
		onShow() {
			this.loadData()
		},
		methods: {
			numChange(index, plus) {
				if (plus.detail) {
					this.list[index].num = plus.detail.value
				} else {
					if (plus) this.list[index].num++
					else this.list[index].num--
				}

				if (this.list[index].num < 1) this.list[index].num = 1
			},
			// 支付
			payment(item) {
				this.$app.request(this.$app.API.PAY_ORDER, {
					goods_id: item.id,
					goods_num: item.num,
					user_id: this.$app.getData('userInfo').id,
					type: 1,
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
							this.loadData()
							this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
								this.$app.setData('userCurrency', res.data)
								this.userCurrency = this.$app.getData('userCurrency')
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
							this.loadData()
							this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
								this.$app.setData('userCurrency', res.data)
								this.userCurrency = this.$app.getData('userCurrency')
							})
						},
						fail: err => {
							this.$app.toast('支付失败')
						}
					});
					// #endif
				}, 'POST', true);

			},
			loadData() {
				this.$app.request('page/prop', {}, res => {

					for (let key in res.data) {
						res.data[key].num = 1
					}
					this.list = res.data
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.buy-container {
		.list-item {
			padding: 10upx 20upx;
			background-color: rgba(#FFF, .3);
			margin: 20upx 0;

			.row {
				padding: 10upx 20upx;

				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.row-1 {
				border-bottom: 1px solid #FFF;

				.left {
					.icon {
						width: 100upx;
						height: 100upx;

					}

					.content {
						line-height: 1.7;
						margin: 0 40upx;

						.top {
							width: 200upx;
						}

						.bottom {
							justify-content: flex-start;
							font-size: 22upx;
							color: $text-color-2;

							.price {
								color: red;
								font-size: 30upx;
								margin-right: 10upx;
							}

							.remain {}
						}
					}
				}

				.right {

					.num-wrapper {

						margin: 0 20upx;

						.btn {
							width: 30upx;
							height: 30upx;
							background-color: $text-color-1;
							border-radius: 50%;
							box-shadow: 0upx 2upx 4upx rgba(#000, .3);
						}

						input {
							width: 60upx;
							height: 30upx;
							line-height: 30upx;
							border-radius: 30upx;
							margin: 0 10upx;
							background-color: #FFF;
							text-align: center;
							font-size: 22upx;
						}
					}
				}
			}

			.row-2 {
				font-size: 24upx;
			}
		}
	}
</style>

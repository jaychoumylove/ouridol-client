 <template>
	<view class="buy-container">
		<view class="top-enter-wrapper">
			<view class="explain-wrapper flex-set">
				<!-- <image src=""></image> -->
				<view class="text-wrapper">
					<view class="top flex-set">小贴士</view>
					<view class="bottom flex-set">道具每日限量,购买起24:00小时后失效,请及时使用</view>
				</view>
				<block v-if="$app.getData('VERSION')!=$app.getData('config').version">
					<btnComponent type="default">
						<view @tap="$app.goPage('/pages/prop/prop')" class="flex-set" style="font-weight: 700 ;width: 140upx; height: 60upx;">我的道具</view>
					</btnComponent>
				</block >
			</view>
		</view>
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
							<!-- <btnComponent type="css">
								<view class="flex-set" style="width: 140upx;height:70upx;" @tap="payment(item)">购买</view>
							</btnComponent> -->
						
						<!-- <view class="flex-set">
							<btnComponent v-if="$app.chargeSwitch()!=0" type="css">
								<view class="text flex-set" style="width: 140upx;height:70upx;" @tap="payment(item)">购买</view>
							</btnComponent>
							<btnComponent v-else type="css">
								<view class="flex-set" style="width: 140upx;height:70upx;" @tap="payment(item)">回复"1"获得</view>
							</btnComponent>
							<btnComponent type="css">
								<view class="text flex-set" style="width: 140upx;height:70upx;" @tap="payment(item)">灵丹兑换</view>
							</btnComponent>								
						</view> -->

						<view class="flex-set action-btn" style="flex-direction: column;">
							<btnComponent v-if="$app.chargeSwitch()==0" type="css" style="margin-bottom: 10upx;">
								<view class="flex-set" style="width: 130upx;height:50upx;" @tap="payment(item)">购买</view>
							</btnComponent>
							<btnComponent v-else-if="$app.chargeSwitch()==2" type="css" style="margin-bottom: 10upx;">
								<button class="flex-set comment" style="width: 130upx;height:50upx; padding: 0 auto;" open-type="contact">回复"1"</button>
							</btnComponent>
							<btnComponent type="css">
								<view class="flex-set ldexchange" style="width: 130upx;height:50upx;padding: 0 auto;" @tap="exchangeModel(index, 'open')">{{item.stone}}灵丹</view>
							</btnComponent>
						</view>
					</view>
				</view>

				<view class="row row-2">{{item.desc}}</view>

			</view>
		</view>
		
		<modalComponent v-if="modal == 'exchange'" title="灵丹兑换" @closeModal="exchangeModel(-1, 'close')">
			<view class="exchangeModal">
				<view class="intro flex-set mTop">
					<image :src="list[exchangeIndex].img" class="icon" mode="aspectFill"></image>
					<view class="intro-r">
						<view class="title">
							<view class="name">{{list[exchangeIndex].name}}</view>
							<view class="remain flex-set" style="justify-content: flex-start;">
								<image src="/static/image/user/b2.png" mode="aspectFit"></image>
								{{list[exchangeIndex].stone}}
								<view class="remain-num">剩余：{{list[exchangeIndex].remain}}个</view>
							</view>
						</view>
					</view>
				</view>
				<view class="intro mTop">
					<view class="description">{{list[exchangeIndex].desc}}</view>
				</view>
				<view class="num flex-set mTop">
					<view class="stone flex-set">
					<image src="/static/image/user/b2.png" mode="aspectFit"></image>
					{{list[exchangeIndex].stone}} x 
					</view>
					<view class="token-input">
						<input :value="list[exchangeIndex].num" @input="handleExchangeInput" placeholder="0" type="number" />
					</view>
					<view class="token-stone">
						<image src="/static/image/user/b2.png" mode="aspectFit"></image>
						{{list[exchangeIndex].stone * list[exchangeIndex].num}}
					</view>
				</view>
				<view class="submit mTop">
					<btnComponent type="css">
						<view class="flex-set" style="width:250upx;height: 80upx;font-weight: 700;font-size: 34upx;" @tap="exchange()">确认兑换</view>
					</btnComponent>
				</view>				
			</view>
		</modalComponent>
	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from "@/components/btnComponent.vue"

	export default {
		components: {
			btnComponent,
			modalComponent
		},
		data() {
			return {
				list: [],
				num: 1,
				modal: '',
				exchangeIndex: -1
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
			// 打开灵丹兑换弹窗
			exchangeModel(index, type) {
				this.exchangeIndex = type == 'open' ? index: -1;
				this.modal = type == "open" ? 'exchange': '';
			},
			// 执行兑换请求
			exchange() {
				if (this.exchangeIndex < 0) this.$app.toast(res.msg);
				
				const item = this.list[this.exchangeIndex];
				const exchangeIndex = this.exchangeIndex;
				this.$app.request(this.$app.API.PROP_EXCHANGE, {
					id: item.id,
					num: item.num,
				}, res => {
					this.$app.toast(res.msg, 'success');
					this.exchangeModel(-1, 'close');
					this.list[exchangeIndex].num = 1;
				}, 'POST', true)
			},
			handleExchangeInput(evt) {
				const remain = this.list[this.exchangeIndex].remain;
				
				if (evt.target.value > remain) return this.$app.toast(`最多兑换${remain}个`);
				
				this.list[this.exchangeIndex].num = evt.target.value;
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
		height: 100%;
		
		.top-enter-wrapper {
		
			.explain-wrapper {
				padding: 10upx 20upx;
				margin: 20upx;
				// box-shadow: 0upx 2upx 4upx rgba(#000, .3);
				border-radius: 30upx;
				background-color: rgba(#FFF, .3);
				justify-content: space-around;
		
				text {
					color: orange;
				}
		
				.icon {
					width: 30upx;
					height: 30upx;
				}
		
		
			}
		}
		.list-item {
			padding: 10upx 20upx;
			background-color: rgba(#FFF, .3);
			border-bottom: 1rpx solid $text-color-10;
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
						margin: 0 0 0 20upx;

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
					
					.action-btn {
						.comment,.ldexchange {
							font-size: 24upx;
						}
					}
				}
			}

			.row-2 {
				font-size: 24upx;
			}
		}
		.exchangeModal {
			width: 95%;
			margin: 10upx auto 10upx auto;
			.intro {
				margin: 0;
				flex-direction: row;
				flex-grow: "wrap";
				.icon {
					width: 100upx;
					height: 100upx;
				}
				.intro-r {
					flex: 1;
					margin-left: 20upx;
					.title,.description {
						width: 100%;
						margin-bottom: 10upx;
					}
					.description {
						font-size: 22upx;
						color: $text-color-2;
					}
					.title {
						display: flex;
						flex-direction: row;
						flex-wrap: wrap;
						.remain{
							width: 100%;
							font-size: 22upx;
							color: $text-color-2;
							image {
								width: 50upx;
								height: 50upx;
								margin-right: 4upx;
							}
							.remain-num {
								margin-left: 10upx;
							}
						}
						.name {
							width: 100%;
						}
					}
				}
			}
			.num {
				// width: 100upx;
				height: 100upx;
				.stone {
					width: 150upx;
					text-align: center;
				}
				.token-stone {
					width: 160upx;
					margin-right: 15upx;
					text-align: center;
				}
				image {
					width: 50upx;
					height: 50upx;
					margin-right: 4upx;
				}
				.token-input {
					flex: 1;
					input {
						background-color: $color_3;
						border-radius: 15upx;
						flex: 1;
						height: 80upx;
						font-size: 40upx;
						text-align: center;
						line-height: 110upx;
						// background-color: rgba(50, 50, 50, .3);
					}
				}
			}
			.submit {
				width: 250upx;
				margin: 0 auto;
				bottom: 20upx;
				display: flex;
				flex-direction: row;
				align-self: flex-end;
			}
			.mTop {
				margin-bottom: 20upx;
			}
		}
	}
</style>

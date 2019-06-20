<template>
	<view class="gift-package-container">
		<view class="count-wrap tips">
			购买的能量礼物不清零
		</view>
		<view class="btn-wrapper">
			<view class="btn" v-for="(item,index) in giftList" :key="index" @tap="change(item)">
				<image class="icon" :src="item.icon" mode="widthFix"></image>
				<view class="self flex-set">{{item.self}}</view>
				<view class="line one flex-set">
					<image class="sicon" src="/static/image/user/b1.png" mode="widthFix"></image>{{item.count}}
				</view>
				<view class="name flex-set">{{item.name}}</view>
				<view class="fee flex-set">
					兑换能量
				</view>
			</view>
		</view>


		<modalComponent v-if="modal == 'change'" title="兑换能量" @closeModal="modal=''">
			<view class="tips-modal-container">
				<view class="text-wrap">
					<view class="img-row">
						<view class="img">
							<image :src="item.icon" mode="widthFix"></image>
						</view>
						<view class="self flex-set">{{item.self}}</view>
						<view class="img">
							<image src="/static/image/user/b1.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="img-row">
						<input type="number" :value="val" @input="setVal" />
						<input disabled type="text" :value="val * item.count" />
					</view>
				</view>

				<view class="mid">→ </view>
				<btnComponent type="css" @tap="recharge()">
					<view class="flex-set" style="width: 180upx;height: 80upx;">兑换</view>
				</btnComponent>
			</view>

		</modalComponent>

	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue'
	export default {
		components: {
			modalComponent,
			btnComponent
		},
		data() {
			return {
				giftList: [],
				modal: '',
				item: {},
				val: 0,
			};
		},
		onLoad() {
			this.getGoodsList()
		},
		methods: {
			recharge() {
				if (!this.val || this.val <= 0 || this.val > this.item.self) {
					this.$app.toast('请输入正确数额')
				} else {
					this.$app.modal(`确认将${this.val}个${this.item.name}兑换成${this.val*this.item.count}能量`, () => {
						this.modal = ''
						this.$app.request('user/recharge', {
							item_id: this.item.id,
							num: this.val,
						}, res => {
							this.$app.toast('兑换成功', 'success')
							this.getGoodsList()
						})
					})
				}
			},
			setVal(e) {
				let val = parseInt(e.detail.value)
				if (val < 0 || val > this.item.self) {
					this.$app.toast('请输入正确数额')
					this.val = 1
				} else {
					this.val = val
				}
			},
			change(item) {
				this.modal = 'change'
				this.item = item
				this.val = 1
			},
			getGoodsList() {
				this.$app.request('page/gift_package', {}, res => {
					this.giftList = res.data.itemList
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.gift-package-container {
		padding-top: 50upx;

		.row {
			position: relative;
			height: 115upx;
			margin: 0 40upx;
			margin-top: 20upx;
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
			margin: 0 40upx;
			line-height: 100upx;
		}

		.count-wrap.tips {
			margin: 0 40upx;
			padding-top: 20upx;
			line-height: 1.6;
		}

		.btn-wrapper {
			display: flex;
			flex-wrap: wrap;
			background-color: #fac7cc;
			margin: 0 40upx;
			margin-bottom: 20upx;
			justify-content: center;
			padding: 8upx;

			.btn {
				background-color: #FFF;
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

				.self {
					display: flex;
					align-items: center;
					position: absolute;
					border-radius: 20upx;
					right: 23upx;
					padding: 0 10upx;
					top: 36upx;
					font-size: 26upx;
					color: #FFF;
					background-color: rgba(120, 120, 120, .3);
					z-index: 2;

				}

				.name {
					width: 125upx;
					color: #fa5e86;
					border-bottom: 2upx solid #fac7cc;
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
					color: #666;

					.sicon {
						width: 25upx;
					}
				}

				.fee {
					background-color: #fac7cc;
					border-radius: 10upx;
					box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
					color: #FFF;
					font-weight: 700;
					padding: 10upx 20upx;
				}
			}

		}

		.tips-modal-container {
			height: 100%;
			padding: 40upx;
			font-size: 32upx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			position: relative;

			.text-wrap {
				position: relative;

				.img-row {
					display: flex;
					justify-content: space-around;
					align-items: center;
					margin: 40upx 0;

					.self {
						display: flex;
						align-items: center;
						position: absolute;
						border-radius: 20upx;
						left: 172upx;
						padding: 0 10upx;
						top: 47upx;
						font-size: 26upx;
						color: #FFF;
						background-color: rgba(120, 120, 120, .3);
						z-index: 2;


					}

					input {
						background-color: #FFF;
						margin: 20upx 40upx;
						border-radius: 10upx;
						height: 36upx;
						line-height: 36upx;
						font-size: 36upx;
						text-align: center;
					}

					.img {
						width: 160upx;
						height: 160upx;
						padding: 20upx;
						border-radius: 50%;
						background-color: rgba(255, 255, 255, .3);
					}
				}

			}

			.mid {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: 200upx;
				font-size: 60upx;
			}

			.btn {
				width: 200upx;
			}
		}
	}
</style>

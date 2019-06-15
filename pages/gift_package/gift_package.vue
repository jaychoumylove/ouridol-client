<template>
	<view class="gift-package-container">
		<view class="count-wrap tips">
			购买的能量礼物不清零
		</view>
		<view class="btn-wrapper">
			<view class="btn" v-for="(item,index) in giftList" :key="index" @tap="payment(item.id)">
				<image class="icon" :src="item.icon" mode="widthFix"></image>
				<view class="line one flex-set">
					<image class="sicon" src="/static/image/user/b1.png" mode="widthFix"></image>{{item.count}}
				</view>
				<view class="name flex-set">{{item.name}}</view>
				<view class="fee flex-set">
					x {{item.self}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				giftList: [],

			};
		},
		onLoad() {
			this.getGoodsList()

		},
		methods: {
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
					width: 125upx;
					background-color: #fac7cc;
					border-radius: 5upx;
					color: #FFF;
					font-weight: 700;

				}
			}

		}


	}
</style>

<template>
	<view class="signin-container">

		<view class="main-container">
			<view class="top-container flex-set">
				<image class="top-img" src="/static/image/guild/card-c.png" mode=""></image>
				<view class="text">{{signin_coin?'签到成功':'今日已签到'}}</view>
				<view v-if="signin_coin" class="coin flex-set">+{{signin_coin}}
					<image src="/static/image/user/b1.png" mode="widthFix"></image>
				</view>
			</view>

			<view class="section-container">
				<view class="row r-1">
					<view v-for="(item,index) in siginList" :key="index">+{{item.coin}}</view>
				</view>
				<view class="row line">
					<view class="ball" v-for="(item,index) in siginList" :key="index" :class="{active:index+1<=signin_day}"></view>
				</view>

				<view class="row r-3">
					<view v-for="(item,index) in siginList" :key="index">{{item.days}}天</view>
				</view>
			</view>
			<view class="tips">您已累计连续签到{{signin_day}}天，坚持累计签到可获得更多能量</view>
			<btnComponent type="css">
				<view class="flex-set" @tap="$app.goPage('/pages/recharge/recharge')" style="width: 160upx;height: 80upx;">更多能量</view>
			</btnComponent>
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
				siginList: [],
				signin_day: 1,
				signin_coin: 0,
			};
		},
		onLoad() {
			let timeId = setInterval(() => {
				if (this.$app.getData('token')) {
					clearInterval(timeId)
					this.getSignin()
				}

			}, 300)
		},
		methods: {
			getSignin() {

				this.$app.request(this.$app.API.USER_SIGNIN, {}, res => {
					this.siginList = res.data.cfg
					this.signin_day = res.data.signin_day
					if (res.data.coin) {
						this.signin_coin = res.data.coin

						this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
							this.$app.setData('userCurrency', res.data)
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.signin-container {
		height: 100%;
		padding-top: 100upx;

		.main-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 600upx;
			height: 600upx;
			margin: auto;
			background-color: #FFF;
			box-shadow: 0 10upx 20upx rgba(#000, 0.3);
			border-radius: 30upx;
			overflow: hidden;

			.top-container {
				width: 100%;
				height: 260upx;
				background-color: rgba(#ffd1b2, 0.3);
				text-align: center;
				flex-direction: column;
				justify-content: space-around;
				padding: 30upx;

				.top-img {
					width: 80upx;
					height: 80upx;
				}

				.text {
					font-size: 32upx;
					font-weight: 700;
				}

				.coin {
					image {
						width: 30upx;
						min-height: 30upx;
					}
				}
			}

			.section-container {
				margin: 20upx 0;
				width: 100%;

				.row {
					position: relative;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin: 10upx 60upx;

					.ball {
						width: 16upx;
						height: 16upx;
						border-radius: 50%;
						background-color: #DDD;
					}

					.ball.active {
						position: relative;
						background-color: #ece3e4;
						width: 30upx;
						height: 30upx;
					}

					.ball.active::before {
						content: "";
						position: absolute;
						border-radius: 50%;
						background-color: #FF9700;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						width: 16upx;
						height: 16upx;
					}
				}

				.row.r-1 {
					margin: 10upx 30upx;
				}

				.row.r-3 {
					margin: 10upx 40upx;
				}

				.row.line::before {
					content: "";
					position: absolute;
					width: 100%;
					border-top: 1px solid #DDD;
					top: 50%;
					transform: translateY(-50%);
				}
			}

			.tips {
				font-size: 22upx;
				color: #888;
				margin-bottom: 20upx;
			}
		}
	}
</style>

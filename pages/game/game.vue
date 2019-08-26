<template>
	<view class="game-container">
		<block v-for="(item,index) in list" :key="index">
			<!-- 微信广告 -->
			<view class="item-wrap ad" v-if="item.type == 0" @tap.capture='openGame(item)'>
				<ad :unit-id="item.appid"></ad>
			</view>
			<!-- APP广告 -->
			<view class="item-wrap" v-else>
				<image class="img" :src="item.img_s" mode="aspectFill"></image>
				<view class="text">
					<view class="big text-overflow">{{item.name}}</view>
					<view class="small text-overflow">{{item.desc}}</view>
				</view>
				<view class="btn flex-set" @tap="openGame(item)">{{item.button}}</view>
			</view>
		</block>
	</view>
</template>

<script>
	const time = 15
	export default {
		data() {
			return {
				list: [],
			};
		},
		onLoad(option) {
			// type == '1' 无奖励
			this.type = option.type || 0
			this.loadData()
			if (this.type != '1') this.$app.toast('请点击游戏进行试玩' + time + '秒以上', 'none', 3000)
			this.$app.openInterstitialAd()
		},
		onShow() {
			if (this.openTime && this.type != '1') {
				if (Date.now() - this.openTime >= time * 1000) {
					// 已完成
					this.$app.request(this.$app.API.TASK_SETTLE, {
						task_id: 25
					}, res => {
						let toast = ''
						if (res.data.coin) toast += '能量+' + res.data.coin
						if (res.data.stone) toast += '灵丹+' + res.data.stone
						if (res.data.trumpet) toast += '喇叭+' + res.data.trumpet
						this.$app.toast(toast)

						let gameCheck = this.$app.getData('gameCheck') || {}
						gameCheck[this.openAdId] = (new Date()).toLocaleDateString()
						this.$app.setData('gameCheck', gameCheck)
						this.loadData()
					})
				} else {
					this.$app.toast('未完成游戏试玩，请试玩至少' + time + '秒')
				}
				this.openTime = 0
			}
		},
		methods: {
			// 点击广告
			openGame(item) {
				this.openTime = Date.now()
				this.openAdId = item.id
				if (item.type != 0) {
					if (item.appid) {
						uni.navigateToMiniProgram({
							appId: item.appid,
							path: item.path,
						})
					} else if (item.img_l) {
						uni.previewImage({
							urls: [item.img_l],
						});
					}
				}
			},
			loadData() {
				this.$app.request('page/game', {
					type: this.type
				}, res => {
					const gameCheck = this.$app.getData('gameCheck')

					const resList = []
					for (let key in res.data) {
						const value = res.data[key]

						if (gameCheck[value.id] != (new Date()).toLocaleDateString() || this.type == '1') {
							resList.push(value)
						}
					}

					this.list = resList
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.game-container {
		padding: 20upx;

		.item-wrap {
			margin-bottom: 20upx;
			padding: 20upx;
			background-color: rgba(#FFF, 0.3);
			display: flex;
			align-items: center;

			.img {
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
			}

			.text {
				width: 345upx;
				height: 100%;
				margin: 0 20upx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.big {
					font-size: 40upx;
				}
			}

			.btn {
				background: linear-gradient(to bottom, #ff7f94, #ff6684);
				border-radius: 10upx;
				color: #FFF;
				text-align: center;

				width: 140upx;
				height: 70upx;
			}
		}

		.item-wrap.ad {
			padding: 0;
		}
	}
</style>

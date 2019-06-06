<template>
	<view class="father-container">
		

		<view class="top-container">
			<image class="avatar" :src="userInfo.avatarurl" mode="aspectFill"></image>

			<view class="text-wrapper text-overflow left">
				<view class="row-wrapper flex-set">
					{{userInfo.nickname}}
				</view>
				<view class="row-wrapper flex-set s">
					<image src="/static/image/guild/ft-1.png" mode="widthFix"></image> 徒弟人数：{{sonTotal}}
				</view>
				<view class="row-wrapper flex-set s">
					<image src="/static/image/guild/ft-2.png" mode="widthFix"></image> 今日收益：{{todayTotal}}
				</view>
			</view>
			<view class="text-wrapper btn">
				<button open-type="share" data-share="3">
					<image class="big" src="/static/image/guild/ft-3.png" mode="widthFix"></image>
					<view class="text">收徒</view>
				</button>

			</view>
		</view>

		<view class="explain-container flex-set">
			<image :src="$app.getData('config').father_tips_img" mode="widthFix"></image>
		</view>

		<view class="rank-list-container" v-if="sonList && sonList.length>0">

			<view class="item" v-for="(item,index) in sonList" :key="index">
				<view class="rank-num">
					<image v-if="index<3" :src="'/static/image/guild/'+(index+1)+'.png'" mode="widthFix"></image>
					<view v-else>{{index+1}}</view>
				</view>
				<view class='avatar'>
					<image :src="item.avatarurl" mode="aspectFill"></image>

				</view>

				<view class="text-container">
					<view class="star-name text-overflow">{{item.nickname}}</view>
					<view class="bottom-text">
						<view class="hot-count" v-if="item.cur_contribute">贡献{{item.cur_contribute}}</view>
					</view>
				</view>
				<view class="add-count flex-set" v-if="item.earn">
					<text>+{{item.earn}}</text>
					<image src="/static/image/user/b1.png" mode="widthFix"></image>
				</view>

				<view class="btn" @tap="getSonEarn(item.uid,item.earn,index)">
					<btnComponent type="default">
						<view class="flex-set" style="width: 130upx;height: 65upx;">领取</view>
					</btnComponent>
				</view>
			</view>

		</view>
		<view class="nodata flex-set" v-else>
			<view class="top">你还没有徒弟</view>
			<button open-type="share" data-share="3">
				<view class="bottom">收一个徒弟></view>
			</button>
		</view>

	</view>
</template>

<script>
	import btnComponent from '@/components/btnComponent.vue';
	export default {
		components: {
			btnComponent
		},
		data() {
			return {
				requestCount: 1,

				sonTotal: 0,
				todayTotal: 0,
				sonList: [],
				userInfo: {
					avatarurl: this.$app.getData('userInfo')['avatarurl'] || this.$app.AVATAR,
					nickname: this.$app.getData('userInfo')['nickname'] || this.$app.NICKNAME,
					id: this.$app.getData('userInfo')['id'] || null,
				},
			};
		},
		onLoad() {
			this.getFatherInfo()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			getSonEarn(uid, earn,index) {
				if (!earn) {
					this.$app.toast('TA的收益太少了')
				} else {
					this.$app.request(this.$app.API.USER_SONEARN, {
						user_id: uid
					}, res => {
						this.sonList[index].earn = 0
						this.$app.toast('获得收益+' + res.data + '能量')
						this.getFatherInfo()
						this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
							this.$app.setData('userCurrency', res.data)
						})
					}, 'POST', true)
				}

			},

			getFatherInfo() {
				this.$app.request(this.$app.API.USER_FATHER, {
					type: 2
				}, res => {
					const resList = []
					this.todayTotal = res.data.earn

					for (let v of res.data.list) {
						resList.push({
							uid: v.user && v.user.id,
							avatarurl: v.user && v.user.avatarurl || this.$app.AVATAR,
							nickname: v.user && v.user.nickname || this.$app.NICKNAME,
							cur_contribute: v.cur_contribute,
							earn: v.user_earn,
						})
					}

					this.sonTotal = resList.length
					this.sonList = resList

					this.$app.closeLoading(this)
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.father-container {
		.top-container {
			padding: 40upx 60upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.avatar {
				position: relative;
				overflow: hidden;
				border-radius: 50%;
				width: 150upx;
				height: 150upx;
			}

			.text-wrapper {
				line-height: 1.5;

				.row-wrapper {
					justify-content: flex-start;
					font-size: 34upx;

					image {
						width: 30upx;
						margin-right: 10upx;
					}
				}

				.row-wrapper.s {
					font-size: 26upx;
				}

			}

			.text-wrapper.left {
				margin-left: -50upx;
			}

			.text-wrapper.btn {
				position: relative;

				button {
					display: flex;
					align-items: center;
				}

				image {
					width: 80upx;
				}

				.text {
					font-weight: 700;
					font-size: 40upx;
					padding-left: 10upx;
				}
			}
		}

		.explain-container {
			background-color: $color_3;
			font-size: 24upx;
		}

		.rank-list-container {
			padding: 10upx 0;

			.item {
				display: flex;
				align-items: center;
				padding: 15upx 0;
				background-color: rgba(255, 255, 255, .3);
				margin: 10upx 0;

				.rank-num {
					width: 90upx;
					text-align: center;

					image {
						width: 40upx;
					}
				}

				.avatar image {
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
				}

				.text-container {
					margin-left: 20upx;
					line-height: 1.5;
					width: 200upx;

					.bottom-text {
						display: flex;
						align-items: center;

						.hot-count {
							color: $color_2;
							margin-right: 4upx;
							font-size: 24upx;
						}
					}
				}

				.add-count {
					image {
						width: 36upx;
					}
				}

				.btn {
					font-size: 26upx;
					position: absolute;
					right: 40upx;
				}
			}
		}

		.nodata {
			height: 400upx;
			flex-direction: column;

			.bottom {
				color: $color_2;
				font-size: 40upx;
			}

		}
	}
</style>

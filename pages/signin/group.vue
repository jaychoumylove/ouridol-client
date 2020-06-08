<template>
	<view class="group-container">

		<view class="top-container">
			<view class="top-wrap flex-set">
				<view class="title">群集结动态</view>
				<btnComponent type="default">
					<button open-type="share" data-share="7">
						<view class="" style="padding: 10upx 30upx;">发起群集结</view>
					</button>
				</btnComponent>
			</view>

			<view class="scroll-wrap">
				<view class="scroll" :style="{transform:dynamic_translate}">
					<view class="scroll-item" v-for="(item,index) in dynamic" :key="index">
						<view class="item">
							<image src="/static/image/user/b3.png" mode=""></image>
							<text class="name">{{item.user_name}}</text>
							<text>{{item.text}}</text>
						</view>
					</view>
				</view>
			</view>

		</view>
		<view class="mid-container">
			<view class="top-wrap flex-set">
				<view class="left">
					<view class="t title">群贡献日榜</view>
					<view class="b">粉丝群每日打榜贡献前10名</view>
				</view>

				<view class="right" v-if="reback_open">
					<btnComponent v-if="daycount_reback" type="css">
						<view @tap="getReback" style="padding: 10upx 20upx;">领取昨日贡献奖励</view>
					</btnComponent>
					<btnComponent v-else type="disable">
						<view style="padding: 10upx 20upx;">领取昨日贡献奖励</view>
					</btnComponent>
				</view>
			</view>

			<view class="list-container">

				<view class="item" v-for="(item,index) in groupRank" :key="index">
					<view class="top flex-set">
						<image v-if="index==0" class="icon" src="/static/image/guild/u1.png" mode=""></image>
						<image v-else-if="index==1" class="icon" src="/static/image/guild/u2.png" mode=""></image>
						<image v-else-if="index==2" class="icon" src="/static/image/guild/u3.png" mode=""></image>
						<view v-else class="icon flex-set">{{index+1}}</view>
						{{item.star.name}}的粉丝群{{item.id}}群

					</view>
					<view class="bottom flex-set">
						<view class="left flex-set">
							<image class="ava-1" :src="item.userRank[0].user.avatarurl" mode=""></image>
							<image class="ava-2" :src="item.userRank[1].user.avatarurl" mode=""></image>
							<image class="ava-3" :src="item.userRank[2].user.avatarurl" mode=""></image>
							<image class="ava-4" :src="item.userRank[3].user.avatarurl" mode=""></image>
							<image class="ava-5" :src="item.userRank[4].user.avatarurl" mode=""></image>

							<view class="b">共{{item.member_count}}位</view>
						</view>
						<view class="">贡献{{item.thisday_count}}能量</view>

					</view>
				</view>
			</view>


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
				dynamic: null, // 集结动态
				dynamic_translate: 'translateY(0)',

				groupRank: [], // 群排名
				reback_open: false, // 昨日贡献奖励开启
				daycount_reback: 0, // 昨日贡献回馈奖励
			};
		},
		onShow() {
			this.loadData()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			getReback() {
				this.$app.request('share/group/groupDayReback', {}, res => {
					this.$app.toast('能量+' + res.data.reback)
					this.loadData()
				}, 'POST', true)
			},
			loadData() {
				this.$app.request('page/wxgroup', {}, res => {

					if (!this.dynamic) {
						this.dynamic = res.data.dynamic

						// 动态滚动
						let index = 0
						let len = this.dynamic.length
						clearInterval(this.timeId_dynamic)
						this.timeId_dynamic = setInterval(() => {
							this.dynamic_translate = 'translateY(-' + index / len * 100 + '%)'
							if (++index >= len - 2) {
								clearInterval(this.timeId_dynamic)
							}
						}, 5000)
					}
					// 群排名
					this.groupRank = res.data.groupList
					// 贡献奖励
					if (this.$app.getTime() > this.$app.getData('config').groupmass.reback_open[0] &&
						this.$app.getTime() < this.$app.getData('config').groupmass.reback_open[1]) {
						this.reback_open = true
						this.daycount_reback = res.data.reback
					}

				})
			},
		}
	}
</script>

<style lang="scss">
	.group-container {

		.top-container {
			margin: 30upx;
			background-color: #FFF;
			border-radius: 10upx;
			padding: 20upx 30upx;
			box-shadow: 0 2upx 16upx rgba(#666, .3);
			position: relative;
			z-index: 1;

			.top-wrap {
				font-size: 32upx;
				justify-content: space-between;
			}

			.scroll-wrap {
				height: 150upx;
				overflow: hidden;
				position: relative;

				.scroll {
					position: absolute;
					transition: .8s;

					.scroll-item {
						margin: 10upx 0;

						.item {
							font-size: 22upx;
							padding: 5upx 10upx;
							display: inline-block;
							background-color: #f5f5f5;
							border-radius: 20upx;
							color: #676767;

							image {
								width: 24upx;
								height: 24upx;
							}

							.name {
								color: #fe5d63;
							}
						}
					}
				}

			}
		}

		.mid-container {
			padding: 20upx 30upx;
			background-color: #FFF;
			padding-top: 80upx;
			margin-top: -80upx;

			.top-wrap {
				justify-content: space-between;

				.left {
					.t {
						font-size: 32upx;
					}

					.b {
						font-size: 22upx;
						color: #868686;
					}
				}
			}

			.list-container {
				.item {
					padding: 20upx 0;
					border-bottom: 1upx solid #EEE;

					.top {
						font-size: 32upx;
						margin: 10upx;
						justify-content: flex-start;

						.icon {
							width: 36upx;
							height: 36upx;
							margin-right: 10upx;
						}
					}

					.bottom {
						justify-content: space-between;

						.left {
							image {
								width: 50upx;
								height: 50upx;
								border-radius: 50%;
							}

							.ava-1 {
								z-index: 5;
							}

							.ava-2 {
								z-index: 4;
								margin-left: -20upx;
							}

							.ava-3 {
								z-index: 3;
								margin-left: -20upx;
							}

							.ava-4 {
								z-index: 2;
								margin-left: -20upx;
							}

							.ava-5 {
								z-index: 1;
								margin-left: -20upx;
							}

							.b {
								margin-left: 10upx;
								color: #868686;
							}
						}
					}
				}
			}
		}
	}
</style>

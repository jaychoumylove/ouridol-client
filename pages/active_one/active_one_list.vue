<template>
	<view class="active_one-container">
		<view class="top-container">

			<image class="avatar" :src="star.head_img_l" mode="aspectFill"></image>
			<view class="rank"><text>NO.{{star.star_rank.week_hot_rank||''}}{{star.name||''}}</text><text>本周人气值{{star.star_rank.week_hot||''}}</text></view>
		</view>

		<view class="active-center-container" @tap="goPage(item.id)" :class="{red:item.category==1}" v-for="(item,index) in activeList"
		 :key="index">
			<view class="top-wrap">
				<view class="left">
					<view class="left-1">为爱解锁</view>
					<view class="left-2">剩余：{{item.left_time}}</view>
				</view>

				<view class="right">
					<view class="t">为爱解锁</view>
				</view>
			</view>

			<view class="progress-wrap">
				<image class="title-img" :src="item.title_img" mode="widthFix"></image>
				<view class="title">{{item.title.replace('STARNAME', star.name)}}</view>
				<view class="progress">
					<progress activeColor="#ff8689" stroke-width="10" backgroundColor="#dedede" :percent="item.progress.join_people/item.target_people*100" />
					<text style="color:#ff8689;">参与人数{{item.progress.join_people||0}}</text>
				</view>
				<view class="progress">
					<progress activeColor="#fabd72" stroke-width="10" backgroundColor="#dedede" :percent="item.progress.complete_people/item.target_people*100" />
					<text style="color:#fabd72;">完成人数{{item.progress.complete_people||0}}</text>
				</view>
				<view class="bottom-text">
					<view>目标人数：<text>{{item.target_people}}</text></view>
					<!-- <view>已参与人数：<text style="color:#007EFF;">{{item.progress.join_people}}</text></view> -->
					<view>已完成人数：<text>{{item.progress.complete_people||0}}</text></view>
					<view>还需人数：<text>{{item.progress.complete_people?item.target_people - item.progress.complete_people:item.target_people}}</text></view>
				</view>

			</view>
			<block v-if="index!=0">
				<image class="connect-img" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HUWa4ibYRGeP9Kkz6Vd4icsiaTVLxVGdoicAkC8pq5oFl8zyiaxMvMHSMKRflJbticV3LEpSjugOUyicDhw/0"
				 mode="aspectFill"></image>
			</block>
		</view>


	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue';
	export default {
		components: {
			modalComponent,
			btnComponent
		},
		data() {
			return {
				activeList: [],
				star: {},

			};
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(5)
		},

		onShow(option) {
			this.loadData()
			this.getStarInfo()
		},
		methods: {
			getStarInfo() {
				this.$app.request(this.$app.API.STAR_INFO, {
					starid: this.$app.getData('userStar').id
				}, res => {
					this.star = res.data
					uni.setNavigationBarTitle({
						title: this.star.name
					})
				})
			},
			goPage(id) {
				this.$app.goPage('/pages/active_one/active_one?id=' + id)
			},
			loadData() {
				this.$app.request('active/list', {
					starid: this.$app.getData('userStar').id
				}, res => {
					for (let key in res.data) {
						let left_time = this.$app.timeGethms(res.data[key].active_end)
						res.data[key].left_time = left_time.day + '天' + left_time.hour + '小时' + left_time.min + '分'
					}

					this.activeList = res.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped="">
	.active_one-container {
		padding: 20upx;

		.top-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #333;

			.top-btn-wrap {
				display: flex;
				width: 100%;
				justify-content: space-between;
				padding: 0 10upx;

				.btn {
					font-size: 32upx;
					font-weight: 700;
				}
			}

			.avatar {
				overflow: hidden;
				height: 300upx;
				border-radius: 20upx;
			}

			.nickname {
				font-size: 32upx;
				font-weight: 700;
			}

			.rank {
				padding-top: 14upx;
				font-size: 30upx;
				font-weight: 700;
				
				text {
					margin: 0 20upx;
				}
			}
		}

		.cardday {
			text-align: center;
			margin: 20upx;

			text {
				background-color: $color_2;
				border-radius: 10upx;
				color: #FFF;
				width: 40upx;
				display: inline-block;
				margin: 0 2upx;
			}
		}

		.active-center-container {
			border-radius: 30upx;
			margin: 20upx 0 40upx;
			background-color: #fff;
			box-shadow: 0 2upx 16upx rgba(#999, .3);
			position: relative;
			padding-bottom: 20upx;

			.top-wrap {
				border-top-left-radius: 30upx;
				border-top-right-radius: 30upx;
				background: linear-gradient(to right, #ff665e, #fdb673);
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #fff;
				padding-top: 40upx;

				.left {
					display: flex;
					align-items: center;

					.left-1 {
						padding-left: 40upx;
						padding-right: 20upx;
						font-weight: 700;
					}

					.left-2 {
						padding: 20upx;
						font-size: 24upx;
					}
				}

				.right {
					background-color: rgba(#fff, .3);
					border-radius: 40upx;
					padding: 10upx 20upx;
					margin-right: 20upx;
				}
			}

			.progress-wrap {
				padding: 30upx;
				padding-top: 0;
				color: #666;
				text-align: center;

				.title-img {
					width: 500upx;
				}

				.title {
					font-size: 28upx;
				}

				.progress {
					margin: 14upx 0;
					display: flex;
					align-items: center;

					progress {
						flex: 1;
						border-radius: 60upx;
						overflow: hidden;
						margin-right: 20upx;
					}

					text {
						border-radius: 30upx;
						padding: 0 10upx;
						width: 180upx;
						text-align: center;
					}
				}

				.bottom-text {
					display: flex;
					justify-content: space-between;
				}
			}

			.progress-wrap.small {
				transform: scale(0.8);
			}



			.connect-img {
				width: 100%;
				height: 152upx;
				position: absolute;
				top: -92upx;
				z-index: 1;
			}

		}

		.active-center-container.red {
			.top-wrap {
				background: linear-gradient(to right, #f856ae, #f33e7e);
			}
		}

		.rank-list-container {
			margin-top: 40upx;

			.title {
				border-top-left-radius: 30upx;
				border-top-right-radius: 30upx;
				height: 90upx;
				display: flex;
				align-items: center;
				background-color: #ff8195;
				font-weight: 700;
				padding: 0 40upx;
				color: #FFF;
			}

			.scroll-view {
				.item-wrap {
					min-height: 80upx;
					display: flex;
					position: relative;
					background-color: #fbdedb;
					padding: 10upx 40upx;

					.avatar {
						width: 100upx;
						height: 100upx;
						border-radius: 50%;
					}

					.text-wrap {
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						padding: 0 40upx;
						width: 350upx;

						.name {}

						.card {
							color: #db7979;
							font-size: 24upx;
						}

						.progress {
							border-radius: 30upx;
							overflow: hidden;
						}
					}

					.rank {
						width: 70upx;
						height: 70upx;
						position: absolute;
						right: 40upx;
						top: 50%;
						transform: translateY(-50%);
						border-radius: 50%;
						color: #FFF;
						background-color: #b90504;
						font-size: 32upx;

					}
				}
			}
		}

		.modal-container {
			flex-direction: column;
			height: 100%;

			.progress-wrap {
				background-color: transparent;
				border-radius: 10upx;
				box-shadow: 0 2upx 8upx rgba(#000, .3);
			}

			.complete {
				width: 120upx;
				height: 120upx;
			}

			.title {
				font-weight: 700;
				margin-top: 30upx;
				font-size: 34upx;
			}

			.text {
				padding: 60upx;
				font-size: 32upx;
				line-height: 1.6;

			}
		}

		.modal-container {
			border-top-left-radius: 20upx;
			border-top-right-radius: 20upx;
			overflow: hidden;
			flex-direction: column;
			justify-content: flex-start;
			height: 100%;

			.top-wrap {
				display: flex;
				flex-direction: column;
				align-items: center;
				// background-color: $color_0;
				width: 100%;
				line-height: 2;
				font-size: 32upx;

				.avatar {
					width: 140upx;
					height: 140upx;
					border-radius: 50%;
					margin: 30upx 0;
				}
			}

			.milestone-container {
				padding: 0 20upx;
				width: 100%;
				transform: scale(0.8);
			}

			.user-list {
				width: 100%;

				.user-list-avatar {
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
					margin: 20upx;
				}
			}

			.btn-wrap {
				margin-top: 40upx;
				margin-bottom: 40upx;
				display: flex;
				justify-content: space-around;
				width: 100%;
				padding: 0 60upx;

				.fsend-btn {
					// background-color: #0EC52F;
					// font-size: 32upx;
					color: #333;
					padding: 0 20upx;
					flex-direction: column;

					image {
						width: 80upx;
						height: 80upx;
					}
				}

				.save-btn {
					background-color: #FF7E00;
					border-radius: 10upx;
					font-size: 32upx;
					color: #FFF;
					padding: 0 20upx;
				}
			}

		}

		.canvas-container {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 9;
			background-color: rgba(0, 0, 0, .9);
			flex-direction: column;

			.canvas {
				width: 480upx;
				height: 854upx;
			}

			.close-btn {
				position: absolute;
				width: 80upx;
				height: 80upx;
				z-index: 99;
				border-radius: 50%;
				// background-color: rgba(0, 0, 0, .5);
				color: #FFF;
				font-size: 45upx;
				right: 20upx;
				top: 20upx;
			}

			.wrapper {
				width: 540upx;
				height: 960upx;
				padding: 40upx;
				flex-direction: column;
				background-color: #FFF;

				image {
					width: 100%;
					flex: 1;
				}

				.btn {
					margin-top: 40upx;
					width: 100%;
					height: 150upx;
					text-align: center;
					padding: 20upx;
					font-size: 40upx;
					color: #FFF;
					box-shadow: 0 1px 2px rgba(#000, 0.6);
					background-color: #ff648c;
					border-radius: 20upx;
				}
			}

			.btn-wrap {
				margin-top: 20upx;
				display: flex;
				justify-content: space-around;
				width: 100%;
				padding: 0 60upx;

				.fsend-btn {
					// background-color: #0EC52F;
					font-size: 32upx;
					color: #FFF;
					padding: 0 20upx;
					flex-direction: column;

					image {
						width: 80upx;
						height: 80upx;
					}
				}

				.save-btn {
					background-color: #FF7E00;
					border-radius: 10upx;
					font-size: 32upx;
					color: #FFF;
					padding: 0 20upx;
				}
			}
		}

		.canvas {
			width: 480upx;
			height: 854upx;
			position: fixed;
			z-index: -1;
			left: -100%;
		}
	}
</style>

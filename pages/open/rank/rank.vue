<template>
	<view class="rank-container">
		<view class="fixed-btn">
			<btnComponent type="css">
				<view class="flex-set" style="width: 200upx;height: 65upx;" @tap="$app.goPage('/pages/open/upload/upload')">我要上传</view>
			</btnComponent>
		</view>
		<!-- 今日开屏图 -->
		<view class="top-wrap" v-if="yestoday.starname">
			<view class="left">
				<image :src="yestoday.open_img" mode="aspectFill" class='img'></image>
			</view>

			<view class="right">
				<view class="title">今日开屏偶像</view>
				<view class="title" style="font-size: 45upx;font-weight: 700;">{{yestoday.starname}}</view>
				<view class="" style="margin-top: 40upx;">助力开屏贡献排行榜</view>
				<view class="list-wrap">
					<view class="item flex-set" v-for="(item,index) in yestoday.user_rank" :key="index">
						<view class="rank">{{index+1}}</view>
						<image class="avatar" :src="item.user.avatarurl" mode=""></image>
						<view class="nickname text-overflow">{{item.user.nickname}}</view>
						<view class="">{{item.count}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="space-line flex-set" style="margin: 20upx;">—— 明日({{yestoday.tomorrow}})备选区 ——</view>

		<view class="list-container">
			<view class="item" v-for="(item,index) in list" :key="index">
				<image class="img" :src="item.img_url" mode="aspectFill" @tap="goPage('/pages/open/userRank/userRank?oid='+item.id)"></image>
				<view class="content">
					<view class="text flex-set">
						<text style="max-width: 150upx; color: #5F6176;" class='text-overflow'>{{item.star.name}}</text>
						<btnComponent type="css">
							<view class="flex-set" style="width: 160upx;height: 60upx;" @tap="preSend(item)">助力开屏</view>
						</btnComponent>
					</view>

					<view>礼物能量 <text style='color:#FF5174'>{{item.hot}}</text></view>
				</view>
			</view>


		</view>

		<!-- modal -->
		<modalComponent type="send" v-if="modal == 'send'" title="打榜" @closeModal="modal=''">
			<view class="send-modal-container">
				<view class="swiper-item">

					<view class="wrap">

						<view class="btn-wrapper gift-s">
							<!-- 礼物列表 -->
							<view v-for="(item,index) in itemList" :key="index" class="gift-item flex-set" @tap="sendHot(item.id, 1)">
								<view class="num">
									<image src="/static/image/user/b1.png" mode="widthFix"></image>
									{{item.count}}
								</view>
								<image :src="item.icon" mode="widthFix"></image>
								<view class="name">{{item.name}}</view>
								<view class="self flex-set" :class="{red:item.self>0}">{{item.self}}</view>
							</view>
						</view>

					</view>

				</view>
				<block v-if="$app.getData('VERSION')!=$app.getData('config').version">
					<view class="gift flex-set" @tap="$app.goPage('/pages/recharge/recharge')" v-if="$app.chargeSwitch()==0">
						<image src="/static/image/user/gift.png" mode="widthFix"></image>
						<view class="text">购买礼物补充能量</view>
					</view>
					<button open-type="contact" class="gift flex-set" v-if="$app.chargeSwitch()==2">
						<image src="/static/image/user/gift.png" mode="widthFix"></image>
						<view class="text">购买礼物补充能量回复"1"</view>
					</button>
				</block>
			</view>
		</modalComponent>
		
		<!--送礼物后福袋-->
		<modalComponent v-if="modal == 'sendFudai'" title="福袋" @closeModal="modal=''">
			<view class="tips-modal-container hongbao">
				<view class="text-wrap">
					<image class="avatar" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HhvlXURtbJbFvRVwdINYhHcI1krgG784vHafRPrqpicP7KKTbav91rJF5ibqKPcPEV5zp3oUhRyicZg/0"
					 mode=""></image>
					<view class="title">恭喜获得【能量福袋】</view>
					<view class="text flex-set">共<text style="color:#FF5174;">{{sendFudaiInfo.coin}}能量</text>，
						<text style="color:#ffaa00;">{{sendFudaiInfo.people}}人</text>瓜分</view>
					<view class="tips">将福袋分享到不同的群，让更多的人来领取吧</view>
				</view>
				<view class="row flex-set">
					<btnComponent type="css">
						<button class="btn" open-type="share" data-share="10" :data-otherparam="'id=' + sendFudaiInfo.referrer">
							<view class="flex-set" style="width:400upx;height: 100upx;font-weight: 700;font-size: 34upx;">立即分享</view>
						</button>
					</btnComponent>
				</view>
				<view class="text-wrap">
					<view class="tips">福袋有效时间24小时，24小时候消失</view>
				</view>
			</view>
		</modalComponent>
	</view>
</template>

<script>
	import btnComponent from '@/components/btnComponent.vue'
	import modalComponent from '@/components/modalComponent.vue'
	export default {
		components: {
			btnComponent,
			modalComponent,
		},
		data() {
			return {
				modal: '',
				list: [],
				page: 1,
				itemList: [], // 礼物列表
				yestoday: {
					tomorrow: ''
				}, // 昨日榜首
				sendFudaiInfo: {
					referrer: -1,
					coin: 0,
					people: 0
				}
			};
		},
		onShow() {
			this.loadData()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			const otherparam = e.target && e.target.dataset.otherparam
			return this.$app.commonShareAppMessage(shareType, otherparam)
		},
		onReachBottom() {
			this.page++
			this.loadData()
		},
		methods: {
			goPage(url) {
				this.$app.goPage(url)
			},
			sendHot(count, type = 0) {
				if (count) this.sendCount = count
				if (!parseInt(this.sendCount)) {
					this.$app.toast('数额不正确')
					return
				}

				this.$app.request(this.$app.API.STAR_SENDHOT, {
					starid: this.item.star_id,
					open_id: this.item.id,
					// 如果送的是礼物，hot为item_id
					hot: parseInt(this.sendCount),
					type: type,
				}, res => {
					if (res.data.nomore) {
						if (~this.$app.getData('sysInfo').system.indexOf('iOS')) {
							this.$app.toast(res.msg)
						} else {
							uni.showModal({
								title: '提示',
								content: res.msg,
								confirmText: '去购买',
								success: res => {
									res.confirm && this.$app.goPage('/pages/recharge/recharge')
								}
							})
						}
						return
					}
					let fudai = res.data.fudai;
					if (false !== fudai) {
						fudai.referrer = fudai.id;
						delete fudai.id;
						this.sendFudaiInfo = fudai;
						this.modal = 'sendFudai'
					} else {
						this.modal = ''
						this.$app.toast("助力成功", 'success')
					}

					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						this.$app.setData('userCurrency', res.data)
					})
					this.page = 1
					this.loadData()
				}, 'POST', true)
			},
			closeFudai() {
				this.modal = ''
			},
			preSend(item) {
				if (this.$app.getData('userStar').id != item.star_id) {
					this.$app.toast('不能为其他的爱豆送礼物')
				} else {
					this.item = item
					this.modal = 'send'
				}
			},
			loadData() {
				this.$app.request('open/select', {
					page: this.page
				}, res => {
					this.itemList = res.data.itemList
					this.yestoday = res.data.yestoday
					if (this.page == 1) {
						this.list = res.data.list
					} else {
						this.list = this.list.concat(res.data.list)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.rank-container {
		padding: 10upx 20upx;
		background: $text-color-10;
		height: 100%;

		.fixed-btn {
			position: fixed;
			bottom: 40upx;
			right: 40upx;
			z-index: 2;
		}

		.top-wrap {
			display: flex;
			margin: 20upx;
			border-radius: 20upx;
			overflow: hidden;
			box-shadow: 0 2upx 8upx rgba(#000, .3);
			background-color: #FFF;

			.left {
				width: 300upx;
				height: 533upx;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;

				.list-wrap {
					.item {
						margin: 20upx;
						display: flex;
						justify-content: flex-start;
						
						.nickname {
							width: 100upx;
						}

						.avatar {
							margin: 5upx;
							width: 50upx;
							height: 50upx;
							border-radius: 50%;
						}
					}
				}
			}
		}

		.list-container {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				border-radius: 10upx;
				overflow: hidden;
				margin: 20upx 10upx;
				background-color: #FFF;
				box-shadow: 0 2upx 8upx rgba(#000, 0.3);

				.img {
					width: 330upx;
					height: 580upx;
				}

				.content {
					padding-bottom: 25upx;
					width: 100%;
					.text{
						display: flex;
						justify-content: space-between;
						padding: 15rpx;
					}
				}
			}
		}

		.send-modal-container {
			width: 100%;
			height: 680upx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			// .tab-wrapper{
			// 	height: 50upx;
			// }
			.explain-wrapper {
				font-size: 24upx;
			}

			.swiper-change {
				margin: 30upx;
				border-radius: 30upx;
				overflow: hidden;
				box-shadow: 0 2upx 4upx rgba(0, 0, 0, .3);

				.item {
					width: 200upx;
					height: 70upx;
					line-height: 70upx;
					background-color: #f5f5f5;
					color: #ff648d;
					text-align: center;

				}

				.item.select {
					background-color: #ff648d;
					color: #f5f5f5;

				}

			}

			swiper {
				width: 100%;
				height: 100%;

				swiper-item {
					z-index: 2;
				}
			}

			.swiper-item {
				flex: 1;

				.wrap {
					position: relative;
					padding: 0 20upx;
					padding-top: 40upx;
					width: 100%;
				}
			}



			.btn-wrapper {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.btn {
					border-radius: 10upx;
					margin: 8upx 0;
					width: 180upx;
					height: 90upx;
					background-color: #fac8cd;

					image {
						width: 40upx;
						height: 40upx;
					}
				}

				.gift-item {
					padding: 10upx 20upx;
					width: 140upx;
					flex-direction: column;
					position: relative;
					font-size: 24upx;

					image {
						width: 100upx;
						height: 100upx;
						position: relative;
					}

					.num {
						display: flex;
						align-items: center;
						position: absolute;
						border-radius: 20upx;
						right: 10upx;
						top: 88upx;
						font-size: 20upx;
						background-color: rgba(250, 250, 250, .3);
						z-index: 2;

						image {
							width: 22upx;
							height: 22upx;
						}
					}

					.name {
						color: #ff648d;
					}


					.self {
						position: absolute;
						right: 10upx;
						top: 10upx;
						border-radius: 50%;
						background-color: rgba(50, 50, 50, .3);
						color: #FFF;
						width: 34upx;
						height: 34upx;
						font-size: 22upx;
						z-index: 2;
					}

					.self.red {
						background-color: #F00;
					}
				}

				.btn.self-input {
					width: 372upx;

					input {
						// background-color: $color_3;
						border-radius: 60upx;
						width: 100%;
						height: 110upx;
						text-align: center;
						line-height: 110upx;
					}
				}

				.btn.pick {
					font-size: 34upx;
					font-weight: 700;
					background-color: #f8648a;
					color: #FFF;
				}
			}

			.btn-wrapper.gift-s {
				padding: 0 40upx;
			}

			.bottom-wrapper {
				padding-bottom: 20upx;
				display: flex;
				justify-content: space-between;
				font-size: 28upx;
				align-items: center;

				.text {
					border-radius: 10upx;
					background-color: #fac8cd;
					width: 180upx;
					height: 90upx;
				}

				.text.left {
					width: 100%;
				}

			}

			.gift {
				position: absolute;
				right: 40upx;
				bottom: 30upx;
				font-size: 32upx;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 50upx;
					height: 50upx;
					margin-right: 10upx;
				}

				.text {
					border-bottom: 2upx solid $text-color-2;
				}
			}

		}
		
		.tips-modal-container {
			height: 100%;
			padding: 20upx 10upx;
			font-size: 32upx;
			.text-wrap {
				text-align: center;
				margin: 20upx;
				.title {
					font-size: 40upx;
					font-weight: 700;
					text-align: center;
					margin: 20upx;
				}
				.text {
					line-height: 1.7;
				}
				.avatar {
					width: 140upx;
					height: 140upx;
					border-radius: 50%;
					margin: 20upx;
				}
			}
			.btn {
				color: #FFF;
			}
		}
		
		.tips-modal-container.hongbao {
			.text-wrap {
				margin: 10upx;
		
				.avatar {
					width: 250upx;
					height: 250upx;
					margin: 0;
				}
			}
		
			.tips {
				text-align: center;
				color: #999;
				font-size: 20upx;
				padding: 10upx;
			}
		}
	}
</style>

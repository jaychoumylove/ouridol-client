<template>
	<view class="active_one-container">

		<view class="top-container" v-if="activeInfo.bg_img">
			<image class="bg" :src="activeInfo.bg_img" mode="aspectFill"></image>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<!-- <ad :unit-id="adUnitId" ad-type="video" ad-theme="white"></ad>	//视频广告-->
		<ad :unit-id="adUnitId" ad-type="grid" grid-opacity="0.8" grid-count="5" ad-theme="white"></ad>
		<!-- #endif -->
		<!-- #ifdef MP-QQ -->		
		<ad :unit-id="adUnitId"></ad>
		<!-- #endif -->
		<!-- <view class="cardday">你已累计打卡<text>{{activeInfo.self.total_clocks||0}}</text>天</view> -->

		<view class="active-center-container">
			<view class="top-wrap">
				<view class="left">
					<view class="left-1">为爱解锁</view>
					<view class="left-2">剩余：{{activeInfo.left_time||''}}</view>
				</view>

				<view v-if="!activeInfo.self.is_card_today" class="right" @tap="card()">
					<image src="/static/image/guild/card.png" mode=""></image>
					<view class="text">
						<view class="t">打卡</view>
						<view class="t" style="font-size: 24upx;">{{activeInfo.self.total_clocks||0}}/7天</view>
					</view>
				</view>
				<view v-else class="right" @tap="card()">
					<image src="/static/image/guild/card-c.png" mode=""></image>
					<view class="text">
						<view class="t">已打卡</view>
						<view class="t" style="font-size: 24upx;">{{activeInfo.self.total_clocks||0}}/7天</view>
					</view>
				</view>
			</view>

			<view class="progress-wrap">
				<view class="title">{{activeInfo.title}}</view>
				<view class="progress">
					<progress activeColor="#e02d2d" stroke-width="10" backgroundColor="#f9f9f9" :percent="activeInfo.progress.join_people/activeInfo.target_people*100" />
					<text>参与人数{{activeInfo.progress.join_people||0}}</text>
				</view>
				<view class="progress">
					<progress activeColor="#962de0" stroke-width="10" backgroundColor="#f9f9f9" :percent="activeInfo.progress.complete_people/activeInfo.target_people*100" />
					<text>完成人数{{activeInfo.progress.complete_people||0}}</text>
				</view>
				<view class="bottom-text">
					<view>目标人数：<text>{{activeInfo.target_people}}</text></view>
					<view>已完成人数：<text>{{activeInfo.progress.complete_people||0}}</text></view>
					<view>还需人数：<text>{{activeInfo.progress.complete_people?activeInfo.target_people - activeInfo.progress.complete_people:activeInfo.target_people}}</text></view>
				</view>
			</view>

			<view class="notice-container">
				<view class="article-name">为爱解锁活动说明</view>

				<block v-for="(item,index) in activeInfo.notice" :key="index">
					<view class="article-group">
						<view class="article-title" v-if="item.title">{{item.title}}</view>
						<text class="article-content" decode v-if="item.content.length>0" v-for="(item1,index1) in item.content" :key="index1">{{item1}}</text>
					</view>
					<image class="article-image" @tap="preImg(item.image)" v-if="item.image" :src="item.image" mode="widthFix"></image>
				</block>
			</view>
		</view>

		<view class="rank-list-container">
			<view class="title">粉丝应援榜</view>
			<view class='scroll-view'>

				<view class='item-wrap' v-for="(item,index) in userRank" :key="index">
					<image class='avatar' :src="item.user.avatarurl" mode="aspectFill"></image>
					<view class="text-wrap">
						<view class="name">{{item.user.nickname}}</view>
						<view class="card">累计打卡天数：{{item.total_clocks}}天</view>
					</view>

					<view class="rank flex-set">{{index+1}}</view>
				</view>
				<view class="item-wrap flex-set" v-if="userRank.length == 0">
					还没有人来打卡
				</view>
			</view>
		</view>

		<modalComponent v-if="modal == 'cardOver'" title=" " headimg='false' @closeModal="modal=''">
			<view class="modal-container flex-set">
				<view class="top-wrap">
					<image class="avatar" :src="star.avatar" mode="aspectFill"></image>
					<view>为爱解锁应援金活动</view>
					<block v-if="activeInfo.progress.join_people < activeInfo.target_people">
						<view class="">已有<text style="color: #F00;">{{activeInfo.progress.join_people}}</text>人参与</view>
					</block>
					<block v-else>
						<view class="">已有<text style="color: #007EFF;">{{activeInfo.progress.complete_people}}</text>人完成,还差<text style="color: #F00;">{{activeInfo.target_people-activeInfo.progress.complete_people}}</text>人完成</view>
					</block>
				</view>
				
				<view class="progress-wrap">
					<view class="progress">
						<progress activeColor="#e02d2d" stroke-width="10" backgroundColor="#f9f9f9" :percent="activeInfo.progress.join_people/activeInfo.target_people*100" />
						<text>参与人数{{activeInfo.progress.join_people||0}}</text>
					</view>
					<view class="progress">
						<progress activeColor="#962de0" stroke-width="10" backgroundColor="#f9f9f9" :percent="activeInfo.progress.complete_people/activeInfo.target_people*100" />
						<text>完成人数{{activeInfo.progress.complete_people||0}}</text>
					</view>
					<view class="bottom-text">
						<view>目标人数：<text>{{activeInfo.target_people}}</text></view>
						<view>已完成人数：<text>{{activeInfo.progress.complete_people||0}}</text></view>
						<view>还需人数：<text>{{activeInfo.progress.complete_people?activeInfo.target_people - activeInfo.progress.complete_people:activeInfo.target_people}}</text></view>
					</view>
				</view>

				<view class="btn-wrap">

					<button v-if="$app.getData('platform')=='MP-WEIXIN'" class='fsend-btn flex-set' open-type='share'>
						<image src="/static/image/wxq.png" mode="widthFix"></image>
						<view>微信群</view>
					</button>
					<button v-if="$app.getData('platform')=='MP-QQ'" class='fsend-btn flex-set' open-type='share'>
						<image src="/static/image/qq.png" mode="widthFix"></image>
						<view>QQ群</view>
					</button>


					<view class='fsend-btn flex-set' open-type='share' @tap="modal ='otherShareW'">
						<image src="/static/image/weibo.png" mode="widthFix"></image>
						<view>微博</view>
					</view>
					<view v-if="$app.getData('config').pyq_switch == '1'" class='fsend-btn flex-set' open-type='share' @tap="drawCanvas();modal ='otherShareP'">
						<image src="/static/image/pyq.png" mode="widthFix"></image>
						<view>朋友圈</view>
					</view>
					<!-- <view v-if="$app.getData('config').pyq_switch == '0'" class='fsend-btn flex-set' @tap="drawCanvas();">
						<image src="/static/image/icon/save.png" mode="widthFix"></image>
						<view>保存海报</view>
					</view> -->

					<!-- <view class='save-btn flex-set' @tap='saveCanvas'>保存到相册</view> -->
				</view>
			</view>			
			<!-- #ifdef MP-WEIXIN -->
			<!-- <ad :unit-id="adUnitId" ad-type="video" ad-theme="white"></ad>	//视频广告-->
				<ad :unit-id="adUnitId" ad-type="grid" grid-opacity="0.8" grid-count="5" ad-theme="white"></ad>
			<!-- #endif -->
			<!-- #ifdef MP-QQ -->		
				<ad :unit-id="adUnitId"></ad>
			<!-- #endif -->
		</modalComponent>

		<!--<view class="canvas-container flex-set" v-if="modal == 'canvas'">
			<view class="close-btn flex-set iconfont icon-icon-test1" @tap="modal = ''"></view> -->

		<canvas canvas-id='mycanvas' class="canvas"></canvas>

		<!-- </view> -->

		<view class="canvas-container flex-set" v-if="modal == 'otherShareW'">
			<view class="close-btn flex-set iconfont icon-icon-test1" @tap="modal = ''"></view>

			<view class="wrapper flex-set">
				<image src="http://mmbiz.qpic.cn/mmbiz_gif/iaPhFibaNbpLSV7UadegJZuSRW9g4rKDYZjDICZhLmouhT16m4TNPagic3McRuLQ797d3m16iafI3OXjm1JOKC4OaA/0"
				 mode="scaleToFill"></image>
				<view class="btn flex-set" @tap="getShareText(2)">点击复制微博格式</view>
			</view>
		</view>
		<view class="canvas-container flex-set" v-if="modal == 'otherShareP'">
			<view class="close-btn flex-set iconfont icon-icon-test1" @tap="modal = ''"></view>

			<view class="wrapper flex-set">
				<image src="http://mmbiz.qpic.cn/mmbiz_gif/iaPhFibaNbpLSV7UadegJZuSRW9g4rKDYZ1O2agUjUWuKibTick4mXTql7LkXf6AcsPeSlz5jEibu16QgPOJUZFgwXw/0"
				 mode="scaleToFill"></image>
				<view class="btn flex-set" @tap="getShareText(3);saveCanvas();">复制文字，保存图片到相册，发朋友圈</view>
			</view>
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
				// #ifdef MP-WEIXIN
				adUnitId: this.$app.gridAd_adUnitId,
				// #endif
				// #ifdef MP-QQ				
				adUnitId: this.$app.qq_bannerAdUnitId,
				// #endif
				star: {},
				activeInfo: {},
				userRank: [],
				modal: '',
				cardOverContent: '',
				article: this.$app.getData('config').active_notice,

			};
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(5)
		},
		onLoad(option) {
			this.id = option.id
		},
		onShow(option) {
			this.$app.openInterstitialAd()
			this.starid = this.$app.getData('userStar').id
			this.getActiveInfo()
			this.getStarInfo()
			this.getActiveUserRank()
		},
		methods: {
			preImg(img) {
				this.$app.preImg(img)
			},
			getLocalImg(src, callback) {
				if (~src.indexOf('http')) {
					uni.getImageInfo({
						src,
						success: function(res) {
							callback && callback(res.path)
						}
					})
				} else {
					callback && callback(src)
				}
			},
			// 获取分享文字
			getShareText(type) {
				this.$app.request(this.$app.API.EXT_SHARETEXT, {
					type,
				}, res => {
					this.modal = ''
					this.$app.copy(res.data.share_text)
				})
			},
			// 绘制canvas
			drawCanvas() {
				var rate = this.$app.getData('sysInfo').windowWidth / 375 / 2
				var ctx = uni.createCanvasContext('mycanvas', this);
				// 绘制文字
				const drawText = function() {
					ctx.setFillStyle('#000000') //文字颜色

					ctx.setFontSize(18) //设置字体大小，默认10
					ctx.setTextAlign('center')
					// this.canvas_title[0] && ctx.fillText(this.canvas_title[0], 240 * rate, 200 * rate) //绘制文本
					// this.canvas_title[1] && ctx.fillText(this.canvas_title[1], 240 * rate, 250 * rate) //绘制文本

					ctx.fillText(this.star.name, 140 * rate, 535 * rate) //绘制文本

					ctx.setFontSize(10) //设置字体大小，默认10
					ctx.fillText(`榜单排名:NO.${this.star.weekRank}`, 335 * rate, 515 * rate) //绘制文本
					ctx.fillText(`人气值:${this.star.weekHot}`, 335 * rate, 545 * rate) //绘制文本

					ctx.setTextAlign('left')

					ctx.fillText(`我是${this.$app.getData('userInfo').nickname}`, 140 * rate, 670 * rate) //绘制文本
					ctx.fillText(`一起pick${this.star.name}`, 140 * rate, 700 * rate) //绘制文本
				}.bind(this)

				// 绘制图片
				// 背景
				uni.showLoading({
					title: "生成海报中"
				})

				this.getLocalImg('/static/image/canvas-bg.jpg', src => {
					ctx.drawImage(src, 0, 0, 480 * rate, 854 * rate);
					// 明星 
					this.getLocalImg(this.star.share_img || this.star.avatar, src => {
						ctx.drawImage(src, 48 * rate, 176 * rate, 382 * rate, 300 * rate);
						// 用户头像
						this.getLocalImg(this.$app.getData('userInfo').avatarurl || this.$app.getData('AVATAR'), src => {
							ctx.save() //保存当前的绘图上下文。
							ctx.beginPath() //开始创建一个路径
							ctx.arc(85 * rate, 675 * rate, 40 * rate, 0, 2 * Math.PI, false) //画一个圆形裁剪区域
							ctx.clip() //裁剪
							ctx.drawImage(src, 45 * rate, 635 * rate, 80 * rate, 80 * rate) //绘制图片
							ctx.restore() //恢复之前保存的绘图上下文
							// 二维码
							if (this.$app.getData('config').version == this.$app.getData('VERSION')) {
								this.$app.setData('qrcode', '/static/image/def.jpg')
							}

							this.getLocalImg(this.$app.getData('qrcode') || this.$app.QRCODE, src => {
								ctx.save() // 保存当前的绘图上下文。
								ctx.beginPath() // 开始创建一个路径
								ctx.arc(380 * rate, 675 * rate, 50 * rate, 0, 2 * Math.PI, false) //画一个圆形裁剪区域
								ctx.clip() //裁剪
								ctx.drawImage(src, 330 * rate, 625 * rate, 100 * rate, 100 * rate);
								ctx.restore() //恢复之前保存的绘图上下文

								// 绘制文字
								drawText()
								// 绘制
								ctx.draw(false, () => {
									// 保存到临时图片
									uni.canvasToTempFilePath({
										canvasId: 'mycanvas',
										success: res => {
											this.canvasImg = res.tempFilePath
											console.log(this.canvasImg);
											this.saveCanvas()
										}
									}, this);
								})

								uni.hideLoading()
							})
						})
					})
				})

			},
			//保存的画布
			saveCanvas: function() {
				// 保存图片到用户相册
				uni.saveImageToPhotosAlbum({
					filePath: this.canvasImg,
					success: () => {
						this.$app.toast('保存成功', 'success')
					},
					fail: res => {
						console.log(res);
					}
				});
			},
			getStarInfo() {
				this.$app.request(this.$app.API.STAR_INFO, {
					starid: this.starid
				}, res => {
					const star = res.data
					this.star = {
						id: star.id,
						avatar: star.head_img_s ? star.head_img_s : star.head_img_l,
						name: star.name,
						weekHot: this.$app.formatNumberRgx(star.star_rank.week_hot),
						weekRank: star.star_rank.week_hot_rank,
						share_img: star.share_img,
					}

					this.$app.closeLoading(this)
				})
			},
			card() {
				if (this.$app.getData('userStar').id == this.starid) {
					if (!this.activeInfo.self.is_card_today) {
						// 看视频打卡
						this.$app.openVideoAd(() => {
							this.$app.request(this.$app.API.EXT_ACTIVECARD, {
								starid: this.starid,
								active_id: this.id,
							}, res => {
								this.modal = 'cardOver'
								this.getActiveInfo()
								this.getActiveUserRank()
								this.$app.toast('今日打卡成功', 'success')
							}, 'POST', true)
						},0)//没有广告不给奖励
					} else {
						this.modal = 'cardOver'
						this.$app.toast('今日已打卡')
					}

				} else {
					this.$app.toast('你怎么能为别的爱豆打卡呢')
				}
			},

			getActiveUserRank() {
				this.$app.request(this.$app.API.EXT_ACTIVE_USERRANK, {
					starid: this.starid,
					active_id: this.id,
				}, res => {
					this.userRank = res.data
				})
			},
			getActiveInfo() {
				this.$app.request(this.$app.API.EXT_ACTIVEINFO, {
					starid: this.starid,
					id: this.id,
				}, res => {
					this.canvas_title = res.data.canvas_title

					let left_time = this.$app.timeGethms(res.data.active_end)

					res.data.left_time = left_time.day + '天' + left_time.hour + '小时' + left_time.min + '分'
					res.data.title = res.data.title.replace('STARNAME', this.$app.getData('userStar').name)
					this.activeInfo = res.data
				})
			},
		}
	}
</script>

<style lang="scss" scoped="">
	.active_one-container {
		padding: 20upx;

		.progress-wrap {
			padding: 30upx;
			color: #666;

			.title {
				font-size: 30upx;
				font-weight: 600;
				padding: 10upx 0;
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
					width: 190upx;
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

		.top-container {
			height: 300upx;
			margin-bottom: 20upx;

			.bg {
				border-radius: 20upx;
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
			overflow: hidden;
			box-shadow: 0 2upx 16upx rgba(#999, .3);

			.top-wrap {
				background: linear-gradient(to right, #ff665e, #fdb673);
				height: 90upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #333;

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
					color: $color_2;
					background-color: #ffd1b2;
					display: flex;
					align-items: center;

					border-top-left-radius: 50upx;
					border-bottom-left-radius: 50upx;

					image {
						height: 90upx;
						width: 90upx;
					}

					.text {
						padding: 0 20upx;
						text-align: center;
					}
				}
			}



			.notice-container {
				color: #FFF;
				background-color: #f1b3b0;
				padding: 10upx 20upx;

				.article-name {
					text-align: center;
					font-size: 32upx;
					font-weight: 700;
					text-shadow: 0 4upx 6upx rgba(#000, 0.3);
					padding: 5upx 10upx;

				}

				.article-group {
					display: flex;
					align-items: baseline;
					padding: 5upx 10upx;

					.article-title {
						border: none;
						font-size: 28upx;
						font-weight: 300;
						padding: 0;
						margin: 0;
						width: 150upx;
					}

					.article-content {
						flex: 1;
						text-indent: 0;
						font-size: 28upx;
						font-weight: 300;
						margin: 0;
					}
				}

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

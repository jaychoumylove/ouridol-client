<template>
	<view class="active_one-container" v-if="starid">

		<view class="top-container">
			<image :src="info.banner"
				 mode="widthFix"></image>
		</view>

		<view class="active-center-container">
			<view class="header">
				<view class="lable">
					7月福利
				</view>
				<view class="title">
					为{{$app.getData('userStar').name || '明星'}}完成看视频任务，解锁应援金
				</view>
			</view>
			<view class="progress-wrap">
				<view class="bottom-text">
					<!-- <view>已参与人数：<text style="color:#007EFF;">{{activeInfo.join_people}}</text></view> -->
					<view>已解锁：<text style="color:#ff0000;">{{reward.done}}元</text></view>
					<view>正在解锁：<text style="color:#ff5cf7;">{{reward.doing}}元</text></view>
				</view>

				<!-- 里程碑进度条 -->
				<view class="milestone-wrap">
					<view class="dot finished"></view>
					<view class="item-box" v-for="(item,index) in step" :key="index">
						<view class="progress">
							<view class="progress-finished" :style="{width: item.precent+'%'}"></view>
						</view>
						<view class="dot" :class="{finished:item.precent==100}">
							<view class="name">￥{{item.reward}}</view>
							<view class="value">{{item.step}}天</view>
·						</view>
					</view>


				</view>

				<view class="bottom-text">
					<view>目标人数：<text style="color:#007EFF;">{{info.people}}</text></view>
					<view>参与人数：<text style="color:#ff5cf7;">{{people.join_num}}</text></view>
					<view>达标人数：<text style="color:#ff5cf7;">{{people.finish_num}}</text></view>
				</view>
			</view>
			
			<view class="active-container">
				<view class="lable">
					你已打卡：<text style="color:#007EFF;">{{my.sup_num}}</text> 天
				</view>
				<btnComponent v-if="is_today" type='default' @tap="setCard">
					<view class="card-action">今日已打卡</view>
				</btnComponent>
				<btnComponent v-else type='default' @tap="setCard">
					<view class="card-action">打卡解锁</view>
				</btnComponent>
				<button style="margin-left: 10upx;" open-type="share">
					<btnComponent type="default">
						<view class="card-action friend flex-set">好友助力</view>
					</btnComponent>
				</button>
			</view>

			<view class="notice-container">
				<view class="article-name">为爱解锁活动说明</view>

				<block v-for="(item,index) in info.desc" :key="index">
					<view class="article-group">
						<view class="article-title" v-if="item.label">{{item.label}}</view>
						<view class="article-row">
							<text class="article-content">{{item.content}}</text>
						</view>
					</view>
				</block>
			</view>
		</view>

		<view class="rank-list-container">
			<view class="title">粉丝应援榜</view>
			<view class='scroll-view'>

				<view class='item-wrap' v-for="(item,index) in userRank" :key="index">
					<image class='avatar' :src="item.avatarurl" mode="aspectFill"></image>
					<view class="text-wrap">
						<view class="name">{{item.nickname}}</view>
						<view class="card">累计打卡：{{item.sup_num}}天</view>
						<!-- <view class="progress">
							<progress activeColor="#007EFF" backgroundColor="#f8c4be" :percent="item.active_card_days/activeInfo.active_info.total_days*100" />
						</view> -->
					</view>

					<view class="rank flex-set">{{index+1}}</view>
				</view>
				<view class="item-wrap flex-set" v-if="userRank.length == 0">
					还没有人来解锁
				</view>
			</view>
		</view>

		<modalComponent v-if="modal == 'cardOver'" title=" " headimg='false' @closeModal="modal=''">
			<view class="modal-container flex-set">
				<view class="top-wrap">
					<image class="avatar" :src="$app.getData('userStar').head_img_s" mode="aspectFill"></image>
					<block v-if="progressing.done > 0">
						<view class="">已获得<text style="color: #F00;">{{reward.done}}</text>元应援金</view>
						<view class="">后援会入驻免费领取</view>
					</block>
					<block v-else>
						<view class="">你已打卡<text style="color: #007EFF;">{{my.sup_num}}</text>天</view>
						<view class="">后援会入驻免费领取</view>
					</block>
				</view>
				<view class="milestone-container">
					<view class="milestone-wrap" v-if="step">
						<view class="dot finished"></view>
						<view class="item-box" v-for="(item,index) in step" :key="index">
							<view class="progress">
								<view class="progress-finished" :style="{width: item.precent+'%'}"></view>
							</view>
							<view class="dot" :class="{finished:item.precent==100}">
								<view class="name">￥{{item.reward}}元</view>
								<view class="value">{{item.step}}天</view>
							</view>
						</view>
					</view>
				</view>
				<view class="user-list flex-set">
					<block v-for="index in 4" :key="index">
						<image v-if="invitList[index]" class="user-list-avatar" :src="invitList[index].user.avatarurl" mode="aspectFill"></image>
						<button v-else open-type="share">
							<image class="user-list-avatar" src="/static/image/icon/add.png" mode="aspectFill"></image>
						</button>
					</block>
				</view>
				<view>——{{is_ext ? '邀请新用户增加自己解锁天数': '快召集大家一起来解锁福利吧'}}——</view>

				<view class="btn-wrap">
					<button class='fsend-btn flex-set' open-type='share'>
						<image src="/static/image/wxq.png" mode="widthFix"></image>
						<view>微信群</view>
					</button>
					<view class='fsend-btn flex-set' open-type='share' @tap="modal ='otherShareW'">
						<image src="/static/image/weibo.png" mode="widthFix"></image>
						<view>微博</view>
					</view>
					<!-- <view v-if="$app.getData('config').pyq_switch == '1'" class='fsend-btn flex-set' open-type='share' @tap="drawCanvas();modal ='otherShareP'">
						<image src="/static/image/pyq.png" mode="widthFix"></image>
						<view>朋友圈</view>
					</view>
					<view v-if="$app.getData('config').pyq_switch == '0'" class='fsend-btn flex-set' @tap="drawCanvas();saveCanvas();">
						<image src="/static/image/icon/save.png" mode="widthFix"></image>
						<view>保存</view>
					</view> -->

					<!-- <view class='save-btn flex-set' @tap='saveCanvas'>保存到相册</view> -->
				</view>
			</view>
		</modalComponent>

		<!--<view class="canvas-container flex-set" v-if="modal == 'canvas'">
			<view class="close-btn flex-set iconfont iconclose" @tap="modal = ''"></view> -->

		<canvas canvas-id='mycanvas' class="canvas"></canvas>

		<!-- </view> -->

		<view class="canvas-container flex-set" v-if="modal == 'otherShareW'">
			<view class="close-btn flex-set iconfont iconclose" @tap="modal = ''"></view>

			<view class="wrapper flex-set">
				<image src="http://tva1.sinaimg.cn/large/0060lm7Tly1g5k6xgs6fqg30bv0h4wg4.gif" mode="scaleToFill"></image>
				<view class="btn flex-set" @tap="getShareText(4)">点击复制微博格式</view>
			</view>
		</view>
		<view class="canvas-container flex-set" v-if="modal == 'otherShareP'">
			<view class="close-btn flex-set iconfont iconclose" @tap="modal = ''"></view>

			<view class="wrapper flex-set">
				<image src="http://tva1.sinaimg.cn/large/0060lm7Tly1g5k70tvqe8g30bv0h4407.gif" mode="scaleToFill"></image>
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
				starid:0,
				star: {},
				activeInfo: {
					can_card: 1,
					complete_people: 0,
					join_people: 0,
					left_time: '0天0小时0分',
					my_card_days: 0,
					active_subscribe: 1,
					remainPeople: 0,
				},
				userRank: [],
				modal: '',
				cardOverContent: '',
				article: this.$app.getData('config').active_notice,
				mileList: [],
				invitList: [],
				subscriibeShow: false,
				page: 1,
				size: 10,
				end: false,
				info: {},
				progressing: {
					done: 0,
					doing: 0,
				},
				reward: {
					done: 0,
					doing: 0,
				},
				people: {
					join_num: 0,
					finish_num: 0,
				},
				step: [], // 进度条
				my: {
					sup_num: 0,
					sup_ext: 0,
				},
				is_today: false, // 是否已打卡
				is_ext: false, // 是否可以补签
			};
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(11)
		},
		onLoad(option) {
		},
		onShow(){
			if (this.$app.getData('userStar').id) {
				this.starid = this.$app.getData('userStar').id
			} else {
				uni.showModal({
					title: '提示',
					content: '请先加入一个圈子',
					showCancel: false,
					confirmText: '确定',
					success: res => {
						res.confirm && this.$app.goPage('/pages/index/index')
					}
				});
				return
			}
			this.getInfo();
			this.page = 1;
			this.end = false;
			this.getList();
		},
		/**
		 * 上拉加载
		 */
		onReachBottom() {
			this.page++;
			this.getList()
		},
		methods: {
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
				// this.modal = 'canvas'
				var rate = this.$app.getData('sysInfo').windowWidth / 375 / 2
				var ctx = uni.createCanvasContext('mycanvas', this);
				// 绘制文字
				const drawText = function() {
					ctx.setFillStyle('#FFFFFF') //文字颜色

					ctx.setFontSize(18) //设置字体大小，默认10
					ctx.setTextAlign('center')
					ctx.fillText(this.canvas_title[0], 240 * rate, 200 * rate) //绘制文本
					ctx.fillText(this.canvas_title[1], 240 * rate, 250 * rate) //绘制文本

					ctx.fillText(this.star.name, 140 * rate, 632 * rate) //绘制文本

					ctx.setFontSize(10) //设置字体大小，默认10
					ctx.setTextAlign('left')
					ctx.fillText(`榜单排名:NO.${this.star.weekRank}`, 270 * rate, 616 * rate) //绘制文本
					ctx.fillText(`人气值:${this.star.weekHot}`, 270 * rate, 640 * rate) //绘制文本

					ctx.fillText(`我是${this.$app.getData('userInfo').nickname}`, 130 * rate, 774 * rate) //绘制文本
					ctx.fillText(`一起为${this.star.name}打榜`, 130 * rate, 804 * rate) //绘制文本
				}.bind(this)

				// 绘制图片
				// 背景
				uni.showLoading({
					title: "生成海报中"
				})
				// 背景
				this.getLocalImg('/static/image/canvas-bg.png', src => {
					ctx.drawImage(src, 0, 0, 480 * rate, 854 * rate);
					// 明星 
					this.getLocalImg(this.$app.getData('userStar').share_img || this.$app.getData('userStar').avatar, src => {
						ctx.drawImage(src, 48 * rate, 286 * rate, 382 * rate, 305 * rate);
						// 用户头像
						this.getLocalImg(this.$app.getData('userInfo').avatarurl || this.$app.getData('AVATAR'), src => {
							ctx.save() //保存当前的绘图上下文。
							ctx.beginPath() //开始创建一个路径
							ctx.arc(79 * rate, 784 * rate, 40 * rate, 0, 2 * Math.PI, false) //画一个圆形裁剪区域
							ctx.clip() //裁剪
							ctx.drawImage(src, 38 * rate, 744 * rate, 80 * rate, 80 * rate) //绘制图片
							ctx.restore() //恢复之前保存的绘图上下文
							// 二维码
							this.getLocalImg(this.$app.getData('qrcode') || this.$app.QRCODE, src => {
								ctx.save() //保存当前的绘图上下文。
								ctx.beginPath() //开始创建一个路径
								ctx.arc(400 * rate, 780 * rate, 50 * rate, 0, 2 * Math.PI, false) //画一个圆形裁剪区域
								ctx.clip() //裁剪
								ctx.drawImage(src, 350 * rate, 730 * rate, 100 * rate, 100 * rate);
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
			getInfo() {
				this.$app.request(this.$app.API.YINGYUAN_INFO, {}, res => {
					const {info, progressing, is_today, reward, sup_ext, people, step} = res.data;
					this.info = info;
					this.progressing = progressing;
					this.reward = reward;
					this.step = step;
					this.is_today = is_today;
					this.people = people;
					this.my = res.data.self;
					this.is_ext = res.data.sup_ext;
				}, 'POST')
			},
			getList() {
				if (this.end) return;
				
				this.$app.request(this.$app.API.YINGYUAN_LIST, {
					page: this.page
				}, res => {
					let list = this.userRank;
					if (res.data.length < this.size) {
						this.end = true;
					}
					if (this.page > 1) {
						this.userRank = list.concat(res.data);
					} else {
						this.userRank = res.data;
					}
				}, 'POST')
			},
			setCard() {
				// 看视频打卡
				if (this.is_today) {
					// this.$app.toast('今日已打卡');
					this.modal = 'cardOver'
					this.is_today = true
					return;
				}
				this.$app.openVideoAd(() => {
					this.$app.request(this.$app.API.YINGYUAN_CARD, {}, res => {
						this.modal = 'cardOver'
						this.is_today = true
						this.getInfo()
						this.$app.toast('今日打卡成功', 'success')
					}, 'POST', true)
				}, this.$app.getData('config').kindness_swithch)//没有广告不给奖励
			},
			// 打卡
			card(e) {
				// 保存formId
				const formId = e && e.detail && e.detail.formId || null

				if (formId && formId != 'the formId is a mock one') {
					this.$app.request(this.$app.API.EXT_SAVEFORMID, {
						formId
					})
				}
				if (this.$app.getData('userStar').id == this.starid) {
					this.modal = 'cardOver'
					this.getInvitList()
					if (this.activeInfo.can_card) {
						this.$app.request(this.$app.API.EXT_ACTIVECARD, {}, res => {
							if (res.data.subscribe) this.subscriibeShow = true
							this.getActiveInfo()
							this.getActiveUserRank()
							this.$app.toast('今日解锁成功', 'success')
						}, 'POST', true)
					}

				} else {
					this.$app.toast('你怎么能为别的爱豆应援呢')
				}

			},
			getInvitList() {
				this.$app.request('user/invitlist', {
					type: 3
				}, res => {
					this.invitList = res.data.list
				})
			},
			getActiveUserRank() {
				this.$app.request(this.$app.API.EXT_ACTIVE_USERRANK, {
					starid: this.starid
				}, res => {

					const resList = []

					for (let v of res.data) {
						if (v.user && v.user.nickname) {
							resList.push({
								active_card_days: v.active_card_days,
								user: v.user,
							})
						}
					}

					this.userRank = resList

				})
			},
			getActiveInfo() {
				this.$app.request(this.$app.API.EXT_ACTIVEINFO, {
					starid: this.starid
				}, res => {
					this.canvas_title = res.data.canvas_title
					// 里程碑信息
					let activeInfo = res.data.active_info
					// 已解锁次数
					let finished = res.data.complete_people
					// 进度条百分比
					for (let key in activeInfo) {
						if (activeInfo[key]['count'] <= finished) {
							// 该阶段已完成
							activeInfo[key]['progress'] = 100
						} else {
							let lastCount = activeInfo[key - 1] && activeInfo[key - 1]['count'] || 0
							let percent = (finished - lastCount) / (activeInfo[key]['count'] - lastCount) * 100
							if (percent < 0) percent = 0
							activeInfo[key]['progress'] = percent
						}
					}
					res.data.active_info = activeInfo
					if (res.data.active_end > 0) {
						let left_time = this.$app.timeGethms(res.data.active_end)
						res.data.left_time = left_time.day + '天' + left_time.hour + '小时' + left_time.min + '分'
					} else {
						res.data.left_time = '活动已结束'
					}

					this.activeInfo = res.data

					// if (this.activeInfo.my_card_days > 7) {
					this.cardOverContent = `解锁成功，已成功为爱豆助力解锁福利。`
					// } else {
					this.cardOverContent = `解锁成功，解锁进度${this.activeInfo.my_card_days}/7天，请继续保持。`
					// }
				})
			},
		}
	}
</script>

<style lang="scss" scoped="">
	
	$color_0: white;
	$color_1: white;
	.active_one-container {
		padding: 20upx;

		.milestone-wrap {
			width: 100%;
			display: flex;
			align-items: center;
			padding: 50upx 20upx;
			margin-top: 20upx;
			margin-bottom: 20upx;

			.dot {
				background-color: #dcdcdc;
				border-radius: 50%;
				width: 40upx;
				height: 40upx;
				z-index: 1;
				position: relative;

				.name {
					position: absolute;
					top: -40upx;
					left: 50%;
					transform: translateX(-50%);
					font-size: 22upx;
					white-space: nowrap;
				}

				.value {
					position: absolute;
					bottom: -40rpx;
					left: 50%;
					transform: translateX(-50%);
					font-size: 22upx;
					white-space: nowrap;
				}
			}

			.dot.finished {
				background-color: #007EFF;
			}

			.item-box {
				flex: 1;
				display: flex;
				align-items: center;

				.progress {
					margin: 0 -5upx;
					flex: 1;
					height: 20upx;
					background-color: #dcdcdc;

					.progress-finished {
						width: 0%;
						height: 100%;
						background-color: #007EFF;
					}
				}

			}

		}

		.top-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			image {
				border-radius: 20upx;
			}

			.switch {
				transform: scale(0.7);
				margin: 0 -20upx;
			}

			.top-btn-wrap {
				display: flex;
				width: 100%;
				justify-content: space-between;
				padding: 0 10upx;
				align-items: center;

				.left-wrap {
					position: relative;

					.s-over {
						width: 150upx;
						position: absolute;
						left: 70upx;
						top: 56upx;
					}
				}

				.btn {

					image {
						margin: 0 10upx;
						width: 40upx;
						// height: 60upx;
					}
				}
			}

			.avatar {
				border: 4upx solid $color_1;
				border-radius: 50%;
				overflow: hidden;
				width: 120upx;
				height: 120upx;
			}

			.nickname {
				font-size: 32upx;
				font-weight: 700;
			}
		}

		.cardday {
			text-align: center;
			margin: 20upx;

			text {
				background-color: $color_1;
				border-radius: 10upx;
				color: #FFF;
				display: inline-block;
				margin: 0 2upx;
				padding: 0 10upx;
			}
		}

		.cardday.newbie {
			text {
				// background-color: #f7d11e;	
			}
		}

		.active-center-container {
			.header {
				display: flex;
				justify-content: flex-start;
				margin: 20upx 0;
				.lable {
					padding: 0 20upx;
					display: inline-block;
					border-top-right-radius: 8upx;
					border-top-left-radius: 8upx;
					background-color: #f1b3b0;
					margin-left: 20upx;
					color: white;
				}
				.title {
					font-size: 30upx;
					font-weight: 700;
				}
			}
			.top-wrap {
				border-top-left-radius: 30upx;
				border-top-right-radius: 30upx;
				background-color: #c0ebe9;
				height: 90upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #007EFF;

				.left {
					display: flex;
					align-items: center;

					.left-1 {
						border-right: 2upx solid #fff;
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
					color: $color_1;
					background-color: #ffd1b2;
					z-index: 2;
					display: flex;
					align-items: center;
					border-top-left-radius: 50upx;
					border-bottom-left-radius: 50upx;

					// margin-bottom: 30upx;
					// margin-right: 30upx;
					// height: 120upx;
					// width: 120upx;

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

			.progress-wrap {
				padding: 30upx;
				background-color: #F5EBE6;

				// 				.progress {
				// 					margin: 14upx 0;
				// 					display: flex;
				// 					align-items: center;
				// 
				// 					progress {
				// 						width: 100%;
				// 						border-radius: 60upx;
				// 						overflow: hidden;
				// 						margin-right: 20upx;
				// 					}
				// 
				// 					text {
				// 						border-radius: 30upx;
				// 						padding: 0 20upx;
				// 						color: #FFF;
				// 						width: 120upx;
				// 						text-align: center;
				// 					}
				// 				}

				.bottom-text {
					display: flex;
					justify-content: space-between;
				}
			}
			
			.active-container {
				display: flex;
				margin: 10upx 0;
				justify-content: flex-end;
				// height: 40upx;
				line-height: 70upx;
				.lable {
					margin-left: 20upx;
					margin-right: auto;
					display: inline-block;
					height: 70upx;
				}
				.card-action {
					height: 70upx;
					margin: 0 10upx;
					padding: 0 10upx;
				}
				.friend {
					
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

					.article-row {
						flex: 1;

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
				background-color: $color_0;
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

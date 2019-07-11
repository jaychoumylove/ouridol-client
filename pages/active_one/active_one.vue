<template>
	<view class="active_one-container" v-if="starid">

		<view class="top-container">
			<view class="top-btn-wrap">
				<!-- <button open-type="share" data-share='4'>
					<view class="btn">分享</view>
				</button> -->
				<view class="left-wrap flex-set">
					<switch class="switch" :checked="activeInfo.active_subscribe == '2'" @change="subScribe" />
					<text>订阅进度</text>
					<image v-if="subscriibeShow" @tap="subscriibeShow = false" class="s-over" src="/static/image/guild/t-23.png" mode="widthFix"></image>
				</view>

				<view class="btn flex-set" @tap="$app.goPage('/pages/subPages/fanclub_list/fanclub_list?starname='+star.name)">
					<image src="/static/image/user/s8.png" mode="widthFix"></image>
					<text>后援会</text>
				</view>
			</view>
			<image class="avatar" :src="star.avatar" mode="aspectFill"></image>
			<view class="nickname">{{star.name}}</view>
		</view>

		<view class="cardday">
			你已累计解锁<text>{{activeInfo.my_card_days}}</text>次
		</view>
		<view class="cardday newbie">
			好友助力<text>{{activeInfo.my_newbie_cards}}</text>次
		</view>
		<view class="active-center-container">
			<view class="top-wrap">
				<view class="left">
					<view class="left-1">为爱解锁</view>
					<view class="left-2">剩余：{{activeInfo.left_time}}</view>
				</view>
				<button v-if="activeInfo.can_card" open-type="getUserInfo" @getuserinfo="getUserInfo">
					<view class="right">
						<image src="/static/image/guild/card-o.png" mode=""></image>
						<view class="text">
							<view class="t">解锁 <text style="color: #DC6B0C;">{{activeInfo.can_card}}</text>次</view>
						</view>
					</view>
				</button>
				<form v-else report-submit @submit="card">
					<button class="right" form-type="submit">
						<image src="/static/image/ic_haibao__bak.png" mode=""></image>
						<view class="text">
							<view class="t">增加次数</view>
						</view>
					</button>
				</form>

			</view>
			<view class="progress-wrap">
				<view class="bottom-text">
					<!-- <view>已参与人数：<text style="color:#007EFF;">{{activeInfo.join_people}}</text></view> -->
					<view v-if="activeInfo.finishedFee">已解锁：<text style="color:#ff0000;">{{activeInfo.finishedFee}}元</text></view>
					<view v-else>解锁中</view>
					<view>目标预计所需人数：<text style="color:#ff5cf7;">{{activeInfo.remainPeople}}人/天</text></view>
				</view>

				<!-- 里程碑进度条 -->
				<view class="milestone-wrap" v-if="activeInfo.active_info">
					<view class="dot finished"></view>

					<view class="item-box" v-for="(item,index) in activeInfo.active_info" :key="index">
						<view class="progress">
							<view class="progress-finished" :style="{width:item.progress+'%'}"></view>
						</view>
						<view class="dot" :class="{finished:item.progress==100}">
							<view class="name">￥{{item.fee}}</view>
							<view class="value">{{item.count}}次</view>
						</view>
					</view>


				</view>

				<view class="bottom-text">
					<view>已解锁次数：<text style="color:#007EFF;">{{activeInfo.complete_people}}</text></view>
					<view>目标次数：<text style="color:#ff5cf7;">{{activeInfo.nextCount}}</text></view>
				</view>

				<!-- <view class="progress">
					<progress activeColor="#007EFF" stroke-width="15" backgroundColor="#f8c4be" :percent="activeInfo.join_people/activeInfo.active_info.target_people*100" />
					<text style="background-color:#007EFF;">{{(activeInfo.join_people/activeInfo.active_info.target_people*100).toFixed(1)}}%</text>
				</view>
				<view class="progress" style="color:#ff0000;">
					<progress activeColor="#ff0000" stroke-width="15" backgroundColor="#f8c4be" :percent="activeInfo.complete_people/activeInfo.active_info.target_people*100" />
					<text style="background-color:#ff0000;">{{(activeInfo.complete_people/activeInfo.active_info.target_people*100).toFixed(1)}}%</text>
				</view> -->
			</view>

			<view class="notice-container">
				<view class="article-name">为爱解锁活动说明</view>

				<block v-for="(item,index) in article" :key="index">
					<view class="article-group">
						<view class="article-title" v-if="item.title">{{item.title}}</view>
						<view class="article-row">
							<text class="article-content" decode v-if="item.content.length>0" v-for="(item1,index1) in item.content" :key="index1">{{item1}}</text>
						</view>
					</view>
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
						<view class="card">累计解锁次数：{{item.active_card_days}}次</view>
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
					<image class="avatar" :src="star.avatar" mode=""></image>
					<block v-if="activeInfo.finishedFee">
						<view class="">已获得<text style="color: #F00;">{{activeInfo.finishedFee}}</text>元应援金</view>
						<view class="">后援会入驻免费领取</view>
					</block>
					<block v-else>
						<view class="">已解锁<text style="color: #007EFF;">{{activeInfo.complete_people}}</text>次，还差<text style="color: #F00;">{{activeInfo.nextCount - activeInfo.complete_people}}</text>次</view>
						<view class="">后援会入驻免费领取</view>
					</block>
				</view>
				<view class="milestone-container">
					<view class="milestone-wrap" v-if="activeInfo.active_info">
						<view class="dot finished"></view>

						<view class="item-box" v-for="(item,index) in activeInfo.active_info" :key="index">
							<view class="progress">
								<view class="progress-finished" :style="{width:item.progress+'%'}"></view>
							</view>
							<view class="dot" :class="{finished:item.progress==100}">
								<view class="name">￥{{item.fee}}</view>
								<view class="value">{{item.count}}次</view>
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
				<view>——每邀请1位新人立即解锁10次——</view>

				<view class="btn-wrap">
					<button class='fsend-btn flex-set' open-type='share'>
						<image src="/static/image/wxq.png" mode="widthFix"></image>
						<view>微信群</view>
					</button>
					<view class='fsend-btn flex-set' open-type='share' @tap="modal ='otherShareW'">
						<image src="/static/image/weibo.png" mode="widthFix"></image>
						<view>微博</view>
					</view>
					<view class='fsend-btn flex-set' open-type='share' @tap="drawCanvas();modal ='otherShareP'">
						<image src="/static/image/pyq.png" mode="widthFix"></image>
						<view>朋友圈</view>
					</view>

					<!-- <view class='save-btn flex-set' @tap='saveCanvas'>保存到相册</view> -->
				</view>
			</view>
		</modalComponent>

		<!--<view class="canvas-container flex-set" v-if="modal == 'canvas'">
			<view class="close-btn flex-set iconfont icon-icon-test1" @tap="modal = ''"></view> -->

		<canvas canvas-id='mycanvas' class="canvas"></canvas>

		<!-- </view> -->

		<view class="canvas-container flex-set" v-if="modal == 'otherShareW'">
			<view class="close-btn flex-set iconfont icon-icon-test1" @tap="modal = ''"></view>

			<view class="wrapper flex-set">
				<image src="http://tva1.sinaimg.cn/large/0060lm7Tly1g4p9rnx2f3g30ku112qc3.gif" mode="scaleToFill"></image>
				<view class="btn flex-set" @tap="getShareText(2)">点击复制微博格式</view>
			</view>
		</view>
		<view class="canvas-container flex-set" v-if="modal == 'otherShareP'">
			<view class="close-btn flex-set iconfont icon-icon-test1" @tap="modal = ''"></view>

			<view class="wrapper flex-set">
				<image src="http://tva1.sinaimg.cn/large/0060lm7Tly1g4p9r2rbokg30ku112n3f.gif" mode="scaleToFill"></image>
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
			};
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(5)
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
			this.getActiveInfo()
			this.getStarInfo()
			this.getActiveUserRank()
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
				this.getLocalImg('/static/image/canvas-bg.png', src => {
					ctx.drawImage(src, 0, 0, 480 * rate, 854 * rate);
					// 明星 
					this.getLocalImg(this.star.share_img || this.star.avatar, src => {
						ctx.drawImage(src, 48 * rate, 286 * rate, 382 * rate, 305 * rate);
						// 用户头像
						this.getLocalImg(this.$app.getData('userInfo').avatarurl || this.$app.AVATAR, src => {
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
			subScribe(e) {
				this.$app.request('subscribe', {
					sub_type: 'active_card',
					flag: e.detail.value ? "2" : "1"
				}, res => {
					this.activeInfo.active_subscribe = res.data
					if (res.data == "2") {
						this.$app.toast('订阅成功', 'success')
					}
				}, 'POST', true)
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
					}

					this.$app.closeLoading(this)
				})
			},

			// 加入圈子
			join() {
				this.$app.modal(`每个人只能加入一个偶像圈\n是否加入${this.star.name}的偶像圈？`, () => {
					// 加入圈子
					this.$app.request(this.$app.API.STAR_FOLLOW, {
						starid: this.starid,
						rer_user_id: this.$app.getData('referrer'), // 推荐人
					}, res => {
						this.$app.request(this.$app.API.USER_STAR, {}, res => {
							this.$app.setData('userStar', res.data, true)
							this.card()
						})
					})
				})
			},
			// 用户授权
			getUserInfo(e) {
				const userInfo = e.detail.userInfo
				if (userInfo) {
					if (!this.$app.getData('userInfo').nickname) {
						// 保存用户信息
						this.$app.request(this.$app.API.USER_SAVEINFO, {
							iv: e.detail.iv,
							encryptedData: e.detail.encryptedData,
						}, res => {
							this.$app.request(this.$app.API.USER_INFO, {}, res => {
								this.$app.setData('userInfo', res.data, true)
							})
							if (!this.$app.getData('userStar').id) {
								this.join()
							}
						}, 'POST', true)
					} else {
						if (!this.$app.getData('userStar').id) {
							this.join()
						} else {
							this.card()
						}
					}

				}
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
						res.data.left_time = '已结束'
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

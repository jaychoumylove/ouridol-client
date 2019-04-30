<template>
	<view class='container'>
		<loadIconComponent v-if="showLoading" type='whole'></loadIconComponent>

		<view class="top-container">
			<view class="top-content">
				<view class="danmaku-wrapper flex-set">

					<view class="danmaku" v-if="danmaku">
						<image class="avatar" :src="danmaku.avatarurl"></image>
						<view class="content">{{danmaku.content}}</view>
						<image class='tail' src='/static/image/guild/tail.png' />
					</view>

				</view>
				<view class="row-info">
					<view class="avatar">
						<image :src="star.avatar" mode="aspectFill"></image>
						<!-- <view class="tips">分享海报</view> -->
					</view>

					<view class="top-text-wrapper">
						<view class="star-name">
							<view class="">{{star.name}}</view>
							<block v-if="!$app.getData('userStar')['id']">
								<button v-if="!$app.getData('userInfo')['nickname']" class="join flex-set" open-type="getUserInfo" @getuserinfo="getUserInfo">
									+加入
								</button>
								<button v-if="$app.getData('userInfo')['nickname']" class="join flex-set" @tap="sendOrFollow">
									+加入
								</button>
							</block>

						</view>
						<view class="rank-list" @tap="$app.goPage('/pages/user/rank/rank?starid='+star.id)">
							<view class="rank-list-container">
								<view class="item" v-for="(item,index) in userRankList" :key="item.avatar">
									<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
									<image class="badge" :src="'/static/image/guild/'+(index+1)+'.png'" mode=""></image>
								</view>
							</view>
							<view class="more-btn">贡献榜></view>
						</view>
					</view>
					<view class="top-text-wrapper">
						<view class="star-name">本期 NO.{{star.weekRank}}</view>
						<view class='bottom'>
							<image src="/static/image/index/ic_hot.png" mode=""></image>
							<view>{{star.weekHot}}</view>
						</view>
					</view>

					<!-- 送人气按钮 -->
					<!-- <button v-if="!$app.getData('userInfo')['nickname']" class="sendflower-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">
						<image src="/static/image/guild/hart.png" mode=""></image>
					</button> -->
				</view>
			</view>

			<view class="func-container">
				<view class="func-list-wrapper">
					<view class="func-item" @tap="$app.goPage('/pages/task/task')">
						<btnComponent>
							<image src="/static/image/guild/t1.png" mode=""></image>
						</btnComponent>
						<view class="">任务</view>
					</view>
					<view class="func-item" @tap="openStealModal">
						<btnComponent>
							<image src="/static/image/guild/t2.png" mode=""></image>
						</btnComponent>
						<view class="">偷能量</view>
					</view>
					<view class="func-item" @tap="getInvitList">
						<btnComponent>
							<image src="/static/image/guild/t3.png" mode=""></image>
						</btnComponent>
						<view class="">拉票</view>
					</view>
					<view class="func-item" @tap="$app.goPage('/pages/group/dynamic/dynamic?starid='+star.id+'&starname='+star.name)">
						<btnComponent>
							<image src="/static/image/guild/t4.png" mode=""></image>
						</btnComponent>
						<view class="">动态</view>
					</view>
					<view class="func-item" @tap="treasure">
						<btnComponent>
							<image src="/static/image/guild/t5.png" mode=""></image>
						</btnComponent>
						<view class="">{{treasureTime}}</view>
					</view>
				</view>
			</view>

			<view class="notice-container" @tap="this.$app.goPage('/pages/notice/notice?id='+article.id)">
				<view class="left">
					<view class="sign">【公告】</view>
					<view class="content">{{article.name}}</view>
				</view>
				<view class="right">更多>></view>
			</view>
		</view>

		<scroll-view class="chart-container" scroll-y :scroll-with-animation="!showLoading" :scroll-into-view="'index_'+index">
			<view :id="'index_'+index" class="msg-item" :class="{right:item.uid==$app.getData('userInfo')['id']}" v-for="(item,index) in chartList"
			 :key="index">

				<view v-if="item.sendtime" class="sendtime-wrapper">
					{{item.sendtime}}
				</view>
				<view class="main-msg-wrapper">
					<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
					<view class="content">
						<view class="top">
							<view class="left">
								<view class="name text-overflow">{{item.nickname}}</view>
								<!-- <view class="fan">
								<image src="/static/image/guild/lv11.png" mode=""></image>
								<view class="fan-text">中级粉</view>
							</view> -->

							</view>
						</view>

						<view class="bottom">
							<view class="msg-content">{{item.content}}</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- <image v-if="star.id == $app.getData('userStar')['id']" class="msg-button" @tap="msgModal = true" src="/static/image/guild/write-btn.png"
		 mode=""></image> -->

		<view class="msg-input-container" v-if="star.id == $app.getData('userStar')['id']">
			<btnComponent>
				<view class="trumpet-wrapper">
					<image src="/static/image/guild/sayworld.png" mode="" @tap="sayworld"></image>
					<view class="trumpet">{{userCurrency.trumpet}}</view>
				</view>
			</btnComponent>
			<input type="text" :value="chartMsg" confirm-type="confirm" @confirm="sendMsg" @input="chartMsg = $event.detail.value"
			 placeholder="快来和小伙伴们聊天吧" />
			<btnComponent>
				<image src="/static/image/guild/sendmsg.png" mode="" @tap="sendMsg"></image>
			</btnComponent>
			<view class="send-btn-wrapper flex-set">
				<btnComponent>
					<image src="/static/image/guild/send-give.png" mode="" @tap="sendOrFollow"></image>
				</btnComponent>
			</view>

		</view>


		<modalComponent v-if="modal == 'send'" title="打榜" @closeModal="modal=''">
			<view class="send-modal-container">
				<!-- <view class="tab-wrapper"></view> -->
				<!-- <view class="explain-wrapper">说明：还未确定后完全好大无穷皇帝和我去我前进的气温降低哦</view> -->
				<view class="bottom-wrapper">
					<view class="text">我的能量：{{$app.getData('userCurrency')['coin']}}</view>
					<view class="text" @tap="$app.goPage('/pages/recharge/recharge')">更多能量>></view>
					<!-- <view class="text">道具>></view> -->
				</view>
				<view class="btn-wrapper">
					<view class="btn" @tap="sendHot(99)">
						<btnComponent type="big">
							<view class="flex-set" style="width:160upx;height:110upx;">
								<image src="/static/image/user/b1.png" mode="widthFix"></image>+99
							</view>
						</btnComponent>
					</view>
					<view class="btn" @tap="sendHot(520)">
						<btnComponent type="big">
							<view class="flex-set" style="width:160upx;height:110upx;">
								<image src="/static/image/user/b1.png" mode="widthFix"></image>+520
							</view>
						</btnComponent>
					</view>
					<view class="btn" @tap="sendHot(999)">
						<btnComponent type="big">
							<view class="flex-set" style="width:160upx;height:110upx;">
								<image src="/static/image/user/b1.png" mode="widthFix"></image>+999
							</view>
						</btnComponent>
					</view>
					<view class="btn" @tap="sendHot(1314)">
						<btnComponent type="big">
							<view class="flex-set" style="width:160upx;height:110upx;">
								<image src="/static/image/user/b1.png" mode="widthFix"></image>+1314
							</view>
						</btnComponent>
					</view>
					<view class="btn" @tap="sendHot(9999)">
						<btnComponent type="big">
							<view class="flex-set" style="width:160upx;height:110upx;">
								<image src="/static/image/user/b1.png" mode="widthFix"></image>+9999
							</view>
						</btnComponent>
					</view>
					<view class="btn" @tap="sendHot(66666)">
						<btnComponent type="big">
							<view class="flex-set" style="width:160upx;height:110upx;">
								<image src="/static/image/user/b1.png" mode="widthFix"></image>+66666
							</view>
						</btnComponent>
					</view>
					<view class="btn self-input">
						<input class="" @input="sendCount = $event.detail.value" type="number" placeholder="自定义数额" />
					</view>
					<view class="btn pick">
						<btnComponent type="big" @tap="sendHot">
							<view class="flex-set" style="width:160upx;height:110upx;">PICK</view>
						</btnComponent>
					</view>
				</view>


			</view>
		</modalComponent>

		<modalComponent v-if="modal == 'steal'" title="偷能量" @closeModal="modal=''">
			<view class="steal-modal-container">
				<!-- <view class="tips-wrapper">飞机为of为副将我叫非法违法</view> -->
				<view class="list-wrapper">
					<view class="item" v-for="(item,index) in starRankList" :key="index" v-if="index<5">
						<view class='avatar'>
							<image :src="item.avatar" mode="aspectFill"></image>
						</view>
						<view class="text-container">
							<view class="star-name">{{item.name}}</view>
							<view class="bottom-text">
								<view class="hot-count">{{item.hot}}</view>
								<image class="icon-heart" src="/static/image/index/ic_hot.png" mode=""></image>
							</view>
						</view>
						<view class="btn" @tap="steal(item.starid,index,item.steal)">
							<btnComponent type="default">
								<view class="flex-set" style="width: 130upx;height: 65upx;">{{item.steal>0?item.steal:'偷TA'}}</view>
							</btnComponent>
						</view>
					</view>
				</view>
			</view>
		</modalComponent>

		<modalComponent v-if="modal == 'invit'" title="拉票" @closeModal="modal=''">
			<view class="invit-modal-container">

				<view class="explain-wrapper">
					<view class="top">已邀请<text> {{invitList.length}} </text>人</view>
					<view class="bottom">被邀请人任意加入一个公会即可领取奖励</view>
				</view>
				<scroll-view scroll-y class="list-wrapper">
					<view class="item" v-for="(item,index) in invitList" :key="index">
						<view class='avatar'>
							<image :src="item.avatar" mode="aspectFill"></image>
						</view>
						<view class="text-container">
							<view class="star-name">第{{index+1}}位好友</view>
							<view class="bottom-text">
								<view class="hot-count">能量+{{invitAward.coin}}</view>
							</view>
						</view>
						<view class="btn">
							<btnComponent :type="item.status?'disable':'success'" @tap="getInvitAward(item.uid,item.status)">
								<view class="flex-set" style="width: 130upx;height: 65upx;">{{item.status?'已领取':'领取'}}</view>
							</btnComponent>
						</view>
					</view>

					<view class="item" v-for="n in 10" :key="n" v-if="invitList.length + n + 1 <= 300">
						<view class='avatar'>
							<image src="/static/image/guild/t1.png" mode="aspectFill"></image>
						</view>
						<view class="text-container">
							<view class="star-name">第{{invitList.length + n + 1}}位好友</view>
							<view class="bottom-text">
								<view class="hot-count">能量+{{invitAward.coin}}</view>
							</view>
						</view>
						<button class="btn" open-type="share">
							<btnComponent type="default">
								<view class="flex-set" style="width: 130upx;height: 65upx;">去邀请</view>
							</btnComponent>
						</button>
					</view>

				</scroll-view>
			</view>

		</modalComponent>


	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue'
	export default {
		components: {
			modalComponent,
			btnComponent
		},
		data() {
			return {
				showLoading: true,
				requestCount: 6,

				userCurrency: {},

				star: {},
				userRankList: [],
				chartList: [],
				index: -1, // 聊天窗位置
				modal: '', // 模态框名称
				chartMsg: '', // 聊天输入内容
				sendCount: 0, // 赠送人气数额
				starRankList: [],
				invitAward: {}, // 邀请奖励
				invitList: [], // 我的邀请列表
				rechargeList: [], // 充值商品列表
				danmaku: null, // 当前弹幕
				danmakuQueue: [], // 弹幕队列
				treasureTime: '寻宝', // 寻宝倒计时
				article:{},// 公告文章
			};
		},
		methods: {
			/**
			 * 加载数据
			 */
			load(starid) {
				this.star.id = starid
				if (!this.star.id) return

				this.getStarInfo()
				this.getUserRank()
				this.getChartList()
				this.joinGroup()
				this.treasureInterval()
				this.getArticle()
				
				this.initDanmaku()

				this.userCurrency = this.$app.getData('userCurrency') || {
					coin: 0,
					stone: 0,
					trumpet: 0
				}
			},
			openStealModal() {
				if (!this.$app.getData('userStar')['id']) {
					this.$app.toast('请先加入圈子')
				} else {
					this.modal = 'steal'
					this.getStarRank()
				}
			},

			/**
			 * formId用于向用户推送模板消息
			 */
			getFormId(e) {
				console.log(e.detail.formId);
			},
			treasure() {
				if (this.treasureTime === '寻宝') {
					this.$app.request(this.$app.API.TREASURE_SETTLE, {}, res => {
						this.$app.toast('寻宝获得能量+' + res.data)
						this.treasureInterval()

						this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
							this.$app.setData('userCurrency', res.data)
						})
					}, 'POST', true)
				}
			},
			treasureInterval() {
				this.$app.request(this.$app.API.TREASURE, {}, res => {
					if (res.data !== 0) {
						let time = res.data
						this.treasureTime = this.$app.timeGethms(time).str.slice(4)

						clearInterval(this.$app.treasureTimeId)
						this.$app.treasureTimeId = setInterval(() => {
							this.treasureTime = this.$app.timeGethms(--time).str.slice(4)
							if (time <= 0) {
								clearInterval(this.$app.treasureTimeId)
								this.treasureTime = '寻宝'
							}
						}, 1000)
					} else {
						this.treasureTime = '寻宝'
					}

					this.$app.closeLoading(this)
				})
			},
			/**
			 * 收到推送信息
			 * 添加聊天内容
			 */
			addChartMsg(data) {
				const item = {
					uid: data.user_id,
					avatar: data.user.avatarurl,
					nickname: data.user.nickname || this.$app.NICKNAME,
					content: data.content,
					sendtimeInt: this.$app.strToTime(data.create_time),
				}
				const leastTime = this.chartList[this.chartList.length - 1] && this.chartList[this.chartList.length - 1].sendtimeInt ||
					0
				if (item.sendtimeInt - leastTime > 60 * 5) {
					// 3分钟以上显示时间
					item.sendtime = data.create_time.slice(11)
				}
				this.chartList.push(item)

				this.$nextTick(function() {
					this.index = this.chartList.length - 1
				})
			},
			// 偷花倒计时
			startStealTimeInterval(index) {
				this.$app.timeId.push(setInterval(() => {
					--this.starRankList[index].steal
				}, 1000))
			},
			// 初始化世界喊话弹幕
			initDanmaku() {
				clearInterval(this.$app.sayworldTimeId)
				this.$app.sayworldTimeId = setInterval(() => {
					this.danmaku = this.danmakuQueue.shift() || null
				}, 10000)
			},

			// HTTP

			// 收到socket推送，将弹幕加到danmakuQueue中
			addDanmaku(data) {
				this.danmakuQueue.push(data)
			},
			// 喊话
			sayworld() {
				if (!this.chartMsg.trim()) return
				if (this.chartMsg.trim().length > 16) {
					this.$app.toast('内容过长')
					return
				}
				this.$app.request(this.$app.API.USER_SAYWORLD, {
					content: this.chartMsg.trim()
				}, res => {
					this.chartMsg = ''
					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						if (this.$app.getData('userCurrency')['trumpet'] == res.data.trumpet) {
							this.$app.toast('喊话失败，请稍后再试')
						} else {
							this.$app.toast('喊话成功', 'success')
						}
						this.$app.setData('userCurrency', res.data)
						this.userCurrency = this.$app.getData('userCurrency')
					})

				})
			},

			/**
			 * 保存用户详细信息
			 */
			getUserInfo(e) {
				const userInfo = e.detail.userInfo
				if (userInfo) {
					this.$app.request(this.$app.API.USER_SAVEINFO, userInfo, res => {
						this.$app.request(this.$app.API.USER_INFO, {}, res => {
							this.$app.setData('userInfo', res.data)
							this.sendOrFollow()
						})
					}, 'POST', true)
				}
			},
			/**偷能量*/
			steal(starid, index, steal) {
				if (steal > 0) return
				this.$app.request(this.$app.API.STAR_STEAL, {
					starid,
					index
				}, res => {
					this.$app.toast(`偷到了${res.data.count}能量`)

					this.getStarRank()
					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						this.$app.setData('userCurrency', res.data)
					})
				}, 'POST', true)
			},
			getInvitAward(uid, status) {
				if (status) return
				this.$app.request(this.$app.API.USER_INVITAWARD, {
					ral_user_id: uid
				}, res => {
					this.$app.toast('领取成功')
					this.getInvitList()
					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						this.$app.setData('userCurrency', res.data)
					})
				}, 'POST', true)
			},
			getInvitList() {
				this.modal = 'invit'
				this.$app.request(this.$app.API.USER_INVITLIST, {}, res => {
					this.invitAward = res.data.award
					const resList = []
					res.data.list.forEach((e, i) => {
						resList.push({
							avatar: e.user.avatarurl || this.$app.AVATAR,
							status: e.status,
							uid: e.ral_user_id
						})
					})
					this.invitList = resList
				})
			},
			/**
			 * 贡献人气
			 */
			sendHot(count) {
				if (count) this.sendCount = count
				if (!parseInt(this.sendCount)) {
					this.$app.toast('数额不正确')
					return
				}
				this.$app.request(this.$app.API.STAR_SENDHOT, {
					starid: this.star.id,
					hot: parseInt(this.sendCount),
				}, res => {
					this.modal = ''
					this.getStarInfo()

					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						this.$app.setData('userCurrency', res.data)
					})
					this.$app.toast('打榜成功')
				}, 'POST', true)
			},
			/**
			 * 发送留言
			 */
			sendMsg() {
				if (!this.chartMsg.trim()) return

				this.$app.request(this.$app.API.STAR_SENDMSG, {
					starid: this.star.id,
					content: this.chartMsg.trim(),
				}, res => {
					this.chartMsg = ''
				})
			},
			/**
			 * 加入明星圈子
			 */
			sendOrFollow() {
				if (this.$app.getData('userStar')['id']) {
					if (this.$app.getData('userStar')['id'] == this.star.id) {
						this.modal = 'send'
					} else {
						this.$app.toast(`不能为其他爱豆打榜哦~`)
					}
				} else {
					// 未加入圈子
					this.$app.modal(`是否加入${this.star.name}的圈子？`, () => {
						this.$app.request(this.$app.API.STAR_FOLLOW, {
							starid: this.star.id,
							rer_user_id: this.$app.getData('referrer'), // 推荐人
						}, res => {
							this.$app.request(this.$app.API.USER_STAR, {}, res => {
								this.$app.setData('userStar', res.data)
								this.$app.goPage('/pages/group/group')
							})
						}, 'POST', true)
					})
				}
			},
			getStarInfo() {
				this.$app.request(this.$app.API.STAR_INFO, {
					starid: this.star.id
				}, res => {
					const star = res.data
					this.star = {
						id: star.id,
						avatar: star.head_img_s ? star.head_img_s : star.head_img_l,
						name: star.name,
						weekHot: this.$app.formatNumberRgx(star.star_rank.week_hot),
						monthHot: this.$app.formatNumberRgx(star.star_rank.month_hot),
						weekRank: star.star_rank.week_hot_rank,
						monthRank: star.star_rank.month_hot_rank,
					}

					this.$app.closeLoading(this)
				})
			},
			getArticle() {
				this.$app.request(this.$app.API.ARTICLE, {}, res => {
					this.article.name = res.data.name
					this.article.id = res.data.id
					this.$app.closeLoading(this)
				})
			},
			getStarRank() {
				this.$app.request(this.$app.API.STAR_RANK, {
					type: 1
				}, res => {
					console.log('steal', this.$app.timeId);
					// 清除steal倒计时定时器
					if (!this.$app.timeId) this.$app.timeId = []
					for (let v of this.$app.timeId) {
						clearInterval(v)
					}
					this.$app.timeId = []
					const resList = []
					let index = 0
					res.data.list.forEach((e, i) => {
						if (i < 6 && e.star.id != this.$app.getData('userStar')['id']) {
							resList.push({
								starid: e.star.id,
								name: e.star.name,
								avatar: e.star.head_img_s ? e.star.head_img_s : e.star.head_img_l,
								hot: this.$app.formatNumberRgx(e['week_hot']),
								steal: res.data.steal[index]
							})
							if (res.data.steal[index] > 0) {
								this.startStealTimeInterval(index)
							}
							index++
						}
					})

					this.starRankList = resList
				})
			},
			getUserRank() {
				this.$app.request(this.$app.API.USER_RANK, {
					starid: this.star.id,
				}, res => {
					const resList = []
					res.data.forEach((e, i) => {
						if (i < 3) {
							resList.push({
								avatar: e.user.avatarurl || this.$app.AVATAR
							})
						}
					})
					this.userRankList = resList

					this.$app.closeLoading(this)
				})
			},

			getChartList() {
				this.$app.request(this.$app.API.STAR_CHART, {
					starid: this.star.id,
				}, res => {
					const resList = []
					res.data.forEach((e, i) => {
						const item = {
							uid: e.user.id,
							avatar: e.user.avatarurl || this.$app.AVATAR,
							nickname: e.user.nickname || this.$app.NICKNAME,
							content: e.content,
							sendtimeInt: this.$app.strToTime(e.create_time),
						}
						const leastTime = resList[i - 1] && resList[i - 1].sendtimeInt || 0
						if (item.sendtimeInt - leastTime > 60 * 5) {
							item.sendtime = e.create_time.slice(11)
						}

						resList.push(item)
					})

					this.chartList = resList
					this.$nextTick(function() {
						this.index = this.chartList.length - 1
					})

					this.$app.closeLoading(this)
				})
			},
			/**
			 * 加入聊天室
			 */
			joinGroup() {
				this.$app.request(this.$app.API.STAR_JOINCHART, {
					star_id: this.star.id,
					client_id: this.$app.getData('clientId')
				}, res => {
					this.$app.closeLoading(this)
				})
			},
		}

	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		height: 100%;

		.top-container {

			.top-content {
				border-top-left-radius: 10upx;
				border-top-right-radius: 10upx;

				.danmaku-wrapper {
					height: 50upx;

					@keyframes sayworld {
						0% {
							transform: translateX(750rpx);
						}

						10%,
						90% {
							transform: translateX(0);
						}

						100% {
							transform: translateX(-750rpx);
						}
					}

					.danmaku {
						display: flex;
						position: relative;
						animation: sayworld 10s linear infinite;
						align-items: center;

						.avatar {
							width: 38upx;
							height: 38upx;
							border-radius: 50%;
							position: absolute;
							top: 0;
							transform: translateX(-50%);
						}

						.content {
							background: linear-gradient(to right, #ffbd41, #ffcf72);
							padding-left: 30upx;
							font-size: 26upx;
							color: #FFF;
							padding-right: 10upx;
							height: 38upx;
							line-height: 38upx;
						}

						.tail {
							width: 44upx;
							height: 38upx;
							margin-left: -2upx;
						}
					}
				}

				.row-info {
					padding: 0 20upx;
					display: flex;
					justify-content: space-around;
					padding-bottom: 20upx;

					.avatar {
						position: relative;
						overflow: hidden;
						border-radius: 50%;
						width: 150upx;
						height: 150upx;

						.tips {
							position: absolute;
							width: 100%;
							background-color: rgba(0, 0, 0, .3);
							bottom: 0;
							height: 56upx;
							color: #fff;
							font-size: 26upx;
							text-align: center;
							line-height: 40upx;
						}
					}

					.top-text-wrapper {
						color: $color_1;
						// width: 280upx;
						display: flex;
						flex-direction: column;
						justify-content: center;

						.star-name {
							font-size: 34upx;
							font-weight: 700;
							display: flex;
							align-items: center;
							margin-bottom: 18upx;

							.join {
								background-color: #f7ab5f;
								border-radius: 20upx;
								font-size: 26upx;
								font-weight: 300;
								color: #FFF;
								padding: 6upx 10upx;
								margin: 0 14upx;
							}

						}

						.bottom {
							display: flex;

							image {
								width: 34upx;
								height: 34upx;
								margin-right: 10upx;
							}
						}

						.rank-list {
							display: flex;

							.rank-list-container {
								display: flex;

								.item {
									position: relative;
									margin-right: 4upx;

									.avatar {
										width: 46upx;
										height: 46upx;
										border-radius: 50%;
									}

									.badge {
										position: absolute;

										bottom: -4upx;
										right: -4upx;

										width: 22upx;
										height: 22upx;

									}
								}
							}

							.more-btn {
								padding: 0 10upx;
								padding-top: 6upx;
								color: $color_1;
							}

						}


					}
				}
			}

			.func-container {
				height: 100upx;
				overflow: hidden;
				display: flex;
				align-items: center;
				background-color: #FFF;
				position: relative;

				.func-list-wrapper {
					height: 100%;
					background-color: $color_3;
					display: flex;
					justify-content: space-around;
					width: 100%;

					.func-item {
						font-size: 24upx;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;

						image {
							width: 60upx;
							height: 60upx;
						}
					}

				}

				.lottery-btn {
					transform: translateY(-50%) rotate(45deg);
					position: absolute;
					color: #FFF;
					font-size: 18upx;
					height: 180upx;
					width: 180upx;
					right: 0;
					top: 50%;

					.wrapper {
						transform: translate(-50%, -50%) rotate(-45deg);
						position: absolute;

						image {
							width: 94upx;
							height: 94upx;
							position: relative;
						}

						.text1 {
							position: absolute;
							left: 50%;
							transform: translateX(-50%);
							bottom: 24upx;
						}

						.countdown {
							position: absolute;
							left: 50%;
							bottom: 4upx;
							transform: translateX(-50%);
						}
					}
				}
			}

			.notice-container {
				padding: 0 20upx;
				color: $color_2;
				font-size: 24upx;
				height: 54upx;
				display: flex;
				justify-content: space-between;
				// background-color: #9974b5;
				align-items: center;
				box-shadow: 0 0 1px rgba(0, 0, 0, .3);

				.left {
					display: flex;
				}

			}
		}

		.chart-container {
			flex: 1;
			overflow-y: auto;
			position: relative;

			.msg-item {
				padding: 16upx 32upx;
				// display: flex;

				.sendtime-wrapper {
					text-align: center;
					color: #999;
					font-size: 24upx;
				}

				.main-msg-wrapper {
					display: flex;

					.avatar {
						width: 80upx;
						height: 80upx;
						border-radius: 50%;
						margin-right: 10upx;
						margin-left: 10upx;
					}

					.content {
						flex: 1;

						.top {
							display: flex;
							justify-content: space-between;
							align-items: center;

							.left {
								display: flex;
								align-items: center;

								.name {
									max-width: 250upx;
								}

								.fan {
									display: flex;
									align-items: center;
									margin-left: 10upx;

									image {
										width: 32upx;
										height: 32upx;
									}

									.fan-text {
										background: linear-gradient(to right, #FFF, #ffcccc);
										border-radius: 20upx;
										color: #fd9176;
										font-size: 24upx;
										padding: 2upx 12upx;
										margin-left: -12upx;
									}

								}

							}

							.right {
								color: #999;
								font-size: 22upx;
							}
						}

						.bottom {
							display: flex;

							.msg-content {
								margin-top: 2upx;
								background-color: #f0f0f0;
								color: #979797;
								border-radius: 14upx;
								padding: 10upx 30upx;
								max-width: 470upx;
								word-break: break-all;
								display: block;
							}
						}
					}

				}
			}

			.msg-item.right {
				.main-msg-wrapper {
					flex-direction: row-reverse;

					.top {
						flex-direction: row-reverse;
					}

					.bottom {
						flex-direction: row-reverse;

						.msg-content {
							background-color: #97c7db;
							color: #FFF;

						}
					}
				}

			}

			.msg-item:first-of-type {
				padding-top: 32upx;

			}

			.msg-item:last-of-type {
				padding-bottom: 32upx;
			}

		}

		.msg-button {
			position: fixed;
			right: 30upx;
			bottom: 30upx;
			width: 83upx;
			height: 81upx;
		}

		.msg-input-container {
			display: flex;
			justify-content: space-between;
			position: relative;
			bottom: 0;
			left: 0;
			background-color: #d8d9db;
			right: 0;
			align-items: center;
			height: 100upx;

			.trumpet-wrapper {
				position: relative;
				margin-left: 20upx;

				.trumpet {
					position: absolute;
					right: -10upx;
					top: 0upx;
					font-size: 20upx;
				}
			}

			input {
				width: 450upx;
				background-color: #FFF;
				border-radius: 60upx;
				height: 75upx;
				padding: 0 30upx;
			}

			image {
				width: 75upx;
				height: 75upx;

			}

			.send-btn-wrapper {
				height: 100%;
				border-top-left-radius: 60upx;
				border-bottom-left-radius: 60upx;
				background-color: $color_0;
				width: 100upx;

			}
		}

		.send-modal-container {
			width: 100%;
			height: 100%;
			padding: 30upx;
			display: flex;
			flex-direction: column;
			justify-content: center;

			// .tab-wrapper{
			// 	height: 50upx;
			// }
			.explain-wrapper {
				font-size: 24upx;
			}

			.btn-wrapper {
				margin-top: 50upx;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;

				.btn {
					padding: 16upx 10upx;

					image {
						width: 36upx;
					}
				}

				.btn.self-input {
					flex: 1;
					min-width: 100upx;

					input {
						background-color: $color_3;
						border-radius: 60upx;
						width: 100%;
						height: 100%;
						text-align: center;
					}
				}

				.btn.pick {
					font-size: 34upx;
					font-weight: 700;
				}
			}

			.bottom-wrapper {
				display: flex;
				justify-content: space-around;
				font-size: 32upx;
				font-weight: 700;
			}
		}

		.steal-modal-container {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;

			.tips-wrapper {
				padding: 10upx 30upx;
				background-color: #fb648d;
				border-radius: 30upx;
				color: #FFF;
			}

			.list-wrapper {
				.item {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					padding: 10upx 20upx;
					border-radius: 60upx;
					background-color: rgba(255, 255, 255, .3);
					margin: 10upx;

					.rank-num {
						width: 90upx;
						text-align: center;
					}

					.avatar image {
						width: 90upx;
						height: 90upx;
						border-radius: 50%;
					}

					.text-container {
						width: 280upx;
						padding: 0 30upx;
						line-height: 44upx;

						.bottom-text {
							display: flex;
							align-items: center;

							.hot-count {
								color: $color_2;
								margin-right: 4upx;
							}

							.icon-heart {
								width: 30upx;
								height: 30upx;
							}
						}
					}



				}

			}
		}

		.invit-modal-container {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;

			.explain-wrapper {
				padding: 20upx;

				.top {
					font-size: 34upx;
					font-weight: 700;

					text {
						color: orange;
					}
				}

				.bottom {
					font-size: 22upx;
				}
			}

			.list-wrapper {
				overflow-y: auto;
				height: 480upx;

				.item {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					padding: 10upx 20upx;
					border-radius: 60upx;
					background-color: rgba(255, 255, 255, .3);
					margin: 10upx;

					.rank-num {
						width: 90upx;
						text-align: center;
					}

					.avatar image {
						width: 90upx;
						height: 90upx;
						border-radius: 50%;
					}

					.text-container {
						width: 300upx;
						padding: 0 30upx;
						line-height: 44upx;

						.bottom-text {
							display: flex;
							align-items: center;

							.hot-count {
								color: $color_2;
								margin-right: 4upx;
							}

							.icon-heart {
								width: 30upx;
								height: 30upx;
							}
						}
					}



				}

			}

		}

	}
</style>

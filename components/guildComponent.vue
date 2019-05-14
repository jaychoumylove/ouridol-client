<template>
	<view class='guild-container'>
		<!-- <loadIconComponent v-if="showLoading" type='whole'></loadIconComponent> -->
		<!-- 新手指引 -->
		<view v-if="tips" class="tips-container" @tap="tips=false">
			<image class='image' src="/static/image/star/blank-1.png" mode="widthFix"></image>
		</view>

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
					<image class="avatar" :src="star.avatar" mode="aspectFill"></image>
					<!-- <view class="tips">分享海报</view> -->

					<view class="top-text-wrapper">
						<view class="star-name">
							<view class="star-name-wrapper text-overflow">{{star.name}}</view>
							<block v-if="!app.getData('userStar')['id']">
								<button v-if="!app.getData('userInfo')['nickname']" class="join flex-set" open-type="getUserInfo" @getuserinfo="getUserInfo">
									+加入
								</button>
								<button v-if="app.getData('userInfo')['nickname']" class="join flex-set" @tap="sendOrFollow">
									+加入
								</button>
							</block>

						</view>
						<view class="rank-list" @tap="app.goPage('/pages/user/rank/rank?starid='+star.id)">
							<view class="rank-list-container">
								<view class="item" v-for="(item,index) in userRankList" :key="index" v-if="index < 3">
									<image class="avatar-s" :src="item.avatar" mode="aspectFill"></image>
									<image class="badge" :src="'/static/image/guild/u'+(index+1)+'.png'" mode="widthFix"></image>
								</view>
							</view>
							<view class="more-btn">贡献榜></view>
						</view>
					</view>
					<view class="top-text-wrapper">
						<view class="star-name">本期 NO.{{star.weekRank}}</view>
						<view class='bottom'>
							<image class='image' src="/static/image/index/ic_hot.png" mode=""></image>
							<view>{{star.weekHot}}</view>
						</view>
					</view>

					<!-- 送人气按钮 -->
					<!-- <button v-if="!app.getData('userInfo')['nickname']" class="sendflower-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">
						<image src="/static/image/guild/hart.png" mode=""></image>
					</button> -->
				</view>
			</view>

			<view class="func-container">
				<view class="func-list-wrapper">
					<view class="func-item" @tap="app.goPage('/pages/task/task')">
						<btnComponent>
							<image src="/static/image/guild/t1.png" mode=""></image>
						</btnComponent>
						<view class="">任务</view>
					</view>

					<view class="func-item" @tap="modal='invit';getInvitList();">
						<btnComponent>
							<view class="btn-wrap">
								<image src="/static/image/guild/t3.png" mode="widthFix"></image>
								<view class="badge-wrap" v-if="spriteEarn">
									<badgeComponent size="8"></badgeComponent>
								</view>
							</view>
						</btnComponent>
						<view class="">助人为乐</view>
					</view>
					<view class="func-item" @tap="goFather">
						<btnComponent>
							<view class="btn-wrap">
								<image src="/static/image/guild/t2.png" mode="widthFix"></image>
								<view class="badge-wrap" v-if="fatherEarn">
									<badgeComponent size="8"></badgeComponent>
								</view>
							</view>
						</btnComponent>
						<view class="">师徒</view>
					</view>
					<view class="func-item" @tap="getFakeInviteList()">
						<btnComponent>
							<image src="/static/image/guild/t3-1.png" mode="widthFix"></image>
						</btnComponent>
						<view class="">拉票</view>
					</view>
					<!-- <view class="func-item" @tap="app.goPage('/pages/group/dynamic/dynamic?starid='+star.id+'&starname='+star.name)">
						<btnComponent>
							<image src="/static/image/guild/t4.png" mode=""></image>
						</btnComponent>
						<view class="">动态</view>
					</view> -->
					<!-- <view class="func-item" @tap="isTreasure = Date.now()">
						<button open-type="share">
							<btnComponent>
								<image src="/static/image/guild/t5.png" mode=""></image>
							</btnComponent>
						</button>
						<view class="">{{treasureTime}}</view>
					</view> -->
					<view class="func-item" @tap="goMass">
						<btnComponent>
							<view class="btn-wrap">
								<image src="/static/image/guild/mass-1.png" mode="widthFix"></image>
								<view class="badge-wrap" v-if="mass.status==1">
									<badgeComponent size="8"></badgeComponent>
								</view>
							</view>
						</btnComponent>
						<view class="" v-if="mass.status==0">集结</view>
						<view class="" v-if="mass.status==1">集结中</view>
						<view class="" v-if="mass.status==2">冷却中</view>
					</view>

				</view>
			</view>

			<view class="notice-container" @tap="app.goPage('/pages/notice/notice?id='+article.id)">
				<view class="left">
					<view class="sign">【公告】</view>
					<view class="content">{{article.name}}</view>
				</view>
				<view class="right" @tap.stop="app.goPage('/pages/notice/list/list')">更多>></view>
			</view>
		</view>

		<scroll-view v-if="star.id == app.getData('userStar')['id']" class="chart-container" scroll-y :scroll-with-animation="!showLoading"
		 :scroll-into-view="'index_'+index">
			<view :id="'index_'+index" class="msg-item" :class="{right:item.uid==app.getData('userInfo')['id']}" v-for="(item,index) in chartList"
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
		<view class="chart-container rank-list" v-else>
			<view class="item" v-for="(item,index) in userRankList" :key="index">
				<view class="rank-num">
					<image v-if="index<3" :src="'/static/image/guild/'+(index+1)+'.png'" mode="widthFix"></image>
					<view v-else>{{index+1}}</view>
				</view>
				<view class='avatar'>
					<image :src="item.avatar" mode="aspectFill"></image>
				</view>
				<view class="text-container">
					<view class="star-name text-overflow">{{item.nickname}}</view>

				</view>
				<!-- <view class="level">lv10</view> -->
				<view class="count">{{item.hot}}</view>

			</view>
		</view>
		<!-- <image v-if="star.id == app.getData('userStar')['id']" class="msg-button" @tap="msgModal = true" src="/static/image/guild/write-btn.png"
		 mode=""></image> -->

		<view class="msg-input-container" v-if="star.id == app.getData('userStar')['id']">
			<btnComponent>
				<view class="trumpet-wrapper">
					<image src="/static/image/guild/sayworld.png" mode="" @tap="sayworld"></image>
					<view class="trumpet">{{userCurrency.trumpet}}</view>
				</view>
			</btnComponent>
			<input type="text" :value="chartMsg" confirm-type="send" @confirm="sendMsg" @input="chartMsg = $event.detail.value"
			 placeholder="快来和小伙伴们聊天吧" />
			<btnComponent>
				<image src="/static/image/guild/sendmsg.png" mode="" @tap="sendMsg"></image>
			</btnComponent>
			<view class="send-btn-wrapper flex-set">
				<btnComponent>
					<form report-submit @submit="sendOrFollow">
						<button form-type="submit">
							<image src="/static/image/guild/send-give.png" mode=""></image>
						</button>
					</form>
				</btnComponent>
			</view>

		</view>

		<!-- MODAL -->
		<modalComponent v-if="modal == 'send'" title="打榜" @closeModal="modal=''">
			<view class="send-modal-container">
				<!-- <view class="tab-wrapper"></view> -->
				<!-- <view class="explain-wrapper">说明：还未确定后完全好大无穷皇帝和我去我前进的气温降低哦</view> -->
				<view class="bottom-wrapper">
					<view class="text">我的能量：{{app.getData('userCurrency')['coin']}}</view>

					<view class="text flex-set" @tap="app.goPage('/pages/recharge/recharge')" v-if="app.getData('sysInfo').system.indexOf('iOS') == -1">
						<image src="/static/image/star/4.png" mode="widthFix" style="width: 35upx;"></image>补充能量 >
					</view>
					<button open-type="contact" show-message-card v-if="app.getData('sysInfo').system.indexOf('iOS') != -1 && $app.getData('config').ios_switch == 1">
						<view class="text flex-set">
							<image src="/static/image/star/4.png" mode="widthFix" style="width: 35upx;"></image>补充能量 回复"1"
						</view>
					</button>

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
						<view class="steal-count flex-set">+{{item.steal_count}}
							<image src="/static/image/user/b1.png" mode="widthFix"></image>
						</view>
						<view class="btn" @tap="steal(item.starid,index,item.steal)">
							<btnComponent type="default">
								<view class="flex-set" style="width: 130upx;height: 65upx;">{{item.steal>0?item.steal:'偷取'}}</view>
							</btnComponent>
						</view>
					</view>
				</view>
			</view>
		</modalComponent>

		<modalComponent v-if="modal == 'invit_desert'" title="拉票" @closeModal="modal=''">
			<view class="invit-fake-modal-container">

				<view class="explain-wrapper">
					<view class="top">已邀请<text> {{fakeinvitList.length}} </text>人</view>
					<view class="bottom">被邀请人任意加入一个偶像圈即可领取奖励</view>
				</view>
				<scroll-view scroll-y class="list-wrapper">
					<view class="item" v-for="(item,index) in fakeinvitList" :key="index">
						<view class='avatar'>
							<image :src="item.avatar" mode="aspectFill"></image>
						</view>
						<view class="text-container">
							<view class="star-name">第{{index+1}}位好友</view>
							<view class="bottom-text">
								<view class="hot-count">能量+{{invitAward.coin}}</view>
								<view class="hot-count" v-if="invitAward.stone"> 灵丹+{{invitAward.stone}}</view>
							</view>
						</view>
						<view class="btn">
							<btnComponent :type="item.status==2?'disable':'success'" @tap="getInvitAward(item.uid,item.status)">
								<view class="flex-set" style="width: 130upx;height: 65upx;">{{item.status==2?'已领取':'领取'}}</view>
							</btnComponent>
						</view>
					</view>
					<!-- #ifdef MP -->
					<view class="item" v-for="n in invitNum" :key="n" v-if="fakeinvitList.length + n + 1 <= 100">
						<!-- #endif -->
						<!-- #ifdef H5 -->
						<view class="item" v-for="n in invitNum" :key="n" v-if="fakeinvitList.length + n <= 100">
							<!-- #endif -->
							<view class='avatar'>
								<image src="/static/image/ic_wechat.png" mode="aspectFill"></image>
							</view>
							<view class="text-container">
								<!-- #ifdef H5 -->
								<view class="star-name">第{{fakeinvitList.length + n}}位好友</view>
								<!-- #endif -->
								<!-- #ifdef MP -->
								<view class="star-name">第{{fakeinvitList.length + n + 1}}位好友</view>
								<!-- #endif -->
								<view class="bottom-text">
									<view class="hot-count">能量+{{invitAward.coin}}</view>
									<view class="hot-count" v-if="invitAward.stone"> 灵丹+{{invitAward.stone}}</view>
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

		<modalComponent v-if="modal == 'mass'" title="集结" @closeModal="modal=''">
			<view class="mass-modal-container">
				<view class="explain-wrapper flex-set">{{$app.getData('config').share_mass.text}}</view>
				<view class="cutdown" v-if="mass.status==0">{{app.getData('config').share_mass.day_limit == mass.mass_times?'今日集结次数已达上限':'每人每天可助力TA人1次'}}</view>
				<view class="cutdown" v-if="mass.status==1">集结剩余时间：{{mass.lefttime}}</view>
				<view class="cutdown" v-if="mass.status==2">集结冷却时间：{{mass.lefttime}}</view>
				<view class="ava-wrapper">
					<view class="ava flex-set" v-for="(item,index) in mass.mass_user" :key="index">
						<image :src="item.user.avatarurl||app.AVATAR" mode="aspectFill"></image>
					</view>

					<button v-if="8-mass.mass_user.length>0" open-type="share" v-for="n in 8-mass.mass_user.length" :key="n" @tap="startMass"
					 data-share="2">
						<view class="ava flex-set">
							<view class="add-icon">+</view>
						</view>
					</button>
				</view>
				<view class="btn-wrapper">
					<btnComponent type="default" v-if="mass.status==0">
						<button open-type="share" @tap="startMass" data-share="2">
							<view class="flex-set" style="min-width: 180upx;height: 90upx;">新的集结</view>
						</button>
					</btnComponent>
					<btnComponent type="default" v-if="mass.status==1">
						<button open-type="share" @tap="startMass" data-share="2">
							<view class="flex-set" style="width: 180upx;height: 90upx;">继续集结</view>
						</button>
					</btnComponent>
					<btnComponent type="default" v-if="mass.status==2">
						<view class="flex-set" style="width: 180upx;height: 90upx;">冷却中</view>
					</btnComponent>
					<btnComponent type="default" v-if="mass.isSettle" @tap="settleMass">
						<view class="flex-set" style="width: 180upx;height: 90upx;">结算</view>
					</btnComponent>
				</view>
			</view>
		</modalComponent>

		<modalComponent v-if="modal == 'invit'" title="好友" @closeModal="modal=''">
			<view class="invit-modal-container">

				<scroll-view scroll-y class="list-wrapper">

					<!-- <view class="explain-wrapper">
						<view class="flex-set">
							<image src="/static/image/ic_haibao__bak.png" mode="widthFix"></image>
							加好友一起养精灵
						</view>
						<btnComponent type="default">
							<button class="btn" open-type="share" data-share="1">
								<view class="flex-set" style="width: 160upx; height: 80upx;">邀请好友</view>
							</button>
						</btnComponent>
					</view> -->
					<button class='explain-wrapper' open-type="share" data-share="1">
						<image style="width: 100%;" :src="app.getData('config').zhuren_tips_img" mode="widthFix"></image>
					</button>
					<block v-if="invitList.length > 0">
						<view class="item" v-for="(item,index) in invitList" :key="index" @tap="goOther(item.uid)">
							<view class="rank-num">
								<image v-if="index<3" :src="'/static/image/guild/'+(index+1)+'.png'" mode="widthFix"></image>
								<view v-else>{{index+1}}</view>
							</view>
							<view class='avatar'>
								<image :src="item.avatar" mode="aspectFill"></image>
							</view>
							<view class="text-container">
								<view class="star-name text-overflow">{{item.nickname}}</view>
							</view>
							<view class="egg flex-set">
								<view class="num-wrapper position-set">{{item.earn}}</view>
								<image class="flex-set" src="/static/image/pet/y5.png" mode="widthFix"></image>
							</view>
						</view>
					</block>
					<view v-else class="nodata flex-set">
						<view class="top">你还没有好友</view>
						<button open-type="share" data-share="1">
							<view class="bottom">加一位好友></view>
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
	import listItemComponent from '@/components/listItemComponent.vue'
	import badgeComponent from '@/components/badgeComponent.vue'
	export default {
		components: {
			modalComponent,
			btnComponent,
			listItemComponent,
			badgeComponent
		},
		data() {
			return {
				app: this.$app,
				showLoading: true,
				requestCount: 7,
				tips: false,

				userCurrency: {},

				star: {
					weekRank: 0,
				},
				userRankList: [],
				chartList: [],
				index: -1, // 聊天窗位置
				modal: '', // 模态框名称
				chartMsg: '', // 聊天输入内容
				sendCount: 0, // 赠送人气数额
				starRankList: [],
				invitAward: {}, // 邀请奖励
				invitList: [], // 我的邀请列表
				invitNum: 10, // 拉票列表数量
				spriteEarn: false,
				rechargeList: [], // 充值商品列表
				danmaku: null, // 当前弹幕
				danmakuQueue: [], // 弹幕队列
				// treasureTime: '助力', // 助力倒计时
				// isTreasure: false,
				article: {}, // 公告文章

				mass: {}, // 集结相关

				fakeinvitList: [],

				fatherEarn: 0,
			};
		},
		methods: {
			/**
			 * 加载数据
			 */
			load(starid) {
				this.star.id = starid
				if (!this.star.id) return
				if (this.$app.getData('userStar').id == this.star.id && this.$app.noob) {
					// 新手指引
					this.tips = true
					this.$app.noob = false
				}
				this.getStarInfo()
				this.getUserRank()
				this.getChartList()
				this.joinGroup()
				this.getMass()
				this.getInvitList()
				// this.treasureInterval()
				this.getArticle()
				this.checkFatherEarn()

				this.initDanmaku()

				this.userCurrency = this.$app.getData('userCurrency') || {
					coin: 0,
					stone: 0,
					trumpet: 0
				}

				// 分享计时
				// if (this.isTreasure) {
				// 	if (Date.now() - this.isTreasure > 5 * 1000) {
				// 		this.treasure()
				// 	} else {
				// 		this.$app.toast('请分享到不同的群')
				// 	}
				// 	this.isTreasure = false
				// }
			},
			unLoad() {
				this.leaveGroup()
			},
			goFather() {
				if (this.$app.getData('userStar').id) {
					this.$app.goPage('/pages/father/father')
				} else {
					this.$app.toast('请先加入偶像圈')
				}
			},
			goMass() {
				if (this.$app.getData('userStar').id) {
					this.modal = 'mass';
					this.getMass();
				} else {
					this.$app.toast('请先加入偶像圈')
				}
			},
			openStealModal() {
				if (!this.$app.getData('userStar')['id']) {
					this.$app.toast('请先加入偶像圈')
				} else {
					this.modal = 'steal'
					this.getStarRank()
				}
			},
			checkFatherEarn() {
				this.$app.request(this.$app.API.USER_CHECKEARN, {}, res => {

					this.fatherEarn = res.data

				})
			},
			// 			treasure() {
			// 				if (this.treasureTime === '助力') {
			// 					this.$app.request(this.$app.API.TREASURE_SETTLE, {}, res => {
			// 						this.$app.toast('助力获得能量+' + res.data)
			// 						this.treasureInterval()
			// 
			// 						this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
			// 							this.$app.setData('userCurrency', res.data)
			// 						})
			// 					})
			// 				} else {
			// 					this.$app.toast('宝箱正在冷却中')
			// 				}
			// 
			// 			},
			// 			treasureInterval() {
			// 				this.$app.request(this.$app.API.TREASURE, {}, res => {
			// 					if (res.data !== 0) {
			// 						let time = res.data
			// 						this.treasureTime = this.$app.timeGethms(time).str.slice(4)
			// 
			// 						// 宝箱倒计时
			// 						clearInterval(this.$app.treasureTimeId)
			// 						this.$app.treasureTimeId = setInterval(() => {
			// 							this.treasureTime = this.$app.timeGethms(--time).str.slice(4)
			// 							if (time <= 0) {
			// 								clearInterval(this.$app.treasureTimeId)
			// 								this.treasureTime = '助力'
			// 							}
			// 						}, 1000)
			// 					} else {
			// 						this.treasureTime = '助力'
			// 					}
			// 
			// 					this.$app.closeLoading(this)
			// 				})
			// 			},
			/**获取集结信息*/
			getMass() {
				this.$app.request(this.$app.API.SHARE_MASS, {}, res => {
					this.mass = res.data

					if (res.data.mass_user.length >= 3 && res.data.mass_settle_time < res.data.mass_start_time) {
						// 超过3个人可结算
						this.mass.isSettle = true
					}
					if (res.data.lefttime) {
						// 倒计时
						let time = parseInt(res.data.lefttime)
						this.mass.lefttime = this.$app.timeGethms(time).str.slice(3)
						clearInterval(this.$app.massTimeId)
						this.$app.massTimeId = setInterval(() => {
							this.mass.lefttime = this.$app.timeGethms(--time).str.slice(3)
							if (time <= 0) {
								clearInterval(this.$app.massTimeId)
								this.getMass()
							}
						}, 1000)
					}

					this.$app.closeLoading(this)
				})
			},
			startMass() {
				this.$app.request(this.$app.API.SHARE_STARMASS, {}, res => {})
			},
			settleMass() {
				this.modal = ''
				this.$app.request(this.$app.API.SHARE_SETTLEMASS, {}, res => {

					this.$app.toast('获得能量+' + res.data)
					this.getMass()
					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {

						this.$app.setData('userCurrency', res.data)
						this.userCurrency = this.$app.getData('userCurrency')
					})
				})
			},
			/**
			 * 收到推送信息
			 * 添加聊天内容
			 */
			addChartMsg(data) {
				const item = {
					uid: data.user_id,
					avatar: data.user && data.user.avatarurl || this.$app.AVATAR,
					nickname: data.user && data.user.nickname || this.$app.NICKNAME,
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
				console.log(this.danmakuQueue);
				clearInterval(this.$app.sayworldTimeId)
				// 定时显示弹幕
				// this.danmakuQueue = []
				// this.danmaku = null
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
					this.$app.request(this.$app.API.USER_SAVEINFO, {
						iv: e.detail.iv,
						encryptedData: e.detail.encryptedData,
					}, res => {
						this.$app.request(this.$app.API.USER_INFO, {}, res => {
							this.$app.setData('userInfo', res.data)
							this.sendOrFollow()
						})
					}, 'POST', true)
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
				if (status != 1) return
				this.$app.request(this.$app.API.USER_INVITAWARD, {
					ral_user_id: uid
				}, res => {
					this.$app.toast('领取成功')
					this.getFakeInviteList()
					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						this.$app.setData('userCurrency', res.data)
					})
				}, 'POST', true)
			},
			goOther(uid) {
				this.modal = ''
				this.$app.goPage('/pages/pet/other/other?user_id=' + uid)
			},
			getFakeInviteList() {
				this.modal = 'invit_desert'
				this.$app.request(this.$app.API.USER_INVITLIST, {

				}, res => {
					this.invitAward = res.data.award
					const resList = []
					res.data.list.forEach((e, i) => {
						resList.push({
							avatar: e.user && e.user.avatarurl || this.$app.AVATAR,
							status: e.status,
							uid: e.ral_user_id
						})
					})
					this.fakeinvitList = resList

					this.invitNum = 10
					clearInterval(this.$app.invitNumTimeId)
					this.$app.invitNumTimeId = setInterval(() => {
						this.invitNum += 10
						if (this.invitNum >= 100)
							clearInterval(this.$app.invitNumTimeId)
					}, 1000)

					this.$app.closeLoading(this)
				})
			},
			getInvitList() {
				this.$app.request(this.$app.API.USER_INVITLIST, {
					type: 1
				}, res => {
					// this.invitAward = res.data.award
					// const resList = []
					// res.data.list.forEach((e, i) => {
					// 	// resList.push({
					// 	// 	avatar: e.user && e.user.avatarurl || this.$app.AVATAR,
					// 	// 	status: e.status,
					// 	// 	uid: e.ral_user_id
					// 	// })
					// 	
					// 	
					// })
					// this.invitList = resList

					this.invitAward = res.data.award
					const resList = []
					this.spriteEarn = false
					res.data.list.forEach((e, i) => {
						resList.push({
							avatar: e.user && e.user.avatarurl || this.$app.AVATAR,
							status: e.status,
							uid: e.user && e.user.id,
							nickname: e.user && e.user.nickname || this.$app.NICKNAME,
							earn: e.sprite.earn,
						})

						if (e.sprite.earn >= 100) {
							// 显示红点
							this.spriteEarn = true
						}
					})
					this.invitList = resList

					this.$app.closeLoading(this)
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
				if (!this.$app.socketTask || this.$app.socketTask.readyState == 2 || this.$app.socketTask.readyState == 3) {
					this.$app.initSocket()
				}
				this.$app.request(this.$app.API.STAR_SENDMSG, {
					starid: this.star.id,
					content: this.chartMsg.trim(),
				}, res => {
					this.chartMsg = ''
				})
			},
			/**
			 * 加入明星偶像圈
			 */
			sendOrFollow(e) {
				if (this.$app.getData('userStar')['id']) {
					if (this.$app.getData('userStar')['id'] == this.star.id) {
						this.modal = 'send'

						// 保存formId
						const formId = e && e.detail && e.detail.formId || null

						if (formId) {
							this.$app.request(this.$app.API.EXT_SAVEFORMID, {
								formId
							})
						}
					} else {
						this.$app.toast(`不能为其他爱豆打榜哦~`)
					}
				} else {
					// 未加入偶像圈
					this.$app.modal(`每个人只能加入一个偶像圈\n是否加入${this.star.name}的偶像圈？`, () => {
						this.$app.request(this.$app.API.STAR_FOLLOW, {
							starid: this.star.id,
							rer_user_id: this.$app.getData('referrer'), // 推荐人
						}, res => {
							this.$app.request(this.$app.API.USER_STAR, {}, res => {
								this.$app.setData('userStar', res.data, true)
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
				// 偷花
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
								steal_count: res.data.steal_count,
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
						resList.push({
							avatar: e.user && e.user.avatarurl || this.$app.AVATAR,
							nickname: e.user && e.user.nickname || this.$app.NICKNAME,
							hot: e.thisweek_count,
						})
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
							uid: e.user && e.user.id,
							avatar: e.user && e.user.avatarurl || this.$app.AVATAR,
							nickname: e.user && e.user.nickname || this.$app.NICKNAME,
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
			leaveGroup() {
				this.$app.request(this.$app.API.STAR_LEAVECHART, {
					star_id: this.star.id,
					client_id: this.$app.getData('clientId')
				}, res => {})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.guild-container {
		display: flex;
		flex-direction: column;
		height: 100%;

		.tips-container {

			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 2;
			background: rgba(#000, 0.8);

			image {
				width: 100%;
				position: absolute;
				bottom: 0upx;
				right: -15upx;
			}

		}

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
						margin-top: 10upx;
						display: flex;
						animation: sayworld 10s linear infinite;
						align-items: center;
						position: relative;

						.avatar {
							width: 44upx;
							height: 44upx;
							border-radius: 50%;
							position: absolute;
							left: -20upx;
						}

						.content {
							background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK4AAAA5CAYAAACvbxAVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAK5JREFUeNrs1rEJhQAQRMFTLtDYhmzVKgxFfqaFGIiJWIAN/Fg4mClhecE2se1LQC1TDn032oFi1rzuxwyUkyFcCmpNgHBBuCBchAvCBeEiXBAuCBeEi3BBuCBchAvCBeEiXBAuCBeEi3BBuCBchAvCBeEiXBAuCBeEi3BBuCBchAvCBeEiXBAuCBeEi3BBuCBchAvCBeEiXBAuCBf+yPjNVqBguOdhBVwF+MIrwAClLQyb1cy8aQAAAABJRU5ErkJggg==);
							background-size: 100% 100%;
							padding-left: 30upx;
							padding-right: 10upx;
							font-size: 26upx;
							color: #FFF;
							height: 38upx;
							line-height: 38upx;
						}

						.tail {
							position: absolute;
							width: 44upx;
							height: 44upx;
							top: 50%;
							transform: translateY(-50%);
							right: -39upx;
						}
					}
				}

				.row-info {
					padding: 0 40upx;
					display: flex;
					justify-content: space-around;
					padding-bottom: 20upx;

					.avatar {
						position: relative;
						overflow: hidden;
						border-radius: 50%;
						width: 150upx;
						height: 150upx;

						z-index: 1;

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

							.star-name-wrapper {
								max-width: 200upx;
							}

							.join {
								background-color: #f7ab5f;
								border-radius: 20upx;
								font-size: 28upx;
								font-weight: 300;
								color: #FFF;
								padding: 8upx 16upx;
								margin: 0 14upx;
								box-shadow: 0 0 2upx rgba(0, 0, 0, .3);
							}

						}

						.bottom {
							display: flex;

							.image {
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

									.avatar-s {
										width: 46upx;
										height: 46upx;
										border-radius: 50%;

									}

									.badge {
										position: absolute;

										bottom: -4upx;
										right: -4upx;

										width: 22upx;

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
						position: relative;

						.btn-wrap {
							position: relative;

							.badge-wrap {
								position: absolute;
								top: 10upx;
								right: 10upx;
							}

						}

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

		.chart-container.rank-list {

			.item {
				margin: 20upx 0;
				height: 130upx;
				background: url(http://wx1.sinaimg.cn/large/0060lm7Tly1g2enrl619ng30j703n741.gif) right center no-repeat/contain;
				display: flex;
				align-items: center;

				.rank-num {
					image {
						width: 40upx;
					}

					margin-left: 110upx;
				}

				.avatar image {
					margin-left: 60upx;
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
				}

				.text-container {
					margin-left: 30upx;
					width: 250upx;
					line-height: 44upx;

					.bottom-text {
						display: flex;
						align-items: center;
						color: $color_2;
					}
				}

				.level {
					// margin-left: 30upx;
				}

				.count {
					margin-left: 30upx;
				}


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
				margin: 10upx 0;
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
						height: 110upx;
						text-align: center;
						line-height: 110upx;
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
				font-size: 28upx;
				align-items: center;
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
						width: 220upx;
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

					.steal-count {
						margin-right: 20upx;

						image {
							width: 40upx;
						}
					}


				}

			}
		}

		.invit-modal-container {

			width: 100%;
			height: 100%;
			position: absolute;

			display: flex;
			flex-direction: column;

			.explain-wrapper {
				display: flex;
				justify-content: space-between;
				align-items: center;

				// image {
				// 	width: 50upx;
				// 	margin: 10upx 40upx;
				// }
			}

			.list-wrapper {
				overflow-y: auto;
				height: 100%;
				display: flex;
				flex-direction: column;

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

						image {
							width: 40upx;
						}
					}

					.avatar {
						image {
							width: 90upx;
							height: 90upx;
							border-radius: 50%;
						}
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

					.egg {
						margin-right: 20upx;
						position: relative;

						.num-wrapper {
							z-index: 1;
							color: #FFF;
						}

						image {
							width: 60upx;
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

		}

		.invit-fake-modal-container {
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

		.mass-modal-container {
			height: 100%;
			width: 100%;
			position: absolute;
			display: flex;
			flex-direction: column;
			align-items: center;

			.explain-wrapper {
				width: 100%;

				padding: 20upx;
			}

			.cutdown {
				// border: 2upx solid #000;
				// border-top: none;
				padding: 10upx 20upx;
				border: 4upx dotted $color_1;
				border-radius: 20upx;
			}

			.ava-wrapper {
				flex: 1;
				overflow-y: scroll;
				display: flex;
				margin: 20upx;
				flex-wrap: wrap;
				align-items: center;

				.ava {
					margin: 20upx;
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
					border: 2upx solid $color_1;
					font-size: 50upx;
					overflow: hidden;
					z-index: 1;

					image {
						border-radius: 50%;
					}
				}
			}

			.btn-wrapper {
				padding: 40upx 60upx;
				display: flex;
				justify-content: space-around;
				width: 100%;
			}
		}
	}
</style>

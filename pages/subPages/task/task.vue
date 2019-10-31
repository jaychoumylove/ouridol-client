<template>
	<view class="container">
		<view class="swiper-change flex-set">
			<view class="swiper-item" :class="{select:current==0}" @tap="current = 0;getTaskList();">新手任务</view>
			<view class="swiper-item" :class="{select:current==1}" @tap="current = 1;getTaskList();">每日任务</view>
			<!-- <view class="swiper-item" :class="{select:current==2}" @tap="current = 2;getTaskList();">徽章任务</view> -->
		</view>
		<view class="item" v-for="(item,index) in taskList" :key="index" v-if="!(
					(item.type==4 && ~$app.getData('sysInfo').system.indexOf('iOS') && $app.getData('config').ios_switch == 0) 
					|| (item.id == 24 && $app.getData('config').version == $app.VERSION)
					
					)">
			<!-- 有些任务不显示 -->
			<view v-if="current != 2" class="left-content">
				<image class="img" :src="item.task_type.img" mode=""></image>
				<view class="content ">
					<view class="top text-overflow">{{item.name}}</view>
					<view class="bottom" v-if="item.desc">{{item.desc}}</view>
					<view class="bottom" v-else-if="item.times">已完成({{item.doneTimes}}/{{item.times}})</view>
				</view>
			</view>
			<view v-else class="left-content badge-type">
				<image class="img" :src="item.icon" mode=""></image>
				<view class="content">
					<view class="top text-overflow">{{item.name}}</view>
					<view class="bottom" v-if="item.desc">{{item.desc}}({{item.doneTimes}}/{{item.count}})</view>
				</view>
			</view>

			<view class="right-content">
				<view class="earn">
					<view class="right-item" v-if="item.coin">
						<image src="/static/image/user/b1.png" mode="widthFix"></image>
						<view class="add-count">+{{item.coin}}</view>
					</view>
					<view class="right-item" v-if="item.stone">
						<image src="/static/image/user/b2.png" mode="widthFix"></image>
						<view class="add-count">+{{item.stone}}</view>
					</view>
					<view class="right-item" v-if="item.trumpet">
						<image src="/static/image/user/b3.png" mode="widthFix"></image>
						<view class="add-count">+{{item.trumpet}}</view>
					</view>

				</view>
				<view v-if="current!=2" class="btn" @tap="doTask(item,index)">
					<btnComponent type="default" v-if="item.status == 0">
						<!-- 分享 -->
						<button class="btn" open-type="share" v-if="item.type == 9">
							<view class="flex-set" style="width: 130upx;height: 65upx;">{{item.task_type.btn_text||'去完成'}}</view>
						</button>
						<!-- 集结 -->
						<button class="btn" open-type="share" data-share='2' v-else-if="item.type == 12">
							<view class="flex-set" style="width: 130upx;height: 65upx;">{{item.task_type.btn_text||'去完成'}}</view>
						</button>
						<!-- 客服 -->
						<button class="btn" open-type="contact" v-else-if="item.type == 4 && $app.getData('config').ios_switch == 1 && ~$app.getData('sysInfo').system.indexOf('iOS') || item.type==13">
							<view class="flex-set" style="width: 130upx;height: 65upx;">{{item.type==13?item.task_type.btn_text:'回复"1"'}}</view>
						</button>
						<!-- 默认 -->
						<view v-else class="flex-set" style="width: 130upx;height: 65upx;">
							{{item.task_type.btn_text||'去完成'}}
						</view>
					</btnComponent>
					<btnComponent type="success" v-if="item.status == 1">
						<view class="flex-set" style="width: 130upx;height: 65upx;">可领取</view>
					</btnComponent>
					<btnComponent type="disable" v-if="item.status == 2">
						<view class="flex-set" style="width: 130upx;height: 65upx;">已完成</view>
					</btnComponent>
				</view>
				<view v-else class="btn" @tap="useBadge(item,index)">
					<btnComponent type="default" v-if="item.status == 0">
						<!-- 分享 -->
						<button class="btn" open-type="share" v-if="item.type == 1">
							<view class="flex-set" style="width: 130upx;height: 65upx;">{{item.btn_text||'去完成'}}</view>
						</button>

						<!-- 默认 -->
						<view v-else class="flex-set" style="width: 130upx;height: 65upx;">
							{{item.btn_text||'去完成'}}
						</view>
					</btnComponent>

					<btnComponent type="success" v-if="item.status == 1">
						<view class="flex-set" style="width: 130upx;height: 65upx;">佩戴</view>
					</btnComponent>
					<btnComponent type="disable" v-if="item.status == 2">
						<view class="flex-set" style="width: 130upx;height: 65upx;">卸下</view>
					</btnComponent>
				</view>
			</view>

		</view>

		<modalComponent v-if="modal == 'weibo'" title="提示" @closeModal="modal=''">

			<view class="weibo-modal-container flex-set">
				<view class="line">第一步：复制微博格式</view>
				<view class="text-wrapper" @tap="clipboard">
					{{shareText}}
					<view class="text">点击复制</view>
				</view>
				<view class="line">第二步：发布帖子，填写帖子链接</view>

				<input type="text" @input="weiboUrl = $event.detail.value" placeholder="帖子链接" />
				<btnComponent type="default">
					<view class="flex-set" style="width: 160upx;height: 80upx;" @tap="weiboCommit()">提交</view>
				</btnComponent>
			</view>
		</modalComponent>

		<modalComponent v-if="modal == 'weibo_zhuanfa'" title="提示" @closeModal="modal=''">
			<view class="weibo-modal-container zhuanfa flex-set">
				<view class="line">第一步：进入 <text>{{weibo_zhuanfa.host}}</text>微博主页查看 <text>{{weibo_zhuanfa.text}}</text> </view>
				<image :src="weibo_zhuanfa.img" mode=""></image>
				<view class="line">第二步：填写转发的微博链接</view>

				<input type="text" @input="weiboUrl = $event.detail.value" placeholder="帖子链接" />
				<btnComponent type="default">
					<view class="flex-set" style="width: 160upx;height: 80upx;" @tap="weiboCommit(1)">提交</view>
				</btnComponent>
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
				$app: this.$app,
				requestCount: 1,
				taskList: this.$app.getData('taskList') || [],
				modal: '',
				shareText: '',
				weiboUrl: '',
				weibo_zhuanfa: {},

				current: 1, // 任务类别
			};
		},
		onShow() {
			this.getTaskList()
		},
		onLoad() {
			this.getShareText()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			/**显示视频广告*/
			openAdver() {
				this.$app.openVideoAd(() => {
					for (let key in this.taskList) {
						const value = this.taskList[key]

						if (value.type == 7) {
							this.taskList[key].status = 1
						}
					}
				})
			},
			clipboard() {
				uni.setClipboardData({
					data: this.shareText,
					success: () => {
						this.$app.toast('复制成功', 'success')
					}
				});
			},
			weiboCommit(type = 0) {
				if (!this.weiboUrl) return
				this.$app.request(this.$app.API.TASK_WEIBO, {
					weiboUrl: this.weiboUrl,
					type,
				}, res => {
					this.$app.toast('提交成功', 'success')
					this.modal = ''
					this.weiboUrl = ''
					this.getTaskList()
				})
			},
			// 佩戴/卸下徽章
			useBadge(item) {
				if (item.status == 0) {
					if (item.type == 1) {
						// 拉新
						return
					}
				} else {
					this.$app.request('badge/use', {
						badge_id: item.id
					}, res => {
						this.getTaskList()
					}, 'POST', true)

				}
			},
			doTask(task, index) {
				if (task.status == 0) {
					// 做任务
					if (task.task_type.id == 4 && ~this.$app.getData('sysInfo').system.indexOf('iOS')) {
						// ios 去公众号
						return
					} else if (task.task_type.id == 7) {
						// 观看广告
						this.openAdver()
					} else if (task.task_type.id == 8) {
						// 微博发帖
						this.modal = 'weibo'
					} else if (task.task_type.id == 12) {
						// 集结
						this.$app.request(this.$app.API.SHARE_STARMASS, {}, res => {})
					} else if (task.task_type.id == 14) {
						// 微博转发
						this.modal = 'weibo_zhuanfa'
					} else {
						if (task.task_type.gopage) {
							// 跳转页面
							this.$app.goPage(task.task_type.gopage)
						}
					}

				} else if (task.status == 1) {
					this.taskList[index].status = 2
					// 去领取
					this.$app.request(this.$app.API.TASK_SETTLE, {
						task_id: task.id
					}, res => {
						let toast = '领取成功'
						if (res.data.coin) toast += '，能量+' + res.data.coin
						if (res.data.stone) toast += '，灵丹+' + res.data.stone
						if (res.data.trumpet) toast += '，喇叭+' + res.data.trumpet

						this.$app.toast(toast)
						this.getTaskList()
						this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
							this.$app.setData('userCurrency', res.data)
						})
					}, 'POST', true)
				}
			},

			//HTTP
			getShareText() {
				this.$app.request(this.$app.API.EXT_SHARETEXT, {}, res => {
					this.shareText = res.data.share_text
					this.weibo_zhuanfa = res.data.weibo_zhuanfa
				})
			},
			getTaskList() {
				this.$app.request(this.$app.API.TASK, {
					category: this.current
				}, res => {
					// this.taskList = res.data
					if (this.current == 2) {
						// 徽章
						this.taskList = res.data
					} else {
						// 任务
						const resList = []
						this.$app.isTaskAllDone = true
						for (let key in res.data) {
							const v = res.data[key]

							if (v.status == 0) {
								// 有未完成的任务
								this.$app.isTaskAllDone = false
							}
							resList.push({
								id: v.id,
								coin: v.coin || 0,
								stone: v.stone || 0,
								trumpet: v.trumpet || 0,
								status: v.status,
								name: v.name,
								doneTimes: v.doneTimes,
								times: v.times,
								type: v.type,
								desc: v.desc,
								task_type: {
									id: v.task_type.id,
									gopage: v.task_type.gopage,
									btn_text: v.task_type.btn_text,
									img: v.task_type.img,
								}
							})
						}
						this.taskList = resList
						this.$app.setData('taskList', this.taskList)
						this.$app.closeLoading(this)
					}

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.swiper-change {
			margin: 30upx;
			border-radius: 30upx;
			overflow: hidden;
			box-shadow: 0 2upx 4upx rgba(0, 0, 0, .3);

			.swiper-item {
				flex: 1;
				height: 70upx;
				line-height: 70upx;
				background-color: #f5f5f5;
				color: #ff648d;
				text-align: center;

			}

			.swiper-item.select {
				background-color: #ff648d;
				color: #f5f5f5;
			}

		}


		.item {
			margin: 20upx;
			background-color: rgba(#FFF, 0.3);
			display: flex;
			padding: 20upx 40upx;
			justify-content: space-between;
			align-items: center;
			border-radius: 60upx;

			.left-content {
				display: flex;
				align-items: center;

				.img {
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
				}

				.content {
					margin-left: 20upx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;

					.top {
						max-width: 250upx;
					}

					.bottom {
						font-size: 24upx;
						color: #888;
					}
				}
			}

			.left-content.badge-type {
				.img {
					width: 169upx;
					height: 51upx;
					border-radius: 0;
				}
			}

			.right-content {
				display: flex;

				.earn {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: flex-start;
					margin-right: 30upx;
					// width: 100upx;

					.right-item {
						display: flex;
						align-items: center;

						image {
							width: 40upx;
						}
					}
				}

				.btn {
					display: flex;
					align-items: center;
				}
			}

		}

		.weibo-modal-container {
			height: 100%;
			padding: 20upx 40upx;
			flex-direction: column;
			justify-content: center;

			.text-wrapper {
				margin-bottom: 20upx;
				width: 100%;
				border: 4upx solid red;
				padding: 10upx;
				padding-bottom: 40upx;
				position: relative;

				.text {
					position: absolute;
					right: 20upx;
					bottom: -20upx;
					background-color: $text-color-1;
				}

			}

			input {
				width: 90%;
				background-color: #eee;
				border-radius: 60upx;
				height: 70upx;
				margin-top: 20upx;
				margin-bottom: 20upx;
				padding: 0 20upx;
			}
		}

		.weibo-modal-container.zhuanfa {
			text {
				font-weight: 700;
			}

			image {
				width: 320upx;
				height: 240upx;
				border-radius: 10upx;
				margin: 10upx;
			}
		}

	}
</style>

<template>
	<view class="container">
		<loadIconComponent v-if="requestCount>0" type='whole'></loadIconComponent>

		<view class="item" v-for="(item,index) in taskList" :key="index">
			<view class="left-content">
				<image class="img" :src="item.img" mode=""></image>
				<view class="content">
					<view class="top">{{item.name}}</view>
					<view class="bottom" v-if="item.times">已完成({{item.doneTimes}}/{{item.times}})</view>
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

				</view>
				<view class="btn" @tap="doTask(item)">
					<btnComponent type="default" v-if="item.status == 0">
						<button type="primary"></button>
						
						<button class="btn" open-type="share" v-if="item.type == 9">
							<view class="flex-set" style="width: 130upx;height: 65upx;">{{item.task_type.btn_text}}</view>
						</button>
						<view v-else class="flex-set" style="width: 130upx;height: 65upx;">{{item.task_type.btn_text}}</view>
						
					</btnComponent>
					<btnComponent type="success" v-if="item.status == 1">
						<view class="flex-set" style="width: 130upx;height: 65upx;">可领取</view>
					</btnComponent>
					<btnComponent type="disable" v-if="item.status == 2">
						<view class="flex-set" style="width: 130upx;height: 65upx;">已完成</view>
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
					<view class="flex-set" style="width: 160upx;height: 80upx;" @tap="weiboCommit">
						提交
					</view>
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
				requestCount: 1,

				taskList: [],
				videoAd: null,
				modal: '',
				shareText: '',
				weiboUrl: '',
			};
		},
		onLoad() {
			this.getTaskList()
		},
		methods: {
			clipboard() {
				uni.setClipboardData({
					data: this.shareText,
					success: () => {
						this.$app.toast('复制成功', 'success')
					}
				});
			},
			weiboCommit() {
				this.$app.request(this.$app.API.TASK_WEIBO, {
					weiboUrl: this.weiboUrl
				}, res => {
					this.$app.toast('提交成功','success')
					this.modal=''
					this.getTaskList()
				})
			},
			doTask(task) {
				if (task.status == 0) {
					if (task.task_type.gopage) {
						this.$app.goPage(task.task_type.gopage)
					} else if (task.task_type.id == 7) {
						// 观看广告
					} else if (task.task_type.id == 8) {
						// 微博发帖
						this.modal = 'weibo'
						this.getShareText()
					}
				} else if (task.status == 1) {
					// 去领取
					this.$app.request(this.$app.API.TASK_SETTLE, {
						task_id: task.id
					}, res => {
						this.getTaskList()
						this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
							this.$app.setData('userCurrency', res.data)
							this.$app.toast('领取成功')
						})
					})
				}
			},

			//HTTP
			getShareText() {
				this.$app.request(this.$app.API.EXT_SHARETEXT, {}, res => {
					this.shareText = res.data
				})
			},
			getTaskList() {
				this.$app.request(this.$app.API.TASK, {}, res => {
					this.taskList = res.data

					this.$app.closeLoading(this)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
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

					.bottom {
						font-size: 24upx;
						color: #888;
					}
				}
			}

			.right-content {
				display: flex;

				.earn {
					display: flex;
					flex-direction: column;
					justify-content: space-around;

					margin-right: 30upx;

					.right-item {
						display: flex;
						align-items: center;

						image {
							width: 30upx;
							height: 30upx;
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
			padding: 20upx;
			flex-direction: column;
			justify-content: flex-start;

			.text-wrapper {
				margin-top: 20upx;
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
					background-color: $color_0;
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

	}
</style>

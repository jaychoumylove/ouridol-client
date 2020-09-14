<template>
	<view class="active_one-container">
		<view class="top-container">
			<view class="top-btn-wrap">
				<btnComponent type="css">
					<button open-type="share" data-share='7'>
						<view class="btn flex-set">
							<image class="icon" src="/static/image/icon/flag.png" mode=""></image>
							<text>集结</text>
						</view>
					</button>
				</btnComponent>
				<btnComponent type="css">
					<view class="btn flex-set" @tap="$app.goPage('/pages/notice/notice?id=18')">
						<image class="icon" src="/static/image/icon/info.png" mode=""></image>
						<text>规则</text>
					</view>
				</btnComponent>
			</view>
			<image class="avatar" :src="star.head_img_s||$app.getData('AVATAR')" mode="aspectFill"></image>
			<view class="nickname">{{star.name}}</view>
		</view>

		<!-- <open-data style="width: 100%;text-align: center;" type="groupName" :open-gid="openGid"></open-data> -->

		<view class="status">
			<text>参与人数：<text style="color:red;">{{list.length}}</text></text>
			<!-- <text>获得能量：<text style="color:red;">{{list.length * 10}}</text></text> -->
		</view>

		<view class="main-container">
			<view class="top-wrap" v-if="status==0">
				<text>快来群集结</text>
			</view>
			<view class="top-wrap" v-if="status==1">
				<text>距下次发起还剩：</text>
				<text style="color:red;">{{remainTime}}</text>
			</view>
			<view class="top-wrap" v-if="status==2">
				<text>集结剩余时间：</text>
				<text style="color:red;">{{remainTime}}</text>
			</view>
			<!-- 参与用户列表 -->
			<view class="user-list flex-set">
				<view class="item-wrap" v-for="index in 3" :key="index">
					<view class="extra1 yellow" v-if="index==0">沙发</view>
					<view class="extra1 yellow" v-else-if="index==1">板凳</view>
					<view class="extra1 yellow" v-else-if="index==2">地板</view>
					<image class="avatar" v-if="list[index]" :src="list[index].user.avatarurl" mode="aspectFill"></image>
					<image class="avatar" v-else src="/static/image/ic_wechat.png" mode="aspectFill"></image>
					<view class="extra" v-if="list[index]">+{{list[index].mass_point}}能量</view>
					<view class="earn" v-if="list[index]">{{list[index].user.nickname}}</view>
					<view class="group_mass_times text-color-3" v-if="list[index]">今日集结{{list[index].group_mass_times?list[index].group_mass_times:0}}次</view>
				</view>
			</view>
			<view class="space">至少3人集结视为成功，完成后可获得能量</view>

			<view class="user-list flex-set">
				<view class="item-wrap" v-for="(item,index) in list" :key="index" v-if="index>2">
					<image class="avatar" :src="list[index].user.avatarurl" mode="aspectFill"></image>
					<view class="extra" v-if="list[index]">+{{item.mass_point}}能量</view>
					<view class="earn" v-if="list[index]">{{list[index].user.nickname}}</view>
					<view class="group_mass_times text-color-3" v-if="list[index]">今日集结{{list[index].group_mass_times?list[index].group_mass_times:0}}次</view>
				</view>
				<view class="item-wrap" v-for="index in blockUserCount" :key="index">
					<image class="avatar" src="/static/image/ic_wechat.png" mode="aspectFill"></image>
					<view class="extra">+{{base_count}}</view>
				</view>
			</view>
		</view>

		<view v-if="starid == $app.getData('userStar').id" class="btn-bottom">
			<view class="left" @tap="$app.goPage('/pages/index/index')">
				<btnComponent type="css">
					<view class="flex-set" style="height: 80upx;">去打榜</view>
				</btnComponent>
			</view>

			<view class="right" v-if="status!=1" @tap="modal='join'">
				<btnComponent type="css">
					<view class="flex-set" style="height: 80upx;">参与集结</view>
				</btnComponent>
			</view>
			<view class="right" v-else>
				<btnComponent type="disable">
					<view class="flex-set" style="height: 80upx;">冷却中{{remainTime}}</view>
				</btnComponent>
			</view>
		</view>

		<modalComponent v-if="modal == 'join'" title="参与" @closeModal="modal=''">
			<view class="join-modal-container">
				<view class="top-wrap">
					<view class="title" style="font-size: 38upx;">选择参与集结方式</view>
					<view class="title">选择观看视频参与集结，集结成功结束后可为贡献能量x10倍</view>
				</view>

				<view class="main-wrap flex-set">
					<view class="item" @tap="ad">
						<image class="img" src="/static/image/user/b1.png" mode="widthFix"></image>
						<view class="text">+{{base_count*10}}能量</view>
						<btnComponent type="css">
							<view class="" style="padding: 10upx;">看视频参与x10倍</view>
						</btnComponent>
					</view>
					<view class="item" @tap="join(base_count)">
						<image class="img" src="/static/image/user/b1.png" mode="widthFix"></image>
						<view class="text">+{{base_count}}能量</view>
						<btnComponent type="css">
							<view class="" style="padding: 10upx;">直接参与</view>
						</btnComponent>

					</view>
				</view>
			</view>
		</modalComponent>

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
				base_count: this.$app.getData('config').groupmass.coin,
				starid: 0,
				star: {},
				gid: '', // 群id
				openGid: '', // 群openid 用于显示群名字
				list: [],
				status: 0,
				remainTime: 0,
				modal: '',
				blockUserCount: 6, // 补位数
			};
		},

		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		onShow(option) {

			// 爱豆id
			this.starid = this.$app.getData('query').starid || this.$app.getData('userStar').id
			if (!this.$app.getData('userStar').id) {
				this.$app.modal('请先加入一个圈子', () => {
					uni.reLaunch({
						url: '/pages/group/group'
					})
				}, '跳转')
				return
			}

			if (this.starid != this.$app.getData('userStar').id) {
				this.$app.modal('无法为其他爱豆助力')
				return
			}
			// #ifdef MP-WEIXIN
			if (!this.$app.getData('shareTicket')) {
				this.$app.modal('请从群分享中进入')
				return
			}
			// #endif

			this.getShareInfo()
		},
		methods: {
			// 看视频广告
			ad() {
				this.$app.openVideoAd(() => {
					this.join(this.base_count * 10)
				}, this.$app.getData('config').kindness_switch)
			},
			join(force) {
				this.$app.request('share/group/join', {
					gid: this.gid,
					force
				}, res => {
					this.modal = ''
					this.loadData();
				}, 'POST', true)
			},

			loadData() {
				this.$app.request('page/groupMass', {
					gid: this.gid,
					star_id: this.starid
				}, res => {
					this.star = res.data.star
					this.list = res.data.list
					if (this.list.length > 3) {
						this.blockUserCount = 6 - this.list.length % 3
					}

					this.status = res.data.status

					let time = res.data.remainTime

					if (time) {
						let formatTime = this.$app.timeGethms(time)
						this.remainTime = formatTime.str
						clearInterval(this.timeId)
						this.timeId = setInterval(() => {
							if (--time <= 0) {
								clearInterval(this.timeId)
								this.loadData()
							}
							formatTime = this.$app.timeGethms(time)
							this.remainTime = formatTime.str
						}, 1000)
					}

				})
			},
			getShareInfo() {
				uni.getShareInfo({
					shareTicket: this.$app.getData('shareTicket'),
					success: res => {
						// 需要解密群id
						this.groupAdd(res)
					}
				})
			},
			groupAdd(data) {
				this.$app.request('share/group/add', {
					encryptedData: data.encryptedData,
					iv: data.iv,
					star_id: this.starid
				}, res => {
					if (!res.data.gid) {
						this.$app.toast('未获取到群信息，请尝试重新进入')
					} else {
						this.openGid = res.data.open_gid
						this.gid = res.data.gid
						this.loadData()
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped="">
	.active_one-container {
		padding: 20upx;
		height: 100%;

		.full {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}

		.top-container {
			display: flex;
			flex-direction: column;
			align-items: center;

			.top-btn-wrap {
				display: flex;
				width: 100%;
				justify-content: space-between;
				padding: 0 10upx;

				.btn {
					font-size: 32upx;
					padding: 0 20upx;
					height: 55upx;

					.icon {
						width: 38upx;
						height: 38upx;
					}
				}
			}

			.avatar {
				border: 4upx solid $text-color-2;
				border-radius: 50%;
				overflow: hidden;
				width: 120upx;
				height: 120upx;
				margin: 10upx;
			}

			.nickname {
				font-size: 32upx;
				font-weight: 700;
				margin: 10upx;
			}
		}

		.status {
			margin: 20upx;
			text-align: center;

			text {
				margin: 20upx;
			}
		}

		.main-container {
			background-color: #FFFFFF;
			border-radius: 20upx;
			position: relative;
			margin-top: 50upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 120upx;

			.top-wrap {
				position: absolute;
				top: 0;
				background-color: #FFF;
				border-radius: 30upx;
				left: 50%;
				transform: translate(-50%, -50%);
				padding: 10upx 20upx;
				white-space: nowrap;
			}

			.space {
				border-radius: 30upx;
				padding: 10upx 20upx;
				background-color: rgba($text-color-1, .6);
				margin: auto;
			}

			.user-list {
				width: 100%;
				padding: 20upx;
				flex-wrap: wrap;
				flex-direction: flex-start;
				justify-content: space-between;


				.item-wrap {
					margin: 40upx;
					// position: relative;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;


					.avatar {
						width: 120upx;
						height: 120upx;
						border-radius: 50%;
						margin-top: -15rpx;
					}

					.extra1 {
						font-size: 22upx;
						position: relative;
						background-color: #ff5770;
						color: #FFF;
						padding: 0 15rpx;
						text-align: center;
						border-radius: 30upx;
						// top: -15upx;
						// left: 50%;
						// transform: translateX(-50%);
						white-space: nowrap;
						z-index: 2;
					}

					.extra {
						margin-top: -10rpx;
						font-size: 24upx;
						position: relative;
						background-color: #ffaf2c;
						color: #FFF;
						padding: 0 15rpx;
						text-align: center;
						border-radius: 30upx;
						// bottom: -10upx;
						// left: 50%;
						// transform: translateX(-50%);
						white-space: nowrap;
						z-index: 2;
					}

					.extra.yellow {
						background-color: #ff5770;
					}

					.earn {
						font-size: 24upx;
						// position: absolute;
						width: 120upx;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						text-align: center;
						border-radius: 30upx;
						// bottom: -50upx;
						// left: 50%;
						// transform: translateX(-50%);
						white-space: nowrap;
					}

					.group_mass_times {
						// position: absolute;
						// bottom: -80upx;
						// width: 150rpx;
						padding: 2rpx 10rpx;
						border-radius: 30rpx;
						background-color: #f4a1bd;
						font-size: 22rpx;
					}

				}

			}
		}

		.btn-bottom {
			position: fixed;
			bottom: 30upx;
			width: 100%;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			jusify-content: space-between;
			padding: 20upx;

			.left {
				width: 150upx;
				margin-right: 20upx;
			}

			.right {
				flex: 1;
			}
		}

		.join-modal-container {
			height: 100%;
			padding: 20upx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.top-wrap {
				font-size: 32upx;
				text-align: center;
				margin: 20upx 10upx;
			}

			.main-wrap {
				justify-content: space-between;

				.item {
					flex: 1;
					text-align: center;
					padding: 20upx 10upx;
					border: 2upx solid #F00;
					border-radius: 10upx;
					margin: 10upx;

					.img {
						width: 100upx;
					}

					.text {
						margin: 20upx;
					}
				}
			}

		}
	}
</style>

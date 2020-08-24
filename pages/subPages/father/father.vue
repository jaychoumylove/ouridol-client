<template>
	<view class="father-container">
		<view class="top-container">
			<image class="avatar" :src="userInfo.avatarurl" mode="aspectFill"></image>

			<view class="text-wrapper text-overflow left">
				<view class="row-wrapper flex-set">
					{{userInfo.nickname}}
				</view>
				<view class="row-wrapper flex-set s-f">
					<image src="/static/image/guild/ft-2.png" mode="widthFix"></image>
					我的师傅：
					<text v-if="father" class="text-overflow" style="text-decoration: underline;max-width: 140upx;" @tap="cancelFather()">{{father}}</text>
					<text v-else>虚位以待</text>
				</view>
				<view class="row-wrapper flex-set s-f">
					<image src="/static/image/guild/ft-1.png" mode="widthFix"></image> 徒弟人数：{{sonTotal}}
				</view>
				<view class="row-wrapper flex-set s-f">
					<image src="/static/image/guild/ft-4.png" mode="widthFix"></image> 今日收益：{{todayTotal}}
				</view>
			</view>
			<view class="text-wrapper btn">
				<button open-type="share" data-share="3">
					<image class="big" src="/static/image/guild/ft-3.png" mode="widthFix"></image>
					<view class="text">收徒</view>
				</button>
				<view style="margin-top: 20rpx;" @tap="$app.goPage('/pages/subPages/father_apply/father_apply')">
					<btnComponent type="default">
						<view class="flex-set" style="width: 130upx;height: 60upx;">申请列表</view>
					</btnComponent>
				</view>

			</view>
		</view>

		<view class="explain-container flex-set">
			<image :src="$app.getData('config').father_tips_img" mode="widthFix"></image>
		</view>

		<view class="tab-container">
			<view class="tab">
				<view class="tab-item" :class='{active:current==0}' @tap='switchAct(0)'>我的徒弟</view>
				<view class="tab-item" :class='{active:current==1}' @tap='switchAct(1)'>师傅排行</view>
				<view class="tab-item" :class='{active:current==2}' @tap='switchAct(2)'>未拜师用户</view>
			</view>
		</view>

		<view class="rank-list-container" v-if="fatherRank && fatherRank.length>0">

			<view class="item" v-for="(item,index) in fatherRank" :key="index">
				<view class="rank-num">
					<image v-if="index<3" :src="'/static/image/guild/'+(index+1)+'.png'" mode="widthFix"></image>
					<view v-else>{{index+1}}</view>
				</view>

				<block v-if="current == 0">
					<view class='avatar'>
						<image :src="item.avatarurl" mode="aspectFill"></image>
					</view>

					<view class="text-container">
						<view class="star-name">
							<view class="myname text-overflow">{{item.nickname}}</view>
							<image class="level" v-if="item.level" :src="'/static/image/icon/level/lv'+ item.level +'.png'" mode="widthFix"></image>
						</view>
						<view class="bottom-text">
							<view class="hot-count" v-if="item.cur_contribute">贡献:{{item.cur_contribute}}</view>
						</view>
					</view>
					<view class="add-count flex-set" v-if="item.earn">
						<text>+{{item.earn}}</text>
						<image src="/static/image/user/b1.png" mode="widthFix"></image>
					</view>

					<view class="btn" @tap="getSonEarn(item.uid,item.earn,index)">
						<btnComponent type="default">
							<view class="flex-set" style="width: 130upx;height: 60upx;">领取</view>
						</btnComponent>
					</view>

					<view class="del-a iconfont iconclose" @tap="breakSon(item)"></view>
				</block>
				<block v-if="current == 1">
					<view class='avatar'>
						<image :src="item.user.avatarurl || $app.getData('AVATAR')" mode="aspectFill"></image>
					</view>
					<view class="text-container">
						<view class="star-name">
							<view class="myname text-overflow">{{item.user.nickname || $app.getData('NICKNAME')}}</view>
							<text class="mystarname" v-if="item.starname">{{item.starname}}</text>
							<image class="level" v-if="item.level" :src="'/static/image/icon/level/lv'+ item.level +'.png'" mode="widthFix"></image>
						</view>
						<view class="bottom-text">
							<view class="hot-count">今日收益:{{item.father_get_count}}</view>
						</view>
					</view>
					<view class="btn" style="right: 30upx;" @tap="fromFather(item.user_id,item.user.nickname || $app.getData('NICKNAME'))">
						<btnComponent type="default">
							<view class="flex-set" style="width: 130upx;height: 60upx;" v-if="item.is_apply && item.is_apply.status==0">已申请</view>
							<view class="flex-set" style="width: 130upx;height: 60upx;" v-if="item.is_apply && item.is_apply.status==-1">已拒绝</view>
							<view class="flex-set" style="width: 130upx;height: 60upx;" v-if="!item.is_apply">拜师</view>
						</btnComponent>
					</view>
				</block>
				<block v-if="current == 2">
					<view class='avatar'>
						<image :src="item.user.avatarurl || $app.getData('AVATAR')" mode="aspectFill"></image>
					</view>
					<view class="text-container">
						<view class="star-name">
							<view class="myname text-overflow">{{item.user.nickname || $app.getData('NICKNAME')}}</view>
							<image class="level" v-if="item.level" :src="'/static/image/icon/level/lv'+ item.level +'.png'" mode="widthFix"></image>
						</view>
						<view class="bottom-text">
							<view class="hot-count">今日贡献:{{item.thisday_count}}</view>
						</view>
					</view>
					<view class="btn" style="right: 30upx;" @tap="acceptSon(item.user_id,item.user.nickname || $app.getData('NICKNAME'))">
						<btnComponent type="default">
							<view class="flex-set" style="width: 130upx;height: 60upx;" v-if="item.is_apply && item.is_apply.status==0">已申请</view>
							<view class="flex-set" style="width: 130upx;height: 60upx;" v-if="item.is_apply && item.is_apply.status==-1">已拒绝</view>
							<view class="flex-set" style="width: 130upx;height: 60upx;" v-if="!item.is_apply">收他为徒</view>
						</btnComponent>
					</view>
				</block>

			</view>

		</view>
		<view class="nodata flex-set" v-else>
			<block v-if="current == 0">
				<view class="top">你还没有徒弟</view>
				<button open-type="share" data-share="3">
					<view class="bottom">收一个徒弟></view>
				</button>
			</block>
		</view>

	</view>
</template>

<script>
	import btnComponent from '@/components/btnComponent.vue';
	export default {
		components: {
			btnComponent
		},
		data() {
			return {
				requestCount: 1,
				current: 0,
				page: 1,
				sonTotal: 0,
				todayTotal: 0,
				father: '',
				field: '',
				fatherRank: this.$app.getData('fatherRank') || [],
				userInfo: {
					avatarurl: this.$app.getData('userInfo')['avatarurl'] || this.$app.getData('AVATAR'),
					nickname: this.$app.getData('userInfo')['nickname'] || this.$app.getData('NICKNAME'),
					id: this.$app.getData('userInfo')['id'] || null,
				},
				fatherRank: [],
			};
		},
		onShow() {
			this.getFatherInfo()
		},
		onReachBottom() {
			if (this.page < 10 && this.field != '') {
				this.page++
				this.getFatherRank()
			}
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			switchAct(current) {
				this.page = 1
				this.current = current
				this.fatherRank = [];
				if (current == 0) {
					this.field = '';
					this.getFatherInfo()
				} else {
					if (current == 1) {
						this.field = 'fanther_rank';
					} else {
						this.field = 'not_fanther_rank';
					}
					this.getFatherRank()
				}
			},
			fromFather(user_id, nickname) {
				if (!this.father) {
					this.$app.modal(`是否拜${nickname}为师？`, () => {
						this.$app.request(this.$app.API.USER_FROM_FATHER, {
							user_id: user_id,
						}, res => {
							this.$app.toast('拜师申请成功', 'success')
							this.getFatherRank()
						})
					})
				} else {
					this.$app.toast('你已经有师傅了')
				}
			},
			acceptSon(user_id, nickname) {
				this.$app.modal(`是否收${nickname}为徒？`, () => {
					this.$app.request(this.$app.API.USER_ACCEPT_SON, {
						user_id: user_id,
					}, res => {
						this.$app.toast('收徒申请成功', 'success')
						this.getFatherRank()
					})
				})
			},
			cancelFather() {
				if (this.father) {
					this.$app.modal(`是否脱离和${this.father}的师徒关系？`, () => {
						this.$app.request(this.$app.API.USER_BREAK_FATHER, {}, res => {
							this.$app.toast('脱离成功', 'success')
							this.father = ''
						})
					})
				}
			},
			getSonEarn(uid, earn, index) {
				if (!earn) {
					this.$app.toast('TA的收益太少了')
				} else {
					this.$app.request(this.$app.API.USER_SONEARN, {
						user_id: uid
					}, res => {
						this.fatherRank[index].earn = 0
						this.$app.toast('获得收益+' + res.data + '能量')
						this.getFatherInfo()
						this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
							this.$app.setData('userCurrency', res.data)
						})
					}, 'POST', true)
				}

			},

			breakSon(son) {
				console.info(son);
				if (!son) this.$app.toast('请选择接触关系的徒弟')
				this.$app.modal(`是否脱离和${son.nickname}的师徒关系？`, () => {
					this.$app.request(this.$app.API.USER_BREAK_SON, {
						id: son.uid
					}, res => {
						this.$app.toast('脱离成功', 'success')
						let newList = [];
						newList = this.fatherRank.filter(item => {
							return item.uid != son.uid
						})
						this.fatherRank = newList
					})
				})
			},
			getFatherRank() {
				this.$app.request(this.$app.API.FATHER_RANK, {
					page: this.page,
					field: this.field,
				}, res => {

					if (this.page == 1) {
						this.fatherRank = res.data
					} else {
						this.fatherRank = this.fatherRank.concat(res.data)
					}
				})
			},
			getFatherInfo() {
				this.$app.request(this.$app.API.USER_FATHER, {
					type: 2
				}, res => {
					const resList = []
					this.todayTotal = res.data.earn
					this.father = res.data.father
					for (let v of res.data.list) {
						resList.push({
							uid: v.user && v.user.id,
							avatarurl: v.user && v.user.avatarurl || this.$app.getData('AVATAR'),
							nickname: v.user && v.user.nickname || this.$app.getData('NICKNAME'),
							cur_contribute: v.cur_contribute,
							earn: v.user_earn,
							level: v.level,
						})
					}

					this.sonTotal = resList.length
					this.fatherRank = resList
					this.$app.setData('fatherRank', this.fatherRank)

					this.$app.closeLoading(this)
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.father-container {
		height: 100%;
		background-color: $text-color-10;

		.top-container {
			padding: 30rpx 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #FFFFFF;

			.avatar {
				position: relative;
				overflow: hidden;
				border-radius: 50%;
				width: 150upx;
				height: 150upx;
			}

			.text-wrapper {
				line-height: 1.5;

				.row-wrapper {
					justify-content: flex-start;
					font-size: 34upx;

					image {
						width: 30upx;
						margin-right: 10upx;
					}
				}

				.row-wrapper.s-f {
					font-size: 26upx;
				}

			}

			.text-wrapper.left {
				// margin-left: -50upx;
			}

			.text-wrapper.btn {
				position: relative;

				button {
					display: flex;
					align-items: center;
				}

				image {
					width: 80upx;
				}

				.text {
					font-weight: 700;
					font-size: 40upx;
					padding-left: 10upx;
				}
			}
		}

		.tab-container {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20rpx;
			background-color: #FFFFFF;

			.tab {
				width: 100%;
				height: 80rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;

				.tab-item {
					width: 200rpx;
					padding: 15upx 0upx;
					margin: 0 30rpx;
					background: linear-gradient(0deg, rgba(208, 208, 208, 1) 0%, rgba(175, 175, 175, 1) 100%);
					box-shadow: 0 2upx 4upx rgba(#000, 0.3);
					justify-content: center;
					display: flex;
					font-size: 28upx;
					flex: 1;
					border-radius: 60rpx;
				}

				.tab-item.active {
					background: linear-gradient(90deg, rgba(254, 140, 175, 1), rgba(255, 120, 161, 1)) !important;
					text-align: center;
				}
			}

		}

		.explain-container {
			background-color: $color_3;
			font-size: 24upx;
		}

		.rank-list-container {
			// padding: 10upx 0;

			.item {
				display: flex;
				align-items: center;
				padding: 15upx 0;
				border-bottom: 1rpx solid $text-color-10;
				background-color: #FFFFFF;

				.rank-num {
					width: 90upx;
					text-align: center;

					image {
						width: 40upx;
					}
				}

				.avatar image {
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
				}

				.text-container {
					margin-left: 20upx;
					line-height: 1.5;
					width: 400upx;

					.star-name {
						width: 400upx;
						display: flex;
						flex-direction: row;
						align-items: center;

						.myname {
							max-width: 200upx;
						}

						.mystarname {
							padding: 1rpx 10rpx;
							background: $text-color-3;
							font-size: 22rpx;
							border-radius: 20rpx;
							color: #FFFFFF;
							margin-left: 10rpx;
						}

						.level {
							width: 76upx;
							margin-left: 10rpx;
						}
					}


					.bottom-text {
						display: flex;
						align-items: center;

						.hot-count {
							color: $color_2;
							margin-right: 4upx;
							font-size: 24upx;
						}
					}
				}

				.add-count {
					image {
						width: 36upx;
					}
				}

				.btn {
					font-size: 26upx;
					position: absolute;
					right: 60upx;
				}

				.del-a {
					position: absolute;
					right: 10upx;
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
</style>

<template>
	<view class="signin-container">

		<view class="signin-header">
			<view class="signin-avurl" style="background:url(https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EN7TlaOkWO9nGX11LnKJ8GPxdSoYiaIg8Q8rGpTfiapibE78n5A8oXLJn2pxMkIR41PEgwmBdibrOib6A/0) no-repeat ;background-size: 100% 100%;">
				<view class="star-avurl center">
					<image :src="starname.head_img_s"></image>
					<text class="star-name">{{starname.name}}圈子</text>
				</view>
				<view style="display: flex;justify-content: flex-end;">
					<view class="rule" @tap="$app.goPage('/pages/notice/notice?id=28')">规则</view>
				</view>
				<view class="signin-button">
					<block v-for="(item,index) in signinCfg" :key="index">
						<view :class="index==1 ? 'buttons':'button'" :style="{background: 'url('+item.image+') no-repeat; background-size: 100% 100%;'}">
							<view class="font-size-bg center">{{item.name}}</view>
							<view class="font-size-xs center">{{item.start_time}}-{{item.end_time}}</view>
							<view v-if="(item.status==0)" class="play_img">
								<btnComponent type="disable">
									<view class="flex-set" style="width: 150upx;height: 55upx;">已失效</view>
								</btnComponent>
							</view>
							<view v-else-if="(item.status==2)&&(sign)" class="play_img">
								<btnComponent type="disable">
									<view class="flex-set" style="width: 150upx;height: 55upx;">已签到</view>
								</btnComponent>
							</view>

							<view v-else-if="(item.status==2)&&(!sign)" class="play_img">
								<btnComponent type="default" @tap.stop="modelSignin()">
									<view class="flex-set" style="width: 150upx;height: 55upx;">点击签到</view>
								</btnComponent>
							</view>
							<view v-else class="play_img">
								<btnComponent type="disable">
									<view class="flex-set" style="width: 150upx;height: 55upx;">未开始</view>
								</btnComponent>
							</view>
						</view>
					</block>
				</view>
			</view>
			<!-- <text class="font-size-lg">今日签到</text>
			<view class="font-size-xs" style="margin-left: 5upx;color: #808080;">赶紧完成今日的签到把，为你的偶像加把火</view>
			<view class="margin-top-ls flex">
			<block v-for="(item,index) in signinCfg" :key="index" >
			<view class="button" :style="{background: 'url('+item.image+') no-repeat; background-size: 100% 100%;'}">
				<text class="font-size-bg">{{item.name}}</text>
				<view class="font-size-xs">{{item.start_time}}-{{item.end_time}}</view>
				<button class="signin" v-if="(item.status==0)">已结束</button>
				<button class="signin" v-else-if="(item.status==2)&&(item.isJoin)" @tap.stop="joinSignin()">{{signinNames}}</button>
				<button class="signin" v-else-if="(item.status==2)&&(!item.isJoin)" @tap.stop="joinSignin()">{{signinName}}</button>
				<button class="signin" v-else>未签到</button>
			</view>
			</block>
			 
			</view> -->
			<modalComponent v-if="modal == 'signins'" @closeModal="modal=''">
				<view style="height: 100%;width: 100%;margin: 0 auto;">
					<image style="height: 260upx;" src="/static/image/signin/signin.png" mode="aspectFit"></image>
					<view style="text-align:center;">
						<image src="../../static/image/user/b1.png" style="width: 50upx;height: 50upx;"></image>能量+{{coin}}
					</view>
					<view style="width: 100%;display: flex;justify-content: center;align-items: center; margin-top: 20rpx;">
						<btnComponent type="default" @tap="$app.goPage('/pages/group/group')">
							<view class="flex-set" style="width: 320upx;height: 90upx;">送能量</view>
						</btnComponent>
					</view>
					<view style="width: 100%;display: flex;justify-content: center;align-items: center; margin-top: 20rpx;">
						<btnComponent type="default">
							<button open-type="share" data-share="9" style="text-align: center;">
								<view class="flex-set" style="width: 320upx;height: 90upx;">召唤群友签到</view>
							</button>
						</btnComponent>
					</view>
					
				</view>

			</modalComponent>
			<modalComponent v-if="modal == 'signin'" @closeModal="modal=''">
				<view style="height: 100%;width: 100%;text-align: center;padding: 20rpx;">
					<view style="font-size: 45rpx;margin: 20rpx auto;">选择签到方式</view>
					<view style="font-size: 32upx;letter-spacing:6upx;">选择观看视频完成签到，可获得能量<text class="red">*10倍</text></view>
					<view class="flex-center" style="margin-top: 20upx;">
						<view class="play_border">
							<image src="/static/image/user/b1.png" style="width: 140upx;height: 150upx;"></image>
							<view><text class="red">+1000</text>能量</view>
							<view style="width: 100%;display: flex;justify-content: center;align-items: center; margin-top: 20rpx;">
								<btnComponent type="default" @tap="joinSignin(1)">
									<view class="flex-set" style="width: 180upx;height: 55upx;">看视频签到</view>
								</btnComponent>
							</view>
							
						</view>
						<view class="play_border">
							<image src="/static/image/user/b1.png" style="width: 140upx;height: 150upx;"></image>
							<view>+100能量</view>
							<view style="width: 100%;display: flex;justify-content: center;align-items: center; margin-top: 20rpx;">
								<btnComponent type="disable" @tap="joinSignin(0)">
									<view class="flex-set" style="width: 180upx;height: 55upx;">直接签到</view>
								</btnComponent>
							</view>
							
						</view>
					</view>
				</view>

			</modalComponent>
		</view>
		<view class="signin-body center">
			<view class="sign" style="background: url(https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EN7TlaOkWO9nGX11LnKJ8GtLo0nzIibQ9JbIhNqerQCkVEtTUGMwVSm6FNf68SDSetQWicPPAKf3Nw/0)no-repeat ;background-size: 100% 100%;">
				<button v-if="!sign&&!complete" @tap.stop="modelSignin()">
					<view class="play_sign">签到</view>
				</button>
				<view v-else-if="sign==1&&!complete" class="play_sign">{{joinAll}}/{{joinCount}}</view>
				<view v-else class="play_sign">已完成</view>
			</view>
			<view class="rocket margin-ls red">{{nowGift.name}}</view>
			<view class="signin-button signin-time margin-ls">
				<text class="time">{{timeHour}}</text>:<text class="time">{{timeMin}}</text>:<text class="time">{{timeSec}}</text>
			</view>
			<view class="margin-ls">还差<text class="red">{{joinCount-joinAll>0?(joinCount-joinAll):0}}人</text>，爱豆就可获得<text class="red">礼物</text></view>
			<!-- <image src="../../static/image/signin/walls.png" mode="aspectFit" style="width: 440upx;position: absolute;top: 390upx;height: 80upx;left: 160upx;">
			</image>
			<view class="font-size-lg" style="font-size: 32upx; text-align: center;">签到奖励</view>
			<view class="font-size-xs" style="margin-left: 5upx;color: #666666;text-align: center;">{{timeLeft}}</view>
			
			<view class="margin-top-ls flex">
				<block v-for="(item,index) in signinGift" :key="index" >
			<view class="gift">
				<view class="gift-info">
					<image :src="item.item_info.icon"  mode="aspectFit"></image>
					<view style="text-align:center;"><image src="../../static/image/user/b1.png" style="width: 40upx;height: 40upx;"></image>{{item.item_info.count}}</view>
					<view class="gitf-font">{{item.item_info.name}}</view>
					<view class="gift-but">{{joinAll>=item.count ? '已送出' : joinAll+'/'+ item.count +'签到送出'}}</view>
				</view>
			</view>
			</block>
			</view> -->
		</view>

		<view class="signin-footer" style="">
			<view style="width: 100%;display: flex;justify-content: center;align-items: center;">
				<btnComponent type="default">
					<button open-type="share" data-share="9" style="text-align: center;">
						<view class="flex-set" style="width: 320upx;height: 90upx;">召唤群友签到</view>
					</button>
				</btnComponent>
			</view>

			<!-- <image src="../../static/image/signin/wall.png" mode="aspectFit" style="width: 440upx;position: absolute;top: 815upx;height: 80upx;left: 160upx;">
			<view class="font-size-lg" style="font-size: 32upx; text-align: center;">礼物助力墙</view>
			<view class="font-size-xs" style="margin-left: 5upx;color: #666666;text-align: center;">邀请你的好友为爱豆一起签到吧</view>
			<view style="display: flex;justify-content:flex-end"><button class="shara-but" style="" open-type="share">召唤群友</button></view>
			</image>
			
			
			<view class="ava-flex user_image">
			<block v-for="(item,index) in signinGroup" :key="index">
			<view class="avatarurl">
					<image :src="item.avatarurl" mode="aspectFill"></image>
					<text style="text-align: center;color: #FFFFFF;">{{item.nickname}}</text>
			</view>
			</block>
			
			
		</view> -->
		</view>
	</view>

</template>


<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue'
	export default {
		components: {
			modalComponent,
			btnComponent,
		},
		data() {
			return {
				complete: 0,
				nowGift: '',
				starname: this.$app.getData('userStar'),
				length: '',
				joinCount: '',
				sign: 0,
				timeHour: '',
				timeMin: '',
				timeSec: '',
				star: '',
				timeLeft: '',
				coin: '',
				modal: '',
				starid: this.$app.getData('userStar')['id'] || null,
				siginList: [],
				signin_day: 1,
				signin_coin: 0,
				signinCfg: {},
				signinGroup: {},
				signinGift: {},
				joinAll: 0,
				signinNames: '已签到',
				signinName: '签到',
			};
		},

		onLoad(option) {
			if (!this.$app.getData('userStar').id) {
				this.$app.toast('请先加入一个圈子')
				this.$app.goPage('/pages/group/group')
				return
			} else {
				this.getSignin()
			}


		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			console.log(shareType)
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			getSignin() {
				this.$app.request('rank/getSignin', {
					starid: this.starid
				}, res => {
					this.signinCfg = res.data.signinCfg;
					this.signinGroup = res.data.signinGroup.slice(0, 12);
					this.signinGift = res.data.gift_info;
					this.joinAll = res.data.joinAll;
					this.sign = res.data.isJoin;
					let i = parseInt(0);
					for (i; i <= this.signinGift.length - 1; i++) {
						if (this.signinGift[i].count > this.joinAll) {
							this.joinCount = this.signinGift[i].count
							this.nowGift = this.signinGift[i].item_info
							break;
						} else {
							continue;
						}

					}
					if (this.signinGift[this.signinGift.length - 1].count <= this.joinAll) {

						this.complete = 1;
					}
					let timeLeft = res.data.timeLeft;
					// 倒计时
					let formartTime = this.$app.timeGethms(timeLeft)
					// this.timeLeft = formartTime.hour + '小时' + formartTime.min + '分' + formartTime.sec + '秒'

					if (formartTime.hour < 10) {
						this.timeHour = '0' + formartTime.hour;
					} else {
						this.timeHour = formartTime.hour;
					}
					if (formartTime.min < 10) {
						this.timeMin = '0' + formartTime.min;
					} else {
						this.timeMin = formartTime.min;
					}
					if (formartTime.sec < 10) {
						this.timeSec = '0' + formartTime.sec;
					} else {
						this.timeSec = formartTime.sec;
					}
					clearInterval(this.timeId)
					this.timeId = setInterval(() => {
						let formartTime = this.$app.timeGethms(--timeLeft)

						// this.timeLeft = formartTime.hour + '小时' + formartTime.min + '分' + formartTime.sec + '秒'
						if (formartTime.hour < 10) {
							this.timeHour = '0' + formartTime.hour;
						} else {
							this.timeHour = formartTime.hour;
						}
						if (formartTime.min < 10) {
							this.timeMin = '0' + formartTime.min;
						} else {
							this.timeMin = formartTime.min;
						}
						if (formartTime.sec < 10) {
							this.timeSec = '0' + formartTime.sec;
						} else {
							this.timeSec = formartTime.sec;
						}
						if (timeLeft <= 0) {
							clearInterval(this.timeId)
							// app.page_get_userInfo(this._getInitData);
						}
					}, 1000)

				})
			},
			joinSignin(type) {
				//视频签到
				if (type == 1) {
					this.$app.openVideoAd(() => {
						this.$app.request('rank/signin', {
							starid: this.starid,
							type: type,
						}, res => {
							if (res.code == 0) {
								this.star = res.data.star;
								this.coin = res.data.coin;
								this.modal = 'signins';
								this.sign = 1;
								this.getSignin();
							}
						}, 'POST', true)
					}, this.$app.getData('config').kindness_switch)
				} else {
					this.$app.request('rank/signin', {
						starid: this.starid,
						type: type,
					}, res => {
						if (res.code == 0) {
							this.star = res.data.star;
							this.coin = res.data.coin;
							this.modal = 'signins';
							this.sign = 1;
							this.getSignin();
						}
					}, 'POST', true)
				}


			},
			modelSignin() {
				this.modal = 'signin';
			}
		},

	}
</script>
</script>

<style lang="scss" scoped>
	.red {
		color: #FB525A
	}

	.flex-center {
		display: flex;
		justify-content: center
	}

	.signin-button-center {
		margin: 0 auto;
		display: table-cell;
		vertical-align: bottom;

		image {
			width: 125upx;
			height: 45upx;
		}
	}

	.signin-container {
		height: 100%;
		padding: 25upx;
		color: #000000;
	}

	.star-avurl {
		width: 200upx;
		margin: 0 auto;

		image {
			width: 180upx;
			height: 180upx;
			border-radius: 50%;
			border: 3upx solid #D8B82D;
			margin-top: 20upx
		}
	}

	.star-name {
		font-size: 30upx;
		color: #FFFFFF;
		font-weight: 500;
		letter-spacing: 10upx;
		margin: 25upx 0;
		height: 45rpx;
		display: block;
	}

	.center {
		text-align: center;
	}

	.rule {
		color: #FFFFFF;
		margin-right: 20upx;
	}

	.rule::after {
		color: #FFFFFF;
		content: "\e6e5";
		font-family: "iconfont" !important;
		padding-left: 10upx;
	}

	.play_img {
		height: 75%;
		display: flex;
		align-items: flex-end;
		justify-content: center;
	}

	.signin-avurl {
		height: 400upx;
		border-radius: 20upx;
	}

	.signin-button {
		display: flex;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
	}

	.signin-time {
		color: #666666;
		width: 190rpx;
		margin: 0 auto;
	}

	.time {
		width: 50upx;
		height: 40upx;
		background-color: #000000;
		text-align: center;
		line-height: 40upx;
		margin: 0 1upx;
		display: block;
		color: #FFFFFF;
		border-radius: 8upx;
		letter-spacing: 5upx;
	}

	.font-size-lg {
		font-size: 30upx;
	}

	.font-size-bg {
		font-size: 35upx;
	}

	.font-size-xs {
		font-size: 20upx;
	}

	.margin-ls {
		margin: 20upx auto;
	}

	.flex {
		display: flex;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
	}

	.signin-body {
		margin-top: 20upx;
	}

	.sign {
		height: 255upx;
		width: 250rpx;
		margin: 0 auto;
		margin-top: 250rpx;
		text-align: center;
	}

	.play_sign {
		height: 100%;
		line-height: 250rpx;
		font-size: 45rpx;
		color: #FFFFFF;
		letter-spacing: 5upx;
	}

	.play_border {
		width: 48%;
		height: 300upx;
		border: 4upx solid $text-color-6;
		text-align: center;
		margin: 10upx;
		border-radius: 20upx;
		padding: 20rpx;
	}

	.rocket {
		font-size: 40upx;
		font-weight: bold;
		margin: 10rpx auto;
	}

	.button {
		width: 250upx;
		height: 280upx;
		padding: 20upx;
		color: #FFFFFF;
		margin-top: 35upx;
	}

	.buttons {
		width: 250upx;
		height: 280upx;
		padding: 20upx;
		margin: 0 10upx;
		color: #FFFFFF;
	}

	.gift {
		margin: 20upx;
	}

	.gift-info {
		width: 200upx;
		height: 280upx;
		border-radius: 10upx;
		padding: 10upx;

		image {
			height: 65%;
		}
	}

	.gitf-font {
		font-size: 28upx;
		color: #E31076;
		text-align: center;
		border-bottom: 2upx solid #FACED2;
		margin: 0 auto;
		width: 140upx;
		font-weight: 500;
	}

	.gift-but {
		text-align: center;
		font-size: 20rpx;
		background-color: #FE737A;
		width: 150upx;
		height: 40upx;
		color: #FFFFFF;
		border-radius: 10upx;
		line-height: 40upx;
		margin: 10upx auto;
	}

	.signin-footer {
		margin-top: 20upx;
	}

	.footer-flex {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}

	.shara-but {
		font-size: 24upx;
		width: 150upx;
		height: 70upx;
		background-color: #007AFF;
		border-radius: 20upx;
		line-height: 70upx;
		color: #FFFFFF;
	}

	.ava-flex {
		display: flex;
		flex-wrap: wrap;
	}

	.avatarurl {
		width: 140upx;
		text-align: center;

		image {
			width: 100upx;
			height: 100upx;
			border-radius: 50%;
			margin: 20upx;
		}
	}

	.user_image {
		height: 350upx;
		margin-top: 20upx;
		background: linear-gradient(#D5A7EB, #EAB2DD);
		border-radius: 20upx;
	}

	.signin {
		margin-top: 65upx;
	}
</style>

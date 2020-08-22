<template>
	<view class="container">
		<view class="top-bg-container">
			<image class="top-bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FmibDk8LrMNNib025upafEqqx2EpvWdqIZPHszJZ3icwCtuSMIIfowtXqV1x5qfUfrJ6Du1IxNMrhAw/0" mode="widthFix"></image>
			<view :style="'height:'+header+';width:100%;'"></view>
			<view class="index-avurl">
				个人中心
			</view>
		</view>
		<view class="top-content-container">
			<view class="row userinfo">
				<view class="get_user_info">
					<button open-type="getUserInfo" @getuserinfo="getUserInfo">
						<view class="avatar">
							<image :src="userInfo.avatarurl" mode="aspectFill"></image>
							<view class="tips">点击获取</view>
						</view>
					</button>
				</view>
				
				<view class="info-content">
					<view class="item-line top">
						<view class="username">{{userInfo.nickname}}</view>
						<!-- <image class='vip' src="/static/image/user/h2-1.png" mode=""></image>
						<view class="vip-expire">(2019年6月18日到期)</view> -->
						<view class="id-content flex-set" v-if="userStar.id" @tap="$app.goPage('/pages/group/group')">{{userStar.name}}</view>
						<view class="id-content flex-set" style="background-color: #FF5174; color: #FFFFFF;" v-if="$app.getData('userInfo').type==1">管理员</view>
						<!-- <view class="id-content flex-set" v-if="userInfo.id" @tap="$app.copy(userInfo.id*1234)">ID:{{userInfo.id*1234}}</view> -->
					</view>
					<view class="item-line">
						<view class="flex-set" v-if="userInfo.id" @tap="$app.copy(userInfo.id*1234)">
							<text style="font-weight: bold; padding-right: 10rpx;">ID:{{userInfo.id*1234}}</text> 复制
						</view>
					
					</view>
					<view class="item-line">
						<view class="progress">
							<view class="progress-bar" :style="{width:userLevel.count / userLevel.next_count * 100 + '%'}"></view>
						</view>
					
					</view>
					<view class="item-line tips" @tap="$app.preImg(levelImg)">
						<view>粉丝等级Lv.{{userLevel.level?userLevel.level:1}}</view>
						<view>还差{{userGap}}人气升级</view> 
					</view>
				</view>
			</view>

		</view>
		<view class="row currency">
			<view class="item-content flex-set">
				<view class="item-content-top">
					<image src="/static/image/user/b1.png" mode="aspectFit"></image>
					<view class="num">{{userCurrency.coin}}</view>
					<block v-if="$app.getData('VERSION')!=$app.getData('config').version && $app.getData('platform')!='MP-QQ'">
						<view v-if="$app.chargeSwitch()==0" @tap="$app.goPage('/pages/recharge/recharge')">
							<image style="width: 30rpx;" src="/static/image/user/add.png" mode="widthFix"></image>
						</view>
						<button open-type="contact" :session-from="$app.getData('userInfo').id" v-else-if="$app.chargeSwitch()==2">
							<image style="width: 30rpx;" src="/static/image/user/add.png" mode="widthFix"></image>
						</button>
					</block>
				</view>
			</view>
			<view class="item-content flex-set">
				<view class="item-content-top">
					<image src="/static/image/user/b2.png" mode="aspectFit"></image>
					<view class="num">{{userCurrency.stone}}</view>
					<block v-if="$app.getData('VERSION')!=$app.getData('config').version && $app.getData('platform')!='MP-QQ'">
						<view v-if="$app.chargeSwitch()==0" @tap="$app.goPage('/pages/recharge/recharge')">
							<image style="width: 30rpx;" src="/static/image/user/add.png" mode="widthFix"></image>
						</view>
						<button open-type="contact" :session-from="$app.getData('userInfo').id" v-else-if="$app.chargeSwitch()==2">
							<image style="width: 30rpx;" src="/static/image/user/add.png" mode="widthFix"></image>
						</button>
					</block>
				</view>
			</view>
			<view class="item-content flex-set">
				<view class="item-content-top">
					<image src="/static/image/user/gift.png" mode="aspectFit"></image>
					<view class="num">{{userCurrency.item_count}}</view>
					<block v-if="$app.getData('VERSION')!=$app.getData('config').version && $app.getData('platform')!='MP-QQ'">
						<view v-if="$app.chargeSwitch()==0" @tap="$app.goPage('/pages/recharge/recharge')">
							<image style="width: 30rpx;" src="/static/image/user/add.png" mode="widthFix"></image>
						</view>
						<button open-type="contact" :session-from="$app.getData('userInfo').id" v-else-if="$app.chargeSwitch()==2">
							<image style="width: 30rpx;" src="/static/image/user/add.png" mode="widthFix"></image>
						</button>
					</block>
				</view>
			</view>
			<!-- <view class="item-content flex-set" @tap="$app.toast('敬请期待')">
					<view class="item-content-top">
						<image src="/static/image/user/b4.png" mode="aspectFit"></image>
						<badgeComponent size="6"></badgeComponent>
					</view>
					<view class="item-content-bottom">道具</view>
				</view> -->
		</view>
				
		<!-- <view class="item-wrap" @tap="$app.preImg(levelImg)">
			<view class="left-wrap">
				<view class="tips flex-set">粉丝等级<view class="highlight">LV{{userLevel}}</view>，再贡献 <view class="highlight">{{userGap}}</view> 人气可升至下一级</view>
			</view>
		</view> -->
		
		<view class="user-center">
			<view class="func-list">
		
				<block v-if="$app.getData('VERSION')!=$app.getData('config').version && $app.getData('platform')!='MP-QQ'">
					<view class="func-item" v-if="$app.chargeSwitch()==0" @tap="$app.goPage('/pages/recharge/recharge')">
		
						<btnComponent>
							<view class="btn-wrap">
								<image src="/static/image/user/r7.png" mode="aspectFit"></image>
							</view>
						</btnComponent>
		
						<view class="text">获取能量</view>
		
					</view>
					<button class="func-item" open-type="contact" :session-from="$app.getData('userInfo').id" v-else-if="$app.chargeSwitch()==2">
					
						<btnComponent>
							<view class="btn-wrap">
								<image src="/static/image/user/r7.png" mode="aspectFit"></image>
							</view>
						</btnComponent>
					
						<view class="text">回复“1”获取</view>
					
					</button>
				</block>
				<view class="func-item" v-if="$app.getData('config').version != $app.getData('VERSION')" @tap="$app.goPage('/pages/gift_package/gift_package')">
				
					<btnComponent>
						<view class="btn-wrap">
							<image src="/static/image/user/r8.png" mode="aspectFit"></image>
						</view>
					</btnComponent>
				
					<view class="text">礼物背包</view>
				
				</view>
				<view class="func-item" v-if="$app.getData('config').version != $app.getData('VERSION')&&$app.getData('platform')=='MP-WEIXIN'"
			 @tap="$app.goPage('/pages/prop/prop')">
		
					<btnComponent>
						<view class="btn-wrap">
							<image src="/static/image/user/r6.png" mode="aspectFit"></image>
						</view>
					</btnComponent>
		
					<view class="text">我的道具</view>
		
				</view>
				<view class="func-item" @tap="$app.goPage('/pages/subPages/task/task')">
		
					<btnComponent>
						<view class="btn-wrap">
							<image src="/static/image/user/r2.png" mode="aspectFit"></image>
						</view>
					</btnComponent>
		
					<view class="text">每日任务</view>
		
				</view>
				
			</view>
		</view>
		
		<view class="function-container-list">
			<view class="list-item" v-if="userStar.id" @tap="$app.goPage('/pages/subPages/fanclub_list/fanclub_list')">
				<view class="left-wrap">
					<image src="/static/image/user/s1.png" mode="widthFix"></image>
					<view class="text">后援会</view>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>
			<view class="list-item" @tap="$app.goPage('/pages/subPages/log/log')">
				<view class="left-wrap">
					<image src="/static/image/user/s2.png" mode="widthFix"></image>
					<view class="text">个人明细</view>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>
			<button v-if="($app.getData('config').kefu_uid==$app.getData('userInfo').id ||$app.getData('userStar').captain==1)&& $app.getData('config').version != $app.getData('VERSION')"
			 open-type="share" data-share="6">
				<view class="list-item" @tap="$app.goPage('/pages/subPages/log/log')">
					<view class="left-wrap">
						<image src="/static/image/user/s2.png" mode="widthFix"></image>
						<view class="text">给新群员发群红包</view>
					</view>
					<view class="right-wrap iconfont iconjiantou"></view>
				</view>
			</button>
			<!-- <button open-type="contact" :session-from="$app.getData('userInfo').id">
				<view class="list-item">
					<view class="left-wrap">
						<image src="/static/image/user/r3.png" mode="widthFix"></image>
						<view class="text">联系客服</view>
					</view>
					<view class="right-wrap iconfont iconjiantou"></view>
				</view>
			</button> -->
			<view v-if="$app.getData('platform')=='MP-WEIXIN'&&$app.getData('userExt').is_join_wxgroup == 0 && $app.getData('config').version != $app.getData('VERSION')"
			 class="list-item">
				 <view class="left-wrap">
					<image src="/static/image/user/r5.png" mode="widthFix"></image>
					<button class="btn" open-type="contact" :session-from="$app.getData('userInfo').id">
						<view class="text">加入{{$app.getData('userStar').name}}的官方群</view>
					</button>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>
			<view class="list-item" v-if="$app.getData('config').version != $app.getData('VERSION')" @tap="copy()">
				<view class="left-wrap">
					<image src="/static/image/user/r3.png" mode="widthFix"></image>
					<view class="text">客服微信号：{{$app.getData('config').kefu}}</view>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>
			<view class="list-item" @tap="$app.goPage('/pages/game/game?type=1')" v-if="$app.getData('config').version != $app.getData('VERSION')">
				<view class="left-wrap">
					<image src="/static/image/user/s7.png" mode="widthFix"></image>
					<view class="text">游戏试玩</view>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>

			<view v-if="userStar.id && $app.getData('userInfo').type == 0" class="list-item" @tap="modal='exitGroup'">
				<view class="left-wrap">
					<image src="/static/image/user/r4.png" mode="widthFix"></image>
					<view class="text">退出偶像圈</view>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>

		</view>
		<modalComponent v-if="modal=='exitGroup'" type="center" @closeModal="modal=''">
			<view class="modal-container exitGroup-modal-container" v-if="exitGroupInfo.status">
				<view class="title">退出当前公会</view>
				<view class="desc">下次退圈需要<text class="modal-color">半年</text>之后才能操作</view>
				<input type="text" @input="userID = $event.detail.value" placeholder="输入你的ID确认退圈" placeholder-class="placeholder-style" placeholder-style="color:#6D718E;" />
				<view class="btn-wrap">
					<btnComponent type="default">
						<view class="btn flex-set" @tap="exitGroup">确定</view>
					</btnComponent>
				</view>
			</view>
			<view class="modal-container exitGroup-modal-container" v-else>
				<view class="title">退出当前公会</view>
				<view class="desc">未到冷却时间</view>
				<view class="desc"><text class="modal-color">{{exitGroupInfo.exit_group_time}}</text>才可进行退圈操作</view>
				<view class="btn-wrap">
					<btnComponent type="default">
						<view class="btn flex-set" @tap="modal=''">我知道了</view>
					</btnComponent>
				</view>
			</view>
		</modalComponent>
	</view>
</template>

<script>
	import badgeComponent from "@/components/badgeComponent.vue"
	import btnComponent from "@/components/btnComponent.vue"
	import modalComponent from "@/components/modalComponent.vue"
	export default {
		components: {
			badgeComponent,
			modalComponent,
			btnComponent
		},
		data() {
			return {
				requestCount: 0,
				header: '',
				userInfo: {},
				userCurrency: {},
				userStar: {},
				exitGroupInfo:'',
				userID:'',
				modal:'',
				rechargeList: [],
				userLevel:'',
				userGap:0,
				levelImg:this.$app.getData('config').level_img,
			};
		},
		onLoad() {},
		onShow() {
			this.header = uni.getSystemInfoSync()['statusBarHeight'] + 'px'
			this.userInfo = {
				avatarurl: this.$app.getData('userInfo')['avatarurl'] || this.$app.getData('AVATAR'),
				nickname: this.$app.getData('userInfo')['nickname'] || this.$app.getData('NICKNAME'),
				id: this.$app.getData('userInfo')['id'] || null,
			}
			this.userCurrency = this.$app.getData('userCurrency') || {
				coin: 0,
				stone: 0,
				trumpet: 0
			}
			this.userStar = this.$app.getData('userStar') || {}

			this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
				this.$app.setData('userCurrency', res.data)
				this.userCurrency = this.$app.getData('userCurrency')
			})
			
			this.getUserLevel();
			this.exitInfo();
			// this.$app.openInterstitialAd()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			copy() {
				uni.setClipboardData({
					data: this.$app.getData('config').kefu,
					success: () => {
						this.$app.toast("微信号已复制\n请到微信中添加客服为好友")
					}
				})
			},
			exitInfo(){
				this.$app.request('user/exitInfo',{},res=>{
					this.exitGroupInfo=res.data;
				})
			},
			exitGroup() {
				if (this.userID/1234 != this.$app.getData('userInfo').id) {
					this.$app.toast('ID输入不正确')
					return
				}
				this.$app.request(this.$app.API.USER_EXIT, {}, res => {
					this.$app.toast('退出成功')
					this.$app.setData('userStar', {}, true)
					this.userStar = {};
					this.modal = ''
				})
			},
			// HTTP
			getUserLevel() {
				this.$app.request('user/level', {
					user_id: this.userInfo.id
				}, res => {
					this.userLevel = res.data
					this.userGap = res.data.gap ? (res.data.gap / 10000).toFixed(2) + '万' : '0'
				})
			},
			// HTTP
			/**
			 * 保存用户详细信息
			 */
			getUserInfo(e) {
				const userInfo = e.detail.userInfo
				if (userInfo) {
					this.$app.request(this.$app.API.USER_SAVEINFO, {
						iv: e.detail.iv,
						encryptedData: e.detail.encryptedData,
					}, res => {
						if (res.data.token) this.$app.token = res.data.token
						this.$app.request('page/app', {}, res => {
							this.$app.setData('userCurrency', res.data.userCurrency)
							this.$app.setData('userStar', res.data.userStar)
							this.$app.setData('userExt', res.data.userExt)
							this.$app.setData('userInfo', res.data.userInfo)
							this.$app.setData('config', res.data.config)
							
							this.userInfo = res.data.userInfo
							this.$app.toast('更新成功')
						})
					
					}, 'POST', true)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		// padding: 20upx;
		background-color: $text-color-10;
		
		.top-bg-container {
			width: 100%;
			position: relative;
			z-index: 1;
			
			.top-bg{
				width: 100%; 
				position: absolute; 
				z-index: 1;
			}
			
			.index-avurl {
				padding: 0 40rpx;
				height: 80rpx;
				font-size: 32rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				margin-bottom: 60rpx;
				position: relative;
				z-index: 2;
			}
		}

		.top-content-container {
			
			padding: 0 30upx;
			position: relative;
			z-index: 2;

			.row.userinfo {
				display: flex;
				border-radius: 30upx;
				background-image: url(https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FmibDk8LrMNNib025upafEqqaB6iazPjm7Yajdx5R3LVxpBdicE4pfiarQYCicw5qHVW5kB0RXV0Su0Ukg/0);
				background-size: 100% 100%;
				padding: 30rpx 20rpx 40rpx 20rpx;
				
				.get_user_info{
					display: flex;
					align-items: center;
					padding-left: 20rpx;
				}

				.avatar {
					position: relative;
					overflow: hidden;
					border-radius: 50%;
					width: 140upx;
					height: 140upx;

					z-index: 1;
					// -webkit-backface-visibility: hidden;
					// -webkit-transform: translate3d(0, 0, 0);

					.tips {
						position: absolute;
						width: 100%;
						background-color: rgba(0, 0, 0, .3);
						bottom: 0;
						height: 40upx;
						color: #fff;
						font-size: 20upx;
						text-align: center;
						line-height: 30upx;
					}
				}

				.info-content {
					padding-left: 30rpx;
					display: flex;
					flex: 1 0%;
					justify-content: space-around;
					flex-direction: column;
					font-size: 26upx;
					.tips{
						justify-content: space-between;
						font-size: 22rpx;
					}
					.item-line {
						width: 90%;
						display: flex;
						align-items: center;
						padding: 10rpx 0;

						.username {
							font-weight: 700;
							font-size: 30upx;
							margin-right: 8upx;
							color: $text-color-7;
							max-width: 300rpx;
						}

						image.vip {
							width: 38upx;
							height: 38upx;
							margin-top: 4upx;
							margin-right: 6upx;
						}

						.vip-expire {
							font-size: 18upx;
							color: #999;
							margin-top: 12upx;
						}

						.id-content {
							border-radius: 20upx;
							font-size: 22upx;
							background-color: #FDDE2F;
							padding: 0 10upx;
							color: $text-color-5;
							margin: 0 10upx;
						}

						.mystar {
							margin: 0 10upx;
							border-radius: 20upx;
							// font-size: 24upx;
							background-color: #23aecf;
							padding: 0 10upx;
							color: #FFF;
							font-size: 22rpx;
							letter-spacing: 3upx;
							white-space: nowrap;
						}

						.progress {
							border-radius: 30upx;
							background-color: $text-color-11;
							width: 100%;
							height: 10upx;
							position: relative;
							overflow: hidden;
									
							.progress-bar {
								background-color: $text-color-3;
								border-radius: 30upx;
								height: 100%;
							}
									
							
						}
					}

					.item-line.bottom {
						font-size: 20upx;
					}
				}
			}

		}

		.row.currency {
			
			background: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 20upx;
			padding: 30upx 0;

			.item-content {
				width: 100%;
				flex-direction: column;

				.item-content-top {
					display: flex;
					align-items: center;
					position: relative;

					image {
						width: 40upx;
						height: 40upx;
						margin: 0 15upx;
					}
				}

				.item-content-bottom {
					font-size: 28upx;
					margin-top: 4upx;
				}
			}
		}
		
		.item-wrap {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 20upx;
			padding-top: 20upx;
		
			.left-wrap {
				font-size: 30upx;
				display: flex;
				align-items: center;
		
				.icon {
					width: 63upx;
					height: 24upx;
					margin-right: 10upx;
				}
				
				.tips {
					color: #999;
					margin: 0 20upx;
					font-size: 26upx;
						
					.highlight {
						color: #345;
						font-weight: 700;
					}
					
				}
			}
		
			.right-wrap {
				font-size: 22upx;
				color: #999;
			}
		}

		.user-center {
			width: 100%;
			margin: 10rpx 0;
			padding: 0 20rpx;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			color: $text-color-2;
		
			.func-list {
				display: flex;
				justify-content: space-around;
				padding: 30rpx 0;
		
				.func-item {
					font-size: 24upx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					position: relative;
		
					.reddot {
						width: 20rpx;
						height: 20rpx;
						background-color: #f00f00;
						border-radius: 50%;
						margin-top: -20rpx;
						position: absolute;
						right: -5rpx;
						top: 15rpx;
						z-index: 10;
		
					}
		
					.btn-wrap {
						position: relative;
		
						.badge-wrap {
							position: absolute;
							top: 10upx;
							right: 10upx;
						}
		
					}
		
					.text {
						margin-top: 15rpx;
					}
		
					image {
						height: 68upx;
						width: 68upx;
					}
				}
			}
		}
		
		.function-container-list {
			padding: 0 20rpx;
			background-color: #FFFFFF;
			.red{
				color: red;
			}
			.list-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 0 20upx;
				padding: 30upx 0;
				border-bottom: 1rpx solid $text-color-10;
				color: $text-color-5;
				
				.left-wrap {
					display: flex;
					align-items: center;
					
					image {
						width: 40upx;
						height: 40upx;
						margin-right: 30upx;
					}
				}
				
				.right-wrap {
					font-size: 22upx;
				}
			}
		}

		.tips-modal-container {
			height: 100%;
			padding: 20upx 40upx;
			font-size: 32upx;

			.text-wrap {
				text-align: center;
				margin: 50upx;

				.title {
					font-size: 40upx;
					font-weight: 700;
					text-align: center;
					margin: 20upx;
				}

				.text {
					line-height: 1.7;
				}

				.avatar {
					width: 140upx;
					height: 140upx;
					border-radius: 50%;
					margin: 20upx;
				}
			}
		}

		.modal-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 40upx;
			height: 100%;
			justify-content: center;
		
			.title {
				font-size: 36upx;
				font-weight: 700;
			}
		
			.desc {
				display: flex;
				align-items: center;
				padding-top: 10upx;
				.modal-color{
					font-weight: 550;
				}
				image{
					width: 30rpx;
					height: 30rpx;
					margin: 0 5rpx;
				}
			}
			
			input{
				color: $text-color-5;
				border-radius: 30upx;
				height: 90rpx;
				background: $text-color-11;
				width: 88%;
				padding: 23rpx 40rpx;
				margin: 40rpx 0 0 0;
		
			}
		
			.btn-wrap {
				margin: 40upx 0;
				text-align: center;
				display: flex;
				width: 100%;
				justify-content: space-around;
				padding: 0 20upx;
			}
			.btn {
				font-size: 30upx;
				font-weight: 600;
				height: 80rpx;
				width: 300rpx;
					
			}
		
		}

	}
</style>

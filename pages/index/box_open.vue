<template>
	<view class="box-page-container">
		<!-- <view class="top-title">来自 <text style="color: #fbb225;">{{info.user.nickname}}</text> 送出的 <text style="color: #fbb225;">{{info.coin}}</text> 金豆</view> -->
		<view class="top-container">
			<image class="avatar" :src="info.user.avatarurl||$app.getData('AVATAR')" mode="aspectFill"></image>
			<view class="nickname">来自 <text class="highlight">{{info.user.nickname||$app.getData('NICKNAME')}}</text> 的红包</view>
			<view class="count flex-set">
				你获得了
				<text class="num">+{{self.count||0}}</text>
				
				
				<image class="img-m" src="/static/image/user/b1.png"
				 mode="aspectFill"></image>
				<view class="badge" v-if="self.double">x2</view>
				 <!-- <button class="icon-wrap flex-set" open-type="share">
					 <image class="img-s" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JXrp67BbdomXFY6zcFAibp9GXCgJXQJJ6jSagKrMJjhgicQWQAibCd9jFfH6AsT1zd8SEGNrg7ZtlnRA/0" mode=""></image>
					 分享
				 </button> -->
			</view>
		</view>
		<view class="tips">
			<view class="left">已领取 {{list.length}}/{{info.people||''}}</view>
			<view class="right flex-set">总额 <image class="img-s" src="/static/image/user/b1.png"
				 mode=""></image> {{info.isEarn}}/{{info.coin||''}}
				 </view>
		</view>
		<view class="list-container">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="left flex-set">
					<image class="avatar" :src="item.user.avatarurl||$app.getData('AVATAR')" mode="aspectFill"></image>
					<view class="nickname">{{item.user.nickname||$app.getData('NICKNAME')}}</view>
					<!-- <view class="lucky" v-if="lucky==item.user_id">手气最佳</view> -->
				</view>
				<view class="right flex-set">
					<view class="badge" v-if="item.double">x2</view>
					<image class="img-s" src="/static/image/user/b1.png"
					 mode="aspectFill"></image>
					+{{item.count}}
				</view>
			</view>
		</view>
		
		<modalComponent v-if="modal == 'join'" title="红包" @closeModal="modal=''">
			<view class="join-modal-container">
				<view class="top-wrap">
					<image class="img" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EsP1YK72GM1EGI8VsBLl4vDnX5444V6QyFOATsWQ50PKmdF2QnE9cPDpD2WiaFuRJjJLlbLDRq4Ig/0" mode="widthFix"></image>
					<!-- <view class="title" style="font-size: 38upx;">选择参与集结方式</view> -->
					<view class="title">选择观看视频，可获得双倍红包能量</view>
					
					
				</view>
		
				<view class="main-wrap flex-set">
					<view class="item" @tap="ad">
						<image class="img" src="/static/image/user/b1.png" mode="widthFix"></image>
						<view class="text">+{{self.count*2}}能量</view>
						<btnComponent type="css">
							<view class="" style="padding: 10upx;">看视频获取x2倍</view>
						</btnComponent>
					</view>
					<view class="item" @tap="modal=''">
						<image class="img" src="/static/image/user/b1.png" mode="widthFix"></image>
						<view class="text">+{{self.count}}能量</view>
						<btnComponent type="css">
							<view class="" style="padding: 10upx;">直接获取</view>
						</btnComponent>
		
					</view>
				</view>
			</view>
		</modalComponent>

		<!-- <view class="btn" @tap="$app.goPage('/pages/index/index')">我也要红包</view> -->


	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue';
	export default {
		components: {
			btnComponent,
			modalComponent,
		},
		data() {
			return {
				modal: '',
				self: {},
				info: {},
				list: [],
				lucky: 0,

				id: '',
			};
		},
		onLoad(option) {
			this.loadData()
		},
		onShow() {},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			// 看视频广告
			ad() {
				this.$app.openVideoAd(() => {
					this.join()
				},this.$app.getData('config').kindness_switch)
			},
			join(force) {
				this.$app.request('page/getHongbaoDouble', {
					gid: this.gid,
					force: 2
				}, res => {
					this.$app.toast('领取成功', 'success')
					this.modal = ''
					this.loadData();
				}, 'POST', true)
			},
			loadData() {
				this.$app.request('page/getBox', {
					referrer: this.$app.getData('referrer')
				}, res => {
					this.info = res.data.info
					if (!this.info.id){
						this.$app.modal('不存在的红包\n可以联系发红包的人让TA放点能量进去');
					}
					this.lucky = res.data.lucky
					this.self = res.data.self

					this.list = res.data.list
					this.award_type = res.data.award_type
					if (res.data.open) this.modal = 'join'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box-page-container {
		text-align: center;

		.top-title {
			margin: 20upx 0 -20upx;
			font-weight: 700;
		}

		.top-bg {
			position: absolute;
			height: 300upx;
		}
		
		.badge {
			background-color: red;
			color: #fff;
			padding: 0 20upx;
			border-radius: 30upx;
		}

		.top-container {
			text-align: center;
			border-radius: 30upx;
			box-shadow: 0 2upx 16upx rgba(#666, .3);
			margin: 40upx;
			padding: 40upx;
			position: relative;
			background-color: #fff;

			.avatar {
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
			}

			.nickname {
				.highlight {
					color: #f00;
					margin: 0 10upx;
					font-weight: 700;
				}
			}

			.count {
				.num {
					color: #fbb225;
					font-size: 50upx;
					font-family: 'Impact';
				}

				.icon {
					width: 40upx;
					height: 40upx;
				}
				
				
			}
			
			.icon-wrap {
				position: absolute;
				right: 30upx;
				top: 30upx;
			}
		}

		.tips {
			display: flex;
			justify-content: space-between;
			padding: 20upx 40upx;
			
			
		}

		.list-container {
			
			padding: 20upx 40upx;

			.item {
				display: flex;
				border-bottom: 2upx solid #efefef;

				justify-content: space-between;
				padding: 20upx;

				.left {
					.avatar {
						width: 80upx;
						height: 80upx;
						border-radius: 50%;
					}

					.nickname {
						margin: 0 10upx;
					}

					.lucky {
						border-radius: 30upx;
						color: #fff;
						background-color: #f00;
						padding: 0 10upx;
						font-size: 22upx;
					}
				}

				.right {
					.icon {
						width: 40upx;
						height: 40upx;
						margin: 0 10upx;
					}
				}
			}
		}

		.btn {
			margin: 30upx;
			padding: 25upx 100upx;
			background-color: #fff;
			color: #fff;
			border-radius: 60upx;
			display: inline-block;
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
				
				.img {
					width: 200upx;
					height: 200upx;
				}
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

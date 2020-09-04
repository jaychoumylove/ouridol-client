<template>
	<view class="rank-list-container">
		<view class="top">
			<image style="width: 100%; z-index: 1;" :src="banner" mode="widthFix"></image>
			<!-- <view class="title">每日产量排行榜</view> -->
			<view class="rule" @tap="$app.goPage('/pages/notice/notice?id=2')">排行说明</view>
		</view>
		<view class='tab-container'>
			<view class="tab">
				<view class="tab-item" :class='{active:current==0}' @tap='switchAct(0)'>今日排行</view>
				<view class="tab-item" :class='{active:current==1}' @tap='switchAct(1)'>昨日排行</view>
			</view>
		
		</view>
		<view class="rank-list">
			<view class="rank-list-item" v-for="(item,index) in rankList" :key="index">
				<listItemComponent :rank="index+1" :avatar="item.user.avatarurl || $app.getData('AVATAR')" :headwear="item.headwear || ''">
					<template v-slot:left-container>
						<view class="left-container">
							<view class="name">
								<view class="user-name">{{item.user.nickname || $app.getData('NICKNAME')}}</view>
								<view class="">
									<text class="star-name" v-if="item.starname">{{item.starname}}</text>
								</view>
							</view>
							<view class="bottom-text">
								<view class="hot-count" v-if="current==0">今日获得:{{item.thisday_coin}}</view>
								<view class="hot-count" v-if="current==1">昨日获得:{{item.lastday_coin}}</view>
								<image class="icon-heart" src="/static/image/user/b1.png" mode=""></image>
							</view>
						</view>
					</template>
				
					<template v-slot:right-container>
						<view class="right-container" v-if="current==0" @tap="playGod(item.user_id)">
							<btnComponent type="default">
								<view class="flex-set" style="width: 130upx;height: 60upx;">膜拜</view>
							</btnComponent>
						</view>
					</template>
				</listItemComponent>
				
			</view>
			<loadIconComponent v-if="showBottomLoading"></loadIconComponent>
		</view>
		<!-- 我的 -->
		<view class="my-container">
			
			<listItemComponent :rank="myInfo.daycoin?myInfo.rank:'no'" :avatar="$app.getData('userInfo').avatarurl || $app.getData('AVATAR')">
				<template v-slot:left-container>
					<view class="left-container">
						<view class="name">
							<view class="user-name">{{$app.getData('userInfo').nickname || $app.getData('NICKNAME')}}</view>
							<view class="">
								<text class="star-name" v-if="$app.getData('userStar').name">{{$app.getData('userStar').name}}</text>
							</view>
						</view>
					</view>
				</template>
			
				<template v-slot:right-container>
					<view class="right-container">
						<view class="hot-count" v-if="current==0">今日获得:{{myInfo.daycoin?myInfo.daycoin:0}}</view>
						<view class="hot-count" v-if="current==1">昨日获得:{{myInfo.daycoin?myInfo.daycoin:0}}</view>
						<image class="icon-heart" src="/static/image/user/b1.png" mode=""></image>
					</view>
				</template>
			</listItemComponent>
		</view>
		<modalComponent v-if="modal == 'worship'" type="center" title="膜拜" @closeModal="modal=''">
			<view class="worship-contanier">
				<view class="title flex-set">你是第{{peopleCount}}个膜拜大神的人</view>
				<view class="body flex-set">恭喜你,能量+<text>{{earn_coin}}</text>,大神获得能量+<text>{{god_earn_coin}}</text></view>
				<view class="desc flex-set">分享让更多人来支持你的大神</view>
				<view class="btn flex-set">
				<btnComponent type="default">
					<button open-type="share">
						<view class="btns flex-set">分享支持大神</view>
					</button>
				</btnComponent>
				</view>
			</view>
		</modalComponent>
	</view>
	
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue';
	import listItemComponent from '@/components/listItemComponent.vue';
	export default {
		components: {
			btnComponent,
			listItemComponent,
			modalComponent,
		},
		data() {
			return {
				header:'',
				modal: '',
				showBottomLoading: true,
				rankList:[],
				page:1,
				peopleCount:0,
				earn_coin:0,
				god_earn_coin:0,
				myInfo:'',
				banner:'',
				current: 0,
			};
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		onLoad() {
			this.header=uni.getSystemInfoSync()['statusBarHeight']+'px';
		},
		onShow() {
			this.getRankList()
		},
		/**
		 * 上拉加载
		 */
		onReachBottom() {
			this.page++
			this.getRankList()
		},
		methods:{
			switchAct(current) {
				this.page = 1
				this.current = current
				this.getRankList()
			},
			getRankList() {
				let rankField;
				if (this.current == 0) {
					rankField = 'thisday_coin'
				} else if (this.current == 1) {
					rankField = 'lastday_coin'
				}
				this.showBottomLoading = true
				this.$app.request(this.$app.API.SPRITE_RANK, {
					page: this.page,
					rankField: rankField
				}, res => {
					if (res.data.list.length < 10) {
						// 内容不足隐藏loadicon
						this.showBottomLoading = false
					}
					this.myInfo = res.data.myInfo
					
					this.banner = res.data.banner
			
					if (this.page == 1) {
						this.rankList = res.data.list
					} else {
						// 追加data
						this.rankList = this.rankList.concat(res.data.list)
					}
			
					this.$app.closeLoading(this)
				})
			
			},
			playGod(user_id){
				this.$app.request('sprite/zanGod',{user_id:user_id},res=>{
					this.peopleCount=res.data.cover_count;
					this.earn_coin=res.data.earn_coin;
					this.god_earn_coin=res.data.god_earn_coin;
					this.modal='worship';
					this.getRankList();
				})
			}
		}
	}
</script>

<style lang="scss">
	.rank-list-container{
		background-color: $text-color-10;
		height: 100%;
		
		.top{
			width: 100%;
			background:linear-gradient(90deg,rgba(254,140,175,1),rgba(255,120,161,1));
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			.title{
				font-size: 36rpx;
				font-weight: bold;
				color: #FFFFFF;
				z-index: 2;
			}
			
			.rule{
				position: absolute;
				right: 5rpx;
				bottom: 5rpx;
				color: #FFFFFF;
				z-index: 2;
			}
			.rule::after {
				content: "\e6e5";
				font-family: "iconfont" !important;
				padding-left: 10upx;
			}
		}
		
		.tab-container {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			padding-top: 20rpx;
		
			.tab {
				width: 100%;
				height: 80rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;
		
				.tab-item {
					width: 200rpx;
					padding: 15upx 0upx;
					margin: 0 40rpx;
					background:linear-gradient(0deg,rgba(208,208,208,1) 0%,rgba(175,175,175,1) 100%);
					box-shadow: 0 2upx 4upx rgba(#000, 0.3);
					justify-content: center;
					display: flex;
					font-size: 28upx;
					flex: 1;
					border-radius: 60rpx;
				}
		
				.tab-item.active {
					background:linear-gradient(90deg,rgba(254,140,175,1),rgba(255,120,161,1)) !important;
					text-align: center;
				}
			}
		
		}
		
		.left-container {
			line-height: 44upx;
			.name{
				display: flex;
				flex-direction: row;
				.user-name{
					max-width: 200rpx;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
				.star-name{
					padding: 2rpx 10rpx; 
					font-size: 22rpx; 
					background-color: #FF6C79; 
					color: #FFFFFF; 
					margin-left: 10rpx; 
					border-radius: 20rpx;
					max-width: 150rpx;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
			}
			
			
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
		
		.rank-list {
			padding: 20rpx;
			margin-bottom: 100rpx;
			background-color: #FFFFFF;
			margin-top: 20rpx;
		
			.rank-list-item {
				border-bottom: 1rpx solid $text-color-10;
		
				.right-container {
					margin-right: 20upx;
				}
			}
		}
		
		.my-container{
			width: 100%;
			position: fixed;
			bottom: 0;
			background-color: $color_5;
			
			.right-container {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-right: 20upx;
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
	
		.worship-contanier{
			margin-top: 50rpx;
			.title{
			}
			.body{
				font-weight: 550;
				color: #FF6C79;
				margin-top: 40rpx;
			}
			.desc{
				margin-top: 40rpx;
			}
			.btn{
				margin: 40rpx 0;
				.btns{
					width: 300rpx;
					height: 80rpx;
				}
				
			}
		}
	}
	
	
	

</style>

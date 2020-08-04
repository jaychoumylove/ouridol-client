<template>
	<view class="rank-list-container">
		<view class="top">
			<image style="width: 100%; z-index: 1;" :src="banner" mode="widthFix"></image>
			<!-- <view class="title">每日产量排行榜</view> -->
			<view class="rule" @tap="$app.goPage('/pages/notice/notice?id=2')">排行说明</view>
		</view>
		<view class="rank-list">
			<view class="rank-list-item" v-for="(item,index) in rankList" :key="index">
				<listItemComponent :rank="index+1" :avatar="item.user.avatarurl || $app.getData('AVATAR')">
					<template v-slot:left-container>
						<view class="left-container">
							<view class="name">
								<view class="user-name">{{item.user.nickname || $app.getData('NICKNAME')}}</view>
								<view class="">
									<text class="star-name" v-if="item.starname">{{item.starname}}</text>
								</view>
							</view>
							<view class="bottom-text">
								<view class="hot-count">今日获得:{{item.thisday_coin}}</view>
								<image class="icon-heart" src="/static/image/index/ic_hot.png" mode=""></image>
							</view>
						</view>
					</template>
				
					<template v-slot:right-container>
						<view class="right-container" @tap="playGod(item.user_id)">
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
			
			<listItemComponent :rank="myInfo.thisday_coin?myInfo.rank:'no'" :avatar="$app.getData('userInfo').avatarurl || $app.getData('AVATAR')">
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
						<view class="hot-count">今日获得:{{myInfo.thisday_coin?myInfo.thisday_coin:0}}</view>
						<image class="icon-heart" src="/static/image/index/ic_hot.png" mode=""></image>
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
			getRankList() {
				this.showBottomLoading = true
				this.$app.request(this.$app.API.SPRITE_RANK, {
					page: this.page,
				}, res => {
					if (res.data.list.length < 15) {
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
		.top{
			width: 100%;
			background:linear-gradient(to right bottom, #FF3A8A 20%, #fa6c9f 82%, #ffe140 100%);
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
		
			.rank-list-item {
		
				.right-container {
					margin-right: 20upx;
				}
			}
		}
		
		.my-container{
			width: 100%;
			position: fixed;
			bottom: 0;
			background-color: #eec1bc;
			
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

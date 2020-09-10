<template>
	<view class="marry-list-container">
		<view class="top-content">
			<view class="avatar-wrapper">
				<image class="avatar share" :src="$app.getData('userInfo').avatarurl" mode="aspectFill"></image>
			</view>

			<view class="top-text-wrapper">
				<view class="star-name row">
					<view class="rank text-overflow">{{$app.getData('userInfo').nickname}}</view>
				</view>
			</view>
		</view>
		<view class="list-container">
			<view class="item" v-for="(item,index) in applylist" :key="index">
				<image style="width: 80rpx; border-radius: 50%;" v-if="item.husband_info.id==$app.getData('userInfo').id" :src="item.wife_info.avatarurl" mode="widthFix"></image>
				<image style="width: 80rpx; border-radius: 50%;" v-else :src="item.husband_info.avatarurl" mode="widthFix"></image>
				<view class="name-info">
					<view class="name text-overflow">{{item.husband_info.id==$app.getData('userInfo').id?item.wife_info.nickname:item.husband_info.nickname}}</view>
					<view class="create-time"><text class="text-color-3">{{item.create_time.slice(0,10)}}</text>走向结婚历程</view>
				</view>
				<view @tap="send(item)">
					<btnComponent type="default">
						<view class="flex-set" style="width: 180upx;height: 60upx;">赠送礼物</view>
					</btnComponent>
				</view>
			</view>
			<view class="item" v-for="(item,index) in list" :key="index">
				<image style="width: 80rpx; border-radius: 50%;" v-if="item.husband_info.id==$app.getData('userInfo').id" :src="item.wife_info.avatarurl" mode="widthFix"></image>
				<image style="width: 80rpx; border-radius: 50%;" v-else :src="item.husband_info.avatarurl" mode="widthFix"></image>
				<view class="name-info">
					<view class="name text-overflow">{{item.husband_info.id==$app.getData('userInfo').id?item.wife_info.nickname:item.husband_info.nickname}}</view>
					<view class="create-time"><text class="text-color-3">{{item.create_time.slice(0,10)}}</text>成婚</view>
				</view>
				<view @tap="send(item)">
					<btnComponent type="default">
						<view class="flex-set" style="width: 180upx;height: 60upx;">赠送礼物</view>
					</btnComponent>
				</view>
			</view>
		</view>
		<!-- 赠送礼物给别人 -->
		<modalComponent v-if="modal == 'sendOtherItem'" title=" " @closeModal="modal=''">
			<view class="send-modal-container send-other">
				<image class="avatar" :src="currentUser.avatarurl" mode="scaleToFill"></image>
				<view class="nickname">{{currentUser.nickname}}</view>
				<view class="wrap">
					<view class="btn-wrapper gift-s">
						<!-- 礼物列表 -->
						<view v-for="(item,index) in itemList" :key="index" class="gift-item flex-set" @tap="sendItemOther(item, 1,index)">
							<view class="num">
								<image src="/static/image/user/b1.png" mode="widthFix"></image>
								{{item.count}}
							</view>
							<image :src="item.icon" mode="widthFix"></image>
							<view class="name">{{item.name}}</view>
							<view class="self flex-set" :class="{red:item.self>0}">{{item.self}}</view>
						</view>
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
			btnComponent,
			modalComponent,
		},
		data() {
			return {
				list: [],
				applylist: [],
				modal: '',
				currentUser: [],
				itemList: [],
			};
		},
		onShow() {
			this.loadDate();
		},
		methods: {
			loadDate() {
				this.$app.request('active/has_marry_list', {}, res => {
					this.list = res.data.list;
					this.applylist = res.data.applylist;
				})
			},
			send(item){
				this.getItemList();
				this.modal = 'sendOtherItem';
				if(item.husband_info.id==this.$app.getData('userInfo').id){
					this.currentUser = item.wife_info;
				}else{
					this.currentUser = item.husband_info;
				}
			},
			getItemList(){
				this.$app.request('page/gift_package', {}, res => {
					this.itemList = res.data.itemList
				})
			},
			sendItemOther(item, num, index) {
				this.$app.modal(`确认将${num}个${item.name}送给${this.currentUser.nickname}？`, () => {
					this.$app.request('user/sendItemToOther', {
						user_id: this.currentUser.id,
						item_id: item.id,
						num: num
					}, res => {
						this.$app.toast('赠送成功', 'success')
						this.modal = ''
						this.itemList[index].self -= num
					}, 'POST', true)
				})
			}
		}
	}
</script>

<style lang="scss">
	.marry-list-container {
		background-color: $text-color-10;
		min-height: 100%;
		.top-content {
			padding: 20upx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		
			.avatar-wrapper {
				width: 260upx;
				height: 260upx;
				background-image: url(https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E9lB1uaR0AK0a1icXKrcZOnq25fXCRPeybHG1d2XXqmVIoia2iay6p8lvp12Wn2kafBibDibibwzst99zA/0);
				background-size: 100%;
				position: relative;
				display: flex;
		
				.avatar {
					position: relative;
					overflow: hidden;
					border-radius: 50%;
					width: 190rpx;
					height: 190rpx;
					top: 10%;
					left: 17%;
					z-index: 1;

				}
		
			}
		
			.top-text-wrapper {
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding-top: 20rpx;
		
				.star-name {
					font-size: 36upx;
					font-weight: 700;
					display: flex;
					align-items: center;
					color: $text-color-7;
					max-width: 400rpx;
				}
		
			}
		
		}
		
		.list-container{
			padding: 20rpx;
			.item{
				padding: 20rpx;
				background-color: #FFFFFF;
				border-radius: 30rpx;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				margin: 15rpx 0;
				.name-info{
					width: 60%;
					display: flex;
					flex-direction: column;
					padding: 0 20rpx;
					.name{
						color: $text-color-7;
						padding-left: 10rpx;
						padding-top: 5rpx;
					}
					.create-time{
						font-size: 24rpx;
						margin-top: 15rpx;
					}
				}
			}
		}
		
		.send-modal-container.send-other {
			.avatar {
				width: 100upx;
				height: 100upx;
				border-radius: 50%;
			}
		
			.nickname {
				margin-bottom: 20upx;
			}
		}
		
		.send-modal-container {
			width: 100%;
			height: 680upx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		
			// .tab-wrapper{
			// 	height: 50upx;
			// }
			.explain-wrapper {
				font-size: 24upx;
			}
		
			.swiper-change {
				margin: 30upx;
				border-radius: 30upx;
				overflow: hidden;
				box-shadow: 0 2upx 4upx rgba(0, 0, 0, .3);
		
				.item {
					width: 200upx;
					height: 70upx;
					line-height: 70upx;
					background-color: #f5f5f5;
					color: #ff648d;
					text-align: center;
		
				}
		
				.item.select {
					background-color: #ff648d;
					color: #f5f5f5;
		
				}
		
			}
		
			swiper {
				width: 100%;
				height: 100%;
		
				swiper-item {
					z-index: 2;
				}
			}
		
			.swiper-item {
				flex: 1;
		
				.wrap {
					position: relative;
					padding: 0 20upx;
					width: 100%;
				}
			}
		
		
		
			.btn-wrapper {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
		
				.btn {
					border-radius: 10upx;
					margin: 8upx 0;
					width: 180upx;
					height: 90upx;
					background-color: #fac8cd;
		
					image {
						width: 40upx;
						height: 40upx;
					}
				}
		
				.gift-item {
					padding: 10upx 20upx;
					width: 140upx;
					flex-direction: column;
					position: relative;
					font-size: 24upx;
		
					image {
						width: 100upx;
						height: 100upx;
						position: relative;
					}
		
					.num {
						display: flex;
						align-items: center;
						position: absolute;
						border-radius: 20upx;
						right: 10upx;
						top: 88upx;
						font-size: 20upx;
						background-color: rgba(250, 250, 250, .3);
						z-index: 2;
		
						image {
							width: 22upx;
							height: 22upx;
						}
					}
		
					.name {
						color: #ff648d;
					}
		
		
					.self {
						position: absolute;
						right: 10upx;
						top: 10upx;
						border-radius: 50%;
						background-color: rgba(50, 50, 50, .3);
						color: #FFF;
						width: 34upx;
						height: 34upx;
						font-size: 22upx;
						z-index: 2;
					}
		
					.self.red {
						background-color: #F00;
					}
				}
		
				.btn.self-input {
					width: 372upx;
		
					input {
						// background-color: $color_3;
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
					background-color: #f8648a;
					color: #FFF;
				}
			}
		
			.btn-wrapper.gift-s {
				padding: 0 40upx;
			}
		
			.bottom-wrapper {
				padding-bottom: 20upx;
				display: flex;
				justify-content: space-between;
				font-size: 28upx;
				align-items: center;
		
				.text {
					border-radius: 10upx;
					background-color: #fac8cd;
					width: 180upx;
					height: 90upx;
				}
		
				.text.left {
					width: 100%;
				}
		
			}
		
			.git-tips {
				text-align: center;
				color: red;
			}
		
			.gift {
				position: absolute;
				right: 40upx;
				bottom: 30upx;
				font-size: 32upx;
				display: flex;
				justify-content: center;
				align-items: center;
		
				image {
					width: 50upx;
					height: 50upx;
					margin-right: 10upx;
				}
		
				.text {
					border-bottom: 2upx solid $color_3;
				}
			}
		
		}
	}
</style>

<template>
	<view class="badge-container">
		<!-- 顶部用户头像 -->
		<view class="avatar-wrap flex-set">
			<view class="avatar-block">
				<image class="avatar" :src="$app.getData('userInfo').avatarurl || $app.getData('AVATAR')"></image>
			</view>
			<view class="name-info">
				<view class="name text-overflow">{{$app.getData('userInfo').nickname}}</view>
				<!-- 粉丝等级 -->
				<view class="fan" v-if="userInfo.level">
					<image class="level" :src="'/static/image/icon/level/lv'+ userInfo.level +'.png'" mode="widthFix"></image>
				</view>
				<!-- 徽章 -->
				<view class="fan" v-if="badge_cur">
					<view class="user-badge">
						<image class="badge-item" :src="badge_cur" mode="widthFix"></image>
					</view>
				</view>
			
			</view>
			
			
		</view>
		
		<view class="tips flex-set">点击徽章可预览效果</view>
		
		<view class='tab-container'>
			<view class="tab">
				<view class="tab-item" :class='{active:badge_type==2}' @tap='switchAct(2)'>限定戒指</view>
			</view>
		</view>
		<view class="list-title" v-if="mylist.length>0">我的</view>
		<view class="badge-list" v-if="mylist.length>0">
			<view class="item" v-for="(item,index) in mylist" :key="index">
				<view class="item-cont">
					<view class="desc" @tap="showDesc(item.desc)" v-if="item.desc">说明</view>
					<view class="item-func flexcenter">
						<image class="item-img" :src="item.img" mode="widthFix"></image>
					</view>
					<view class="item-name">{{item.name}}</view>
					
					<block v-if="item.is_use==0">
						<view class="item-button" @tap="use(item.id)">
							<btnComponent type="default">
								<view class="flex-set" style="height: 50upx;">使用</view>
							</btnComponent>
						</view>
					</block>
					<block v-if="item.is_use==1">
						<view class="item-button" @tap="cancel(item.id)">
							<btnComponent type="disable">
								<view class="flex-set" style="height: 50upx;">取消使用</view>
							</btnComponent>
						</view>
					</block>
				</view>
			</view>
		</view>
		<view class="list-title" v-if="list.length>0">全部</view>
		<view class="badge-list" v-if="list.length>0">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="item-cont">
					<view class="desc" @tap="showDesc(item.desc)" v-if="item.desc">说明</view>
					<view class="item-func flexcenter" @tap="showImg(item.img)">
						<image class="item-img" :src="item.img" mode="widthFix"></image>
					</view>
					<view class="item-name">{{item.name}}</view>
					
					<block v-if="item.sold_out==0">
						<view class="item-button" v-if="item.type==1" @tap="buy(item.id)">
							<btnComponent type="disable">
								<view class="flex-set" style="height: 50upx;">{{item.stone}}灵丹</view>
							</btnComponent>
						</view>
						<view class="item-button" v-if="item.type==2" @tap="unlock(item.id)">
							<btnComponent type="disable">
								<view class="flex-set" style="height: 50upx;">解锁</view>
							</btnComponent>
						</view>
					</block>
					<block v-if="item.sold_out==1">
						<view class="item-button">
							<btnComponent type="disable">
								<view class="flex-set" style="height: 50upx;">已售空</view>
							</btnComponent>
						</view>
					</block>
					
					
				</view>
			</view>
		</view>
		
		<modalComponent v-if="modal == 'desc'" title="说明" @closeModal="modal=''">
		
			<view class="tips-modal-container">
				<view class="text-wrap">
					<view class="text" v-for="(item,index) in desc" :key="index">{{item}}</view>
				</view>
				
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
				list: [],
				mylist: [],
				modal: '',
				desc: '',
				badge_type: 2,
				userInfo: [],
				badge_cur: '',
			};
		},
		onShow() {
			this.loadData();
		},
		methods: {
			//展示说明
			showDesc(desc){
				this.modal = 'desc';
				this.desc = desc;
			},
			showImg(img){
				console.log(img)
				this.badge_cur = img;
			},
			switchAct(badge_type) {
				this.page = 1
				this.badge_type = badge_type
				this.loadData()
			},
			//解锁
			unlock(id){
				this.$app.request(this.$app.API.DRESSUP_UNLOCK, {
					type:2,
					id: id
				}, (res) => {
					this.$app.toast('解锁成功')
					this.loadData()
				}, 'POST', true)
			},
			// 购买徽章
			buy(id) {
				wx.showModal({
					title: '提示',
					content: '是否购买此徽章？',
					success: res => {
						if (res.confirm) {
							this.$app.request(this.$app.API.DRESSUP_BUY, {
								type:2,
								id: id
							}, (res) => {
								this.$app.toast('购买成功')
								this.loadData()
							}, 'POST', true)
						}
					}
				})
			},
			use(id) {
				this.$app.request(this.$app.API.DRESSUP_USE, {
					type:2,
					id: id
				}, (res) => {
					this.$app.toast('使用成功')
					this.loadData()
				}, 'POST', true)
			},
			cancel(id) {
				this.$app.request(this.$app.API.DRESSUP_CANCEL, {
					type: 2,
					id: id
				}, (res) => {
					this.$app.toast('取消成功')
					this.loadData()
				}, 'POST', true)
			},
			loadData() {
				this.badgeList()
				this.getInfo()
			},
			badgeList() {
				this.$app.request(this.$app.API.DRESSUP_SELECT, {
					type:2,
					badge_type: this.badge_type,
				}, res => {
			
					this.list = res.data.list
					this.mylist = res.data.mylist
				})
			},
			getInfo(){
				this.$app.request(this.$app.API.USER_INFO, {}, res => {
					this.userInfo = res.data;
					this.$app.setData('userInfo', res.data, true)
				})
			},
			
		}
	}
	
</script>

<style lang="scss">
	.badge-container {
		min-height: 100%;
		background: $text-color-10;
		
		.avatar-wrap {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 20rpx;
			position: relative;
			.avatar-block {
				margin: 20rpx;
				width: 160rpx;
				height: 160rpx;
				position: relative;
			}
			.avatar {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
			.name-info {
				display: flex;
				align-items: center;
			
				.name {
					color: $color_2;
					font-size: 36upx;
					max-width: 350upx;
				}
			
			
				.fan {
					display: flex;
					align-items: center;
					margin: 0 5upx;
					position: relative;
			
					.level {
						width: 90upx;
						margin-top: 2upx;
					}
					
					.user-badge .badge-item {
						width: 70upx;
						margin-left: 5upx;
					}
				}
			}
			
		}
		.name{
			
		}
		
		.tips {
			height: 80rpx;
			font-size: 24rpx;
			background-color: #fef8d4;
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
					max-width: 200rpx;
					padding: 15upx 0upx;
					margin: 0 20rpx;
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

		.list-title{
			padding: 20rpx;
			font-weight: bold;
			color: $text-color-7;
			font-size: 32rpx;
		}
		
		.badge-list {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			padding: 0rpx 20rpx 20rpx 20rpx;

			.item {
				width: 33.3%;
				padding: 10rpx;

				.item-cont {
					background: #FFFFFF;
					border-radius: 20rpx;
					display: flex;
					flex-direction: column;
					position: relative;
					
					.desc{
						position: absolute;
						top: 10rpx;
						left: 10rpx;
						z-index: 2; 
						border: 2rpx solid;
						padding: 0 10rpx;
						border-radius: 10rpx;
						font-size: 24rpx;
					
					}
					
					.item-func{
						width: 100%;
						padding-top: 20rpx;
						
						.item-img {
							width: 100rpx;
						}
					}
					
					
					.item-name {
						font-size: 32rpx;
						width: 100%;
						display: flex;
						justify-content: center;
						color: $text-color-7;
					}
					
					.item-desc {
						font-size: 22rpx;
						width: 100%;
					}

					.item-button {
						padding: 20rpx 30rpx;
					}
				}
			}
		}
		
		.tips-modal-container {
			height: 100%;
			padding: 20upx 40upx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-direction: column;
		
			.text-wrap {
		
				image {
					width: 120upx;
					height: 120upx;
					margin: 60upx;
				}
		
				.text {
					font-weight: 700;
		
				}
			}
		
		
			.btn {
				margin: 100upx auto;
			}
		}
		
		.upload-avatar-modal-container {
			padding: 20rpx;
		
			.form-container {
				display: flex;
				flex-direction: column;
		
				.input-group {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin: 60upx 20upx;
		
					.img-input {
						width: 180upx;
						height: 180upx;
						background-color: rgba(#eee, .6);
						font-size: 100upx;
						color: #cecece;
						border-radius: 50%;
						position: relative;
						z-index: 1;
						overflow: hidden;
						box-shadow: 0 2upx 8upx rgba(#999, .3);
					}
		
					input {
						height: 80upx;
						padding: 0 20upx;
						width: 100%;
						border-bottom: 2upx solid #eee;
					}
				}
			}
		}
	}
</style>

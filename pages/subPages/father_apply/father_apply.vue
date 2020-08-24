<template>
	<view class="father-apply-container">

		<view class="tab-container">
			<view class="tab">
				<view class="tab-item" :class='{active:type==1}' @tap='switchAct(1)'>申请成为我的徒弟</view>
				<view class="tab-item" :class='{active:type==2}' @tap='switchAct(2)'>申请成为我的师傅</view>
			</view>
		</view>

		<view class="rank-list-container" v-if="applylist && applylist.length>0">

			<view class="item" v-for="(item,index) in applylist" :key="index">
				<view class="rank-num">
					<image v-if="index<3" :src="'/static/image/guild/'+(index+1)+'.png'" mode="widthFix"></image>
					<view v-else>{{index+1}}</view>
				</view>

				<view class='avatar'>
					<image :src="item.user.avatarurl || $app.getData('AVATAR')" mode="aspectFill"></image>
				</view>
				<view class="text-container">
					<view class="star-name">
						<view class="myname text-overflow">{{item.user.nickname || $app.getData('NICKNAME')}}</view>
						<image class="level" v-if="item.level" :src="'/static/image/icon/level/lv'+ item.level +'.png'" mode="widthFix"></image>
					</view>
					<view class="bottom-text">
						<view class="hot-count" v-if="type==1">今日贡献:{{item.count}}</view>
						<view class="hot-count" v-if="type==2">今日收益:{{item.count}}</view>
					</view>
				</view>
				<view class="btn" style="right: 30upx;" @tap="selectDeal(item.id)">
					<btnComponent type="default">
						<view class="flex-set" style="width: 130upx;height: 60upx;">操作</view>
					</btnComponent>
				</view>

			</view>

		</view>
		<modalComponent v-if="modal == 'deal'" title="操作申请" @closeModal="modal = ''">
		
			<view class="modal-container">
				
				<view class="text-wrap">
					<view class="text">是否确认执行该操作</view>
				</view>
				<view class="button">
					<btnComponent type="disable" @tap="deal(-1);modal = ''">
						<view class="flex-set" style="width: 240upx;height: 80upx;">拒绝</view>
					</btnComponent>
					<btnComponent type="default" @tap="deal(1);modal = ''">
						<view class="flex-set" style="width: 240upx;height: 80upx;">同意</view>
					</btnComponent>
					
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
				type: 1,
				page: 1,
				modal: '',
				applylist: [],
				select_id: '',
			};
		},
		onShow() {
			this.getApplyList()
		},
		onReachBottom() {
			this.page++
			this.getApplyList()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			switchAct(type) {
				this.page = 1
				this.type = type
				this.applylist = [];
				this.getApplyList()
			},
			getApplyList() {
				this.$app.request(this.$app.API.FATHER_APPLY_LIST, {
					page: this.page,
					type: this.type,
				}, res => {

					if (this.page == 1) {
						this.applylist = res.data
					} else {
						this.applylist = this.applylist.concat(res.data)
					}
				})
			},
			selectDeal(id){
				this.select_id = id;
				this.modal = 'deal';
			},
			deal(status) {
				if (status==1) {
				    this.$app.request('user/applyDeal', {
				    	id: this.select_id,
				    	status: status
				    }, res => {
				    	this.$app.toast('加入成功', 'success')
				    	setTimeout(() => {
				    		this.getApplyList()
				    	}, 1000)
				    }, 'POST', true)
				} else if (status==-1) {
					this.$app.request('user/applyDeal', {
						id: this.select_id,
						status: status
					}, res => {
						this.$app.toast('已拒绝', 'success')
						setTimeout(() => {
							this.getApplyList()
						}, 1000)
					}, 'POST', true)
				    
				}
				
			},

		},
	}
</script>

<style lang="scss" scoped>
	.father-apply-container {
		height: 100%;
		background-color: $text-color-10;


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

		.modal-container{
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 20rpx;
			height: 70%;
			
			.top {
				width: 100%;
				font-size: 32rpx;
				font-weight: bold;
				text-align: center;
				margin-top: 40rpx;
			}
			
			.show_img {
				position: relative;
				width: 150rpx;
				height: 150rpx;
				border: 0;
				margin-top: 60rpx;
				margin-bottom: 30rpx;
			}
			
			
			.text-wrap {
				padding: 30rpx 0;
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
			
			.button{
				width: 100%;
				display: flex;
				justify-content: space-around;
				padding: 30rpx 0;
			}
		}
	}
</style>

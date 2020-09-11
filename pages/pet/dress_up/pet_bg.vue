<template>
	<view class="pet_bg-container">

		<view class="top-container">
			<view class="cp_list flexcenter" @tap="spriteBgList(1)">
				<btnComponent type="default">
					<view class="flex-set" style="width: 200upx;height: 60upx;">未获得</view>
				</btnComponent>
			</view>
			<view class="cp_list flexcenter" @tap="spriteBgList(2)">
				<btnComponent type="default">
					<view class="flex-set" style="width: 200upx;height: 60upx;">已拥有</view>
				</btnComponent>
			</view>
		</view>
		
		<view class="pet_bg-list">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="item-cont">
					<view class="item-func">
						<view class="desc" @tap="showDesc(item.desc)" v-if="item.desc">说明</view>
						<block v-if="item.type==2 && sprite_bg_type==2">
							<view class="upload" @tap="uploadAvatar(item.id)" v-if="item.id==9">
								<btnComponent type="default">
									<view class="flex-set" style="width: 140upx;height: 50upx;">上传头像</view>
								</btnComponent>
							</view>
						</block>
						<image class="item-img" :src="item.show_img" mode="widthFix"></image>
					</view>
					<view class="item-name">{{item.name}}</view>
					<block v-if="sprite_bg_type == 1">
						<view class="item-button" v-if="item.type==1" @tap="buy(item.id)">
							<btnComponent type="disable">
								<view class="flex-set" style="height: 60upx;">{{item.stone}}灵丹</view>
							</btnComponent>
						</view>
						<view class="item-button" v-else-if="item.type==2" @tap="unlock(item.id)">
							<btnComponent type="disable">
								<view class="flex-set" style="height: 60upx;">解锁</view>
							</btnComponent>
						</view>
					</block>
					<block v-if="sprite_bg_type == 2">
						<view class="item-button" v-if="sprite_bg_id!=item.id" @tap="use(item.id)">
							<btnComponent type="default">
								<view class="flex-set" style="height: 60upx;">使用</view>
							</btnComponent>
						</view>
						<view class="item-button" v-else>
							<btnComponent type="disable">
								<view class="flex-set" style="height: 60upx;">已使用</view>
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
		<modalComponent v-if="modal == 'uploadAvatarTips'" type="center" title="上传头像" @closeModal="modal=''">
			<view class="upload-avatar-modal-container">
				<form class="form-container" @submit="formSubmit">
					<view class="input-group">
						<view class="img-input flex-set" @tap="uploadImg()">
							<image :src="avatar" mode="aspectFill"></image>
						</view>
						<view style="padding-top: 20upx;">点击头像上传</view>
						<view style="padding-top: 20upx;">建议尺寸：120x120，大小不超过50KB</view>
					</view>
					<view class="input-group" style="padding-top: 40upx;">
						<button form-type="submit" style="width: 180upx;margin: auto;">
							<btnComponent type="default">
								<view class="flex-set" style="width: 180upx;height: 90upx;">修改</view>
							</btnComponent>
						</button>
					</view>
		
				</form>
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
				sprite_bg_id: 0,
				list: [],
				modal: '',
				desc: '',
				avatar: this.$app.getData('userStar').head_img_s,
				upload_id: 0,
				sprite_bg_type: 1,
			};
		},
		onShow() {
			this.loadData(1);
		},
		methods: {
			//展示说明
			showDesc(desc){
				this.modal = 'desc';
				this.desc = desc;
			},
			//上传头像
			uploadAvatar(id) {
				this.modal = 'uploadAvatarTips';
				this.upload_id = id;
			},
			uploadImg(name) {
				uni.chooseImage({
					count: 1,
					success: res => {
						let img = res.tempFiles[0]
						if (img.size > 10240 * 5) {
							this.$app.toast('图片过大，请上传50KB以下的图片')
						} else {
							this.$app.upload(img.path, res => {
								this.avatar = res[0]
							})
						}
					}
				});
			},
			formSubmit(e) {
				if (!this.avatar) {
					this.$app.toast('请上传头像')
					return
				}
			
				this.$app.request('sprite/sprite_bg_upload_img', {
					upload_id: this.upload_id,
					avatar: this.avatar,
				}, res => {
					this.$app.toast('上传成功！')
					this.modal = '';
					this.spriteBgList(this.sprite_bg_type)
				}, 'POST', true)
			
			},
			//解锁
			unlock(id){
				this.$app.request(this.$app.API.DRESSUP_UNLOCK, {
					type:0,
					id: id
				}, (res) => {
					this.$app.toast('解锁成功')
					this.loadData()
				}, 'POST', true)
			},
			// 购买背景
			buy(id) {
				wx.showModal({
					title: '提示',
					content: '是否购买此背景？',
					success: res => {
						if (res.confirm) {
							this.$app.request(this.$app.API.DRESSUP_BUY, {
								type:0,
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
					type:0,
					id: id
				}, (res) => {
					this.$app.toast('使用成功')
					this.spriteBgList(this.sprite_bg_type)
				}, 'POST', true)
			},
			loadData() {
				this.spriteBgList(1)
			},
			spriteBgList(sprite_bg_type) {
				this.sprite_bg_type = sprite_bg_type;
				this.$app.request(this.$app.API.DRESSUP_SELECT, {
					type:0,
					sprite_bg_type:sprite_bg_type,
				}, res => {
			
					this.list = res.data.list
					this.sprite_bg_id = res.data.sprite_bg_id;
				})
			},
			
		}
	}
	
</script>

<style lang="scss">
	.pet_bg-container {
		height: 100%;
		background: #f5f5f5;
		
		.top-container{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			padding-top: 20rpx;
			.cp_list {
				display: flex;
				flex: 1 0%;
			}
		}

		.pet_bg-list {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			padding: 20rpx;

			.item {
				width: 50%;
				padding: 10rpx 20rpx;

				.item-cont {
					background: #FFFFFF;
					border-radius: 20rpx;
					display: flex;
					flex-direction: column;
					
					.item-func{
						width: 100%;
						padding: 20rpx;
						position: relative;
						
						.desc{
							position: absolute;
							top: 25rpx;
							left: 25rpx;
							z-index: 2; 
							color: #FFFFFF; 
							border: 2rpx solid;
							padding: 0 10rpx;
							border-radius: 10rpx;
							font-size: 24rpx;

						}
						
						.upload{
							position: absolute;
							z-index: 2; 
							color: #FFFFFF; 
							right: 20rpx;
						}
						
						.item-img {
							width: 100%;
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
						padding: 20rpx 70rpx;
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

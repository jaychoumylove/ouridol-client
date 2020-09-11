<template>
	<view class="container">
		<!-- 顶部用户头像 -->
		<view class="avatar-wrap flex-set">
			<view class="avatar-block">
				<image class="avatar" :src="$app.getData('userInfo').avatarurl || $app.getData('AVATAR')"></image>
				<image class="headwear position-set" v-if="curHeadwear&&curHeadwear.img" :src="curHeadwear.img"></image>
			</view>
			<view>{{$app.getData('userInfo').nickname}}</view>
		</view>

		<view class="tips flex-set">点击头饰可预览效果</view>

		<view class="list-wrap">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="desc" @tap="showDesc(item.desc)" v-if="item.desc">说明</view>
				<view class="top-wrap flex-set" :class="{use:curHeadwear&&curHeadwear.id==item.id}" @tap="preHead(item)">
					<image class="icon" :src="item.img"></image>
				</view>
				<view class="fee" v-if="item.type==1">{{item.need_stone}}灵丹</view>
				<view class="fee" v-if="item.type==2">绝版头饰</view>
				<view v-if="item.days>0">(有效期:{{item.days}}天)</view>
				<view v-else>(长期)</view>
				<block v-if="item.type==1">
					<view v-if="item.status==-1" class="btn flex-set" @tap="buy" :data-id="item.id">
						<btnComponent type="default">
							<view class="flex-set" style="width: 150rpx;height: 50rpx;">购买</view>
						</btnComponent>
					</view>
				</block>
				<block v-if="item.type==2">
					<view v-if="item.status==-1" class="btn flex-set" @tap="unlock" :data-id="item.id">
						<btnComponent type="default">
							<view class="flex-set" style="width: 150rpx;height: 50rpx;">解锁</view>
						</btnComponent>
					</view>
				</block>
				<view v-if="item.status==0" class="btn flex-set success" @tap="use" :data-id="item.id">
					<btnComponent type="success">
						<view class="flex-set" style="width: 150rpx;height: 50rpx;">佩戴</view>
					</btnComponent>
				</view>
				<view v-if="item.status==1" class="btn flex-set disable" @tap="cancel" :data-id="item.id">
					<btnComponent type="disable">
						<view class="flex-set" style="width: 150rpx;height: 50rpx;">摘下</view>
					</btnComponent>
				</view>
			</view>

		</view>
		<modalComponent v-if="modal == 'desc'" title="说明" @closeModal="modal=''">
		
			<view class="tips-modal-container">
				<view class="text-wrap">
					<view class="text" v-for="(item,index) in desc" :key="index">{{item}}</view>
				</view>
				<btnComponent type="default" @tap="modal=''">
					<view class="flex-set" style="width: 240rpx;height: 70rpx;">我知道了</view>
				</btnComponent>
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
				list: [],
				curHeadwear: {} ,// 预览的头饰
				modal: '',
				desc: '',
			};
		},
		onLoad() {
			this.loadData()
		},
		onShow() {

		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			//展示说明
			showDesc(desc){
				this.modal = 'desc';
				this.desc = desc;
			},
			// 预览头饰
			preHead(item) {
				this.curHeadwear = item
			},
			// 购买头饰
			buy(e) {
				wx.showModal({
					title: '提示',
					content: '是否兑换？',
					success: res => {
						if (res.confirm) {
							this.$app.request(this.$app.API.DRESSUP_BUY, {
								type: 1,
								id: e.currentTarget.dataset.id
							}, (res) => {
								this.$app.toast(res.msg)
								this.loadData()
							}, 'POST', true)
						}
					}
				})
			},
			use(e) {
				this.$app.request(this.$app.API.DRESSUP_USE, {
					type: 1,
					id: e.currentTarget.dataset.id
				}, (res) => {
					this.$app.toast(res.msg)
					this.loadData()
				}, 'POST', true)
			},
			cancel(e) {
				this.$app.request(this.$app.API.DRESSUP_CANCEL, {
					type: 1,
				}, (res) => {
					this.$app.toast(res.msg)
					this.loadData()
				}, 'POST', true)
			},
			//解锁
			unlock(e){
				this.$app.request(this.$app.API.DRESSUP_UNLOCK, {
					type:1,
					id: e.currentTarget.dataset.id
				}, (res) => {
					this.$app.toast('解锁成功')
					this.loadData()
				}, 'POST', true)
			},
			loadData() {
				this.$app.request(this.$app.API.DRESSUP_SELECT, {
					type: 1,
				}, res => {

					this.list = res.data.list
					this.curHeadwear = res.data.cur || null
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		height: 100%;

		.avatar-wrap {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 20rpx;
			position: relative;
		}

		.avatar-wrap .avatar-block {
			margin: 20rpx;
			width: 120rpx;
			height: 120rpx;
			position: relative;
		}

		.avatar-wrap .avatar {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}

		.avatar-wrap .headwear {
			width: 180rpx;
			height: 180rpx;
		}

		.tips {
			height: 80rpx;
			font-size: 24rpx;
			background-color: #fef8d4;
		}

		.list-wrap {
			// flex: 1;
			overflow-y: scroll;
			overflow-x: hidden;
			display: flex;
			flex-wrap: wrap;
			// justify-content: space-between;
		}

		.list-wrap .item {
			font-size: 24rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 250rpx;
			border-right: 1px solid #eee;
			border-bottom: 1px solid #eee;
			margin-right: -1px;
			position: relative;
		}
		
		.list-wrap .item .desc{
			position: absolute;
			right: 10rpx;
			top: 10rpx;
			z-index: 2; 
			color: $text-color-2; 
			border: 2rpx solid;
			padding: 0 10rpx;
			border-radius: 10rpx;
			font-size: 24rpx;
		
		}

		.list-wrap .item .top-wrap {
			height: 180rpx;
			margin-top: 10rpx;
			margin-bottom: 10rpx;
			width: 230rpx;
			background-color: #fafafa;
			position: relative;
		}

		.list-wrap .item .top-wrap.use {
			background-color: #e6f8fc;
		}

		.list-wrap .item .top-wrap .badge {
			width: 30rpx;
			height: 30rpx;
			position: absolute;
			right: 10rpx;
			top: 10rpx;
		}



		.list-wrap .item .top-wrap .icon {
			width: 120rpx;
			height: 120rpx;
		}

		.list-wrap .item .btn {
			border-radius: 50rpx;
			color: #FFF;
			width: 150rpx;
			height: 50rpx;
			margin: 20rpx;

		}
		
		.tips-modal-container {
			height: 100%;
			padding: 20upx 40upx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-direction: column;
		
			.text-wrap {
				padding: 40rpx 0;
				image {
					width: 120upx;
					height: 120upx;
					margin: 60upx;
				}
				.text {
					// font-weight: 700;
					line-height: 40rpx;
				}
			}
		
			.btn {
				margin: 100upx auto;
			}
		}
	}
</style>

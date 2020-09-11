<template>
	<view class="marry-apply-container">
		<view :style="'height:'+header+';width:100%;'"></view>
		<view class="top-title">我们的偶像</view>
		<view class="title">组队一起完成CP任务</view>
		<view class="title">双方都可获得绝版戒指+领能量双倍卡x10</view>
		<view class="content">
			<block v-if="!is_marry_text">
				<view class="avatar">
					<image :src="info.apply_user.avatarurl?info.apply_user.avatarurl:$app.getData('AVATAR')" mode="widthFix"></image>
				</view>
				<view class="desc"><text style="color: #F75A73;">{{info.apply_user.nickname?info.apply_user.nickname:$app.getData('NICKNAME')}}</text>邀请你一起组CP</view>
				<view class="desc">组成CP后，未完成CP任务前，不可再组CP</view>
				<image class="show_img" src="https://mmbiz.qpic.cn/mmbiz_jpg/w5pLFvdua9HbURBc4icwIfibfezPVz80jBWr6EtVp3lawX9aIjmZjRgYhiaLX8oB6e7rxIgxcqyE7PIJq6wl2C4Bg/0" mode="widthFix"></image>
				<view class="button" @tap="agreeMarry()">
					<btnComponent type="default">
						<view class="flex-set" style="width: 280upx;height: 80upx;">同意</view>
					</btnComponent>
				</view>
			</block>
			<block v-else>
				<view class="desc"><text style="color: #F75A73;">@{{$app.getData('userInfo').nickname?$app.getData('userInfo').nickname:$app.getData('NICKNAME')}}</text></view>
				<image class="show_img" src="https://mmbiz.qpic.cn/mmbiz_jpg/w5pLFvdua9HbURBc4icwIfibfezPVz80jBWr6EtVp3lawX9aIjmZjRgYhiaLX8oB6e7rxIgxcqyE7PIJq6wl2C4Bg/0"
				 mode="widthFix"></image>
				<view class="desc"><text style="color: #F75A73;">{{is_marry_text}}</text></view>
				<view class="desc">未完成CP任务前，不可再组CP</view>
				<view class="button" @tap="$app.goPage('/pages/group/group')">
					<btnComponent type="default">
						<view class="flex-set" style="width: 280upx;height: 80upx;">去看看</view>
					</btnComponent>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import btnComponent from '@/components/btnComponent.vue'
	export default {
		components: {
			btnComponent,
		},
		data() {
			return {
				header: this.header = uni.getSystemInfoSync()['statusBarHeight'] + 'px',
				is_marry_text: '',
				info: '',
			};
		},
		onLoad(option) {

			this.loadDate();

		},
		methods: {
			agreeMarry(){
				this.$app.modal('是否答应他（她）的求婚,组成CP，携手贡献走向婚礼殿堂', () => {
					this.$app.request('active/agree_marry', {
						apply_user: this.$app.getData('referrer')
					}, res => {
						
						this.$app.toast('组CP成功，恭喜你们');
						this.loadDate();
					
					}, 'POST', true)
				})
			},
			loadDate() {
				this.$app.request('active/marry_apply_info', {
					apply_user: this.$app.getData('referrer')
				}, res => {

					this.info = res.data;
					this.is_marry_text = res.data.is_marry_text;

				}, 'POST', true)
			},
		}
	}
</script>

<style lang="scss">
	.marry-apply-container {
		width: 100%;
		height: 100vh;
		background: linear-gradient(-18deg, rgba(251, 169, 52, 1), rgba(245, 132, 173, 1));
		display: flex;
		flex-direction: column;
		align-items: center;

		.top-title {
			padding: 20rpx;
			color: #FFFFFF;
			font-size: 32rpx;
			font-weight: 700;
		}

		.title {
			font-size: 36rpx;
			font-weight: bold;
			color: #FFFFFF;
		}

		.content {
			width: 617rpx;
			height: 693rpx;
			background: #FFFFFF;
			border-radius: 30rpx;
			margin-top: 10%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.avatar {
				image {
					width: 140rpx;
					border-radius: 50%;
				}
			}

			.desc {
				font-weight: bold;
				padding: 10rpx 0;
			}

			.show_img {
				width: 280rpx;
				margin: 20rpx;
			}

			.button {
				margin: 10rpx 0;
			}

		}
	}
</style>

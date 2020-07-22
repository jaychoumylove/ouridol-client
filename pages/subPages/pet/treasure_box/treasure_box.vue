<template>
	<view class="box-container">
		<view :style="'height:'+header+';width:100%;'"></view>
		<view class="top-title">我们的偶像</view>
		<view class="title">开宝箱,拿奖励</view>
		<view class="content">
			<block v-if="!is_open">
				<view class="avatar">
					<image :src="boxData.user.avatarurl?boxData.user.avatarurl:$app.getData('AVATAR')" mode="widthFix"></image>
				</view>
				<view class="desc">来自<text style="color: #F75A73;">{{boxData.user.nickname?boxData.user.nickname:$app.getData('NICKNAME')}}</text>的宝箱</view>
				<image class="show_img" src="/static/image/pet/treasure_box_close.png" mode="widthFix"></image>
				<view class="button" @tap="openBox">
					<btnComponent type="golden">
						<view class="flex-set" style="width: 280upx;height: 80upx;">开启</view>
					</btnComponent>
				</view>
			</block>
			<block v-else>
				<view class="desc"><text style="color: #F75A73;">@{{$app.getData('userInfo').nickname}}</text></view>
				<image class="show_img" src="https://mmbiz.qpic.cn/mmbiz_png/CbJC0icY3EzYDK6IibJZCjKRgkicZiapsglt6iaDzMoFF8TYZnTKN5Jd2XcrrYXOrZTgU8v7GickwgKRjQGvWZRHR46Q/0"
				 mode="widthFix"></image>
				<block v-if="openBoxData">
					<view class="desc">谢谢你帮我获得了<text style="color: #F75A73;">{{openBoxData.prizeName}}+{{openBoxData.num}}</text></view>
					<view class="desc">你也获得了<text style="color: #F75A73;">{{openBoxData.prizeName}}+{{openBoxData.num}}</text></view>
				</block>
				<block v-else>
					<view class="desc">谢谢你,宝箱已经开启了</text></view>
					<view class="desc">我获得了<text style="color: #F75A73;">{{boxData.prizeName}}+{{boxData.count}}</text></view>
					
				</block>
				<view class="button" @tap="$app.goPage('/pages/pet/pet')">
					<btnComponent type="golden">
						<view class="flex-set" style="width: 280upx;height: 80upx;">去开其他宝箱</view>
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
				is_open: false,
				source_user_id: '',
				index: '',
				openBoxData: '',
				boxData: '',
			};
		},
		onLoad(option) {

			this.source_user_id = this.$app.getData('referrer');
			this.index = option.index;

			this.loadDate(option.index);

		},
		methods: {
			openBox() {
				if (this.index && this.source_user_id) {
					this.$app.request(this.$app.API.TREASURE_BOX_OPEN, {
						index: this.index,
						user_id: this.source_user_id
					}, res => {

						this.openBoxData = res.data;
						this.is_open = true;

					}, 'POST', true)
				} else {
					this.$app.toast('网络延迟，请退出重试')
				}

			},
			loadDate(index) {
				this.$app.request(this.$app.API.TREASURE_BOX_INFO, {
					index: index,
					user_id: this.$app.getData('referrer')
				}, res => {

					this.boxData = res.data;
					this.is_open = res.data.is_open;

				}, 'POST', true)
			},
		}
	}
</script>

<style lang="scss">
	.box-container {
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
			font-size: 48rpx;
			font-weight: bold;
			color: #FFFFFF;
			margin-top: 15%;
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
				padding: 20rpx;
			}

			.button {
				margin: 10rpx 0;
			}

		}
	}
</style>

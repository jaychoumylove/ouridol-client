<template>
	<view class="box-container">
		<view :style="'height:'+header+';width:100%;'"></view>
		<view class="top-title">我们的偶像</view>
		<view class="title">开宝箱,拿奖励</view>
		<view class="content">
			<block v-if="!is_open">
				<view class="avatar">
					<image :src="$app.getData('AVATAR')" mode="widthFix"></image>
				</view>
				<view class="desc">来自<text style="color: #F75A73;">小姐姐</text>的宝箱</view>
				<image class="show_img" src="/static/image/pet/treasure_box_close.png" mode="widthFix"></image>
				<view class="button" @tap="openBox">
					<btnComponent type="default">
						<view class="flex-set" style="width: 280upx;height: 80upx;">开启</view>
					</btnComponent>
				</view>
			</block>
			<block v-else>
				<view class="desc"><text style="color: #F75A73;">@小姐姐</text></view>
				<image class="show_img" src="https://mmbiz.qpic.cn/mmbiz_png/CbJC0icY3EzYDK6IibJZCjKRgkicZiapsglt6iaDzMoFF8TYZnTKN5Jd2XcrrYXOrZTgU8v7GickwgKRjQGvWZRHR46Q/0" mode="widthFix"></image>
				<view class="desc">谢谢你帮我获得了一张<text style="color: #F75A73;">双倍能量卡</text></view>
				<view class="desc">你也获得了一张<text style="color: #F75A73;">双倍能量卡</text></view>
				<view class="button" @tap="$app.goPage('/pages/pet/pet')">
					<btnComponent type="default">
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
			};
		},
		onLaunch(option) {
			console.log(option.query.index)
		},
		methods: {
			openBox(){
				this.is_open = true;
			}
		}
	}
</script>

<style lang="scss">
	.box-container{
		width: 100%;
		height: 100vh;
		background:linear-gradient(-18deg,rgba(251,169,52,1),rgba(245,132,173,1));
		display: flex;
		flex-direction: column;
		align-items: center;
		.top-title{
			padding: 20rpx;
			color: #FFFFFF;
			font-size: 32rpx;
			font-weight: 700;
		}
		.title{
			font-size: 48rpx;
			font-weight: bold;
			color: #FFFFFF;
			margin-top: 15%;
		}
		.content{
			width:617rpx;
			height:693rpx;
			background:#FFFFFF;
			border-radius:30rpx;
			margin-top: 10%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.avatar{
				image{
					width: 140rpx;
					border-radius: 50%;
				}
			}
			.desc{
				font-weight: bold;
				padding: 10rpx 0;
			}
			.show_img{
				width: 280rpx;
				padding: 20rpx;
			}
			.button{
				margin: 10rpx 0;
			}
			
		}
	}
</style>

<template>
	<view class="container">
		<view class="left-container flex-set">
			<view class="rank-num">{{rank}}</view>
			<view class="avatar-block">
				<image class='avatar' v-if="avatar" :src="avatar" mode="aspectFill"></image>
				<image class="headwear position-set" v-if="headwear" :src="headwear.img"></image>
			</view>

			<slot name="left-container"></slot>
		</view>
		<view class="right-container">
			<slot name="right-container"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			rank: {
				default: '',
			},
			avatar: {
				default: ''
			},
			headwear: {
				default: ''
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 6upx 0;
		background-color: rgba(255, 255, 255, .3);
		padding: 20rpx 0;
		width: 100%;
		color: $text-color-7;


		.left-container {

			.rank-num {
				text-align: center;
				width: 90upx;
			}

			.avatar-block{
				position: relative;
				margin-right: 40upx;
			}
			.avatar {
				width: 90upx;
				height: 90upx;
				border-radius: 50%;
			}
			.headwear{
				width: 135upx;
				height: 135upx;
			}
		}
	}
</style>

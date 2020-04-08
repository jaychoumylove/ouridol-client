<template>
	<view class="container">
		<view class="left-container flex-set">
			<view class="rank-num">{{rank}}</view>
			<image class='avatar' v-if="avatar" :src="avatar" mode="aspectFill"></image>

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
			}
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
		margin: 5upx 0;
		width: 100%;


		.left-container {

			.rank-num {
				text-align: center;
				width: 90upx;
			}

			.avatar {
				width: 110upx;
				height: 110upx;
				border-radius: 50%;
				margin-right: 40upx;
			}
		}
	}
</style>

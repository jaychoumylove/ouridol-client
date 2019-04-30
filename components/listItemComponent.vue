<template>
	<view class="container">
		<view class="left-container flex-set">
			<view class="rank-num" v-if="rank">{{rank}}</view>
			<view class='avatar'><image :src="avatar" mode="aspectFill"></image></view>
			<view class='badge'></view>
			<view class="text-container">
				<slot name="text-line-1"></slot>
				<slot name="text-line-2"></slot>
			</view>
		</view>
		<view class="right-container">
			
		</view>
		<!-- 
		<btnComponent type="default">
			<view class="flex-set" style="width: 130upx;height: 65upx;">打榜</view>
		</btnComponent> -->
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
		padding: 12upx 0;
		background-color: rgba(255, 255, 255, .3);
		margin: 10upx 0;

		.left-container {}

		.rank-num {
			width: 90upx;
			text-align: center;
		}

		.avatar image {
			width: 110upx;
			height: 110upx;
			border-radius: 50%;
		}

		.text-container {
			width: 350upx;
			padding: 0 30upx;
			line-height: 44upx;
		}

	}
</style>

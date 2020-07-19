<template>
	<view class="box-container">
		<view class="title">开宝箱,拿奖励</view>
		<view class="content">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
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
		justify-content: center;
		.title{
			font-size: 48rpx;
			font-weight: bold;
			color: #FFFFFF;
		}
		.content{
			width:617rpx;
			height:693rpx;
			background:#FFFFFF;
			border-radius:30rpx;
		}
	}
</style>

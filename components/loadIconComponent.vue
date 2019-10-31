<template>
	<view>
		<view class="container" :class="[ type=='bottom'?'bottom':'whole' ]">
			<view class='line'></view>
			<view class='line'></view>
			<view class='line'></view>
			<view class='line'></view>
			<view class='line'></view>
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
			type: {
				default: 'bottom'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20upx;
		z-index: 3;
		background: transparent;
		 
		.line {
			border-radius: 10upx;
			width: 10upx;
			height: 30upx;
			margin: 2upx;
			animation: lineWave 0.8s ease-in-out infinite alternate;
		}

		.line:nth-of-type(1) {
			animation-delay: 0.1s;
		}

		.line:nth-of-type(2) {
			animation-delay: 0.2s;
		}

		.line:nth-of-type(3) {
			animation-delay: 0.3s;
		}

		.line:nth-of-type(4) {
			animation-delay: 0.4s;
		}

		.line:nth-of-type(5) {
			animation-delay: 0.5s;
		}

	}

	.container.whole {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: $text-color-1;
		z-index: 9;
	}

	@keyframes lineWave {
		from {
			transform: scaleY(1);
			background-color: $text-color-1;
		}

		to {
			transform: scaleY(0.2);
			background-color: #EEE;
		}
	}
</style>

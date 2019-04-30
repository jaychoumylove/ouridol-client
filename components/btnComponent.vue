<template>
	<view class="button flex-set" :class="[type,scale]" @touchstart="scale = 'scale'" @touchend="scale = ''">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scale: '',
			};
		},
		props: {
			// 按钮背景类型
			type: {
				default: ''
			}
		},

	}
</script>

<style lang="scss" scoped>
	.button {
		color: $color_1;
		transition: 0.3s;
	}

	.button.scale {
		transform: scale(0.7);
	}

	.button.default {
		background: url(http://wx2.sinaimg.cn/large/0060lm7Tly1g2coigwh4sg303s01p741.gif) center no-repeat/100% 100%;
	}

	.button.big {
		background: url(http://wx4.sinaimg.cn/large/0060lm7Tly1g2dxu4igebg303v02cgld.gif) center no-repeat/100% 100%;
	}

	.button.success {
		background: url(http://wx4.sinaimg.cn/large/0060lm7Tly1g2ey5oz2oag303s01p741.gif) center no-repeat/100% 100%;
	}

	.button.disable {
		background: url(http://wx1.sinaimg.cn/large/0060lm7Tly1g2ey5nkm77g303s01p741.gif) center no-repeat/100% 100%;
	}

	.button.fangde {
		background: url(http://wx2.sinaimg.cn/large/0060lm7Tly1g2jwmn4sshg305v05vwea.gif) center no-repeat/100% 100%;
	}
</style>

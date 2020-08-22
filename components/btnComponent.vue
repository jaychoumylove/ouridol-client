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
		color: $text-color-2;
		transition: 0.3s;
		border-radius: 40upx;
	}
	
	.button.scale {
		transform: scale(0.7);
	}

	.button.default {
		color: #FFF;
		background:linear-gradient(90deg,rgba(254,140,175,1),rgba(255,120,161,1));
		box-shadow: 0 2upx 4upx rgba(#000, 0.3);
	}

	.button.big {
		background: url(http://tva1.sinaimg.cn/large/0060lm7Tly1g2dxu4igebg303v02cgld.gif) center no-repeat/100% 100%;
	}

	.button.success {
		color: #FFF;		
		background:linear-gradient(90deg,#af7ef8,#914afc);
		// background: linear-gradient(to right bottom, #44ea76 0%,#39fad7 82%,#39fad7 100%);
		box-shadow: 0 2upx 4upx rgba(#000, 0.3);//, inset 0 0 4upx rgba(#000, 0.3);
	}

	.button.disable {
		color: #FFF;
		background:linear-gradient(0deg,rgba(208,208,208,1) 0%,rgba(175,175,175,1) 100%);
		box-shadow: 0 2upx 4upx rgba(#000, 0.3);//, inset 0 0 4upx rgba(#000, 0.3);
	}
	
	.button.receive {
		color: #FFF;
		background: #f6d5d2;
		box-shadow: 0 2upx 4upx rgba(#000, 0.3);
	}
	

	.button.fangde {
		background: url(http://tva1.sinaimg.cn/large/0060lm7Tly1g2jwmn4sshg305v05vwea.gif) center no-repeat/100% 100%;
	}

	.button.css {
		color: #FFF;
		// background: linear-gradient(to right bottom, #f8648a, #F00);		
		background:linear-gradient(90deg,rgba(254,140,175,1),rgba(255,120,161,1));
		box-shadow: 0 2upx 4upx rgba(#000, 0.3);//, inset 0 0 4upx rgba(#000, 0.3);
	}
	
	.button.golden {
		color: #FFFFFF;
		background:url(https://mmbiz.qpic.cn/mmbiz_png/CbJC0icY3EzZkic73fibNnibpIvllj1icjrN7gdbcBHONe18HPVfJTuhBpDBqlcTYloxiblEdhzLDlZlfLuF5xjicQ4uw/0) center center/100% 100% no-repeat;
	}

	.button.color {
		background-color: $text-color-1;
		border-radius: 60upx;
		box-shadow: 0 2upx 4upx rgba(#000, 0.3);//, inset 0 0 4upx rgba(#000, 0.3);
	}
</style>

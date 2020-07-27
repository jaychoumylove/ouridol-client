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
		// background: url(http://tva1.sinaimg.cn/large/0060lm7Tly1g2coigwh4sg303s01p741.gif) center no-repeat/100% 100%;
		color: #FFF;
		// background: linear-gradient(to right bottom, #FF3A8A, #FF385B);
		background:linear-gradient(to right bottom, #FF3A8A 20%, #fa6c9f 82%, #ffe140 100%);
		box-shadow: 0 2upx 4upx rgba(#000, 0.3);//, inset 0 0 4upx rgba(#000, 0.3);
	}

	.button.big {
		background: url(http://tva1.sinaimg.cn/large/0060lm7Tly1g2dxu4igebg303v02cgld.gif) center no-repeat/100% 100%;
	}

	.button.success {
		// background: url(http://tva1.sinaimg.cn/large/0060lm7Tly1g2ey5oz2oag303s01p741.gif) center no-repeat/100% 100%;
		color: #FFF;		
		// background: linear-gradient(to right bottom, #28a745, #70c183);
		background: linear-gradient(to right bottom, #44ea76 0%,#39fad7 82%,#39fad7 100%);
		box-shadow: 0 2upx 4upx rgba(#000, 0.3);//, inset 0 0 4upx rgba(#000, 0.3);
	}

	.button.disable {
		// background: url(http://tva1.sinaimg.cn/large/0060lm7Tly1g2ey5nkm77g303s01p741.gif) center no-repeat/100% 100%;
		color: #FFF;
		background: linear-gradient(to right bottom, #aaa, #666);
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
		background:linear-gradient(to right bottom, #FF3A8A 20%, #fa6c9f 82%, #ffe140 100%);
		box-shadow: 0 2upx 4upx rgba(#000, 0.3);//, inset 0 0 4upx rgba(#000, 0.3);
	}
	
	.button.palePink {
		color: #FFFFFF;
		background:url(https://mmbiz.qpic.cn/mmbiz_png/CbJC0icY3EzYDK6IibJZCjKRgkicZiapsgltvnGHD42bLH7zibMs071OjaqnRicjpLucbuGyYXnxVW5Ro99ppCvPvp5w/0) center center/100% 100% no-repeat;
	}
	
	.button.pink {
		color: #FFFFFF;
		background:url(https://mmbiz.qpic.cn/mmbiz_png/CbJC0icY3EzZkic73fibNnibpIvllj1icjrN7gGdaQiaejibgHicJ6hBDTmQcprH8ibdbskrzvoqaBkbX8cpR9WZfDicRDfA/0) center center/100% 100% no-repeat;
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

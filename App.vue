<script>
	import Const from "@/lib/const";
	import Func from "@/lib/func";
	import ExtFunc from "@/lib/ext_func"
	export default {
		globalData: {
			...Const,
			...Func,
			...ExtFunc,
		},
		onLaunch: function(option) {
			this.getUser()
			if (option.query.referrer) {
				// 推荐人
				console.log('推荐人', option.query.referrer);
				this.$app.setData('referrer', option.query.referrer)
			}
			this.$app.setData('sysInfo', uni.getSystemInfoSync())
			// 获取服务提供商（用于支付）
			// uni.getProvider({
			// 	service: 'payment',
			// 	success: function(res) {
			// 		console.log(res.provider)
			// 	}
			// });
		},

		onShow: function() {
			if (!this.$app.socketTask || this.$app.socketTask.readyState == 2 || this.$app.socketTask.readyState == 3) {
				this.$app.initSocket()
			}
		},
		onHide: function() {},
		methods: {
			getUser() {
				this.$app.request(this.$app.API.USER_INFO, {}, res => {
					this.$app.setData('userInfo', res.data)
					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						this.$app.setData('userCurrency', res.data)
					})
					this.$app.request(this.$app.API.USER_STAR, {}, res => {
						this.$app.setData('userStar', res.data)
					})
				})
			},


		}
	};
</script>

<style lang='scss'>
	@import '/lib/iconfont.css';
	@import '/lib/css/article.css';

	/*每个页面公共css */
	view,
	scroll-view,
	swiper,
	swiper-item,
	movable-area,
	movable-view,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox-group,
	checkbox,
	form,
	input,
	label,
	picker,
	picker-view,
	radio-group,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	functional-page-navigator,
	image,
	video,
	camera,
	live-player,
	live-pusher,
	map,
	canvas,
	open-data,
	web-view,
	ad {
		box-sizing: border-box;
	}

	page {
		color: $color_1;
		font-family: "Microsoft Yahei";
		font-size: 28upx;
		position: relative;
		height: 100%;
	}

	page::before {
		content: "";
		position: fixed;
		z-index: -1;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url('http://wx2.sinaimg.cn/large/0060lm7Tly1g2cnc5vqk3j30kw1g03z4.jpg') bottom center no-repeat/cover;

	}

	/* 下拉刷新样式颜色 */
	.uni-page-refresh__icon {
		fill: $color_0;
	}

	.uni-page-refresh__path {
		stroke: $color_0;
	}

	image {
		width: 100%;
		height: 100%;
		vertical-align: middle;
		will-change: transform;
	}

	/* button */
	button {
		margin: 0;
		padding: 0;
		background-color: transparent;
		font-size: 28upx;
		line-height: 1;

	}

	button::after {
		border: none;
	}

	.button-hover {
		background-color: transparent;
	}

	.flex-set {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.position-set {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	/* 单行文字,超出隐藏 */
	.text-overflow {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.placeholder-style {
		/* font-size: 24upx; */
		font-size: 24upx;
	}
</style>

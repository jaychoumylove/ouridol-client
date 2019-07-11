<script>
	import Const from "@/lib/const";
	import BaseFunc from "@/lib/base_func"
	import Func from "@/lib/func";
	import ExtFunc from "@/lib/ext_func"
	export default {
		globalData: {
			...Const,
			...BaseFunc,
			...Func,
			...ExtFunc,
		},
		onLaunch: function(option) {
			this.$app.setData('sysInfo', uni.getSystemInfoSync())
			// 弹幕队列
			this.$app.danmakuQueue = []
		},

		onShow: function(option) {
			console.log('option', option);
			if (option.query && option.query.referrer) {
				// 推荐人
				this.$app.setData('referrer', option.query.referrer)
			} else {
				this.$app.setData('referrer', '')
			}
			this.loadData()
			// 检查更新
			this.$app.checkUpdate()
			// #ifndef H5
			// 连接socket
			this.$app.invokeSocket()
			// #endif

		},
		onHide: function() {},
		methods: {
			loadData() {
				this.$app.request('page/app', {
					referrer: this.$app.getData('referrer')
				}, res => {
					// #ifndef H5
					if (res.data.upSprite) {
						setTimeout(() => {
							this.$app.modal("精灵可以升级啦！\n提升精灵等级可获取更多能量哦", () => {
								this.$app.goPage('/pages/pet/pet')
							})
						}, 5000)

					}
					// #endif

					this.$app.setData('userInfo', res.data.userInfo)
					this.$app.setData('userCurrency', res.data.userCurrency)
					this.$app.setData('qrcode', res.data.qrcode)

					if (!res.data.userStar.id) this.$app.noob = true
					this.$app.setData('userStar', res.data.userStar)

					this.$app.setData('config', res.data.config)

					if (res.data.massUser) this.$app.modal('助力' + res.data.massUser + '成功')
				})
			},

		}
	};
</script>

<style lang='scss'>
	@import '/lib/css/iconfont.css';
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
		background: $color_0 url(http://tva1.sinaimg.cn/large/0060lm7Tly1g41l6zxwdvj30kw1g03z4.jpg) bottom center no-repeat/cover;
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
		line-height: 1.5;
		color: $color_1;
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
		font-size: 26upx;
	}

	.hide {
		display: none;
	}
</style>

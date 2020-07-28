<script>
	import lib from "@/lib/lib"
	export default {
		globalData: {
			...lib
		},		
		onLaunch: function(option) {
			this.setPlatform()

			this.$app.setData('sysInfo', uni.getSystemInfoSync())
			// 弹幕队列
			this.$app.danmakuQueue = []
		},
		onShow: function(option) {
			// 处理入口option
			this.optionHandle(option)
			// 请求数据
			this.loadData(option)
			// 检查更新
			this.$app.checkUpdate()
			// 连接socket
			this.$app.invokeSocket()

			// 群红包
			if (option.query && option.query.award_type) {
				this.$app.setData('award_type', option.query.award_type)
			}
		},
		onHide: function() {},
		methods: {
			/**平台判断*/
			setPlatform() {
				// 微信小程序
				this.$app.setData('platform', 'MP-WEIXIN')
				// QQ小程序
				if (uni.getSystemInfoSync().AppPlatform == 'qq') {
					this.$app.setData('platform', 'MP-QQ')
				}
				// H5
				// #ifdef H5
				this.$app.setData('platform', 'H5')
				// #endif
				// APP
				// #ifdef APP-PLUS
				this.$app.setData('platform', 'APP')
				// #endif
			},
			optionHandle(option) {
				console.log('option', option);
				// 入口参数
				this.$app.setData('query', option.query)
				if (option.query && option.query.referrer) {
					// 推荐人
					this.$app.setData('referrer', option.query.referrer)
				} else {
					this.$app.setData('referrer', '')
				}

				if (option.shareTicket) {
					// shareTicket 微信群分享信息
					this.$app.setData('shareTicket', option.shareTicket)
				}
			},
			loadData(option) {
				this.$app.request('page/app', {
					referrer: this.$app.getData('referrer'),
				}, res => {
					// #ifndef H5
					// if (res.data.upSprite) {
					// 	setTimeout(() => {
					// 		this.$app.modal("精灵可以升级啦！\n提升精灵等级可获取更多能量哦", () => {
					// 			this.$app.goPage('/pages/pet/pet')
					// 		})
					// 	}, 5000)
					// }
					// #endif

					this.$app.setData('userInfo', res.data.userInfo)
					this.$app.setData('userCurrency', res.data.userCurrency)
					this.$app.setData('qrcode', res.data.qrcode)

					if (!res.data.userStar.id) this.$app.noob = true
					this.$app.setData('userStar', res.data.userStar)
					this.$app.setData('userExt', res.data.userExt)

					this.$app.setData('config', res.data.config)

					if (res.data.massUser) this.$app.modal('助力' + res.data.massUser + '成功')
				})
			},

		}
	};
</script>

<style lang='scss'>
	@import '/lib/css/base.scss';
	@import '/lib/css/iconfont.css';
	@import '/lib/css/article.css';

	page {
		color: $text-color-2;
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
		background: $text-color-1 url(http://tva1.sinaimg.cn/large/0060lm7Tly1g41l6zxwdvj30kw1g03z4.jpg) bottom center no-repeat/cover;
	}

	/* 下拉刷新样式颜色 */
	.uni-page-refresh__icon {
		fill: $text-color-1;
	}

	.uni-page-refresh__path {
		stroke: $text-color-1;
	}

	.placeholder-style {
		/* font-size: 24upx; */
		font-size: 26upx;
	}

	.hide {
		display: none;
	}
</style>

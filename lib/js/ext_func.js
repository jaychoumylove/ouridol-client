// 扩展方法
export default {
	/**登录 */
	login(callBack) {
		const getAuth = function(code) {
			// 通用登录接口
			this.request(this.API.AUTH_LOGIN, {
				model: this.getData('sysInfo')['model'],
				code,
			}, res => {
				if (res.data.token) this.token = res.data.token
				callBack && callBack()
			})
		}.bind(this)

		// #ifndef H5
		uni.login({
			success: res => {
				getAuth(res.code)
			},
		});
		// #endif

		// #ifdef H5
		var code = this.getQueryString('code')
		if (!code) {
			// 微信网页授权
			location.href =
				`https://open.weixin.qq.com/connect/oauth2/authorize?appid
				=${this.GZH_APPID}&
				redirect_uri=${encodeURIComponent(location.href)}
				&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
		} else {
			getAuth(code)
		}
		// #endif
	},
	/**检查更新 */
	checkUpdate() {
		// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO
		const updateManager = uni.getUpdateManager();
		updateManager.onUpdateReady(function(res) {
			uni.showModal({
				title: '更新提示',
				showCancel: false,
				content: '新版本已经准备好，请重启应用',
				success(res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate();
					}
				}
			});

		});
		// #endif
	},

	// 页面相关
	invokeSocket() {
		if (!this.socketTask || this.socketTask.readyState == 2 || this.socketTask.readyState == 3) {
			this.socketTask = uni.connectSocket({
				url: this.WSS_URL,
				success: res => {
					console.log('WebSocket 连接成功！', res);
				}
			})

			this.socketTask.onMessage(res => {
				const msg = JSON.parse(res.data)
				console.log('收到 WebSocket消息', msg);
				const {
					type,
					data
				} = msg
				const page = this.getPage() // 当前页面栈实例对象

				switch (type) {
					case 'init': // 保存ClientId 并绑定user_id
						this.setData('clientId', data)
						// this.getData('userInfo') && this.request(this.API.USER_BIND, {
						// 	client_id: data
						// })
						// 新的clientId可能需要重新joinGroup
						page && page.$refs.guildComponent &&
							page.$refs.guildComponent.joinGroup && page.$refs.guildComponent.joinGroup()
						break;
					case 'chartMsg': // 偶像圈聊天
						page && page.$refs.guildComponent &&
							page.$refs.guildComponent.addChartMsg && page.$refs.guildComponent.addChartMsg(data)
						break;
					case 'sayworld': // 世界喊话
						this.danmakuQueue.push(data)
						break;
					case 'sendItem': // 送礼物
						page && page.$refs.guildComponent &&
							page.$refs.guildComponent.itemEffect && page.$refs.guildComponent.itemEffect(data)
						break;
					default:
						break;
				}
			})

			this.socketTask.onClose(res => {
				console.log('WebSocket 已关闭！', res);
				if (res.code == 1006) {
					// 重连
					// "abnormal closure"
					this.invokeSocket()
				}
				// reason : "interrupted" // 关屏中断"abnormal closure"
			})
		}
	},
	/**
	 * 关闭全屏loading
	 */
	closeLoading(page) {
		if (--page.requestCount <= 0) {
			page.$nextTick(function() {
				uni.stopPullDownRefresh()
				page.showLoading = false
			})
		}
	},
	/**分享*/
	commonShareAppMessage(shareType) {
		// 是否使用带 shareTicket 的转发详情
		uni.showShareMenu({
			withShareTicket: true
		});
		
		// -----默认配置
		// 默认跳转到首页
		let path = `/pages/index/index?referrer=${this.getData('userInfo').id}`
		if (this.getData('userStar').id) {
			// 从首页跳转到明星页
			path += `&starid=${this.getData('userStar').id}`
		}
		// 默认标题
		let title = this.getData('config').share_text
		// 默认使用明星分享海报，没有则使用默认
		let imageUrl = this.getData('userStar').share_img || this.getData('config').share_img

		// ----- 使用特殊的分享配置
		if (shareType) {
			const share = this.getData('config').share_cfg[shareType - 1]
			if (share) {
				if (share.title) title = share.title
				if (share.path) path += `&path=${share.path}`
				if (share.imageUrl) imageUrl = share.imageUrl
			}

			//--------------
			title = title.replace(/STARNAME/g, this.getData('userStar').name || '我们的')
		}
		console.log(path);
		return {
			title,
			path,
			imageUrl,
		}
	},

	/**
	 * 获取网络图片的本地路径
	 * @param {Object} src
	 * @param {Object} callback
	 */
	getLocalImg(src, callback) {
		if (~src.indexOf('http')) {
			// 获取网络图片地址
			uni.getImageInfo({
				src,
				success: res => {
					callback && callback(res.path)
				},
				fail: res => {
					console.error(res)
				}
			})
		} else {
			// 本地地址原样返回
			callback && callback(src)
		}
	},

	/**
	 * 绘制canvas海报
	 * @param {String} canvasId 要获取上下文的 canvas 组件 canvas-id 属性
	 * @param {Object} data 文字和图片数据
	 * @param {Function} callbcak 绘制结束的回调
	 */
	getCanvasImg(canvasId, data, callback) {
		uni.showLoading({
			title: "生成海报中"
		})
		let ctx = uni.createCanvasContext(canvasId, this);
		let rate = this.getData('sysInfo').windowWidth / 375 / 2
		// ---绘制图片---
		// 背景
		this.getLocalImg(data.img.bg, src => {
			ctx.drawImage(src, 0, 0, 480 * rate, 854 * rate);

			// 明星 
			this.getLocalImg(data.img.star, src => {
				ctx.drawImage(src, 48 * rate, 286 * rate, 382 * rate, 305 * rate);

				// 用户头像
				this.getLocalImg(data.img.avatar, src => {
					ctx.save() //保存当前的绘图上下文。
					ctx.beginPath() //开始创建一个路径
					ctx.arc(79 * rate, 784 * rate, 40 * rate, 0, 2 * Math.PI, false) //画一个圆形裁剪区域
					ctx.clip() //裁剪
					ctx.drawImage(src, 38 * rate, 744 * rate, 80 * rate, 80 * rate) //绘制图片
					ctx.restore() //恢复之前保存的绘图上下文

					// 二维码
					this.getLocalImg(data.img.qrcode, src => {
						ctx.save() //保存当前的绘图上下文。
						ctx.beginPath() //开始创建一个路径
						ctx.arc(400 * rate, 780 * rate, 50 * rate, 0, 2 * Math.PI, false) //画一个圆形裁剪区域
						ctx.clip() //裁剪
						ctx.drawImage(src, 350 * rate, 730 * rate, 100 * rate, 100 * rate);
						ctx.restore() //恢复之前保存的绘图上下文

						// ---绘制文字---
						ctx.setFillStyle('#FFFFFF') //文字颜色

						ctx.setFontSize(18) //设置字体大小，默认10
						ctx.setTextAlign('center')
						data.text.title[0] && ctx.fillText(data.text.title[0], 240 * rate, 200 * rate) //绘制文本
						data.text.title[1] && ctx.fillText(data.text.title[1], 240 * rate, 250 * rate) //绘制文本

						ctx.fillText(data.text.starname, 140 * rate, 632 * rate) //绘制文本

						ctx.setFontSize(10) //设置字体大小，默认10
						ctx.setTextAlign('left')
						ctx.fillText(`榜单排名:NO.${data.text.weekRank}`, 270 * rate, 616 * rate) //绘制文本
						ctx.fillText(`人气值:${data.text.weekHot}`, 270 * rate, 640 * rate) //绘制文本

						ctx.fillText(`我是${data.text.myname}`, 130 * rate, 774 * rate) //绘制文本
						ctx.fillText(`一起为${data.text.starname}打榜`, 130 * rate, 804 * rate) //绘制文本

						// ---最终绘制---
						ctx.draw(false, () => {
							uni.canvasToTempFilePath({
								canvasId,
								success: res => {
									uni.hideLoading()
									callback && callback(res.tempFilePath)
								}
							})
						})
					})
				})
			})
		})
	},

}

// 基础方法
export default {
	/**
	 * 基础HTTP请求
	 * @param String url 访问地址
	 * @param Object data 
	 * @param Function success 回调
	 * @param String method 
	 * @param Boolean block 是否堵塞请求
	 */
	request(url, data = {}, success, method = 'POST', block = false) {
		// 堵塞请求
		if (block) {
			if (this.isBlock) {
				this.toast("请稍后再试")
				return
			}
			this.isBlock = true
		}

		data.token = this.token || '' // 带上token
		data.platform = this.platform // 平台
		// 调试token
		// data.token = 'Y1J3S2l2OGw1eVhCcjNMVmRwWHNNVFU1TlRRd05qUXdPQ1l4TVRNdU1qUTNMakV4TXk0eU1EWW1NelV4TnpNNQ=='
		uni.request({
			url: ~url.indexOf('http') ? url : this.HTTP_URL + url,
			method,
			data,
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: res => {
				this.isBlock = false
				if (res.statusCode != 200) {
					// 请求报错
					this.toast('服务器正忙，请稍后再试')
				} else if (res.data.code == 200 || res.data.code == 201) {
					// 需要登录
					this.login(() => {
						this.request(url, data, success, method, block)
					})
				} else if (res.data.code != 0) {
					// 操作失败
					this.toast(res.data.msg)
				} else {
					// 操作成功
					success && success(res.data)
				}
			},
			fail: res => {
				console.error('请求失败！' + JSON.stringify(res))
			}
		});
	},
	/**
	 * 基础跳转
	 * @param String url 
	 */
	goPage(url) {
		// #ifdef H5
		if (~url.indexOf('http')) {
			location.href = url.slice(url.indexOf('http'))
			return
		}
		// #endif

		uni.navigateTo({
			url,
			fail() {
				uni.redirectTo({
					url,
					fail() {
						uni.switchTab({
							url,
							fail() {
								uni.reLaunch({
									url
								})
							}
						})
					}
				})
			}
		})
	},

	toast(content, icon = 'none', duration = 1500) {
		uni.showToast({
			title: content,
			icon,
			duration
		})
	},
	modal(content, callBack = false, confirmText = '确定') {
		uni.showModal({
			title: '提示',
			content,
			showCancel: Boolean(callBack),
			confirmText,
			success: res => {
				res.confirm && callBack && callBack()
			},
		});
	},
	// 复制
	copy(data) {
		uni.setClipboardData({
			data: data.toString(),
			success: () => this.toast('复制成功', 'success')
		});
	},
	/**获取元素节点信息 */
	getEle(dom, callBack) {
		//创建节点选择器
		var query = uni.createSelectorQuery();
		//选择id
		query.select(dom).boundingClientRect()
		query.exec(callBack)
	},
	preImg(img) {
		let imgPath = img
		if (typeof(img) == 'string') {
			imgPath = [img]
		}
		uni.previewImage({
			urls: imgPath
		});
	},
	// 设置全局变量
	setData(key, value) {
		this[key] = value
	
		uni.setStorage({
			key,
			data: value
		})
	},
	// 获取全局变量
	getData(key) {
		let value = this[key]
	
		if (value === undefined) {
			value = uni.getStorageSync(key)
			this[key] = value
		}
	
		return value
	},
	
	setVal(key, value) {
		this[key] = value
	},
	getVal(key) {
		return this[key]
	},

	/**
	 * 当前页面栈实例对象
	 */
	getPage() {
		return getCurrentPages()[getCurrentPages().length - 1] && getCurrentPages()[getCurrentPages().length - 1].$vm || null
	},

	/**
	 * 文件上传
	 * @param Array file 文件路径
	 */
	upload(file, callBack) {
		const url = this.HTTP_URL + 'upload'
		let realFile = []
		if (typeof file == 'string') {
			file = [file]
		}
		for (let i = 0; i < file.length; i++) {
			if (!file[i]) {
				file.splice(i, 1)
			} else {
				uni.uploadFile({
					url,
					filePath: file[i],
					name: 'file',
					success: res => {
						res = JSON.parse(res.data)

						realFile[i] = res.data.url
						if (realFile.length == file.length) {
							// 全部上传完成 返回数组
							callBack && callBack(realFile)
						}
					}
				});
			}
		}

	},
	// 打开视频广告
	openVideoAd(success, kindness = 1) {
		const page = this.getPage()
		let adUnitId
		if (this.platform == 'MP-WEIXIN') {
			adUnitId = this.adUnitId
		} else if (this.platform == 'MP-QQ') {
			adUnitId = this.qq_adUnitId
		} else {
			this.toast('没有广告')
			return
		}
		// 创建视频广告
		if (!page.videoAd) {
			uni.showLoading({
				title: "请稍等..."
			})
			page.videoAd = wx.createRewardedVideoAd({
				adUnitId
			})
	
			page.videoAd.onClose(status => {
				if (status && status.isEnded || status === undefined) {
					// 可领奖励
					success && success()
				} else {
					this.toast('观看完视频才有奖励哦')
				}
			})
	
			page.videoAd.onError(err => {
				this.toast("抱歉，暂无合适的广告")
				console.error('视频广告播放错误', err)
				// 看不了广告也给奖励
				kindness==1 && success && success()
			})
			uni.hideLoading()
		}
		// 打开
		page.videoAd.show().catch(err => {
			// 失败重试
			page.videoAd.load().then(() => {
				page.videoAd.show().catch(err => {
					this.toast('视频广告创建失败')
				})
			})
		})
	},
	// 初始化视频广告
	initVideoAd(success) {
		if (wx.createRewardedVideoAd) {
			this.videoAd = wx.createRewardedVideoAd({
				adUnitId: this.adUnitId
			})

			this.videoAd.onClose(status => {
				if (status && status.isEnded || status === undefined) {
					// 可领奖励
					success && success()
				} else {
					this.toast('观看完视频才有奖励哦')
				}
			})

			this.videoAd.onError(err => {
				this.toast('抱歉，暂无合适的广告')
				console.error('视频广告播放错误', err)
			})
		}
	},
	//插屏广告
	openInterstitialAd() {
		const page = this.getPage()
		let adUnitId
		if (this.platform == 'MP-WEIXIN') {
			adUnitId = this.interstitialAd_adUnitId
		} else if (this.platform == 'MP-QQ') {
			adUnitId = this.qq_interstitialAd_adUnitId
		}
		if (!page.interstitialAd) {
			page.interstitialAd = uni.createInterstitialAd({
				adUnitId
			})
		}
	
		if (page.interstitialAd) {
			page.interstitialAd.show().catch(err => {
				console.log(err)
			})
		} else {
			console.error('插屏广告创建失败')
		}
	
	}
}

// 扩展方法
export default {
	/**登录 */
	login(callBack) {
		// #ifndef H5
		uni.login({
			success: res => {
				const sendData = {
					platform: this.getData('sysInfo')['platform'],
					model: this.getData('sysInfo')['model'],
				}
				// #ifdef APP-PLUS
				sendData['unionid'] = res.authResult && res.authResult.unionid
				// #endif
				// #ifdef MP-WEIXIN
				sendData['js_code'] = res.code
				// #endif

				this.request(this.API.AUTH_LOGIN, sendData, res => {
					this.setData('token', res.data.token)
					callBack && callBack()
				})
			},
		});
		// #endif
		// #ifdef H5
		this.goPage('/pages/user/login/login')
		// #endif
	},
	/**检查更新 */
	checkUpdate() {
		// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO
		const updateManager = uni.getUpdateManager();

		updateManager.onCheckForUpdate(function(res) {
			// 请求完新版本信息的回调
			console.log(res.hasUpdate);
		});

		updateManager.onUpdateReady(function(res) {
			uni.showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否重启应用？',
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

	initSocket() {
		this.socketTask = uni.connectSocket({
			url: this.WSS_URL,
			success: res => {
				console.log('WebSocket 连接成功！', res);
			}
		})

		this.socketTask.onMessage(res => {
			const msg = JSON.parse(res.data)
			console.log('收到 WebSocket消息', msg);
			const type = msg.type
			const data = msg.data
			const page = this.getPage() // 当前页面栈实例对象

			switch (type) {
				case 'init': // 保存ClientId 并绑定user_id
					this.setData('clientId', data)
					this.getData('userInfo') && this.request(this.API.USER_BIND, {
						client_id: data
					})
					// 新的clientId可能需要重新joinGroup
					page && page.$refs.guildComponent && page.$refs.guildComponent.joinGroup()
					break;
				case 'chartMsg': // 圈子聊天
					page && page.$refs.guildComponent && page.$refs.guildComponent.addChartMsg(data)
					break;
				case 'sayworld': // 世界喊话
					page && page.$refs.guildComponent && page.$refs.guildComponent.addDanmaku(data)
					break;
				default:
					break;
			}
		})

		this.socketTask.onClose(res => {
			console.log('WebSocket 已关闭！', res);
			this.initSocket()
		})
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

	commonShareAppMessage() {
		return {
			title: '测试',
			path: '/pages/index/index?referrer=' + this.getData('userInfo')['id']
		}
	}
}

// 基础方法
export default {
	/**
	 * 基础HTTP请求
	 * @param String url 访问地址
	 * @param Object data 
	 * @param Function success
	 * @param String method 
	 * @param Boolean block 是否堵塞请求
	 */
	request(url, data = {}, success, method = 'POST', block = false) {
		// 堵塞请求
		if (block && this.isBlock) {
			this.toast('点太快了，请稍后再试')
			return
		}

		data.token = this.getData('token') // 带上token
		this.isBlock = true;
		console.log('url', url);
		uni.request({
			url: url.indexOf('https://') != -1 ? url : this.HTTP_URL + url,
			method,
			data,
			header: {
				"content-type": "application/x-www-form-urlencoded"
			},
			success: res => {
				this.isBlock = false
				if (res.statusCode != 200) {
					// 请求失败
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
			}
		});
	},
	/**
	 * 基础跳转
	 * @param String url 
	 */
	goPage(url) {
		// let url = url+
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
	modal(content, callBack) {
		uni.showModal({
			title: '提示',
			content,
			success: res => {
				res.confirm && callBack && callBack()
			},
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

	setData(key, value) {
		uni.setStorageSync(key, value)
	},
	getData(key) {
		return uni.getStorageSync(key)
	},

	/**
	 * 格式化时间
	 */
	timeGethms(time) {
		var time = parseInt(time)

		var hour = Math.floor(time / 3600)
		if (hour < 10) hour = '0' + hour
		var min = Math.floor(time % 3600 / 60)
		if (min < 10) min = '0' + min
		var sec = Math.floor(time % 3600 % 60)
		if (sec < 10) sec = '0' + sec

		return {
			hour: parseInt(hour),
			min: parseInt(min),
			sec: parseInt(sec),
			str: hour + ':' + min + ':' + sec
		}
	},

	strToTime(str) {
		return Math.round(new Date(str).getTime() / 1000)
	},
	/** 数字千分号*/
	formatNumberRgx(num) {
		var parts = num.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return parts.join(".");
	},

	/**
	 * 数字转为万单位
	 */
	formatWan(num, fix = 0) {
		if (num / 100000000 >= 1) {
			return (num / 100000000).toFixed(fix) + '亿'
		} else if (num / 10000 >= 1)
			return (num / 10000).toFixed(fix) + '万'
		else {
			return num;
		}
	},

	getWeek() {
		const time = new Date()
		const Monday = time.getDate() - time.getDay() + 1
		const Sunday = time.setDate(time.getDate() + 6)
		return [Monday, Sunday]
	},

	/**
	 * 当前页面栈实例对象
	 */
	getPage() {
		return getCurrentPages()[getCurrentPages().length - 1] && getCurrentPages()[getCurrentPages().length - 1].$vm || null
	},

}

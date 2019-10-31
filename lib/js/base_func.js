/**
 * JS通用方法
 */
export default {

	/**
	 * 获取随机数
	 * @param {Object} min
	 * @param {Object} max
	 */
	getRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	},
	/**
	 * 当前时间戳
	 */
	getTime() {
		return Math.round(new Date().getTime() / 1000)
	},
	/**
	 * 判空函数
	 * @param {Object} value
	 */
	isEmpty(value) {
		if (!value) return true
		if (typeof(value) === 'object' && !Object.keys(value).length) return true
		return false
	},
	/**
	 * 格式化时间
	 */
	timeGethms(time) {
		var time = parseInt(time)

		var day = Math.floor(time / 3600 / 24)
		time -= day * 3600 * 24
		if (day < 10) day = '0' + day

		var hour = Math.floor(time / 3600)
		time -= hour * 3600
		if (hour < 10) hour = '0' + hour

		var min = Math.floor(time / 60)
		time -= min * 60
		if (min < 10) min = '0' + min

		var sec = time
		if (sec < 10) sec = '0' + sec

		return {
			day: parseInt(day),
			hour: parseInt(hour),
			min: parseInt(min),
			sec: parseInt(sec),
			str: hour + ':' + min + ':' + sec
		}
	},
	// 时间字符串转时间戳
	strToTime(str) {
		str = str.replace(' ', 'T')
		return Math.round((new Date(str)).getTime() / 1000)
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
	 * 获取url参数
	 */
	getQueryString(name) {
		var queryStr = location.href.split('?')[1]
		if (!queryStr) return
		var vars = queryStr.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if (pair[0] == name) {
				return decodeURIComponent(pair[1]);
			}
		}
		return
	},

}

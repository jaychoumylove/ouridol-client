<template>
	<view class="count-to-container">
		<text>{{$app.formatNumberRgx(value)}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			// 传入的值
			count: {
				default: 0
			}
		},
		data() {
			return {
				// 显示的值
				value: 0,
			}
		},
		watch: {
			// 传入的值发生改变
			count(val) {
				val = parseInt(val.replace(/,/g, ''))
				let step = Math.floor((val - this.value) / 30)
				clearInterval(this.timeId)
				this.timeId = setInterval(() => {
					if (step >= val - this.value) {
						clearInterval(this.timeId)
						this.value = val
					} else {
						this.value += ++step
					}
				}, 30)

			}
		}
	}
</script>

<style lang="scss" scoped>

</style>

<template>
	<view class="number-grow-warp">
		<text :data-time="time" class="number-grow" :data-value="value">{{count}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			time: {
				type: Number,
				default: 2
			},
			value: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				values: 0,
				count:0,
			}
		},
		watch: {
			value(val) {
				if (val > 0) {
					this.values = val;
					this.numberGrow()
				}
			}
		},
		methods: {
			
		},
	}
</script>

<style lang="scss" scoped>
	
</style>

<template>
	<view class="badge" :style="{padding:sizeComputed}" :class="{circle:!numComputed}">{{numComputed}}</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			num: {
				default: ''
			},
			size: {
				default: 10
			}
		},
		computed: {
			numComputed() {
				return this.num <= 999 ? this.num : '999+'
			},
			sizeComputed(){
				return uni.upx2px(this.size) + "px"
			}
		}

	}
</script>

<style lang="scss" scoped>
	.badge {
		border-radius: 30upx;
		background-color: #f00;
		position: absolute;
		top: 0;
		right: 0;
		color: #fff;
		font-size: 20upx;
		line-height: 1.5;
		transform: translate(50%, -50%);
	}

	.badge.circle {
		border-radius: 50%;
	}
</style>

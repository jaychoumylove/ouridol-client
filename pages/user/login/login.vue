<template>
	<view class="container flex-set">
		<view class="avatar">
			<image :src="userInfo.avatarurl || $app.AVATAR" mode="aspectFill"></image>
		</view>
		<view class="nickname">
			{{userInfo.nickname || $app.NICKNAME}}
		</view>
		<btnComponent type="css">
			<view class="flex-set" style="width: 160upx;height: 80upx;">
				确认登录
			</view>
		</btnComponent>
	</view>
</template>

<script>
	import btnComponent from '@/components/btnComponent.vue';

	export default {
		components: {
			btnComponent
		},
		data() {
			return {
				userInfo: {}
			};
		},
		onLoad() {
			if (!this.userInfo.nickname) {
				let timeId = setInterval(() => {
					if (this.$app.getData('userInfo')) {
						clearInterval(timeId)
						this.userInfo = this.$app.getData('userInfo')
					}
				}, 300)
			}
		},

	}
</script>

<style lang="scss" scoped>
	.container {
		flex-direction: column;
		height: 100%;

		.avatar {
			width: 120upx;
			height: 120upx;
			border-radius: 50%;
		}
	}
</style>

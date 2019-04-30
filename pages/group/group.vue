<template>
	<guildComponent ref="guildComponent"></guildComponent>
</template>

<script>
	import guildComponent from '@/components/guildComponent.vue'
	export default {
		components: {
			guildComponent,
		},
		data() {
			return {};
		},
		onLoad() {},
		onShow() {
			const starid = this.$app.getData('userStar')['id']
			if (!starid) {
				uni.showModal({
					title: '提示',
					content: '你还没有加入圈子',
					confirmText: '去加圈子',
					showCancel: false,
					success: res => {
						if (res.confirm) {
							this.$app.goPage('/pages/index/index')
						}
					}
				});
				return
			}

			this.$refs.guildComponent.load(starid)
		},
		onShareAppMessage() {
			return this.$app.commonShareAppMessage()
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>

</style>

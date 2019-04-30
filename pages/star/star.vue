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
		onShareAppMessage() {
			return this.$app.commonShareAppMessage()
		},
		onLoad(option) {
			this.$refs.guildComponent.load(option.starid)
		},
		onShow() {},
		methods: {}
	}
</script>

<style lang="scss" scoped>

</style>

<template>
	<view class="star-container">
		<guildComponent ref="guildComponent"></guildComponent>
		<view v-if="tips" class="tips-container" @tap="tips=false">
			<image src="/static/image/star/blank.png" mode="widthFix"></image>
		</view>
	</view>

</template>

<script>
	import guildComponent from '@/components/guildComponent.vue'
	export default {
		components: {
			guildComponent,
		},
		data() {
			return {
				tips: false,
			};
		},
		onShareAppMessage() {
			return this.$app.commonShareAppMessage()
		},
		onLoad(option) {
			this.starid = option.starid
			if (this.starid == this.$app.getData('userStar', true).id) {
				this.$app.goPage('/pages/group/group')
			}
		},
		onReady() {},
		onShow() {
			if (!this.$app.getData('userStar', true).id) this.tips = true
			this.$refs.guildComponent.load(this.starid)
		},
		onUnload() {
			this.$refs.guildComponent.unLoad(this.starid)
			this.$refs.guildComponent.modal = ''

		},
		
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.star-container {
		position: relative;
		height: 100%;

		.tips-container {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(#000, 0.8);
			z-index: 3;

			image {
				width: 100%;
				position: absolute;
				top: -20upx;
				right: -14upx;
			}
		}
	}
</style>

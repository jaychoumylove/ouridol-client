<template>
	<view class="star-container">
		<guildComponent ref="guildComponent"></guildComponent>
		<button open-type="getUserInfo" @getuserinfo="getUserInfo">
			<view v-if="tips" class="tips-container">
				<image src="/static/image/star/blank-3.png" mode="widthFix"></image>
			</view>
		</button>
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
			if (this.starid == this.$app.getData('userStar').id) {
				this.$app.goPage('/pages/group/group')
			}
		},
		onReady() {},
		onShow() {
			if (!this.$app.getData('userStar').id) this.tips = true
			this.$refs.guildComponent.load(this.starid)
		},
		onUnload() {
			this.$refs.guildComponent.unLoad(this.starid)
			this.$refs.guildComponent.modal = ''

		},

		methods: {
			getUserInfo(e) {
				const userInfo = e.detail.userInfo
				if (userInfo) {
					this.tips = false
					if (!this.$app.getData('userInfo').nickname) {

						this.$app.request(this.$app.API.USER_SAVEINFO, {
							iv: e.detail.iv,
							encryptedData: e.detail.encryptedData,
						}, res => {
							this.$app.request(this.$app.API.USER_INFO, {}, res => {
								this.$app.setData('userInfo', res.data, true)

							})
						}, 'POST', true)
					}
				}

			}
		}
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
			}
		}
	}
</style>

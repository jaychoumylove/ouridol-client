<template>
	<swiper class='banner-wrapper' :style='{height:bannerHeightComputed}' indicator-dots="false" circular="true" autoplay="true">
		<swiper-item v-for="item in bannerList" :key='item.img' @click="goPage(item.url)" class="banner-item">
			<image class='banner-item-img' :src="item.img" mode="aspectFill"></image>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		data() {
			return {
				bannerList: []
			};
		},
		props: {
			bannerHeight: {
				default: "300"
			},
			bannerType: {
				default: '0'
			},
		},
		created() {
			this.$app.request(this.$app.API.BANNER_LIST, {}, res => {
				const bannerList = []
				for (let v of res.data) {
					bannerList.push({
						img: v.img_url,
						url: v.gopage,
					})
				}
				
				this.bannerList = bannerList
			})
		},

		computed: {
			bannerHeightComputed() {
				return uni.upx2px(this.bannerHeight) + 'px';
			}
		},
		methods: {
			goPage(url) {
				this.$app.goPage(url)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.banner-wrapper {
		border-radius: 10upx;
		overflow: hidden;
		.banner-item-img{
			border-radius: 10upx;

		}
	}
</style>

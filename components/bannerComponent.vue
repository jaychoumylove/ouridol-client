<template>
	<swiper :previous-margin="muti?'30px':''" :next-margin="muti?'30px':''" class='banner-wrapper'
	 :class="{muti:muti}" :style='{height:bannerHeightComputed}' circular="true" autoplay="true">
		<swiper-item v-for="(item,index) in bannerList" :key='index' @click="goPage(item.url)" class="banner-item">
			<image class='banner-item-img' :src="item.img" mode="aspectFill"></image>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		data() {
			return {
				bannerList: [],
				muti:false,
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
				if (this.bannerList.length > 1) {
					this.muti = true
				}
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

		.banner-item-img {
			border-radius: 10upx;
		}

	}

	.banner-wrapper.muti {
		margin:0 -20upx;
		padding: 18upx 0;
		.banner-item-img {
			transform: scale(0.95);
		}

	}
</style>

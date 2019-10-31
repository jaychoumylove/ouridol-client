<template>
	<view class="swiper-container">
		<swiper :previous-margin="muti?'30px':''" :next-margin="muti?'30px':''" class='banner-wrapper' :class="{muti:muti}"
		 :style='{height:bannerHeightComputed}' circular="true" autoplay="true">
			<swiper-item v-for="(item,index) in bannerList" :key='index' @click="goPage(item.url)" class="banner-item">
				<image class='banner-item-img' :src="item.img" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<swiper class="small" :class="{muti:!muti}" autoplay interval="3000" vertical circular>
			<swiper-item class="swiper-item" v-for="(item,index) in sList" :key='index' @tap="goPage(item.page)">
				<view class="item">
					<image src="/static/image/index/laba.png" class="icon" mode=""></image>
					<view class="text text-overflow">{{item.name}}</view>
				</view>
			</swiper-item>

		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		props: {
			bannerHeight: {
				default: "300"
			},
			bannerType: {
				default: '0'
			},
			bannerList: {
				default: [],
			},
			sList: {
				default: []
			},
			muti: {
				default: false,
			}
		},
		computed: {
			bannerHeightComputed() {
				return uni.upx2px(this.bannerHeight) + 'px';
			}
		},
		methods: {
			goPage(url) {
				if (url == '/pages/subPages/fanclub_list/fanclub_list' && !this.$app.getData('userStar').id) {
					this.$app.toast('请先加入一个圈子')
					return
				}
				this.$app.goPage(url)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-container {
		position: relative;

		.banner-wrapper {
			border-radius: 10upx;
			overflow: hidden;

			.banner-item-img {
				border-radius: 10upx;
				width: 100%;
				height: 100%;
			}

		}

		.banner-wrapper.muti {
			margin: 0 -20upx;
			padding: 18upx 0;

			.banner-item-img {
				transform: scale(0.95);
			}

		}

		.small {
			width: 90%;
			position: absolute;
			bottom: 25upx;
			left: 75upx;
			height: 40upx;

			.swiper-item {
				display: flex;
				align-items: center;

				.item {
					font-size: 24upx;
					background-color: rgba(#000, 0.6);
					border-radius: 30upx;
					color: #FFF;
					padding: 0 10upx;
					display: flex;
					align-items: center;

					.icon {
						width: 24upx;
						height: 24upx;
						margin: 0 6upx;
					}

					.text {
						flex: 1;
					}

				}
			}
		}

		.small.muti {
			bottom: 5upx;
			left: 29upx;
		}
	}
</style>

<template>
	<view class="container">
		<web-view :src="webview" v-if="webview"></web-view>
		<block v-else v-for="(item,index) in article" :key="index">
			<view class="article-title" v-if="item.title">{{item.title}}</view>
			<text class="article-content" decode v-if="item.content.length>0" v-for="(item1,index1) in item.content" :key="index1">{{item1}}</text>
			<image class="article-image" v-if="item.image" :src="item.image" mode="widthFix"></image>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article: [],
				webview: '',
			};
		},
		onLoad(option) {
			if (option.url) {
				this.webview = option.url
			} else if (option.id) {
				this.getArticle(option.id)
			}
		},
		methods: {
			getArticle(id) {
				this.$app.request(this.$app.API.ARTICLE, {
					id
				}, res => {

					try {
						this.article = JSON.parse(res.data.value)
					} catch (e) {
						this.webview = res.data.value
					}

					uni.setNavigationBarTitle({
						title: res.data.name
					});
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20upx 40upx;
	}
</style>

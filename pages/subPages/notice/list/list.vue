<template>
	<view class="container">
		

		<view class="item-wrapper" :class="{top:item.isTop}" v-for="(item,index) in articleList" :key="index" @tap="goArticle(item.id)">
			<view class="left text-overflow">{{item.title}}{{item.isTop?'[置顶]':''}}
				<image v-if="item.isNew" src="/static/image/user/new.png" mode="widthFix"></image>
			</view>
			<view class="right">{{item.isTop?'':item.time}}</view>
			
		</view>
	</view>
</template>

<script>
	import listItemComponent from '@/components/listItemComponent.vue'
	export default {
		components: {
			listItemComponent,
		},
		data() {
			return {
				requestCount: 1,

				articleList: [],
			};
		},
		onLoad() {
			this.getArticleList()
		},
		methods: {
			goArticle(id) {
				this.$app.goPage('/pages/notice/notice?id=' + id)
			},
			getArticleList() {
				this.$app.request(this.$app.API.ARTICLE_LIST, {}, res => {

					const resList = []
					for (let v of res.data) {
						resList.push({
							id: v.id,
							isTop: v.is_top,
							title: v.name,
							time: v.create_time.slice(0, 11),
							isNew: Date.now() / 1000 - this.$app.strToTime(v.create_time) < 3 * 24 * 3600
						})
					}
					this.articleList = resList
					this.$app.closeLoading(this)
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.container {

		.item-wrapper {
			background: url(http://wx4.sinaimg.cn/large/0060lm7Tly1g2qaiukofkg30kc02t744.gif) left center no-repeat/contain;
			padding: 15upx 0;
			margin: 10upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;

			height: 110upx;

			.left {
				margin-left: 40upx;
				font-size: 32upx;
				width: 450upx;
				
				image{
					width: 50upx;
					margin-top: -15upx;
				}
			}

			.right {
				margin-right: 30upx;
				margin-top: -36upx;
			}
		}
		
		.item-wrapper.top{
			background: url(http://wx3.sinaimg.cn/large/0060lm7Tly1g2smboymitg30f002twea.gif) left center no-repeat/contain;
		}
	}
</style>

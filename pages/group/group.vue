<template>
	<view class="group-container">
		
		<view class="top-bg-container">
			<view :style="'height:'+header+';width:100%;'"></view>
			<view class="index-avurl">
				偶像圈
			</view>
		</view>

		<guildComponent v-if="starid" ref="guildComponent"></guildComponent>
		<view v-else class="blank-container">

			<view v-if="!blankHide" class="blank flex-set">
				<image src="/static/image/user/blank.png" mode="widthFix"></image>
				<view>亲！您还没有加入任何偶像圈！</view>
				<view>搜索爱豆名字，点头像加入！</view>
			</view>

			<view v-else class="select-container">

				<view class="search-wrapper">
					<input type="text" value="" placeholder="搜索爱豆" placeholder-style="color:#8181A7; font-size: 24rpx " @input="searchInput" />
				</view>

				<scroll-view scroll-x>
					<view class="starlist-wrapper">
						<view class="item" v-for="(item,index) in rankList" v-if="index<50" :key="index" @tap="goPage(item.starid)">
							<image :src="item.avatar" mode="aspectFill"></image>
							<view class="name text-overflow">{{item.name}}</view>
						</view>
					</view>
					<view class="starlist-wrapper">
						<view class="item" v-for="(item,index) in rankList" :key="index" v-if="index>=50" @tap="goPage(item.starid)">
							<image :src="item.avatar" mode="aspectFill"></image>
							<view class="name text-overflow">{{item.name}}</view>
						</view>
					</view>
				</scroll-view>

				<view class="blank-bottom flex-set">
					<image src="/static/image/user/blank.png" mode="aspectFill"></image>
					<view>亲！您还没有加入任何偶像圈！</view>
					<view>搜索爱豆名字，点头像加入！</view>
				</view>

			</view>

		</view>
	</view>
</template>

<script>
	import guildComponent from '@/components/guildComponent.vue'
	export default {
		components: {
			guildComponent
		},
		data() {
			return {
				starid: this.$app.getData('userStar')['id'] || null,
				header: '',
				requestCount: 1,
				blankHide: true,
				rankList: this.$app.getData('group_rankList') || [],
				keywords: '',
				page: 1,

				share: {},
			};
		},
		onLoad() {},
		onShow() {
			this.header = uni.getSystemInfoSync()['statusBarHeight'] + 'px'
			this.starid = this.$app.getData('userStar')['id'] || null
			if (this.starid) {
				this.$nextTick(function() {
					this.$refs.guildComponent.load(this.starid)
				})
			} else {
				setTimeout(() => {
					this.blankHide = true
				}, 2000)

				this.getRankList()
			}

		},
		onHide() {
			if (this.starid) {
				this.$refs.guildComponent.unLoad && this.$refs.guildComponent.unLoad(this.starid)
				// this.$refs.guildComponent.modal = ''
			}
		},
		 onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			const otherparam = e.target && e.target.dataset.otherparam
			return this.$app.commonShareAppMessage(shareType,otherparam)
		},
		methods: {
			goPage(id) {
				this.$app.goPage('/pages/subPages/star/star?starid=' + id)
			},
			searchInput(e) {
				this.page = 1
				this.keywords = e.detail.value
				this.getRankList()
			},
			getRankList() {
				this.$app.request(this.$app.API.STAR_RANK, {
					page: this.page,
					size: 100,
					keywords: this.keywords,
				}, res => {
					const resList = []
					res.data.forEach(e => {
						const item = {}
						item.starid = e.star.id
						item.name = e.star.name
						item.avatar = e.star.head_img_s ? e.star.head_img_s : e.star.head_img_l
						resList.push(item)
					})
					if (this.page == 1) {
						this.rankList = resList
					} else {
						this.rankList = this.rankList.concat(resList)
					}

					this.$app.setData('group_rankList', this.rankList)
					this.$nextTick(function() {
						this.scrollLeft = 0
					});
					this.$app.closeLoading(this)
				})

			},
		}
	}
</script>

<style lang="scss" scoped>
	.group-container {
		height: 100%;
		background-image: url(https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FmibDk8LrMNNib025upafEqqhEUGibBibYVXfsFS2GOqq8XDoBzgib1He6p3OSpwDCuhuMzMxa3yXp4icA/0);
		background-size: 100% 100%;
		
		.top-bg-container {
			width: 100%;
			
			.top-bg{
				width: 100%; 
			}
			
			.index-avurl {
				padding: 0 40rpx;
				height: 80rpx;
				font-size: 32rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;
			}
		}

		.blank-container {
			height: 100%;

			.blank {
				background: rgba(#000, 0.9);
				font-size: 34upx;
				color: #FFF;
				height: 100%;
				flex-direction: column;

				image {
					width: 150upx;
					margin-bottom: 20upx;
				}
			}

			.select-container {
				display: flex;
				flex-direction: column;
				height: 100%;

				.search-wrapper {
					display: flex;
					justify-content: center;

					input {
						height: 70upx;
						width: 400upx;
						background-color: $text-color-11;
						border-radius: 60upx;
						padding: 10upx 20upx;
						margin: 20upx;
						position: relative;
						text-align: center;
						color: $text-color-2;
					}

					input::after {
						content: "\e63d";
						position: absolute;
						right: 20upx;
						top: 50%;
						transform: translateY(-50%);
						font-family: "iconfont" !important;
						font-size: 40upx;
					}
				}

				scroll-view {
					width: 100%;
					border-bottom: 1px solid $text-color-8;
				}

				.starlist-wrapper {
					display: flex;
					flex-wrap: nowrap;
					padding: 10upx 0;

					.item {

						display: flex;
						flex-direction: column;
						align-items: center;

						margin: 10upx;

						image {
							width: 120upx;
							height: 120upx;
							border-radius: 50%;
						}

						.name {
							color: $text-color-7;
							text-align: center;
							width: 100upx;
						}
					}
				}

				.blank-bottom {
					flex: 1;
					font-size: 30upx;
					display: flex;
					flex-direction: column;
					color: $text-color-8;

					image {
						width: 120upx;
						height: 120upx;
						margin-bottom: 20upx;
					}
				}
			}


		}
	}
</style>

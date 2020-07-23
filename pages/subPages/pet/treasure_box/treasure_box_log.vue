<!-- 个人明细 -->
<template>
	<view class="log-container">
		<scroll-view @scrolltolower="logPage++;getLog();" class="scroll-view" scroll-y>

			<view class="item" v-for="(item,index) in logList" :key="index">
				<view class="left-content">
					<view class="content ">
						<view class="top">获得:<text style="color: #F75A73; font-weight: bold;">[{{item.content}}]</text></view>
						<view class="bottom">{{item.create_time}}</view>
					</view>
				</view>

				<view class="right-content">
					<view class="right-item" v-if="item.count">
						<image :src="item.imgsrc" mode="widthFix"></image>
						<view class="add-count add" v-if="item.count > 0"><text style="color: #F75A73; font-weight: bold;">+{{item.count}}</text></view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				logList: [],
				logPage: 1,
			};
		},
		onLoad() {
			this.getLog()
		},
		methods: {
			getLog() {
				this.$app.request(this.$app.API.TREASURE_BOX_LOG, {
					page: this.logPage
				}, res => {
					const resList = []
					for (let v of res.data) {
						let content = v.treasure_box && v.treasure_box.prizeName  || ""

						resList.push({
							content: content,
							imgsrc: v.treasure_box.imgsrc,
							count: v.count,
							create_time: v.create_time.slice(5)
						})
					}

					if (this.logPage == 1) {
						this.logList = resList
					} else {
						this.logList = this.logList.concat(resList)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.log-container {
		height: 100%;

		.scroll-view {
			height: 100%;

			.item {
				margin: 20upx;
				background-color: rgba(#FFF, 0.3);
				display: flex;
				padding: 10upx 40upx;
				justify-content: space-between;
				align-items: center;
				border-radius: 60upx;

				.left-content {
					display: flex;

					.img {
						width: 80upx;
						height: 80upx;
						border-radius: 50%;
					}

					.content {
						margin-left: 20upx;

						.bottom {
							font-size: 24upx;
							color: #888;
						}
					}
				}

				.right-content {
					display: flex;

					.right-item {
						display: flex;
						align-items: center;
					
						image {
							width: 80upx;
						}
					
					}

				}

			}
		}
	}
</style>

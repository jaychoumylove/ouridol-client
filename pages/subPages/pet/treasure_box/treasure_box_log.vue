<!-- 个人明细 -->
<template>
	<view class="log-container">
		<scroll-view @scrolltolower="logPage++;getLog();" class="scroll-view" scroll-y>

			<view class="item" v-for="(item,index) in logList" :key="index">
				<view class="left-content">
					<view class="content">
						<view class="top" v-if="item.help_user_info"><text style="color: #aa89bd; font-weight: bold;">{{item.help_user_info.nickname}}</text>帮我开出了<text style="color: #F75A73; font-weight: bold;">[{{item.content}}]</text></view>
						<view class="top" v-else-if="item.helped_user_info">我帮<text style="color: #aa89bd; font-weight: bold;">{{item.helped_user_info.nickname}}</text>开出了<text style="color: #F75A73; font-weight: bold;">[{{item.content}}]</text></view>
						<view class="top" v-else>我开出了<text style="color: #F75A73; font-weight: bold;">[{{item.content}}]</text></view>
						<view class="bottom">{{item.create_time}}</view>
					</view>
				</view>

				<view class="right-content">
					<view class="right-item" v-if="item.count">
						<image v-if="item.type!=0" style="width: 40rpx;" :src="item.imgsrc" mode="widthFix"></image>
						<image v-if="item.type==0" :src="item.imgsrc" mode="widthFix"></image>
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
							help_user_id: v.help_user_id,
							help_user_info: v.help_user_info,
							helped_user_info: v.helped_user_info,
							create_time: v.create_time.slice(5),
							type: v.type
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
				border-bottom: 1rpx solid $text-color-10;
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
						.top{
							width: 400rpx;
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
						}
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

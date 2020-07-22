<!-- 个人明细 -->
<template>
	<view class="log-container">
		<scroll-view @scrolltolower="logPage++;getLog();" class="scroll-view" scroll-y>

			<view class="item" v-for="(item,index) in logList" :key="index">
				<view class="left-content">
					<view class="content ">
						<view class="top">{{item.content}}</view>
						<view class="bottom">{{item.create_time}}</view>
					</view>
				</view>

				<view class="right-content">
					<view class="earn">
						<view class="right-item" v-if="item.coin">
							<image src="/static/image/user/b1.png" mode="widthFix"></image>
							<view class="add-count add" v-if="item.coin > 0">+{{item.coin}}</view>
							<view class="add-count" v-else>{{item.coin}}</view>
						</view>
						<view class="right-item" v-if="item.stone">
							<image src="/static/image/user/b2.png" mode="widthFix"></image>
							<view class="add-count add" v-if="item.stone > 0">+{{item.stone}}</view>
							<view class="add-count" v-else>{{item.stone}}</view>
						</view>
						<view class="right-item" v-if="item.trumpet">
							<image src="/static/image/user/b3.png" mode="widthFix"></image>
							<view class="add-count add" v-if="item.trumpet > 0">+{{item.trumpet}}</view>
							<view class="add-count" v-else>{{item.trumpet}}</view>
						</view>

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
				this.$app.request(this.$app.API.LOG, {
					page: this.logPage
				}, res => {
					const resList = []
					for (let v of res.data) {
						let content = v.type && (v.content?v.content:v.type.content)  || ""
						let star = v.target_star && v.target_star.name || ""
						let user = v.target_user && v.target_user.nickname || ""
						content = content.replace(/STAR/g, '【' + star + '】')
						content = content.replace(/USER/g, '【' + user + '】')

						resList.push({
							content: content,
							stone: v.stone,
							trumpet: v.trumpet,
							coin: v.coin,
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
				padding: 20upx 40upx;
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

					.earn {
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						align-items: flex-start;
						margin-right: 30upx;
						width: 100upx;

						.right-item {
							display: flex;
							align-items: center;

							image {
								width: 40upx;
							}

						}
					}

				}

			}
		}
	}
</style>

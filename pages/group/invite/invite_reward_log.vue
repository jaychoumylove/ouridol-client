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
						<view class="right-item" v-if="item.reward.coin">
							<image src="/static/image/user/b1.png" mode="widthFix"></image>
							<view class="add-count add">+{{item.reward.coin}}</view>
						</view>
						<view class="right-item" v-if="item.reward.stone">
							<image src="/static/image/user/b2.png" mode="widthFix"></image>
							<view class="add-count add">+{{item.reward.stone}}</view>
						</view>
						<view class="right-item" v-if="item.reward.trumpet">
							<image src="/static/image/user/b3.png" mode="widthFix"></image>
							<view class="add-count add">+{{item.reward.trumpet}}</view>
						</view>
						<view class="right-item" v-if="item.reward.prop>0">
							<image style="width: 60rpx;" :src="item.reward.prop_img" mode="widthFix"></image>
							<view class="add-count add">+1</view>
						</view>
						<view class="right-item" v-if="item.energy">
							<image src="/static/image/user/electricity.png" mode="widthFix"></image>
							<view class="add-count add">+{{item.energy}}</view>
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
		onLoad(option) {
			this.getLog(option.type)
		},
		methods: {
			getLog(type) {
				let url;
				if(type == 'reward'){
					url = this.$app.API.INVIT_REWARD_LOG;
				}else{
					url = this.$app.API.INVIT_USER_LOG;
				}
				this.$app.request(url, {
					page: this.logPage
				}, res => {

					if (this.logPage == 1) {
						this.logList = res.data
					} else {
						this.logList = this.logList.concat(res.data)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
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

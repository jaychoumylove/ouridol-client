<template>
	<view class="signin-container">

		<view class="main-container">
			<view class="top-container flex-set">
				<image class="top-img" src="/static/image/guild/card-c.png" mode=""></image>
				<view class="text">{{title}}</view>

			</view>
			<view class="bottom flex-set">
				<view v-if="award.coin" class="coin flex-set">+{{award.coin}}
					<image src="/static/image/user/b1.png" mode="widthFix"></image>
				</view>
				<view v-if="award.stone" class="coin flex-set">+{{award.stone}}
					<image src="/static/image/user/b2.png" mode="widthFix"></image>
				</view>
				<view v-if="award.trumpet" class="coin flex-set">+{{award.trumpet}}
					<image src="/static/image/user/b3.png" mode="widthFix"></image>
				</view>
				<!-- <view class="tips"></view> -->
				<btnComponent type="css">
					<view class="flex-set" @tap="$app.goPage('/pages/index/index')" style="width: 160upx;height: 80upx;">继续打榜</view>
				</btnComponent>
			</view>

		</view>

	</view>
</template>

<script>
	import btnComponent from '@/components/btnComponent.vue'
	export default {
		components: {
			btnComponent
		},
		data() {
			return {
				award_type: this.$app.getVal('award_type'),
				title: '',
				award: {}
			};
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			loadData() {
				this.$app.request('share/group_award', {
					award_type: this.award_type
				}, res => {
					this.title = res.data.title
					this.award = res.data.award
					
					this.$app.setData('userExt', res.data.userExt)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.signin-container {
		height: 100%;
		padding-top: 100upx;

		.main-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 600upx;
			height: 600upx;
			margin: auto;
			background-color: #FFF;
			box-shadow: 0 10upx 20upx rgba(#000, 0.3);
			border-radius: 30upx;
			overflow: hidden;

			.top-container {
				width: 100%;
				height: 260upx;
				background-color: rgba(#ffd1b2, 0.3);
				text-align: center;
				flex-direction: column;
				justify-content: space-around;
				padding: 30upx;

				.top-img {
					width: 80upx;
					height: 80upx;
				}

				.text {
					font-size: 32upx;
					font-weight: 700;
				}
			}

			.bottom {
				flex-direction: column;
				flex: 1;
				.coin {
					margin: 20upx;
					image {
						width: 30upx;
						min-height: 30upx;
					}
				}
			}


			.tips {
				font-size: 22upx;
				color: #888;
				margin-bottom: 20upx;
			}
		}
	}
</style>

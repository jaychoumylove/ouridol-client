<template>
	<view class="prop-container">
		<view class="top-enter-wrapper" @tap="$app.goPage('/pages/prop/buy/buy')">
			<image src="/static/image/prop/top-enter.png" mode=""></image>
		</view>

		<view class="list-wrapper">
			<view class="list-item">
				<view class="row row-1">
					<view class="left flex-set">
						<image src="/static/image/guild/card-c.png" class="icon" mode="aspectFill"></image>

						<view class="content">
							<view class="top">123</view>
							<view class="bottom">123</view>
						</view>
					</view>

					<view class="right">
						<btnComponent type="css">
							<view class="flex-set" style="width: 140upx;height:70upx;">使用</view>
						</btnComponent>
					</view>
				</view>

				<view class="row row-2">
					dwqdqwd
				</view>

			</view>

		</view>
	</view>
</template>

<script>
	import btnComponent from "@/components/btnComponent.vue"

	export default {
		components: {
			btnComponent
		},
		data() {
			return {

			};
		},
		onShow(){
			this.loadData()
		},
		methods:{
			loadData(){
				this.$app.request('page/myprop', {}, res => {
					
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.prop-container {
		.top-enter-wrapper {
			height: 173upx;
		}

		// 列表
		.list-item {
			padding: 10upx 20upx;
			background-color: rgba(#FFF, .3);
			margin-bottom: 20upx;
			.row {
				padding: 10upx 20upx;

				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.row-1 {
				border-bottom: 1px solid #EEE;

				.left {
					.icon {
						width: 100upx;
						height: 100upx;

					}

					.content {
						margin: 0 40upx;

						.top {}

						.bottom {
							font-size: 22upx;
							color: $color_0;
						}
					}
				}
			}
		}
	}
</style>

<template>
	<view class="prop-container">
		<view class="top-enter-wrapper">
			<view class="explain-wrapper flex-set">
				<!-- <image src=""></image> -->
				<view class="text-wrapper">
					<view class="top flex-set">道具商店</view>
					<view class="bottom flex-set">稀有道具，每日限量抢购</view>
				</view>
				<block v-if="$app.getData('VERSION')!=$app.getData('config').version">
					<btnComponent type="default">
						<view @tap="$app.goPage('/pages/prop/buy/buy')" class="flex-set" style="font-weight: 700 ;width: 140upx; height: 60upx;">进入</view>
					</btnComponent>
				</block >
			</view>
		</view>

		<view class="list-wrapper" v-if="list && list.length > 0">
			<view class="list-item" v-for="(item,index) in list" :key="index">
				<view class="row row-1">
					<view class="left flex-set">
						<image :src="item.prop.img" class="icon" mode="aspectFill"></image>

						<view class="content">
							<view class="top">{{item.prop.name}}</view>
							<view class="bottom">过期时间：{{item.create_time.slice(0,11) + "24:00:00"}}</view>
						</view>
					</view>

					<view class="right">
						<btnComponent v-if="item.status == 0" type="css">
							<view @tap="useProp(item)" class="flex-set" style="width: 140upx;height:70upx;">使用</view>
						</btnComponent>
						<btnComponent v-if="item.status == 1" type="disable">
							<view class="flex-set" style="width: 140upx;height:70upx;">已使用</view>
						</btnComponent>
						<btnComponent v-if="item.status == 2" type="disable">
							<view class="flex-set" style="width: 140upx;height:70upx;">已过期</view>
						</btnComponent>
					</view>
				</view>

				<view class="row row-2">{{item.prop.desc}}</view>

			</view>
		</view>
		<view v-else class="nodata">
			<image src="/static/image/user/blank.png" mode="widthFix" class="img"></image>
			<view class="text">你还没有道具</view>
			<view class="text flex-set" style="height: 60upx;width: 230upx;border-bottom: 1upx solid #000;margin: 0 auto;">
				<button class="comment" open-type="contact">回复"1"获得道具</button>
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
				list: [],
				page: 1,
				size: 10,
				end: false,
			};
		},
		onShow() {
			this.page = 1;
			this.end = false;
			this.loadData()
		},
		onReachBottom (){
			if (!this.end) {
				this.page ++;
				this.loadData();
			}
		},
		methods: {
			useProp(item) {
				this.$app.request('prop/use', {
					id: item.id
				}, res => {
					if (res.data.awards) {
						this.$app.modal(`恭喜,抽到${res.data.awards}能量!`)
					} else {
						this.$app.toast('使用成功', 'success')
					}
					let list = this.list;
					let newList = list.map(d => {
						if (d.id == item.id) {
							d.status = 1;
						}
						return d;
					})
					this.list = newList;
				}, 'POST', true)
			},
			loadData() {
				this.$app.request('page/myprop', {
					page: this.page,
					size: this.size
				}, res => {
					if (this.page == 1) {
						this.list = res.data.list
					} else {
						this.list = this.list.concat(res.data.list)
					}
					if (res.data.list.length < size) {
						this.end = true;
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.prop-container {
		.nodata {
			margin-top: 30%;
			color: $text-color-2;
			text-align: center;

			image {
				width: 150upx;
				margin: 20upx;
			}
		}

		.top-enter-wrapper {

			.explain-wrapper {
				padding: 10upx 20upx;
				margin: 20upx;
				// box-shadow: 0upx 2upx 4upx rgba(#000, .3);
				border-radius: 30upx;
				background-color: rgba(#FFF, .3);
				justify-content: space-around;

				text {
					color: orange;
				}

				.icon {
					width: 30upx;
					height: 30upx;
				}


			}
		}

		// 列表
		.list-item {
			padding: 10upx 20upx;
			background-color: rgba(#FFF, .3);
			margin: 20upx 0;

			.row {
				padding: 10upx 20upx;

				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.row-1 {
				border-bottom: 1px solid #FFF;

				.left {
					.icon {
						width: 100upx;
						height: 100upx;

					}

					.content {
						line-height: 1.7;
						margin: 0 40upx;

						.top {}

						.bottom {
							justify-content: flex-start;
							font-size: 22upx;
							color: $text-color-2;

							.price {
								color: red;
								font-size: 30upx;
								margin-right: 10upx;
							}

							.remain {}
						}
					}
				}
			}

			.row-2 {
				font-size: 24upx;
			}
		}
	}
</style>

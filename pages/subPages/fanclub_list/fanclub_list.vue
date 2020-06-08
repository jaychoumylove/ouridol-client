<template>
	<view class="fun-container">
		<view class="top-wrap flex-set">
			<view class="left">{{starname}}后援会</view>
			<view class="right flex-set" @tap="$app.goPage('/pages/subPages/fanclub/fanclub')">
				<text>申请入驻</text>
				<image src="/static/image/i.png" mode=""></image>
			</view>
		</view>

		<view class="list" v-if="list.length > 0">
			<view class="list-item" v-for="(item,index) in list" :key="index">
				<image class="ava" :src="item.avatar" mode="aspectFill"></image>

				<view class="text-wrap">
					<view class="clubname">{{item.clubname}}</view>
					<view class="week-count">本周贡献：{{item.week_count}}</view>
					<view class="week-count">本月贡献：{{item.month_count}}</view>
				</view>

				<btnComponent type="default" v-if="!item.join" @tap="joinFanclub(item)">
					<view class="flex-set" style="width: 130upx;height: 60upx;">加入</view>
				</btnComponent>
				<btnComponent type="disable" v-else @tap="exitFanclub()">
					<view class="flex-set" style="width: 130upx;height: 60upx;">退出</view>
				</btnComponent>
			</view>
		</view>
		<view class="" v-else v-for="(item,index) in $app.getData('config').no_fanclub" :key="index">
			<view class="article-title" v-if="item.title">{{item.title}}</view>
			<text class="article-content" decode v-if="item.content.length>0" v-for="(item1,index1) in item.content" :key="index1">{{item1}}</text>
			<image class="article-image" v-if="item.image" :src="item.image" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import btnComponent from '@/components/btnComponent.vue'
	export default {
		components: {
			btnComponent,
		},
		data() {
			return {
				starname: this.$app.getData('userStar').name || '',
				list: []
			};
		},
		onShow() {
			this.loadData()
		},
		methods: {
			exitFanclub() {
				this.$app.request('ext/exitFanclub', {}, res => {
					this.loadData()
				}, 'POST', true)
			},
			joinFanclub(item) {
				this.$app.request('ext/joinFanclub', {
					fanclub_id: item.id
				}, res => {
					this.loadData()
				}, 'POST', true)
			},
			loadData() {
				this.$app.request('ext/fanclubList', {
					star_id: this.$app.getData('userStar').id,
					status: 2,
				}, res => {
					this.list = res.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fun-container {
		padding: 30upx;

		.top-wrap {
			justify-content: space-between;

			.left {
				font-size: 32upx;
				border-left: 10upx solid #67458f;
				padding-left: 20upx;
				font-weight: 700;
			}

			.right {
				image {
					width: 20upx;
					height: 20upx;
				}
			}
		}

		.list {

			.list-item {
				display: flex;
				align-items: center;
				background-color: rgba(#FFF, 0.3);
				margin: 20upx -30upx;
				padding: 20upx;

				.ava {
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
					margin: 0 40upx;
				}

				.text-wrap {
					width: 350upx;

					.clubname {
						font-size: 32upx;
						font-weight: 600;
						margin-bottom: 4upx;
					}

					.week-count {
						font-size: 22upx;
					}

					.month-count {
						font-size: 22upx;
					}
				}
			}
		}
		
	}
</style>

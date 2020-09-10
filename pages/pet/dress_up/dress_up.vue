<template>
	<view class="dressup-container">
		<image class="bg_img" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HrdPxWibdec5B8xuaXDQD2XDQ94Aediaa6h7IzndxzaKwZkRHj5yictaOicMZg1CmJ3Qiac9XBDnwh2RQ/0" mode="widthFix"></image>
		<view class="dressup-avurl">
			<view :style="'height:'+header+';width:100%;'"></view>
			<view style="display: flex; justify-content: flex-start;color: #FFFFFF;padding: 20rpx;">
				<view @tap="navigateBack" style="width: 8%;">
					<image style="width: 20rpx;" mode="widthFix" src="/static/image/back_white.png"></image>
				</view>
				<view style="width: 50%;font-size: 32rpx;">装扮</view>
			</view>
		
		</view>
		<view class="now-dressup">
			<view class="title-cont">
				<view>
					<image class="title-img" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HrdPxWibdec5B8xuaXDQD2XlPn3KsUdDrwuqlcAk4ZaqMoYVJrTdpl6JTaseiaKEciammbYAxADgoIA/0" mode="widthFix"></image>
				</view>
				<view>
					<view class="title">开启偶像装扮之旅</view>
					<view class="sub-title">更多有趣好玩功能，尽情期待</view>
				</view>
			</view>
			
			<view class="dressup-list">
				<view class="dressup-item">
					<view class="item" @tap="$app.goPage('/pages/pet/dress_up/pet_bg')">
						<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HrdPxWibdec5B8xuaXDQD2XiaXUbuW24A7PFHu4HMJNZq83Bldp1DVNIHOibb1wcWdeibRwJt7iaMaaIw/0" mode="widthFix"></image>
						<view class="name">精灵背景</view>
					</view>
				</view>
				<view class="dressup-item">
					<view class="item" @tap="$app.goPage('/pages/pet/dress_up/headwear')">
						<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HbURBc4icwIfibfezPVz80jBq2MrgQxchV9IeUrsgVXDJx67Il3llNB1X4yF0maFjO3DGicicqhV0Qag/0" mode="widthFix"></image>
						<view class="name">聊天头饰</view>
					</view>
				</view>
				<view class="dressup-item">
					<view class="item" @tap="$app.goPage('/pages/pet/dress_up/badge')">
						<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HrdPxWibdec5B8xuaXDQD2XqLzO1PXtEDFwlu2cSnks64FvTYDRwtS7UUdGHicYRxa8ult4uib8xc4A/0" mode="widthFix"></image>
						<view class="name">徽章</view>
					</view>
				</view>
				<!-- <view class="dressup-item">
					<view class="item" @tap="$app.goPage('/pages/pet/dress_up/bubble')">
						<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HrdPxWibdec5B8xuaXDQD2XddIeIC7iaLlTajm0VbUv2xzbBPvW5OKichAIsyZOZwKtuHsolOMiaeNkg/0" mode="widthFix"></image>
						<view class="name">聊天气泡</view>
					</view>
				</view>
				<view class="dressup-item">
					<view class="item" @tap="$app.goPage('/pages/pet/dress_up/chat_bg')">
						<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HrdPxWibdec5B8xuaXDQD2XShNkwjc81rib2mSvTwXQa2fzes91JAic7BRz3y2lkDmQVJBzibZibuWfEQ/0" mode="widthFix"></image>
						<view class="name">聊天背景</view>
					</view>
				</view> -->
				<!-- <view class="dressup-item" @tap="$app.goPage('/pages/user/dress_up/badge')">
					<view class="name">荣誉徽章</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				header: '',
			}
		},
		onShow() {
			this.header = uni.getSystemInfoSync()['statusBarHeight'] + 'px'
		},
		methods:{
			navigateBack() {
				uni.navigateBack()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.dressup-container{
		width: 100%;
		height: 100%;
		background-color: $text-color-10;
		position: relative;
		
		.bg_img{
			width: 100%;
			position: absolute;
			z-index: 1;
		}
		
		.dressup-avurl{
			position: relative;
			z-index: 2;
		}
		
		.now-dressup{
			position: relative;
			z-index: 2;
			
			.title-cont{
				display: flex;
				flex-direction: row;
				color: #FFFFFF;
				justify-content: center;
				padding: 60rpx 0 40rpx 0;

				.title-img{
					width: 150rpx;
				}
				.title{
					display: flex;
					margin: 12rpx 0 12rpx 22rpx;
					font-size:40rpx;
					font-weight:500;
				}
				.sub-title{
					display: flex;
					margin: 12rpx 0 12rpx 22rpx;
					font-size:28rpx;
					font-weight:400;
				}
			}
			
			.dressup-list{
				width: 100%;
				padding: 20rpx;
				display: flex;
				flex-wrap: wrap;
				.dressup-item{
					width: 50%;
					padding: 20rpx 30rpx;
					.item{
						width: 100%;
						border-radius: 40rpx;
						padding: 50rpx 0;
						background-color: #FFFFFF;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						
						image{
							width: 120rpx;
						}
						.name{
							color: $text-color-4;
							padding-top: 15rpx;
							font-size: 32rpx;
						}
					}
					
				}
				
				
			}
		}
		
	}
</style>

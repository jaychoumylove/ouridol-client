<template>
	<view class='container' :class="{show:show}" @tap="closeModal">
		<view class="modal-container" :class="[type]" @tap.stop>
			<view class="close-btn flex-set iconfont iconclose" @tap="closeModal"></view>
			<view class="top-wrapper" v-if="headimg!='false'">
				<image v-if="type == 'send'" src="/static/image/guild/send-modal-bg-1_01.png" mode="widthFix" class="title-bg"></image>
				<view v-if="type == 'default'" class="title-bg linear"></view>
				<view class="title">{{title}}</view>
				<image class='center-img' :src="headimg" mode="widthFix"></image>
			
			</view>
			<view class="content">
				<slot></slot>
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
				show: false
			};
		},
		props: {
			title: {
				default: '提示'
			},
			headimg: {
				default: "/static/image/guild/hart.png"
			},
			type: {
				default: 'default'
			}
		},
		created() {
			this.show = true
		},
		methods: {
			closeModal() {
				this.show = false
				setTimeout(() => {
					this.$emit('closeModal')
				}, 200)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 99;
		background-color: rgba(0, 0, 0, .6);
		transition: .2s;
		opacity: 0;

		.modal-container {
			
			width: 100%;
			height: auto;
			min-height: 730upx;
			box-shadow: 0 -2px 4px rgba(#000, .5);
			border-top-left-radius: 40upx;
			border-top-right-radius: 40upx;
			background-color: #FCF4F5;

			position: absolute;
			bottom: var(--window-bottom);
			transform: translateY(100%);
			transition: .2s;

			.close-btn {
				position: absolute;
				top: 10upx;
				right: 10upx;

				width: 80upx;
				height: 80upx;
				color: #999;
				font-size: 45upx;
				z-index: 9;
			}
			
			.top-wrapper {
				width: 100%;
				height: 95upx;
				position: relative;
			
				.title-bg {
					position: absolute;
					height: 100%;
					width: 100%;
					border-top-left-radius: 20upx;
					border-top-right-radius: 20upx;
				}
				
				.title-bg.linear {
					
					background: linear-gradient(to bottom, #e5b4b0, #f6e3df);
				}
			
				.title {
					font-size: 34upx;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					left: 30upx;
					// color: #FFF;
				}
			
				.center-img {
					width: 100upx;
					// height: 100upx;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					top: -30%;
				}
			
			
			}

			.content {
				width: 100%;
				height: auto;
				// flex: 1;
				position: relative;
				padding-top: 20upx;
			}

		}
		
		// 中心弹出
		.modal-container.center {
			width: 600rpx;
			left: 50%;
			top: 50%;
			bottom: auto;
			transform: translate(-50%, -50%);
			border-bottom-left-radius: 30upx;
			border-bottom-right-radius: 30upx;
		}
		// 中心弹出
		.modal-container.centers {
			width: 90%;
			left: 50%;
			top: 50%;
			bottom: auto;
			transform: translate(-50%, -50%);
			border-bottom-left-radius: 30upx;
			border-bottom-right-radius: 30upx;
		}
		
		// 中心弹出透明
		.modal-container.centerNobg {
			width: 600upx;
			left: 50%;
			top: 50%;
			bottom: auto;
			transform: translate(-50%, -50%);
			background-color:transparent;
			box-shadow:none;
			border: none;
		}

	}

	.container.show {
		opacity: 1;

		.modal-container {
			transform: translateY(0%);
		}
		
		.modal-container.center {
			transform: translate(-50%, -50%);
		}
		.modal-container.centers {
			transform: translate(-50%, -50%);
		}
		
		.modal-container.centerNobg {
			transform: translate(-50%, -50%);
		}
	}
</style>

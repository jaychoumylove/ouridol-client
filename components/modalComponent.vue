<template>
	<view class='container flex-set' :class="{show:show}" @tap="closeModal">
		<view class="modal-container" :class="[type]" @tap.stop="">
			<view class="top-wrapper" v-if="headimg!='false'">
				<image v-if="type == 'send'" src="/static/image/guild/send-modal-bg-1_01.png" mode="aspectFill" class="title-bg"></image>
				<view v-if="type == 'default'" class="title-bg linear"></view>
				<view class="title">{{title}}</view>
				<view class="close-btn flex-set iconfont iconclose" @tap="closeModal"></view>

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
				default: ""
			},
			type: {
				default: 'default'
			}
		},
		created() {
			this.show = true
		},
		mounted() {},
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
		right: 0;
		bottom: 0;
		z-index: 99;
		background-color: rgba(0, 0, 0, .8);
		transition: .1s;
		opacity: 0;
		flex-direction: column;

		.modal-container.send {
			background-color: #f7e8f1;
		}

		.modal-container {
			margin-top: 90upx;
			width: 600upx;
			min-height: 780upx;
			box-shadow: 0 1px 2px rgba(#000, .3);
			border-radius: 30upx;
			background: #FFFFFF;
			display: flex;
			flex-direction: column;
			.top-wrapper {
				width: 100%;
				height: 100upx;
				position: relative;
				background: $text-color-8;
				border-top-left-radius: 30upx;
				border-top-right-radius: 30upx;

				.title-bg {
					position: absolute;
					height: 100%;
					width: 100%;
					border-top-left-radius: 20upx;
					border-top-right-radius: 20upx;
				}
				

				.title {
					width: 100%;
					font-size: 40upx;
					font-weight: bold;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					text-align: center;
					color: #FFF;
				}

				.center-img {
					width: 100upx;
					height: 100upx;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					top: -30%;
				}


			}

			.content {
				width: 100%;
				flex: 1;
				position: relative;
			}

		}

		// 中心弹出
		.modal-container.center {
			width: 600rpx !important;
			left: 50%;
			top: 50%;
			bottom: auto;
			border-radius: 30upx;
		}
		// 中心弹出
		.modal-container.centers {
			width: 90% !important;
			left: 50%;
			top: 50%;
			bottom: auto;
			border-radius: 30upx;
		}
		
		// 中心弹出透明
		.modal-container.centerNobg {
			width: 600upx !important;
			left: 50%;
			top: 50%;
			bottom: auto;
			background-color:transparent;
			box-shadow:none;
			border: none;
		}
		.close-btn {

			width: 80upx;
			height: 80upx;
			position: absolute;
			top: 10%;
			right: 5%;
			z-index: 10;
			border-radius: 50%;
			color: #FFF;
			font-size: 45upx;
		}

	}

	.container.show {
		opacity: 1;
		
		.modal-container {
			-webkit-animation: popIn .4s ease-in-out 0.2s;
			animation: popIn .3s ease-out;
		}
		@keyframes popIn {
		    0% {
		        -webkit-transform: scale3d(0, 0, 0);
		        transform: scale3d(0.5, 0.5, 0.5);
		        opacity: 0;
		    }
		    50% {
		        -webkit-animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
		        animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
		    }
		    100% {
		        -webkit-transform: scale3d(1, 1, 1);
		        transform: scale3d(1, 1, 1);
		        -webkit-animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
		        animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
		        opacity: 1;
		    }
		}
	}
</style>

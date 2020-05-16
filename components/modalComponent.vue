<template>
	<view class='container flex-set' :class="{show:show}" @tap="closeModal">
		<view class="modal-container" :class="[type]" @tap.stop="">
			<view class="top-wrapper" v-if="headimg!='false'">
				<image v-if="type == 'send'" src="/static/image/guild/send-modal-bg-1_01.png" mode="widthFix" class="title-bg"></image>
				<view v-if="type == 'default'" class="title-bg linear"></view>
				<view class="title">{{title}}</view>
				<image class='center-img' :src="headimg" mode=""></image>

			</view>
			<view class="content">
				<slot></slot>
			</view>
		</view>
		<view class="close-btn flex-set iconfont icon-icon-test1" @tap="closeModal">
			<!-- <btnComponent>
				<image @tap="closeModal" src="/static/image/guild/close-btn.png" mode=""></image>
			</btnComponent> -->
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
			min-height: 730upx;
			box-shadow: 0 1px 2px rgba(#000, .3);
			border-radius: 20upx;
			// background-color: #fdd6cf;
			background-color: #fff;
			display: flex;
			flex-direction: column;
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

		.close-btn {

			width: 80upx;
			height: 80upx;
			margin-top: 10upx;
			z-index: 10;
			border-radius: 50%;
			background-color: rgba(0, 0, 0, .3);
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

<template>
	<view class='container flex-set' :class="{show:show}" @tap="closeModal">
		<view class="modal-container" @tap.stop="">
			<view class="top-wrapper">
				<view class="title">{{title}}</view>
				<image class='center-img' :src="headimg" mode=""></image>
				<view class="close-btn">
					<btnComponent>
						<image @tap="closeModal" src="/static/image/guild/close-btn.png" mode=""></image>
					</btnComponent>
				</view>
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
		},
		created() {
			

		},
		mounted() {
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
		right: 0;
		bottom: 0;
		z-index: 99;
		background-color: rgba(0, 0, 0, .5);
		transition: .2s;
		opacity: 0.1;

		.modal-container {
			width: 600upx;
			height: 740upx;
			box-shadow: 0 1px 2px rgba(#000, .3);
			border-radius: 20upx;
			background: url(http://wx3.sinaimg.cn/large/0060lm7Tly1g2dpyg3vxng30gp0kk74c.gif) center no-repeat/cover;
			display: flex;
			flex-direction: column;
			transition: .2s;
			transform: scale(0.9);

			.top-wrapper {
				width: 100%;
				height: 12.6%;
				position: relative;

				.title {
					font-size: 34upx;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					left: 30upx;
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

				.close-btn {
					position: absolute;
					right: 0upx;
					top: 0upx;

					image {
						width: 56upx;
						height: 56upx;
					}

				}
			}

			.content {
				width: 100%;
				flex: 1;
				position: relative;
			}

		}


	}

	.container.show {
		opacity: 1;

		.modal-container {
			transform: scale(1);
		}
	}
</style>

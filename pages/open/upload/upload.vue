<template>
	<view class="upload-container flex-set">
		<view v-if="!img" class="pre-wrap flex-set" @tap="preImg">
			<view class='big'>点我上传</view>
			<view>上传图片尺寸 宽：高=1：2</view>
			<view>图片体积在1M以下</view>
			<view>请勿上传与偶像无关的内容</view>
			<view>建议预览效果后再上传</view>
		</view>
		<image v-else class="pre-wrap" :src="img" mode="aspectFill" @tap="preImg"></image>

		<btnComponent type="css">
			<view class="flex-set" style="width: 200upx;height: 80upx;" @tap="upload">确认上传</view>
		</btnComponent>
	</view>
</template>

<script>
	import btnComponent from '@/components/btnComponent.vue';
	export default {
		components: {
			btnComponent
		},
		data() {
			return {
				img: '',
			};
		},
		methods: {
			upload() {
				this.$app.upload(this.img, res => {
					const imgUrl = res[0]
					if (!imgUrl) {
						this.$app.toast('上传失败')
					} else {
						this.$app.request('open/upload', {
							img_url: imgUrl
						}, res => {
							this.$app.toast('上传成功', 'success')
							setTimeout(() => {
								uni.navigateBack()
							}, 1000)
						})
					}
				})
			},
			preImg() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original'],
					success: res => {
						this.img = res.tempFilePaths[0]
					}
				});
			}
		}

	}
</script>

<style lang="scss">
	.upload-container {
		flex-direction: column;
		height: 100%;

		.pre-wrap {
			border-radius: 20upx;
			border: 4upx dotted #666;
			width: 500upx;
			height: 888upx;
			margin: 40upx;
			flex-direction: column;
			color: #999;

			.big {
				font-size: 60upx;
				padding: 20upx;
				color: $text-color-2;
			}
		}
	}
</style>

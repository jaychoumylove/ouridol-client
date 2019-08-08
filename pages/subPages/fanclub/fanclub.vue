<template>
	<view class="fanclub-container">
		<block v-for="(item,index) in article" :key="index">
			<view class="article-title" v-if="item.title">{{item.title}}</view>
			<text class="article-content" decode v-if="item.content.length>0" v-for="(item1,index1) in item.content" :key="index1">{{item1}}</text>
			<image class="article-image" v-if="item.image" :src="item.image" mode="widthFix"></image>
		</block>
		<view class="article-title">申请资料</view>

		<form class="form-container" @submit="formSubmit">
			<!-- <view class="input-group">
				<view class="name">后援会头像</view>
				<view class="img-input flex-set" @tap="uploadImg('avatar')">
					<image v-if="tmpImg.avatar" :src="tmpImg.avatar" mode="aspectFill"></image>
					<view v-else>+</view>
				</view>
			</view> -->
			<view class="input-group">
				<view class="name">
					后援会名称
				</view>
				<input type="text" name="clubname" placeholder="申请入驻后援会的名称" />
			</view>
			<view class="input-group">
				<view class="name">负责人姓名</view>
				<input type="text" name="name" />
			</view>
			<view class="input-group">
				<view class="name">负责人职位
				</view>
				<input type="text" name="post" placeholder="你在后援会的职位" />
			</view>
			<view class="input-group">
				<view class="name">负责人微信
				</view>
				<input type="text" name="wx" placeholder="你的微信帐号" />
			</view>
			<!-- <view class="input-group">
				<view class="name">资质截图
				</view>
				<view class="img-input flex-set" @tap="uploadImg('qualify')">
					<image v-if="tmpImg.qualify" :src="tmpImg.qualify" mode="aspectFill"></image>
					<view v-else>+</view>
				</view>
				<view class="tips">你的后援会职位证明截图</view>
			</view> -->
			<view class="input-group" style="padding-top: 40upx;">
				<button form-type="submit" style="width: 180upx;margin: auto;">
					<btnComponent type="css">
						<view class="flex-set" style="width: 180upx;height: 90upx;">提交</view>
					</btnComponent>
				</button>
			</view>

		</form>

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
				article: this.$app.getData('config').fanclub_notice,

				tmpImg: {
					avatar: null,
					qualify: null,
				}
			};
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: option.starname || '' + '后援会入驻'
			})
		},

		methods: {
			formSubmit(e) {
				const value = e.detail.value
				if (!value['wx']) {
					this.$app.toast('请填写微信号')
					return
				}

				this.$app.request(this.$app.API.EXT_FANCLUB_JOIN, value, res => {
					this.$app.toast('提交成功！')
				}, 'POST', true)

				// 				this.$app.upload([this.tmpImg.avatar, this.tmpImg.qualify], res => {
				// 					value['avatar'] = res[0] || ''
				// 					value['qualify'] = res[1] || ''
				// 
				// 					this.$app.request(this.$app.API.EXT_FANCLUB_JOIN, value, res => {
				// 						this.$app.toast('提交成功！')
				// 
				// 					})
				// 				})
			},
			uploadImg(name) {
				uni.chooseImage({
					count: 1, //默认9
					success: res => {
						this.tmpImg[name] = res.tempFilePaths[0]
					}
				});
			},

		}
	}
</script>

<style lang="scss">
	.fanclub-container {
		padding: 20upx 40upx;

		.tips {
			color: #888;
			padding: 10upx;
			font-size: 22upx;
		}

		.form-container {
			display: flex;
			flex-direction: column;

			.input-group {
				display: flex;
				align-items: center;
				margin: 20upx;

				.name {
					width: 200upx;
				}

				.img-input {
					width: 100upx;
					height: 100upx;
					background-color: rgba(#FFF, 0.6);
					font-size: 60upx;
					color: #cecece;
				}

				input {
					flex: 1;
					background-color: rgba(#FFF, 0.6);
					height: 80upx;
					padding: 0 20upx;
				}
			}
		}
	}
</style>

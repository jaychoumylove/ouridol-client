<template>
	<view class="report-container">
		<view class="item" v-for="(item,index) in reportList" :key="index" @tap="postReport(index)">
			<listItemComponent :avatar="item.avatar">
				<template v-slot:left-container>
					<view class="color">{{item.value}}</view>
				</template>
				<template v-slot:right-container>
					<btnComponent type="default">
						<view class="flex-set color" style="width: 130upx;height: 60upx;">></view>
					</btnComponent>
				</template>
			</listItemComponent>
		</view>
	</view>
</template>

<script>
	import listItemComponent from '@/components/listItemComponent.vue';
	
	export default {
		components: {
			listItemComponent,
		},
		data() {
			return {
				reportList: [],
				report: {
					user: -1,
					id: -1
				}
			};
		},
		onLoad (option) {
			this.reportList = this.$app.getData('config').report_reason;
			this.report.user = option.user;
			this.report.id = option.id;
		},
		methods: {
			postReport(index) {
				this.$app.modal(`确认举报？`, () => {
					if (this.report.user < 0) return this.$app.toast("请选择举报用户");
					if (this.report.id < 0) return this.$app.toast("请选择举报弹幕");
					
					this.$app.request(this.$app.API.USER_REPORT, {
						type: index,
						id: this.report.id,
						user_id: this.report.user
					}, res => {
						this.$app.toast('举报成功', 'success');
						setTimeout(() => {
							this.$app.goPage('/pages/group/group');
						}, 1500)
					}, 'POST', true)
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #ccc !important;
	}
	page::before {
		background: #ccc !important;
	}
	.color {
		color: #000;
	}
	.report-container {
		background-color: #fff;
		.item {
			border-bottom: 1upx solid #ccc;
		}
	}
</style>

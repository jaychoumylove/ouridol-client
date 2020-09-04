<template>
	<view class="active-marry-container">
		<!-- <view class="active-title">秋日情书：9月3日-10月31日</view>
		<view class="active-desc">
			<view>结婚任务说明：</view>
			<view>1：哈哈哈哈哈哈哈哈哈哈或或</view>
			<view>2：哈哈哈哈哈哈哈哈哈哈或或</view>
		</view>
		<view class="marry-info">
			<view>目前贡献能量：121213123</view>
			<view>还差14546完成结婚任务</view>
		</view> -->
		
	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue';
	export default {
		components: {
			btnComponent,
			modalComponent,
		},
		data() {
			return {
				modal: '',
				list: [],
				marryInfo: [],
			};
		},
		onShow() {
			// this.loadDate();
		},
		methods:{
			loadDate(){
				this.$app.request('active/get_marry_list',{},res=>{
					this.list=res.data.list;
					this.marryInfo=res.data.marryInfo;
				})
			},
			getReward(index){
				this.$app.request('active/get_marry_reward',{index:index},res=>{
					this.$app.toast('领取成功');
					this.loadDate();
				})
			},
		}
	}
</script>

<style lang="scss">

</style>

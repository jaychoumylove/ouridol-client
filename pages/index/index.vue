<template>
	<view class="index-container">
		<view class="top-tab-container">
			<view class="left-tab-group">
				<view class="tab-item" :class="{active:rankField == 'week_hot'}" @tap="changeField('week_hot');getSunday()">周榜</view>
				<view class="tab-item" v-if="$app.getData('config').show_month != 0" :class="{active:rankField == 'month_hot'}"
				 @tap="changeField('month_hot');getLast()">月榜</view>
				<view v-if="$app.getData('config').version != $app.getData('VERSION')" class="tab-item" @tap="$app.goPage('/pages/open/rank/rank')">开屏备选</view>
				<!-- <view class="tab-item" :class="{active:sign == 2}" @tap="changeSign(2)">创造营</view> -->
			</view>
			<view class="right-search">
				<input :class="{show:!searchHide}" type="text" :value="keywords" @input="searchInput" placeholder="搜索爱豆名字"
				 placeholder-class="placeholder-style" placeholder-style="color:#FFF;" />
				<view class="iconfont flex-set" :class="[searchHide?'iconfangdajing':'iconclose']" @tap="searchToggle()"></view>
			</view>
		</view>
		<bannerComponent :bannerList="bannerList" :sList="sList" :muti="muti" bannerHeight="280"></bannerComponent>

		<view class="middle-text-container">
			<view class="" @tap="$app.goPage('/pages/subPages/star/rank_history/rank_history?rankField='+rankField)">往期榜单</view>
			<view class="" style='font-size: 24upx;'>本{{rankField=='week_hot'?'周':'月'}}截止：{{cutOffDate}}23:59</view>
			<view class="rule" @tap="$app.goPage('/pages/notice/notice?id=1')">打榜说明</view>
		</view>
		<view class="topthree-container" v-if="!keywords">
			<view class="content" @tap="goGroup(rankList[1]&&rankList[1].starid)">
				<image class='crown' src="/static/image/index/ic_huangguang_2.png" mode=""></image>
				<view class="avatar" style="background-color: #9E9095;">
					<image class='position-set' :src="rankList[1]&&rankList[1].avatar" mode="aspectFill"></image>
				</view>
				<view class="starname">{{rankList[1]&&rankList[1].name}}</view>
				<view class="hot">{{rankList[1]&&rankList[1].hot||0}}
					<image src="/static/image/index/ic_hot.png" mode=""></image>
				</view>
				<btnComponent type="default">
					<view class="flex-set" style="width: 130upx;height: 60upx;">打榜</view>
				</btnComponent>
			</view>
			<view class="content" @tap="goGroup(rankList[0]&&rankList[0].starid)">
				<image class='crown' src="/static/image/index/ic_huangguang_1.png" mode=""></image>
				<view class="avatar" style="background-color: #FFC329;">
					<image class='position-set' :src="rankList[0]&&rankList[0].avatar" mode="aspectFill"></image>
				</view>
				<view class="starname">{{rankList[0]&&rankList[0].name}}</view>
				<view class="hot">{{rankList[0]&&rankList[0].hot||0}}
					<image src="/static/image/index/ic_hot.png" mode=""></image>
				</view>
				<btnComponent type="default">
					<view class="flex-set" style="width: 130upx;height: 60upx;">打榜</view>
				</btnComponent>
			</view>
			<view class="content" @tap="goGroup(rankList[2]&&rankList[2].starid)">
				<image class='crown' src="/static/image/index/ic_huangguang_3.png" mode=""></image>
				<view class="avatar" style="background-color: #EC7E3D;">
					<image class='position-set' :src="rankList[2]&&rankList[2].avatar" mode="aspectFill"></image>
				</view>
				<view class="starname">{{rankList[2]&&rankList[2].name}}</view>
				<view class="hot">{{rankList[2]&&rankList[2].hot||0}}
					<image src="/static/image/index/ic_hot.png" mode=""></image>
				</view>
				<btnComponent type="default">
					<view class="flex-set" style="width: 130upx;height: 60upx;">打榜</view>
				</btnComponent>
			</view>
		</view>
		<view class="rank-list-container">
			<view class="rank-list-item" v-for="(item,index) in rankList" :key="index" v-if="keywords || index>2" @tap="goGroup(item.starid)">

				<listItemComponent :rank="!keywords?index+1:''" :avatar="item.avatar">

					<template v-slot:left-container>
						<view class="left-container">
							<view class="star-name">{{item.name}}</view>
							<view class="bottom-text">
								<view class="hot-count">{{item.hot}}</view>
								<image class="icon-heart" src="/static/image/index/ic_hot.png" mode=""></image>
							</view>
						</view>
					</template>

					<template v-slot:right-container>
						<view class="right-container">
							<btnComponent type="default">
								<view class="flex-set" style="width: 130upx;height: 60upx;">打榜</view>
							</btnComponent>
						</view>
					</template>
				</listItemComponent>

			</view>
			<loadIconComponent v-if="showBottomLoading"></loadIconComponent>

		</view>
		<view class="open-ad-container flex-set" v-if="modal=='indexBanner' && $app.getData('config').index_banner && $app.getData('config').index_banner.img_url && $app.getData('config').version != $app.getData('VERSION')">
			<block v-if="$app.getData('config').isBirthday==1">
				<view class="mains">
					<view class="birStarHead">
						<image class="birStarHeadImg" :src="$app.getData('userStar').head_img_s"></image>
						<image src="https://mmbiz.qpic.cn/mmbiz_png/CbJC0icY3Ezb27WAMHWqxDwIiawjQugzBQqbiaA8Naia78bBibL8b93K7KgOayCggEiaarjxBmhtJ2g8WZ0NDnLn6aQw/0"></image>
						<image src="https://mmbiz.qpic.cn/mmbiz_png/CbJC0icY3Ezb27WAMHWqxDwIiawjQugzBQOiaavsVDC4nsQnnaWtPg5ib4TuEiaArLsTJTz8cV6bKZSHURyHpTcUXBw/0"
						 mode="aspectFit" class="birStarCake"></image>
					</view>
					<view class="birContent">
						<view style="font-size: 40rpx;" class="birMarginLg"><text style="color: #fa8281;">{{$app.getData('userStar').name}}</text>生日快乐</view>

						<view v-if="$app.chargeSwitch()!=1" class="birMarginLg">
							<view>爱豆生日专属特权</view>今日购买礼物可获得<text style="color: #D42D00;">双倍</text>
						</view>
						<view v-if="$app.chargeSwitch()==2" class="birMarginLg">
							<view class="birButton">
								<btnComponent type="default">
									<button class="flex-set" style="width: 300rpx;height: 80rpx;" open-type="contact" :session-from="$app.getData('userInfo')"
									 @tap="modal = ''">回复“1”去购买</button>
								</btnComponent>
							</view>
						</view>
						<view v-if="$app.chargeSwitch()==0" class="birMarginLg">
							<view class="birButton">
								<btnComponent type="default">
									<button class="flex-set" style="width: 300rpx;height: 80rpx;" @tap="modal = '',$app.goPage('/pages/charge/charge')">去充值</button>
								</btnComponent>
							</view>
						</view>
						<view v-if="$app.chargeSwitch()==1" class="birMarginLg">
							<view class="birButton">
								<btnComponent type="default">
									<button @tap="modal = ''" class="flex-set" style="width: 300rpx;height: 80rpx;">我知道了</button>
								</btnComponent>
							</view>
						</view>
					</view>
				</view>
			</block>
			<block v-else>
				<image class="main" :src="$app.getData('config').index_banner.img_url" mode="aspectFill" @tap="modal='';$app.goPage($app.getData('config').index_banner.gopage)"></image>
			</block>
			<view class="close-btn flex-set iconfont iconclose" @tap="modal = ''"></view>
		</view>

		<view class="open-ad-container flex-set" v-if="modal=='qrcode'">
			<image class="main" :src="$app.getData('config').webmodal" @tap="preimg($app.getData('config').webmodal)" mode="aspectFill"></image>
			<view class="close-btn flex-set iconfont iconclose" @tap="modal = ''"></view>
		</view>


	</view>

</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import bannerComponent from '@/components/bannerComponent.vue';
	import btnComponent from '@/components/btnComponent.vue';
	import listItemComponent from '@/components/listItemComponent.vue';
	export default {
		components: {
			bannerComponent,
			btnComponent,
			listItemComponent,
			modalComponent,
		},
		data() {
			return {
				modal: 'indexBanner',
				showBottomLoading: true,
				requestCount: 1,

				cutOffDate: '', // 截止日期
				searchHide: false,
				currentTab: 0,

				page: 1,
				keywords: '',
				rankField: 'week_hot',
				sign: 0,
				rankList: this.$app.getData('index_rankList') || [],

				bannerList: [],
				sList: [],
				muti: false,
			};
		},

		onLoad(option) {
			// 显示精灵tab小红点
			uni.showTabBarRedDot({
				index: 1
			})
			this.getSunday()

			if (option.path) {
				console.log(unescape(option.path))
				return this.$app.goPage(unescape(option.path))
			}
			// 跳转到明星页
			if (option.starid) {
				this.starid = option.starid
				return this.goGroup(this.starid)
			}
		},
		onShow() {
			this.page = 1
			this.keywords = ''
			this.getRankList()
			this.getBannerList()
		},
		onShareAppMessage() {
			return this.$app.commonShareAppMessage()
		},
		onHide() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0,
			})
		},
		/**
		 * 下拉刷新
		 */
		onPullDownRefresh() {
			this.page = 1
			this.keywords = ''
			this.getRankList()
		},
		/**
		 * 上拉加载
		 */
		onReachBottom() {
			this.page++
			this.getRankList()
		},
		methods: {
			preimg(img) {
				uni.previewImage({
					current: 0,
					urls: [img.trim()],
					success: res => {
						console.log(res);
					}
				})
			},
			getSunday() {
				const time = new Date()
				const day = time.getDay() || 7
				time.setDate(time.getDate() - day + 7)
				this.cutOffDate = (time.getMonth() + 1) + '月' + time.getDate() + '日'
			},
			getLast() {
				var date = new Date();
				var currentMonth = date.getMonth();
				var nextMonth = ++currentMonth;
				var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
				var oneDay = 1000 * 60 * 60 * 24;
				let dateTime = new Date(nextMonthFirstDay - oneDay);

				this.cutOffDate = dateTime.getMonth() + 1 + '月' + dateTime.getDate() + '日'
			},
			/**
			 * 去偶像圈打榜
			 */
			goGroup(starid) {
				if (this.$app.getData('userStar', true)['id'] == starid) {
					this.$app.goPage('/pages/group/group')
				} else {
					this.$app.goPage('/pages/subPages/star/star?starid=' + starid)
				}
				return
			},
			/**
			 * 其他榜单（韩星榜）
			 */
			changeSign(sign) {
				this.page = 1
				this.sign = sign
				this.keywords = ''
				this.getRankList()
			},
			changeField(field) {
				this.page = 1
				this.rankField = field
				this.keywords = ''
				this.getRankList()
			},
			searchInput(e) {
				if (!this.keywords || !e.detail.value) this.rankList = []
				this.page = 1
				this.sign = 0
				this.keywords = e.detail.value
				this.getRankList()
			},
			searchToggle() {
				this.searchHide = !this.searchHide
				if (this.keywords) {
					this.keywords = ''
					this.page = 1
					this.sign = 0
					this.getRankList()
				}
			},

			// HTTP
			getBannerList() {
				this.$app.request(this.$app.API.BANNER_LIST, {}, res => {
					// 底部小banner
					this.sList = res.data.smallList

					const bannerList = []
					for (let v of res.data.bannerList) {
						bannerList.push({
							img: v.img_url,
							url: v.gopage,
						})
					}

					this.bannerList = bannerList
					if (this.bannerList.length > 2) {
						this.muti = true
					}
				})
			},
			getRankList() {
				this.showBottomLoading = true
				this.$app.request(this.$app.API.STAR_RANK, {
					page: this.page,
					rankField: this.rankField,
					keywords: this.keywords,
					sign: this.sign,
				}, res => {
					if (res.data.length < 10) {
						// 内容不足隐藏loadicon
						this.showBottomLoading = false
					}

					const rankList = []
					res.data.forEach(e => {
						const item = {}
						item.starid = e.star.id
						item.name = e.star.name
						item.avatar = e.star.head_img_s ? e.star.head_img_s : e.star.head_img_l
						item.hot = this.$app.formatNumberRgx(e[this.rankField])
						rankList.push(item)
					})
					if (this.page == 1) {
						this.rankList = rankList
						this.$app.setData('index_rankList', this.rankList)

					} else {
						// 追加data
						this.rankList = this.rankList.concat(rankList)
					}

					this.$app.closeLoading(this)
				})

			},
		}
	}
</script>

<style lang="scss" scoped>
	.index-container {


		padding: 90upx 20upx 0;
		/* #ifdef H5 */
		margin-bottom: 100upx;

		/* #endif */
		.top-tab-container {
			height: 70upx;
			color: $text-color-2;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			width: 100%;
			left: 0;
			margin-top: -90upx;
			z-index: 6;
			padding: 0 20upx;
			background-color: $text-color-1;

			.left-tab-group {
				font-size: 26upx;
				display: flex;

				.tab-item {
					margin-left: 10upx;
					margin-right: 30upx;
					position: relative;
				}

				.tab-item.active {
					font-size: 28upx;
				}

				.tab-item.active::before {
					position: absolute;
					content: "";
					height: 8upx;
					width: 50upx;
					border-radius: 14upx;
					bottom: -10upx;
					left: 50%;
					transform: translateX(-50%);
					background-color: $text-color-2;

				}
			}

			.right-search {
				margin: 0 10upx;
				position: relative;
				overflow: hidden;
				border-radius: 30upx;
				color: #FFF;

				input {
					background-color: $color_3;
					border-radius: 30upx;
					width: 300upx;
					height: 54upx;
					padding: 0 20upx;
					transform: translateX(100%);
					transition: transform .3s ease;
				}

				input.show {
					transform: translateX(0);
				}

				.iconfont {
					width: 54upx;
					height: 54upx;
					font-size: 40upx;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: 0;
					background-color: $color_3;

					z-index: 1;
					border-radius: 30upx;
				}


			}
		}

		.middle-text-container {
			display: flex;
			justify-content: space-between;
			color: $color_2;
			align-items: center;
			height: 96upx;

			view {
				padding: 0 10upx;
			}

			.rule::after {
				content: "\e6e5";
				font-family: "iconfont" !important;
				padding-left: 10upx;
			}
		}

		.topthree-container {
			height: 420upx;
			display: flex;
			justify-content: space-between;

			.content {
				width: 224upx;
				height: 100%;
				background-color: rgba($color_2, .3);
				border-radius: 10upx;
				display: flex;
				flex-direction: column;
				align-items: center;

				.crown {
					width: 82upx;
					height: 66upx;
					margin-top: 20upx;
				}

				.avatar {
					width: 160upx;
					height: 160upx;
					border-radius: 50%;
					margin-top: -10upx;
					position: relative;

					image {
						border-radius: 50%;
						width: 140upx;
						height: 140upx;
					}
				}

				.starname {
					margin-top: 10upx;
				}

				.hot {
					margin-top: 10upx;
					margin-bottom: 10upx;
					display: flex;
					align-items: center;
					color: $text-color-2;

					image {
						width: 30upx;
						height: 30upx;
						margin-left: 4upx;
					}
				}

				.button {
					margin-top: 16upx;
					color: #6F3309;
					border-radius: 10upx;
					width: 136upx;
					height: 68upx;
				}
			}
		}

		.rank-list-container {
			margin-top: 20upx;
			margin-left: -20upx;
			margin-right: -20upx;

			.rank-list-item {

				.left-container {
					line-height: 44upx;

					.bottom-text {
						display: flex;
						align-items: center;

						.hot-count {
							color: $color_2;
							margin-right: 4upx;
						}

						.icon-heart {
							width: 30upx;
							height: 30upx;
						}
					}
				}

				.right-container {
					margin-right: 40upx;
				}


			}


		}

		.open-ad-container {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 9;
			background-color: rgba(0, 0, 0, .6);
			flex-direction: column;

			.main {
				width: 540upx;
				height: 960upx;
				border-radius: 20upx;

			}

			.mains {
				width: 500rpx;
				height: 700upx;
				border-radius: 20upx;
				background-color: #FFFFFF;
				padding: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
				}

				.birStarHead {
					position: relative;
					top: -160rpx;
					right: -134rpx
				}

				.birStarHeadImg {
					border-radius: 50%;
					width: 135rpx;
					height: 135rpx;
					position: absolute;
					top: 58rpx;
					left: 30rpx;
				}

				.birStarCake {
					width: 200rpx;
					height: 200rpx;
					position: absolute;
					top: 288rpx;
					right: 260rpx;
				}

				.birContent {
					margin-top: 120rpx;
					text-align: center;
				}

				.birMarginLg {
					margin-top: 30rpx;
					font-weight: bold;

					.birButton {
						width: 300rpx;
						height: 80rpx;
						line-height: 80rpx;
						text-align: center;
						margin: 5rpx auto
					}
				}

				.birBuy {
					border-bottom: 2rpx solid #9C694D;
					font-size: 25rpx;
					width: 190rpx;
					margin: 0 auto;
				}
			}

			.close-btn {
				width: 80upx;
				height: 80upx;
				margin-top: 10upx;
				z-index: 10;
				border-radius: 50%;
				background-color: rgba(0, 0, 0, .5);
				color: #FFF;
				font-size: 45upx;
			}
		}
	}
</style>

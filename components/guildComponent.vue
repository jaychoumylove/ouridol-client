<template>
	<view class='guild-container'>
		<!-- <loadIconComponent v-if="showLoading" type='whole'></loadIconComponent> -->
		<!-- 新手指引 -->
		<view v-if="tips" class="tips-container" @tap="tips=false">
			<image class='image' src="/static/image/star/blank-5.png" mode="widthFix"></image>
		</view>

		<view class="top-container">
			<view class="top-content">
				<view class="danmaku-wrapper flex-set">

					<view class="danmaku" v-if="danmaku">
						<image class="avatar" :src="danmaku.avatarurl"></image>
						<view class="content">{{danmaku.content}}</view>
						<image class='tail' src='/static/image/guild/tail.png' />
					</view>
				</view>
				<view class="row-info">
					<view class="avatar-wrapper">
						<image class="avatar" :class="{share:this.app.getData('userStar').id == star.id}" :src="star.avatar" mode="aspectFill"
						 @tap="drawCanvas"></image>
						<!-- <view class="tips">分享海报</view> -->
						<view class="rank">{{star.name}}</view>
					</view>


					<view class="top-text-wrapper">
						<view class="star-name">
							<view class="star-name-wrapper text-overflow">NO.{{star.weekRank}}</view>
							<block v-if="!app.getData('userStar')['id'] || app.getData('userInfo').type == 1 && app.getData('userStar').id != star.id">
								<button v-if="!app.getData('userInfo')['nickname']" class="join flex-set" open-type="getUserInfo" @getuserinfo="getUserInfo">
									+加入
								</button>
								<button v-if="app.getData('userInfo')['nickname']" class="join flex-set" @tap="sendOrFollow">
									+{{app.getData('userInfo').type == 0? '加入':'切换'}}
								</button>
							</block>
						</view>
						<view class='bottom'>
							<image class='image' src="/static/image/index/ic_hot.png" mode=""></image>
							<!-- <view>{{star.weekHot}}</view> -->

							<countToComponent :count='star.weekHot'></countToComponent>
						</view>

						<view class="rank-list" @tap="app.goPage('/pages/user/rank/rank?starid='+star.id)">
							<view class="rank-list-container">
								<view class="item" v-for="(item,index) in userRankList" :key="index" v-if="index < 3">
									<image class="avatar-s" :src="item.avatar" mode="aspectFill"></image>
									<image class="badge" :src="'/static/image/guild/u'+(index+1)+'.png'" mode="widthFix"></image>
								</view>
							</view>
							<view class="more-btn">贡献榜></view>
						</view>
					</view>
					<!-- <view class="top-text-wrapper">
						<view class="star-name">本期 NO.{{star.weekRank}}</view>
						<view class='bottom'>
							<image class='image' src="/static/image/index/ic_hot.png" mode=""></image>
							<view>{{star.weekHot}}</view>
						</view>
					</view> -->

					<!-- 送人气按钮 -->
					<!-- <button class="sendflower-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">
						<image src="/static/image/guild/hart.png" mode=""></image>
					</button> -->
					<view class="send-flower-btn flex-set">
						<image class="bubble" src="/static/image/guild/hart.png" mode=""></image>

						<btnComponent>
							<button open-type="getUserInfo" v-if="!app.getData('userInfo').nickname" @getuserinfo="getUserInfo">
								<image src="/static/image/guild/send-give.png" mode=""></image>
							</button>
							<form report-submit @submit="sendOrFollow" v-else>
								<button form-type="submit">
									<image src="/static/image/guild/send-give.png" mode=""></image>
								</button>
							</form>

						</btnComponent>
					</view>

				</view>
			</view>

			<view class="func-container">
				<view class="func-list-wrapper">
					<view class="func-item" @tap="app.goPage('/pages/task/task')">
						<btnComponent>
							<view class="btn-wrap">
								<image src="/static/image/guild/t1.png" mode="widthFix"></image>
								<view class="badge-wrap" v-if="!app.isTaskAllDone">
									<badgeComponent size="8"></badgeComponent>
								</view>
							</view>
						</btnComponent>
						<view class="">任务</view>
					</view>

					<!-- <view class="func-item" @tap="modal='invit';invitListPage=1;getInvitList();">
						<btnComponent>
							<view class="btn-wrap">
								<image src="/static/image/guild/t3.png" mode="widthFix"></image>
								<view class="badge-wrap" v-if="spriteEarn">
									<badgeComponent size="8"></badgeComponent>
								</view>
							</view>
						</btnComponent>
						<view class="">好友</view>
					</view> -->
					<view class="func-item" @tap="getStarRank();modal = 'steal'">
						<btnComponent>
							<view class="btn-wrap">
								<image src="/static/image/star/2.png" mode="widthFix"></image>
							</view>
						</btnComponent>
						<view class="">偷能量</view>
					</view>
					<view class="func-item" @tap="goFather">
						<btnComponent>
							<view class="btn-wrap">
								<image src="/static/image/guild/t2.png" mode="widthFix"></image>
								<view class="badge-wrap" v-if="fatherEarn">
									<badgeComponent size="8"></badgeComponent>
								</view>
							</view>
						</btnComponent>
						<view class="">师徒</view>
					</view>
					<view class="func-item" @tap="invitFakePage=1;modal = 'invit_desert';getFakeInviteList()">
						<btnComponent>
							<image src="/static/image/guild/t3-1.png" mode="widthFix"></image>
						</btnComponent>
						<view class="">拉票</view>
					</view>
					<!-- <view class="func-item" @tap="app.goPage('/pages/group/dynamic/dynamic?starid='+star.id+'&starname='+star.name)">
						<btnComponent>
							<image src="/static/image/guild/t4.png" mode=""></image>
						</btnComponent>
						<view class="">动态</view>
					</view> -->
					<!-- <view class="func-item" @tap="isTreasure = Date.now()">
						<button open-type="share">
							<btnComponent>
								<image src="/static/image/guild/t5.png" mode=""></image>
							</btnComponent>
						</button>
						<view class="">{{treasureTime}}</view>
					</view> -->
					<view class="func-item" @tap="goMass">
						<btnComponent>
							<view class="btn-wrap">
								<image src="/static/image/guild/mass-1.png" mode="widthFix"></image>
								<view class="badge-wrap" v-if="mass.status==1">
									<badgeComponent size="8"></badgeComponent>
								</view>
							</view>
						</btnComponent>
						<view class="" v-if="mass.status==1">集结中</view>
						<view class="" v-else-if="mass.status==2">冷却中</view>
						<view class="" v-else>集结</view>
					</view>

				</view>
			</view>

			<view class="notice-container" @tap="app.goPage('/pages/notice/notice?id='+article.id)">
				<view class="left">
					<view class="sign">【公告】</view>
					<view class="content">{{article.name}}</view>
				</view>
				<view class="right" @tap.stop="app.goPage('/pages/notice/list/list')">更多>></view>
			</view>
		</view>
		<view class="active-container" @tap='goActive()'>
			<view class="active-inner flex-set">

				<view class="text">解锁应援金</view>
				<image class='hand' src="/static/image/pet/hand.png" mode="widthFix"></image>
				<view class="progress-wrap">
					<view class="progress">
						<progress v-if="activeInfo.join_people < activeInfo.active_info.target_people" stroke-width="10" activeColor="#007eff"
						 backgroundColor="#f8c4be" :percent="activeInfo.join_people/activeInfo.active_info.target_people*100" />
						<progress v-else activeColor="#ff0000" backgroundColor="#f8c4be" :percent="activeInfo.complete_people/activeInfo.active_info.target_people*100" />
					</view>
					<view class="progress-text">
						<view class="left" v-if="activeInfo.join_people < activeInfo.active_info.target_people">
							参与人数：<text style="color: #007eff;">{{activeInfo.join_people}}</text>
						</view>
						<view class="left" v-else>
							完成人数：<text style="color: #ff0000;">{{activeInfo.complete_people}}</text>
						</view>
						<view class="right">
							目标人数：<text style="color: #ff5cf7;">{{activeInfo.active_info.target_people}}</text>
						</view>
					</view>
				</view>
			</view>

		</view>
		<scroll-view v-if="star.id == app.getData('userStar')['id'] || app.getData('userInfo').type == 1" class="chart-container"
		 scroll-y scroll-with-animation :scroll-into-view="'index_'+index">

			<view :id="'index_'+index" class="msg-item" :class="{right:item.uid==app.getData('userInfo')['id']}" v-for="(item,index) in chartList"
			 :key="index">

				<view v-if="item.sendtime" class="sendtime-wrapper">
					{{item.sendtime}}
				</view>
				<view class="main-msg-wrapper">
					<view class="avatar" :class="{captain:item.captain == 1}">
						<image class="avatar-img" :src="item.avatar" mode="aspectFill"></image>
					</view>
					<view class="content">
						<view class="top">
							<view class="left">
								<view class="name text-overflow">{{item.nickname}}</view>
								<!-- <view class="fan">
									<image :src="'/static/image/guild/level/'+ item.level +'.png'" mode=""></image>
									<view class="level position-set">{{item.level}}</view>
								</view> -->

							</view>
						</view>

						<view class="bottom">
							<view class="msg-content">{{item.content}}</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="chart-container rank-list" v-else>
			<view class="item" v-for="(item,index) in userRankList" :key="index">
				<view class="rank-num">
					<image v-if="index<3" :src="'/static/image/guild/'+(index+1)+'.png'" mode="widthFix"></image>
					<view v-else>{{index+1}}</view>
				</view>
				<view class='avatar'>
					<image :src="item.avatar" mode="aspectFill"></image>
				</view>
				<view class="text-container">
					<view class="star-name text-overflow">{{item.nickname}}</view>

				</view>
				<!-- <view class="level">lv10</view> -->
				<view class="count">{{item.hot}}</view>

			</view>
		</view>
		<!-- <image v-if="star.id == app.getData('userStar')['id']" class="msg-button" @tap="msgModal = true" src="/static/image/guild/write-btn.png"
		 mode=""></image> -->

		<view class="msg-input-container" v-if="star.id == app.getData('userStar')['id']">
			<btnComponent>
				<view class="trumpet-wrapper">
					<image src="/static/image/guild/sayworld.png" mode="" @tap="sayworld"></image>
					<view class="trumpet">{{userCurrency.trumpet}}</view>
				</view>
			</btnComponent>
			<input type="text" :value="chartMsg" confirm-type="send" @confirm="sendMsg" @input="chartMsg = $event.detail.value"
			 placeholder="快来和小伙伴们聊天吧" />
			<btnComponent>
				<image src="/static/image/guild/sendmsg.png" mode="" @tap="sendMsg"></image>
			</btnComponent>
			<!-- <view class="send-btn-wrapper flex-set">
				<image class="bubble" src="/static/image/guild/hart.png" mode=""></image>

				<btnComponent>
					<form report-submit @submit="sendOrFollow">
						<button form-type="submit">
							<image src="/static/image/guild/send-give.png" mode=""></image>
						</button>
					</form>
				</btnComponent>
			</view> -->

		</view>

		<!-- 礼物 -->
		<view class="item-list-wrap">

			<view class="item-wrap" v-for="(item,index) in giftItemList" :key="index">
				<image class="avatar" :src="item.avatar" mode="widthFix"></image>
				<view class="text-wrap">
					<view class="name">{{item.username}}</view>
					<view class="desc">送出 <text>{{item.itemname}}</text></view>
				</view>
				<image :src="item.itemicon" class="item-content" mode="widthFix"></image>
			</view>
		</view>


		<!-- MODAL -->
		<modalComponent type="send" v-if="modal == 'send'" title="打榜" @closeModal="modal=''">
			<view class="send-modal-container">
				<!-- <view class="tab-wrapper"></view> -->
				<!-- <view class="explain-wrapper">说明：还未确定后完全好大无穷皇帝和我去我前进的气温降低哦</view> -->
				<view class="swiper-change flex-set">
					<view class="item" :class="{select:current==0}" @tap="current = 0">送能量</view>
					<view class="item" :class="{select:current==1}" @tap="current = 1">送礼物</view>
				</view>

				<!-- <swiper @change="swiperChange" :current="current"> -->
				<!-- <swiper-item> -->
				<view class="swiper-item" v-if="current == 0">
					<view class="wrap">
						<!-- <image class="bg" src="/static/image/guild/send-modal-bg.png" mode="widthFix"></image> -->
						<view class="bottom-wrapper">
							<view class="text left flex-set">我的能量：{{app.getData('userCurrency')['coin']}}</view>

							<!-- <view class="text flex-set" @tap="app.goPage('/pages/recharge/recharge')" v-if="!~app.getData('sysInfo').system.indexOf('iOS')">
										<image src="/static/image/guild/gift/gift.png" mode="widthFix" style="width: 40upx;"></image>补充能量
									</view>
									<button open-type="contact" :session-from="$app.getData('userInfo').id" v-if="~app.getData('sysInfo').system.indexOf('iOS')&&$app.getData('config').ios_switch == 1">
										<view class="text flex-set">
											<image src="/static/image/guild/gift/gift.png" mode="widthFix" style="width: 40upx;"></image>
											<view class="flex-set" style="flex-direction: column;margin-left: 4upx;line-height: 1.2;">
												<view>补充能量</view>
												<view>回复"1"</view>
											</view>
										</view>
									</button> -->

						</view>
						<view class="btn-wrapper">
							<view class="btn flex-set" @tap="sendHot(99)">
								<image src="/static/image/user/b1.png" mode="widthFix"></image>+99
							</view>
							<view class="btn flex-set" @tap="sendHot(520)">
								<image src="/static/image/user/b1.png" mode="widthFix"></image>+520
							</view>
							<view class="btn flex-set" @tap="sendHot(999)">
								<image src="/static/image/user/b1.png" mode="widthFix"></image>+999
							</view>
							<view class="btn flex-set" @tap="sendHot(1314)">
								<image src="/static/image/user/b1.png" mode="widthFix"></image>+1314
							</view>
							<view class="btn flex-set" @tap="sendHot(9999)">
								<image src="/static/image/user/b1.png" mode="widthFix"></image>+9999
							</view>
							<view class="btn flex-set" @tap="sendHot(66666)">
								<image src="/static/image/user/b1.png" mode="widthFix"></image>+66666
							</view>
							<view class="btn flex-set self-input">
								<input class="" @input="sendCount = $event.detail.value" type="number" placeholder="自定义数额" />
							</view>
							<view class="btn flex-set pick" @tap="sendHot()">PICK</view>
						</view>

					</view>
				</view>
				<view class="gift flex-set" @tap="app.goPage('/pages/recharge/recharge')" v-if="!~app.getData('sysInfo').system.indexOf('iOS')">
					<image src="/static/image/guild/gift/gift.png" mode="widthFix"></image>
					<view class="text">补充能量</view>

				</view>
				<button open-type="contact" class="gift flex-set" v-if="~app.getData('sysInfo').system.indexOf('iOS')&&$app.getData('config').ios_switch==1">
					<image src="/static/image/guild/gift/gift.png" mode="widthFix"></image>
					<view class="text">补充能量回复"1"</view>
				</button>
				<!-- </swiper-item> -->

				<!-- <swiper-item> -->
				<view class="swiper-item" v-if="current==1">
					<view class="wrap">

						<view class="btn-wrapper gift-s">
							<!-- 礼物列表 -->
							<view v-for="(item,index) in itemList" :key="index" class="gift-item flex-set" @tap="sendHot(item.id, 1)">
								<view class="num">
									<image src="/static/image/user/b1.png" mode="widthFix"></image>
									{{item.count}}
								</view>
								<image :src="item.icon" mode="widthFix"></image>
								<view class="name">{{item.name}}</view>
								<view class="self flex-set">{{item.self}}</view>
							</view>

						</view>

					</view>

				</view>
				<view class="gift flex-set" @tap="app.goPage('/pages/recharge/recharge')" v-if="!~app.getData('sysInfo').system.indexOf('iOS')">
					<image src="/static/image/guild/gift/gift.png" mode="widthFix"></image>
					<view class="text">补充能量</view>
				</view>
				<button open-type="contact" class="gift flex-set" v-if="~app.getData('sysInfo').system.indexOf('iOS')&&$app.getData('config').ios_switch==1">
					<image src="/static/image/guild/gift/gift.png" mode="widthFix"></image>
					<view class="text">补充能量回复"1"</view>
				</button>
				<!-- </swiper-item> -->
				<!-- </swiper> -->
			</view>
		</modalComponent>

		<modalComponent v-if="modal == 'steal'" title="偷能量" @closeModal="modal=''">
			<view class="steal-modal-container">
				<!-- <view class="tips-wrapper">飞机为of为副将我叫非法违法</view> -->
				<view class="list-wrapper">
					<view class="item" v-for="(item,index) in starRankList" :key="index" v-if="index<5">
						<view class='avatar'>
							<image :src="item.avatar" mode="aspectFill"></image>
						</view>
						<view class="text-container">
							<view class="star-name">{{item.name}}</view>
							<view class="bottom-text">
								<view class="hot-count">{{item.hot}}</view>
								<image class="icon-heart" src="/static/image/index/ic_hot.png" mode=""></image>
							</view>
						</view>
						<view class="steal-count flex-set">+{{item.steal_count}}
							<image src="/static/image/user/b1.png" mode="widthFix"></image>
						</view>
						<view class="btn" @tap="steal(item.starid,index,item.steal)">
							<btnComponent type="default">
								<view class="flex-set" style="width: 130upx;height: 65upx;">{{item.steal>0?item.steal:'偷取'}}</view>
							</btnComponent>
						</view>
					</view>
				</view>
			</view>
		</modalComponent>

		<modalComponent v-if="modal == 'invit_desert'" title="拉票" @closeModal="modal=''">
			<view class="invit-fake-modal-container">

				<view class="explain-wrapper">
					<view class="top">已邀请<text> {{hasInvitcount}} </text>人</view>
					<view class="bottom">被邀请人任意加入一个偶像圈即可领取奖励</view>
				</view>
				<scroll-view scroll-y class="list-wrapper" @scrolltolower="invitFakePage++;getFakeInviteList();">
					<view class="item" v-for="(item,index) in fakeinvitList" :key="index">
						<view class='avatar'>
							<image :src="item.avatar" mode="aspectFill"></image>
						</view>
						<view class="text-container">
							<view class="star-name">第{{index+1}}位好友</view>
							<view class="bottom-text">
								<view class="hot-count">能量+{{invitAward.coin}}</view>
								<view class="hot-count" v-if="invitAward.stone"> 灵丹+{{invitAward.stone}}</view>
							</view>
						</view>
						<view class="btn">
							<btnComponent v-if="item.status == 0" type="default">
								<button open-type="share">
									<view class="flex-set" style="width: 130upx;height: 65upx;">去邀请</view>
								</button>
							</btnComponent>
							<btnComponent v-if="item.status == 1" type="success" @tap="getInvitAward(item.uid,item.status,index)">
								<view class="flex-set" style="width: 130upx;height: 65upx;">去领取</view>
							</btnComponent>
							<btnComponent v-if="item.status == 2" type="disable">
								<view class="flex-set" style="width: 130upx;height: 65upx;">已领取</view>
							</btnComponent>
						</view>


					</view>




				</scroll-view>
			</view>

		</modalComponent>

		<modalComponent v-if="modal == 'mass'" title="集结" @closeModal="modal=''">
			<view class="mass-modal-container">
				<view class="explain-wrapper flex-set">{{$app.getData('config').share_mass.text}}</view>
				<view class="cutdown" v-if="mass.status==0">{{app.getData('config').share_mass.day_limit == mass.mass_times?'今日集结次数已达上限':app.getData('config').share_mass.tips_one}}</view>
				<view class="cutdown" v-if="mass.status==1">集结剩余时间：{{mass.lefttime}}</view>
				<view class="cutdown" v-if="mass.status==2">集结冷却时间：{{mass.lefttime}}</view>
				<view class="ava-wrapper">
					<view class="ava flex-set" v-for="(item,index) in mass.mass_user" :key="index">
						<image :src="item.user.avatarurl||app.AVATAR" mode="aspectFill"></image>
					</view>

					<button v-if="8-mass.mass_user.length>0" open-type="share" v-for="n in 8-mass.mass_user.length" :key="n" @tap="startMass"
					 data-share="2">
						<view class="ava flex-set">
							<view class="add-icon">+</view>
						</view>
					</button>
				</view>
				<view class="btn-wrapper">
					<btnComponent type="default" v-if="mass.status==0">
						<button open-type="share" @tap="startMass" data-share="2">
							<view class="flex-set" style="min-width: 180upx;height: 90upx;">新的集结</view>
						</button>
					</btnComponent>
					<btnComponent type="default" v-if="mass.status==1">
						<button open-type="share" @tap="startMass" data-share="2">
							<view class="flex-set" style="width: 180upx;height: 90upx;">继续集结</view>
						</button>
					</btnComponent>
					<btnComponent type="default" v-if="mass.status==2">
						<view class="flex-set" style="width: 180upx;height: 90upx;">冷却中</view>
					</btnComponent>
					<btnComponent type="default" v-if="mass.isSettle" @tap="settleMass">
						<view class="flex-set" style="width: 180upx;height: 90upx;">结算</view>
					</btnComponent>
				</view>
			</view>
		</modalComponent>

		<modalComponent v-if="modal == 'invit'" title="好友" @closeModal="modal=''">
			<view class="invit-modal-container">

				<scroll-view scroll-y class="list-wrapper" @scrolltolower='invitListPage++; getInvitList()'>

					<!-- <view class="explain-wrapper">
						<view class="flex-set">
							<image src="/static/image/ic_haibao__bak.png" mode="widthFix"></image>
							加好友一起养精灵
						</view>
						<btnComponent type="default">
							<button class="btn" open-type="share" data-share="1">
								<view class="flex-set" style="width: 160upx; height: 80upx;">邀请好友</view>
							</button>
						</btnComponent>
					</view> -->
					<button class='explain-wrapper' open-type="share" data-share="1">
						<image style="width: 100%;" :src="app.getData('config').zhuren_tips_img" mode="widthFix"></image>
					</button>

					<block v-if="invitList.length > 0">
						<view class="item" v-for="(item,index) in invitList" :key="index" @tap="goOther(item.uid)">
							<view class="rank-num">
								<image v-if="index<3" :src="'/static/image/guild/'+(index+1)+'.png'" mode="widthFix"></image>
								<view v-else>{{index+1}}</view>
							</view>
							<view class='avatar'>
								<image :src="item.avatar" mode="aspectFill"></image>
							</view>
							<view class="text-container">
								<view class="star-name text-overflow">{{item.nickname}}</view>
							</view>
							<view class="egg flex-set" @tap.stop="settleSprite(index,item)">
								<image v-if="item.earn > 2" class='hand' src="/static/image/pet/hand.png" mode="widthFix"></image>

								<view class="num-wrapper position-set">{{item.earn}}</view>
								<image class="flex-set" src="/static/image/pet/y5.png" mode="widthFix"></image>
							</view>
						</view>
					</block>

					<view v-else class="nodata flex-set">
						<view class="top">你还没有好友</view>
						<button open-type="share" data-share="1">
							<view class="bottom">加一位好友></view>
						</button>
					</view>

				</scroll-view>
			</view>

		</modalComponent>

		<modalComponent v-if="modal == 'sendOver'" title="提示" @closeModal="modal=''">
			<view class="tips-modal-container">
				<view class="text-wrap">

					<view class="text" style="font-size: 40upx;font-weight: 700;text-align: center;">打榜成功</view>
					<view class="text">1.做任务可以获得灵丹</view>
					<view class="text">2.邀请好友加入偶像圈可以获得灵丹</view>
					<view class="text">3.补充能量可以获得灵丹</view>
					<view class="text">更多获取方式快去任务界面查看吧</view>
				</view>
				<view class="row flex-set">
					<view class="btn" @tap="$app.goPage('/pages/task/task')">
						<btnComponent type="default">
							<view class="flex-set" style="width: 200upx;height: 100upx;">去做任务</view>
						</btnComponent>
					</view>
					<view class="btn">
						<btnComponent type="default">
							<button open-type="share">
								<view class="flex-set" style="width: 200upx;height: 100upx;">邀请好友</view>
							</button>
						</btnComponent>
					</view>
				</view>
			</view>

		</modalComponent>

		<view class="canvas-container flex-set" v-if="modal == 'canvas'">
			<canvas canvas-id='mycanvas' class="canvas"></canvas>

			<view class="btn-wrap">
				<button class='fsend-btn flex-set' open-type='share'>分享给好友</button>
				<view class="btn flex-set iconfont icon-icon-test1" @tap="modal = ''"></view>
				<view class='save-btn flex-set' @tap='saveCanvas'>保存到相册</view>
			</view>

		</view>
	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue'
	import listItemComponent from '@/components/listItemComponent.vue'
	import badgeComponent from '@/components/badgeComponent.vue'
	import countToComponent from '@/components/countToComponent.vue'
	export default {
		components: {
			modalComponent,
			btnComponent,
			listItemComponent,
			badgeComponent,
			countToComponent,
		},
		data() {
			return {
				app: this.$app,
				showLoading: true,
				requestCount: 7,
				tips: false,

				userCurrency: {},

				star: {
					weekRank: 0,
				},
				userRankList: [],
				chartList: [],
				index: -1, // 聊天窗位置
				modal: '', // 模态框名称
				chartMsg: '', // 聊天输入内容
				sendCount: 0, // 赠送人气数额
				starRankList: [],
				invitAward: {}, // 邀请奖励
				invitList: [], // 我的邀请列表
				invitNum: 10, // 拉票列表数量
				invitListPage: 1,
				hasInvitcount: 0,
				spriteEarn: false,
				rechargeList: [], // 充值商品列表
				danmaku: null, // 当前弹幕
				// treasureTime: '助力', // 助力倒计时
				// isTreasure: false,
				article: {}, // 公告文章

				mass: {}, // 集结相关

				fakeinvitList: [],
				invitFakePage: 1,
				fatherEarn: 0,

				activeInfo: {
					active_info: {
						target_people: 2000
					},
					can_card: true,
					complete_people: 0,
					join_people: 0,
				},
				current: 0,

				itemList: [],

				giftItemList: [],
				chartAni: '',
			};
		},
		created() {
			this.initDanmaku()
		},
		destroyed() {
			clearInterval(this.sayworldTimeId)
		},
		methods: {
			/**
			 * 加载数据
			 */
			load(starid) {
				this.current = 0
				this.star.id = starid
				if (!this.star.id) return

				if (this.$app.getData('userStar').id == this.star.id && this.$app.noob) {
					// 新手指引
					this.tips = true
					this.$app.noob = false
				}

				this.loadData()

				// this.getStarInfo()
				// this.getUserRank()
				// this.getChartList()
				// this.joinGroup()
				// this.getMass()
				// this.getInvitList()
				// this.treasureInterval()
				// this.getArticle()
				// this.checkFatherEarn()
				// this.getActiveInfo()

				this.userCurrency = this.$app.getData('userCurrency') || {
					coin: 0,
					stone: 0,
					trumpet: 0
				}

				// 分享计时
				// if (this.isTreasure) {
				// 	if (Date.now() - this.isTreasure > 5 * 1000) {
				// 		this.treasure()
				// 	} else {
				// 		this.$app.toast('请分享到不同的群')
				// 	}
				// 	this.isTreasure = false
				// }
			},
			unLoad() {
				this.leaveGroup()
			},
			loadData() {
				const clientId = this.$app.getData('clientId')
				if (!clientId) {
					this.$app.invokeSocket()
					setTimeout(() => {
						this.loadData()
					}, 1500)
				} else {
					this.$app.request('page/group', {
						starid: this.star.id,
						client_id: clientId,
					}, res => {
						// 明星信息
						setTimeout(() => {
							const star = res.data.starInfo

							this.star = {
								id: star.id,
								avatar: star.head_img_s ? star.head_img_s : star.head_img_l,
								name: star.name,
								weekHot: this.$app.formatNumberRgx(star.star_rank.week_hot),
								weekRank: star.star_rank.week_hot_rank,
								share_img: star.share_img,
								qrcode: star.qrcode,
							}
						}, 0)
						// 用户排行
						setTimeout(() => {
							const userRankList = []
							res.data.userRank.forEach((e, i) => {
								userRankList.push({
									avatar: e.user && e.user.avatarurl || this.$app.AVATAR,
									nickname: e.user && e.user.nickname || this.$app.NICKNAME,
									hot: e.thisweek_count,
								})
							})
							this.userRankList = userRankList
						}, 100)
						// 聊天
						setTimeout(() => {
							const chartList = []
							res.data.chartList.forEach((e, i) => {
								const item = {
									uid: e.user && e.user.id,
									avatar: e.user && e.user.avatarurl || this.$app.AVATAR,
									nickname: e.user && e.user.nickname || this.$app.NICKNAME,
									content: e.content,
									captain: e.user && e.user.user_star && e.user.user_star.captain || 0,
									level: e.level,
									sendtimeInt: this.$app.strToTime(e.create_time),
								}
								const leastTime = chartList[i - 1] && chartList[i - 1].sendtimeInt || 0
								if (item.sendtimeInt - leastTime > 60 * 5) {
									item.sendtime = e.create_time.slice(11)
								}

								chartList.push(item)
							})

							this.chartList = chartList
							this.$nextTick(function() {
								this.index = this.chartList.length - 1
							})
						}, 200)

						// 公告
						setTimeout(() => {
							this.article.name = res.data.article.name
							this.article.id = res.data.article.id
						}, 300)

						// 活动
						setTimeout(() => {
							this.activeInfo = res.data.activeInfo
						}, 400)

						// 其他
						setTimeout(() => {
							// 礼物列表
							this.itemList = res.data.itemList

							this.mass = res.data.mass

							if (res.data.mass.mass_user.length >= 3 && res.data.mass.mass_settle_time < res.data.mass.mass_start_time) {
								// 超过3个人可结算
								this.mass.isSettle = true
							}
							if (res.data.mass.lefttime) {
								// 倒计时
								let time = parseInt(res.data.mass.lefttime)
								this.mass.lefttime = this.$app.timeGethms(time).str.slice(3)
								clearInterval(this.$app.massTimeId)
								this.$app.massTimeId = setInterval(() => {
									this.mass.lefttime = this.$app.timeGethms(--time).str.slice(3)
									if (time <= 0) {
										clearInterval(this.$app.massTimeId)
										this.getMass()
									}
								}, 1000)
							}

							this.invitAward = res.data.invitList.award
							const resList = []
							this.spriteEarn = false
							res.data.invitList.list.forEach((e, i) => {
								resList.push({
									avatar: e.user && e.user.avatarurl || this.$app.AVATAR,
									status: e.status,
									uid: e.user && e.user.id || 0,
									nickname: e.user && e.user.nickname || this.$app.NICKNAME,
									earn: e.sprite.earn,
								})

								if (e.sprite.earn >= 100) {
									// 显示红点
									this.spriteEarn = true
								}
							})
							if (this.invitListPage == 1) {
								this.invitList = resList
							} else {
								this.invitList = this.invitList.concat(resList)
							}

							this.fatherEarn = res.data.fatherEarn
						}, 500)
					})
				}

			},
			swiperChange(e) {
				if (e.detail.source === 'touch') {
					this.current = e.detail.current
				}
			},
			itemEffect(data) {
				this.giftItemList.push(data)
			},
			goActive() {
				if (this.$app.getData('userStar').id) {
					if (this.$app.getData('userStar').id == this.star.id) {
						this.$app.goPage("/pages/active_one/active_one?starid=" + this.star.id)
					} else {
						this.$app.toast('请进入自己的偶像圈打卡')
					}
				} else {
					this.$app.toast('请先加入偶像圈')
				}
			},
			goFather() {
				if (this.$app.getData('userStar').id) {
					this.$app.goPage('/pages/father/father')
				} else {
					this.$app.toast('请先加入偶像圈')
				}
			},
			goMass() {
				if (this.$app.getData('userStar').id) {
					this.modal = 'mass';
					this.getMass();
				} else {
					this.$app.toast('请先加入偶像圈')
				}
			},
			openStealModal() {
				if (!this.$app.getData('userStar')['id']) {
					this.$app.toast('请先加入偶像圈')
				} else {
					this.modal = 'steal'
					this.getStarRank()
				}
			},

			getActiveInfo() {
				this.$app.request(this.$app.API.EXT_ACTIVEINFO, {
					starid: this.star.id
				}, res => {
					this.activeInfo = res.data
				})
			},
			checkFatherEarn() {
				this.$app.request(this.$app.API.USER_CHECKEARN, {}, res => {

					this.fatherEarn = res.data

				})
			},
			// 			treasure() {
			// 				if (this.treasureTime === '助力') {
			// 					this.$app.request(this.$app.API.TREASURE_SETTLE, {}, res => {
			// 						this.$app.toast('助力获得能量+' + res.data)
			// 						this.treasureInterval()
			// 
			// 						this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
			// 							this.$app.setData('userCurrency', res.data)
			// 						})
			// 					})
			// 				} else {
			// 					this.$app.toast('宝箱正在冷却中')
			// 				}
			// 
			// 			},
			// 			treasureInterval() {
			// 				this.$app.request(this.$app.API.TREASURE, {}, res => {
			// 					if (res.data !== 0) {
			// 						let time = res.data
			// 						this.treasureTime = this.$app.timeGethms(time).str.slice(4)
			// 
			// 						// 宝箱倒计时
			// 						clearInterval(this.$app.treasureTimeId)
			// 						this.$app.treasureTimeId = setInterval(() => {
			// 							this.treasureTime = this.$app.timeGethms(--time).str.slice(4)
			// 							if (time <= 0) {
			// 								clearInterval(this.$app.treasureTimeId)
			// 								this.treasureTime = '助力'
			// 							}
			// 						}, 1000)
			// 					} else {
			// 						this.treasureTime = '助力'
			// 					}
			// 
			// 					this.$app.closeLoading(this)
			// 				})
			// 			},
			settleSprite(index, item) {
				if (item.earn < 2) {
					this.$app.toast('TA的能量太少了，稍后再来吧')
				} else {
					this.$app.request(this.$app.API.SPRITE_SETTLE, {
						user_id: item.uid
					}, res => {
						this.invitList[index].earn = 0

						this.$app.toast('为TA收集能量，你获得:' + res.data + '能量')
						this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
							this.$app.setData('userCurrency', res.data)
						})
					}, 'POST', true)
				}
			},
			getLocalImg(src, callback) {
				if (~src.indexOf('http')) {
					uni.getImageInfo({
						src,
						success: function(res) {
							callback && callback(res.path)
						}
					})
				} else {
					callback && callback(src)
				}
			},
			// 绘制canvas海报
			drawCanvas() {
				if (this.star.id != this.$app.getData('userStar').id) return
				this.modal = 'canvas'
				var rate = this.$app.getData('sysInfo').windowWidth / 375 / 1.78
				var ctx = uni.createCanvasContext('mycanvas', this);
				// 绘制文字
				const drawText = function() {
					ctx.setFillStyle('#FFFFFF') //文字颜色

					ctx.setFontSize(18) //设置字体大小，默认10
					ctx.setTextAlign('center')
					ctx.fillText(this.$app.getData('config').canvas_title[0], 240 * rate, 200 * rate) //绘制文本
					ctx.fillText(this.$app.getData('config').canvas_title[1], 240 * rate, 250 * rate) //绘制文本

					ctx.fillText(this.star.name, 140 * rate, 632 * rate) //绘制文本

					ctx.setFontSize(10) //设置字体大小，默认10
					ctx.setTextAlign('left')
					ctx.fillText(`榜单排名:NO.${this.star.weekRank}`, 270 * rate, 616 * rate) //绘制文本
					ctx.fillText(`人气值:${this.star.weekHot}`, 270 * rate, 640 * rate) //绘制文本

					ctx.fillText(`我是${this.$app.getData('userInfo').nickname}`, 130 * rate, 774 * rate) //绘制文本
					ctx.fillText(`一起为${this.star.name}打榜`, 130 * rate, 804 * rate) //绘制文本
				}.bind(this)

				// 绘制图片
				// 背景
				uni.showLoading({
					title: "生成海报中"
				})
				this.getLocalImg('/static/image/canvas-bg.png', src => {
					ctx.drawImage(src, 0, 0, 480 * rate, 854 * rate);
					// 明星 
					this.getLocalImg(this.star.share_img || this.star.avatar, src => {
						ctx.drawImage(src, 48 * rate, 286 * rate, 382 * rate, 305 * rate);
						// 用户头像
						this.getLocalImg(this.$app.getData('userInfo').avatarurl || this.$app.AVATAR, src => {
							ctx.save() //保存当前的绘图上下文。
							ctx.beginPath() //开始创建一个路径
							ctx.arc(79 * rate, 784 * rate, 40 * rate, 0, 2 * Math.PI, false) //画一个圆形裁剪区域
							ctx.clip() //裁剪
							ctx.drawImage(src, 38 * rate, 744 * rate, 80 * rate, 80 * rate) //绘制图片
							ctx.restore() //恢复之前保存的绘图上下文
							// 二维码
							this.getLocalImg(this.$app.getData('qrcode') || this.$app.QRCODE, src => {
								ctx.save() //保存当前的绘图上下文。
								ctx.beginPath() //开始创建一个路径
								ctx.arc(400 * rate, 780 * rate, 50 * rate, 0, 2 * Math.PI, false) //画一个圆形裁剪区域
								ctx.clip() //裁剪
								ctx.drawImage(src, 350 * rate, 730 * rate, 100 * rate, 100 * rate);
								ctx.restore() //恢复之前保存的绘图上下文

								// 绘制文字
								drawText()
								// 绘制
								ctx.draw()

								uni.hideLoading()
							})
						})
					})
				})
			},
			//保存的画布
			saveCanvas: function() {
				// 将canvas内容生成临时图片
				uni.canvasToTempFilePath({
					canvasId: 'mycanvas',
					success: res => {
						// 保存图片到用户相册
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								this.$app.toast('保存成功', 'success')
							},
							fail: res => {
								this.$app.toast('保存失败')
							}
						});

					},
					fail: res => {
						this.$app.toast('将canvas内容生成临时图片失败')
						console.error(res)
					}
				}, this);
			},
			/**获取集结信息*/
			getMass() {
				this.$app.request(this.$app.API.SHARE_MASS, {}, res => {
					this.mass = res.data

					if (res.data.mass_user.length >= 3 && res.data.mass_settle_time < res.data.mass_start_time) {
						// 超过3个人可结算
						this.mass.isSettle = true
					}
					if (res.data.lefttime) {
						// 倒计时
						let time = parseInt(res.data.lefttime)
						this.mass.lefttime = this.$app.timeGethms(time).str.slice(3)
						clearInterval(this.$app.massTimeId)
						this.$app.massTimeId = setInterval(() => {
							this.mass.lefttime = this.$app.timeGethms(--time).str.slice(3)
							if (time <= 0) {
								clearInterval(this.$app.massTimeId)
								this.getMass()
							}
						}, 1000)
					}

					this.$app.closeLoading(this)
				})
			},
			startMass() {
				this.$app.request(this.$app.API.SHARE_STARMASS, {}, res => {})
			},
			settleMass() {
				this.modal = ''
				this.$app.request(this.$app.API.SHARE_SETTLEMASS, {}, res => {

					this.$app.toast('获得能量+' + res.data)
					this.getMass()
					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {

						this.$app.setData('userCurrency', res.data)
						this.userCurrency = this.$app.getData('userCurrency')
					})
				})
			},
			/**
			 * 收到推送信息
			 * 添加聊天内容
			 */
			addChartMsg(data) {
				const item = {
					uid: data.user_id,
					avatar: data.user && data.user.avatarurl || this.$app.AVATAR,
					nickname: data.user && data.user.nickname || this.$app.NICKNAME,
					content: data.content,
					captain: data.user && data.user.user_star && data.user.user_star.captain || 0,

					sendtimeInt: this.$app.strToTime(data.create_time),
				}
				const leastTime = this.chartList[this.chartList.length - 1] && this.chartList[this.chartList.length - 1].sendtimeInt ||
					0
				if (item.sendtimeInt - leastTime > 60 * 5) {
					// 3分钟以上显示时间
					item.sendtime = data.create_time.slice(11)
				}
				this.chartList.push(item)

				this.$nextTick(function() {
					this.index = this.chartList.length - 1
				})
			},
			// 偷花倒计时
			startStealTimeInterval(index) {
				this.$app.timeId.push(setInterval(() => {
					--this.starRankList[index].steal
				}, 1000))
			},
			// 定时显示弹幕
			initDanmaku() {
				clearInterval(this.sayworldTimeId)
				this.sayworldTimeId = setInterval(() => {
					this.danmaku = this.$app.danmakuQueue.shift() || null
				}, 10000)
			},

			// 喊话
			sayworld() {
				if (!this.chartMsg.trim()) return
				if (this.chartMsg.trim().length > 16) {
					this.$app.toast('内容过长')
					return
				}
				this.$app.request(this.$app.API.USER_SAYWORLD, {
					content: this.chartMsg.trim()
				}, res => {
					this.chartMsg = ''
					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						if (this.$app.getData('userCurrency')['trumpet'] == res.data.trumpet) {
							this.$app.toast('喊话失败，请稍后再试')
						} else {
							this.$app.toast('喊话成功', 'success')
						}
						this.$app.setData('userCurrency', res.data)
						this.userCurrency = this.$app.getData('userCurrency')
					})

				})
			},
			/**
			 * 保存用户详细信息
			 */
			getUserInfo(e) {
				const userInfo = e.detail.userInfo
				if (userInfo) {
					this.$app.request(this.$app.API.USER_SAVEINFO, {
						iv: e.detail.iv,
						encryptedData: e.detail.encryptedData,
					}, res => {
						this.$app.request(this.$app.API.USER_INFO, {}, res => {
							this.$app.setData('userInfo', res.data, true)
							this.sendOrFollow()
						})
					}, 'POST', true)
				}

			},
			/**偷能量*/
			steal(starid, index, steal) {
				if (steal > 0) return
				this.$app.request(this.$app.API.STAR_STEAL, {
					starid,
					index
				}, res => {
					this.$app.toast(`偷到了${res.data.count}能量`)

					this.getStarRank()
					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						this.$app.setData('userCurrency', res.data)
					})
				}, 'POST', true)
			},
			getInvitAward(uid, status, index) {
				if (status != 1) return
				this.$app.request(this.$app.API.USER_INVITAWARD, {
					ral_user_id: uid
				}, res => {
					this.fakeinvitList[index].status = 2
					this.$app.toast('领取成功')
					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						this.$app.setData('userCurrency', res.data)
					})
				}, 'POST', true)
			},
			goOther(uid) {
				this.modal = ''
				this.$app.goPage('/pages/pet/other/other?user_id=' + uid)
			},
			// 拉票
			getFakeInviteList() {
				this.$app.request(this.$app.API.USER_INVITLIST, {
					page: this.invitFakePage
				}, res => {
					this.invitAward = res.data.award
					this.hasInvitcount = res.data.hasInvitcount

					const resList = []
					res.data.list.forEach((e, i) => {
						resList.push({
							avatar: e.user && e.user.avatarurl || this.$app.AVATAR,
							status: e.status,
							uid: e.ral_user_id
						})
					})

					if (this.invitFakePage == 1) {
						this.fakeinvitList = resList
					} else {
						this.fakeinvitList = this.fakeinvitList.concat(resList)
					}

					// this.invitNum = 10
					// clearInterval(this.$app.invitNumTimeId)
					// this.$app.invitNumTimeId = setInterval(() => {
					// 	this.invitNum += 10
					// 	if (this.invitNum >= 100)
					// 		clearInterval(this.$app.invitNumTimeId)
					// }, 1000)

					this.$app.closeLoading(this)
				})
			},
			getInvitList() {
				this.$app.request(this.$app.API.USER_INVITLIST, {
					type: 1,
					page: this.invitListPage || 1
				}, res => {
					// this.invitAward = res.data.award
					// const resList = []
					// res.data.list.forEach((e, i) => {
					// 	// resList.push({
					// 	// 	avatar: e.user && e.user.avatarurl || this.$app.AVATAR,
					// 	// 	status: e.status,
					// 	// 	uid: e.ral_user_id
					// 	// })
					// 	
					// 	
					// })
					// this.invitList = resList

					this.invitAward = res.data.award
					const resList = []
					this.spriteEarn = false
					res.data.list.forEach((e, i) => {
						resList.push({
							avatar: e.user && e.user.avatarurl || this.$app.AVATAR,
							status: e.status,
							uid: e.user && e.user.id || 0,
							nickname: e.user && e.user.nickname || this.$app.NICKNAME,
							earn: e.sprite.earn,
						})

						if (e.sprite.earn >= 100) {
							// 显示红点
							this.spriteEarn = true
						}
					})
					if (this.invitListPage == 1) {
						this.invitList = resList
					} else {
						this.invitList = this.invitList.concat(resList)
					}


					this.$app.closeLoading(this)
				})
			},
			/**
			 * 贡献人气
			 */
			sendHot(count, type = 0) {
				if (count) this.sendCount = count
				if (!parseInt(this.sendCount)) {
					this.$app.toast('数额不正确')
					return
				}

				this.$app.request(this.$app.API.STAR_SENDHOT, {
					starid: this.star.id,
					hot: parseInt(this.sendCount),
					type: type,
				}, res => {
					if (res.data.nomore) {
						if (~this.$app.getData('sysInfo').system.indexOf('iOS')) {
							this.$app.toast(res.msg)
						} else {
							uni.showModal({
								title: '提示',
								content: res.msg,
								confirmText: '去购买',
								success: res => {
									res.confirm && this.$app.goPage('/pages/recharge/recharge')
								}
							})
						}
						return
					}
					this.modal = ''
					this.sendCount = 0
					this.getStarInfo()

					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						this.$app.setData('userCurrency', res.data)
					})
					this.$app.toast('打榜成功', 'success')

					if (type == 1) {
						// 减礼物
						for (let key in this.itemList) {
							const value = this.itemList[key]

							if (value.id == count) {
								this.itemList[key].self--
							}
						}
					}

				}, 'POST', true)
			},
			/**
			 * 发送留言
			 */
			sendMsg() {
				if (!this.chartMsg.trim()) return
				this.$app.invokeSocket()
				this.$app.request(this.$app.API.STAR_SENDMSG, {
					starid: this.star.id,
					content: this.chartMsg.trim(),
				}, res => {
					this.chartMsg = ''
				})
			},
			/**
			 * 加入明星偶像圈
			 */
			sendOrFollow(e) {
				if (!this.$app.getData('userInfo').nickname) {
					this.$app.toast('请先去个人中心点击头像进行授权')
					return
				}
				if (this.$app.getData('userStar')['id']) {
					if (this.$app.getData('userStar')['id'] == this.star.id) {
						// 打榜
						this.modal = 'send'

						// 保存formId
						const formId = e && e.detail && e.detail.formId || null

						if (formId && formId != 'the formId is a mock one') {
							this.$app.request(this.$app.API.EXT_SAVEFORMID, {
								formId
							})
						}
						return
					} else {
						if (this.$app.getData('userInfo').type == 0) {
							this.$app.toast(`不能为其他爱豆打榜`)
							return
						}
					}

				}
				// 加入偶像圈
				this.$app.modal(`每个人只能加入一个偶像圈\n是否加入${this.star.name}的偶像圈？`, () => {
					this.$app.request(this.$app.API.STAR_FOLLOW, {
						starid: this.star.id,
						rer_user_id: this.$app.getData('referrer'), // 推荐人
					}, res => {
						if (this.$app.getData('userInfo').type == 1) {
							// 管理员
							this.$app.token = ''
							this.$app.request(this.$app.API.USER_INFO, {}, res => {
								this.$app.setData('userInfo', res.data, true)
								this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
									this.$app.setData('userCurrency', res.data)
								})
								this.$app.request(this.$app.API.USER_STAR, {}, res => {
									this.$app.setData('userStar', res.data, true)
									this.$app.goPage('/pages/group/group')
								})
							})
						} else {
							this.$app.request(this.$app.API.USER_STAR, {}, res => {
								this.$app.setData('userStar', res.data, true)
								this.chartMsg = `大家好，我是${this.$app.getData('userInfo').nickname}，初来乍到，请多关照~`
								this.sendMsg()
								this.$app.goPage('/pages/group/group')
							})
						}


					}, 'POST', true)
				})

			},
			getStarInfo() {
				this.$app.request(this.$app.API.STAR_INFO, {
					starid: this.star.id
				}, res => {
					const star = res.data

					this.star = {
						id: star.id,
						avatar: star.head_img_s ? star.head_img_s : star.head_img_l,
						name: star.name,
						weekHot: this.$app.formatNumberRgx(star.star_rank.week_hot),
						weekRank: star.star_rank.week_hot_rank,
						share_img: star.share_img, // 海报图片
						qrcode: star.qrcode,
					}
					this.$app.closeLoading(this)
				})
			},
			getArticle() {
				this.$app.request(this.$app.API.ARTICLE, {}, res => {
					this.article.name = res.data.name
					this.article.id = res.data.id
					this.$app.closeLoading(this)
				})
			},
			getStarRank() {
				// 偷花
				this.$app.request(this.$app.API.STAR_RANK, {
					type: 1
				}, res => {
					console.log('steal', this.$app.timeId);
					// 清除steal倒计时定时器
					if (!this.$app.timeId) this.$app.timeId = []
					for (let v of this.$app.timeId) {
						clearInterval(v)
					}
					this.$app.timeId = []
					const resList = []
					let index = 0
					res.data.list.forEach((e, i) => {
						if (i < 6 && e.star.id != this.$app.getData('userStar')['id']) {
							resList.push({
								starid: e.star.id,
								name: e.star.name,
								steal_count: res.data.steal_count,
								avatar: e.star.head_img_s ? e.star.head_img_s : e.star.head_img_l,
								hot: this.$app.formatNumberRgx(e['week_hot']),
								steal: res.data.steal[index]
							})
							if (res.data.steal[index] > 0) {
								this.startStealTimeInterval(index)
							}
							index++
						}
					})

					this.starRankList = resList
				})
			},
			getUserRank() {
				this.$app.request(this.$app.API.USER_RANK, {
					starid: this.star.id,
				}, res => {
					const resList = []
					res.data.forEach((e, i) => {
						resList.push({
							avatar: e.user && e.user.avatarurl || this.$app.AVATAR,
							nickname: e.user && e.user.nickname || this.$app.NICKNAME,
							hot: e.thisweek_count,
						})
					})
					this.userRankList = resList

					this.$app.closeLoading(this)
				})
			},

			getChartList() {
				this.$app.request(this.$app.API.STAR_CHART, {
					starid: this.star.id,
				}, res => {
					const resList = []
					res.data.forEach((e, i) => {
						const item = {
							uid: e.user && e.user.id,
							avatar: e.user && e.user.avatarurl || this.$app.AVATAR,
							nickname: e.user && e.user.nickname || this.$app.NICKNAME,
							content: e.content,
							captain: e.user && e.user.user_star && e.user.user_star.captain || 0,
							sendtimeInt: this.$app.strToTime(e.create_time),
						}
						const leastTime = resList[i - 1] && resList[i - 1].sendtimeInt || 0
						if (item.sendtimeInt - leastTime > 60 * 5) {
							item.sendtime = e.create_time.slice(11)
						}

						resList.push(item)
					})

					this.chartList = resList
					this.$nextTick(function() {
						this.index = this.chartList.length - 1
					})

					this.$app.closeLoading(this)
				})
			},
			/**
			 * 加入聊天室
			 */
			joinGroup() {
				const clientId = this.$app.getData('clientId')
				if (!clientId) {
					this.$app.invokeSocket()
					setTimeout(() => {
						this.joinGroup()
					}, 1500)
				} else {
					this.$app.request(this.$app.API.STAR_JOINCHART, {
						star_id: this.star.id,
						client_id: clientId,
					}, res => {
						this.$app.closeLoading(this)
					})
				}
			},
			leaveGroup() {
				const clientId = this.$app.getData('clientId')
				if (clientId) {
					this.$app.request(this.$app.API.STAR_LEAVECHART, {
						star_id: this.star.id,
						client_id: clientId,
					}, res => {})
				}
			}
		}

	}
</script>

<style lang="scss" scoped>
	.guild-container {
		display: flex;
		flex-direction: column;
		height: 100%;

		.hand {
			width: 80upx;
			height: 80upx;
			animation: scale 1s linear infinite;
		}

		@keyframes scale {

			0%,
			100% {
				transform: scale(0.9);
			}

			50% {
				transform: scale(1.1);
			}

		}

		.tips-container {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 2;
			background: rgba(#000, 0.8);

			image {
				width: 100%;
				position: absolute;
				right: -15upx;
				top: 0;
			}

		}

		.top-container {

			.top-content {
				border-top-left-radius: 10upx;
				border-top-right-radius: 10upx;

				.danmaku-wrapper {
					height: 50upx;

					@keyframes sayworld {
						0% {
							transform: translateX(750rpx);
						}

						10%,
						90% {
							transform: translateX(0);
						}

						100% {
							transform: translateX(-750rpx);
						}
					}

					.danmaku {
						margin-top: 10upx;
						display: flex;
						animation: sayworld 10s linear infinite;
						align-items: center;
						position: relative;

						.avatar {
							width: 44upx;
							height: 44upx;
							border-radius: 50%;
							position: absolute;
							left: -20upx;
						}

						.content {
							background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK4AAAA5CAYAAACvbxAVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAK5JREFUeNrs1rEJhQAQRMFTLtDYhmzVKgxFfqaFGIiJWIAN/Fg4mClhecE2se1LQC1TDn032oFi1rzuxwyUkyFcCmpNgHBBuCBchAvCBeEiXBAuCBeEi3BBuCBchAvCBeEiXBAuCBeEi3BBuCBchAvCBeEiXBAuCBeEi3BBuCBchAvCBeEiXBAuCBeEi3BBuCBchAvCBeEiXBAuCBf+yPjNVqBguOdhBVwF+MIrwAClLQyb1cy8aQAAAABJRU5ErkJggg==);
							background-size: 100% 100%;
							padding-left: 30upx;
							padding-right: 10upx;
							font-size: 26upx;
							color: #FFF;
							height: 38upx;
							line-height: 38upx;
						}

						.tail {
							position: absolute;
							width: 44upx;
							height: 44upx;
							top: 50%;
							transform: translateY(-50%);
							right: -39upx;
						}
					}
				}

				.row-info {
					padding: 0 40upx;
					display: flex;
					justify-content: space-around;
					align-items: center;
					height: 220upx;

					.avatar-wrapper {
						text-align: center;
						position: relative;

						.avatar {
							position: relative;
							overflow: hidden;
							border-radius: 50%;
							width: 150upx;
							height: 150upx;
							margin-bottom: 8upx;
							border: 6upx solid #f7ab5f;
							z-index: 1;
						}

						.avatar.share::after {
							content: "召集打榜";
							position: absolute;
							width: 100%;
							background-color: rgba(0, 0, 0, .3);
							bottom: 0;
							left: 0;
							height: 40upx;
							color: #fff;
							font-size: 22upx;
							text-align: center;
							z-index: 2;

						}

						.rank {
							font-weight: 700;
							font-size: 34upx;
							height: 50upx;

						}
					}

					.top-text-wrapper {
						color: $color_1;
						width: 280upx;
						display: flex;
						flex-direction: column;
						justify-content: center;
						line-height: 1.7;

						.star-name {
							font-size: 36upx;
							font-weight: 700;
							display: flex;
							align-items: center;

							.star-name-wrapper {
								background-color: #FF2C3C;
								border-radius: 30rpx;
								font-size: 28rpx;
								font-weight: 700;
								color: #FFF;
								padding: 0rpx 30rpx;
								line-height: 1.5;

							}

							.join {
								background-color: #f7ab5f;
								border-radius: 30upx;
								font-size: 28upx;
								font-weight: 300;
								color: #FFF;
								padding: 0upx 16upx;
								margin: 0 14upx;
								box-shadow: 0 0 2upx rgba(0, 0, 0, .3);
								position: relative;
								z-index: 4;
							}

						}

						.bottom {
							margin-top: 5upx;
							display: flex;
							align-items: center;
							font-size: 34upx;

							.image {
								width: 34upx;
								height: 34upx;
								margin-right: 10upx;
							}
						}

						.rank-list {
							display: flex;

							.rank-list-container {
								display: flex;

								.item {
									position: relative;
									margin-right: 4upx;

									.avatar-s {
										width: 46upx;
										height: 46upx;
										border-radius: 50%;

									}

									.badge {
										position: absolute;

										bottom: -4upx;
										right: -4upx;

										width: 22upx;
										height: 22upx;

									}
								}
							}

							.more-btn {
								padding: 0 10upx;
								padding-top: 6upx;
								color: $color_1;
							}

						}


					}

					.send-flower-btn {
						width: 120upx;
						position: relative;
						z-index: 3;

						image {
							width: 120upx;
							height: 120upx;
						}

						.bubble {
							width: 40upx;
							height: 40upx;
							position: absolute;
							z-index: 1;
							animation: up 8s linear infinite;
						}

						@keyframes up {
							0% {
								transform: translateY(0);
								opacity: 0;
							}

							10% {
								transform: translateY(-100upx) rotate(30deg);
								opacity: 1;
							}

							20%,
							100% {
								transform: translateY(-200upx) rotate(-30deg);
								opacity: 0;

							}
						}
					}
				}
			}

			.func-container {
				height: 100upx;
				overflow: hidden;
				display: flex;
				align-items: center;
				background-color: #FFF;
				position: relative;

				.func-list-wrapper {
					height: 100%;
					background-color: $color_3;
					display: flex;
					justify-content: space-around;
					width: 100%;

					.func-item {
						font-size: 24upx;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						position: relative;

						.btn-wrap {
							position: relative;

							.badge-wrap {
								position: absolute;
								top: 10upx;
								right: 10upx;
							}

						}

						image {
							width: 60upx;
							height: 60upx;
						}
					}

				}

				.lottery-btn {
					transform: translateY(-50%) rotate(45deg);
					position: absolute;
					color: #FFF;
					font-size: 18upx;
					height: 180upx;
					width: 180upx;
					right: 0;
					top: 50%;

					.wrapper {
						transform: translate(-50%, -50%) rotate(-45deg);
						position: absolute;

						image {
							width: 94upx;
							height: 94upx;
							position: relative;
						}

						.text1 {
							position: absolute;
							left: 50%;
							transform: translateX(-50%);
							bottom: 24upx;
						}

						.countdown {
							position: absolute;
							left: 50%;
							bottom: 4upx;
							transform: translateX(-50%);
						}
					}
				}
			}

			.notice-container {
				padding: 0 20upx;
				color: $color_2;
				font-size: 24upx;
				height: 54upx;
				display: flex;
				justify-content: space-between;
				// background-color: #9974b5;
				align-items: center;
				box-shadow: 0 0 1px rgba(0, 0, 0, .3);

				.left {
					display: flex;
				}

			}
		}

		.active-container {
			background: url(data:image/png;base64,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);
			height: 80upx;
			padding: 10upx;

			.active-inner {
				background-color: #FFF;
				border-radius: 30upx;
				height: 100%;



				.text {
					// font-size: 34upx;
					color: #bd076b;
					font-weight: 700;
					padding: 0 20upx;
				}

				.progress-wrap {
					padding: 0 20upx;
					width: 400upx;

					.progress {
						border-radius: 30upx;
						overflow: hidden;
					}

					.progress-text {
						display: flex;
						justify-content: space-between;
						font-size: 24upx;
					}
				}
			}
		}

		.chart-container {
			flex: 1;
			overflow-y: auto;
			position: relative;

			.msg-item {
				padding: 16upx 32upx;
				// display: flex;

				.sendtime-wrapper {
					text-align: center;
					color: #999;
					font-size: 24upx;
				}

				.main-msg-wrapper {
					display: flex;

					.avatar {
						width: 80upx;
						height: 80upx;
						margin-right: 10upx;
						margin-left: 10upx;
						position: relative;

						.avatar-img {
							border-radius: 50%;
						}
					}

					.avatar.captain::after {
						content: "团长";
						position: absolute;
						background-color: rgba(#F99152, .8);
						border-radius: 12upx;
						padding: 0 4upx;
						color: #FFF;
						font-size: 20upx;
						right: 0;
						bottom: 0;
					}


					.content {
						flex: 1;

						.top {
							display: flex;
							justify-content: space-between;
							align-items: center;

							.left {
								display: flex;
								align-items: center;

								.name {
									max-width: 250upx;
								}

								.fan {
									display: flex;
									align-items: center;
									margin-left: 10upx;
									position: relative;

									image {
										width: 32upx;
										height: 32upx;
									}

									.level {
										color: #FFF;
										font-size: 16upx;
										top: 40%;
									}

									.fan-text {
										background: linear-gradient(to right, #FFF, #ffcccc);
										border-radius: 20upx;
										color: #fd9176;
										font-size: 24upx;
										padding: 2upx 12upx;
										margin-left: -12upx;
									}

								}

							}

							.right {
								color: #999;
								font-size: 22upx;
							}
						}

						.bottom {
							display: flex;

							.msg-content {
								margin-top: 2upx;
								background-color: #f0f0f0;
								color: #979797;
								border-radius: 14upx;
								padding: 10upx 30upx;
								max-width: 470upx;
								word-break: break-all;
								display: block;
							}
						}
					}

				}
			}

			.msg-item.right {
				.main-msg-wrapper {
					flex-direction: row-reverse;

					.top {
						flex-direction: row-reverse;
					}

					.bottom {
						flex-direction: row-reverse;

						.msg-content {
							background-color: #97c7db;
							color: #FFF;

						}
					}
				}

			}

			.msg-item:first-of-type {
				padding-top: 32upx;

			}

			.msg-item:last-of-type {
				padding-bottom: 32upx;
			}

		}

		.chart-container.rank-list {

			.item {
				margin: 20upx 0;
				height: 130upx;
				background: url(http://wx1.sinaimg.cn/large/0060lm7Tly1g2enrl619ng30j703n741.gif) right center no-repeat/contain;
				display: flex;
				align-items: center;

				.rank-num {
					image {
						width: 40upx;
						min-height: 40upx;
					}

					margin-left: 110upx;
				}

				.avatar image {
					margin-left: 60upx;
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
				}

				.text-container {
					margin-left: 30upx;
					width: 250upx;
					line-height: 44upx;

					.bottom-text {
						display: flex;
						align-items: center;
						color: $color_2;
					}
				}

				.level {
					// margin-left: 30upx;
				}

				.count {
					margin-left: 30upx;
				}


			}

		}

		.msg-button {
			position: fixed;
			right: 30upx;
			bottom: 30upx;
			width: 83upx;
			height: 81upx;
		}

		.msg-input-container {
			display: flex;
			justify-content: space-between;
			position: relative;
			bottom: 0;
			left: 0;
			background-color: #d8d9db;
			right: 0;
			align-items: center;
			height: 100upx;

			padding: 0 15upx;

			.trumpet-wrapper {
				position: relative;

				.trumpet {
					position: absolute;
					right: -10upx;
					top: 0upx;
					font-size: 20upx;
				}
			}

			input {
				width: 550upx;
				background-color: #FFF;
				border-radius: 60upx;
				height: 75upx;
				padding: 0 30upx;
				margin: 10upx 0;
			}

			image {
				width: 75upx;
				height: 75upx;

			}

			.send-btn-wrapper {
				height: 100%;
				border-top-left-radius: 60upx;
				border-bottom-left-radius: 60upx;
				background-color: $color_0;
				width: 100upx;


				.bubble {
					width: 40upx;
					height: 40upx;
					position: absolute;
					z-index: 1;
					animation: up 8s linear infinite;
				}

				@keyframes up {
					0% {
						transform: translateY(0);
						opacity: 0;
					}

					10% {
						transform: translateY(-100upx) rotate(30deg);
						opacity: 1;
					}

					20%,
					100% {
						transform: translateY(-200upx) rotate(-30deg);
						opacity: 0;

					}
				}
			}
		}

		@keyframes itemAni {
			0% {
				transform: translate(0);
			}

			10% {
				transform: translate(-100%);
			}

			90% {
				transform: translate(-100%);
				opacity: 1;
			}

			100% {
				transform: translate(-100%, -100upx);
				opacity: 0;
			}
		}

		.item-list-wrap {
			position: fixed;
			height: 300upx;
			width: 100%;
			top: 50%;
			transform: translate(100%, -50%);
			right: 0;
			background-color: rgba(0, 0, 0, .3);
			display: flex;
			flex-direction: column;
			justify-content: flex-end;

			.item-wrap {
				height: 60upx;
				position: absolute;
				left: 0;
				display: flex;
				align-items: center;
				background: linear-gradient(to right, rgba(#FEEEB2, 0.9), rgba(#FEEEB2, 0.1));
				border-radius: 50upx;

				animation: itemAni 8s ease-in-out forwards;

				.avatar {
					width: 60upx;
					height: 60upx;
					border-radius: 50%;
				}

				.text-wrap {
					display: flex;
					justify-content: space-around;
					flex-direction: column;
					font-size: 24upx;
					padding: 0 10upx;
					color: #777;

					.name {
						color: #DC6B0C;
					}

					.desc text {
						color: #DC6B0C;
					}
				}

				.item-content {
					width: 150upx;
				}
			}
		}

		.send-modal-container {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			// .tab-wrapper{
			// 	height: 50upx;
			// }
			.explain-wrapper {
				font-size: 24upx;
			}

			.swiper-change {
				margin: 30upx;
				border-radius: 30upx;
				overflow: hidden;
				box-shadow: 0 2upx 4upx rgba(0, 0, 0, .3);

				.item {
					width: 200upx;
					height: 70upx;
					line-height: 70upx;
					background-color: #f5f5f5;
					color: #ff648d;
					text-align: center;

				}

				.item.select {
					background-color: #ff648d;
					color: #f5f5f5;

				}

			}

			swiper {
				width: 100%;
				height: 100%;

				swiper-item {
					z-index: 2;
				}
			}

			.swiper-item {
				flex: 1;

				.wrap {
					position: relative;
					padding: 0 20upx;
					width: 100%;
				}
			}



			.btn-wrapper {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.btn {
					border-radius: 10upx;
					margin: 8upx 0;
					width: 180upx;
					height: 90upx;
					background-color: #fac8cd;

					image {
						width: 40upx;
						height: 40upx;
					}
				}

				.gift-item {
					padding: 10upx 20upx;
					width: 140upx;
					flex-direction: column;
					position: relative;
					font-size: 24upx;

					image {
						width: 100upx;
						height: 100upx;
						position: relative;
					}

					.num {
						display: flex;
						align-items: center;
						position: absolute;
						border-radius: 20upx;
						right: 10upx;
						top: 88upx;
						font-size: 20upx;
						background-color: rgba(250, 250, 250, .3);
						z-index: 2;

						image {
							width: 22upx;
							height: 22upx;
						}
					}

					.name {
						color: #ff648d;
					}


					.self {
						position: absolute;
						right: 10upx;
						top: 10upx;
						border-radius: 50%;
						background-color: rgba(50, 50, 50, .3);
						color: #FFF;
						width: 30upx;
						height: 30upx;
						font-size: 20upx;
						z-index: 2;
					}
				}

				.btn.self-input {
					width: 372upx;

					input {
						// background-color: $color_3;
						border-radius: 60upx;
						width: 100%;
						height: 110upx;
						text-align: center;
						line-height: 110upx;
					}
				}

				.btn.pick {
					font-size: 34upx;
					font-weight: 700;
					background-color: #f8648a;
					color: #FFF;
				}
			}

			.btn-wrapper.gift-s {
				padding: 0 40upx;
			}

			.bottom-wrapper {
				padding-bottom: 20upx;
				display: flex;
				justify-content: space-between;
				font-size: 28upx;
				align-items: center;

				.text {
					border-radius: 10upx;
					background-color: #fac8cd;
					width: 180upx;
					height: 90upx;
				}

				.text.left {
					width: 100%;
				}

			}

			.gift {
				position: absolute;
				right: 40upx;
				bottom: 30upx;
				font-size: 32upx;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 50upx;
					height: 50upx;
					margin-right: 10upx;
				}

				.text {
					border-bottom: 2upx solid $color_1;
				}
			}

		}

		.steal-modal-container {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;

			.tips-wrapper {
				padding: 10upx 30upx;
				background-color: #fb648d;
				border-radius: 30upx;
				color: #FFF;
			}

			.list-wrapper {
				.item {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					padding: 10upx 20upx;
					border-radius: 60upx;
					background-color: rgba(255, 255, 255, .3);
					margin: 10upx;

					.rank-num {
						width: 90upx;
						text-align: center;
					}

					.avatar image {
						width: 90upx;
						height: 90upx;
						border-radius: 50%;
					}

					.text-container {
						width: 220upx;
						padding: 0 30upx;
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

					.steal-count {
						margin-right: 20upx;

						image {
							width: 40upx;
							min-height: 40upx;
						}
					}


				}

			}
		}

		.invit-modal-container {

			width: 100%;
			height: 100%;
			position: absolute;

			display: flex;
			flex-direction: column;

			.explain-wrapper {
				display: flex;
				justify-content: space-between;
				align-items: center;

				// image {
				// 	width: 50upx;
				// 	margin: 10upx 40upx;
				// }
			}

			.list-wrapper {
				overflow-y: auto;
				height: 100%;
				display: flex;
				flex-direction: column;

				.item {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					padding: 10upx 20upx;
					border-radius: 60upx;
					background-color: rgba(255, 255, 255, .3);
					margin: 10upx;

					.rank-num {
						width: 90upx;
						text-align: center;

						image {
							width: 40upx;
							min-height: 40upx;
						}
					}

					.avatar {
						image {
							width: 90upx;
							height: 90upx;
							border-radius: 50%;
						}
					}



					.text-container {
						width: 300upx;
						padding: 0 30upx;
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

					.egg {
						margin-right: 20upx;
						position: relative;

						.hand {
							position: absolute;
							z-index: 2;
							right: -15upx;
							bottom: -15upx;
						}

						.num-wrapper {
							z-index: 1;
							color: #FFF;
						}

						image {
							width: 60upx;
							min-height: 60upx;
						}
					}
				}

				.nodata {
					height: 400upx;
					flex-direction: column;

					.bottom {
						color: $color_2;
						font-size: 40upx;
					}
				}
			}

		}

		.invit-fake-modal-container {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;

			.explain-wrapper {
				padding: 20upx;

				.top {
					font-size: 34upx;
					font-weight: 700;

					text {
						color: orange;
					}
				}

				.bottom {
					font-size: 22upx;
				}
			}

			.list-wrapper {
				overflow-y: auto;
				height: 480upx;

				.item {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					padding: 10upx 20upx;
					border-radius: 60upx;
					background-color: rgba(255, 255, 255, .3);
					margin: 10upx;

					.rank-num {
						width: 90upx;
						text-align: center;
					}

					.avatar image {
						width: 90upx;
						height: 90upx;
						border-radius: 50%;
					}

					.text-container {
						width: 300upx;
						padding: 0 30upx;
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



				}

			}

		}

		.mass-modal-container {
			height: 100%;
			width: 100%;
			position: absolute;
			display: flex;
			flex-direction: column;
			align-items: center;

			.explain-wrapper {
				width: 100%;

				padding: 20upx;
			}

			.cutdown {
				// border: 2upx solid #000;
				// border-top: none;
				padding: 10upx 20upx;
				border: 4upx dotted $color_1;
				border-radius: 20upx;
			}

			.ava-wrapper {
				flex: 1;
				overflow-y: scroll;
				display: flex;
				margin: 20upx;
				flex-wrap: wrap;
				align-items: center;

				.ava {
					margin: 20upx;
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
					border: 2upx solid $color_1;
					font-size: 50upx;
					overflow: hidden;
					z-index: 1;

					image {
						border-radius: 50%;
					}
				}
			}

			.btn-wrapper {
				padding: 40upx 60upx;
				display: flex;
				justify-content: space-around;
				width: 100%;
			}
		}

		.tips-modal-container {
			height: 100%;
			padding: 20upx 40upx;
			font-size: 32upx;

			.text-wrap {
				.text {
					line-height: 2.3;
				}

				margin: 30upx 0;
			}


			.btn {
				width: 200upx;
				margin: auto;
			}
		}

		.canvas-container {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 9;
			background-color: rgba(0, 0, 0, .5);
			flex-direction: column;

			.canvas {
				width: 540upx;
				height: 960upx;
			}

			.btn-wrap {
				margin-top: 20upx;
				display: flex;
				justify-content: space-around;
				width: 100%;

				.fsend-btn {
					background-color: #0EC52F;
					font-size: 32upx;
					color: #FFF;
					padding: 0 20upx;
				}

				.save-btn {
					background-color: #FF7E00;
					border-radius: 10upx;
					font-size: 32upx;
					color: #FFF;
					padding: 0 20upx;
				}

				.btn {
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
	}
</style>

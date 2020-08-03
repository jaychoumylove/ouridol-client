<template>
	<view class="pet-container">
		<view class="top-row-container">

			<!-- <view class="left-wrap">
				<view class="row flex-set">
					<image class="coin-img" src="/static/image/user/b1.png" mode="widthFix"></image>
					<view class="">
						<view class="">累计获得：</view>
						<view class="count flex-set">
							<view class="num" :class="{active:blockScale}">{{spriteInfo.total_coin}}</view>
							<image v-if="useCard" class="icon m" src="/static/image/prop/2.png" mode="widthFix"></image>
							<text v-if="blockScale" class="top-num">+{{addCount}}</text>
						</view>
					</view>
				</view>
				<view class="row bottom">产能：<text style="color:#F00;">{{spriteInfo.earnPer}}</text>能量/<text style="color:#F00;">100</text>秒</view>
			</view> -->
			<view class="btn-wrap flex-set">
				<view class="button-wrap flex-set" @tap="$app.goPage('/pages/prop/prop')">
					<image src="/static/image/pet/btn.png" mode="widthFix"></image>
					<view class="text">精灵加速2小时</view>
				</view>
				<view class="button-wrap flex-set" @tap="tapSprite">
					<image src="/static/image/pet/btn.png" mode="widthFix"></image>
					<view class="text">提高精灵等级</view>
				</view>
			</view>

		</view>

		<view class="left-container">
			<btnComponent>
				<image @tap="openInvitModal" src="/static/image/pet/add.png" mode="widthFix"></image>
			</btnComponent>
			<view class="add-text">好友</view>

			<view class="friend-wrapper">
				<image @tap="openInvitModal" v-for="(item,index) in invitList" :key="index" v-if="index<3" :src="item.avatar" mode="aspectFill"></image>
				<!-- 				<image @tap="goOther(item)" v-for="(item,index) in invitList" :key="index" v-if="index<3" :src="item.avatar" mode="widthFix"></image> -->
			</view>

			<!-- <btnComponent>
				<image src="/static/image/pet/help.png" mode="widthFix" @tap="$app.goPage('/pages/notice/notice?id=2')"></image>
			</btnComponent> -->
		</view>


		<view class="sprite" @tap="tapSprite">
			<image class="sprite-shengji" v-if="userCurrency.stone>=spriteInfo.need_stone" src="https://mmbiz.qpic.cn/mmbiz_png/CbJC0icY3Ezb27WAMHWqxDwIiawjQugzBQI5l7my9NtKXb24uYftUYBxicVnwDlicuylKQFumpdoEuMLYK4BNvG3JA/0" mode="widthFix"></image>
			<view class="bounce-article">
				<image class="sprite-main" :src="spriteInfo.sprite_img" mode="widthFix"></image>
				
			</view>

			<view class="skill-container position-set" :class="{show:skillShow}">
				<btnComponent>
					<view class="skill-wrapper one" @tap="openSkillModal(1)">
						<image class="skill" src="/static/image/pet/skillone.png" mode="widthFix"></image>
						<!-- <view class="skill-level">{{spriteInfo.skillone_level}}</view> -->
					</view>
				</btnComponent>
			</view>
		</view>

		<view class="nav-container">
			
			<!--排行-->
			<!-- <btnComponent>
				<image src="/static/image/pet/rank.png" mode="widthFix" @tap="modal = 'help_open_box_rank';getOpenBoxRankList()"></image>
			</btnComponent> -->
			<btnComponent>
				<image src="/static/image/pet/rank.png" mode="widthFix" @tap="$app.goPage('/pages/pet/rank/rank')"></image>
			</btnComponent>

			<!--宝箱-->
			<btnComponent>
				<image src="/static/image/pet/treasure_box.png" mode="widthFix" @tap="treasure_box()"></image>
			</btnComponent>

			<!--道具-->
			<btnComponent>
				<image src="/static/image/pet/prop.png" mode="widthFix" @tap="$app.goPage('/pages/prop/prop')"></image>
			</btnComponent>

			<!--帮助-->
			<btnComponent>
				<image src="/static/image/pet/help.png" mode="widthFix" @tap="$app.goPage('/pages/notice/notice?id=2')"></image>
			</btnComponent>

		</view>

		<!-- <view class="egg-upgrade" v-if="!spriteInfo.earn" @tap="modal = 'egg_upgrade'">
			<image src="/static/image/pet/egg_upgrade.png" mode="widthFix"></image>
		</view> -->
		<view class="earn-container" @tap="is_settle">
			<view class="egg flex-set">
				<view class="num-wrapper position-set">{{spriteInfo.earn}}</view>
				<image class="flex-set" :src="spriteInfo.egg_info?spriteInfo.egg_info.icon:'/static/image/pet/egg/egg_1.png'" mode="widthFix"></image>
				<view class="progress flex-set">
					<view class="progress-bar" :style="{width:earnCuttime + '%'}"></view>
					{{earnCuttime}}
				</view>
				
			</view>
			<image class="mountain" src="/static/image/pet/y3.png" mode="widthFix"></image>
			<view class="hand-wrap position-set">
				<image class='flex-set' :class="[ spriteInfo.earn?'bubble':'bubble1' ]" src="/static/image/pet/bubble.png" mode="widthFix"></image>
				<image class='hand' v-if="spriteInfo.earn" src="/static/image/pet/hand.png" mode="widthFix"></image>
			</view>
		</view>
		
		<view class="bottom-container">
			<image class="avatarurl" :src="$app.getData('userInfo').avatarurl" mode="aspectFill"></image>
			<view class="sprite-level">
				<view class="sprite-level-info">
					<view class="lv">Lv.{{spriteInfo.sprite_level}}</view>
					<view class="progress">
						<view class="progress-bar" :style="{width:userCurrency.stone / spriteInfo.need_stone * 100 + '%'}"></view>
						<view class="text position-set">
							{{userCurrency.stone>=spriteInfo.need_stone?'可升级！':userCurrency.stone +'/'+ spriteInfo.need_stone}}
						</view>
					</view>
				</view>
				
				<view class="bottom-tips" @tap.stop="modal = 'tips'">如何获得灵丹升级</view>
			</view>
			<view class="right-wrap">
				<view class="row">
					<view style="display: flex;flex-direction: row;">
						<view class="">累计获得：</view>
						<view class="count flex-set">
							<view class="num" :class="{active:blockScale}">{{spriteInfo.total_coin}}</view>
							<image v-if="useCard" class="icon m" src="/static/image/prop/2.png" mode="widthFix"></image>
							<text v-if="blockScale" class="top-num">+{{addCount}}</text>
						</view>
					</view>
				</view>
				<view class="row bottom">产能:<text style="color:#EEADCC;">{{spriteInfo.earnPer}}能量/100秒</text></view>
			</view>
			
		</view>
		

		<!-- <modalComponent v-if="modal == 'invit'" title="好友" @closeModal="modal=''">
			<view class="invit-modal-container">

				<scroll-view scroll-y class="list-wrapper">

					<view class="explain-wrapper">
						<view class="flex-set">
							<image src="/static/image/ic_haibao__bak.png" mode="widthFix"></image>
							加好友一起养精灵
						</view>
						<button class="btn" open-type="share" data-share="1">
							<btnComponent type="default">
								<view class="flex-set" style="width: 160upx; height: 80upx;">邀请好友</view>
							</btnComponent>
						</button>
					</view>
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
							<view class="egg flex-set">
								<view class="num-wrapper position-set">{{item.earn}}</view>
								<image class="flex-set" src="/static/image/pet/y5.png" mode="widthFix"></image>
							</view>
						</view>
					</block>
					<view v-else class="nodata flex-set" style="margin: 40upx 0;">
						帮好友收能量，自己也能获得额外能量奖励
					</view>
				</scroll-view>
			</view>

		</modalComponent> -->

		<modalComponent v-if="modal == 'invit'" title="好友" @closeModal="modal=''">
			<view class="invit-modal-container">
		
				<scroll-view scroll-y class="list-wrapper" @scrolltolower='invitListPage++; getInvitList()'>
		
					<view class="explain-wrapper">
						<view style="display: flex; align-items: center;">
							<text>本月好友互动榜</text>
							<image @tap="modal = 'intimacy_tips'" style="width: 40rpx;padding-left: 10rpx;" src="/static/image/pet/notice_box.png" mode="widthFix"></image>
						</view>
						<view class="bottom flex-set">
							<view>当前好友数<text>{{friendTotal}}/100</text>人</view>
		
							<btnComponent type="default">
								<button class="btn" open-type="share" data-share="1">
									<view class="flex-set" style="font-weight: 700 ;width: 140upx; height: 60upx;">邀请好友</view>
								</button>
							</btnComponent>
							<!-- <image src="/static/image/ic_haibao__bak.png" mode="widthFix"></image> -->
							<!-- 加好友一起养精灵 -->
						</view>
					</view>
					<!-- <button class='explain-wrapper' open-type="share" data-share="1">
						<image style="width: 100%;" :src="$app.getData('config').zhuren_tips_img" mode="widthFix"></image>
					</button> -->
		
					<block v-if="invitList.length > 0">
						<view class="item" v-for="(item,index) in invitList" :key="index">
							<view class="rank-num">
								<image v-if="index<3" :src="'/static/image/guild/'+(index+1)+'.png'" mode="widthFix"></image>
								<view v-else>{{index+1}}</view>
							</view>
							<view class='avatar' @tap="goOther(item)">
								<image :src="item.avatar" mode="aspectFill"></image>
							</view>
							<view class="text-container">
								<view class="star-name text-overflow">{{item.nickname}}</view>
								<view style="font-size: 24rpx;">互动值:{{item.intimacy?item.intimacy:0}}</view>
							</view>
							<view class="egg flex-set" v-if="treasure_box_times>0" @tap="open_other_treasure_box(item.uid)">
								<image class="flex-set" src="/static/image/pet/treasure_box_close.png" mode="widthFix"></image>
								<view class="num-wrapper">{{item.treasure_box_count?item.treasure_box_count:0}}/5</view>
							</view>
							<view class="egg flex-set" v-else @tap="treasure_box_times_tips(item.uid)">
								<image class="flex-set" src="/static/image/pet/treasure_box_close.png" mode="widthFix"></image>
								<view class="num-wrapper">{{item.treasure_box_count?item.treasure_box_count:0}}/5</view>
							</view>
							<image @tap.stop="deleteFriend(item,index)" class="del" src="/static/image/guild/del.png" mode="widthFix"></image>
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
		
		<modalComponent v-if="modal == 'help_open_box_rank'" title="排行" @closeModal="modal='';rankList=[];rankListPage=1">
			<view class="invit-modal-container">

				<scroll-view scroll-y class="list-wrapper" @scrolltolower='rankListPage++; getOpenBoxRankList()'>
					<view class="explain-wrapper" style="padding: 20rpx;">
						<view style="font-size: 28rpx; font-weight: bold;">助力开箱排行榜(每日更新)</view>
						<view style="display: flex; justify-content: space-between; align-items: center;">
							<view>我的排名:{{my_help_open_rank}}</view>
							<view>助力开箱:{{my_help_open_times}}次</view>
						</view>
					</view>
					<block v-if="rankList.length > 0">
						<view class="item" v-for="(item,index) in rankList" :key="index">
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
							<view style="flex: 1 1 0%;font-size: 12px;display: flex;align-items: center;flex-direction: column;justify-content: flex-end;">
								<view>助力开箱</view>
								<view>{{item.help_open_times}}次</view>
							</view>	
						</view>
					</block>

					<view v-else class="nodata flex-set">
						<view class="top">暂时无人上榜</view>
					</view>
				</scroll-view>
			</view>
		</modalComponent>
		
		<modalComponent v-if="modal == 'treasure_box_times_tips'" title="提示" @closeModal="modal='invit';help_friend_id = ''">
			<view class="tips-modal-container">
				<view class="text-wrap" style="text-align: center;">
					<view class="text" style="font-size: 32upx;font-weight: 700;">次数用尽</view>
					<view class="text">每人每天只能免费帮别人开5次宝箱</view>
					<view class="text">可用20灵丹帮助开启</view>
				</view>
				<view class="flex-set">
					<view class="btn" style="width: 240rpx;" @tap="open_other_treasure_box(help_friend_id);">
						<btnComponent type="pink">
							<view class="flex-set" style="width: 240upx;height: 80upx; font-size: 24rpx;">花费20灵丹开启</view>
						</btnComponent>
					</view>
				</view>
			</view>
		
		</modalComponent>
		
		<modalComponent v-if="modal == 'intimacy_tips'" title="说明" @closeModal="modal='invit'">
			<view class="tips-modal-container">
				<view class="text-wrap">
		
					<view class="text">互动值说明</view>
					<view class="text">1.帮好友开一次宝箱互动值加1</view>
					<view class="text">2.解除好友关系，互动值清零</view>
				</view>
				
			</view>
		
		</modalComponent>
		
		<modalComponent v-if="modal == 'skill'" :title="modalTitle" @closeModal="modal=''">
			<view class="skill-modal-container">

				<scroll-view scroll-y class="list-wrapper">
					<view class="item" v-for="(item,index) in skillList" :key="index">
						<!-- <view class="rank-num">
							<view>Lv{{item.level}}</view>
						</view> -->
						<view class='avatar'>
							<image :src="item.avatar" mode="aspectFill"></image>
							<view class="badge flex-set">{{item.level}}</view>
						</view>
						<view class="text-container">
							<view class="star-name">{{item.desc}}</view>
							<view class="bottom">{{item.need_stone}}</view>
						</view>
						<btnComponent type="css" v-if="item.status != 1">
							<view class="flex-set" style="width: 130upx;height: 60upx;" @tap="skillUpgrade">升级</view>
						</btnComponent>
					</view>

				</scroll-view>
			</view>
		</modalComponent>

		<modalComponent v-if="modal == 'tips'" title="提示" @closeModal="modal=''">
			<view class="tips-modal-container">
				<view class="text-wrap">

					<view class="text" style="font-size: 40upx;font-weight: 700;text-align: center;">如何获得灵丹</view>
					<view class="text">1.做任务可以获得灵丹</view>
					<view class="text">2.邀请好友加入偶像圈可以获得灵丹</view>
					<view class="text">3.补充能量可以获得灵丹</view>
					<view class="text">更多获取方式快去任务界面查看吧</view>
				</view>
				<view class="flex-set">
					<view class="btn" @tap="$app.goPage('/pages/subPages/task/task')">
						<btnComponent type="css">
							<view class="flex-set" style="width: 200upx;height: 80upx;">去做任务</view>
						</btnComponent>
					</view>
					<view class="btn" v-if="$app.chargeSwitch()==0" @tap="$app.goPage('/pages/recharge/recharge')">
						<btnComponent type="css">
							<view class="flex-set" style="width: 200upx;height: 80upx;">补充能量</view>
						</btnComponent>
					</view>
				</view>
			</view>

		</modalComponent>

		<modalComponent v-if="modal == 'tips_t'" title="提示" @closeModal="modal=''">

			<view class="tips-modal-container-s">
				<view class="text-wrap">
					<image src="/static/image/user/blank.png" mode="widthFix"></image>
					<view class="text">好友已经很久没有打榜了</view>
					<view class="text">提醒TA一起为偶像打榜</view>
					<view class="text">才能帮TA收取能量</view>
				</view>
				<btnComponent type="css">
					<button open-type="share">
						<view class="flex-set" style="padding: 20upx 40upx;">唤醒好友</view>
					</button>
				</btnComponent>
			</view>

		</modalComponent>

		<listModalComponent v-if="modal == 'egg_upgrade'" title="我的能量蛋" @closeModal="modal=''">

			<view class="upgrade-modal-container">
				<view class="title">当前:{{spriteInfo.egg_info.name}}</view>
				<view class="show_img">
					<view class="flash"></view>
					<image :src="spriteInfo.egg_info?spriteInfo.egg_info.icon:'/static/image/pet/egg/egg_1.png'" mode="widthFix"></image>
				</view>
				<view style="display: flex;flex-direction: row;width: 100%; align-items: center; justify-content: space-around;">
					<view class="text-wrap" v-if="spriteInfo.next_egg_info.level">
						<view style="padding: 10rpx;">
							<view class="text title-text">当前等级lv.{{spriteInfo.egg_info.level}}</view>
							<view class="text">可储存能量时间:{{spriteInfo.egg_info.storage_time}}小时</view>
						</view>
						<view style="padding: 10rpx;">
							<view class="text title-text">下一等级lv.{{spriteInfo.next_egg_info.level}}</view>
							<view class="text">可储存能量时间:{{spriteInfo.next_egg_info.storage_time}}小时</view>
						</view>
					</view>
					<view class="text-wrap" v-else>
						<view style="padding: 10rpx;">
							<view class="text title-text">当前等级lv.{{spriteInfo.egg_info.level}},已是顶级</view>
							<view class="text">可储存能量时间:{{spriteInfo.egg_info.storage_time}}小时</view>
						</view>
						
					</view>
					<view class="button" @tap="egg_upgrade(2)" v-if="spriteInfo.next_egg_info.level">
						<btnComponent type="default">
							<view class="flex-set" style="width: 240upx;height: 60upx;">升级 {{spriteInfo.next_egg_info.need_stone}}灵丹</view>
						</btnComponent>
					</view>
				</view>

			</view>

		</listModalComponent>
		
		<modalComponent v-if="modal == 'open_treasure_box_tips'" title="打开宝箱" @closeModal="treasure_box();openBoxData = ''">
		
			<view class="open-box-modal-container">
				<view class="top" v-if="openBoxData.type==0">今日24:00失效</view>
				<view class="top" v-else-if="openBoxData.type==1">每周日24:00清零</view>
				<view class="top" v-else></view>
				<view class="show_img">
					<image style="width: 100%;" src="/static/image/pet/open_box.png" mode="widthFix"></image>
					<image style="width: 180rpx; position: absolute; bottom: 0%; left: 15%;" :src="openBoxData.imgsrc?openBoxData.imgsrc:'https://mmbiz.qpic.cn/mmbiz_png/CbJC0icY3EzYDtytnskVf0eZwtl4xVKmxFdAicib8taV6ibQUzC8R0Ule7TxB2L1PMr1reibsPbkGEv1wfp5DYNftMg/0'" mode="widthFix"></image>
				</view>
		
				<view class="text-wrap">
					<view class="text">获得:<text style="color: #F75A73;">[{{openBoxData.prizeName?openBoxData.prizeName:''}}]+{{openBoxData.num?openBoxData.num:''}}</text></view>
					<view class="text"><text style="color: #AAA7A7; font-size: 24rpx;">{{openBoxData.desc?openBoxData.desc:''}}</text></view>
				</view>
				<view class="button" @tap="treasure_box();openBoxData = ''">
					<btnComponent type="pink">
						<view class="flex-set" style="width: 240upx;height: 80upx;">确认收到</view>
					</btnComponent>
				</view>
		
			</view>
		
		</modalComponent>
		
		<modalComponent v-if="modal == 'is_settle_tips'" title="收取能量" @closeModal="modal = ''">
		
			<view class="is-settle-modal-container">
				<view class="top">领取收益</view>
				
				<view class="show_img">
					<image style="width: 100%;" src="/static/image/user/b1.png" mode="widthFix"></image>
				</view>
		
				<!-- <view class="text-wrap">
					<view class="text"><text style="color: #F75A73;">{{spriteInfo.earn}}能量</text></view>
				</view> -->
				<view class="button">
					<btnComponent type="receive" @tap="settle();modal = ''">
						<view class="flex-set" style="width: 240upx;height: 80upx;">直接领取</view>
					</btnComponent>
					<btnComponent type="default" @tap="modal = 'useCard7'">
						<view class="flex-set" style="width: 240upx;height: 80upx;">双倍领取</view>
					</btnComponent>
				</view>
				<view style="width: 100%; display: flex; justify-content: space-around; font-weight: bold; font-size: 32rpx;">
					<view>
						<text style="color: #dbd8d8;">{{spriteInfo.earn}}能量</text>
					</view>
					<view>
						<text style="color: #F75A73;">{{spriteInfo.earn*2}}能量</text>
					</view>
				</view>
		
			</view>
		
		</modalComponent>
		
		<modalComponent v-if="modal == 'useCard7'" title="使用" @closeModal="modal = ''">
		
			<view class="is-settle-modal-container">
				<view class="top" v-if="spriteInfo.isExistCard7">确认使用<text style="color: #F75A73;">【领能量双倍卡】</text></view>
				<view class="top" v-else>您还没有<text style="color: #F75A73;">【领能量双倍卡】</text></view>
				
				<view class="show_img">
					<image style="width: 100%;" src="https://mmbiz.qpic.cn/mmbiz_png/CbJC0icY3EzbjrPQMia78VPbkz3u8NehbpCzTL4ftpqRWRroyyqTJz3icbmZfrpuFK2Ezc8WqYwSoRia0AptbSjTWQ/0" mode="widthFix"></image>
				</view>
		
				<view class="text-wrap">
					<view class="text" v-if="spriteInfo.isExistCard7">你将获得<text style="color: #F75A73;">{{spriteInfo.earn*2}}</text>能量</view>
				</view>
				<view class="button">
					<btnComponent type="disable" @tap="modal = 'is_settle_tips'">
						<view class="flex-set" style="width: 240upx;height: 80upx;">取消</view>
					</btnComponent>
					<btnComponent v-if="spriteInfo.isExistCard7" type="default" @tap="is_exist_card7();modal = ''">
						<view class="flex-set" style="width: 240upx;height: 80upx;">确认</view>
					</btnComponent>
					<btnComponent v-else type="default" @tap="$app.goPage('/pages/prop/buy/buy');modal = ''">
						<view class="flex-set" style="width: 240upx;height: 80upx;">去看看</view>
					</btnComponent>
				</view>
		
			</view>
		
		</modalComponent>
		
		<modalComponent v-if="modal == 'open_other_treasure_box_tips'" title="帮助好友开箱" @closeModal="modal = 'invit';openOtherBoxData = ''">
		
			<view class="open-box-modal-container">
				<view class="top" v-if="openOtherBoxData.type==0">今日24:00失效</view>
				<view class="top" v-else-if="openOtherBoxData.type==1">每周日24:00清零</view>
				<view class="top" v-else></view>
				<view class="show_img">
					<image style="width: 100%;" src="/static/image/pet/open_box.png" mode="widthFix"></image>
					<image style="width: 180rpx; position: absolute; bottom: 0%; left: 15%;" :src="openOtherBoxData.imgsrc?openOtherBoxData.imgsrc:'https://mmbiz.qpic.cn/mmbiz_png/CbJC0icY3EzYDtytnskVf0eZwtl4xVKmxFdAicib8taV6ibQUzC8R0Ule7TxB2L1PMr1reibsPbkGEv1wfp5DYNftMg/0'" mode="widthFix"></image>
				</view>
		
				<view class="text-wrap">
					<view class="text">开箱成功</view>
					<view class="text">恭喜你帮助好友获得:<text style="color: #F75A73;">[{{openOtherBoxData.prizeName?openOtherBoxData.prizeName:''}}]+{{openOtherBoxData.num?openOtherBoxData.num:''}}</text></view>
					<view class="text"><text style="color: #AAA7A7; font-size: 24rpx;">{{openOtherBoxData.desc?openOtherBoxData.desc:''}}</text></view>
				</view>
				<view class="button">
					<btnComponent type="pink">
						<button class="btn" open-type="share" data-share="1">
							<view class="flex-set" style="width: 240upx;height: 80upx;">通知好友</view>
						</button>
					</btnComponent>
				</view>
		
			</view>
		
		</modalComponent>

		<listModalComponent v-if="modal == 'treasure_box'" title="我的宝箱" headimg="/static/image/pet/box_title_img.png"
		 @closeModal="modal=''">

			<view class="box-modal-container">
				<view class="box-top">
					<view class="left">新一批宝箱 {{nextTimeText}} 更新</view>
					<view class="right" @tap="$app.goPage('/pages/notice/notice?id='+box_notice_id)">
						<text>玩宝箱说明</text>
						<image style="width: 40rpx;padding-left: 10rpx;" src="/static/image/pet/notice_box.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="box-countdown">
					还剩 {{nextTime}}
				</view>

				<view class="box-list">
					<block v-for="(item,index) in treasureBoxList" :key="index">
						<view class="item">
						
							<image v-if="item.treasure_box" class="item-img1" :src="item.treasure_box.imgsrc" mode="widthFix"></image>
							<image v-else class="item-img" src="/static/image/pet/treasure_box_close.png" mode="widthFix"></image>
							<block v-if="item.treasure_box">
								<view class="item-button">
									<view style="height: 60upx; color: #E16737;">{{item.treasure_box.prizeName}}+{{item.count}}</view>
								</view>
								
							</block>
							<block v-else>
								<view class="item-button" v-if="index==0" @tap="open_treasure_box(index)">
									<btnComponent type="golden">
										<view class="flex-set" style="width: 140upx;height: 50upx; font-size: 28rpx;">领取</view>
									</btnComponent>
								</view>
								<view class="item-button" v-if="index!=0">
									<btnComponent type="palePink">
										<button open-type="share" data-share="12" :data-otherparam="'index=' + index">
											<view class="flex-set" style="width: 140upx;height: 50upx; display: flex; flex-direction: row;">
												<image style="width: 35rpx; padding-right: 10rpx;" src="/static/image/pet/share.png" mode="widthFix"></image>
												<view>打开</view>
											</view>
										</button>
									</btnComponent>
								</view>
							</block>

						</view>
					</block>

				</view>

				<view class="box-log" @tap="$app.goPage('/pages/subPages/pet/treasure_box/treasure_box_log')">
					<view class="left">开宝箱记录</view>
					<view class="right">宝箱记录></view>
				</view>

			</view>

		</listModalComponent>

	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import listModalComponent from '@/components/listModalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue'
	import listItemComponent from '@/components/listItemComponent.vue'
	export default {
		components: {
			modalComponent,
			listModalComponent,
			btnComponent,
			listItemComponent
		},
		data() {
			return {
				requestCount: 1,
				invitListPage: 1,
				rankListPage: 1,
				friendTotal: 0,
				blockScale: false,

				userCurrency: this.$app.getData('userCurrency') || {
					coin: 0,
					stone: 0,
					trumpet: 0,
				},
				spriteInfo: this.$app.getData('pet_spriteInfo') || {
					sprite_level: 0,
					earnPer: 0,
				},
				invitList: [],
				rankList: [],
				invitAward: '',
				modal: '',
				modalTitle: '',
				earnCuttime: 1, // 收益计时
				skillShow: false, // 显示技能
				skillList: [], // 技能升级列表
				currentSkillType: 1,
				useCard: false,
				addCount: 0,
				treasureBoxList: [],
				box_notice_id: '',
				nextTime: '00:00:00',
				nextTimeText: '',
				openBoxData: '',
				openOtherBoxData: '',
				help_friend_id: '',
				my_help_open_rank: 0,
				my_help_open_times: 0,
				treasure_box_times: 0,
			};
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			const otherparam = e.target && e.target.dataset.otherparam
			return this.$app.commonShareAppMessage(shareType, otherparam)
		},
		onLoad() {
			uni.hideTabBarRedDot({
				index: 1
			})
		},
		onShow() {
			this.getSpriteInfo()

			this.initInterval()
			this.getInvitList()
			this.userCurrency = this.$app.getData('userCurrency') || {
				coin: 0,
				stone: 0,
				trumpet: 0,
			}
		},
		methods: {
			//宝箱信息
			treasure_box() {
				if (!this.$app.getData('userStar').id) {
					this.$app.toast('请先加入一个圈子')
					return
				}

				this.$app.request(this.$app.API.TREASURE_BOX, {}, res => {

					this.modal = 'treasure_box';
					this.treasureBoxList = res.data.list;
					this.box_notice_id = res.data.box_notice_id;
					this.nextTimeText = res.data.nextTimeText;
					this.nextTime = this.addTimer(res.data.nextTime);

				}, 'POST', true)
			},
			//开宝箱
			open_treasure_box(index) {
				if (!this.$app.getData('userStar').id) {
					this.$app.toast('请先加入一个圈子')
					return
				}
				this.$app.request(this.$app.API.TREASURE_BOX_OPEN, {
					index:index,
					user_id:this.$app.getData('userInfo').id
				}, res => {

					this.openBoxData = res.data;
					this.modal = 'open_treasure_box_tips';
					
				}, 'POST', true)
			},
			treasure_box_times_tips(user_id){
				this.modal = 'treasure_box_times_tips';
				this.help_friend_id = user_id;
			},
			//帮助开宝箱
			open_other_treasure_box(user_id) {
				if (!this.$app.getData('userStar').id) {
					this.$app.toast('请先加入一个圈子')
					return
				}
				this.$app.request(this.$app.API.TREASURE_BOX_OPEN_OTHER, {
					user_id:user_id
				}, res => {
			
					this.openOtherBoxData = res.data;
					this.modal = 'open_other_treasure_box_tips';
					this.getInvitList();
				}, 'POST', true)
			},
			addTimer(nextTime){
				let timeId=null;
				clearInterval(this.timeId)
				this.timeId = setInterval(() => {
					let left_time = this.$app.timeGethms(--nextTime)
					this.nextTime = left_time.str
						
					if(nextTime<=0){
						clearInterval(this.timeId)
					}
					
				}, 1000)
				
			},
			//收益计时器
			initInterval() {
				clearInterval(this.$app.petTimeId)
				this.$app.petTimeId = setInterval(() => {
					this.earnCuttime++
					if (this.earnCuttime > 100) {
						this.earnCuttime = 1
						this.getSpriteInfo()
					}
					if (this.earnCuttime % 10 == 0 && this.useCard) {
						// 获得加速卡收益
						this.getShortEarn()
					}
				}, 1000)

			},
			// 删除好友
			deleteFriend(item, index) {
				this.$app.modal('确认删除好友【' + item.nickname + '】？', () => {
					this.$app.request('user/delFriend', {
						user_id: item.uid
					}, res => {
						this.invitList.splice(index, 1)
					}, 'POST', true)
				})
			},
			tapSprite() {
				if (this.spriteInfo.need_stone && this.userCurrency.stone >= this.spriteInfo.need_stone) {
					// 精灵升级
					this.$app.request(this.$app.API.SPRITE_UPGRAGE, {}, res => {
						this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
							this.$app.setData('userCurrency', res.data)
							this.userCurrency = this.$app.getData('userCurrency')
						})
						this.getSpriteInfo()

						this.$app.toast('升级成功', 'success')

					}, 'POST', true)
				} else {
					// 显示技能
					// this.skillShow = !this.skillShow
					this.$app.toast('灵丹不足')
				}

			},
			egg_upgrade(type) {
				if (this.spriteInfo.next_egg_info.need_stone && this.userCurrency.stone >= this.spriteInfo.next_egg_info.need_stone) {
					// 能量蛋升级
					this.$app.request(this.$app.API.SPRITE_UPGRAGE, {
						type: type
					}, res => {
						this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
							this.$app.setData('userCurrency', res.data)
							this.userCurrency = this.$app.getData('userCurrency')
						})
						this.getSpriteInfo()

						this.$app.toast('升级成功', 'success')

					}, 'POST', true)
				} else {
					// 显示技能
					// this.skillShow = !this.skillShow
					this.$app.toast('灵丹不足')
				}

			},
			openSkillModal(type) {
				this.modal = 'skill'
				this.currentSkillType = type
				this.getSkill()
			},
			openInvitModal() {
				this.modal = 'invit'
				this.invitListPage = 1
				this.getInvitList()
			},
			/**精灵技能升级*/
			skillUpgrade() {
				this.modal = ''
				this.$app.request(this.$app.API.SPRITE_UPGRAGE, {
					type: this.currentSkillType
				}, res => {
					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						this.$app.setData('userCurrency', res.data)
						this.userCurrency = this.$app.getData('userCurrency')
					})
					this.getSpriteInfo()

					this.$app.toast('升级成功', 'success')
				})
			},
			getSkill() {
				this.$app.request(this.$app.API.SPRITE_SKILL, {
					type: this.currentSkillType
				}, res => {
					const resList = []
					if (this.currentSkillType == 1) {
						// 技能一
						this.modalTitle = '助人为乐'
						for (let v of res.data) {
							const item = {
								level: v.level,
								desc: '对方' + v.percent + '%能量的奖励',
								need_stone: '升级需要消耗' + v.need_stone + '灵丹',
								avatar: '/static/image/pet/skillone-n.png'
							}
							if (v.level <= this.spriteInfo.skillone_level) {
								item.status = 1
							}
							resList.push(item)
						}
					}
					this.skillList = resList

				})
			},
			// 被邀请好友列表
			// 			getInvitList() {
			// 
			// 				this.$app.request(this.$app.API.USER_INVITLIST, {
			// 					type: 1
			// 				}, res => {
			// 					this.invitAward = res.data.award
			// 					const resList = []
			// 					res.data.list.forEach((e, i) => {
			// 						resList.push({
			// 							avatar: e.user && e.user.avatarurl || this.$app.getData('AVATAR'),
			// 							status: e.status,
			// 							uid: e.user && e.user.id || 0,
			// 							nickname: e.user && e.user.nickname || this.$app.getData('NICKNAME'),
			// 							earn: e.sprite.earn,
			// 						})
			// 					})
			// 					this.invitList = resList
			// 				})
			// 			},
			settleSprite(index, item) {
				if (item.earn < 200) {
					this.$app.toast('能量太少，请达到200能量再来帮TA收吧')
				} else if (item.off) {
					// 不能收
					this.modal = 'tips_t'

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
			getOpenBoxRankList(){
				this.$app.request(this.$app.API.TREASURE_BOX_RANK, {
					type: 1,
					page: this.rankListPage || 1
				}, res => {
				
				this.my_help_open_times = res.data.my_help_open_times;
				this.my_help_open_rank = res.data.my_help_open_rank;
					const resList = []
					res.data.list.forEach((e, i) => {
						resList.push({
							avatar: e.user && e.user.avatarurl || this.$app.getData('AVATAR'),
							uid: e.user && e.user.id || 0,
							nickname: e.user && e.user.nickname || this.$app.getData('NICKNAME'),
							help_open_times: e.help_open_times,
						})
				
					})
					if (this.rankList == 1) {
						this.rankList = resList
					} else {
						this.rankList = this.rankList.concat(resList)
					}
				
				
					this.$app.closeLoading(this)
				})
			},
			getInvitList() {
				this.$app.request(this.$app.API.USER_INVITLIST, {
					type: 1,
					page: this.invitListPage || 1
				}, res => {

					this.invitAward = res.data.award
					const resList = []
					this.friendTotal = res.data.list.total_count
					this.treasure_box_times = res.data.list.treasure_box_times
					res.data.list.list.forEach((e, i) => {
						resList.push({
							avatar: e.user && e.user.avatarurl || this.$app.getData('AVATAR'),
							status: e.status,
							uid: e.user && e.user.id || 0,
							nickname: e.user && e.user.nickname || this.$app.getData('NICKNAME'),
							intimacy: e.intimacy, //互动值
							treasure_box_count: e.treasure_box_count,
						})

					})
					if (this.invitListPage == 1) {
						this.invitList = resList
					} else {
						this.invitList = this.invitList.concat(resList)
					}


					this.$app.closeLoading(this)
				})
			},
			goOther(item) {
				this.modal = ''
				this.$app.goPage('/pages/subPages/pet/other/other?user_id=' + item.uid + '&off=' + item.off)
			},
			is_exist_card7(){
				if(this.spriteInfo.isExistCard7==-1){//已使用一张未过期道具卡，直接结算
					this.settle()
				}else{
					this.$app.request('prop/use', {
						id: this.spriteInfo.isExistCard7
					}, res => {
						//使用道具后在领取
						this.settle()
						
					}, 'POST', true)
				}
				
			},
			is_settle() {
				if (this.spriteInfo.earn == 0) {
					// this.$app.toast('能量太少了，稍后再来吧')	
					this.modal = 'egg_upgrade'
				
				} else {
					this.modal = 'is_settle_tips'
				}
			},
			//HTTP
			settle() {
				
				this.$app.request(this.$app.API.SPRITE_SETTLE, {
					user_id: this.$app.getData('userInfo').id,
					settle: this.spriteInfo.earn
				}, res => {
					// 文字跳动
					this.showCoinAddAnime(res.data)
					this.getSpriteInfo()
				
					this.$app.toast('收集成功,能量+' + res.data)
					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						this.$app.setData('userCurrency', res.data)
						this.userCurrency = this.$app.getData('userCurrency')
					})
					this.earnCuttime = 0
				}, 'POST', true)

			},
			/**显示能量增加的动画*/
			showCoinAddAnime(addCoin) {
				this.addCount = addCoin
				this.spriteInfo.total_coin += addCoin
				this.blockScale = true
				setTimeout(() => {
					this.blockScale = false
				}, 1000)
			},
			// 获得道具卡收益
			getShortEarn() {
				this.$app.request('sprite/shortEarn', {}, res => {
					this.useCard = res.data.isUseCard || false
					this.showCoinAddAnime(res.data.earn)

					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						this.$app.setData('userCurrency', res.data)
						this.userCurrency = this.$app.getData('userCurrency')
					})
				})
			},
			getSpriteInfo() {
				this.$app.request(this.$app.API.SPRITE_INFO, {
					user_id: this.$app.getData('userInfo').id
				}, res => {
					this.spriteInfo = res.data

					if (res.data.isFull) {
						this.$app.toast('能量已满了，快点收能量吧')
						clearInterval(this.$app.petTimeId)
						// 倒计时已满
						this.earnCuttime = 100
					} else {
						// 开始计时
						this.initInterval()
					}

					this.$app.setData('pet_spriteInfo', this.spriteInfo)
					// 是否使用加速卡
					this.useCard = res.data.isUseCard || false
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.pet-container {
		height: 100%;
		background: url(https://mmbiz.qpic.cn/mmbiz_jpg/CbJC0icY3EzZkic73fibNnibpIvllj1icjrN7XT1X8XQKQpD8qFbzF7OyjcSdw9R8HC72q6ia1pdmCxicua6UB55RX9oA/0) center no-repeat/cover;

		.top-row-container {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding: 20upx;
			color: #aa877d;
			color: #000;

			.left-wrap {
				font-size: 20upx;
				color: #000;
				margin-left: 10upx;

				.row {
					justify-content: flex-start;

					.coin-img {
						width: 70upx;
						height: 70upx;
						margin-right: 20upx;
					}

					.count {
						font-size: 32upx;
						color: #ff5b5c;
						justify-content: flex-start;

						.num {
							font-weight: 700;
						}

						.num.active {
							animation: scaleA 0.8s linear;
						}

						.icon {
							width: 30upx;
							height: 30upx;
						}
					}


				}

				.row.bottom {
					margin-top: 10upx;
					background-color: rgba(#FFF, .3);
					border-radius: 50upx;
					padding: 5upx 20upx;
				}

			}

			.button-wrap {
				font-size: 24upx;
				margin: 0 10upx;
				width: 188upx;
				height: 74upx;
				position: relative;

				image {
					position: absolute;
				}

				.text {
					position: absolute;
					z-index: 2;
				}

			}

			.block {
				display: flex;
				align-items: center;
				margin: 0 20upx;
				font-size: 36upx;
				position: relative;

				image {
					width: 40upx;
					margin: 0 10upx;
				}

				// .block-text {
				// 	transition: 0.3s;
				// }

				.block-text.active {
					// transform: scale(1.2);

					animation: scaleA 0.8s linear;
				}

				@keyframes scaleA {

					0%,
					100% {
						transform: scale(1);
					}

					60% {
						transform: scale(2);
					}
				}

				.top-num {
					position: absolute;
					display: inline-block;
					top: -30upx;
					font-size: 24upx;
					right: 12upx;
				}

			}

			.text-content {
				margin: 0 20upx;
				font-size: 24upx;
			}
		}

		.left-container {
			position: absolute;
			left: 20upx;
			top: 36%;
			transform: translateY(-50%);

			image {
				width: 60upx;
			}
			.add-text{
				display: flex;
				justify-content: center;
				color: #684B3C; 
				font-size: 28rpx;
			}

			.friend-wrapper {
				margin-top: 10upx;
				margin-bottom: 20upx;
				background-color: rgba(255, 255, 255, .5);
				border-radius: 20upx;
				width: 70upx;
				height: 240upx;
				display: flex;
				justify-content: flex-start;
				flex-direction: column;
				align-items: center;

				image {
					width: 60upx;
					height: 60upx;
					margin: 10upx 0;
					border-radius: 50%;
				}
			}

			.level {
				text-align: center;
				font-size: 32upx;
				font-weight: 700;
			}
		}

		.right-container {
			position: absolute;
			right: 20upx;
			top: 36%;
			transform: translateY(-50%);

			image {
				width: 80upx;
			}
		}

		.sprite-bubble {
			width: 400upx;
			height: 300upx;
		}

		.sprite {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			top: 19%;
			display: flex;
			flex-direction: column;
			align-items: center;

			@keyframes bounce {

				0%,
				100% {
					transform: translateY(0%);
				}

				65% {
					transform: translateY(-3%);
				}
			}

			.bounce-article {
				animation: bounce 4s ease-in-out infinite;
			}
			
			.sprite-shengji {
				width: 200upx;
				position: absolute;
				top: 25%;
				left: 145rpx;
				z-index: 9;
			}

			.sprite-main {
				width: 505upx;
			}

			.sprite-level {
				bottom: -60upx;
				color: #111;
				font-size: 28upx;
				text-align: center;

				image {
					width: 160upx;
				}

				.text {
					top: 36upx;
				}
			}

			.shadow {
				height: 40upx;
				width: 140upx;
				height: 10upx;
				margin: auto;
				border-radius: 50%;
				background: #fff;
				box-shadow: 0 0 5upx #fff;
				animation: shadow 3s ease-in-out infinite;
			}

			@keyframes shadow {

				0%,
				100% {
					transform: scaleX(1);
				}

				50% {
					transform: scaleX(0.9);
				}
			}

			.progress-wrap {
				background-color: #FFF;
				border-radius: 30upx;

				display: flex;
				align-items: center;
				padding: 5upx 20upx;

				.lv {
					font-weight: 700;
					padding: 5upx 10upx;
				}

				.progress {
					border-radius: 30upx;
					background-color: #ad9b97;
					width: 195upx;
					height: 30upx;
					position: relative;
					overflow: hidden;

					.progress-bar {
						background-color: $color_2;
						border-radius: 30upx;
						height: 100%;
					}

					.text {
						position: absolute;
						color: #FFF;
						font-size: 22upx;
					}
				}
			}

			.bottom-tips {
				margin-top: 10upx;
				font-size: 28upx;
				letter-spacing: 4upx;
				border-bottom: 2upx solid $text-color-2;

			}

			.skill-container {
				width: 500upx;
				height: 500upx;
				transition: .3s;

				transform: translate(-50%, -50%) scale(0);

				.skill-wrapper {
					position: absolute;
					top: 10upx;
					left: 10upx;

					image {
						width: 100upx;
					}

					.skill-level {
						position: absolute;
						right: 0upx;
						bottom: 0upx;
					}
				}
			}

			.skill-container.show {
				transform: translate(-50%, -50%) scale(1);
			}


		}

		@keyframes shine {

			0%,
			100% {
				transform: scale(0.8);
			}

			50% {
				transform: scale(1);
			}
		}

		.nav-container {
			position: absolute;
			right: 6%;
			top: 15%;

			image {
				margin-bottom: 20upx;
				width: 100upx;
			}
		}

		.earn-container::before {
			content: "";
			position: absolute;
			z-index: 1;
			width: 80upx;
			height: 90upx;
			top: -48upx;
			border-radius: 50%;
			left: 40upx;
			background-color: #fbbff5;
			filter: blur(10upx);
			animation: shine 1.5s linear infinite;
		}
		
		.egg-upgrade{
			position: absolute;
			right: 7%;
			bottom: 33%;
				image{
					width: 80upx;
				}
			}

		.earn-container {
			position: absolute;
			right: 3%;
			bottom: 16%;

			.mountain {
				width: 150upx;
			}

			.egg {
				width: 90upx;
				position: absolute;
				top: -34upx;
				left: 35upx;
				flex-direction: column;
				z-index: 2;

				.num-wrapper {
					z-index: 3;
					top: 32upx;
					font-size: 24upx;
					color: #FFF;
				}

				image {
					width: 60upx;
				}

				.progress {

					height: 30upx;
					z-index: 1;
					margin-top: -20upx;
					width: 100%;
					border-radius: 20upx;
					color: #FFF;
					background-color: #dcdcdc;
					border: 4upx solid #aa89bd;
					text-align: center;
					font-size: 20upx;
					position: relative;
					overflow: hidden;

					.progress-bar {
						content: "";
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						height: 100%;
						background-color: #f19ec2;
						z-index: -1;
					}

					@keyframes progAnime {
						0% {
							transform: translateX(-100%);
						}

						100% {
							transform: translateX(0);
						}

					}
				}


			}
			
			
			.hand-wrap {
				width: 100upx;
				top: -50rpx;
				left: 84rpx;
				z-index: 2;

				.bubble::before {
					content: "可收集";
					position: absolute;
					margin-top: -4upx;
					font-size: 24upx;
					font-weight: 700;
				}
				.bubble1::before {
					content: "升级";
					position: absolute;
					margin-top: -4upx;
					font-size: 24upx;
					font-weight: 700;
				}

				.hand {
					width: 80upx;
					position: absolute;
					right: -6upx;
					top: 20upx;
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

			}
		}

		.bottom-container{
			width: 100%;
			height: 140upx;
			background-color: rgba(255,255,255,0.5);;
			position: absolute;
			bottom: 2%;
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 20rpx;
			
			.avatarurl{
				width: 90rpx;
				height: 90rpx;
				border: 4rpx solid #EEADCC;
				border-radius: 50%;
			}
			
			.sprite-level{
				width: 45%;
				padding-left: 20rpx;
				
				.sprite-level-info{
					display: flex;
					flex-direction: row;
					align-items: center;
					
					.lv {
						font-weight: 700;
						padding: 5upx 10upx;
					}
					
					.progress {
						border-radius: 30upx;
						background-color: #ad9b97;
						width: 195upx;
						height: 30upx;
						position: relative;
						overflow: hidden;
								
						.progress-bar {
							background-color: $color_2;
							border-radius: 30upx;
							height: 100%;
						}
								
						.text {
							position: absolute;
							color: #FFF;
							font-size: 22upx;
						}
					}
				}	
				
				.bottom-tips {
					width: 210rpx;
					font-size: 24upx;
					font-weight: bold;
					letter-spacing: 2upx;
					border-bottom: 2upx solid $text-color-2;
				
				}
				
			}
			.right-wrap{
				line-height: 40rpx;

				.row{
					display: flex;
					align-items: center;
					.count{
						color:#EEADCC;
						.num {
							font-weight: 700;
						}
						
						.num.active {
							animation: scaleA 0.8s linear;
						}
						
						.icon {
							width: 30upx;
							height: 30upx;
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
				padding: 20upx 40upx;
				width: 100%;

				.bottom {
					justify-content: space-between;
				}

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
					// background-color: $text-color-1;
					background-color: rgba($text-color-1, .3);
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
						padding: 0 0 0 30rpx;
						line-height: 44upx;

						.star-name {
							width: 160upx;

						}

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

					.del {
						width: 36.78upx;
						height: 36upx;
						margin-left: 40upx;
					}

					.egg {
						flex-direction: column;
						margin-left: 10rpx;

						.hand {
						}

						.num-wrapper {
							font-size: 24upx;
							left: 55% !important;

						}

						image {
							width: 60upx;
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

		.skill-modal-container {
			width: 100%;
			height: 100%;
			position: absolute;
			display: flex;
			flex-direction: column;

			.list-wrapper {
				overflow-y: auto;
				height: 100%;

				.item {
					display: flex;
					// justify-content: start;
					align-items: center;
					padding: 10upx 20upx;
					border-radius: 60upx;
					background-color: rgba(255, 255, 255, .3);
					margin: 10upx;

					.rank-num {
						width: 80upx;
						text-align: center;
					}

					.avatar {
						position: relative;

						image {
							width: 90upx;
							height: 90upx;
						}

						.badge {
							position: absolute;
							right: -4upx;
							bottom: 4upx;
							width: 30upx;
							height: 30upx;
							font-size: 20upx;
							color: #FFF;
							background-color: #F00;
							border: 1px solid #FFF;
							border-radius: 50%;
						}
					}

					.text-container {
						width: 350upx;
						padding: 0 20upx;
						font-size: 26upx;

						.bottom {
							display: flex;
							align-items: center;
							font-size: 22upx;
							color: #888;
						}
					}


				}
			}
		}


		.tips-modal-container {
			height: 90%;
			padding: 20rpx 30rpx;
			font-size: 32rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;


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

		.tips-modal-container-s {
			height: 100%;
			padding: 20upx 40upx;
			font-size: 32upx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			flex-direction: column;

			.text-wrap {
				text-align: center;
				margin: 30upx;

				image {
					width: 120upx;
					height: 120upx;
					margin: 60upx;
				}

				.text {
					font-size: 32upx;
					font-weight: 700;

				}
			}


			.btn {
				margin: 100upx auto;
			}
		}

		.upgrade-modal-container {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.title {
				font-size: 32rpx;
				font-weight: 500;
				padding: 20rpx 0;
			}

			.show_img {
			
				position: relative;

				image {
					width: 160rpx;
					z-index: 3;
				}
			}

			.flash {
				content: "";
				position: absolute;
				left: 5rpx;
				width: 150upx;
				height: 200upx;
				border-radius: 50%;
				background-color: #ce797c;
				filter: blur(10upx);
				animation: shine 1.5s linear infinite;
			}

			.text-wrap {
				padding: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.title-text{
					border-left: 8rpx solid #ce797c; 
					font-weight: bold;
				}
				.text{
					padding: 5rpx 10rpx;
				}
			}
		}

		.open-box-modal-container{
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 20rpx;
			
			.top {
				width: 100%;
				color: #817F7F;
				font-weight: bold;
				text-align: right;
			}
			
			.show_img {
				position: relative;
				width: 280rpx;
				height: 280rpx;
				border: 0;
				margin-top: 10rpx;
			}
			
			
			.text-wrap {
				padding: 20rpx 0;
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
		
		.is-settle-modal-container{
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 20rpx;
			
			.top {
				width: 100%;
				font-size: 32rpx;
				font-weight: bold;
				text-align: center;
				margin-top: 40rpx;
			}
			
			.show_img {
				position: relative;
				width: 150rpx;
				height: 150rpx;
				border: 0;
				margin-top: 60rpx;
				margin-bottom: 30rpx;
			}
			
			
			.text-wrap {
				padding: 30rpx 0;
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
			
			.button{
				width: 100%;
				display: flex;
				justify-content: space-around;
				padding: 30rpx 0;
			}
		}

		.box-modal-container {
			padding: 0 20rpx;
			width: 100%;
			display: flex;
			flex-direction: column;

			.box-top {
				width: 100%;
				display: flex;
				justify-content: space-between;
				padding-bottom: 20rpx;

				.left {
					color: #ce797c;
					font-size: 32rpx;
				}

				.right {
					color: #999999;
					display: flex; 
					align-items: center;
				}
			}

			.box-countdown {
				font-size: 24rpx;
			}

			.box-list {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				padding: 30rpx 0;

				.item {
					width: 33.3%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					padding: 10rpx 0;

					.item-img {
						width: 40%;
						margin-bottom: 30rpx;
						margin-top:10rpx;

					}
					.item-img1 {
						width: 40%;
						margin-bottom: 30rpx;
					}

					.item-button {
						font-size: 24rpx;
					}
				}
			}

			.box-log {
				width: 100%;
				display: flex;
				justify-content: space-between;
				padding-bottom: 20rpx;
				font-size: 28rpx;

				.left {
					color: #666666;
				}

				.right {
					color: #ce797c;
				}
			}

		}
	}
</style>

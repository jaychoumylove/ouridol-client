// 基础常量
// const HOST = 'ouridol.anaculture.com';
const HOST = 'cs.ouridol.xiaolishu.com';
const VERSION = 'v5';

export default {
	HOST,
	VERSION,
	HTTP_URL: 'https://' + HOST + '/api/' + VERSION + '/',
	WSS_URL: 'wss://' + HOST + '/wss',

	QRCODE: 'https://mmbiz.qpic.cn/mmbiz_jpg/w5pLFvdua9GhRtfiavN38KianWVwMj4hBliaHdBGfGDBcA5hDhs69bq6xtGD65gztNP3J7jTgryMJKDWYdicajoqoA/0?wx_fmt=jpeg',
	AVATAR: 'https://wx.qlogo.cn/mmhead/gBSelbQM7M19TeazvLwo3f8znKS8KR1CuibicFHc1GTWI/132',
	NICKNAME: '神秘粉丝',

	GZH_APPID: 'wx00cf0e6d01bb8b01', // 公众号APPID
	
	// 微信广告
	adUnitId: "adunit-9fa8b9c723fc27be", // 激励视频广告id
	bannerAdUnitId: "adunit-8959ce66e7b4d47c", // banner广告id
	interstitialAd_adUnitId: "adunit-4df217a6aa658534", // 插屏广告id
	gridAd_adUnitId: "adunit-6ca1c49108a6df4e",// 格子广告id
	videoAd_adUnitId: "adunit-78ad9e3a5514698c", // 视频广告id
	
	// QQ广告
	qq_adUnitId: "c1f2a03fed6a658dc1873ca1d837a826", // QQ激励视频广告id
	qq_bannerAdUnitId: "51d442e11d51dbda10fc1eb414834fdb", // banner广告位
	qq_feedsAdUnitId: "ed2ad046bc225a329ff76fb058a7ec02", // feeds广告位
	qq_cardAdUnitId: "e111bd89306278660465552b72bbf607", // card广告位
	qq_boxAdUnitId: "317f7c32f54257d2fef8374b8c4f4283", // 盒子广告位
	
	API: {
		AUTH_LOGIN: 'user/login', // 用户登录

		BANNER_LIST: 'banner/list',

		STAR_RANK: 'star/rank', // 明星榜单
		STAR_STEAL_RANK: 'star/stealRank', // 明星榜单
		STAR_RANK_HISTORY: 'star/rank/history', // 明星榜单lishi
		STAR_INFO: 'star/info', // 明星信息
		STAR_CHART: 'star/chart', // 明星偶像圈聊天内容
		STAR_JOINCHART: 'star/joinchart', // 加入明星聊天室socket
		STAR_LEAVECHART: 'star/leavechart', // 离开明星聊天室socket
		STAR_SENDMSG: 'star/sendmsg', // 在偶像圈中发言
		STAR_SENDHOT: 'star/sendhot', // 给明星贡献人气
		STAR_FOLLOW: 'star/follow', // 加入明星偶像圈
		STAR_STEAL: 'star/steal', // 偷花
		STAR_STEAL_AUTOMATIC: 'star/automaticSteal', // 开启自动偷花
		STAR_DYNAMIC: 'star/dynamic', // 动态

		USER_SAVEINFO: 'user/saveinfo', // 保存用户信息
		USER_INFO: 'user/info', // 获取用户信息
		USER_STAR: 'user/star', // 用户加入的爱豆
		USER_CURRENCY: 'user/currency', // 用户货币信息
		USER_STEAL_TIME: 'user/steal/time', // 用户偷花倒计时
		USER_ITEM: 'user/item', // 用户道具
		USER_RANK: 'user/rank', // 用户排名
		USER_INVITLIST: 'user/invitlist', // 用户邀请信息
		USER_INVITAWARD: 'user/invitaward', // 用户邀请奖励
		USER_SAYWORLD: 'user/sayworld', // 世界喊话
		USER_REPORT: 'user/report', // 举报（目前只对世界喊话）
		USER_EXIT: 'user/exit', // 退出偶像圈
		USER_FATHER: 'user/father', // 师徒关系
		USER_SONEARN: 'user/sonearn', // 获取徒弟的收益
		USER_CHECKEARN: 'user/checkearn', // 检查是否有收益
		USER_BREAK_SON: 'user/reset/son', // 逐出师门
		USER_BREAK_FATHER: 'user/reset/father', // 反出师门
		FATHER_RANK: 'user/fatherRank', // 师傅排行及未拜师用户排行
		USER_FROM_FATHER: 'user/fromFather', // 拜师
		USER_ACCEPT_SON: 'user/acceptSon', // 收徒
		FATHER_APPLY_LIST: 'user/applyList', // 师徒申请列表

		SHARE_MASS: 'share/mass', // 分享集结
		SHARE_STARMASS: 'share/start', // 分享开始
		SHARE_JOINMASS: 'share/joinmass', // 加入集结
		SHARE_SETTLEMASS: 'share/settlemass', // 结算集结收益

		EXT_SAVEFORMID: 'user/saveformid', // 保存formId

		SPRITE_INFO: 'sprite', // 精灵信息
		SPRITE_SETTLE: 'sprite/settle', // 精灵结算
		SPRITE_UPGRAGE: 'sprite/upgrade', // 精灵升级
		SPRITE_SKILL: 'sprite/skill', // 精灵技能
		SPRITE_RANK: 'sprite/rank', // 精灵榜单

		USER_BIND: 'user/bind', // 绑定client_id

		PAY_ORDER: 'pay/order', // 支付
		PAY_GOODS: 'pay/goods', // 商品列表
		
		PROP_EXCHANGE: 'prop/exchange', // 灵丹兑换道具

		TASK: 'task', // 任务
		TASK_SETTLE: 'task/settle', // 任务领取
		EXT_SHARETEXT: 'sharetext', // 分享文字
		TASK_WEIBO: 'task/weibo', // 提交微博链接

		EXT_ACTIVEINFO: 'active/info', // 活动信息
		EXT_ACTIVECARD: 'active/card', // 打卡
		EXT_ACTIVE_USERRANK: 'active/userrank', // 用户打开排名

		TREASURE: 'treasure', // 寻宝
		TREASURE_SETTLE: 'treasure/settle', // 寻宝结算

		ARTICLE: 'article', // 获取文章
		ARTICLE_LIST: 'article/list', // 全部文章

		CONFIG: 'config', // 配置信息
		EXT_FANCLUB_JOIN: 'fanclub/join', // 后援会加入

		USER_SIGNIN: 'user/signin', // 用户签到

		LOG: 'ext/log', // 用户日志
		YINGYUAN_INFO: 'yingyuan/info', // 应援详情
		YINGYUAN_CARD: 'yingyuan/card', // 应援打卡
		YINGYUAN_LIST: 'yingyuan/list', // 应援排行列表
		
		TREASURE_BOX: 'treasureBox/index', // 宝箱列表信息
		TREASURE_BOX_OPEN: 'treasureBox/open', // 打开宝箱
		TREASURE_BOX_OPEN_OTHER: 'treasureBox/openOther', // 打开其他人宝箱，好友列表帮助开宝箱
		TREASURE_BOX_LOG: 'treasureBox/log', // 宝箱记录
		TREASURE_BOX_INFO: 'treasureBox/info', // 宝箱信息
		TREASURE_BOX_RANK: 'treasureBox/getOpenBoxRank', // 全服开箱排行榜
		
		INVITE_NEW_INFO: 'active/invite_new_info', // 用户拉新活动信息
		INVIT_STEPS_AWARD: 'active/invite_steps_reward', // 点击领取拉新额外奖励
		INVIT_ENERGY: 'active/get_invit_energy', // 点击领取拉新电量
		INVIT_GROUP_INVITE_RANK: 'active/invite_group_invite_rank', // 圈子拉新排名
		INVIT_REWARD_LOG: 'active/invite_reward_log', // 领取拉新奖励记录
		INVIT_USER_LOG: 'active/invite_user_log', // 拉新人员记录
		
		DRESSUP_SELECT: 'dressUp/select', // 装扮列表
		DRESSUP_BUY: 'dressUp/buy', // 装扮购买
		DRESSUP_USE: 'dressUp/use', // 装扮使用
		DRESSUP_CANCEL: 'dressUp/cancel', // 装扮取消使用
		DRESSUP_UNLOCK: 'dressUp/unlock', // 装扮解锁
		
	},
}

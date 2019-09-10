// 基础常量
// const HOST = 'ouridol.anaculture.com';
const HOST = 'rank.xiaolishu.com';
// const HOST = 'cs.huamufang.com';
const VERSION = 'v8';

export default {
	HOST,
	VERSION,
	HTTP_URL: 'https://' + HOST + '/api/' + VERSION + '/',
	WSS_URL: 'wss://' + HOST + '/wss',
	
	QRCODE: 'https://mmbiz.qpic.cn/mmbiz_jpg/w5pLFvdua9GhRtfiavN38KianWVwMj4hBliaHdBGfGDBcA5hDhs69bq6xtGD65gztNP3J7jTgryMJKDWYdicajoqoA/0?wx_fmt=jpeg',
	AVATAR: 'https://wx.qlogo.cn/mmhead/gBSelbQM7M19TeazvLwo3f8znKS8KR1CuibicFHc1GTWI/132',
	NICKNAME: '神秘粉丝',
	
	GZH_APPID: 'wx00cf0e6d01bb8b01',// 公众号APPID
	interstitialAd_adUnitId: "adunit-4df217a6aa658534",// 插屏广告id

	API: {
		AUTH_LOGIN: 'user/login', // 用户登录

		BANNER_LIST: 'banner/list',

		STAR_RANK: 'star/rank', // 明星榜单
		STAR_RANK_HISTORY: 'star/rank/history', // 明星榜单lishi
		STAR_INFO: 'star/info', // 明星信息
		STAR_CHART: 'star/chart', // 明星偶像圈聊天内容
		STAR_JOINCHART: 'star/joinchart', // 加入明星聊天室socket
		STAR_LEAVECHART: 'star/leavechart', // 离开明星聊天室socket
		STAR_SENDMSG: 'star/sendmsg', // 在偶像圈中发言
		STAR_SENDHOT: 'star/sendhot', // 给明星贡献人气
		STAR_FOLLOW: 'star/follow', // 加入明星偶像圈
		STAR_STEAL: 'star/steal', // 偷花
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
		USER_EXIT: 'user/exit', // 退出偶像圈
		USER_FATHER: 'user/father', // 师徒关系
		USER_SONEARN: 'user/sonearn', // 获取徒弟的收益
		USER_CHECKEARN: 'user/checkearn', // 检查是否有收益


		SHARE_MASS: 'share/mass', // 分享集结
		SHARE_STARMASS: 'share/start', // 分享开始
		SHARE_JOINMASS: 'share/joinmass', // 加入集结
		SHARE_SETTLEMASS: 'share/settlemass', // 结算集结收益

		EXT_SAVEFORMID: 'user/saveformid', // 保存formId

		SPRITE_INFO: 'sprite', // 精灵信息
		SPRITE_SETTLE: 'sprite/settle', // 精灵结算
		SPRITE_UPGRAGE: 'sprite/upgrade', // 精灵升级
		SPRITE_SKILL: 'sprite/skill', // 精灵技能

		USER_BIND: 'user/bind', // 绑定client_id

		PAY_ORDER: 'pay/order', // 支付
		PAY_GOODS: 'pay/goods', // 商品列表

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
	},
}

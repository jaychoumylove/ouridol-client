// 基础常量
const HOST = 'cs.huamufang.com';
// const HOST = 'rank.xiaolishu.com';
const VERSION = 'v1';

export default {
	HOST,
	VERSION,
	HTTP_URL: 'https://' + HOST + '/api/' + VERSION + '/',
	WSS_URL: 'wss://' + HOST + '/wss',

	AVATAR: '/static/image/ic_wechat.png',
	NICKNAME: '神秘粉丝',


	API: {
		AUTH_LOGIN: 'user/login', // 用户登录

		BANNER_LIST: 'banner/list',

		STAR_RANK: 'star/rank', // 明星榜单
		STAR_RANK_HISTORY: 'star/rank/history', // 明星榜单lishi
		STAR_INFO: 'star/info', // 明星信息
		STAR_CHART: 'star/chart', // 明星圈子聊天内容
		STAR_JOINCHART: 'star/joinchart', // 加入明星聊天室socket
		STAR_SENDMSG: 'star/sendmsg', // 在圈子中发言
		STAR_SENDHOT: 'star/sendhot', // 给明星贡献人气
		STAR_FOLLOW: 'star/follow', // 加入明星圈子
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

		SPRITE_INFO: 'sprite', // 精灵信息
		SPRITE_SETTLE: 'sprite/settle', // 精灵结算
		SPRITE_UPGRAGE: 'sprite/upgrade', // 精灵升级

		USER_BIND: 'user/bind', // 绑定client_id

		PAY_ORDER: 'pay/order', // 支付
		PAY_GOODS: 'pay/goods', // 商品列表

		TASK: 'task', // 任务
		TASK_SETTLE: 'task/settle', // 任务领取
		EXT_SHARETEXT: 'sharetext', // 分享文字
		TASK_WEIBO: 'task/weibo', // 提交微博链接

		TREASURE: 'treasure', // 寻宝
		TREASURE_SETTLE: 'treasure/settle', // 寻宝结算

		ARTICLE: 'article', // 获取文章
	},
}

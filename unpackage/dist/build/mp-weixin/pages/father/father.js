(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/father/father"],{"110d":function(t,a,n){"use strict";n.r(a);var e=n("f595"),r=n("7773");for(var o in r)"default"!==o&&function(t){n.d(a,t,function(){return r[t]})}(o);n("7eb8");var u=n("2877"),s=Object(u["a"])(r["default"],e["a"],e["b"],!1,null,"77636d51",null);a["default"]=s.exports},"696d":function(t,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e=function(){return n.e("components/btnComponent").then(n.bind(null,"cbb7"))},r={components:{btnComponent:e},data:function(){return{requestCount:1,sonTotal:0,todayTotal:0,sonList:[],userInfo:{avatarurl:this.$app.getData("userInfo")["avatarurl"]||this.$app.AVATAR,nickname:this.$app.getData("userInfo")["nickname"]||this.$app.NICKNAME,id:this.$app.getData("userInfo")["id"]||null}}},onLoad:function(){this.getFatherInfo()},onShareAppMessage:function(t){var a=t.target&&t.target.dataset.share;return this.$app.commonShareAppMessage(a)},methods:{getSonEarn:function(t,a,n){var e=this;a?this.$app.request(this.$app.API.USER_SONEARN,{user_id:t},function(t){e.sonList[n].earn=0,e.$app.toast("获得收益+"+t.data+"能量"),e.getFatherInfo(),e.$app.request(e.$app.API.USER_CURRENCY,{},function(t){e.$app.setData("userCurrency",t.data)})},"POST",!0):this.$app.toast("TA的收益太少了")},getFatherInfo:function(){var t=this;this.$app.request(this.$app.API.USER_FATHER,{type:2},function(a){var n=[],e=0,r=!0,o=!1,u=void 0;try{for(var s,i=a.data[Symbol.iterator]();!(r=(s=i.next()).done);r=!0){var p=s.value;e+=p.has_earn_count,n.push({uid:p.user&&p.user.id,avatarurl:p.user&&p.user.avatarurl||t.$app.AVATAR,nickname:p.user&&p.user.nickname||t.$app.NICKNAME,cur_contribute:p.cur_contribute,earn:p.user_earn})}}catch(c){o=!0,u=c}finally{try{r||null==i.return||i.return()}finally{if(o)throw u}}t.todayTotal=e,t.sonTotal=n.length,t.sonList=n,t.$app.closeLoading(t)})}}};a.default=r},7773:function(t,a,n){"use strict";n.r(a);var e=n("696d"),r=n.n(e);for(var o in e)"default"!==o&&function(t){n.d(a,t,function(){return e[t]})}(o);a["default"]=r.a},"7eb8":function(t,a,n){"use strict";var e=n("f519"),r=n.n(e);r.a},f519:function(t,a,n){},f595:function(t,a,n){"use strict";var e=function(){var t=this,a=t.$createElement,n=(t._self._c,t.$app.getData("config"));t.$mp.data=Object.assign({},{$root:{g0:n}})},r=[];n.d(a,"a",function(){return e}),n.d(a,"b",function(){return r})}},[["d568","common/runtime","common/vendor"]]]);
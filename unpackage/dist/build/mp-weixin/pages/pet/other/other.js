(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/pet/other/other"],{"0748":function(t,n,e){"use strict";e.r(n);var a=e("8c8c"),i=e("3221");for(var r in i)"default"!==r&&function(t){e.d(n,t,function(){return i[t]})}(r);e("b949");var o=e("2877"),u=Object(o["a"])(i["default"],a["a"],a["b"],!1,null,"4933689f",null);n["default"]=u.exports},3221:function(t,n,e){"use strict";e.r(n);var a=e("ed33"),i=e.n(a);for(var r in a)"default"!==r&&function(t){e.d(n,t,function(){return a[t]})}(r);n["default"]=i.a},"7da6":function(t,n,e){},"8c8c":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return i})},b949:function(t,n,e){"use strict";var a=e("7da6"),i=e.n(a);i.a},ed33:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=function(){return e.e("components/modalComponent").then(e.bind(null,"f372"))},i=function(){return e.e("components/btnComponent").then(e.bind(null,"cbb7"))},r={components:{modalComponent:a,btnComponent:i},data:function(){return{requestCount:1,user_id:null,spriteInfo:{},invitList:[],invitAward:"",modal:"",earnCuttime:1,skillShow:!1,userInfo:{}}},onShareAppMessage:function(){return this.$app.commonShareAppMessage()},onLoad:function(t){this.user_id=t.user_id,this.getSpriteInfo(),this.getUserInfo()},methods:{getUserInfo:function(){var t=this;this.$app.request(this.$app.API.USER_INFO,{user_id:this.user_id},function(n){t.userInfo=n.data,t.userInfo={avatarurl:n.data["avatarurl"]||t.$app.AVATAR,nickname:n.data["nickname"]||t.$app.NICKNAME,id:n.data["id"]||null}})},settle:function(){var t=this;this.spriteInfo.earn<100?this.$app.toast("TA的能量太少了，稍后再来吧"):this.$app.request(this.$app.API.SPRITE_SETTLE,{user_id:this.user_id},function(n){1==t.user_id?t.spriteInfo.earn=0:t.getSpriteInfo(),t.$app.toast("为TA收集能量，你获得:"+n.data+"能量"),t.$app.request(t.$app.API.USER_CURRENCY,{},function(n){t.$app.setData("userCurrency",n.data)})},"POST",!0)},getSpriteInfo:function(){var t=this;this.$app.request(this.$app.API.SPRITE_INFO,{user_id:this.user_id},function(n){t.spriteInfo=n.data,t.$app.closeLoading(t)})}}};n.default=r}},[["e63d","common/runtime","common/vendor"]]]);
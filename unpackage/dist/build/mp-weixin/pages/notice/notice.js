(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/notice/notice"],{"0c28":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},"30a6":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{article:[],webview:""}},onLoad:function(t){t.url?this.webview=t.url:t.id&&this.getArticle(t.id)},methods:{getArticle:function(e){var n=this;this.$app.request(this.$app.API.ARTICLE,{id:e},function(e){try{n.article=JSON.parse(e.data.value)}catch(a){n.webview=e.data.value}t.setNavigationBarTitle({title:e.data.name})})}}};e.default=n}).call(this,n("543d")["default"])},"31df":function(t,e,n){"use strict";n.r(e);var a=n("0c28"),i=n("7282");for(var u in i)"default"!==u&&function(t){n.d(e,t,function(){return i[t]})}(u);n("eee0");var r=n("2877"),c=Object(r["a"])(i["default"],a["a"],a["b"],!1,null,"29a29e89",null);e["default"]=c.exports},7009:function(t,e,n){},7282:function(t,e,n){"use strict";n.r(e);var a=n("30a6"),i=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=i.a},eee0:function(t,e,n){"use strict";var a=n("7009"),i=n.n(a);i.a}},[["100e","common/runtime","common/vendor"]]]);
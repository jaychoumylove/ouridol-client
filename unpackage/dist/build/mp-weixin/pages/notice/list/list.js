(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/notice/list/list"],{"979e":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return o})},c20b:function(t,e,n){"use strict";n.r(e);var i=n("979e"),o=n("e7bd");for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);n("d7e4");var a=n("2877"),c=Object(a["a"])(o["default"],i["a"],i["b"],!1,null,"10119915",null);e["default"]=c.exports},c4fe:function(t,e,n){},ce30:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){return n.e("components/listItemComponent").then(n.bind(null,"a2a3"))},o={components:{listItemComponent:i},data:function(){return{requestCount:1,articleList:[]}},onLoad:function(){this.getArticleList()},methods:{goArticle:function(t){this.$app.goPage("/pages/notice/notice?id="+t)},getArticleList:function(){var t=this;this.$app.request(this.$app.API.ARTICLE_LIST,{},function(e){var n=[],i=!0,o=!1,r=void 0;try{for(var a,c=e.data[Symbol.iterator]();!(i=(a=c.next()).done);i=!0){var u=a.value;n.push({id:u.id,isTop:u.is_top,title:u.name,time:u.create_time.slice(0,11),isNew:Date.now()/1e3-t.$app.strToTime(u.create_time)<259200})}}catch(s){o=!0,r=s}finally{try{i||null==c.return||c.return()}finally{if(o)throw r}}t.articleList=n,t.$app.closeLoading(t)})}}};e.default=o},d7e4:function(t,e,n){"use strict";var i=n("c4fe"),o=n.n(i);o.a},e7bd:function(t,e,n){"use strict";n.r(e);var i=n("ce30"),o=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);e["default"]=o.a}},[["b449","common/runtime","common/vendor"]]]);
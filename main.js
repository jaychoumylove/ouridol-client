import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

// 全局函数
Vue.prototype.$app = App.globalData

import loadIconComponent from '@/components/loadIconComponent.vue'
Vue.component('loadIconComponent', loadIconComponent)

// #ifdef MP
// 阿拉丁
import '@/lib/utils/ald-stat'
// 小虎推
import '@/lib/utils/xhtad_sdk.min.js'
// #endif

// #ifdef H5
// vConsole
// import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
// let vConsole = new VConsole() // 初始化
// #endif

const app = new Vue({
	...App
})
app.$mount()

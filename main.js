import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

// 全局函数
Vue.prototype.$app = App.globalData

import loadIconComponent from '@/components/loadIconComponent.vue'
Vue.component('loadIconComponent', loadIconComponent)
const app = new Vue({
	...App
})
app.$mount()

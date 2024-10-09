import App from './App'
import store from './store'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import share from "@/utils/share.js"
Vue.config.productionTip = false
Vue.prototype.globalProperties = {
  img_prefix: 'http://47.113.96.167:80/teapot'
};
Vue.mixin(share);
//为css设置一个变量
App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app
  }
}
// #endif

import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui';
import App from './App'
import router from './router'
import store from './store'
import db from './datastore'
import 'element-ui/lib/theme-chalk/index.css';
import './styles/reset.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
// 可以通过this.$db操作数据库
Vue.prototype.$db = db

Vue.use(ElementUI)

// this.$db.insert({}, (err, doc) => {})
// this.$db.update({name: '张三'}, {$set: {name: '李四'}}, (err, data) => {})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

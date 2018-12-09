// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import createStore from './store'
import router from './router'
require('element-ui/lib/theme-chalk/index.css')
import 'mavon-editor/dist/css/index.css'
require('mavon-editor/src/lib/css/md.css')
require('mavon-editor/src/lib/css/markdown.css')
import 'highlight.js/styles/github.css'
import moment from 'moment'
moment.locale('ja')

Vue.config.productionTip = false

const store = createStore()
store.dispatch('init')
global.store = store

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

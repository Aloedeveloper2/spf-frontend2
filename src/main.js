import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Chartkick from 'vue-chartkick'
import { Chart } from 'chart.js'

Vue.use(Chartkick.use(Chart))
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  beforeCreate(){this.$store.commit('initialiseStore');},
  render: h => h(App)
}).$mount('#app')

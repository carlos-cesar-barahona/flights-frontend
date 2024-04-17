import Vue from 'vue'
import App from './App.vue'
import '@/assets/scss/app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from '@/routes/routes';
import api from '@/network/http-common'

Vue.config.productionTip = false
Vue.prototype.$api = api;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

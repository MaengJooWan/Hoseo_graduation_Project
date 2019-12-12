import Vue from 'vue'
import App from './App.vue'
import {router} from './routes/index'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.use(BootstrapVue)
Vue.use(VModal, { dynamic: true})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

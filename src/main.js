import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.config.productionTip = false
Vue.http.options.root = "https://xxxxxxxxxx.firebaseio.com/";
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

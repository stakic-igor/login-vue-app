import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import Login from './components/Login';
import Welcome from './components/Welcome';
Vue.use(VueRouter);

const routes = [
     {path: '/', component: Login},
     {path: '/welcome', component: Welcome}
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

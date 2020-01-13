import Vue from 'vue'
import App from './App.vue'
import { store } from './store';
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import Login from './components/Login';
import Welcome from './components/Welcome';
import NotFound from './components/NotFound';
Vue.use(VueRouter);

const routes = [
    { path: '/', component: Login },
    { path: '/welcome', component: Welcome },
    { path: '*', component: NotFound }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

Vue.config.productionTip = false;

new Vue({
    vuetify,
    store,
    router,
    render: h => h(App)
}).$mount('#app')

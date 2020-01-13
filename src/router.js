import Vue from 'vue';
import VueRouter from 'vue-router';

// import componentes for router

import Login from './components/Login';
import Welcome from './components/Welcome';
import NotFound from './components/NotFound';

Vue.use(VueRouter);

// set paths
const routes = [
    { path: '/', component: Login },
    { path: '/welcome', component: Welcome },
    { path: '*', component: NotFound }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router;

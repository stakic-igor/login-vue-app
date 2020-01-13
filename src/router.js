import Vue from 'vue';
import VueRouter from 'vue-router';
import { store } from './store';

// import componentes for router to use
import Login from './components/Login';
import Welcome from './components/Welcome';
import NotFound from './components/NotFound';

Vue.use(VueRouter);
// set paths
const routes = [
    {
        path: '/',
        redirect: {
            name: "login"
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/welcome',
        name: 'welcome',
        component: Welcome,
        meta: {
            requiresAuth: true
          }
    },
    // for non exiting pages
    {
        path: '*',
        component: NotFound
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    let loginPage = ['/login']
    let isAutenticated = store.state.isAutenticated || window.localStorage.getItem('authUser')
    if (to.path == loginPage && isAutenticated) {
      return next('/welcome')
    }
    else if (to.matched.some(route => route.meta.requiresAuth)) {
      if (!isAutenticated) {
        next({ name: 'login' })
      }
      else {
        next()
      }
    } else {
        next()
    }
  })

export default router;

import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { //Импортирую шаблоны login
      path: '/login',
      name: 'login',
      meta: {layout: 'empty'},
      component: () => import('./views/Login.vue')
    },
    { //Импортирую шаблоны register
      path: '/register',
      name: 'register',
      meta: {layout: 'empty'},
      component: () => import('./views/Register.vue')
    },
    { //Импортирую шаблоны home
      path: '/',
      name: 'home',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Home.vue')
    },
    { //Импортирую шаблоны categories
      path: '/categories',
      name: 'categories',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Categories.vue')
    },
    { //Импортирую шаблоны detail
      path: '/detail/:id',
      name: 'detail',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Detail.vue')
    },
    { //Импортирую шаблоны history
      path: '/history',
      name: 'history',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/History.vue')
    },
    { //Импортирую шаблоны planning
      path: '/planning',
      name: 'planning',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Planning.vue')
    },
    { //Импортирую шаблоны profile
      path: '/profile',
      name: 'profile',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Profile.vue')
    },
    { //Импортирую шаблоны record
      path: '/record',
      name: 'record',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Record.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requeireAuth = to.matched.some(record => record.meta.auth)

  if (requeireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from "../views/Register"
import UserPage from "../views/UserPage"
import Login from "../views/Login"
import { auth } from '../firebase'
import AboutUs from "../views/AboutUs"
import Collection from "../views/Collection";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutUs
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/user',
    name: 'UserPage',
    component: UserPage,
    meta: {
      auth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/collection',
    name: 'Collection',
    component: Collection
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, form, next) => {
  const requiresAuth = to.matched.some(x => x.meta.auth)

  if( requiresAuth && !auth.currentUser ) {
    next('/login')
  } else {
    next()
  }



})

export default router

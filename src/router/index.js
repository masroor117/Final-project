import Vue from 'vue'
import VueRouter from 'vue-router'
import Movies from '../views/Movies.vue'
import store from "../store/index";

Vue.use(VueRouter)

const routes = [
    {
    path: '/',
    redirect:'/home',
  },
    {
    path: '/home',
    name: 'home',
     component: () => import(/* webpackChunkName: "Login" */ '../views/index.vue'),
    // Added to any route to have the guard function called for authentication access only.
  },
  {
    path: '/Movies',
    name: 'Movies',
    component: Movies,
    // Added to any route to have the guard function called for authentication access only.
    beforeEnter: guard
  },
  {
    // Sets it as route path so automatic direction to login first.
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/Register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue')
  },
  {
    path: '/FAQ',
    name: 'FAQ',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/FAQ.vue')
  },
  {
    path: '/Recommendation',
    name: 'Recommendation',
    beforeEnter: guard,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Recommendation" */ '../views/Recommendation.vue')
  },
  {
    path: '/partnerup',
    name: 'PartnerUp',
    beforeEnter: guard,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "PartnerUp" */ '../views/PartnerUp.vue')
  },
  {
    path: '/tvShows',
    name: 'TVShows',
    beforeEnter: guard,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "PartnerUp" */ '../views/tvShows.vue')
  }
]

function guard(to, from, next) {
  //Allows autenticated users to go whatever page they want.
  if (store.state.user.id) {
    next();
    //Sends unauthenticated users to the log in page first.
  } else {
    next("/login");
  }
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

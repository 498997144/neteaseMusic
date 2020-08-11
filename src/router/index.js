import Vue from 'vue'
import VueRouter from 'vue-router'

const More = () => import(/* webpackChunkName: "More" */ '../views/more/More.vue')

const My = () => import(/* webpackChunkName: "My" */ '../views/my/My.vue')

const Cloud = () => import(/* webpackChunkName: "Cloud" */ '../views/cloud/Cloud.vue')

const Movie = () => import(/* webpackChunkName: "Movie" */ '../views/movie/Movie.vue')

const Login = () => import(/* webpackChunkName: "Login" */ '../views/login/Login.vue')
const Phone = () => import(/* webpackChunkName: "Login" */ '../views/login/children/Phone.vue')
const Email = () => import(/* webpackChunkName: "Login" */ '../views/login/children/Email.vue')
const Register = () => import(/* webpackChunkName: "Login" */ '../views/login/children/Register.vue')


const Recommendsong = () => import(/* webpackChunkName: "Recommendsong" */ '../views/recommendsong/Recommendsong.vue')

const Songsheetcate = () => import(/* webpackChunkName: "Songsheetcate" */ '../views/songsheetcategory/Songsheetcate.vue')
const Tagcategories = () => import(/* webpackChunkName: "Tagcategories" */ '../views/tagcategories/Tagcategories.vue')
const Othercate = () => import(/* webpackChunkName: "Othercate" */ '../views/othercate/Othercate.vue')
const Sheetdetail = () => import(/* webpackChunkName: "Sheetdetail" */ '../views/sheetdetail/Sheetdetail.vue')


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect:'/more'
  },
  {
    path: '/more',
    name: 'more',
    meta:{
      showHeader:true,
    },
    component: More
  },
  {
    path: '/my',
    name: 'my',
    meta:{
      showHeader:true,
    },
    component: My
  },
  {
    path: '/cloud',
    name: 'cloud',
    meta:{
      showHeader:true,
    },
    component: Cloud
  },
  {
    path: '/movie',
    name: 'movie',
    meta:{
      showHeader:true,
    },
    component: Movie
  },
  {
    path: '/login',
    name: 'login',
    redirect:'/login/phone',
    component: Login,
    children:[
      {
        path:'phone',
        name:'phone',
        component: Phone,
      },
      {
        path:'email',
        name:'email',
        component: Email,
      },
      {
        path:'register',
        name:'register',
        component: Register,
      },
    ],
  },
  {
    path:'/recommend/song',
    name:'recommendsong',
    component:Recommendsong,
  },
  {
    path:'/songsheet/category',
    name:'songsheetcate',
    component:Songsheetcate,
  },
  {
    path:'/songsheet/tag',
    name:'tagcategories',
    component:Tagcategories,
  },
  {
    path:'/songsheet/othercate',
    name:'othercate',
    component:Othercate,
  },
  {
    path:'/songsheet/detail',
    name:'sheetdetail',
    component:Sheetdetail,
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass:'linkActive',
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router

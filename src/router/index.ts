import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue';
import UserView from '../views/UserView.vue'
import DataView from '../views/DataView.vue'
import DataForm from '../views/DataForm.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '',
    redirect: "/data"
  },
  {
    path: '/users',
    name: 'users',
    component: UserView
  },
  {
    path: '/data',

    children: [
      {
        path: '',
        name: "list",
        component: DataView,
      },
      {
      path: 'form/:name/:id/:action',
      name: 'form',
      props: true,
      component: DataForm
    },
    {
      path: "hello/:msg",
      name: "hello",
      props: true,
      component: HelloWorld
    }
  ],

  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

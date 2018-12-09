import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import mavonEditor from 'mavon-editor'
import Top from '@/pages/index'
import PostIndex from '@/pages/posts/index'
import PostShow from '@/pages/posts/show'
import PostNew from '@/pages/posts/new'
import PostEdit from '@/pages/posts/edit'

import 'mavon-editor/dist/css/index.css'

Vue.use(Router)
Vue.use(ElementUI)
Vue.use(mavonEditor)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Top',
      component: Top,
    },
    {
      path: '/posts',
      component: PostIndex,
      meta: { requiresAuth: true },
    },
    {
      path: '/posts/new',
      component: PostNew,
      meta: { requiresAuth: true },
    },
    {
      path: '/posts/:id',
      component: PostShow,
      meta: { requiresAuth: true },
    },
    {
      path: '/posts/:id/edit',
      component: PostEdit,
      meta: { requiresAuth: true },
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = router.app.$store
  if (to.matched.some(record => record.meta.requiresAuth) && !store.getters.isAuthenticated) {
    next({ path: '/', query: { redirect: to.fullPath }});
  } else {
    next();
  }
})

export default router

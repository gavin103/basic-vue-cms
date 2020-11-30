import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: () => import(/* webpackChunkName: "home" */ '../components/Home.vue'),
      meta: { title: '系统首页' },
      children: [
        {
            path: '/dashboard',
            component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
            meta: { title: '控制台' }
        },
        {
            path: '/formtable',
            component: () => import(/* webpackChunkName: "formtable" */ '../views/FormTable.vue'),
            meta: { title: '表单查询' }
        },

      ]
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
        meta: { title: '登录' }
    },
    {
        path: '/register',
        component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
        meta: { title: '注册' }
    },
    {
      path: '/error',
      component: () => import(/* webpackChunkName: "error" */ '../views/ErrorPage.vue'),
      meta: { title: '404' }
    },
    {
        path: '*',
        redirect: '/error'
    }
  ]
});

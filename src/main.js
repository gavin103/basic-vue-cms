import Vue from 'vue';
import ElementUI from 'element-ui';
import router from './router';
import './static/reset.css';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

Vue.config.productionTip = false

router.beforeEach((to,from,next) => {
  document.title = `${to.meta.title} | VUE`;
  const user = sessionStorage.getItem('user');
  if (!user && to.path !== '/login') {
      next('/login');
  }
  next()
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

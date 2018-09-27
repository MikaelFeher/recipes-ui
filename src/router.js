import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Home1 from './views/Home.1.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home1',
      name: 'home1',
      component: Home1, 
    },
    {
      path: '/',
      name: 'home',
      component: Home, 
    }
    
  ],
});

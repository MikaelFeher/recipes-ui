import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import RecipeDetails from '@/views/RecipeDetails.vue'
import Admin from '@/views/admin/Admin.vue'
import AddRecipe from '@/components/admin/AddRecipe.vue'
import DeleteRecipe from '@/components/admin/DeleteRecipe.vue'
import Login from '@/views/Login.vue'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home, 
    },
    {
      path: '/recipe/:id',
      name: 'recipe',
      component: RecipeDetails
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/admin/add-new-recipe',
      name: 'add-new-recipe',
      component: AddRecipe
    },
    {
      path: '/admin/delete-recipe',
      name: 'delete-recipe',
      component: DeleteRecipe
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/', '/login', '/recipe/:id', ];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = $cookies.get('token');
  console.log('loggenIn: ', loggedIn)

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})

export default router
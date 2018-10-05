import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import RecipeDetails from '@/views/RecipeDetails.vue'
import Admin from '@/views/admin/Admin.vue'
import AddRecipe from '@/components/admin/AddRecipe.vue'
import DeleteRecipe from '@/components/admin/DeleteRecipe.vue'
import Login from '@/views/Login.vue'
import LoggedOut from '@/views/LoggedOut.vue'

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
      component: Admin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/add-new-recipe',
      name: 'add-new-recipe',
      component: AddRecipe,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/delete-recipe',
      name: 'delete-recipe',
      component: DeleteRecipe,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  // const publicPages = ['/', '/login', '/recipe/:id'];
  // const authRequired = !publicPages.includes(to.path);
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const loggedIn = $cookies.get('user');
  console.log('loggedIn: ', loggedIn)

  if (requiresAuth && !loggedIn) {
    return next('/login');
  }

  next();
})

export default router
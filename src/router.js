import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import RecipeDetails from '@/views/RecipeDetails.vue'
import Admin from '@/views/admin/Admin.vue'
import AddRecipe from '@/components/admin/AddRecipe.vue'
import DeleteRecipe from '@/components/admin/DeleteRecipe.vue'

Vue.use(Router)

export default new Router({
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

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes: [],
    filteredRecipes: [],
    ingredients: [],
    ingredientsFilteredByName: [],
    addRecipeMessage: {},
    showDeleteMessage: false,
    loggedInUser: {},
    isLoggedIn: false,
    logInErrorMsg: ''
  },
  getters: {
    getRecipeById: state => id => {
      return state.recipes.find(recipe => recipe._id === id)
    }
  },
  mutations: {
    POPULATE_RECIPES(state, recipes) {
      state.recipes = recipes.data
      console.log(!state.recipes.length ? 'No recipes...' : 'Recipes loaded ok!')
    },
    POPULATE_INGREDIENTS(state, ingredients) {
      state.ingredients = ingredients.data
      console.log(!state.ingredients.length ? 'No ingredients...' : 'Ingredients loaded ok!')
    },
    FILTER_RECIPES(state, filteredResult) {
      state.filteredRecipes = filteredResult
    },
    FILTER_INGREDIENTS(state, filteredResult) {
      state.ingredientsFilteredByName = filteredResult
    },
    CLEAR_FILTERED_INGREDIENTS(state) {
      state.ingredientsFilteredByName = []
    },
    ADD_RECIPE_MESSAGE(state, message) {
      state.addRecipeMessage = Object.assign({}, state.addRecipeMessage, message)
    },
    DELETE_RECIPE_MESSAGE(state, deleteMessageStatus) {
      state.showDeleteMessage = deleteMessageStatus
    },
    SET_USER_LOGGED_IN_STATUS(state, payload) {
      state.isLoggedIn = payload.loggedInStatus
      state.loggedInUser = payload.user
    },
    SET_LOG_IN_ERROR_MESSAGE(state, msg) {
      state.logInErrorMsg = msg
    }
  },
  actions: {
    async fetchRecipesFromAPI({ commit }) {
      const recipes = await axios.get('http://localhost:3003/recipes/')
      commit('POPULATE_RECIPES', recipes)
    },
    async fetchIngredientsFromAPI({ commit }) {
      const ingredients = await axios.get('http://localhost:3003/ingredients/')
      commit('POPULATE_INGREDIENTS', ingredients)
    },
    filterRecipesByName({ commit, state }, recipeToFind) {
      const filtered = state.recipes.filter(recipe => recipe.name.toLowerCase().includes(recipeToFind.toLowerCase()))
      if(!filtered.length) return commit('FILTER_RECIPES', [{ error: 'Finns inga recept med det namnet...' }])
      commit('FILTER_RECIPES', filtered)
    },
    filterRecipesByCategory({ commit, state }, category) {
      commit('FILTER_RECIPES', [])
      
      if(category === 'alla') {
        commit('FILTER_RECIPES', [])
        return
      }
      
      const filtered = state.recipes.filter(recipe => recipe.categories && recipe.categories.includes(category.toLowerCase()))
      if(!filtered.length) return commit('FILTER_RECIPES', [{ error: 'Finns inga recept i denna kategorin...' }])
      commit('FILTER_RECIPES', filtered)
    },
    filterIngredientsByName({ commit, state }, ingredientToFind) {
      const filtered = state.ingredients.filter(ingredient => ingredient.name.toLowerCase().includes(ingredientToFind.toLowerCase()))
      commit('FILTER_INGREDIENTS', filtered)
    },
    clearOutFilteredIngredients({ commit }) {
      commit('CLEAR_FILTERED_INGREDIENTS')
    },
    async addNewRecipe({ state, commit, dispatch }, newRecipe) {
      commit('ADD_RECIPE_MESSAGE', {})
      await axios.post('http://localhost:3003/admin/recipe/add-new-recipe', newRecipe, {headers:{
        'Authorization': `Bearer ${state.loggedInUser.token}`
      }})
      .then(res => {
        if(res.data.error) return commit('ADD_RECIPE_MESSAGE', { error: 'Det finns redan ett recept med det namnet...' })
        return commit('ADD_RECIPE_MESSAGE', { success: 'Receptet skapat! :)' })
      })
      setTimeout(() => commit('ADD_RECIPE_MESSAGE', { error: '', success: '' }), 4000)
      dispatch('fetchRecipesFromAPI')
    },
    async deleteRecipe({ state, commit, dispatch },id) {
      await axios.delete(`http://localhost:3003/admin/recipe/delete-recipe/${id}`, {headers:{
        'Authorization': `Bearer ${state.loggedInUser.token}`
      }})
        .then(() => {
          dispatch('fetchRecipesFromAPI')
          commit('DELETE_RECIPE_MESSAGE', true)
        })
        setTimeout(() => commit('DELETE_RECIPE_MESSAGE', false), 4000)
    },
    requestAuthenticationStatus({ commit }) {
      const user = $cookies.get('user') || {}
      const loggedInStatus = !!user.token
      const payload = {
        user,
        loggedInStatus 
      }
      commit('SET_USER_LOGGED_IN_STATUS', payload)
    },
    logInUser({ commit }, loginDetails){
      const { username, password } = loginDetails
      axios.post('http://localhost:3003/login', {
        username,
        password
      }).then((result) => {
        
        const user = result.data.user
        $cookies.set('user', user, '1d')
        router.replace('/admin')
        const loggedInStatus = !!user.token
        const payload = {
          user,
          loggedInStatus 
        }
        commit('SET_USER_LOGGED_IN_STATUS', payload)
      })
      .catch(err => {
        commit('SET_LOG_IN_ERROR_MESSAGE', 'Ogiltigt lösenord')
        setTimeout(() => commit('SET_LOG_IN_ERROR_MESSAGE', ''), 4000)
      })
    },
    logOutUser({ commit }) {
      $cookies.remove('user')
      router.replace('/login')
      const payload = {
        user: {},
        loggedInStatus: false
      }
      commit('SET_USER_LOGGED_IN_STATUS', payload)
    }
  }
});

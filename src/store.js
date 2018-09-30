import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes:[],
    recipesFilterByName: []
  },
  getters: {
    getRecipeById: state => id => {
      return state.recipes.find(recipe => recipe._id === id)
    }
    
  },
  mutations: {
    POPULATE_RECIPES(state, recipes) {
      state.recipes = recipes.data
    },
    FILTER_RECIPES(state, filteredResult) {
      state.recipesFilterByName = filteredResult
    }
  },
  actions: {
    async fetchRecipesFromAPI({ commit }) {
      const recipes = await axios.get('http://localhost:3003/recipes/')
      commit('POPULATE_RECIPES', recipes)
    },
    filterRecipesByName({ commit, state }, recipeToFind) {
      const filtered = state.recipes.filter(recipe => recipe.name.toLowerCase().indexOf(recipeToFind.toLowerCase()) === 0)
      commit('FILTER_RECIPES', filtered)
    },
    async addNewRecipe({ dispatch }, newRecipe) {
      await axios.post('http://localhost:3003/recipes/admin/recipe/add-new-recipe', newRecipe)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
      dispatch('fetchRecipesFromAPI')
    },
    async deleteRecipe({ dispatch },id) {
      await axios.delete(`http://localhost:3003/recipes/admin/recipe/delete-recipe/${id}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
      dispatch('fetchRecipesFromAPI')
    }
  },
});

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes: [],
    filteredRecipes: [],
    ingredients: [],
    ingredientsFilteredByName: []
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
      commit('FILTER_RECIPES', filtered)
    },
    filterRecipesByCategory({ commit, state }, category) {
      if(category === 'alla') {
        commit('FILTER_RECIPES', [])
        return
      }
      const filtered = state.recipes.filter(recipe => recipe.categories && recipe.categories.includes(category.toLowerCase()))
      if(!filtered.length) return
      commit('FILTER_RECIPES', filtered)
    },
    filterIngredientsByName({ commit, state }, ingredientToFind) {
      const filtered = state.ingredients.filter(ingredient => ingredient.name.toLowerCase().includes(ingredientToFind.toLowerCase()))
      commit('FILTER_INGREDIENTS', filtered)
    },
    clearOutFilteredIngredients({ commit }) {
      commit('CLEAR_FILTERED_INGREDIENTS')
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

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes:[],
    searchResult: []
  },
  mutations: {
    GET_RECIPES(state, recipes) {
      state.recipes = recipes.data
    },
    FIND_RECIPE(state, searchResult) {
      state.searchResult = searchResult
    }
  },
  actions: {
    async getRecipes({ commit }) {
      const recipes = await axios.get('http://localhost:3003/recipes/')
      commit('GET_RECIPES', recipes)
    },
    findRecipe({ commit, state }, recipeToFind) {
      const result = state.recipes.filter(recipe => recipe.name.toLowerCase().indexOf(recipeToFind.toLowerCase()) === 0)
      commit('FIND_RECIPE', result)
    }
  },
});

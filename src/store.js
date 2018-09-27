import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes:[]
  },
  mutations: {
    GET_RECIPES(state, recipes) {
      state.recipes = recipes.data
    }
  },
  actions: {
    async getRecipes({ commit }) {
      const recipes = await axios.get('http://localhost:3003/recipes/')
      commit('GET_RECIPES', recipes)
    }
  },
});

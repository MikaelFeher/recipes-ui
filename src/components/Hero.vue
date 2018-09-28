<template>
  <div id="hero">
    <div id="banner" class="row">
      <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4" id="search-bar">
        <input type="text" id="search" class="white" v-model="recipeToFind" v-on:input="findARecipe()" autocomplete="off">
        <label for="search" class="orange-text">Sök recept...</label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Hero',
  data() {
    return {
      recipeToFind: ''
    }
  },
  methods: {
    ...mapActions(['filterRecipesByName']),
    findARecipe() {
      this.filterRecipesByName(this.recipeToFind)
    }
  },

}
</script>

<style>
  #hero {
    width: 100%;
    padding: 0;
  }
  #banner {
    width: 100%;
    height: 175px;
    background: url(../assets/table-of-food.jpg) no-repeat;
    background-size: cover;
    background-size: 100%;
    margin-bottom: 3%;
    padding: 0;
  }

  #search-bar {
    top: calc(100%/2 - 30px);
  }
</style>

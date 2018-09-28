<template>
  <div id="recipes-display" class="container row">
    <div class="card col xl3 l4 m6 s10 offset-s1" v-for="recipe in !!searchResult.length ? searchResult : recipes" :key="recipe._id">
      <div class="card-image waves-effect waves-block waves-light">
        <img v-if="recipe.img" class="activator" :src="recipe.img">
        <img v-else class="activator" src="@/assets/table-of-food.jpg">
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">{{ recipe.name }}<i class="material-icons right">more_vert</i></span>
        <p>{{ recipe.description }}</p>
        <router-link :to="'/recipe/' + recipe._id">Gå till receptet</router-link>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">{{ recipe.name }}<i class="material-icons right">close</i></span>
        <ul>
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">{{ ingredient.name }} {{ ingredient.units }}{{ ingredient.measuringUnit }}</li>
        </ul>
        <ul>
          <li v-for="(instruction, index) in recipe.instructions" :key="index" class="left-align">{{ index + 1 }}. {{ instruction }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RecipesDisplay',
  computed: {
    ...mapState([
      'recipes',
      'searchResult'
    ])
  }
}
</script>

<style scoped>
.container {
  width: 85vw;
  transition: all 1.5s ease-in-out;
}
.card {
  min-height: 350px;
}
img {
  max-height: 170px;
  size: 100%;
}
</style>

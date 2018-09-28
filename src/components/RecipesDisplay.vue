<template>
  <div id="recipes-display" class="container row">
    <div class="card col xl3 l4 m6 s10 offset-s1" v-for="recipe in recipes" :key="recipe._id">
      <div class="card-image waves-effect waves-block waves-light">
        <img v-if="recipe.img" class="activator" :src="recipe.img">
        <img v-else class="activator" src="@/assets/table-of-food.jpg">
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">{{ recipe.name }}<i class="material-icons right">more_vert</i></span>
        <p>{{ recipe.description }}</p>
        <p><a href="#">This is a link</a></p>
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
      'recipes'
    ])
  }
}
</script>

<style scoped>
.container {
  width: 85vw;
}
  .card {
    min-height: 350px;
    /* max-width: 30%; */
    /* margin-right: 1%; */
  }
  img {
    max-height: 170px;
    size: 100%;
  }
</style>

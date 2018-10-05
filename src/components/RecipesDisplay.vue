<template>
  <div id="recipes-display" class="container row">
    <div v-if="filteredRecipes.length && filteredRecipes[0].error">
      <h4>{{ filteredRecipes[0].error }}</h4>
    </div>
    <div v-else class="card col xl3 l4 m6 s10 offset-s1" v-for="recipe in !!filteredRecipes.length ? filteredRecipes : recipes" :key="recipe._id">
      <div class="card-image waves-effect waves-block waves-light">
        <img v-if="recipe.img" class="activator" :src="recipe.img">
        <img v-else class="activator" src="@/assets/table-of-food.jpg">
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">{{ recipe.name }}</span>
        <p>{{ recipe.description }}</p>
        <div>
          <router-link :to="{ name: 'recipe', params: { id: recipe._id  }}" id="recipe-link">Gå till receptet</router-link>
        </div>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">{{ recipe.name }}<i class="material-icons right">close</i></span>
        <p>Det här behöver du:</p>
        <ul>
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index" class="left-align">{{ ingredient.name }}  <span class="right">{{ ingredient.units }}{{ ingredient.measuringUnit }}</span>  </li>
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
        'filteredRecipes'
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
    height: 170px;
    size: 100%;
  }

  #recipe-link {
    position: absolute;
    left: calc(100% / 3.4);
    bottom: 20px;
  }
</style>

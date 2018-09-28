<template>
  <div id="recipe-details" class="container row">
    <div class="col m5 offset-m1 s10 offset-s1" id="left-section">
      <img v-if="recipe.img" :src="recipe.img" alt="picture of food">
      <img v-else src="@/assets/table-of-food.jpg" alt="picture of food">
    </div>
    <div class="col m6 s10 offset-s1" id="right-section">
      <h3>{{ recipe.name }}</h3>
      <p>{{ recipe.description }}</p>
      <div class="row">
        <ul>
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index" class="row ingredient-item">
            <p class="col s6">{{ ingredient.name }}</p> <p class="col s4">{{ ingredient.units }}{{ ingredient.measuringUnit }}</p>
          </li>
        </ul>
      </div>
      <div class="row">
        <ul>
          <li v-for="(instruction, index) in recipe.instructions" :key="index" class="row instruction-item">
            <p class="col s12">{{ ++index }}. {{ instruction }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RecipeDetails',
  data() {
    return {
      recipe: {},
      placeholderImg: '@/assets/table-of-food.jpg'
    }
  },
  computed: {
    ...mapGetters(['getRecipeById'])
  },
  mounted: function() {
    this.getRecipe()
  },
  methods: {
    getRecipe() {
      const { id } = this.$route.params;
      this.recipe = this.getRecipeById(id)
      console.log(this.recipe)
    }
  },
}
</script>

<style scoped>
#recipe-details {
  padding-top: 3%;
  text-align: left;
}

#left-section {
  padding: 1%;
  height: 70vh;
}
#right-section {
  padding: 0 3% 3% 3%;
  height: 70vh;
  overflow-y: scroll;
}

img {
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
}

li {
  padding: 0 0 0 3%;
  margin: 0;
  line-height: 1.1rem;
}

.instruction-item p {
  margin: 0 0 2% 0;
}

.ingredient-item {
  line-height: .1rem;
}

h3 {
  padding-top: 1%;
  margin: 0;
}

@media (max-width: 600px) {
  #left-section {
  padding: 1%;
}
#right-section {
  overflow: auto;
}
}

</style>


<template>
  <div id="delete-recipe">
    <h1>Ta bort recept</h1>
    <div class="row">
      <div v-for="recipe in recipes" :key="recipe._id" class="col m3 recipe-box">
        <h4>{{ recipe.name }}</h4>
        <p>{{ recipe.description ? recipe.description : 'Ingen beskrivning' }}</p>
        <button class="waves-effect waves-light btn red" @click="deleteRecipe(recipe._id)">Ta bort</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'DeleteRecipe',
  data() {
    return {
      recipesToDelete: []
    }
  },
  computed: {
    ...mapState(['recipes'])
  },
  methods: {
    deleteRecipe(recipe) {
      console.log('recipe: ', recipe);
    }
  }

}
</script>

<style scoped>
.recipe-box {
  height: 200px;
}

</style>

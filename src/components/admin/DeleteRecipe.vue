<template>
  <div id="delete-recipe" class="container">
    <div class="row">
      <h1>Ta bort recept</h1>
    </div>
    <div class="row">
      <div class="col push-m1" id="recipe-wrapper">
        <div v-for="recipe in recipes" :key="recipe._id" class="col m3 s12 recipe-box">
          <h4>{{ recipe.name }}</h4>
          <p>{{ recipe.description ? recipe.description : 'Ingen beskrivning' }}</p>
          <button class="waves-effect waves-light btn red" @click="deleteRecipe(recipe._id)">Ta bort</button>
        </div>
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
    ...mapActions(['deleteRecipe'])
  }

}
</script>

<style scoped>
#recipe-wrapper {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.recipe-box {
  position: relative;
  height: 250px;
  margin: .5% 1%;
  border: 1px solid #333;
  box-shadow: 0 0 15px 0 #333;
}

button{
  position: absolute;
  bottom: 0px;
  left: calc(100% / 2.2 - 36px);
}

</style>

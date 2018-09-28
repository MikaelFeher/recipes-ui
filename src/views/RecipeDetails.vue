<template>
  <div id="recipe-details" class="container row">
    {{ recipe }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RecipeDetails',
  data() {
    return {
      recipe: {}
    }
  },
  computed: {
    ...mapState(['recipes'])
  },
  mounted: function() {
    this.getRecipe()
  },
  methods: {
    getRecipe() {
      const { id } = this.$route.params;
      console.log('id: ', id);
      console.log('this.recipes: ', this.recipes);
      const recipe = this.recipes.filter(recipe => recipe._id === id)
      this.recipe = recipe[0]
      console.log('this.recipe: ', this.recipe);
    }
  },

}
</script>

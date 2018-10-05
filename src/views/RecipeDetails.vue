<template>
  <div id="recipe-details" class="">
    <div v-if="!recipe" class="center" id="">
      <div class="row">
        <p>{{ errorMsg }}</p>
      </div>
      <div class="row">
        <router-link v-if="unknownId" class="waves-effect waves-light btn blue" to="/">Tillbaka till första sidan</router-link>
        <button v-else class="waves-effect waves-light btn blue" @click="getRecipe">Ladda om receptet</button>
      </div>
    </div>
    <div v-else class="row">
      <div class="col m4 offset-m1 s10 offset-s1" id="left-section">
        <div class="row">
          <img v-if="recipe.img" :src="recipe.img" alt="picture of food">
          <img v-else src="@/assets/table-of-food.jpg" alt="picture of food">
        </div>
        <div class=" row">
          <p><b>Näringsinnehåll</b></p>
          <p>Näringsvärde per 100gram</p>
          <table class="col s12 striped">
            <thead>
              <tr>
                <th colspan="4">Näringsämne</th>
                <th>gram</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(key, value) in recipe.totalNutritionalValuesPerHundredGrams" :key="value">
                <td colspan="4">{{ value }}</td>
                <td>{{ key.replace('.', ',') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col m6 s10 offset-s1" id="right-section">
        <h3>{{ recipe.name }}</h3>
        <span v-for="(category, index) in recipe.categories" :key="index" class="badge teal white-text"> {{ category }} </span>
        <div class="row">
          <p>{{ recipe.description }}</p>
        </div>
        <div class="row">
          <p><b>Tillagningstid:</b> {{ recipe.cookingTime }}</p>
          <p><b class="col s3">Antal personer:</b> <input type="number" v-model="numberOfPeople" class="col s1 center" value="4" @change="updateNumbers"/></p>
        </div>
        <div class="row">
          <p><b>Det här behöver du:</b></p>
          <ul>
            <li v-for="(ingredient, index) in recipe.ingredients" :key="index" class="row ingredient-item">
              <p class="">{{ (parseFloat((Math.ceil((ingredient.units * ingredientModifier) * 2) / 2).toFixed(2))).toString().replace('.', ',') }} {{ ingredient.measuringUnit }} <span> {{ ingredient.name }}</span></p>
            </li>
          </ul>
        </div>
        <div class="row">
          <p><b>Så här gör du:</b></p>
          <ul>
            <li v-for="(instruction, index) in recipe.instructions" :key="index" class="row instruction-item">
              <p class="col s12"><span class="light-blue-text">{{ ++index }}</span>. {{ instruction }}</p>
            </li>
          </ul>
        </div>
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
        placeholderImg: '@/assets/table-of-food.jpg',
        unknownId: false,
        secondTry: false,
        errorMsg: '',
        numberOfPeople: 4,
        ingredientModifier: 1
      }
    },
    computed: {
      ...mapGetters(['getRecipeById'])
    },
    mounted: function() {
      this.getRecipe()
      this.updateNumbers()
    },
    methods: {
      async getRecipe() {
        const { id } = this.$route.params;
        this.recipe = this.getRecipeById(id)

        if(this.secondTry && !this.recipe) {
          this.unknownId = true
          this.errorMsg = 'Receptet verkar inte finnas...'
          return
        }
        if(!this.recipe && !this.secondTry) {
          this.secondTry = true
          this.errorMsg = 'Ooops... Något gick fel... Prova att ladda om receptet'
          this.recipe = this.getRecipeById(id)
          return
        } 
        this.secondTry = false
        this.unknownId = false
        this.calculateNutritionalValuesForRecipe()
      },
      redirectToHome() {
        this.$router.replace('home')
      },
      updateNumbers() {
        this.numberOfPeople = this.numberOfPeople > 0 ? this.numberOfPeople : 1
        this.updateIngredientModifier()
      },
      updateIngredientModifier() {
        this.ingredientModifier = this.numberOfPeople / this.recipe.numberOfPeople
      },
      async calculateNutritionalValuesForRecipe() {
        let totalIngredientWeightInGrams = 0
        const result = await this.recipe.ingredients.map(ingredient => {
          totalIngredientWeightInGrams += ingredient.unitEquivalentInGrams
          const amountInGrams = ingredient.unitEquivalentInGrams

          // Need to know how many 100grams of the ingredient is in the recipe...
          const amountToCalculate = amountInGrams/100
          return ingredient.nutritionalValues.reduce((acc,value) => 
            Object.assign(
              {}, 
              acc, 
              { [value.name]: value.value * amountToCalculate }
              ), {}
            )
        })
        
        const calcTotal = value => result.reduce((acc, object) => acc + object[value], 0)
        
        let totalResult = {
          'Energi (kcal)': 0,
          'Kolhydrater': 0,
          'Protein': 0,
          'Salt': 0,
          'Socker totalt': 0,
          'Summa enkelomättade fettsyror': 0,
          'Summa fleromättade fettsyror': 0,
          'Summa mättade fettsyror': 0
        }
        const modifier = totalIngredientWeightInGrams / 100
        totalResult = Object.keys(totalResult).reduce((acc, value) => Object.assign({}, acc, { [value] : ((calcTotal(value) / totalIngredientWeightInGrams) * 100).toFixed(2) }), {})
        this.recipe = Object.assign({}, this.recipe, { totalNutritionalValuesPerHundredGrams : totalResult })
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


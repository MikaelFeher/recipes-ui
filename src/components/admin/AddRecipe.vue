<template>
  <div id="create-recipe" class="container row">
    <h3>Lägg till ett nytt recept</h3>
    <form @submit.prevent='addRecipe' class="col s6 offset-s3">
      <!-- General info -->
      <div class="input-field">
        <label for="name">Vad heter rätten?</label>
        <input type="text" class="" id="name" v-model="newRecipe.name">
      </div>
      <div class="input-field">
        <label for="numberOfPeople">Antal personer: </label>
        <input type="number" class="center-align" id="numberOfPeople" v-model="newRecipe.numberOfPeople">
      </div>
      <div class="input-field">
        <label for="description">Beskriv rätten</label>
        <textarea id="description" class="materialize-textarea" v-model="newRecipe.description"></textarea>
      </div>
      <div class="input-field">
        <label for="img">Bild på rätten</label>
        <input type="text" id="img" v-model="newRecipe.img">
      </div>
      <div class="input-field">
        <label for="cooking-time">Tillagningstid:</label>
        <input type="text" id="cooking-time" v-model="newRecipe.cookingTime">
      </div>
      <div class="input-field">
        <label for="difficulty">Svårighetsgrad:</label>
        <input type="text" id="difficulty" v-model="newRecipe.difficultyLevel">
      </div>
      <!-- Categories -->
      <div>
        <div class="row">
          <label>Vilka kategorier tillhör rätten?</label>
        </div>
        <div class="row" id="category-selection">
          <label class="col s3" v-for="(category, index) in categoryOptions" :key="index">
            <input type="checkbox" :value="category" v-model="newRecipe.categories"/>
            <span>{{ category }}</span>
          </label>
        </div>
      </div>
      <!-- Ingredients -->
      <h4>Ingredienser</h4>
      <table>
        <thead>
          <th>Ingrediens</th>
          <th>Mängd</th>
          <th>Gram/enhet</th>
        </thead>
        <tbody v-for="(ingredient, index) in newRecipe.ingredients" :key="index">
          <td>{{ ingredient.name }}</td>
          <td>{{ ingredient.units }} {{ ingredient.measuringUnit }}</td>
          <td>{{ ingredient.unitEquivalentInGrams }} gram</td>
        </tbody>
      </table>
      <form @submit.prevent="addIngredient">
        <div class="input-field">
          <label for="ingredient-name">Ingrediens</label>
          <input type="text" class="" id="ingredient-name" v-model="ingredient.name">
        </div>
        <div class="input-field">
          <label for="ingredient-units">Mängd</label>
          <input type="number" class="" id="ingredient-units" v-model="ingredient.units">
        </div>
        <div class="input-field">
          <label for="ingredient-measuringUnit">Måttenhet</label>
          <input type="text" class="" id="ingredient-measuringUnit" v-model="ingredient.measuringUnit">
        </div>
        <div class="input-field">
          <label for="ingredient-unitEquivalentInGrams">Motsvarar i gram</label>
          <input type="number" class="" id="ingredient-unitEquivalentInGrams" v-model="ingredient.unitEquivalentInGrams">
        </div>
        <button type="button" class="btn waves-effect waves-light" v-on:click="addIngredient">Lägg till ingrediens</button>
      </form>
      <!-- Instructions -->
      <h4>Instruktioner</h4>
      <ul id="instructions-list">
        <li v-for="(instruction, index) in newRecipe.instructions" :key="index" id="instructions-list-item" class="left-align">
          {{ index + 1 }}. {{ instruction }}
        </li>
      </ul>
      <div class="input-field">
        <label for="instructions">Lägg till instruktion</label>
        <input type="text" class="" id="instructions" v-model="instruction">
      </div>
      <button type="button" class="btn waves-effect waves-light" v-on:click="addInstruction">Lägg till instruktion</button>
      <!-- Submit/Cancel buttons -->
      <div class="row">
        <button type="submit" class="waves-effect waves-light btn col s4 offset-s1">Spara<i class="material-icons right">send</i></button>
        <button type="button" class="waves-effect waves-light btn red col s4 offset-s2">Avbryt<i class="material-icons right">cancel</i></button>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'AddNewRecipe',
    data() {
      return {
        newRecipe: {
          name: '',
          numberOfPeople: '',
          ingredients: [],
          instructions: [],
          img: '',
          description: '',
          categories: [],
          cookingTime: '',
          difficultyLevel: ''
        },
        categoryOptions: [
          "frukost",
          "lunch",
          "middag",
          "fest"
        ],
        ingredient: {
          name: '',
          units: '',
          measuringUnit: '',
          unitEquivalentInGrams: ''
        },
        instruction: '',
        // name: '',
        // numberOfPeople: '',
        // ingredientName: '',
        // ingredientUnits: '',
        // ingredientMeasuringUnit: '',
        // ingredientunitEquivalentInGrams: '',
        // ingredientsList: [],
        // instructionsList: [],
        // img: '',
        // description: '',
        // category: [],
        // cookingTime: '',
        // difficultyLevel: ''
      }
    },
    methods: {
      ...mapActions(['addNewRecipe']),
      addIngredient() {
        this.newRecipe.ingredients = this.newRecipe.ingredients.concat(this.ingredient)
        this.ingredient =  {
          name: '',
          units: '',
          measuringUnit: '',
          unitEquivalentInGrams: ''
        }
      },
      addInstruction() {
        if(this.instruction.length < 2) return;
        this.newRecipe.instructions = this.newRecipe.instructions.concat(this.instruction)
        this.instruction = '';
      },
      addRecipe() {
        this.addNewRecipe(this.newRecipe)
        this.resetValues()
      },
      resetValues() {
        this.newRecipe = {
          name: '',
          numberOfPeople: '',
          ingredients: [],
          instructions: [],
          img: '',
          description: '',
          categories: [],
          cookingTime: '',
          difficultyLevel: ''
        }
        this.ingredient = {
          name: '',
          units: '',
          measuringUnit: '',
          unitEquivalentInGrams: ''
        },
        this.instruction = ''
      }
    }
  }

</script>

<style>
  /* @import "https://cdn.jsdelivr.net/npm/animate.css@3.5.2";
  @import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
  @import "https://fonts.googleapis.com/icon?family=Material+Icons"; */

  button, input[type="button"] {
    margin-bottom: 8%;
  }

  table {
    width: 30%;
    margin: auto;
    margin-bottom: 2%;
  }

  #category-selection span {
    text-transform: capitalize;
  }
</style>

<template>
  <div id="create-recipe" class="container row">
    <h3>Lägg till ett nytt recept</h3>
    <form @submit.prevent='addRecipe' class="col s6 offset-s3">
      <div class="input-field">
        <label for="name">Vad heter rätten?</label>
        <input type="text" class="" id="name" v-model="name">
      </div>
      <div class="input-field">
        <label for="numberOfPeople">Antal personer: </label>
        <input type="number" class="center-align" id="numberOfPeople" v-model="numberOfPeople">
      </div>
      <div class="input-field">
        <label for="description">Beskriv rätten</label>
        <textarea id="description" class="materialize-textarea" v-model="description"></textarea>
      </div>
      <div class="input-field">
        <label for="img">Bild på rätten</label>
        <input type="text" id="img" v-model="img">
      </div>
      <div class="input-field">
        <label for="cooking-time">Tillagningstid:</label>
        <input type="text" id="cooking-time" v-model="cookingTime">
      </div>
      <div class="input-field">
        <label for="difficulty">Svårighetsgrad:</label>
        <input type="text" id="difficulty" v-model="difficultyLevel">
      </div>

      <div class="input-field" id="select-field">
        <select v-model="category" multiple id="category">
          <option value="Frukost">Frukost</option>
          <option value="Lunch">Lunch</option>
          <option value="Middag">Middag</option>
          <option value="Fest">Fest</option>
        </select>
        <label for="category">Vilka kategorier tillhör rätten?</label>
      </div>
      <h4>Ingredienser</h4>
      <table>
        <thead>
          <th>Ingrediens</th>
          <th>Mängd</th>
          <th>Gram/enhet</th>
        </thead>
        <tbody v-for="(ingredient, index) in ingredientsList" :key="index">
          <td>{{ ingredient.name }}</td>
          <td>{{ ingredient.units }} {{ ingredient.measuringUnit }}</td>
          <td>{{ ingredient.unitEquivalentInGrams }} gram</td>
        </tbody>
      </table>
      <div class="input-field">
        <label for="ingredientName">Ingrediens</label>
        <input type="text" class="" id="ingredientName" v-model="ingredientName">
      </div>
      <div class="input-field">
        <label for="ingredientName">Mängd</label>
        <input type="number" class="" id="ingredientUnits" v-model="ingredientUnits">
      </div>
      <div class="input-field">
        <label for="ingredientName">Måttenhet</label>
        <input type="text" class="" id="ingredientMeasuringUnit" v-model="ingredientMeasuringUnit">
      </div>
      <div class="input-field">
        <label for="ingredientName">Motsvarar i gram</label>
        <input type="number" class="" id="ingredientunitEquivalentInGrams" v-model="ingredientunitEquivalentInGrams">
      </div>
      <button type="button" class="btn waves-effect waves-light" v-on:click="addIngredient">Lägg till ingrediens</button>

      <h4>Instruktioner</h4>
      <ul id="instructions-list">
        <li v-for="(instruction, index) in instructionsList" :key="index" id="instructions-list-item" class="left-align">
          {{ index + 1 }}. {{ instruction }}
        </li>
      </ul>
      <div class="input-field">
        <label for="instructions">Lägg till instruktion</label>
        <input type="text" class="" id="instructions" v-model="instruction">
      </div>
      <button type="button" class="btn waves-effect waves-light" v-on:click="addInstruction">Lägg till instruktion</button>

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
        name: '',
        numberOfPeople: '',
        ingredientName: '',
        ingredientUnits: '',
        ingredientMeasuringUnit: '',
        ingredientunitEquivalentInGrams: '',
        ingredientsList: [],
        instruction: '',
        instructionsList: [],
        img: '',
        description: '',
        category: [],
        cookingTime: '',
        difficultyLevel: ''
      }
    },
    created: function() {
      // Materialize CSS select functionality initialization...
      document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('select')
        var instances = M.FormSelect.init(elems, {})
      })
    },
    methods: {
      ...mapActions(['addNewRecipe']),
      addIngredient() {
        this.ingredientsList = this.ingredientsList.concat({
          name: this.ingredientName,
          units: this.ingredientUnits,
          measuringUnit: this.ingredientMeasuringUnit,
          unitEquivalentInGrams: this.ingredientunitEquivalentInGrams
        })
        this.ingredientName = ''
        this.ingredientUnits = ''
        this.ingredientMeasuringUnit = ''
        this.ingredientunitEquivalentInGrams = ''
      },
      addInstruction() {
        if(this.instruction.length < 2) return;
        this.instructionsList = this.instructionsList.concat(this.instruction)
        this.instruction = '';
      },
      addRecipe() {
        const newRecipe = {
          "name": this.name,
          "numberOfPeople": this.numberOfPeople,
          "ingredients": this.ingredientsList,
          "instructions": this.instructionsList,
          "img": this.img,
          "description": this.description,
          "category": this.category,
          "cookingTime": this.cookingTime,
          "difficultyLevel": this.difficultyLevel
        }

        this.addNewRecipe(newRecipe)

        this.resetValues()
      },
      resetValues() {
        this.name = ''
        this.numberOfPeople = ''
        this.ingredientName = ''
        this.ingredientUnits = ''
        this.ingredientMeasuringUnit = ''
        this.ingredientunitEquivalentInGrams = ''
        this.ingredientsList = []
        this.instruction = ''
        this.instructionsList = []
        this.img = ''
        this.description = ''
        this.category = []
        this.cookingTime = ''
        this.difficultyLevel = ''
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
</style>

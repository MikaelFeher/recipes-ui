<template>
  <div id="create-recipe" class="container row">
    <h3>Lägg till ett nytt recept</h3>
    <form @submit.prevent='addRecipe' class="col s6 offset-s3">
      <!-- General info -->
      <div class="input-field">
        <label for="name">Vad heter rätten?</label>
        <input type="text" class="" id="name" v-model="newRecipe.name"  minlength="2" required oninvalid="this.setCustomValidity('Du måste ge receptet ett namn.')" onchange="this.setCustomValidity('')">
      </div>
      <div class="input-field">
        <label for="numberOfPeople">Antal personer: </label>
        <input type="number" class="center-align" id="numberOfPeople" v-model="newRecipe.numberOfPeople" required oninvalid="this.setCustomValidity('Du måste ange hur många personer receptet är till.')" onchange="this.setCustomValidity('')">
      </div>
      <div class="input-field">
        <label for="description">Beskriv rätten</label>
        <textarea id="description" class="materialize-textarea" v-model="newRecipe.description" required oninvalid="this.setCustomValidity('Du måste beskriva rätten.')" onchange="this.setCustomValidity('')"></textarea>
      </div>
      <div class="input-field">
        <label for="img">Bild på rätten</label>
        <input type="text" id="img" v-model="newRecipe.img" required oninvalid="this.setCustomValidity('Du måste lägga till en bild. Helst .jpg/.jpeg/.png format.')" onchange="this.setCustomValidity('')">
      </div>
      <div class="input-field">
        <label for="cooking-time">Tillagningstid:</label>
        <input type="text" id="cooking-time" v-model="newRecipe.cookingTime" required oninvalid="this.setCustomValidity('Du måste ange en ungefärlig tid för att tillaga rätten.')" onchange="this.setCustomValidity('')">
      </div>
      <div class="input-field">
        <label for="difficulty">Svårighetsgrad:</label>
        <input type="text" id="difficulty" v-model="newRecipe.difficultyLevel" required oninvalid="this.setCustomValidity('Du måste ange hur svårt ditt recept är.')" onchange="this.setCustomValidity('')">
      </div>
      <!-- Categories -->
      <div>
        <div class="row">
          <label>Vilka kategorier tillhör rätten?</label>
        </div>
        <div class="row" id="category-selection">
          <label class="col s3" v-for="(category, index) in categoryOptions" :key="index">
            <input type="checkbox" :value="category" v-model="newRecipe.categories" />
            <span>{{ category }}</span>
          </label>
        </div>
      </div>
      <!-- Ingredients -->
      <h4>Ingredienser</h4>
      <div class="row">
        <table class="col m12 s10 offset-s1 push-m1">
          <thead>
            <th>Ingrediens</th>
            <th>Mängd</th>
            <th>Motsvarar i gram</th>
          </thead>
          <tbody v-for="(ingredient, index) in newRecipe.ingredients" :key="index">
            <td>{{ ingredient.name }}</td>
            <td>{{ ingredient.units }} {{ ingredient.measuringUnit }}</td>
            <td>{{ ingredient.unitEquivalentInGrams }} gram</td>
          </tbody>
        </table>
      </div>
      <form @submit.prevent="addIngredient">
        <div class="input-field">
          <label for="ingredient-name">Ingrediens</label>
          <input type="text" id="ingredient-name" v-model="ingredient.name" @input="findIngredient" @blur="showList = false"/>
        <ul v-if="showList" id="ingredients-select-list">
          <li v-for="(ingredient, index) in ingredientsFilteredByName" :key="index" @click="addIngredientDetails(ingredient)" class="left-align">
            {{ ingredient.name }}
            <hr/>
          </li>
        </ul>
        </div>
        <div class="input-field">
          <label for="ingredient-units">Mängd</label>
          <input type="number" id="ingredient-units" v-model="ingredient.units">
        </div>
        <div class="input-field">
          <label for="ingredient-measuringUnit">Måttenhet</label>
          <input type="text" id="ingredient-measuringUnit" v-model="ingredient.measuringUnit" @change="setUnitEquivalentInGrams">
        </div>
        <div class="input-field">
          <label for="ingredient-unitEquivalentInGrams">Motsvarar i gram</label>
          <input type="number" id="ingredient-unitEquivalentInGrams" v-model="ingredient.unitEquivalentInGrams">
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
        <router-link to="/admin" class="waves-effect waves-light btn red col s4 offset-s2">Avbryt<i class="material-icons right">cancel</i></router-link>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

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
          unitEquivalentInGrams: '',
          nutritionalValues: []
        },
        instruction: '',
        tempIngredientName: '',
        showList: false
      }
    },
    computed: {
      ...mapState(['ingredientsFilteredByName'])
    },
    methods: {
      ...mapActions(['addNewRecipe', 'filterIngredientsByName', 'clearOutFilteredIngredients']),
      findIngredient() {
        if(this.ingredient.name.length < 1) return
        this.showList = true
        this.filterIngredientsByName(this.ingredient.name)
      },
      setUnitEquivalentInGrams() {
        if(this.ingredient.measuringUnit === 'g' || this.ingredient.measuringUnit === 'gram') {
          this.ingredient.unitEquivalentInGrams = this.ingredient.units
        }
      },
      addIngredientDetails(ingredient) {
        this.ingredient.name = ingredient.name
        this.ingredient.nutritionalValues = ingredient.nutritionalValues
          .reduce((acc, nv) => acc.concat(Object.assign({}, nv)), [])
        this.clearOutFilteredIngredients()
        this.showList = false
      },
      addIngredient() {
        this.newRecipe.ingredients = this.newRecipe.ingredients.concat(this.ingredient)
        this.ingredient =  {
          name: '',
          units: '',
          measuringUnit: '',
          unitEquivalentInGrams: '',
          nutritionalValues: []
        }
        this.tempIngredientName = ''
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
      showAddRecipeMessageSuccess() {
        return !!addRecipeMessage.success.length
      },
      showAddRecipeMessageError() {
        return !!addRecipeMessage.error
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
          unitEquivalentInGrams: '',
          nutritionalValues: []
        },
        this.instruction = ''
      }
    }
  }

</script>

<style scoped>
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

  #ingredients-select-list {
    border: 1px solid #333;
    max-height: 300px;
    overflow-x: scroll;
  }

  #ingredients-select-list li {
    cursor: pointer;
  }

</style>

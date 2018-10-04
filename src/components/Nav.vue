<template>
  <div class="navbar-fixed">
    <nav class=" orange darken-3">
      <div class="nav-wrapper row">
        <!-- <router-link to="/admin" class="left">Admin Sidor</router-link> -->
        <router-link to="/" class="brand-logo center white-text col s12">RECEPT &amp; NÄRING</router-link>
        <div v-if="$route.fullPath === '/'" class="input-field col s3 right" id="search-bar">
          <input type="text" id="search" class="white" v-model="recipeToFind" @input="findARecipe()" autocomplete="off">
          <label for="search" class="orange-text">Sök recept...</label>
        </div>
      </div>
      <div class="row">
        <div v-if="showDeleteMessage" class="panel red lighten-4 red-text col s6 offset-s3" id="delete-recipe-message">
          <h5>Receptet raderat</h5>
        </div>
      </div>
      <div v-if="$route.fullPath === '/'" class="row" >
        <div class="col s12">
          <div class="tabs orange col m6 offset-m3" id="tabs-bar">
            <button 
              v-for="(category, index) in categories" 
              :key="index" 
              class="tab col s2  white-text waves-effect waves-light btn-flat" 
              @click="filterByCategory(category)"
            >
              {{ category }}
            </button>
          </div>
        </div>
      </div>
    </nav>
      <!-- <Hero  /> -->
  </div>
</template>

<script>
import Hero from '@/components/Hero'
import { mapActions, matState, mapState } from 'vuex'

export default {
  components: {
    Hero
  },
   data() {
    return {
      recipeToFind: '',
      categories: [
        'Frukost',
        'Lunch',
        'Middag',
        'Fest',
        'alla'
      ]
    }
  },
  mounted: function() {
    // M.Tabs.init(el, options);
  },
  computed: {
    ...mapState(['recipes', 'showDeleteMessage'])
  },
  methods: {
    ...mapActions(['filterRecipesByName', 'filterRecipesByCategory']),
    findARecipe() {
      this.filterRecipesByName(this.recipeToFind)
    },
    filterByCategory(category) {
      this.filterRecipesByCategory(category)
    }
  },
}
</script>

<style scoped>
nav {
  top: 0;
  z-index: 100;
}

.brand-logo {
  text-shadow: 2px 2px#2c3e50;
}


.row {
  margin-bottom: 0 !important;
}

.nav-wrapper {
  margin-bottom: 2%;
}

#tabs-bar {
  margin-bottom: 4%;
}
#tabs-bar button {
  cursor: pointer;
  text-shadow: 1px 1px black;
  font-size: 1.2rem;
  letter-spacing: .1rem;
  margin: auto 1.5%;
}

#delete-recipe-message {
  padding: 0;
  margin-top: 10%;
  font-size: 1.5rem;
  border-radius: 3px;
  box-shadow: 0 0 15px 0 red;
  border: 1px solid red;
}
</style>

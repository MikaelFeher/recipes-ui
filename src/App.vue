<template>
  <div id="app" class="navbar-fixed">
    <div id="wrapper"></div>
     <nav class="orange">
        <div class="nav-wrapper row">
          <router-link to="/" class="brand-logo center white-text col s12">RECEPT &amp; NÄRING</router-link>
          <div v-if="isHomeOne()" class="input-field right col m3" >
            <input type="text" id="search" class="white">
            <label for="search" class="center">Sök recept</label>
          </div>
        </div>
      </nav>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Home from '@/views/Home.vue'

export default {
  created() {
    this.fetchRecipesFromAPI()
  },
  methods: {
    ...mapActions(['fetchRecipesFromAPI']),
    isHomeOne() {
      return window.location.pathname === '/home1';
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed|Ubuntu');

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#wrapper {
  height: 40px;
  margin-bottom: 2%;
}

nav {
  top: 0;
  z-index: 100;
}

.brand-logo {
  text-shadow: 1px 1px#2c3e50;
}

</style>

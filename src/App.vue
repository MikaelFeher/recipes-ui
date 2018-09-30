<template>
  <div id="app">
    <div :class="{ 'wrapper-big' : isHomePage, 'wrapper-small' : !isHomePage }">
      <Nav :key="$route.fullPath" />
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import Home from '@/views/Home.vue'
import Nav from '@/components/Nav'


export default {
  components: {
    Nav
  },
  data() {
    return {
      isHomePage: false
    }
  },
  computed: {
    homeRoute: function() {
      return this.isHomePage = $route.fullPath === '/'
    },
  },
  created() {
    this.fetchRecipesFromAPI()
    this.fetchIngredientsFromAPI()
  },
  methods: {
    ...mapActions(['fetchRecipesFromAPI', 'fetchIngredientsFromAPI'])
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
.wrapper-big {
  height: 239px;
  margin-bottom: 1%;
}

.wrapper-small {
  height: 45;
  margin-bottom: 1%;
}

</style>

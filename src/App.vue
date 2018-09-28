<template>
  <div id="app" class="navbar-fixed">
    <div id="wrapper"></div>
     <nav class="orange">
        <div class="nav-wrapper row">
          <ul class=" left">
            <li>
              <router-link to="/">With Hero</router-link>
            </li>
            <li>
              <router-link to="/home1">Without Hero</router-link>
            </li>
          </ul>
          <router-link to="/" class="brand-logo center white-text">RECEPT &amp; NÄRING</router-link>
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
export default {
  methods: {
    isHomeOne() {
      return window.location.pathname === '/home1';
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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

</style>

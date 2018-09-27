<template>
  <div id="app">
     <nav class="white">
        <div class="nav-wrapper">
          <router-link to="/" class="brand-logo center black-text">RECEPT &amp; NÄRING</router-link>
        </div>
      </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>

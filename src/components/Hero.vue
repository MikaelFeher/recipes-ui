<template>
  <div id="hero red">
    <div id="banner" class="row">
      <div class="input-field col s4 offset-s4" id="search-bar">
          <!-- <i class="material-icons prefix black-text">search</i> -->
          <input type="text" id="search" class="white">
          <label for="search" class="center">Sök recept</label>
        </div>
    </div>
    
  </div>
</template>

<script>
export default {

}
</script>

<style>
  #hero {
    width: 100%;
  }
  #banner {
    width: 100%;
    height: 250px;
    background: url(../assets/table-of-food.jpg) no-repeat;
    background-size: cover;
    background-size: 100%;
    align-content: center;
    position: relative;
  }

  #search-bar {
    position: absolute;
    top: calc(100%/2 - 30px);
  }
</style>

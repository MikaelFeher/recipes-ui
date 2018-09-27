<template>
  <div id="hero">
    <div id="banner" class="row">
      <div class="input-field col s12 m4 offset-m4" id="search-bar">
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
    padding: 0;
    /* margin-top: 70px; */
  }
  #banner {
    width: 100%;
    height: 250px;
    background: url(../assets/table-of-food.jpg) no-repeat;
    background-size: cover;
    background-size: 100%;
    align-content: center;
    position: relative;
    margin-bottom: 3%;
    padding: 0;
  }


  #search-bar {
    position: absolute;
    top: calc(100%/2 - 30px);
  }

  #tabs-bar {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    margin: 0;

  }
</style>

<template>
  <div id="hero">
    <div id="banner" class="row">
      <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4" id="search-bar">
        <input type="text" id="search" class="white">
        <label for="search" class="">Sök recept</label>
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
    /* align-content: center; */
    /* position: relative; */
    margin-bottom: 3%;
    padding: 0;
  }

  #search-bar {
    /* position: absolute; */
    top: calc(100%/2 - 30px);
  }
</style>

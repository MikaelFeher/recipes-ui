<template>
  <div class="" id="home">
    <RecipesDisplay />
  </div>
</template>

<script>
// @ is an alias to /src

import RecipesDisplay from '@/components/RecipesDisplay.vue'

export default {
  name: 'Home',
  components: {
    RecipesDisplay
  }
};
</script>

<style>
#home {
  width: 100vw;
}
</style>

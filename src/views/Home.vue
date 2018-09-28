<template>
  <div class="" id="home">
    <Hero />
    <RecipesDisplay />
  </div>
</template>

<script>
// @ is an alias to /src

import Hero from '@/components/Hero'
import RecipesDisplay from '@/components/RecipesDisplay.vue'

export default {
  name: 'Home',
  components: {
    Hero,
    RecipesDisplay
  }
};
</script>

<style>
#home {
  width: 100vw;
}
</style>

<template>
  <div class="red" id="home">
    <Hero />
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from '@/components/Hero'

export default {
  name: 'Home',
  components: {
    Hero
  },
};
</script>

<style>
#home {
  width: 100vw;
}
</style>

<template>
  <div class="navbar-fixed">
    <nav class="orange">
      <div class="nav-wrapper row">
        <router-link to="/" class="brand-logo center white-text col s12">RECEPT &amp; NÄRING</router-link>
      </div>
      <Hero v-if="false" />
      <!-- <div v-if="isHome" class="row" id="hero-wrapper">
      </div> -->
    </nav>
  </div>
</template>

<script>
import Hero from '@/components/Hero'

export default {
  components: {
    Hero
  }
}
</script>

<style scoped>
nav {
  top: 0;
  z-index: 100;
}

.brand-logo {
  text-shadow: 2px 2px#2c3e50;
}

.nav-wrapper {
  margin: 0;
}

.row {
  margin-bottom: 0 !important;
}
</style>

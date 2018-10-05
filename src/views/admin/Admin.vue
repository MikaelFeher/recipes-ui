<template>
  <div id="admin">
    <h1>Hej, {{ loggedInUser.isAdmin ? 'Admin' : 'Du har nog råkat hamna på fel sida...' }}! Vad vill du göra idag?</h1>
    <router-link to="/admin/add-new-recipe" class="waves-effect waves-light btn green" >Lägg till nytt recept</router-link>
    <router-link to="/admin/delete-recipe" class="waves-effect waves-light btn red" >Ta bort recept</router-link>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Admin',
    computed: {
      ...mapState(['loggedInUser'])
    }
  }
</script>

<style scoped>
  a {
    margin: 1%;
  }
</style>

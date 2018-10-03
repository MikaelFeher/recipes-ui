<template>
  <div id="admin">
    <h1>Admin Page</h1>
    <router-link to="/admin/add-new-recipe" class="waves-effect waves-light btn green" >Lägg till nytt recept</router-link>
    <router-link to="/admin/delete-recipe" class="waves-effect waves-light btn red" >Ta bort recept</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
a {
  margin: 1%;
}
</style>

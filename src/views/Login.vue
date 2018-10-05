<template>
  <div class="container">
    <div class="row">
      <form @submit.prevent="" class="col m6 offset-m3 s12">
        <div class="row">
          <div class="input-field">
            <input type="text" id="username" v-model="username" />
            <label for="username" class="center">Användarnamn</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field">
            <input type="password" id="password" v-model="password" />
            <label for="password">Lösenord</label>
          </div>
        </div>
        <div class="row" id="button-container">
          <button type="submit" class="waves-effect waves-light btn teal hoverable right col s12 m12 l6" @click="login">Logga In<i class="material-icons right">send</i></button>
          <router-link to="/" class="waves-effect waves-light btn red hoverable right col s12 m12 l6">Avbryt<i class="material-icons right">cancel</i></router-link>
        </div>
        <p v-if="errorMsg.username" class="panel red lighten-4 red-text col s12">{{ errorMsg.username }}</p>
        <p v-if="errorMsg.password" class="panel red lighten-4 red-text col s12">{{ errorMsg.password }}</p>
        <p v-if="logInErrorMsg" class="panel red lighten-4 red-text col s12">{{ logInErrorMsg }}</p>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapActions, mapState } from 'vuex'
  
  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        errorMsg: {
          username: '',
          password: ''
        }
      }
    },
    computed: {
      ...mapState(['logInErrorMsg'])
    },
    methods: {
      ...mapActions(['logInUser']),
      async login() {
        if(!this.inputOk()) return 
        const loginDetails = {
          username: this.username,
          password: this.password
        }
        this.logInUser(loginDetails)
      },
      inputOk() {
        if(!this.username || !this.password) {
          if(!this.username) this.errorMsg.username = 'Användarnamn måste fyllas i...'
          setTimeout(() => this.errorMsg.username = '', 3000)

          if(!this.password) this.errorMsg.password = 'Lösenordsfältet kan inte vara tomt...'
          setTimeout(() => this.errorMsg.password = '', 3000)

          return false;
        }
        return true
      }
    }
  }
</script>

<style scoped>

  .container {
    align-items: center;
  }

  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  form {
    min-height: 250px;
    margin: 10% 0;
    border: 1px solid #333;
    box-shadow: 0 0 15px 0 #333;
  }

  form div {
    padding: 0 3%;
  }

  #button-container button, #button-container a {
    margin: .5%
  }

  .panel {
    padding: 1%;
    border: 1px solid red;
    box-shadow: 0 0 15px 0 red;
  }
</style>

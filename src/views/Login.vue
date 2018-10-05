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
          <button type="submit" class="waves-effect waves-light btn teal right col s12 m12 l6" @click="login">Logga In<i class="material-icons right">send</i></button>
          <router-link to="/" class="waves-effect waves-light btn red right col s12 m12 l6">Avbryt<i class="material-icons right">cancel</i></router-link>
        </div>
        <p v-if="errorMsg.username" class="panel red lighten-4 red-text col s12">{{ errorMsg.username }}</p>
        <p v-if="errorMsg.password" class="panel red lighten-4 red-text col s12">{{ errorMsg.password }}</p>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  
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
    methods: {
      async login() {
        if(!this.inputOk()) return console.log('this.inputOk fails')
        
        
        // TODO: Move login functionality to Store.js 
        // TODO: Add 
        // TODO: Move login functionality to Store.js 
        const loginDetails = {
          username: this.username,
          password: this.password
        }


        axios.post('http://localhost:3003/login', {
          username: this.username,
          password: this.password
        }).then(result => {
          const token = result.data.token
          $cookies.set('token', token, '1d')
          this.$router.replace('/admin')
        })
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
    /* margin-bottom: 3%; */
  }
</style>

<template>
  <div>
    <h1>Perfil</h1>
    <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="username"
            :rules="nameRules"
            :counter="24"
            label="Username"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="password"
            :rules="nameRules"
            :counter="24"
            label="Password"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  <v-btn @click="signUp()" >
      sign up
  </v-btn>
  <v-btn @click="Verify()">
      Verify code
  </v-btn>
  <v-text-field
            v-model="code"
            :rules="nameRules"
            label="Code"
            required
          ></v-text-field>
  <v-btn @click="login()">
      login
  </v-btn>
    
  <span v-show="$token">
    Tu usuario ya esta logueado: {{result}} y su token es: {{$token}}</span>
  <v-btn @click="logout()" v-show="$token"> logout</v-btn>
  </div>
  
</template>

<script>

import {mapState, mapActions} from "pinia";
import {Credentials, SignCredentials, VerifyCredentials} from "../api/user";
import {useSecurityStore} from "../stores/securityStore.js";

export default{
  data: ()=>({
    result: null,
    controller: null,
    valid: false,
      username: '',
      password: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 24 || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      token: 'da',
      code: ''
  }),
  computed: {
    ...mapState(useSecurityStore, {
      $user: 'user',
      $token: 'token'
    }),
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn'
    })
  },
  methods: {
    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $login: 'login',
      $logout: 'logout',
      $signUp: 'signUp',
      $verify: 'verify'
    }),
    setResult(result){
      this.result = result;
    },
    clearResult() {
      this.result = null
    },
    clearData() {
      this.username=''
      this.password=''
      this.email=''
      this.code=''
    },
    async login() {
      try {
        const credentials = new Credentials(this.username, this.password)
        await this.$login(credentials, true)
        this.clearResult()
        this.clearData()
      } catch (e) {
        this.setResult(e)
      }
    },
    async signUp(){
      try {
        const signCredentials= new SignCredentials(this.username, this.password, this.email)
        await this.$signUp(signCredentials)
        this.clearResult()
        this.clearData()
        
      } catch(e) {
        this.setResult(e)
      }
    },
    async Verify(){
      try {
        const verifyCredentials= new VerifyCredentials(this.email, this.code)
        await this.$verify(verifyCredentials)
        this.clearResult()
        this.clearData()
        
      } catch(e) {
        this.setResult(e)
      }
    },
    async logout() {
      await this.$logout()
      this.clearResult()
      this.clearData()
    },
    async getCurrentUser() {
      await this.$getCurrentUser()
      this.setResult(this.$user)
    }
  }
};
</script>

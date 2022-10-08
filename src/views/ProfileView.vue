<template>
  <div>
    <h1>Perfil</h1>
    <v-btn @click="login()" :disabled="$isLoggedIn">
      login
    </v-btn>
    <span v-show="$isLoggedIn">
      {{getCurrentUser()}}
      Tu usuario ya esta logueado: {{result}}</span>
    <v-btn @click="logout()"> logout</v-btn>
  </div>
</template>

<script>

import {mapState, mapActions} from "pinia";
import {Credentials} from "../api/user";
import {useSecurityStore} from "../stores/securityStore.js";

export default{
  data: ()=>({
    result: null,
    controller: null
  }),
  computed: {
    ...mapState(useSecurityStore, {
      $user: 'user'
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
    }),
    setResult(result){
      this.result = result;
    },
    clearResult() {
      this.result = null
    },
    async login() {
      try {
        const credentials = new Credentials('admin', '12345')
        await this.$login(credentials, true)
        console.log("entre")
        this.clearResult()
      } catch (e) {
        this.setResult(e)
      }
    },
    async logout() {
      await this.$logout()
      this.clearResult()
    },
    async getCurrentUser() {
      await this.$getCurrentUser()
      this.setResult(this.$user)
    }
  }
};
</script>

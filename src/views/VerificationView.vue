<template>
  <div class="d-flex mt-16">
    <v-card elevation="0" class="form pa-4">
      <v-card-title>
        Verificación de correo electrónico
      </v-card-title>
      <v-card-subtitle class="pt-4">
        Se envió un código al correo {{this.email}}
      </v-card-subtitle>
      <v-card-text class="pt-8">
        <v-otp-input v-model="otp" :length="length">
        </v-otp-input>
        <div class="d-flex justify-center pt-8">
          <v-btn depressed large color="accent" elevation="0" :disabled="!valid" @click="onFinish">
            Verificar
          </v-btn>
        </div>
      </v-card-text>
      <v-snackbar v-model="snackbar" :color="snackbarColor">
        <div class="d-flex align-center justify-center">
          <strong class="mr-4">{{snackbarText}}</strong>
          <v-progress-circular size="20" v-if="loading" indeterminate color="white"></v-progress-circular>
          <v-icon class="ml-4" v-if="!loading">
            mdi-alert-circle
          </v-icon>
        </div>
      </v-snackbar>
    </v-card>
  </div>
</template>


<script>
import { mapActions } from "pinia";
import { Credentials, VerifyCredentials } from "../api/user";
import { useSecurityStore } from "../stores/securityStore.js";

export default {
  data: () => ({
    username: localStorage.getItem('username'),
    password: localStorage.getItem('password'),
    email: localStorage.getItem('email'),
    otp: '',
    result: {},
    controller: null,
    length: 6,
    snackbar: false,
    loading: true,
    snackbarText: 'Cargando',
    snackbarColor: 'primary'
  }),
  computed: {
    valid() {
      return this.otp.length === this.length;
    }
  },
  methods: {
    ...mapActions(useSecurityStore, {
      $verify: 'verify',
      $login: 'login',
    }),
    setResult(result) {
      this.result = result;
    },
    clearResult() {
      this.result = null
    },
    clearData() {
      this.otp = null;
      this.controller = null;
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
    async verify() {
      try {
        const verifyCredentials = new VerifyCredentials(this.email, this.otp)
        const body = await this.$verify(verifyCredentials)
        this.setResult(body);
      } catch (e) {
        this.setResult(e)
      }
    },
    async onFinish() {
      this.snackbarText = "Cargando";
      this.snackbarColor = 'primary';
      this.loading = true;
      this.snackbar = true;
      const apiTimer = setTimeout(() => {
        this.loading = false;
        this.snackbarText = "Sin conexión";
        this.snackbarColor = 'error';
        return;
      }, 5 * 1000)
      await this.verify();
      clearTimeout(apiTimer);
      const result = this.handleResult();
      if (result === 0) {
        //this.login();
        this.$router.push({ name: 'home' });
      }
      else {
        this.loading = false;
      }
    },
    handleResult() {
      let toReturn = -1
      if (this.result.code === 8) {
        this.snackbarText = "Código incorrecto"
        this.snackbarColor = 'error';
      }
      else {
        toReturn = 0;
      }
      return toReturn;
    }
  }
};
</script>

<style>
.form {
  width: 35%;
  margin: auto;
}
</style>
<template>
  <div class="d-flex mt-16">
    <v-card elevation="0" class="form pa-4">
      <v-card-title>
        Verificación de correo electrónico
      </v-card-title>
      <v-card-subtitle class="pt-2">
        Se envió un código al correo {{this.email}}
      </v-card-subtitle>
      <v-card-text class="pt-4">
        <v-otp-input v-model="otp" :length="length">
        </v-otp-input>
        <div class="d-flex justify-center pt-2">
          <v-btn rounded depressed large color="red" elevation="0" :disabled="!valid" @click="onFinish">
            Verificar
          </v-btn>
        </div>
        <div class="d-flex justify-center pt-4">
          ¿No has recibido el código?
          <a class="ml-2" @click="resendVerification()">Volver a enviarlo</a>
        </div>
      </v-card-text>
      <v-snackbar :timeout="timeout" v-model="snackbar" :color="snackbarColor">
        <div class="d-flex align-center justify-center">
          <strong class="mr-4">{{snackbarText}}</strong>
          <v-progress-circular size="20" v-if="loading" indeterminate color="white"></v-progress-circular>
          <v-icon class="ml-4" v-if="error">
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
    error: false,
    snackbarText: 'Cargando',
    snackbarColor: 'primary',
    timeout: 10 * 1000,
  }),
  computed: {
    valid() {
      return this.otp.length === this.length;
    }
  },
  methods: {
    ...mapActions(useSecurityStore, {
      $verify: 'verify',
      $resendVerify: 'resendVerify',
      $login: 'login',
    }),
    snackbarLoading() {
      this.loading = true;
      this.error = false;
      this.snackbarText = "Cargando";
      this.snackbarColor = 'primary';
      this.timeout = 65 * 1000;
      this.snackbar = true;
    },
    snackbarError(errorMessage) {
      this.loading = false;
      this.error = true;
      this.snackbarText = errorMessage;
      this.snackbarColor = 'error';
      this.timeout = 5 * 1000;
      this.snackbar = true;
    },
    snackbarSuccess(successMessage) {
      this.loading = false;
      this.error = false;
      this.snackbarText = successMessage;
      this.snackbarColor = 'primary';
      this.timeout = 5 * 1000;
      this.snackbar = true;
    },
    async login() {
      try {
        const credentials = new Credentials(this.username, this.password)
        const result = await this.$login(credentials, true)
        this.setResult(result);
      } catch (e) {
        this.setResult(e)
      }
    },
    onFinish() {
      this.snackbarLoading();
      this.$verify(new VerifyCredentials(this.email, this.otp)).then((response) => {
        console.log(JSON.stringify(response))
        this.login();
        this.$router.push({ name: 'home' });
      })
        .catch((e) => this.handleResult(e));
    },
    handleResult(result) {
      switch (result.code) {
        case 8:
          this.snackbarError('Código incorrecto');
          break;
        case 99:
          this.snackbarError('Sin conexión');
          break;
        default:
          break;
      }
    },
    resendVerification() {
      this.snackbarLoading();
      this.$resendVerify({ 'email': this.email }).
        then(() => this.snackbarSuccess('Código enviado!')).catch(() => {
          this.snackbarError('Sin conexión');
        })
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
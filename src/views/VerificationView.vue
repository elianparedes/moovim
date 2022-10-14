<template>
  <div class="d-flex mt-16">
    <v-card elevation="0" class="form pa-4" :loading="loading">
      <v-progress-linear
        color="accent"
        :active="loading"
        :indeterminate="loading"
      ></v-progress-linear>
      <v-card-title> Verificación de correo electrónico </v-card-title>
      <v-card-subtitle class="pt-4">
        Se envió un código al correo {{ this.email }}
      </v-card-subtitle>
      <v-card-text class="pt-8">
        <v-otp-input v-model="otp" :length="length" :disabled="loading">
        </v-otp-input>
        <div class="d-flex justify-center pt-8">
          <v-btn
            depressed
            large
            color="accent"
            elevation="0"
            :disabled="!valid"
            @click="onFinish"
          >
            Verificar
          </v-btn>
        </div>
      </v-card-text>
      <v-snackbar rounded="pill" v-model="snackbar" color="snackbarColor">
        <div class="d-flex justify-center">
          <strong>{{ snackbarText }}</strong>
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
    loading: false,
    email: localStorage.getItem("email"),
    otp: "",
    result: {},
    controller: null,
    length: 6,
    snackbar: false,
    snackbarText: "",
    snackbarColor: "error",
  }),
  computed: {
    valid() {
      return this.otp.length === this.length;
    },
  },
  methods: {
    ...mapActions(useSecurityStore, {
      $verify: "verify",
      $login: "login",
    }),
    setResult(result) {
      this.result = result;
    },
    clearResult() {
      this.result = null;
    },
    clearData() {
      this.otp = null;
      this.controller = null;
    },
    async login() {
      try {
        const credentials = new Credentials(this.username, this.password);
        await this.$login(credentials, true);
        this.clearResult();
        this.clearData();
      } catch (e) {
        this.setResult(e);
      }
    },
    async verify() {
      try {
        const verifyCredentials = new VerifyCredentials(this.email, this.otp);
        const body = await this.$verify(verifyCredentials);
        this.setResult(body);
      } catch (e) {
        this.setResult(e);
      }
    },
    async getCurrentUser() {
      await this.$getCurrentUser();
      this.setResult(this.$user);
    },
    async onFinish() {
      this.loading = true;
      const apiTimer = setTimeout(() => {
        this.loading = false;
        (this.snackbarText = "Sin conexión"), (this.snackbar = true);
      }, 3 * 1000);
      await this.verify();
      clearTimeout(apiTimer);
      this.handleResult();
      console.log(JSON.stringify(this.result));
      this.loading = false;
      this.clearResult();
    },
    handleResult() {
      switch (this.result.code) {
        case 8:
          this.snackbarText = "Código incorrecto";
          break;
        default:
          this.snackbarText = "Verificación completa";
          this.snackbarColor = "success";
          break;
      }
      this.snackbar = true;
    },
  },
};
</script>

<style>
.form {
  width: 35%;
  margin: auto;
}
</style>

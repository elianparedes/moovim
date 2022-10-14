<template>
  <div class="d-flex mt-16">
    <v-card elevation="0" class="form pa-4">
      <v-card-title> Regístrate en GymApp </v-card-title>
      <v-card-text class="pt-8">
        <v-form ref="registration" v-model="valid">
          <v-text-field
            v-model="username"
            label="Nombre de usuario *"
            :counter="15"
            :rules="nameRules"
            required
            outlined
          >
          </v-text-field>
          <v-text-field
            v-model="email"
            label="Correo electrónico *"
            :counter="20"
            :rules="emailRules"
            required
            outlined
          >
          </v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show ? 'text' : 'password'"
            label="Contraseña *"
            :counter="15"
            @click:append="show = !show"
            required
            outlined
          ></v-text-field>
          <div class="d-flex justify-center pt-8">
            <v-btn
              depressed
              large
              color="accent"
              elevation="0"
              :disabled="!valid"
              @click="signUp"
            >
              Registrarse
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
      <v-snackbar v-model="snackbar" color="snackbarColor">
        <div class="d-flex align-center justify-center">
          <strong class="mr-4">{{ snackbarText }}</strong>
          <v-progress-circular
            size="20"
            v-if="loading"
            indeterminate
            color="white"
          ></v-progress-circular>
          <v-icon small class="ml-4" v-if="!loading"> mdi-alert-circle </v-icon>
        </div>
      </v-snackbar>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { SignCredentials } from "../api/user";
import { useSecurityStore } from "../stores/securityStore.js";

export default {
  data: () => ({
    result: null,
    controller: null,
    valid: true,
    username: "",
    password: "",
    email: "",
    nameRules: [
      (v) => !!v || "El nombre es obligatorio",
      (v) => v.length <= 15 || "El nombre puede tener hasta 15 caracteres",
    ],
    emailRules: [
      (v) => !!v || "El correo electrónico es obligatorio",
      (v) => /.+@.+/.test(v) || "El correo electrónico no es válido",
      (v) =>
        v.length <= 20 ||
        "El correo electrónico puede tener hasta 20 caracteres",
    ],
    passwordRules: [
      (v) => !!v || "La contraseña es obligatoria",
      (v) => v.length <= 15 || "La contraseña puede tener hasta 15 caracteres",
    ],
    show: false,
    snackbar: false,
    snackbarColor: "primary",
    snackbarText: "Cargando",
    loading: true,
  }),
  methods: {
    ...mapActions(useSecurityStore, {
      $getCurrentUser: "getCurrentUser",
      $signUp: "signUp",
    }),
    setResult(result) {
      this.result = result;
    },
    clearResult() {
      this.result = null;
    },
    async signUp() {
      this.snackbarText = "Cargando";
      this.snackbarColor = "primary";
      this.loading = true;
      this.snackbar = true;
      try {
        this.clearResult();
        const signCredentials = new SignCredentials(
          this.username,
          this.password,
          this.email
        );
        await this.$signUp(signCredentials);
        this.setResult(signCredentials);
      } catch (e) {
        this.setResult(e);
      }
      const result = this.handleResult();
      if (result === 0) {
        localStorage.setItem("email", this.email);
        this.$router.push({ name: "verify" });
      }
      this.loading = false;
    },
    handleResult() {
      let toReturn = -1;
      if (this.result.code === 2) {
        if (this.result.details[0].includes("username"))
          this.snackbarText = "El nombre de usuario ya existe";
        else
          this.snackbarText = "Ya existe una cuenta registrada con este correo";
        this.snackbarColor = "error";
      } else {
        toReturn = 0;
      }
      return toReturn;
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

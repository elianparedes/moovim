<template>
  <div class="d-flex mt-16">
    <v-card elevation="0" class="form pa-4">
      <v-card-title class="d-flex flex-column">
        <v-img
          class="my-8"
          src="/moovim.svg"
          width="35%"
          style="translate: -8px 0px"
        >
        </v-img>
        <div class="d-flex align-self-start">Regístrate en Moovim.</div>
      </v-card-title>
      <v-card-subtitle class="pt-2"> Supérate a ti mismo. </v-card-subtitle>
      <v-card-text class="pt-4">
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
            :counter="40"
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
          <div class="d-flex justify-center pb-4">
            <v-btn
              rounded
              depressed
              large
              color="primary"
              elevation="0"
              :disabled="!valid"
              @click="onClicked"
            >
              Registrarse
            </v-btn>
          </div>
        </v-form>
        <v-divider></v-divider>
        <div class="d-flex justify-center pt-4">
          ¿Ya tienes una cuenta creada?
          <a class="ml-2" @click="onLogin()">Iniciar sesión</a>
        </div>
      </v-card-text>
      <v-snackbar v-model="snackbar" :color="snackbarColor">
        <div class="d-flex align-center justify-center">
          <strong class="mr-4">{{ snackbarText }}</strong>
          <v-progress-circular
            size="20"
            v-if="loading"
            indeterminate
            color="white"
          ></v-progress-circular>
          <v-icon class="ml-4" v-if="!loading"> mdi-alert-circle </v-icon>
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
        username: '',
        password: '',
        email: '',
        nameRules: [
            v => !!v || 'El nombre es obligatorio',
            v => v.length <= 15 || 'El nombre puede tener hasta 15 caracteres',
        ],
        emailRules: [
            v => !!v || 'El correo electrónico es obligatorio',
            v => /.+@.+/.test(v) || 'El correo electrónico no es válido',
            v => v.length <= 40 || 'El correo electrónico puede tener hasta 40 caracteres',
        ],
        passwordRules: [
            v => !!v || 'La contraseña es obligatoria',
            v => v.length <= 15 || 'La contraseña puede tener hasta 15 caracteres',
        ],
        show: false,
        snackbar: false,
        snackbarColor: "#252525",
        snackbarText: 'Cargando',
        timeout: 10 * 1000,
        loading: true,
    }),
    methods: {
        ...mapActions(useSecurityStore, {
            $getCurrentUser: 'getCurrentUser',
            $signUp: 'signUp',
        }),
        clearResult() {
            this.result = null
        },
        snackbarLoading() {
            this.loading = true;
            this.error = false;
            this.snackbarText = "Cargando";
            this.snackbarColor = "#252525";
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
        onClicked() {
            this.snackbarLoading();
            this.$signUp(new SignCredentials(this.username, this.password, this.email))
                .then(() => {
                    sessionStorage.setItem('email', this.email);
                    this.$router.push({ name: 'verify' });
                })
                .catch((result) => this.handleResult(result))
        },
        handleResult(result) {
            switch (result.code) {
                case 2:
                    if (result.details[0].includes('username'))
                        this.snackbarError('El nombre de usuario ya existe');
                    else
                        this.snackbarError("Ya existe una cuenta registrada con este correo");
                    break;
                case 99:
                    this.snackbarError("Sin conexión");
                    break;
                default:
                    break;
            }
        },
        onLogin() {
            this.$router.push({ name: 'login' });
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

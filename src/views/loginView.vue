<template>
    <div class="d-flex mt-16">
        <v-card elevation="0" class="form pa-4">
            <v-card-title>
                Inicia sesión en GymApp.
            </v-card-title>
            <v-card-subtitle class="pt-2">
                Crear, compartir y buscar rutinas al alcance de tu mano.
            </v-card-subtitle>
            <v-card-text class="pt-4">
                <v-form ref="login" v-model="valid">
                    <v-text-field v-model="username" label="Nombre de usuario" :rules="nameRules" required outlined>

                    </v-text-field>
                    <v-text-field v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="passwordRules" :type="show ? 'text' : 'password'" label="Contraseña"
                        @click:append="show = !show" required outlined></v-text-field>
                    <div class="d-flex justify-center pb-4">
                        <v-btn rounded depressed large color="red" elevation="0" :disabled="!valid" @click="onLogin">
                            Iniciar sesión
                        </v-btn>
                    </div>
                </v-form>
                <v-divider></v-divider>
                <div class="d-flex justify-center pt-4">
                    ¿No tienes una cuenta?
                    <a class="ml-2" @click="onRegister">Registrarse</a>
                </div>
            </v-card-text>
            <v-snackbar rounded="lg" v-model="snackbar" :color="snackbarColor">
                <strong class="mr-4">{{snackbarText}}</strong>
                <v-progress-circular class="float-right" :width="2" :size="18" v-if="loading" indeterminate
                    color="white"></v-progress-circular>
                <v-icon class="float-right" :width="2" :size="18" v-if="!loading">
                    mdi-alert-circle
                </v-icon>

            </v-snackbar>
        </v-card>
    </div>
</template>

<script>

import { mapActions } from "pinia";
import { Credentials } from "../api/user";
import { useSecurityStore } from "../stores/securityStore.js";

export default {
    data: () => ({
        result: {},
        controller: null,
        valid: true,
        username: '',
        password: '',
        nameRules: [
            v => !!v || 'Se debe especificar el nombre de usuario'
        ],
        passwordRules: [
            v => !!v || 'Se debe especificar la contraseña',
        ],
        show: false,
        snackbar: false,
        snackbarColor: 'primary',
        snackbarText: 'Cargando',
        loading: true,
        timeout: 10 * 1000,
    }),
    methods: {
        ...mapActions(useSecurityStore, {
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
        onLogin() {
            this.snackbarLoading();
            this.$login(new Credentials(this.username, this.password), true)
                .then(() => this.$router.push({ name: 'home' }))
                .catch((e) => this.handleResult(e));
        },
        handleResult(result) {
            switch (result.code) {
                case 8:
                    this.snackbarError('El correo electrónico no está verificado');
                    break;
                case 4:
                    this.snackbarError('El correo electrónico no está verificado');
                    break;
                case 99:
                    this.snackbarError('Sin conexión');
                    break;
                default:
                    break;
            }
        },
        onRegister() {
            this.$router.push({ name: 'register' });
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
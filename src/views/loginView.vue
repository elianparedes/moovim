<template>
    <div class="d-flex mt-16">
        <v-card elevation="0" class="form pa-4">
            <v-card-title>
                Inicia sesión en GymApp
            </v-card-title>
            <v-card-text class="pt-8">
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
    }),
    methods: {
        ...mapActions(useSecurityStore, {
            $login: 'login',
        }),
        setResult(result) {
            this.result = result;
        },
        clearResult() {
            this.result = null
        },
        async login() {
            try {
                this.clearResult();
                const credentials = new Credentials(this.username, this.password);
                const result = await this.$login(credentials, true);
                console.log(JSON.stringify(this.result));
                this.setResult(result);
            } catch (e) {
                this.setResult(e)
            }
        },
        async onLogin() {
            this.loading = true;
            this.snackbarColor = 'primary';
            this.snackbarText = 'Cargando';
            this.snackbar = true;
            const apiTimer = setTimeout(() => {
                this.loading = false;
                this.snackbarColor = 'error'
                this.snackbarText = 'Sin conexión'
                return;
            }, 5 * 1000)
            await this.login();
            clearTimeout(apiTimer);
            const result = this.handleResult();
            if (result === 0) {
                this.$router.push({ name: 'home' });
            }
            else {
                this.loading = false;
            }

        },
        handleResult() {
            let toReturn = -1;
            if (this.result) {
                if (this.result.code === 8) {
                    this.loading = false;
                    this.snackbarColor = 'error';
                    this.snackbarText = 'El correo electrónico no está verificado';
                }
                else if (this.result.code === 4) {
                    this.loading = false;
                    this.snackbarColor = 'error';
                    this.snackbarText = 'Nombre de usuario o contraseña inválidos';
                }
            }
            else {
                toReturn = 0;
            }
            return toReturn;
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
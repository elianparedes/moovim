<template>
    <v-card 
    class="form">
        <v-card-title>
            Regístrate en GymApp
        </v-card-title>
        <v-card-text>
            <v-form
            ref="registration" 
            lazy-registration 
            v-model="valid">
                <v-text-field 
                v-model="username"
                label="Nombre de usuario" 
                :counter="15" 
                :rules="nameRules" 
                required outlined>

                </v-text-field>
                <v-text-field 
                v-model="email"
                label="Correo electrónico" 
                :counter="20"
                :rules="emailRules" 
                required outlined>

                </v-text-field>
                <v-text-field 
                v-model="password" 
                label="Contraseña" 
                :counter="15" 
                :rules="nameRules"
                required outlined>

                </v-text-field>
                <v-btn :disabled="!valid" @click="signUp">Registrarse</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
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
            v => v.length <= 20 || 'El correo electrónico puede tener hasta 20 caracteres',
        ],
        passwordRules: [
            v => !!v || 'La contraseña es obligatoria',
            v => v.length <= 15 || 'La contraseña puede tener hasta 15 caracteres',
        ]
    }),
    methods: {
        ...mapActions(useSecurityStore, {
            $getCurrentUser: 'getCurrentUser',
            $signUp: 'signUp',
        }),
        setResult(result) {
            this.result = result;
        },
        clearResult() {
            this.result = null
        },
        clearData() {
            this.username = ''
            this.password = ''
            this.email = ''
        },
        async signUp() {
            try {
                const signCredentials = new SignCredentials(this.username, this.password, this.email)
                await this.$signUp(signCredentials)
                this.clearResult()
                this.clearData()
                this.setResult(signCredentials)
            } catch (e) {
                this.setResult(e)
            }
        }
    }
};
</script>

<style>
    .form{
        width: 40%;
        margin: auto;
    }
</style>
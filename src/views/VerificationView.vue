<template>
    <v-card 
    class="form" :loading="loading">
    <template slot="progress">
        <v-progress-linear
            color="accent"
            indeterminate
        ></v-progress-linear>
        </template>
        <v-card-title>
            Verificación de correo electrónico
        </v-card-title>
        <v-card-subtitle>
            Se envió un código al correo {{this.email}}
        </v-card-subtitle>
        <v-card-text>
            <v-otp-input 
            v-model="otp"
            :length="length"
            :disabled="loading"
            @finish="onFinish">
            </v-otp-input>
        </v-card-text>
        <v-snackbar 
        v-model="snackbar"
        :color="snackbarColor">
            {{snackbarText}}
        </v-snackbar>
    </v-card>
</template>


<script>
import { mapActions } from "pinia";
import { Credentials, VerifyCredentials } from "../api/user";
import { useSecurityStore } from "../stores/securityStore.js";

export default{
  data: ()=>({
    loading: false,
    email: localStorage.getItem('email'),
    otp: '',
    result: {},
    controller: null,
    length: 6,
    snackbar: false,
    snackbarText: '',
    snackbarColor: 'error'
  }),
  computed: {
    valid(){
        return this.otp.length === this.length;
    }
  },
  methods: {
    ...mapActions(useSecurityStore, {
      $verify: 'verify',
      $login: 'login',
    }),
    setResult(result){
      this.result = result;
    },
    clearResult() {
      this.result = null
    },
    clearData() {
        this.otp=null;
        this.controller=null;
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
    async verify(){
      try {
        const verifyCredentials= new VerifyCredentials(this.email, this.otp)
        const body = await this.$verify(verifyCredentials)
        this.setResult(body);
      } catch(e) {
        this.setResult(e)
      }
    },
    async getCurrentUser() {
      await this.$getCurrentUser()
      this.setResult(this.$user)
    },
    async onFinish(){
        this.loading=true;
        const apiTimer = setTimeout(()=>{
            this.loading=false;
            this.snackbarText="Sin conexión",
            this.snackbar=true
        }, 3* 1000)
        await this.verify();
        clearTimeout(apiTimer);
        this.handleResult();
        console.log(JSON.stringify(this.result));
        this.loading=false;
        this.clearResult();
        this.clearData();
    },
    handleResult(){
        switch (this.result.code){
            case 8:
                this.snackbarText="Código incorrecto"
                break;
            default:
                this.snackbarText="Verificación completa";
                this.snackbarColor='success'
                break;
        }
        this.snackbar=true;
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
<template>
    <div>
      <h1>Perfil</h1>
      <v-form v-model="valid" v-if="edit">
      <v-container>
        <v-row>
            <v-col
            cols="12"
            md="4"
            >
            <v-img
                width="100%"
                height="100%"
                max-height="300px"
                max-width="500px"
                :aspect-ratio="16/9"
                :src=image
            ></v-img>
            </v-col>
            <v-col cols="12" md="1"></v-col>
            <v-col
            cols="12"
            md="6"
            class="justify"
            >
                <div class="pb-16">{{firstName}} {{lastName}}</div>
                <div class="pb-16"></div>
                <div class="pb-16">Genero: {{gender}}</div>
            </v-col>
        </v-row>
      </v-container>
    </v-form>
      <v-form v-model="valid" v-else>
      <v-container>
        <v-row>
            <v-col
            cols="12"
            md="4"
            >
            <v-img
                width="100%"
                height="100%"
                max-height="300px"
                max-width="500px"
                :aspect-ratio="16/9"
                :src=image
            ></v-img>
            </v-col>
            <v-col cols="12" md="1"></v-col>
            <v-col
            cols="12"
            md="6"
            class="justify"
            >
                <div class="pb-8">
                    <v-text-field
                        v-model="firstName"
                        :rules="nameRules"
                        :counter="24"
                        label="Nombre"
                        required
                    ></v-text-field>
                </div>
                <div class="pb-8">
                    <v-text-field
                        v-model="lastName"
                        :rules="nameRules"
                        :counter="24"
                        label="Apellido"
                        required
                    ></v-text-field>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col
            cols="12"
            md="5"
            >
            <div class="pb-8">
                <v-radio-group
                    v-model="gender"
                    mandatory
                >
                <v-radio
                    label="Hombre"
                    value="male"
                ></v-radio>
                <v-radio
                    label="Mujer"
                    value="female"
                ></v-radio>
                <v-radio
                    label="Otro"
                    value="other"
                ></v-radio>
                </v-radio-group>
                </div>
            </v-col>
            <v-col
            cols="12"
            md="6"
            class="justify"
            >
            <div class="pb-8">
                    <v-text-field
                        v-model="image"
                        label="imgUrl"
                    ></v-text-field>
            </div>
            </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-btn class="ml-11" @click="edit=!edit">editar</v-btn>
    <v-btn v-show="!edit" class="float-right mr-16" @click="SubmitModify(); edit=!edit">confirmar edit</v-btn>
    <v-btn class="float-right mr-16 red" v-show="edit" @click="DeleteAccount">Borrar Cuenta</v-btn>

    </div>
    
  </template>

<script>

import {mapState, mapActions} from "pinia";
import {UserData} from "../api/user";
import {useSecurityStore} from "../stores/securityStore.js";

export default{
  data: ()=>({
    result: null,
    controller: null,
    valid: false,
    gender:null,
    firstnName: '',
    lastName: '',
    edit:'false',
    image: '',
    nameRules: [
    v => !!v || 'Name is required',
    v => v.length <= 24 || 'Name must be less than 10 characters',
    ],
  }),
  async created() {
    
        try {
        await this.getCurrentUser();
        console.log("hola")
        console.log(this.result)
        this.firstName=this.result.firstName
        this.lastName=this.result.lastName
        this.gender=this.result.gender
        this.image=this.result.avatarUrl
      } catch (e) {
        this.setResult(e)
      }

    
  },
  computed: {
    ...mapState(useSecurityStore, {
      $user: 'user',
      $token: 'token'
    }),
  },
  methods: {
    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $modifyUser: 'modifyUser',
      $deleteAccount: 'deleteAccount'
    }),
    setResult(result){
      this.result = result;
    },
    clearResult() {
      this.result = null
    },
    async getCurrentUser() {
      await this.$getCurrentUser()
      this.setResult(this.$user)
    },
    async SubmitModify() {
        try {
        const userData = new UserData(this.firstName, this.lastName, this.gender, this.image)
        await this.$modifyUser(userData)
        console.log("mira")
        console.log(this.result)
        this.clearData()
      } catch (e) {
        this.setResult(e)
      }
    },
    async DeleteAccount() {
        try {
        await this.$deleteAccount()
        
        this.clearData()
      } catch (e) {
        this.setResult(e)
      }
    }
  }
};
</script>

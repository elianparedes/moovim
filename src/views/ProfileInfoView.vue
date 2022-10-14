<template>
  <div class="d-flex flex-column">
    <h1 class="mb-4">Perfil</h1>
    <h2 class="mb-4"> Avatar</h2>
    <div class="d-flex mb-4">
      <div class="d-flex flex-column pr-12">
        <v-avatar class="ma-auto" size="160">
          <img :src="image" :alt="this.username">
        </v-avatar>

      </div>
      <div class="d-flex flex-column mt-4" style="width:50%;">
        <v-form ref="imageInfo" v-model="URLValid">
          <v-text-field v-model="image" label="URL perfil" outlined :rules="URLRules" :counter=255>

          </v-text-field>
        </v-form>
        <v-btn rounded depressed large elevation="0" @click="deleteImage()">
          Borrar foto de perfil
        </v-btn>
      </div>
    </div>
    <h2 class="mb-4 mt-2">Información personal</h2>
    <div class="d-flex">
      <v-text-field disabled v-model="username" label="Nombre de usuario" outlined>

      </v-text-field>
      <v-text-field class="ml-4" disabled v-model="email" label="Correo electrónico" outlined >

      </v-text-field>
    </div>
    <v-form ref="userInfo" v-model="userInfoValid">
      <div class="d-flex">
        <v-text-field v-model="firstName" label="Nombre" outlined :rules="nameRules" :counter="50">

        </v-text-field>
        <v-text-field class="ml-4" v-model="lastName" label="Apellido" outlined :rules="lastNameRules" :counter="50">

        </v-text-field>
      </div>
      <v-select class="pr-2" :items="genders" v-model="gender" label="Género" outlined style="width:50%;">

      </v-select>

    </v-form>
    <div class="d-flex">
      <v-btn class="ma-auto" :disabled="!userInfoValid || !URLValid" rounded depressed large color="red" elevation="0" @click="saveChanges()">
        Guardar cambios
      </v-btn>
    </div>
    <v-snackbar v-model="snackbar" :color="snackbarColor">
      <div class="d-flex align-center justify-center">
        <strong class="mr-4">{{snackbarText}}</strong>
        <v-progress-circular size="20" v-if="loading" indeterminate color="white"></v-progress-circular>
        <v-icon class="ml-4" v-if="!loading">
          mdi-alert-circle
        </v-icon>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import { UserData } from "../api/user";
import { mapState, mapActions } from "pinia";
import { useSecurityStore } from "../stores/securityStore.js";
import profileImage from "../assets/default_image.webp"

export default {
  data() {
    return {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      genders: ['Hombre', 'Mujer', 'Otro'],
      gendersApi: {
        "Hombre": "male",
        "Mujer": "female",
        "Otro": "other"
      },
      gender: '',
      image: '',
      show: false,
      snackbar: false,
      snackbarColor: 'primary',
      snackbarText: 'Cargando',
      timeout: 10 * 1000,
      loading: true,
      nameRules: [
        v => (v && v.length <= 50) || 'El nombre debe tener menos de 50 caracteres',
      ],
      lastNameRules: [
        v => (v && v.length <= 50) || 'El apellido debe tener menos de 50 caracteres',
      ],
      URLRules: [
      v => (v && v.length <= 255) || 'El URL debe tener menos de 255 caracteres',
      ],
      URLValid: true,
      userInfoValid: true,
    }
  },
  computed: {
    ...mapState(useSecurityStore, {
      $user: 'user',
      $token: 'token'
    }),
    genderApi() {
      return this.gender ? this.gendersApi[this.gender] : '';
    },
  },
  methods: {
    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $modifyUser: 'modifyUser',
      $deleteAccount: 'deleteAccount'
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
    saveChanges() {
      this.snackbarLoading();
      this.$modifyUser(new UserData(this.firstName, this.lastName, this.genderApi, this.image))
        .then(() => { this.snackbarSuccess('Cambios guardados!') })
        .catch(() => this.snackbarError('Sin conexión'));
    },

    deleteImage() {
      this.image = '';
    }
  },
  created() {
    this.$getCurrentUser().then(() => {
      this.username = this.$user.username;
      this.email = this.$user.email;
      this.firstName = this.$user.firstName;
      this.lastName = this.$user.lastName;
      this.gender = Object.keys(this.gendersApi).find(key => this.gendersApi[key] === this.$user.gender);
      this.image = this.$user.avatarUrl ? this.$user.avatarUrl : profileImage;
    })
  }
};
</script>

<style>
.form {
  width: 35%;
  margin: auto;
}
</style>

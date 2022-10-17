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
        <div class="d-flex align-self-start">Inicia sesión en Moovim.</div>
      </v-card-title>
      <v-card-subtitle class="pt-2">
        Crear, compartir y buscar rutinas al alcance de tu mano.
      </v-card-subtitle>
      <v-card-text class="pt-4">
        <v-form ref="login" v-model="valid">
          <v-text-field
            v-model="username"
            label="Nombre de usuario"
            :rules="nameRules"
            required
            outlined
          >
          </v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show ? 'text' : 'password'"
            label="Contraseña"
            @click:append="show = !show"
            required
            outlined
          >
          </v-text-field>
        </v-form>
        <v-checkbox
          color="primary"
          v-model="rememberMe"
          label="Recordarme"
        ></v-checkbox>
        <div class="d-flex justify-center pb-4">
          <v-btn
            rounded
            depressed
            large
            color="primary"
            class="px-16"
            elevation="0"
            :disabled="!valid"
            @click="onLogin"
          >
            Iniciar sesión
          </v-btn>
        </div>
        <v-divider></v-divider>
        <div class="d-flex justify-center pt-4">
          ¿No tienes una cuenta?
          <a class="ml-2" @click="onRegister">Registrarse</a>
        </div>
      </v-card-text>
      <v-snackbar v-model="snackbar" rounded="lg" :color="snackbarColor">
        <strong class="mr-4">{{ snackbarText }}</strong>
        <v-progress-circular
          class="float-right"
          :size="18"
          v-if="loading"
          indeterminate
          color="white"
        >
        </v-progress-circular>
        <v-icon class="float-right" :size="18" v-if="!loading">
          mdi-alert-circle
        </v-icon>
      </v-snackbar>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { Credentials } from "@/api/user";
import { useSecurityStore } from "@/stores/securityStore.js";
import { useExerciseStore } from "@/stores/exerciseStore";
import { useExerciseImageStore } from "@/stores/exerciseImageStore";

export default {
  data: () => ({
    result: {},
    controller: null,
    valid: true,
    rememberMe: false,
    username: "",
    password: "",
    nameRules: [(v) => !!v || "Se debe especificar el nombre de usuario"],
    passwordRules: [(v) => !!v || "Se debe especificar la contraseña"],
    show: false,
    snackbar: false,
    snackbarColor: "#252525",
    snackbarText: "Cargando",
    loading: true,
    timeout: 10 * 1000,
  }),
  methods: {
    ...mapActions(useSecurityStore, {
      $login: "login",
      $getCurrentUser: "getCurrentUser",
      $modifyUser: "modifyUser",
    }),
    ...mapActions(useExerciseStore, {
      $addExercise: "addExercise",
    }),
    ...mapActions(useExerciseImageStore, {
      $addExerciseImage: "addExerciseImage",
    }),
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
      this.snackbarColor = "error";
      this.timeout = 5 * 1000;
      this.snackbar = true;
    },
    onLogin() {
      this.snackbarLoading();
      this.$login(
        new Credentials(this.username, this.password),
        this.rememberMe
      )
        .then(() => this.$getCurrentUser())
        .then(() => {
          this.$router.push({ name: "Categorias" });
        })
        .catch((e) => this.handleResult(e));
    },
    handleResult(result) {
      switch (result.code) {
        case 4:
          this.snackbarError(
            "El nombre de usuario y la contraseña no coinciden"
          );
          break;
        case 8:
          this.snackbarError("El correo electrónico no está verificado");
          break;
        case 99:
          this.snackbarError("Sin conexión");
          break;
        default:
          break;
      }
    },
    onRegister() {
      this.$router.push({ name: "register" });
    },
    async loadExercises() {
      let result;
      result = await this.$addExercise(
        "Curl alterno con mancuernas",
        "exercise",
        "Bíceps",
        {
          pos: "De pie, con las rodillas ligeramente dobladas y la espalda recta. Sostén una mancuerna en cada mano, con un agarre neutral a lo largo del cuerpo.",
          procedure:
            "Sin mover el pecho, eleva la mancuerna flexionando el antebrazo. Durante el movimiento, rota la muñeca hacia afuera hasta que la mano esté en posición supina y recta. Contrae el bíceps, y luego vuelve lentamente a la posición inicial. Mantén el codo cerca del cuerpo durante el movimiento. Alterne este movimiento realizándolo con un brazo tras otro.",
        }
      );
      await this.$addExerciseImage(
        result.id,
        1,
        "https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Alternating-Dumbbell-Curl_ad879dc4-b4fb-4ca7-b2b1-6e1eb5d78252_600x600.png?v=1612137169"
      );
      result = await this.$addExercise(
        "Curl con cuerda en polea",
        "exercise",
        "Bíceps",
        {
          pos: "De pie frente a la polea, rodillas ligeramente flexionadas, toma la cuerda con ambas manos, en un agarre neutral, brazos relajados a lo largo del cuerpo.",
          procedure:
            "Sin mover el pecho, flexiona los antebrazos, acercando las manos lo más posible a los hombros, sin llevar los codos demasiado hacia delante. Contrae los bíceps en una posición alta, y luego vuelve lentamente a la posición inicial.",
        }
      );
      await this.$addExerciseImage(
        result.id,
        1,
        "https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Rope-Cable-Curl_6216e254-5f77-462c-9954-ea210fff8a70_600x600.png?v=1612137195"
      );
      result = await this.$addExercise(
        "Curl con barra EZ",
        "exercise",
        "Bíceps",
        {
          pos: "De pie, con las rodillas ligeramente dobladas y la espalda recta. Sujeta la barra EZ con las manos en supinación",
          procedure:
            "Sin mover el pecho, levantar la barra EZ flexionando los antebrazos. Contrae los bíceps en posición elevada, luego deja que la barra baje lentamente de nuevo hasta la posición inicial. Mantén tus codos cerca del cuerpo durante el movimiento.",
        }
      );
      await this.$addExerciseImage(
        result.id,
        1,
        "https://cdn.shopify.com/s/files/1/0269/5551/3900/files/EZ-Barbell-Curl_42cb566b-6415-4318-94e0-c93f4b442e59_600x600.png?v=1612137227"
      );
      result = await this.$addExercise(
        "Elevación de gemelos sentado",
        "exercise",
        "Gemelos",
        {
          pos: "Sentado en la máquina con la parte delantera de los pies en la cuña y la parte inferior de los muslos bajo las partes acolchadas.",
          procedure:
            "A la vez que contraes los gemelos, levanta los talones lo más alto posible. Permanece en la posición más elevada por un momento, sintiendo bien la contracción. Luego baja lentamente los talones estirando las pantorrillas.",
        }
      );
      await this.$addExerciseImage(
        result.id,
        1,
        "https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Seated-Calf-Raise_8c8641b2-10f2-4dc8-9adb-8d80fd1a16d0_600x600.png?v=1612137064"
      );
      result = await this.$addExercise(
        "Press de banca con barra",
        "exercise",
        "Pectorales",
        {
          pos: "Acostado en el banco, con los pies en el suelo. Agarra la barra con un agarre más amplio que el ancho de los hombros. Tus antebrazos deben estar perpendiculares al suelo.",
          procedure:
            "Desengancha la barra y bájala lentamente hasta la parte inferior del pecho. A medida que contraes los pectorales, empuja la carga hacia arriba hasta que los brazos estén casi rectos. Durante todo el movimiento: Mantén los codos en el exterior para poner el máximo esfuerzo en el pecho y el mínimo en los deltoides anteriores y el tríceps.      Mantén los hombros apoyados en la banca.",
        }
      );
      await this.$addExerciseImage(
        result.id,
        1,
        "https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Barbell-Bench-Press_0316b783-43b2-44f8-8a2b-b177a2cfcbfc_600x600.png?v=1612137800"
      );
      result = await this.$addExercise(
        "Press banca inclinado con mancuernas",
        "exercise",
        "Pectorales",
        {
          pos: "Tumbado en el banco inclinado, con los pies apoyados en el suelo, una mancuerna en cada mano, agarre en pronación. Sostén las mancuernas a cada lado a la altura del pecho. Tus antebrazos deben estar perpendiculares al suelo.",
          procedure:
            "Mientras contraes tus pectorales, empuja la carga hacia arriba hasta que tus brazos estén casi rectos, luego vuelve a la posición inicial. Durante todo el movimiento: Mantén los codos hacia afuera para poner el máximo esfuerzo en los pectorales y el mínimo en los deltoides frontales y el tríceps. Mantén los hombros pegados al banco.",
        }
      );
      await this.$addExerciseImage(
        result.id,
        1,
        "https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Incline-Dumbbell-Bench-Press_c2bf89a2-433f-4a8f-9801-67c679980867_600x600.png?v=1612138008"
      );
      result = await this.$addExercise(
        "Aperturas en máquina Peck Deck",
        "exercise",
        "Pectorales",
        {
          pos: 'Sentado en la máquina "Peck deck" con la espalda pegada al respaldo, los antebrazos bien apoyados contra las piezas acolchadas previstas para este fin. La parte superior de los brazos debe estar paralela al suelo y en línea con los hombros.',
          procedure:
            "Aprieta los brazos tanto como sea posible siguiendo el movimiento de la máquina. Contrae el pecho al final del movimiento y luego vuelve lentamente a la posición inicial.",
        }
      );
      await this.$addExerciseImage(
        result.id,
        1,
        "https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Peck-Deck_600x600.png?v=1612137910"
      );
      result = await this.$addExercise(
        "Cruce de poleas",
        "exercise",
        "Pectorales",
        {
          pos: "Toma los manerales que están en los extremos de cada cable y colócate en el centro entre las poleas. Dobla el pecho ligeramente hacia adelante y mantén los codos ligeramente doblados.",
          procedure:
            "Aprieta lentamente los brazos frente al pecho como si fuera un arco. Mantén los codos ligeramente flexionados durante el movimiento. Cuando las manos se junten, mantén la posición por un momento, contrayendo el pecho. Luego vuelve lentamente a la posición original.",
        }
      );
      await this.$addExerciseImage(
        result.id,
        1,
        "https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Cable-Crossover_09c90616-2777-47ed-927e-d5987edfce09_600x600.png?v=1612138036"
      );
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

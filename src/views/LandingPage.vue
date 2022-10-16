<template>
  <div>
    <v-app style="padding: 0 !important; margin: 0; background-color: #111111">
      <v-app-bar app elevate-on-scroll elevation="10" color="#111111" class="d-flex">
        <MoovimLogo class="justify-start"></MoovimLogo>
      </v-app-bar>
      <v-main style="padding: 0 !important; margin: 16px 0">
        <div style="padding: 0 !important; margin: 0" class="main-background my-8" id="main">
          <v-row>
            <v-col md="6" class="d-flex row align-content-center ">
              <div class="px-8 mx-2 ">
                <div class="d-flex">
                  <div style="font-size: 56pt; font-weight: bolder; line-height: 100%; align-content: center"> Toma el
                    control de tu vida
                  </div>
                </div>
                <p class="text-h5 mt-8 ">
                  Con Moovim podrás ver los ejercicios y rutinas de otras personas, crear las tuyas y entrenar sin
                  limites!
                </p>
                <p class="text-h5 ">
                  Explora diferentes ejercicios y rutinas y elige la que más se adapte a tus necesidades.
                </p>
                <v-btn @click="comenzar()" rounded height="50px" color="#BF3D3D" class="align-self-center my-4"
                  style="max-width: 40%">
                  Comenzar
                </v-btn>
              </div>
            </v-col>
            <v-col md="6 px-4" class="d-flex row justify-end py-4">
              <div class="background-image brightness d-flex flex-column align-end justify-center" style="width: 75%">
                <div class="d-flex row flex-wrap align-center justify-center text-h4 px-8"
                  style="display: flex; width:50%;height: 100%;box-shadow:0 10px 10px 2px rgba(0,0,0,10%);background-image: linear-gradient(rgba(18,18,18,50%) ,rgba(18,18,18,0%)) ">
                  Entrenar nunca fue tan fácil
                </div>

              </div>
            </v-col>
          </v-row>
        </div>
      </v-main>
    </v-app>

  </div>
</template>

<script>
import MoovimLogo from "@/components/logo/MoovimLogo"
import { mapState } from "pinia";
import { useSecurityStore } from "@/stores/securityStore";

export default {
  name: "LandingPage.vue",
  components: { MoovimLogo },
  computed: {
    ...mapState(useSecurityStore, {
      $isLoggedIn: "isLoggedIn",
    }),
  },
  methods: {
    comenzar() {
      if (this.$isLoggedIn) {
        this.$router.push({name: "Categorias"})
      } else
        this.$router.push({ name: 'login' })
    }
  }
}

</script>

<style scoped>
* {
  width: 100%;
  margin: 0px;
  padding: 0;
}

.background-image {
  border-block: #bf3d3d;

  background-image: linear-gradient(rgba(191, 61, 61, 10%), rgba(18, 18, 18, 100%)), url("../../public/pexels-tembela-bohle-2803158.jpg");
  background-size: cover, cover;
  background-repeat: no-repeat;
  background-attachment: scroll;
  height: 80vh;
  background-position: 50% 50%;
  max-width: 100%;
  margin-right: 2%;
  box-shadow: -50px 0 40px 2px rgba(0, 0, 0, 100%);

}

.main-background {
  background-image: radial-gradient(rgba(0, 0, 0, 20%), rgba(18, 18, 18, 100%)), url('../../public/layered-peaks-haikei.svg');
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  position: absolute;
  aspect-ratio: 16/9;
  padding: 0 !important;
  margin: 0 !important;

}

.brightness {
  filter: brightness(1.6) contrast(120%) saturate(1.5) grayscale(0%);
}
</style>
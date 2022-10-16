<template>
  <v-app style="background: #181818">
    <div
      v-if="
        this.$isLoggedIn &&
        this.$router.currentRoute.name !== 'register' &&
        this.$router.currentRoute.name !== 'notFound' &&
        this.$router.currentRoute.name !== 'verify' &&
        this.$router.currentRoute.name !== 'login'
      "
    >
      <v-navigation-drawer app color="transparent" floating permanent>
        <v-list nav class="d-flex flex-column" style="height: 100%">
          <div class="ml-2 d-flex flex-column" style="height: 128px">
            <MoovimLogo class="ma-auto ml-3"></MoovimLogo>
          </div>

          <v-list-item-group class="d-flex flex-column">
            <v-list-item
              v-for="item in items"
              :key="item.title"
              link
              :ripple="false"
              :to="item.link"
              flat
            >
              <v-list-item-icon class="align-self-center">
                <v-icon class="material-icons-round">{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider class="mt-8"></v-divider>
          </v-list-item-group>

          <v-list-item link>
            <v-list-item-icon class="align-self-center">
              <v-icon class="material-icons-round">add_box</v-icon>
            </v-list-item-icon>

            <v-list-item-content link @click="createRoutineDialog = true">
              <v-list-item-title>Crear rutina</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link
            ><v-list-item-icon class="align-self-center">
              <v-icon class="material-icons-outlined">add_box</v-icon>
            </v-list-item-icon>

            <v-list-item-content link @click="createExerciseDialog = true">
              <v-list-item-title>Crear ejercicio</v-list-item-title>
            </v-list-item-content></v-list-item
          >

          <v-spacer></v-spacer>

          <v-list-item
            v-if="this.$isLoggedIn"
            @click="logout()"
            class="mt-auto"
            flat
            :ripple="false"
          >
            <v-list-item-action>
              <v-icon class="material-icons-round">logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="text--secondary"
                >Logout</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar
        app
        prominent
        color="transparent"
        style="background-image: linear-gradient(#181818, rgba(24, 24, 24, 0))"
        class="pl-4 pr-14"
        flat
      >
        <v-spacer></v-spacer>
        <router-link v-if="this.$isLoggedIn" to="/profile">
          <v-avatar class="my-8" size="36px">
            <img :src="avatarUrl" :alt="username" />
          </v-avatar>
        </router-link>
        <div v-if="!this.$isLoggedIn" class="d-flex align-center">
          <v-btn
            rounded
            depressed
            large
            color="my-8 primary"
            elevation="0"
            @click="routerHandler('login')"
          >
            Acceder
          </v-btn>
        </div>
      </v-app-bar>
    </div>

    <v-main>
      <CreateRoutineDialog
        v-if="createRoutineDialog"
        v-model="createRoutineDialog"
      />

      <CreateExerciseDialog
        v-if="createExerciseDialog"
        v-model="createExerciseDialog"
      />

      <router-view class="pl-4"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useSecurityStore } from "@/stores/securityStore.js";
import CreateRoutineDialog from "@/components/dialogs/CreateRoutineDialog.vue";
import MoovimLogo from "@/components/logo/MoovimLogo";
import CreateExerciseDialog from "./components/dialogs/CreateExerciseDialog.vue";

export default {
  name: "App",
  components: { CreateRoutineDialog, MoovimLogo, CreateExerciseDialog },
  data() {
    return {
      items: [
        { icon: "search", title: "Explorar", link: "/explore/categories" },
        { icon: "fitness_center", title: "Mis Rutinas", link: "/routines" },
        { icon: "bolt", title: "Mis Ejercicios", link: "/exercises" },
      ],
      result: null,
      controller: null,
      createRoutineDialog: false,
      createExerciseDialog: false,
      avatar: null,
      avatarUrl: null,
      username: null,
    };
  },
  computed: {
    ...mapState(useSecurityStore, {
      $isLoggedIn: "isLoggedIn",
    }),
  },
  methods: {
    ...mapActions(useSecurityStore, {
      $getCurrentUser: "getCurrentUser",
      $logout: "logout",
    }),
    routerHandler(routerName) {
      this.$router.push({ name: routerName });
    },
    async logout() {
      await this.$logout();
      this.routerHandler("home");
    },
  },
  created() {
    const securityStore = useSecurityStore();
    securityStore.initialize();
    if (this.$isLoggedIn) {
      this.$getCurrentUser().then((currentUser) => {
        this.avatarUrl = currentUser.avatarUrl;
        this.username = currentUser.username;
      });
    }
  },
};
</script>

<style lang="scss">
body {
  background-color: #181818;
}

::-webkit-scrollbar-corner {
  background-color: transparent;
}

::-webkit-scrollbar {
  width: 12px;
  height: 12px;
  background-color: #181818;
}

::-webkit-scrollbar-track {
  width: 12px;
  background-color: #181818;
}

::-webkit-scrollbar-thumb {
  background: #2e2e2e;
  border-radius: 8px;
  background-clip: padding-box;
}

.v-list-item--link:before {
  //TODO: scoped?
}

.v-list-item {
  flex: 0;
}

.v-image__image--cover {
  border-radius: 24px;
}

.v-card--link:before {
  background: transparent;
}
</style>

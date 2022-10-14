<template>
  <v-app style="background: #181818">
    <div
      v-if="
        this.$router.currentRoute.name !== 'register' &&
        this.$router.currentRoute.name !== 'verify'
      "
    >
      <v-navigation-drawer app color="transparent" floating clipped>
        <v-list nav class="d-flex flex-column" style="height: 100%">
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

          <v-list-item link
            ><v-list-item-icon class="align-self-center">
              <v-icon class="material-icons-round">add_box</v-icon>
            </v-list-item-icon>

            <v-list-item-content link @click="createRoutineDialog = true">
              <v-list-item-title>Crear rutina</v-list-item-title>
            </v-list-item-content></v-list-item
          >

          <v-spacer></v-spacer>

          <v-list-item flat :ripple="false">
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
        clipped-left
        app
        prominent
        color="transparent"
        style="background-image: linear-gradient(#181818, rgba(24, 24, 24, 0))"
        class="pl-4 pr-14"
        flat
        dense
      >
        <v-spacer></v-spacer>
        <router-link to="/profile">
          <v-avatar class="my-8" size="36px">
            <img
              src="https://avatars.akamai.steamstatic.com/dfa968b1f7f631cf91c0d26e47e7a6b7d029094b_full.jpg"
              alt="saul"
          /></v-avatar>
        </router-link>
      </v-app-bar>
    </div>
    <v-main>
      <CreateRoutineDialog
        v-if="createRoutineDialog"
        v-model="createRoutineDialog"
        :cycle="{}"
        :routine-id="1"
      />

      <router-view class="pl-4"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { useSecurityStore } from "./stores/securityStore.js";
import CreateRoutineDialog from "./components/dialogs/CreateRoutineDialog.vue";

export default {
  name: "App",
  data() {
    return {
      items: [
        { icon: "home", title: "Inicio", link: "/" },
        { icon: "search", title: "Explorar", link: "/explore/categories" },
        { icon: "fitness_center", title: "Mis Rutinas", link: "/routines" },
      ],
      result: null,
      controller: null,
      createRoutineDialog: false,
    };
  },
  created() {
    const securityStore = useSecurityStore();
    securityStore.initialize();
  },
  components: { CreateRoutineDialog },
};
</script>

<style lang="scss">
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
</style>

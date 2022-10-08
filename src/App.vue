<template>
  <v-app style="background: #181818">
    <v-navigation-drawer app color="transparent" floating width="256px" clipped>
      <v-list nav height="100%">
        <v-list-item-group class="d-flex flex-column" style="height: 100%">
          <v-list-item
            style="padding-left: 24px"
            v-for="item in items"
            :key="item.title"
            link
            :ripple="false"
            :to="item.link"
            flat
          >
            <v-list-item-icon>
              <v-icon class="material-icons-round">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            class="mt-auto"
            style="padding-left: 24px"
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
        </v-list-item-group>
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
      <router-link to="/profile">
        <v-avatar class="my-8" size="36px">
          <img
            src="https://avatars.akamai.steamstatic.com/dfa968b1f7f631cf91c0d26e47e7a6b7d029094b_full.jpg"
            alt="saul"
        /></v-avatar>
      </router-link>
    </v-app-bar>
    <v-main>
      <router-view class="pl-4"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import routines from "./assets/mock/routines.json";
import {useSecurityStore} from "./stores/securityStore.js";

export default {
  name: "App",
  data: () => ({
    routines: routines,
    items: [
      { icon: "home", title: "Inicio", link: "/" },
      { icon: "search", title: "Explorar", link: "/explore" },
      { icon: "fitness_center", title: "Mis Rutinas", link: "/routines" },
    ],
    result: null,
    controller: null
  }),
  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
  }
};
</script>

<style lang="scss">
::-webkit-scrollbar-corner {
  background-color: transparent;
}
::-webkit-scrollbar {
  width: 12px;
  background-color: #181818;
}
::-webkit-scrollbar-thumb {
  background: #2e2e2e;
  border-radius: 8px;
  background-clip: padding-box;
}

.v-list-item--link:before {
  border-radius: 20px;
  background-color: #5b5b5b;
}

.v-list-item {
  flex: 0;
}
</style>

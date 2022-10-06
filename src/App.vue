<template>
  <v-app style="background: #181818; overflow-y: hidden">
    <v-navigation-drawer app color="transparent" floating width="300px">
      <v-spacer style="height: 90px"></v-spacer>
      <v-list nav>
        <v-list-item-group>
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
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="transparent" class="pl-4 pr-14" flat>
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
      <router-view class="pa-8"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import routines from "./assets/mock/routines.json";
export default {
  name: "App",
  data: () => ({
    routines: routines,
    items: [
      { icon: "home", title: "Inicio", link: "/" },
      { icon: "search", title: "Explorar", link: "/explore" },
      { icon: "fitness_center", title: "Mis Rutinas", link: "/routines" },
    ],
  }),
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar-corner {
  background-color: transparent;
}
::-webkit-scrollbar {
  width: 8px;
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
</style>

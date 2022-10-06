<template>
  <v-app style="background: #181818; overflow-y: hidden">
    <v-navigation-drawer app color="transparent" floating width="300px">
      <v-spacer style="height: 90px"></v-spacer>
      <v-list nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :ripple="false"
          :to="item.link"
        >
          <v-list-item-icon class="material-icons-round">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="transparent" class="px-14" flat>
      <v-spacer></v-spacer>
      <v-avatar class="my-8" size="36px">
        <img
          src="https://avatars.akamai.steamstatic.com/dfa968b1f7f631cf91c0d26e47e7a6b7d029094b_full.jpg"
          alt="saul"
      /></v-avatar>
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

<style lang="scss">
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
</style>

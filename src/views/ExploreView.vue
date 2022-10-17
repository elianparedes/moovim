<template>
  <div>
    <v-fade-transition appear>
      <div>
        <v-text-field
          v-model="input"
          background-color="#252525"
          solo
          flat
          label="Buscar"
          class="rounded-lg"
          @keydown.enter="search"
          style="width: 50%"
          :key="1"
        >
          <template v-slot:prepend-inner
            ><v-icon class="mr-2" color="#4a4a4a">mdi-magnify</v-icon></template
          >
          <template v-slot:label
            ><span style="color: #4a4a4a">Buscar</span></template
          >
        </v-text-field>
        <SwitchButton
          :key="2"
          v-if="getIndex() !== -1"
          :chip-content="contents"
          :selected-chip="getIndex()"
          @switch="switchHandler"
        ></SwitchButton>
      </div>
    </v-fade-transition>
    <router-view class="mt-8" />
  </div>
</template>

<script>
import router from "@/router";
import SwitchButton from "@/components/SwitchButton";

export default {
  name: "ExploreView",
  components: { SwitchButton },
  data() {
    return {
      route: router.currentRoute.path.substring("/explore/".length),
      contents: ["Categorias", "Descubrir"],
      slugs: ["categories", "discover"],
      index: 0,
      input: "",
    };
  },
  methods: {
    switchHandler(i) {
      this.index = i;
      router.push("/explore/" + this.slugs[i]);
    },
    getIndex() {
      return this.slugs.indexOf(
        router.currentRoute.path.substring("/explore/".length)
      );
    },
    search() {
      if (this.slugs.indexOf(this.input) === -1) {
        router.push({ path: "search", query: { query: this.input } });
      }
    },
  },
  create() {},
};
</script>

<style>
.v-image__image--cover {
  border-radius: 24px;
}
</style>

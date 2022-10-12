<template>
  <div>
    <SwitchButton
      :chip-content="contents"
      :selected-chip="getIndex()"
      @switch="switchHandler"
    ></SwitchButton>
    <router-view />
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
    };
  },
  methods: {
    switchHandler(i) {
      this.index = i;
      router.push("/explore/" + this.slugs[i]);
    },
    getIndex() {
      console.log(
        this.slugs.indexOf(
          router.currentRoute.path.substring("/explore/".length)
        )
      );
      return this.slugs.indexOf(
        router.currentRoute.path.substring("/explore/".length)
      );
    },
  },
  mounted() {},
};
</script>

<style scoped>
.selectedClass {
  background-color: aqua;
  max-width: 100px;
}
.nonSelected {
  background-color: #f44336;
  max-width: 100px;
}
</style>

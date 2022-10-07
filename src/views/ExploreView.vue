<template>
  <div class="d-flex flex-column" style="gap: 32px">
    <SwitchButton :chipContent="['Categorías', 'Descubrir']" />
    <div class="font-weight-regular text-subtitle-1">Objetivos</div>
    <div style="white-space: nowrap; overflow: auto; padding-bottom: 16px">
      <WorkoutCategoryCard
        v-for="routine in routines"
        :key="routine"
        class="d-inline-block mr-4"
        :image="routine.image"
        :name="routine.name"
        :desc="routine.desc"
      />
    </div>
    <div class="font-weight-regular text-subtitle-1">Etapas</div>
    <div style="white-space: nowrap; overflow: auto">
      <StagesCategoryCard
        v-for="stage in stages"
        :key="stage"
        class="d-inline-block mr-4"
        :image="stage.image"
        :name="stage.name"
        :desc="stage.desc"
      />
    </div>
    <div class="font-weight-regular text-subtitle-1">Grupos Musculares</div>
    <div style="white-space: nowrap; overflow: auto; padding-bottom: 16px">
      <MusclesCategoryCard
        v-for="group in groups"
        :key="group"
        class="d-inline-block mr-4"
        :name="group.name"
      />
    </div>
  </div>
</template>

<script>
import WorkoutCategoryCard from "@/components/WorkoutCategoryCard.vue";
import SwitchButton from "../components/SwitchButton.vue";
import StagesCategoryCard from "@/components/StagesCategoryCard.vue";
import MusclesCategoryCard from "@/components/MusclesCategoryCard.vue";
export default {
  data: () => ({
    routines: [
      {
        name: "Tonificación",
        desc: "Rutinas para aumentar el volumen y el tamaño de tus músculos",
        image:
          "https://images.pexels.com/photos/38630/bodybuilder-weight-training-stress-38630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Resistencia",
        desc: "Rutinas para aumentar el volumen y el tamaño de tus músculos",
        image:
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      },
      {
        name: "Masa Muscular",
        desc: "Rutinas para aumentar el volumen y el tamaño de tus músculos",
        image:
          "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
      },
      {
        name: "Relajación",
        desc: "Rutinas para aumentar el volumen y el tamaño de tus músculos",
        image:
          "https://images.pexels.com/photos/4429104/pexels-photo-4429104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
    stages: [
      {
        name: "Calentamiento",
        desc: "Ejercicios para comenzar con tu sesión de entrenamiento. ",
        image:
          "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Principal",
        desc: "Alcanza tus objetivos.",
        image:
          "https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      },
      {
        name: "Estiramiento",
        desc: "Ejercicios para favorecer la relajación muscular y aumentar la amplitud de los movimientos",
        image:
          "https://images.unsplash.com/photo-1562771379-eafdca7a02f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      },
    ],
    groups: [{ name: "Tren Superior" }, { name: "Tren Inferior" }],
  }),
  components: {
    WorkoutCategoryCard,
    SwitchButton,
    StagesCategoryCard,
    MusclesCategoryCard,
  },
};
</script>

<style>
::-webkit-scrollbar {
  height: 12px;
}
::-webkit-scrollbar-thumb {
  background: #2e2e2e;
  border-radius: 8px;
  background-clip: padding-box;
}

::-webkit-scrollbar-track {
  margin-right: 64px;
  background-color: #1e1e1e;
  border-radius: 8px;
}

.v-responsive__sizer {
  padding-bottom: 0px !important;
}
</style>

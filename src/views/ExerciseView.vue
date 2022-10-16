<template>
  <v-fade-transition hide-on-leave>
    <div class="d-flex flex-column pb-16" style="gap: 64px; width: 50%">
      <template v-if="exercise">
        <div class="d-flex flex-column" style="gap: 8px">
          <div class="font-weight-bold text-h4">{{ name }}</div>
          <div class="text-h6 font-weight-regular">{{ exercise.detail }}</div>
          <div class="d-flex mt-4" style="gap: 16px">
            <v-chip
              class="px-10 py-4"
              color="gray"
              outlined
              @click="deleteExercise"
            >
              <v-icon left small class="material-icons-round">delete</v-icon>
              Eliminar
            </v-chip>

            <v-chip class="px-10 py-4" color="gray" outlined>
              <v-icon left small class="material-icons-round">share</v-icon>
              Compartir
            </v-chip>
            <v-chip class="px-10 py-4" color="gray" outlined>
              <v-icon left small class="material-icons-round">edit</v-icon>
              Editar
            </v-chip>
          </div>
        </div>

        <div
          v-if="images && images.length > 0"
          class="d-flex"
          style="gap: 16px; height: 400px"
        >
          <div
            v-if="images && images.length > 1"
            class="d-flex flex-column"
            style="gap: 16px; overflow-y: scroll"
          >
            <div
              v-for="n in 3"
              :key="n"
              style="height: 75px; width: 75px; background-color: #252525"
              class="rounded-lg"
            ></div>
          </div>
          <v-img
            class="rounded-lg"
            style="background-color: gray; filter: grayscale(100%)"
            :aspect-ratio="16 / 9"
            contain
            :src="images ? images[0].url : ''"
          ></v-img>
        </div>

        <div v-if="exercise.metadata && exercise.metadata.pos">
          <div class="font-weight-bold text-h6 mb-2">Posición inicial</div>

          <div class="text-body-1">
            {{ exercise.metadata.pos }}
          </div>
        </div>

        <div v-if="exercise.metadata && exercise.metadata.procedure">
          <div class="font-weight-bold text-h6 mb-2">Ejecución</div>

          <div class="text-body-1">
            {{ exercise.metadata.procedure }}
          </div>
        </div>
      </template>
    </div></v-fade-transition
  >
</template>

<script>
import { mapActions } from "pinia";
import { useExerciseStore } from "@/stores/exerciseStore.js";
import { useExerciseImageStore } from "@/stores/exerciseImageStore.js";

export default {
  props: ["name", "id"],
  data() {
    return {
      exercise: null,
      images: null,
    };
  },
  created() {
    this.fetchExercise();
    this.fetchExerciseImages();
  },
  methods: {
    ...mapActions(useExerciseStore, {
      $getExercise: "getExercise",
      $deleteExercise: "deleteExercise",
    }),
    ...mapActions(useExerciseImageStore, {
      $getAllExerciseImages: "getAllExerciseImages",
    }),
    fetchExercise() {
      this.$getExercise({ id: this.id }).then((exercise) => {
        this.exercise = exercise;
      });
    },
    fetchExerciseImages() {
      this.$getAllExerciseImages(this.id).then(
        (images) => (this.images = images.content)
      );
    },
    deleteExercise() {
      this.$deleteExercise({ id: this.exercise.id }).then(() => {
        this.$emit("delete", this.exercise);
      });
    },
  },
};
</script>

<template>
  <v-card
    class="pa-4"
    flat
    style="background-color: #252525; width: 100%; cursor: pointer"
    :class="{ 'active-card': active }"
    :ripple="false"
    @click.native="click"
  >
    <v-row align="center" class="text-body-1" no-gutters>
      <v-col>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6 font-weight-bold">
              {{ name }}
            </v-list-item-title>
            <v-list-item-subtitle class="mt-2">
              {{ detail }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>

      <v-col
        cols="1"
        :class="{
          'grey--text text--darken-2 text-center': repetitions === null,
        }"
        class="text-h6 font-weight-light text-center"
      >
        {{ repetitions ? repetitions : "•" }}
      </v-col>
      <v-col
        cols="1"
        :class="{ 'grey--text text--darken-2 text-center': weight === null }"
        class="text-h6 font-weight-light text-center"
      >
        {{ weight ? weight : "•" }}
      </v-col>
      <v-col
        cols="1"
        :class="{
          'grey--text text--darken-2 text-center': duration === null,
        }"
        class="text-h6 font-weight-light text-center"
      >
        {{ duration }}
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "ExerciseViewCard",
  props: {
    name: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    repetitions: {
      type: Number,
      required: false,
    },
    duration: {
      type: Number,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    click: {
      default: () => ({}),
      type: Function,
      required: false,
    },
    active: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style>
.active-card {
  outline: solid #f44336 2px;
}
</style>

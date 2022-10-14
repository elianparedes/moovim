<template>
  <div class="rounded-xl" color="transparent" height="100%">
    <v-img
      content-class="pl-4 pr-16 pt-4 rounded-xl d-flex flex-column"
      style="width: 100%; height: 350px; border: red 2px"
      :src="image"
      :aspect-ratio="16 / 9"
      gradient="to right, #212121 0%, rgba(43, 43, 43, 1) 15%, rgba(43, 43, 43, 0.6) 50%"
    >
      <div class="font-weight-bold text-h3">{{ name }}</div>
      <div class="text-h6 font-weight-light pr-8">{{ detail }}</div>
      <div class="text-h6 font-weight-light pr-8 mt-auto">Hola</div>
    </v-img>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    image: { type: String, required: true },
    exerciseCount: {
      type: Number,
      required: true,
    },
  },
};
</script>

<template>
  <v-card
      :key="name"
      class="rounded-lg d-inline-block ma-8"
      elevation="0"
      width="50%"
  >
    <v-card-title class="font-weight-bold text-h3">{{
        name
      }}</v-card-title>
    <v-card-title class="text-h6 font-weight-regular pr-8">{{
        muscle
      }}</v-card-title>
    <div class="pr-8 pb-16" >
      <v-btn class="text-h6 font-weight-regular float-right rounded-pill flex-fill">Ver detalles</v-btn>
    </div>
    <v-divider class="pt-16"></v-divider>
    <v-row>
      <v-col
          cols="12"
          sm="6"
          md="3"
      >
        <div class="text-center"></div>
      </v-col>

      <v-col
          cols="12"
          sm="6"
          md="3"
      >
        <div class="text-center">Reps</div>
      </v-col>

      <v-col
          cols="12"
          sm="6"
          md="3"
      >
        <div class="text-center">Kg</div>
      </v-col>

      <v-col
          cols="12"
          sm="6"
          md="3"
      >
        <div class="text-center">Segs</div>
      </v-col>
    </v-row>
    <v-row
        v-for="item in Exercises"
        :key="item.name"
    >
      <v-col
          cols="12"
          sm="6"
          md="3"
      >
        <div class="text-center">{{item.name}}</div>
      </v-col>

      <v-col
          cols="12"
          sm="6"
          md="3"
      >
        <v-text-field
            v-model=item.reps
            placeholder=item.reps
            filled
            solo
            dense
        ></v-text-field>
      </v-col>

      <v-col
          cols="12"
          sm="6"
          md="3"
      >
        <v-text-field
            v-model=item.kg
            placeholder=item.kg
            filled
            solo
            dense
        ></v-text-field>
      </v-col>

      <v-col
          cols="12"
          sm="6"
          md="3"
      >
        <v-text-field
            v-model=item.segs
            placeholder=item.segs
            filled
            solo
            dense
        ></v-text-field>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: "ExerciseSet",
  props: ['name', 'muscle', 'desc', 'image'],
  data () {
    return {
      Exercises: [
        {
          name: 'S1',
          reps: 12,
          kg: 10,
          segs:15,
        },
        {
          name: 'S2',
          reps: 12,
          kg: 10,
          segs:15,
        },
        {
          name: 'S3',
          reps: 14,
          kg: 20,
          segs:15,
        },
      ],
    }
  },
}
</script>

<style scoped>
/*
<td>{{ item.name }}</td>
          <td>{{ item.reps }}</td>
          <td>{{ item.kg }}</td>
          <td>
            <v-text-field
              :label=item.segs
              solo
              dense
              class="shrink"
            ></v-text-field>
          </td>
 */
</style>
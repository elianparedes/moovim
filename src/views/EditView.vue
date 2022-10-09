<template>
  <div>
    <v-card elevation="0" class="rounded-xl" color="transparent">
      <v-img
        class="pl-4 pr-16 pt-4"
        style="width: 100%; height: 350px; border: red 2px"
        src="https://images.pexels.com/photos/949128/pexels-photo-949128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        :aspect-ratio="16 / 9"
        gradient="to right, #212121 0%, rgba(43, 43, 43, 1) 15%, rgba(43, 43, 43, 0.6) 50%"
      >
        <v-card-title class="font-weight-bold text-h3"
          >Superseries</v-card-title
        >
        <v-card-text class="text-h6 font-weight-light pr-8"
          >Para ganar fuerza en ejercicios multiarticulares muy
          globales</v-card-text
        >
      </v-img>
    </v-card>
    <v-chip class="px-10" color="white" outlined>
      <v-icon left small class="material-icons-round">add</v-icon>
      Crear grupo
    </v-chip>
  </div>
</template>

<template>
  <v-card class="rounded-xl" flat :ripple="false" @click="click">
    <v-img class="pr-16 pa-2 card d-flex" style="flex: 1; height: 256px; transform: " :class="{ 'active-card': active }"
      :src="image" :aspect-ratio="16 / 9"
      gradient="to right, rgba(37, 37, 37, 1) 0%, rgba(37, 37, 37, 0.9) 30%,rgba(37, 37, 37, 0.5) 100%">
      <v-card-title class="font-weight-bold text-h4 mb-1">
        {{name}}
        <v-btn icon @click="onFavouriteClick()">
          <v-icon v-if="!this.isFavourite">
            mdi-star-outline
          </v-icon>
          <v-icon v-if="this.isFavourite">
            mdi-star
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle class="text-subtitle-2 font-weight-regular pr-8">{{
      desc
      }}</v-card-subtitle>



      <v-list-item class="bottom mb-2" style="position: absolute; bottom: 0">
        <v-list-item-content>
          <v-list-item-subtitle class="mb-2"> Creada por</v-list-item-subtitle>
          <v-list-item-title>
            <v-avatar size="24" class="mr-2">
              <img :src="avatar" alt="saul" />
            </v-avatar>

            {{ author }}
            <v-icon v-if="verified" small class="ml-1 material-icons-round" color="blue">
              verified
            </v-icon>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-img>
  </v-card>
</template>

<script>
import { mapActions } from "pinia";
import { useFavoritesStore } from "../stores/favoriteStore.js";


export default {
  name: "WorkoutResultCard",
  props: {
    routineId: Number,
    name: String,
    desc: String,
    image: String,
    author: String,
    avatar: String,
    stars: Number,
    bookmarks: Number,
    verified: Boolean,
    active: Boolean,
    isUserFavourite: {
      type: Boolean,
      required: false,
      default: false,
    },
    click: {
      default: () => ({}),
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      isFavourite: this.isUserFavourite,
    }
  },
  methods: {
    ...mapActions(useFavoritesStore,
      {
        $addFavorites: 'addFavorites',
        $deleteFavorite: 'deleteFavorite',
      }),
    async addFavorites() {
      await this.$addFavorites(this.routineId);
    },
    async deleteFavorite() {
      await this.$deleteFavorite(this.routineId);
    },
    onFavouriteClick() {
      this.isFavourite = !this.isFavourite;
      if (this.isFavourite) {
        this.addFavorites();
      }
      else {
        this.deleteFavorite();
      }
    }

  }
};
</script>

<style>
.container {
  height: 100px;
  padding: 600px;
}

.card {
  transition: all 200ms ease-in;
  outline: solid transparent 2px;
}

.bottom {
  align-self: flex-end;
}

.card:hover {
  transition: all 150ms ease-in-out;
  scale: 1.01;
}

.active-card {
  outline: solid #bf3d3d 2px;
}
</style>



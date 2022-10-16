import { defineStore } from "pinia";
import { favoritesApi } from "@/api/favorites";

export { useFavoritesStore };

const useFavoritesStore = defineStore("favorites", {
    state: () => ({ }),
    getters: {},
    actions: {
        async getAllFavorites() {
            const result = await favoritesApi.getAll();
            return result;
        },
        async addFavorites(routineId) {
            const result = await favoritesApi.add(routineId);
            return result;
        },
        async deleteFavorite(routineId) {
            await favoritesApi.delete(routineId);
        },
    },
})
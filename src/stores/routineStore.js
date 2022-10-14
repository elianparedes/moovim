import { defineStore } from "pinia";
import { routineApi, Routine } from "@/api/routine";

export { useRoutineStore, FullRoutine };

const useRoutineStore = defineStore("routine", {
  state: () => ({ items: [] }),
  getters: {},
  actions: {
    push(fullRoutine) {
      this.items.push(fullRoutine);
    },
    replace(index, fullRoutine) {
      this.items[index] = fullRoutine;
    },
    splice(index) {
      this.items.splice(index, 1);
    },
    async addRoutine(name, detail, isPublic, category, difficulty) {
      const result = await routineApi.add(
        new Routine(name, detail, isPublic, category, difficulty)
      );
      this.items.push(result);
      return result;
    },
    async getRoutine(routineId) {
      /*const index = this.items.findIndex(fullRoutine);
      if (index >= 0) {
        return this.items[index];
      }*/
      const result = await routineApi.get(routineId);
      //this.items.push(result);
      return result;
    },
    async getAllRoutine() {
      const result = await routineApi.getAll();
      return result;
    },
    async getRoutineQuery(search) {
      const result = await routineApi.getQuery(
        //new RoutineQuery().setUserId(userId).setCategoryId(categoryId).setDifficulty(difficulty).setSearchQuery(search)
        "" + search
      );
      return result;
    },
    async modifyRoutine(fullRoutine) {
      const result = await routineApi.modify(fullRoutine);
      const index = this.items.findIndex(fullRoutine);
      if (index >= 0) {
        this.replace(index, result);
      }
      return result;
    },
    async deleteRoutine(fullRoutine) {
      await routineApi.delete(fullRoutine.id);
      const index = this.items.findIndex(fullRoutine);
      if (index >= 0) {
        return this.splice(index);
      }
    },
  },
});

class FullRoutine {
  constructor(
    id,
    name,
    detail,
    isPublic,
    category,
    difficulty,
    user,
    metadata
  ) {
    this.id = id;
    this.name = name;
    this.detail = detail;
    this.isPublic = isPublic;
    this.category = category;
    this.difficulty = difficulty;
    this.user = user;
    this.metadata = metadata;
  }
}

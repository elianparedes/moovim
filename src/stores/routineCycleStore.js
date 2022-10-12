import { defineStore } from "pinia";
import { routineCycleApi, RoutineCycle } from "@/api/routineCycle";

export { useRoutineCycleStore, FullRoutineCycle };

const useRoutineCycleStore = defineStore("routineCycle", {
  state: () => ({ items: [] }),
  getters: {},
  actions: {
    push(fullRoutineCycle) {
      this.items.push(fullRoutineCycle);
    },
    replace(index, fullRoutineCycle) {
      this.items[index] = fullRoutineCycle;
    },
    splice(index) {
      this.items.splice(index, 1);
    },
    async getAllRoutineCycles(routineId) {
      const result = await routineCycleApi.getAll(routineId);
      return result;
    },
    async addRoutineCycle(
      routineId,
      name,
      detail,
      type,
      order,
      repetitions,
      metadata
    ) {
      const result = await routineCycleApi.add(
        routineId,
        new RoutineCycle(name, detail, type, order, repetitions, metadata)
      );
      this.items.push(result);
      return result;
    },
    async getRoutineCycle(routineId, fullRoutineCycle) {
      const index = this.items.findIndex(fullRoutineCycle);
      if (index >= 0) {
        return this.items[index];
      }
      const result = await routineCycleApi.get(routineId, fullRoutineCycle.id);
      this.items.push(result);
      return result;
    },
    async modifyRoutineCycle(routineId, fullRoutineCycle) {
      const result = await routineCycleApi.modify(routineId, fullRoutineCycle);
      const index = this.items.findIndex(fullRoutineCycle);
      if (index >= 0) {
        this.replace(index, result);
      }
      return result;
    },
    async deleteRoutineCycle(routineId, fullRoutineCycle) {
      await routineCycleApi.delete(routineId, fullRoutineCycle.id);
      const index = this.items.findIndex(fullRoutineCycle);
      if (index >= 0) {
        return this.splice(index);
      }
    },
  },
});

class FullRoutineCycle {
  // type = [warmup, exercise, cooldown]
  constructor(id, name, detail, type, repetitions, metadata) {
    this.id = id;
    this.name = name;
    this.detail = detail;
    this.type = type;
    this.repetitions = repetitions;
    this.metadata = metadata;
  }
}

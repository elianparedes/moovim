import { Api } from "./api";

export { routineCycleApi, RoutineCycle };

class routineCycleApi {
  static getUrl(routineId, cycleId) {
    return `${Api.baseUrl}/routines${routineId ? `/${routineId}` : ""}
        /cycles${cycleId ? `/${cycleId}` : ""}`;
  }

  static async getAll(routineId, controller) {
    return await Api.get(routineCycleApi.getUrl(routineId), true, controller);
  }

  static async add(routineId, routineCycle, controller) {
    return await Api.post(
      routineCycleApi.getUrl(routineId),
      true,
      routineCycle,
      controller
    );
  }

  static async get(routineId, cycleId, controller) {
    return await Api.get(
      routineCycleApi.getUrl(routineId, cycleId),
      true,
      controller
    );
  }

  static async modify(routineId, fullRoutineCycle, controller) {
    return await Api.put(
      routineCycleApi.getUrl(routineId, fullRoutineCycle.id),
      true,
      fullRoutineCycle,
      controller
    );
  }

  static async delete(routineId, cycleId, controller) {
    return await Api.delete(
      routineCycleApi.getUrl(routineId, cycleId),
      true,
      controller
    );
  }
}

class RoutineCycle {
  // type = [warmup, exercise, cooldown]
  constructor(name, detail, type, order, repetitions, metadata) {
    this.name = name;
    this.detail = detail;
    this.type = type;
    this.repetitions = repetitions;
    this.order = order;
    this.metadata = metadata;
  }
}

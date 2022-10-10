import {Api} from "./api"

export {cycleExercise, exerciseCycleApi};

class exerciseCycleApi{

    static getUrl(cycleId, exerciseId){
        return `${Api.baseUrl}/cycles/${cycleId ? `/${cycleId}` : "" }
        /exercises${exerciseId ? `/${exerciseId}` : "" }`;
    }

    static async getAll(cycleId, controller){
        return await Api.get(exerciseCycleApi.getUrl(cycleId), true, controller);
    }

    static async get(cycleId, exerciseId , controller){
        return await Api.get(exerciseCycleApi.getUrl(cycleId,exerciseId), true, controller);
    }

    //add cycle exercise
    static async add(cycleId, exerciseId, cycleExercise, controller){
        return await Api.post(exerciseCycleApi.getUrl(cycleId, exerciseId), true, cycleExercise, controller);
    }

    //modify cycle exercise
    static async modify(cycleId, exerciseId, cycleExercise, controller){
        return await Api.put(exerciseCycleApi.getUrl(cycleId, exerciseId), true, cycleExercise, controller);
    }

    //delete cycle exercise
    static async delete(cycleId, exerciseId, controller){
        return await Api.delete(exerciseCycleApi.getUrl(cycleId, exerciseId), true, controller);
    }

}

class cycleExercise{
    constructor(order, duration, repetitions){
        this.order=order;
        this.duration=duration;
        this.repetitions=repetitions;
    }
}
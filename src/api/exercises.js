import {Api} from "./api"

export {exercisesApi, Exercise}

class exercisesApi{

    static getUrl(slug){
        return `${Api.baseUrl}/exercises${slug ? `/${slug}` : "" }`;
    }

    static async add(exercise, controller){
        return await Api.post(exercisesApi.getUrl(), true, exercise, controller);
    }

    static async modify(exercise, controller){
        return await Api.put(exercisesApi.getUrl(exercise.id), true, exercise, controller);
    }

    static async get(id, controller){
        return await Api.get(exercisesApi.getUrl(id), true, controller);
    }

    static async delete(id, controller){
        return await Api.delete(exercisesApi.getUrl(id), true, controller);
    }

    static async getAll(controller){
        return await Api.get(exercisesApi.getUrl(), true, controller);
    }

    static async getQuery(searchQuery, controller){
        return await Api.get(exercisesApi.getUrl('?search=' + searchQuery), true, controller);
    }
}

class Exercise{
    constructor(name, type, detail, metadata){
        this.name=name;
        this.type=type;
        this.detail=detail;
        this.metadata=metadata;
    }
}
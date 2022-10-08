import {Api} from "./api"

export {exercisesApi, Exercise}

class exercisesApi{

    static getUrl(slug){
        return `${Api.baseUrl}/exercises${slug ? `/${slug}` : "" }`;
    }

    static async postExercises(exercise){
        return await Api.post(exercisesApi.getUrl(), true, exercise);
    }

    static async getExercises(exercise){
        return await Api.get(exercisesApi.getUrl(), true);
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
import {Api} from "./api"

export {favoritesApi}

class favoritesApi{

    static getUrl(slug){
        return `${Api.baseUrl}/favourites${slug ? `/${slug}` : "" }`;
    }

    static async getAll(controller){
        return await Api.get(favoritesApi.getUrl(), true, controller);
    }

    static async add(routineId, controller){
        return await Api.post(favoritesApi.getUrl(routineId), true, controller);
    }

    static async delete(routineId, controller){
        return await Api.delete(favoritesApi.getUrl(routineId), true, controller);
    }
}
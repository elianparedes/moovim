import {Api} from "./api"

export {exerciseImageApi, Image}

class exerciseImageApi{

    static getUrl(exerciseId, imageId){
        return `${Api.baseUrl}/exercises${exerciseId ? `/${exerciseId}` : "" }/images
        ${imageId ? `/${imageId}` : "" }`;
    }

    static async getAll(exerciseId, controller){
        return await Api.get(exerciseImageApi.getUrl(exerciseId), true, controller);
    }

    static async add(exerciseId, image, controller){
        return await Api.post(exerciseImageApi.getUrl(), true, image, controller);
    }

    static async get(exerciseId, imageId, controller){
        return await Api.get(exerciseImageApi.getUrl(exerciseId, imageId), true, controller);
    }

    static async modify(exerciseId, imageId, image , controller){
        return await Api.put(exerciseImageApi.getUrl(exerciseId, imageId), true, image, controller);
    }

    static async delete(exerciseId, imageId, controller){
        return await Api.delete(exerciseImageApi.getUrl(exerciseId,imageId), true, controller);
    }

}

class Image{
    constructor(number, url){
        this.number=number;
        this.url=url;
    }
}
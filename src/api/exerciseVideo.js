import {Api} from "./api"

export {exerciseVideoApi, Video}

class exerciseVideoApi{

    static getUrl(exerciseId, videoId){
        return `${Api.baseUrl}/exercises${exerciseId ? `/${exerciseId}` : "" }/videos
        ${videoId ? `/${videoId}` : "" }`;
    }

    static async getAll(exerciseId, controller){
        return await Api.get(exerciseVideoApi.getUrl(exerciseId), true, controller);
    }

    static async add(exerciseId, video, controller){
        return await Api.post(exerciseVideoApi.getUrl(), true, video, controller);
    }

    static async get(exerciseId, videoId, controller){
        return await Api.get(exerciseVideoApi.getUrl(exerciseId, videoId), true, controller);
    }

    static async modify(exerciseId, videoId, image , controller){
        return await Api.put(exerciseVideoApi.getUrl(exerciseId, videoId), true, image, controller);
    }

    static async delete(exerciseId, videoId, controller){
        return await Api.delete(exerciseVideoApi.getUrl(exerciseId,videoId), true, controller);
    }

}

class Video{
    constructor(number, url){
        this.number=number;
        this.url=url;
    }
}
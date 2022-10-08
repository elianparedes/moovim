import {Api} from "./api";

export {Category, categoryApi};

class categoryApi{

    static getUrl(slug){
        return `${Api.baseUrl}/categories${ slug ? `/${slug}` : "" }`;
    }

    static async get(id, controller){
        return await Api.get(categoryApi.getUrl(id), true, controller);
    }

    static async getAll(controller){
        return await Api.get(categoryApi.getUrl(), false, controller);
    }

    static async add(category, controller){
        return await Api.post(categoryApi.getUrl(), true, category, controller);
    }

    static async modify(category, controller){
        return await Api.put(categoryApi.getUrl(category.id), true, category, controller);
    }

    static async delete(id, controller){
        return await Api.delete(categoryApi.getUrl(id), true, controller);
    }

}

class Category{
    constructor(name, detail){
        this.name=name;
        this.detail=detail;
    }
}
import { defineStore} from "pinia";
import { Category, categoryApi } from "@/api/category";

export {FullCategory};

export const useCategoryStore = defineStore("category", {
    // items is an array of FullCategory
    state: () => ({items: []} ),
    getters:{
    },
    actions: {
        push(category){
            this.items.push(category);
        },
        replace(index, fullCategory){
            this.items[index] = fullCategory;
        },
        splice(index) {
            this.items.splice(index, 1);
        },
        async addCategory(name, detail){
            const result = await categoryApi.add(new Category(name, detail));
            this.items.push(result);
            return result;
        },
        async getCategory(fullCategory){
            const index = this.items.findIndex(fullCategory);
            if (index >= 0){
                return this.items[index];
            }
            const result = await categoryApi.get(fullCategory.id);
            this.items.push(result);
            return result;
        },
        async getAllCategories(){
            const result = await categoryApi.getAll();
            return result;
        },
        async modifyCategory(fullCategory){
            const result = await categoryApi.modify(fullCategory);
            const index = this.items.findIndex(fullCategory);
            if (index >= 0){
                this.replace(index, result);
            }
            return result;
        },
        async deleteCategory(fullCategory){
            await categoryApi.delete(fullCategory.id);
            const index = this.items.findIndex(fullCategory);
            if (index >= 0){
                return this.splice(index);
            }
        }
    }
})

class FullCategory{
    constructor(id, name, detail) {
        this.id = id;
        this.name = name;
        this.detail = detail;
      }
}
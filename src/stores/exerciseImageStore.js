import { defineStore } from "pinia";
import { exerciseImageApi, Image} from "@/api/exerciseImage";
export {FullExerciseImage};

export const useExerciseImageStore = defineStore("exerciseImage", {
    state: () => ({ items: [] }),
    getters: {},
    actions: {
      push(fullExerciseImage) {
        this.items.push(fullExerciseImage);
      },
      replace(index, fullExerciseImage) {
        this.items[index] = fullExerciseImage;
      },
      splice(index) {
        this.items.splice(index, 1);
      },
      async getAllExerciseImages(exerciseId) {
        /*const index = this.items.findIndex(fullExercise);
        if (index >= 0) {
          return this.items[index];
        }*/
        const result = await exerciseImageApi.getAll(exerciseId);
        this.items.push(result);
        return result;
      },
      async addExerciseImage(exerciseId, number, url) {
        const result = await exerciseImageApi.add(
          new exerciseImageApi.add(exerciseId, new Image(number, url))
        );
        this.items.push(result);
        return result;
      },
      async getExerciseImages(exerciseId, imageId) {
        const result = await exerciseImageApi.get(exerciseId, imageId);
        return result;
      },
      async modifyExerciseImage(exerciseId, imageId, number, url) {
        const result = await exerciseImageApi.modify(new Image(number, url));
        /*
        const index = this.items.findIndex(fullExerciseImage);
        if (index >= 0) {
          this.replace(index, result);
        }
        */
        return result;
      },
      async deleteExerciseImage(exerciseId, imageId) {
        await exerciseImageApi.delete(exerciseId, imageId);
        /*
        const index = this.items.findIndex(fullExercise);
        if (index >= 0) {
          return this.splice(index);
        }
        */
      },
    },
  });

  class FullExerciseImage{
    constructor(exerciseId, imageId, number, url){
        this.exerciseId=exerciseId
        this.imageId=imageId
        this.number=number;
        this.url=url;
    }
  }
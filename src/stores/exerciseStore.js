import {defineStore} from "pinia"
import { exercisesApi, Exercise} from "@/api/exercises"

export const useExerciseStore = defineStore("exercises", {
    state: () => ({items: []}),
    getters:{
    },
    actions: {
        push(fullExercise){
            this.items.push(fullExercise);
        },
        replace(index, fullExercise){
            this.items[index] = fullExercise;
        },
        splice(index) {
            this.items.splice(index, 1);
        },
        async addExercise(name, type, detail, metadata){
            const result = await exercisesApi.add(new Exercise(name,type,detail,metadata));
            this.items.push(result);
            return result;
        },
        async getExercise(fullExercise){
            const index = this.items.findIndex(fullExercise);
            if (index >= 0){
                return this.items[index];
            }
            const result = await exercisesApi.get(fullExercise.id);
            this.items.push(result);
            return result;
        },
        async getAllExercises(){
            const result = await exercisesApi.getAll();
            return result;
        },
        async modifyExercise(fullExercise){
            const result = await exercisesApi.modify(fullExercise);
            const index = this.items.findIndex(fullExercise);
            if (index >= 0){
                this.replace(index, result);
            }
            return result;
        },
        async deleteExercise(fullExercise){
            await exercisesApi.delete(fullExercise.id);
            const index = this.items.findIndex(fullExercise);
            if (index >= 0){
                return this.splice(index);
            }
        }
    }
})
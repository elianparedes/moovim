import { defineStore } from "pinia";
import { exerciseVideoApi, Video} from "@/api/exerciseVideo";
export { FullExerciseVideo };

export const useExerciseVideoStore = defineStore("exerciseVideo", {
    state: () => ({ items: [] }),
    getters: {},
    actions: {
        push(fullExerciseVideo) {
            this.items.push(fullExerciseVideo);
        },
        replace(index, fullExerciseVideo) {
            this.items[index] = fullExerciseVideo;
        },
        splice(index) {
            this.items.splice(index, 1);
        },
        async getAllExerciseVideos(exerciseId) {
            /*const index = this.items.findIndex(fullExercise);
            if (index >= 0) {
              return this.items[index];
            }*/
            const result = await exerciseVideoApi.getAll(exerciseId);
            this.items.push(result);
            return result;
        },
        async addExerciseVideo(exerciseId, number, url) {
            const result = await exerciseVideoApi.add(
                new exerciseVideoApi.add(exerciseId, new Video(number, url))
            );
            this.items.push(result);
            return result;
        },
        async getExerciseImages(exerciseId, videoId) {
            const result = await exerciseVideoApi.get(exerciseId, videoId);
            return result;
        },
        async modifyExerciseVideo(exerciseId, videoId, number, url) {
            const result = await exerciseVideoApi.modify(new Video(number, url));
            /*
            const index = this.items.findIndex(fullExerciseImage);
            if (index >= 0) {
              this.replace(index, result);
            }
            */
            return result;
        },
        async deleteExerciseVideo(exerciseId, videoId) {
            await exerciseVideoApi.delete(exerciseId, videoId);
            /*
            const index = this.items.findIndex(fullExercise);
            if (index >= 0) {
              return this.splice(index);
            }
            */
        },
    },
});

class FullExerciseVideo {
    constructor(exerciseId, imageId, number, url) {
        this.exerciseId = exerciseId
        this.imageId = imageId
        this.number = number;
        this.url = url;
    }
}
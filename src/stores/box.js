import { defineStore } from "pinia";

export const useBoxStore = defineStore('box', {
    state: () => ({
        boxRows: []
    }),
    getters: {
        currentBox(state) {
            return state.boxRows
        }

    },
    actions: {
        setCurrentBox(boxRows) {
            this.boxRows = boxRows
        }
    }

})
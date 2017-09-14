import Vue from 'vue';
export const EventBus = new class {
    constructor() {
        this.vue = new Vue();
    }
    fire(event, data = null) {
        console.log("..firing.." + event);
        this.vue.$emit(event, data);
    }
    listen(event, callback) {
        this.vue.$on(event, callback);
    }
}
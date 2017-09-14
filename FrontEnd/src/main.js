import Vue from 'vue'

import router from './routes'

/*  
    axios is the alternative to vue-router.
    vue-router is not supported in Vue 2.0.
    So, axios is the recommended library for making http calls. 
*/
import axios from 'axios';

/* 
    Things that we are referencing all over our project. 
    So these items are attached to the global or the window object.
*/
window.axios = axios;

new Vue({
    el: '#app',
    router,
})
<style scoped>
    .bread-segment {
        margin-bottom: 10px;
        background: none;
        box-shadow: none;
        border: none;
    }
</style>
<template>
    <div class="ui container">
        <div class="ui segment">
            <div id="foo">
                <h1> {{pagename}} </h1>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        EventBus
    } from '../utils/Dispatcher.js';

    export default {
        name: 'home-screen',
        data() {
            return {
                pagename: 'LOT Less'
            }
        },
        mounted() {
            EventBus.fire('home-screen-mounted');
        }
    }
</script>
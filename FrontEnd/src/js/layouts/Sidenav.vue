<template>
    <div class="ui sidebar inverted vertical menu">
    
        <li v-for="navlink in items">
            <a class="item">
                {{ navlink.link }} <i v-bind:class="navlink.icon"></i>
            </a>
        </li>
    
    </div>
</template>
    

<script>
    import {
        EventBus
    } from './Dispatcher.js';
    
    export default {
        data() {
            return {
                items: [{
                    icon: 'compress icon',
                    link: "foo"
                }, {
                    icon: 'archive icon',
                    link: "Bar"
                }]
            }
        },
        mounted() {

            EventBus.listen('show-side-bar', () => {
                console.log(`Oh, that's nice. It's gotten  clicks! :)`)
                this.onToggleEvent();
            });

        },

        methods: {
            onToggleEvent() {
                $('.ui.sidebar').sidebar('toggle');
            }
        }

    }
</script>
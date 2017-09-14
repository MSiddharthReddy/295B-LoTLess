<style lang="" scoped>
#foo {
    border: 1px solid red;
}
</style>

<template>
    <div id="navbar" class="ui fixed  main menu">
        <div class="ui container">
            <a href="#" @click="showSideNav" class="header item">App</a>
            <a href="#" class="item">{{shared.settings.name}}</a>
            <div class="ui simple dropdown item">
                Dropdown
                <i class="dropdown icon"></i>
                <div class="menu">
                    <a class="item" href="#">Link Item</a>
                    <div class="divider"></div>
                    <div class="header">
                        Header Item
                    </div>
                    <div class="item">
                        <i class="dropdown icon"></i>
                        Sub Menu
                        <div class="menu">
                            <a class="item" href="#">Link Item</a>
                            <a class="item" href="#">Link Item</a>
                        </div>
                    </div>
                    <a class="item" href="#">Link Item</a>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { EventBus } from './Dispatcher.js';
import { Store } from './Store.js';
import { UserController } from './UserController.js';
export default {
    name: 'header-view',
    data() {
        return {
            counter: 0,
            shared: Store
        }
    },

    mounted() {
        EventBus.listen('show-side-bar', () => {
            this.shared.settings.name = "Title " + this.counter++;
            this.shared.settings.age = this.counter++;
        });
        UserController.print();
        
    }
    ,
    methods: {
        showSideNav() {
             EventBus.fire('show-side-bar');
            // EventBus.fire('show-controller-message');
        }
    }

}
</script>

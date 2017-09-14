import * as helper from 'lodash'
import { EventBus } from './Dispatcher.js';

export const UserController = new class {
    constructor() {
        this.name = "name";
        this.users = [
            { name: "a", age: 30 },
            { name: "b", age: 40 }
        ];


        EventBus.listen('show-controller-message', () => {
            print();
        });


    }


    print() {
        EventBus.fire('show-side-bar');

        let usr = this.users;
        let foo = helper.filter(usr, {
            age: 40
        });
        console.log("From user controller ... \n" + foo);
    }
}
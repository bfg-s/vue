import { ServiceProvider, ApplicationContainer } from 'bfg-js';
import * as Vue from "vue";
export default class VueServiceProvider extends ServiceProvider<ApplicationContainer> {
    name: string;
    require: Array<string>;
    register(): void;
    __create_vue_app(...args: Array<any>): any;
    static make_vue_instance(): typeof Vue;
}

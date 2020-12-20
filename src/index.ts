import {ServiceProvider, ApplicationContainer} from 'bfg-js';
import Schema from './Core/Schema';

export default class VueServiceProvider extends ServiceProvider<ApplicationContainer> {

    name: string = 'vue';

    require: Array<string> = [
        'commander', 'schema'
    ];

    register() {

        this.app.bind('schema_class', Schema(this.app));
    }
}
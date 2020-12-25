import {ServiceProvider, ApplicationContainer} from 'bfg-js';
import Schema from './Core/Schema';

interface RequireContext {
    keys(): string[];
    (id: string): any;
    <T>(id: string): T;
    resolve(id: string): string;
    /** The module id of the context module. This may be useful for module.hot.accept. */
    id: string;
}

export default class VueServiceProvider extends ServiceProvider<ApplicationContainer> {

    name: string = 'vue';

    require: Array<string> = [
        'commander', 'schema'
    ];

    register() {

        this.app.bind('schema_class', Schema(this.app));
        this.app.bind('_cv', {});
        this.app.bind('_av', {});
    }
}
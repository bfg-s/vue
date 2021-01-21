import Schema from './Core/Schema';

type ApplicationContainer = import('bfg-js').ApplicationContainer;

export interface ServiceProviderInterface<T> {
    app: T
    register? (): void
    boot? (): void
}

export interface ServiceProviderConstructor {
    new <T extends ApplicationContainer>(app?: T): ServiceProvider<T>;
}

class ServiceProvider<T extends ApplicationContainer> implements ServiceProviderInterface<T> {

    name?: string|Function

    require?: Array<string>

    constructor(
        public app: T
    ) {}
}

export default class VueServiceProvider extends ServiceProvider<ApplicationContainer> {

    name: string = 'vue';

    require: Array<string> = [
        'commander', 'schema'
    ];

    register() {

        this.app.bind('schema_class', Schema(this.app));
        this.app.bind('shared_data', this.app.vue.reactive({}));
        this.app.bind('_cv', {});
        this.app.bind('_av', {});
    }
}
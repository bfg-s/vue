declare type ApplicationContainer = import('bfg-js').ApplicationContainer;
export interface ServiceProviderInterface<T> {
    app: T;
    register?(): void;
    boot?(): void;
}
export interface ServiceProviderConstructor {
    new <T extends ApplicationContainer>(app?: T): ServiceProvider<T>;
}
declare class ServiceProvider<T extends ApplicationContainer> implements ServiceProviderInterface<T> {
    app: T;
    name?: string | Function;
    require?: Array<string>;
    constructor(app: T);
}
export default class VueServiceProvider extends ServiceProvider<ApplicationContainer> {
    name: string;
    require: Array<string>;
    register(): void;
}
export {};

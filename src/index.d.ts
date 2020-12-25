import { ServiceProvider, ApplicationContainer } from 'bfg-js';
export default class VueServiceProvider extends ServiceProvider<ApplicationContainer> {
    name: string;
    require: Array<string>;
    register(): void;
}

import { ApplicationContainer } from "bfg-js";
import { ruleObject } from "bfg-schema/src/Core/Schema";
declare const _default: (app: ApplicationContainer, rules: ruleObject) => {
    data(): {
        app: ApplicationContainer<{}>;
    };
    mounted(): void;
    unmounted(): void;
    methods: {
        alert_root(data: string): void;
    };
};
export default _default;

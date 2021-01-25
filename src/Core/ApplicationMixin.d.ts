import { ApplicationContainer } from "bfg-js";
import { ruleObject } from "bfg-schema/src/Core/Schema";
declare const _default: (app: ApplicationContainer, rules: ruleObject) => {
    data(): {
        app: ApplicationContainer<{}>;
        __contained: boolean;
    };
    beforeMount(): void;
    mounted(): void;
    unmounted(): void;
    methods: {};
};
export default _default;

import { ApplicationContainer } from "bfg-js";
import { anyObject, ruleObject } from "bfg-schema/src/Core/Schema";
declare const _default: (app: ApplicationContainer, rules: ruleObject) => {
    bind: {};
    share: any;
    save: any;
    props: {
        global_rules: {
            required: boolean;
            type: ObjectConstructor;
        };
    };
    data(): {
        app: ApplicationContainer<{}>;
        __contained: boolean;
    };
    beforeMount(): void;
    mounted(): void;
    beforeUnmount(): void;
    methods: {
        __on_component(variables: anyObject): void;
    };
};
export default _default;

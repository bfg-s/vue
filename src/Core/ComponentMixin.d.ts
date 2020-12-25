import { ApplicationContainer } from "bfg-js";
import { ruleObject } from "bfg-schema/src/Core/Schema";
declare const _default: (app: ApplicationContainer, rules: ruleObject) => {
    props: {
        global_rules: {
            required: boolean;
            type: ObjectConstructor;
        };
    };
    data(): {
        app: ApplicationContainer<{}>;
    };
    mounted(): void;
    unmounted(): void;
    methods: {
        __on_component(rules: ruleObject): void;
    };
};
export default _default;

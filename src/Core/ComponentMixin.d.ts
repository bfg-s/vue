import { ApplicationContainer } from "bfg-js";
import { anyObject, ruleObject } from "bfg-schema/src/Core/Schema";
declare const _default: (app: ApplicationContainer, rules: ruleObject) => {
    bind: {};
    singleton: {};
    compute: {};
    provider: any;
    share: any;
    with: any;
    save: any;
    props: {
        global_rules: {
            type: ObjectConstructor;
        };
    };
    data(): {
        app: ApplicationContainer<{}>;
    };
    beforeUpdate(): void;
    beforeMount(): void;
    mounted(): void;
    beforeUnmount(): void;
    methods: {
        __is_contained(): boolean;
        __on_component(variables: anyObject): void;
    };
};
export default _default;

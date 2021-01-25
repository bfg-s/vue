import { ApplicationContainer } from "bfg-js/src/Support/Application";
import { ruleObject, anyObject } from "bfg-schema/src/Core/Schema";
declare const _default: (app: ApplicationContainer) => {
    new (): {
        [x: string]: any;
        vue_app: any;
        all_components: anyObject;
        build(element: HTMLElement, rules: ruleObject): any;
        wrap_component(rules: ruleObject, content_nodes: Array<any>): any;
        apply_content(content: Array<HTMLElement>): any[];
        apply_methods(rules: ruleObject): anyObject;
        method_request(rules: ruleObject, method: string, params: Array<object>, request_data?: object): Promise<unknown>;
        redirected(data: any, component: HTMLElement): void;
    };
    [x: string]: any;
};
export default _default;

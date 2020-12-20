import { ApplicationContainer } from "bfg-js/src/Support/Application";
interface anyObject {
    [key: string]: any;
}
interface ruleObject {
    e: string;
    a: anyObject;
    c: anyObject;
    v: anyObject;
    m: Array<string>;
}
declare const _default: (app: ApplicationContainer) => {
    new (): {
        [x: string]: any;
        vue_app: any;
        build(element: HTMLElement, rules: ruleObject): void;
        insert(element: HTMLElement, data: any): void;
    };
    [x: string]: any;
};
export default _default;

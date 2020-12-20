import {ApplicationContainer} from "bfg-js/src/Support/Application";
import {VueDecorator} from "vue-class-component";

interface anyObject {
    [key: string]: any;
}

interface ruleObject {
    e: string           // Element name
    a: anyObject        // Attributes
    c: anyObject        // Contents
    v: anyObject        // Variables
    m: Array<string>    // Methods
}

export default (app: ApplicationContainer) => {

    return class Schema extends app.schema_class {

        vue_app: any = null;

        build (element: HTMLElement, rules: ruleObject) {

            rules.e = rules.e.replace('::', '_').replace(/\./g, '_');

            let component: any = app.components.get(rules.e);

            this.vue_app = app.vue.createApp({
                components: app.components.all(),
                render () {
                    let resolved = app.vue.resolveComponent(rules.e);
                    console.log(rules.e, component);
                    return app.vue.createVNode(resolved)
                }
            });

            this.vue_app.mount(element, true);

            // let node: HTMLElement = document.createElement(rules.e);
            //
            // let content = this.app.schema.apply_content(
            //     Object.assign([], element.childNodes)
            // );
            //
            // this.app.obj.each(rules.a, (item: string, key: string) => {
            //     node.setAttribute(key, item);
            // });
            //
            // this.app.obj.each(rules.c, (item: any, key: string) => {
            //     let appEnd: Node;
            //     if (typeof item === 'string') {
            //         appEnd = document.createRange().createContextualFragment(item);
            //     } else {
            //         appEnd = this.build(node, item);
            //     }
            //     node.appendChild(appEnd);
            // });
            //
            // node.append(...content);

            //return node;
        }

        insert (element: HTMLElement, data: any) {}
    }
};


// export class Schema {
//
//     constructor(
//         protected app: ApplicationContainer
//     ) {
//     }
//
//     rules (element: HTMLElement): ruleObject {
//
//         return element && 'schema' in element.dataset ?
//             this.app.json.decode(element.dataset.schema) : (
//                 element && 'schemaId' in element.dataset && element.dataset.schemaId in this.app.data ?
//                     this.app.data[element.dataset.schemaId] : {}
//             );
//     }
//
//     build (element: HTMLElement, rules: ruleObject) {
//
//         let node: HTMLElement = document.createElement(rules.e);
//
//         let content = Object.assign([], element.childNodes);
//
//         this.app.obj.each(rules.a, (item: string, key: string) => {
//             node.setAttribute(key, item);
//         });
//
//         this.app.obj.each(rules.c, (item: any, key: string) => {
//             let appEnd: Node;
//             if (typeof item === 'string') {
//                 appEnd = document.createRange().createContextualFragment(item);
//             } else {
//                 appEnd = this.build(node, item);
//             }
//             node.appendChild(appEnd);
//         });
//
//         node.append(...content);
//
//         return node;
//     }
//
//     insert (element: HTMLElement, data: any) {
//
//         element.parentNode.replaceChild(data, element);
//     }
// }
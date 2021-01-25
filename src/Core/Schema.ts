import {ApplicationContainer} from "bfg-js/src/Support/Application";
import {ruleObject, anyObject} from "bfg-schema/src/Core/Schema";
import ComponentMixin from "./ComponentMixin";
import ApplicationMixin from "./ApplicationMixin";

export default (app: ApplicationContainer) => {

    return class Schema extends app.schema_class {

        vue_app: any = null;

        all_components: anyObject = {};

        build (element: HTMLElement, rules: ruleObject) {

            let content_nodes = Object.assign([], element.childNodes);

            this.all_components = app.components.all();

            let that = this;

            this.vue_app = app.vue.createApp({
                mixins: [ApplicationMixin(app, rules)],
                methods: {
                    unmount () {
                        app.vue.render(null, element)
                    }
                },
                render () {
                    return app.schema.wrap_component(rules, content_nodes);
                }
            });

            app.obj.each(this.all_components, (i: any, k: string) => this.vue_app.component(k, i));

            return this.vue_app.mount(element, true).$el;
        }

        wrap_component (rules: ruleObject, content_nodes: Array<any>) {

            let resolved;

            let params: anyObject;

            let contents: any = {
                default: app.vue.withCtx(() => app.schema.apply_content(content_nodes)),
            };

            if (rules.e in this.all_components) {

                let self_mixin = ComponentMixin(app, rules);

                resolved = app.vue.resolveComponent(rules.e);

                if ('mixins' in resolved) {
                    resolved.mixins = [...resolved.mixins, self_mixin];
                } else {
                    resolved.mixins = [self_mixin];
                }

                params = {global_rules: rules, ...rules.a, ...app.schema.apply_methods(rules)};

                Object.keys(rules.c).map((item: any) => {
                    contents[item] = app.vue.withCtx(() => app.schema.apply_content(app.str.to_nodes(rules.c[item])))
                });

            } else {

                resolved = rules.e;

                params = rules.a;
            }

            return app.vue.createVNode(
                resolved, params, contents
            )
        }

        apply_content (content: Array<HTMLElement>) {

            return content.map((element: HTMLElement) => {

                if (element instanceof Text) {

                    return element.wholeText;

                } else {

                    let special = this.app.is_schema_element(element);

                    let content_nodes = Object.assign([], element.childNodes);

                    return special ? app.schema.wrap_component(
                        this.app.schema.rules(element), content_nodes
                    ) : app.vue.h(
                        element.nodeName,
                        app.obj.getElementAttrs(element),
                        app.schema.apply_content(content_nodes)
                    );
                }
            });
        }

        apply_methods (rules: ruleObject) {

            let result: anyObject = {};

            if (rules.e in app.data) {

                let methods = app.data[rules.e];

                methods.map((method_name: string) => {

                    result[method_name] = function (...args: Array<object>) {

                        return app.schema.method_request(rules, method_name, args);
                    };
                });
            }

            if (rules.m.length) {

                rules.m.map((method_name: string) => {

                    if (!(method_name in result)) {

                        result[method_name] = function (...args: Array<object>) {

                            return app.schema.method_request(rules, method_name, args);
                        };
                    }
                });
            }

            return result;
        }

        method_request (rules: ruleObject, method: string, params: Array<object>, request_data: object = {}) {

            let args = {};

            params.map((i: any) => {if (typeof i === 'object') args = {...args, ...i};});

            return new Promise((resolve, reject) => {

                let glob_token: string = null;

                app.request({
                    method: 'POST',
                    body: app.form_data({[btoa(rules.id)]: method, ...args}),
                    headers: {
                        'BFG-TEMPLATE-REQUEST': 'true'
                    }, ...request_data
                }).then((result: any) => {

                    let schema = result.data.$schema || {};
                    schema.errors = {};
                    schema.error_message = null;
                    app.event.fire(rules.id, schema);

                    if (result.data.$respond) {
                        app.call(result.data.$respond);
                    }

                    resolve(result.data.$response || null);

                }).catch((xhr: XMLHttpRequest) => {

                    if (xhr.status === 419) {

                        app.request().then((result: any) => {

                            if (result.token) {

                                this.app.server.token = result.token;

                                resolve(app.schema.method_request(rules, method, params));

                            } else {

                                reject(xhr);
                            }

                        }).catch((xhr: XMLHttpRequest) => reject(xhr));
                    }
                    else {
                        let err = app.json.decode(xhr.responseText);
                        if (err && 'errors' in err) {
                            app.event.fire(rules.id, {errors: err.errors, error_message: err.message});
                        }
                        reject({err, xhr});
                    }
                });
            });
        }

        redirected (data: any, component: HTMLElement) {

            app.obj.each(data.$configs || [], (v: any, n: string) => {

                app.server[n] = v;
            });

            app.obj.each(data.$state || [], (state: any, to: string) => {

                app.event.fire(to, state);
            });

            app.obj.each(app._av, (i: any, name: string) => {
                if (i.__contained) {
                    i.unmount();
                    delete app._av[name];
                }
            });

            component.innerHTML = data.$content;

            if (data.$respond) {

                app.call(data.$respond);
            }

            let elements: any = Object.values(component.childNodes);

            elements.map((element: HTMLElement) => {

                if (element instanceof HTMLElement) {

                    this.app.schema.insert(
                        element,
                        this.app.schema.build(
                            element,
                            this.app.schema.rules(
                                element
                            )
                        )
                    );
                }
            });
        }
    }
};
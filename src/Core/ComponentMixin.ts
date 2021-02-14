import {ApplicationContainer} from "bfg-js";
import {anyObject, ruleObject} from "bfg-schema/src/Core/Schema";

export default (app: ApplicationContainer, rules: ruleObject) => ({

    bind: {},
    singleton: {},
    compute: {},
    provider: null as any,
    share: [] as any,
    with: [] as any,
    save: [] as any,

    props: {
        global_rules: {type: Object}
    },

    data () {

        return {
            app
        };
    },

    beforeUpdate () {
        app._cv[rules.id] = this;
    },

    beforeMount() {

        let obj_name = this.$options.name + (this.$vnode && this.$vnode.key ? '_' + this.$vnode.key : '');

        if (this.global_rules) {

            app._cv[rules.id] = this;
            Object.keys(rules.v).map(key => this[key] = rules.v[key]);
            this.app.event.on(this.global_rules.id, this.__on_component);
        }

        app.obj.each(this.$options.save, (v: string) => {
            let k = `vue-${obj_name}-${v}`;
            if (localStorage.getItem(k)) {
                let a = localStorage.getItem(k);
                let z = app.json.decode(a);
                this[v] = z ? z : a;
            } else {
                localStorage.setItem(k, typeof this[v] === 'object' ? app.json.encode(this[v]) : this[v]);
            }
            this.$watch(v, (val: any) => {
                localStorage.setItem(k, typeof this[v] === 'object' ? app.json.encode(this[v]) : this[v]);
            });
        });

        app.obj.each(this.$options.share, (to: string, from: string|number) => {
            if (app.num.isNumber(from)) from = to;

            app.vue.watch(() => this[from], (val: any) => {
                app.shared_data[to] = val;
            });

            app.vue.watch(() => app.shared_data[to], (val: any) => {
                this[from] = val;
            });

            if (to in app.shared_data) {
                this[from] = app.shared_data[to];
            } else {
                app.shared_data[to] = this[from];
            }
        });

        app.obj.each(this.$options.bind, (bind_name: string, inner_method: string) => {
            if (app.num.isNumber(inner_method)) inner_method = bind_name;
            app.bind(bind_name, this[inner_method]);
        });

        app.obj.each(this.$options.singleton, (bind_name: string, inner_method: string) => {
            if (app.num.isNumber(inner_method)) inner_method = bind_name;
            app.singleton(bind_name, typeof this[inner_method] === 'function' ? this[inner_method] : () => this[inner_method]);
        });

        app.obj.each(this.$options.compute, (bind_name: string, inner_method: string) => {
            if (app.num.isNumber(inner_method)) inner_method = bind_name;
            app.compute(bind_name, typeof this[inner_method] === 'function' ? this[inner_method] : () => this[inner_method]);
        });

        if (typeof this.$options.provider === 'object') {

            //app.provider(this.$options.provider);
        }
    },

    mounted () {
        app._cv[rules.id] = this;
    },

    beforeUnmount () {
        this.app.event.off(this.global_rules.id, this.__on_component);
        app.obj.each(this.$options.bind, (bind_name: string) => {
            app.forget(bind_name);
        });
    },

    methods: {

        __is_contained () {
            return !/^w[0-9]+/.test(
                String(rules.id).split("\\")[1]
            );
        },

        __on_component (variables: anyObject) {
            this.app.obj.each(variables, (val: any, key: string) => {
                if (key === '_pn') {
                    this.app.obj.each(val, (params: Array<any>, callable: any) => {
                        let cal = this.app.obj.get(callable, this);
                        if (typeof cal === 'function') {
                            cal(...(!Array.isArray(params) ? [params] : params));
                        } else {
                            this.app.obj.set(callable, params[0], this);
                        }
                    });
                } else { this[key] = val; }
            });
        }
    }
});
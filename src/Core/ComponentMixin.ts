import {ApplicationContainer} from "bfg-js";
import {ruleObject} from "bfg-schema/src/Core/Schema";

export default (app: ApplicationContainer, rules: ruleObject) => ({

    props: {
        global_rules: {required: true, type: Object}
    },

    data () {

        return {
            app: app,
            ...rules.v
        };
    },

    mounted () {
        app._cv[rules.id] = this;
        this.app.event.on(this.global_rules.id, this.__on_component);
    },

    unmounted () {
        this.app.event.off(this.global_rules.id, this.__on_component);
    },

    methods: {

        __on_component (rules: ruleObject) {
            this.app.obj.each(rules.v, (val: any, key: string) => {
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
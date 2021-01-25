import {ApplicationContainer} from "bfg-js";
import {ruleObject} from "bfg-schema/src/Core/Schema";

export default (app: ApplicationContainer, rules: ruleObject) => ({

    data () {

        return {
            app: app, __contained: false
        };
    },

    beforeMount() {


    },

    mounted () {
        app._av[rules.id] = this;
        if (this.app.server.container) {

            this.__contained = this.$el.closest(`#${this.app.server.container}`)
        }
    },

    unmounted () {

    },

    methods: {

    }
});
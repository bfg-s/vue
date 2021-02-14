import {ApplicationContainer} from "bfg-js";
import {ruleObject} from "bfg-schema/src/Core/Schema";

export default (app: ApplicationContainer, rules: ruleObject) => ({

    data () {

        return {
            app: app
        };
    },

    beforeMount() {


    },

    beforeUpdate () {
        app._av[rules.id] = this;
    },

    mounted () {
        app._av[rules.id] = this;
    },

    unmounted () {

    },

    methods: {


    }
});
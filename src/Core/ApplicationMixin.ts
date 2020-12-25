import {ApplicationContainer} from "bfg-js";
import {ruleObject} from "bfg-schema/src/Core/Schema";

export default (app: ApplicationContainer, rules: ruleObject) => ({

    data () {

        return {
            app: app
        };
    },

    mounted () {
        app._av[rules.id] = this;
    },

    unmounted () {

    },

    methods: {
        alert_root (data: string) {
            alert(data);
        }
    }
});
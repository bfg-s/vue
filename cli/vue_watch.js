module.exports = class TestCommand extends Command {

    get signature () {

        this.namespace = "app";

        this.path = "resources/js/components";

        this.output = this.path + ".js";

        this.require_path = "./components";

        return "vue:watch " +
            `{-n|--namespace=? The templates namespace in Blade area [default: "${this.namespace}"]} ` +
            `{-p|--path=? The vue components path [default: "${this.path}"]} ` +
            `{-o|--output=? The output includes Vue component [default: "${this.output}"]} ` +
            `{-r|--require_path=? The required path for Vue component [default: "${this.require_path}"]} ` +
            "Run a Bfg watcher";
    }

    handle () {

        if (process.env.NODE_ENV !== 'production') {
            // app.watch.on_change(`${this.path}/**/*.vue`, this.build_json.bind(this));
            app.watch.on_add(`${this.path}/**/*.vue`, this.build_json.bind(this));
            app.watch.on_unlink(`${this.path}/**/*.vue`, this.build_json.bind(this));
            app.watch.on_unlink_dir(`${this.path}/**/*.vue`, this.build_json.bind(this));
            app.cmd.call('watch');
        }

        this.build_json();

        return 0;
    }

    build_json (path, event) {

        let files = app.fs.read_all_dir(app.fs.base_path(this.path)).map((path) => {
            return path.replace(app.fs.base_path(), '');
        });

        let js = `module.exports = {\n`;
        js += `    register(){\n`;

        let components = files.map((path) => {
            let p = path.replace("/" + this.path + "/", "").replace('.vue', '');
            let component = this.namespace + "::" + p.replace(/\//g, '.').split('.')
                .map((i) => app.str.camel(i)).join('.');

            js += `        this.app.components.register("${component}", require("${this.require_path}/${p}").default);\n`;

            return component;
        });

        js += `    }\n`
        js += `};`

        app.fs.put_contents(
            app.fs.base_path(this.output), js
        );
    }
}
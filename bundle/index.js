!function(t,e){for(var n in e)t[n]=e[n];e.__esModule&&Object.defineProperty(t,"__esModule",{value:!0})}(exports,(()=>{"use strict";var t={576:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){return{data:function(){return{app:t}},mounted:function(){t._av[e.id]=this},unmounted:function(){},methods:{}}}},58:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){return{bind:{},share:[],save:[],props:{global_rules:{required:!0,type:Object}},data:function(){return{app:t}},beforeMount:function(){var n=this,o=this.$options.name+(this.$vnode&&this.$vnode.key?"_"+this.$vnode.key:"");t._cv[e.id]=this,Object.keys(e.v).map((function(t){return n[t]=e.v[t]})),this.app.event.on(this.global_rules.id,this.__on_component),t.obj.each(this.$options.save,(function(e){var r="vue-"+o+"-"+e;if(localStorage.getItem(r)){var a=localStorage.getItem(r),i=t.json.decode(a);n[e]=i||a}else localStorage.setItem(r,"object"==typeof n[e]?t.json.encode(n[e]):n[e]);n.$watch(e,(function(o){localStorage.setItem(r,"object"==typeof n[e]?t.json.encode(n[e]):n[e])}))})),t.obj.each(this.$options.share,(function(e,o){t.num.isNumber(o)&&(o=e),t.vue.watch((function(){return n[o]}),(function(n){t.shared_data[e]=n})),t.vue.watch((function(){return t.shared_data[e]}),(function(t){n[o]=t})),e in t.shared_data?n[o]=t.shared_data[e]:t.shared_data[e]=n[o]})),t.obj.each(this.$options.bind,(function(e,o){t.num.isNumber(o)&&(o=e),t.bind(e,n[o])}))},mounted:function(){},unmounted:function(){this.app.event.off(this.global_rules.id,this.__on_component),t.obj.each(this.$options.bind,(function(e){t.forget(e)}))},methods:{__on_component:function(t){var e=this;this.app.obj.each(t,(function(t,n){"_pn"===n?e.app.obj.each(t,(function(t,n){var o=e.app.obj.get(n,e);"function"==typeof o?o.apply(void 0,Array.isArray(t)?t:[t]):e.app.obj.set(n,t[0],e)})):e[n]=t}))}}}}},171:function(t,e,n){var o,r=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),a=this&&this.__assign||function(){return(a=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)},i=this&&this.__spreadArrays||function(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var o=Array(t),r=0;for(e=0;e<n;e++)for(var a=arguments[e],i=0,s=a.length;i<s;i++,r++)o[r]=a[i];return o},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var u=s(n(58)),c=s(n(576));e.default=function(t){return function(e){function n(){var t=null!==e&&e.apply(this,arguments)||this;return t.vue_app=null,t.all_components={},t}return r(n,e),n.prototype.build=function(e,n){var o=Object.assign([],e.childNodes);return this.all_components=t.components.all(),this.vue_app=t.vue.createApp({mixins:[c.default(t,n)],components:this.all_components,render:function(){return t.schema.wrap_component(n,o)}}),this.vue_app.mount(e,!0).$el},n.prototype.wrap_component=function(e,n){var o,r,s={default:t.vue.withCtx((function(){return t.schema.apply_content(n)}))};if(e.e in this.all_components){var c=u.default(t,e);(o=t.vue.resolveComponent(e.e)).mixins="mixins"in o?i(o.mixins,[c]):[c],r=a(a({global_rules:e},e.a),t.schema.apply_methods(e)),Object.keys(e.c).map((function(n){s[n]=t.vue.withCtx((function(){return t.schema.apply_content(t.str.to_nodes(e.c[n]))}))}))}else o=e.e,r=e.a;return t.vue.createVNode(o,r,s)},n.prototype.apply_content=function(e){var n=this;return e.map((function(e){if(e instanceof Text)return e.wholeText;var o=n.app.is_schema_element(e),r=Object.assign([],e.childNodes);return o?t.schema.wrap_component(n.app.schema.rules(e),r):t.vue.h(e.nodeName,t.obj.getElementAttrs(e),t.schema.apply_content(r))}))},n.prototype.apply_methods=function(e){var n={};return e.e in t.data&&t.data[e.e].map((function(o){n[o]=function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];return t.schema.method_request(e,o,n)}})),e.m.length&&e.m.map((function(o){o in n||(n[o]=function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];return t.schema.method_request(e,o,n)})})),n},n.prototype.method_request=function(e,n,o,r){var i=this;void 0===r&&(r={});var s={};return o.map((function(t){"object"==typeof t&&(s=a(a({},s),t))})),new Promise((function(u,c){var p;t.request(a({method:"POST",body:t.form_data(a((p={},p[btoa(e.id)]=n,p.bfg=!0,p),s))},r)).then((function(n){var o=n.data.$schema||{};o.errors={},o.error_message=null,t.event.fire(e.id,o),n.data.$respond&&t.call(n.data.$respond),u(n.data.$response||null)})).catch((function(r){if(419===r.status)t.request().then((function(a){a.token?(i.app.server.token=a.token,u(t.schema.method_request(e,n,o))):c(r)})).catch((function(t){return c(t)}));else{var a=t.json.decode(r.responseText);a&&"errors"in a&&t.event.fire(e.id,{errors:a.errors,error_message:a.message}),c({err:a,xhr:r})}}))}))},n}(t.schema_class)}},607:function(t,e,n){var o,r=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=a(n(171)),s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.name="vue",e.require=["commander","schema"],e}return r(e,t),e.prototype.register=function(){this.app.bind("schema_class",i.default(this.app)),this.app.bind("shared_data",this.app.vue.reactive({})),this.app.bind("_cv",{}),this.app.bind("_av",{})},e}((function(t){this.app=t}));e.default=s}},e={};return function n(o){if(e[o])return e[o].exports;var r=e[o]={exports:{}};return t[o].call(r.exports,r,r.exports,n),r.exports}(607)})());
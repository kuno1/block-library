!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=56)}({56:function(t,e,r){t.exports=r(57)},57:function(t,e){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function n(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function i(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=a(t);if(e){var o=a(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return u(this,r)}}function u(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}
/*!
 * wpdeps=wp-api-fetch, wp-element, kbl, wp-components
 */var c=wp.element,l=wp.i18n.__,s=wp.components.Spinner,f=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");Object.defineProperty(t,"prototype",{value:Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),writable:!1}),e&&o(t,e)}(f,t);var e,r,u,a=i(f);function f(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,f),(e=a.call(this,t)).state={loading:!0,src:"",alt:""},e}return e=f,(r=[{key:"className",value:function(t){var e=["kbl-image"];return this.state.loading&&e.push("kbl-image-loading"),t&&e.push(t),e.join(" ")}},{key:"extract",value:function(t){var e=t.source_url;return this.props.size&&t.media_details.sizes[this.props.size]&&(e=t.media_details[this.props.size].source_url),e}},{key:"fetch",value:function(){var t=this;this.setState({loading:!0,src:"",alt:""},(function(){wp.apiFetch({path:"wp/v2/media/"+t.props.id}).then((function(e){var r=e.title.rendered;e.alt_text&&(r=e.alt_text),t.setState({alt:r,src:t.extract(e)})})).catch((function(e){console.log("error: %o",e),t.setState({src:"",alt:""}),t.props.errorHandler&&t.props.errorHandler(l("Failed to fetch image.","kbl"))})).finally((function(){t.setState({loading:!1})}))}))}},{key:"componentDidMount",value:function(){this.fetch()}},{key:"render",value:function(){if(!this.props.id)return null;var t=this.state,e=t.src,r=t.loading,n=t.alt;return e&&!r?c.createElement("img",{className:this.className(this.props.extraClasses),src:e,alt:n}):c.createElement("div",{className:this.className(this.props.extraClasses)},c.createElement(s,null))}}])&&n(e.prototype,r),u&&n(e,u),Object.defineProperty(e,"prototype",{writable:!1}),f}(c.Component);kbl.MediaWithId=f}});
//# sourceMappingURL=media.js.map
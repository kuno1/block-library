!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=42)}({42:function(t,e,n){t.exports=n(43)},43:function(t,e){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function o(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function i(t){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function a(t,e){return(a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}
/*!
 * wpdeps=wp-api-fetch, wp-element, kbl, wp-components
 */var u=wp.element,l=wp.i18n.__,c=wp.components,s=(c.TextControl,c.Button,c.Spinner),f=function(t){function e(t){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=o(this,i(e).call(this,t))).state={loading:!0,src:"",alt:""},n}var n,c,f;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&a(t,e)}(e,t),n=e,(c=[{key:"className",value:function(t){var e=["kbl-image"];return this.state.loading&&e.push("kbl-image-loading"),t&&e.push(t),e.join(" ")}},{key:"extract",value:function(t){var e=t.source_url;return this.props.size&&t.media_details.sizes[this.props.size]&&(e=t.media_details[this.props.size].source_url),e}},{key:"fetch",value:function(){var t=this;this.setState({loading:!0,src:"",alt:""},(function(){wp.apiFetch({path:"wp/v2/media/"+t.props.id}).then((function(e){var n=e.title.rendered;e.alt_text&&(n=e.alt_text),t.setState({alt:n,src:t.extract(e)})})).catch((function(e){console.log("error"),t.setState({src:"",alt:""}),t.props.errorHandler&&t.props.errorHandler(l("Failed to fetch image.","kbl"))})).finally((function(){t.setState({loading:!1})}))}))}},{key:"componentDidMount",value:function(){this.fetch()}},{key:"render",value:function(){if(!this.props.id)return null;var t=this.state,e=t.src,n=t.loading,r=t.alt;return e&&!n?u.createElement("img",{className:this.className(this.props.extraClasses),src:e,alt:r}):u.createElement("div",{className:this.className(this.props.extraClasses)},u.createElement(s,null))}}])&&r(n.prototype,c),f&&r(n,f),e}(u.Component);kbl.MediaWithId=f}});
//# sourceMappingURL=media.js.map
!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=6)}({6:function(t,e,n){t.exports=n(7)},7:function(t,e){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}
/*!
 * User selector
 * wpdeps=kbl-components-object-selector
 */var a=wp.i18n,l=a.__,f=a.sprintf,s=kbl.ObjectSelector,p=wp.components.Button,b=function(t){function e(){return r(this,e),i(this,u(e).apply(this,arguments))}var n,a,s;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(e,t),n=e,(a=[{key:"fetch",value:function(t){var e=this;this.setState({loading:!0},(function(){wp.apiFetch({path:f("kbl/v1/search/%s?id=%d",e.postType(),t)}).then((function(t){if(!t.length)throw new Error("Post not found.");e.setState({object:t[0]})})).catch((function(t){e.handleChange(0)})).finally((function(){e.setState({loading:!1})}))}))}},{key:"search",value:function(){var t=this;this.setState({searching:!0},(function(){wp.apiFetch({path:f("kbl/v1/search/%s?s=%s",t.postType(),t.state.term)}).then((function(e){t.setState({founds:e}),e.length||t.notice(l("Post not found.","kbl"),"error")})).catch((function(e){t.notice(e.message,"error")})).finally((function(){t.setState({searching:!1})}))}))}},{key:"postType",value:function(){return this.props.postType||"post"}},{key:"renderObject",value:function(t){var e=this,n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return React.createElement("div",{ref:t.id,className:"kbl-user"},React.createElement("img",{src:t.thumbnail,className:"kbl-user-avatar"}),React.createElement("span",{className:"kbl-user-name"},t.title),n?React.createElement(p,{isLink:!0,onClick:function(){return e.setCurrent(t)}},l("Choose","kbl")):React.createElement(p,{isLink:!0,onClick:function(){return e.setCurrent(null)}},l("Remove","kbl")))}}])&&o(n.prototype,a),s&&o(n,s),e}(s);window.kbl.PostSelector=b}});
//# sourceMappingURL=post-selector.js.map
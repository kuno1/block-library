!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=14)}({14:function(e,t,n){e.exports=n(15)},15:function(e,t){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(e,t){return!t||"object"!==n(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}
/*!
 * User selector
 * wpdeps=kbl-components-object-selector
 */var a=wp.i18n.__,l=kbl.ObjectSelector,f=wp.components.Button,s=function(e){function t(){return r(this,t),c(this,i(t).apply(this,arguments))}var n,l,s;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}(t,e),n=t,(l=[{key:"fetch",value:function(e){var t=this;this.setState({loading:!0},(function(){wp.apiFetch({path:"kbl/v1/users/search?id=".concat(e)}).then((function(e){if(!e.length)throw new Error("User not found.");t.setState({object:e[0]})})).catch((function(e){t.handleChange(0)})).finally((function(){t.setState({loading:!1})}))}))}},{key:"search",value:function(){var e=this;this.setState({searching:!0},(function(){wp.apiFetch({path:"kbl/v1/users/search?s=".concat(e.state.term)}).then((function(t){e.setState({founds:t}),t.length||e.notice(a("No user found.","kbl"),"error")})).catch((function(t){e.notice(t.message,"error")})).finally((function(){e.setState({searching:!1})}))}))}},{key:"renderObject",value:function(e){var t=this,n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return React.createElement("div",{ref:e.id,className:"kbl-user"},React.createElement("img",{src:e.avatar,className:"kbl-user-avatar"}),React.createElement("span",{className:"kbl-user-name"},e.display_name),n?React.createElement(f,{isLink:!0,onClick:function(){return t.setCurrent(e)}},a("Choose","kbl")):React.createElement(f,{isLink:!0,onClick:function(){return t.setCurrent(null)}},a("Remove","kbl")))}}])&&o(n.prototype,l),s&&o(n,s),t}(l);window.kbl.UserSelector=s}});
//# sourceMappingURL=user-selector.js.map
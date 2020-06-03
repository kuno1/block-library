!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=58)}({58:function(t,e,n){t.exports=n(59)},59:function(t,e){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function o(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}
/*!
 * Search post with incremental search
 * wpdeps=kbl-components-incremental-search, wp-api-fetch, wp-hooks
 */var a=wp.element,c=wp.i18n.__,s=kbl.IncrementalSearch,l=wp.components.Snackbar,f=(wp.hooks.applyFilters,function(t){function e(t){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=o(this,u(e).call(this,t))).state={searching:!1,suggestions:[],total:0,errorMsg:""},n}var n,f,p;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(e,t),n=e,(f=[{key:"render",value:function(){var t=this,e=this.state,n=e.suggestions,r=e.total,o=e.searching,u=e.errorMsg,i=this.props.label||c("Post Selector","kbl");return a.createElement(a.Fragment,null,a.createElement(s,{suggestions:n,total:r,searching:o,label:i,onSelect:function(e){t.props.onSelect&&t.props.onSelect(e)},onSearch:function(e){t.search(e)},onClear:function(){t.setState({total:0,suggestions:[],searching:!1})}}),u&&a.createElement(l,null,u))}},{key:"search",value:function(t){var e=this;this.setState({searching:!0},(function(){wp.apiFetch({path:"kbl/v1/search/public/?s="+encodeURIComponent(t),parse:!1}).then((function(t){return e.setState({total:parseInt(t.headers.get("x-wp-total"),10)}),t.json()})).then((function(t){e.setState({suggestions:t})})).catch((function(){e.setState({total:0,errorMsg:c("Failed to search posts. Please try again later.","ku-mag")},(function(){setTimeout((function(){e.setState({errorMsg:""})}),3e3)}))})).finally((function(){e.setState({searching:!1})}))}))}}])&&r(n.prototype,f),p&&r(n,p),e}(a.Component));kbl.PostSearcher=f}});
//# sourceMappingURL=post-searcher.js.map
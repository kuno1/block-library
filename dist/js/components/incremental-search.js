!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=46)}({46:function(e,t,n){e.exports=n(47)},47:function(e,t){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,t){return!t||"object"!==n(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function a(e,t){return(a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}
/*!
 * Incremental search control.
 *
 * wpdeps=wp-element, wp-components, kbl
 */var l=wp.element,c=wp.components.TextControl,u=wp.i18n.__,s=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=o(this,i(t).call(this,e))).state={focus:!1,term:"",timer:null,clearTimer:null},n}var n,s,f;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&a(e,t)}(t,e),n=t,(s=[{key:"getDelay",value:function(){return this.props.delay||500}},{key:"render",value:function(){var e=this,t=this.props,n=t.searching,r=t.onSelect,o=t.suggestions,i=t.total,a=(t.focus,!(!o||!o.length));return l.createElement("div",{className:"kbl-incremental-search"},l.createElement(c,{value:this.state.term,placeholder:u("Type and search...","kbl"),label:this.props.label||"",onChange:function(t){e.setState({term:t},(function(){e.enqueueSearch()}))},onFocus:function(){e.state.term.length&&e.enqueueSearch()},onBlur:function(){e.clearCountDown()}}),n&&l.createElement("div",{className:"kbl-incremental-search-result"},l.createElement("div",{className:"kbl-incremental-search-summary"}," ",u("Searching...","kbl"))),a&&l.createElement("div",{className:"kbl-incremental-search-result"},i&&l.createElement("div",{className:"kbl-incremental-search-summary"}," ",o.length," / ",i),l.createElement("ul",{className:"kbl-incremental-search-list"},o.map((function(e){return l.createElement("li",{key:"kbl-incremental-search-suggestion-".concat(e.id),className:"kbl-incremental-search-item",onClick:function(){r&&r(e.id)}},e.title)})))))}},{key:"enqueueSearch",value:function(){var e=this;this.state.timer&&clearTimeout(this.state.timer),this.setState({timer:setTimeout((function(){e.fetch()}),this.getDelay())})}},{key:"fetch",value:function(){this.state.term.length?this.props.onSearch&&this.props.onSearch(this.state.term):this.flush()}},{key:"flush",value:function(){this.props.onClear&&this.props.onClear()}},{key:"clearCountDown",value:function(){var e=this,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.state.clearTimer&&clearTimeout(this.state.clearTimer),t?this.setState({clearTimer:setTimeout((function(){e.flush()}),3e3)}):this.setState({clearTimer:null})}}])&&r(n.prototype,s),f&&r(n,f),t}(l.Component);kbl.IncrementalSearch=s}});
//# sourceMappingURL=incremental-search.js.map
!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=40)}({40:function(e,t,n){e.exports=n(41)},41:function(e,t){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,t){return!t||"object"!==n(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}
/*!
 * wpdeps=wp-element, wp-components, kbl
 */var c=wp.element,a=wp.components.CheckboxControl,f=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=o(this,u(t).call(this,e))).state={checked:e.checked},n}var n,f,l;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(t,e),n=t,(f=[{key:"render",value:function(){var e=this;return this.props.options.map((function(t){return c.createElement(a,{key:t.value,label:t.label,checked:e.isChecked(t.value),onChange:function(n){return e.onChangeHandler(t.value,n)}})}))}},{key:"isChecked",value:function(e){return-1<this.state.checked.indexOf(e)}},{key:"onChangeHandler",value:function(e,t){var n=this;if(t){var r=this.state.checked.map((function(e){return e}));0>r.indexOf(e)&&r.push(e),this.setState({checked:r},(function(){n.props.onChange(r)}))}else{var o=[],u=!0,i=!1,c=void 0;try{for(var a,f=this.state.checked[Symbol.iterator]();!(u=(a=f.next()).done);u=!0){var l=a.value;e!==l&&o.push(l)}}catch(e){i=!0,c=e}finally{try{u||null==f.return||f.return()}finally{if(i)throw c}}this.setState({checked:o},(function(){n.props.onChange(o)}))}}}])&&r(n.prototype,f),l&&r(n,l),t}(c.Component);kbl.CheckboxGroup=f}});
//# sourceMappingURL=checkbox-group.js.map
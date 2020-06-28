!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=58)}({58:function(e,t,n){e.exports=n(59)},59:function(e,t){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function r(e,t){return!t||"object"!==n(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}
/*!
 * Object Placeholder
 * wpdeps=wp-api-fetch,wp-element,kbl,wp-components,wp-data, moment
 */var u=wp.element,a=wp.i18n.__,l={},s=wp.components,f=s.Button,p=s.ButtonGroup,h=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=r(this,i(t).call(this,e))).state={data:n.placeHolder(),loading:!1},n}var n,s,h;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&c(e,t)}(t,e),n=t,(s=[{key:"componentDidMount",value:function(){this.fetch()}},{key:"fetch",value:function(){var e=this;if(this.hasCache())return this.getCache();this.setState({loading:!0},(function(){e.apiFetch().then((function(t){return e.handleSuccess(t)})).catch((function(){e.props.errorHandler instanceof Function&&e.props.errorHandler(e.props.id)})).finally((function(){e.setState({loading:!1})}))}))}},{key:"apiFetch",value:function(){console&&console.error("You must override this method to returns wp-api-fetch object.")}},{key:"handleSuccess",value:function(e){var t=this;this.setState({data:e},(function(){t.setCache(e)}))}},{key:"render",value:function(){var e=this,t=["kbl-placeholder"];return this.state.loading&&t.push("loading"),u.createElement("div",{className:t.join(" ")},u.createElement("div",{className:"kbl-placeholder-body"},this.renderObject()),this.props.actions&&u.createElement("div",{style:{textAlign:"right"}},u.createElement(p,{className:"kbl-placeholder-actions"},this.props.actions.map((function(t,n){return u.createElement(f,{key:"action-".concat(n),iconSize:16,isSmall:!0,label:t.label,icon:t.icon||"plus",onClick:function(){t.handler(e.props.id)}})})))))}},{key:"renderObject",value:function(){return u.createElement("p",{className:"description"},"Please override this methods.")}},{key:"hasCache",value:function(){return!!l[this.constructor.name]&&!!l[this.constructor.name][this.props.id]}},{key:"getCache",value:function(){return this.hasCache()?l[this.constructor.name][this.props.id]:null}},{key:"setCache",value:function(e){l[this.constructor.name]||(l[this.constructor.name]=[]),l[this.constructor.name][this.props.id]=e}},{key:"placeHolder",value:function(){return{title:a("Title","kbl"),img:null}}}])&&o(n.prototype,s),h&&o(n,h),t}(u.Component);window.kbl.ObjectPlaceholder=h}});
//# sourceMappingURL=placeholder.js.map
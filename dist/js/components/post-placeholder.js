!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=62)}({62:function(e,t,r){e.exports=r(63)},63:function(e,t){function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function c(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=u(e);if(t){var o=u(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return a(this,r)}}function a(e,t){if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}
/*!
 * Post placeholder
 * wpdeps=kbl-components-placeholder
 */var i=wp.element,f=wp.i18n.__,p=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");Object.defineProperty(e,"prototype",{value:Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),writable:!1}),t&&l(e,t)}(p,e);var t,r,a,u=c(p);function p(){return n(this,p),u.apply(this,arguments)}return t=p,(r=[{key:"renderObject",value:function(){var e=this.state.data;return i.createElement(i.Fragment,null,e.img&&i.createElement("img",{className:"kbl-placeholder-img",src:e.img,alt:""}),i.createElement("div",{className:"kbl-placeholder-content"},i.createElement("div",{className:"kbl-placeholder-title"},i.createElement("strong",null,e.type)," ",e.title),i.createElement("div",{className:"kbl-placeholder-meta"},i.createElement("span",{className:"kbl-placeholder-value"}," ",f("Post ID","kbl"),": ",i.createElement("strong",null,e.id)),i.createElement("span",{className:"kbl-placeholder-value"}," ",f("Date","kbl"),": ",i.createElement("strong",null,e.date)))))}},{key:"apiFetch",value:function(){return wp.apiFetch({path:"kbl/v1/search/any?id=".concat(this.props.id)})}},{key:"handleSuccess",value:function(e){var t=e[0];return this.setState({data:{id:t.id,title:t.title,img:t.thumbnail,date:t.date_formatted,type:t.type_formatted}})}},{key:"placeHolder",value:function(){return{id:0,title:f("Post Title","kbl"),img:null,date:"---",type:"---"}}}])&&o(t.prototype,r),a&&o(t,a),Object.defineProperty(t,"prototype",{writable:!1}),p}(kbl.ObjectPlaceholder);window.kbl.PostPlaceholder=p}});
//# sourceMappingURL=post-placeholder.js.map
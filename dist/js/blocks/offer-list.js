!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=18)}({18:function(e,t,n){e.exports=n(19)},19:function(e,t){
/*!
 * Offer list
 *
 * wpdeps=wp-blocks, kbl, wp-block-editor, kbl-offer
 */
var n=wp.blocks.registerBlockType,r=wp.i18n,o=r.__,i=(r.sprintf,wp.blockEditor.InnerBlocks),c=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=["kbl-offer-list"];return t&&n.push(t),n.join(" ")};n("kunoichi/offer-list",{title:o("Offer List","kbl"),icon:"cart",description:o("Display offer list of products with price, links, and spec.","kbl"),category:"formatting",edit:function(e){e.attributes;var t=e.className;return React.createElement(React.Fragment,null,React.createElement("div",{className:c(t)},React.createElement(i,{allowedBlocks:["kunoichi/offer"],templateLock:!1,template:[["kunoichi/offer"]]})))},save:function(){return React.createElement("ul",{className:c({})},React.createElement(i.Content,null))}})}});
//# sourceMappingURL=offer-list.js.map
!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=20)}({20:function(e,t,r){e.exports=r(21)},21:function(e,t){
/*!
 * Offer product.
 *
 * wpdeps=wp-blocks, wp-block-editor, kbl, wp-components, kbl-definition-list
 */
var r=wp.blocks.registerBlockType,n=wp.i18n.__,o=wp.blockEditor,a=o.InnerBlocks,l=o.InspectorControls,c=wp.components,i=c.PanelBody,f=c.ToggleControl,u=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"kbl-offer",n=[r];return t&&n.push(t),e.featured&&n.push("kbl-offer-featured"),n.join(" ")};r("kunoichi/offer-content",{title:n("Offer Content","kbl"),icon:"cart",category:"common",description:n("Title, price, and specs of an offer.","kbl"),parent:["kunoichi/offer"],edit:function(e){var t=e.attributes,r=e.className;return React.createElement("div",{className:u(t,r,"kbl-offer-body")},React.createElement(a,{templateLock:"all",template:[["core/heading",{className:"kbl-offer-title",placeholder:n("Product Title","kbl")}],["core/paragraph",{placeholder:n("e.g. $19.99","kbl"),className:"kbl-offer-price"}],["kunoichi/definition-list",{className:"kbl-offer-spec"},[["kunoichi/dt",{}],["kunoichi/dd",{}]]]]}))},save:function(e){var t=e.attributes;return React.createElement("div",{className:u(t,"","kbl-offer-body")},React.createElement(a.Content,null))}}),r("kunoichi/offer-action",{title:n("Offer Action","kbl"),icon:"cart",category:"common",description:n("Action link for offer block.","kbl"),parent:["kunoichi/offer"],edit:function(e){var t=e.attributes,r=e.className;return React.createElement("footer",{className:u(t,r,"kbl-offer-action")},React.createElement(a,{templateLock:"all",template:[["core/button",{className:"kbl-offer-actions",placeholder:n("Product Title","kbl"),align:"center"}]]}))},save:function(e){var t=e.attributes;return React.createElement("footer",{className:u(t,"","kbl-offer-action")},React.createElement(a.Content,null))}}),r("kunoichi/offer",{title:n("Offer","kbl"),icon:"cart",category:"common",description:n("Product offer with price, link, and spec. Helpful for promoting external products.","kbl"),parent:["kunoichi/offer-list"],supports:{align:["right","left"]},attributes:{featured:{type:"boolean",default:!1},align:{type:"string",default:"left"}},edit:function(e){var t=e.attributes,r=e.className,o=e.setAttributes;return React.createElement(React.Fragment,null,React.createElement(l,null,React.createElement(i,{initialOpen:!0,title:n("Offer Option","kbl")},React.createElement(f,{label:n("Featured","kbl"),onChange:function(e){return o({featured:e})}}))),React.createElement("div",{className:u(t,r)},React.createElement(a,{template:[["core/image",{className:"kbl-offer-image"}],["kunoichi/offer-content"],["kunoichi/offer-action"]],templateLock:"all"}),!!t.image&&React.createElement("img",{src:t.image,alt:t.title,className:"kbl-offer-image"})))},save:function(e){var t=e.attributes;return React.createElement("div",{className:u(t)},React.createElement(a.Content,null))}})}});
//# sourceMappingURL=offer.js.map
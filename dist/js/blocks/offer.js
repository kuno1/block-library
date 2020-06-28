!function(e){var t={};function r(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=20)}({20:function(e,t,r){e.exports=r(21)},21:function(e,t){
/*!
 * Offer product.
 *
 * wpdeps=wp-blocks, wp-block-editor, kbl, wp-components, kbl-definition-list
 */
var r=wp.blocks.registerBlockType,a=wp.i18n.__,n=wp.blockEditor,l=n.InnerBlocks,o=n.InspectorControls,c=wp.components,i=c.PanelBody,f=c.ToggleControl,u=c.TextControl,s=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"kbl-offer",a=[r];return t&&a.push(t),e.featured&&a.push("kbl-offer-featured"),a.join(" ")};r("kunoichi/offer-content",{title:a("Offer Content","kbl"),icon:"cart",category:"common",description:a("Title, price, and specs of an offer.","kbl"),parent:["kunoichi/offer"],edit:function(e){var t=e.attributes,r=e.className;return React.createElement("div",{className:s(t,r,"kbl-offer-body")},React.createElement(l,{templateLock:"all",template:[["core/heading",{className:"kbl-offer-title",placeholder:a("Product Title","kbl")}],["core/paragraph",{placeholder:a("e.g. $19.99","kbl"),className:"kbl-offer-price"}],["kunoichi/definition-list",{className:"kbl-offer-spec"},[["kunoichi/dt",{}],["kunoichi/dd",{}]]]]}))},save:function(e){var t=e.attributes;return React.createElement("div",{className:s(t,"","kbl-offer-body")},React.createElement(l.Content,null))}}),r("kunoichi/offer-action",{title:a("Offer Action","kbl"),icon:"cart",category:"common",description:a("Action link for offer block.","kbl"),parent:["kunoichi/offer"],edit:function(e){var t=e.attributes,r=e.className;return React.createElement("footer",{className:s(t,r,"kbl-offer-action")},React.createElement(l,{templateLock:"all",template:[["core/button",{className:"kbl-offer-actions",placeholder:a("Product Title","kbl"),align:"center"}]]}))},save:function(e){var t=e.attributes;return React.createElement("footer",{className:s(t,"","kbl-offer-action")},React.createElement(l.Content,null))}}),r("kunoichi/offer",{title:a("Offer","kbl"),icon:"cart",category:"common",description:a("Product offer with price, link, and spec. Helpful for promoting external products.","kbl"),parent:["kunoichi/offer-list"],supports:{align:["right","left"]},attributes:{featured:{type:"boolean",default:!1},label:{type:"string",default:""},align:{type:"string",default:"left"}},edit:function(e){var t=e.attributes,r=e.className,n=e.setAttributes;return React.createElement(React.Fragment,null,React.createElement(o,null,React.createElement(i,{initialOpen:!0,title:a("Offer Option","kbl")},React.createElement(f,{label:a("Featured","kbl"),onChange:function(e){return n({featured:e})}}),React.createElement(u,{label:a("Featured Label","kbl"),onChange:function(e){return n({label:e})}}))),React.createElement("div",{className:s(t,r)},t.featured&&React.createElement("span",{className:"kbl-offer-featured-label"},t.label||a("Featured","kbl")),React.createElement(l,{template:[["core/image",{className:"kbl-offer-image"}],["kunoichi/offer-content"],["kunoichi/offer-action"]],templateLock:"all"}),!!t.image&&React.createElement("img",{src:t.image,alt:t.title,className:"kbl-offer-image"})))},save:function(e){var t=e.attributes;return React.createElement("div",{className:s(t)},t.featured&&React.createElement("span",{className:"kbl-offer-featured-label"},t.label||a("Featured","kbl")),React.createElement(l.Content,null))}})}});
//# sourceMappingURL=offer.js.map
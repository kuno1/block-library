!function(e){var t={};function n(r){if(t[r])return t[r].exports;var l=t[r]={i:r,l:!1,exports:{}};return e[r].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(r,l,function(t){return e[t]}.bind(null,l));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}({8:function(e,t,n){e.exports=n(9)},9:function(e,t){
/*!
 * wpdeps=wp-blocks,kbl,wp-editor, wp-components, wp-api-fetch
 */
var n=wp.blocks.registerBlockType,r=wp.i18n.__,l=wp.editor,o=(l.RichText,l.InspectorControls),a=wp.components,i=(a.Button,a.PanelBody),u=a.SelectControl,c=a.TextControl,s=a.ServerSideRender;n("kunoichi/testimonials",{title:r("Testimonials","kbl"),icon:"awards",category:"embed",description:r("Display testimonials list.","kbl"),attributes:{ids:{type:"string",default:""},order:{type:"string",default:"latest"},number:{type:"integer",default:5}},edit:function(e){var t=e.attributes,n=e.setAttributes,l=e.className,a=[{label:r("Latest","kbl"),value:"latest"},{label:r("Menu Order","kbl"),value:"menu_order"},{label:r("Random","kbl"),value:"random"}];return l+=" kbl-testimonials",React.createElement(React.Fragment,null,React.createElement(o,null,React.createElement(i,{title:r("Testimonials Setting","kbl"),initialOpen:!0},React.createElement(c,{label:r("Post IDs","kbl"),value:t.ids,onChange:function(e){return n({ids:e})},help:r("Write in CSV format. If set, order and number will be ignored.","kbl"),placeholder:"e.g. 1, 3, 5"}),React.createElement(u,{value:t.order,label:r("Order","kbl"),options:a,onChange:function(e){return n({order:e})}}),React.createElement(c,{label:r("Number to display","kbl"),value:t.number,type:"number",min:1,onChange:function(e){return n({number:parseInt(e,10)})}}))),React.createElement("div",{className:l},React.createElement(s,{block:"kunoichi/testimonials",attributes:t})))},save:function(){return null}})}});
//# sourceMappingURL=testimonials.js.map
!function(e){var t={};function n(l){if(t[l])return t[l].exports;var a=t[l]={i:l,l:!1,exports:{}};return e[l].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,l){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(n.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(l,a,function(t){return e[t]}.bind(null,a));return l},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=10)}({10:function(e,t,n){e.exports=n(11)},11:function(e,t){
/*!
 * Clipboard blocks.
 *
 * wpdeps=wp-blocks, kbl, wp-block-editor, wp-components
 */
var n=wp.blocks.registerBlockType,l=wp.i18n,a=l.__,r=l.sprintf,c=wp.blockEditor,o=c.InspectorControls,i=c.AlignmentToolbar,b=c.RichText,s=wp.components.PanelBody;n("kunoichi/clipboard",{title:a("Clipboard","kbl"),icon:"clipboard",category:"embed",description:a("Clipboard button for copying text.","kbl"),attributes:{alignment:{type:"string",default:"none"},label:{type:"string",source:"html",selector:".kbl-clipboard-label"},content:{type:"string",source:"html",selector:".kbl-clipboard-content"}},edit:function(e){var t=e.attributes,n=e.setAttributes,l=e.className;return l+=r(" kbl-clipboard text-%1$s has-text-align-%1$s",t.alignment),React.createElement(React.Fragment,null,React.createElement(o,null,React.createElement(s,{title:a("Setting","kbl")},React.createElement("p",null,a("Alignment","clinics")),React.createElement(i,{value:t.alignment,onChange:function(e){return n({alignment:e})}}))),React.createElement("div",{className:l},React.createElement("div",{className:"kbl-clipboard-button"},React.createElement("span",{className:"kbl-clipboard-icon"}),React.createElement(b,{value:t.label,className:"kbl-clipboard-label",tagName:"div",onChange:function(e){return n({label:e})},placeholder:a("e.g. Click to Copy","kbl")})),React.createElement(b,{value:t.content,tagName:"div",className:"kbl-clipboard-content",onChange:function(e){return n({content:e})},placeholder:a("Enter text to copy.","kbl")})))},save:function(e){var t=e.attributes,n=e.className;return n+=r(" kbl-clipboard text-%1$s has-text-align-%1$s",t.alignment),React.createElement("div",{className:n},React.createElement("button",{className:"kbl-clipboard-button"},React.createElement("span",{className:"kbl-clipboard-icon"}),React.createElement("span",{className:"kbl-clipboard-label"},t.label)),React.createElement(b.Content,{value:t.content,tagName:"div",className:"kbl-clipboard-content",style:{display:"none"},"aria-label":a("Text to be copied.","kbl")}))}})}});
//# sourceMappingURL=clipboard.js.map
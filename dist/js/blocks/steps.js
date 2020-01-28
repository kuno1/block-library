!function(e){var t={};function n(l){if(t[l])return t[l].exports;var r=t[l]={i:l,l:!1,exports:{}};return e[l].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,l){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(n.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(l,r,function(t){return e[t]}.bind(null,r));return l},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=22)}({22:function(e,t,n){e.exports=n(23)},23:function(e,t){
/*!
 * wpdeps=wp-blocks, kbl, wp-editor, wp-components, kbl-components-media, kbl-step
 */
var n=wp.blocks.registerBlockType,l=wp.i18n.__,r=wp.editor,a=r.RichText,o=r.InnerBlocks,c=r.InspectorControls,i=wp.components,s=i.G,u=i.SVG,p=i.Polygon,m=i.PanelBody,d=(i.TextControl,i.ToggleControl);n("kunoichi/steps",{title:l("How-to","kbl"),icon:React.createElement(u,{viewBox:"0 0 20 20"},React.createElement(s,{id:"step"},React.createElement(p,{points:"0.75 19.25 0.75 13.08 6.92 13.08 6.92 6.92 13.08 6.92 13.08 0.75 19.25 0.75 19.25 19.25 0.75 19.25",style:{fill:"#898989",stroke:"#444",strokeMiterlimit:10}}))),category:"formatting",description:l("Step by step how-tos. Ready for JSON-LD.","kbl"),attributes:{title:{type:"string",source:"html",selector:".kbl-step-title",default:""},description:{type:"string",source:"html",selector:".kbl-step-description",default:""},nojson:{type:"boolean",default:!1}},edit:function(e){var t=e.attributes,n=e.setAttributes,r=e.className;return r+=" kbl-step-wrap",React.createElement(React.Fragment,null,React.createElement(c,null,React.createElement(m,{title:l("How-to Setting","kbl"),defaultOpen:!0},React.createElement(d,{checked:!t.nojson,label:l("Generate JSON-LD","kbl"),onChange:function(e){return n({nojson:!e})}}))),React.createElement("div",{className:r,"data-step-type":t.type},React.createElement(a,{className:"kbl-step-title",tagName:"h2",multiline:!1,keepPlaceholderOnFocus:!0,value:t.title,placeholder:l("e.g. How to tie necktie.","kbl"),onChange:function(e){return n({title:e})}}),React.createElement(a,{className:"kbl-step-description",tagName:"p",multiline:!1,value:t.description,placeholder:l("e.g. This article will explain how to tie a necktie.","kbl"),onChange:function(e){return n({description:e})}}),React.createElement("div",{className:"kbl-step-list"},React.createElement(o,{allowedBlocks:["kunoichi/step"],templateLock:!1}))))},save:function(e){var t=e.attributes;return React.createElement("div",{className:"kbl-step-wrap"},React.createElement(a.Content,{className:"kbl-step-title",tagName:"h2",value:t.title,multiline:!1}),React.createElement(a.Content,{className:"kbl-step-description",tagName:"p",value:t.description,multiline:!1}),React.createElement("ol",{className:"kbl-step-list"},React.createElement(o.Content,null)))}})}});
//# sourceMappingURL=steps.js.map
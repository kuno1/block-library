!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=10)}({10:function(e,t,n){e.exports=n(11)},11:function(e,t){
/*!
 * Call To Action block.
 *
 * wpdeps=wp-blocks,kbl,wp-block-editor, wp-components, wp-api-fetch, kbl-components-checkbox-group
 */
var n=wp.blocks.registerBlockType,r=wp.i18n.__,o=wp.blockEditor,l=(o.RichText,o.InspectorControls),i=wp.components,a=i.ServerSideRender,c=i.PanelBody,u=i.SelectControl,s=i.TextControl,p=(i.CheckboxControl,i.SVG),d=i.Rect,f=i.Path,b=i.Polygon,m=kbl.CheckboxGroup;n("kunoichi/cta",{title:r("Call To Action","kbl"),icon:React.createElement(p,{viewBox:"0 0 20 20"},React.createElement(d,{x:"2.5",y:"2.5",width:"15",height:"8",rx:"2.5",style:{fill:"#b3b3b4"}}),React.createElement(f,{d:"M15,3a2,2,0,0,1,2,2V8a2,2,0,0,1-2,2H5A2,2,0,0,1,3,8V5A2,2,0,0,1,5,3H15m0-1H5A3,3,0,0,0,2,5V8a3,3,0,0,0,3,3H15a3,3,0,0,0,3-3V5a3,3,0,0,0-3-3Z",style:{fill:"#444"}}),React.createElement(b,{points:"11.1 6.97 10.32 13.88 12.21 13.22 14.02 18.41 15.91 17.76 14.1 12.57 15.99 11.91 11.1 6.97",style:{fill:"#fff",stroke:"#444",strokeMiterlimit:10}})),category:"embed",description:r("Display UI parts to invoke user's action.","kbl"),attributes:{order:{type:"string",default:""},number:{type:"integer",default:1},positions:{type:"array",default:[]},predefinedPositions:{type:"array",default:[]}},supports:{align:["wide","full"]},edit:function(e){var t=e.attributes,n=e.setAttributes,o=e.className,i=KblCta,p=i.positions,d=i.predefineds,f=i.orders;return React.createElement(React.Fragment,null,React.createElement(l,null,React.createElement(c,{title:r("CTA Setting","kbl"),initialOpen:!0},React.createElement("p",null,r("Positions","kbl")),React.createElement(m,{checked:t.positions,options:p,onChange:function(e){return n({positions:e})}}),React.createElement("hr",null),React.createElement("p",null,r("Predefined Positions","kbl")),React.createElement(m,{checked:t.predefinedPositions,options:d,onChange:function(e){return n({predefinedPositions:e})}}),React.createElement("hr",null),React.createElement(u,{value:t.order,label:r("Order","kbl"),options:f,onChange:function(e){return n({order:e})}}),React.createElement("hr",null),React.createElement(s,{label:r("Number to display","kbl"),value:t.number,type:"number",min:1,onChange:function(e){return n({number:parseInt(e,10)})}}))),React.createElement("div",{className:o},React.createElement(a,{block:"kunoichi/cta",attributes:t})))},save:function(){return null}})}});
//# sourceMappingURL=cta.js.map
!function(e){var t={};function l(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=e,l.c=t,l.d=function(e,t,a){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)l.d(a,n,function(t){return e[t]}.bind(null,n));return a},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="",l(l.s=2)}([,,function(e,t,l){e.exports=l(3)},function(e,t){
/*!
 * Alert blocks.
 * wpdeps=wp-blocks,kbl,wp-editor, wp-components, wp-api-fetch
 */
var l=wp.blocks,a=l.registerBlockType,n=l.registerBlockStyle,r=wp.i18n,i=r.__,o=r.sprintf,c=wp.editor,s=c.RichText,u=c.InspectorControls,b=wp.components,m=b.PanelBody,d=b.SelectControl,p=b.TextControl,f=b.ToggleControl;a("kunoichi/alert",{title:i("Alert","kbl"),icon:"warning",category:"formatting",description:i("Styled alert blocks.","kbl"),attributes:{title:{type:"string",source:"text",selector:".kbl-alert-title"},content:{type:"array",source:"children",selector:".kbl-alert-body"},alignment:{type:"string",default:""},closable:{type:"boolean",default:!1}},edit:function(e){var t=e.attributes,l=e.setAttributes,a=e.className,n=["kbl-alert","alert"];t.alignment&&n.push(o("has-text-align-%s",t.alignment)),a&&n.unshift(a);var r=[{value:null,label:i("Not specify","kbl"),disabled:!0},{value:"left",label:i("Left","kbl")},{value:"center",label:i("Center","kbl")},{value:"right",label:i("Right","kbl")}];return React.createElement(React.Fragment,null,React.createElement(u,null,React.createElement(m,{title:i("Speaker","kbl"),initialOpen:!0},React.createElement(p,{label:i("Title","kbl"),value:t.title,help:i("If empty, omitted.","kbl"),onChange:function(e){return l({title:e})}}),React.createElement(d,{label:i("Text Alignment","kbl"),value:t.alignment,options:r,onChange:function(e){return l({alignment:e})}}),React.createElement(f,{label:i("Closable","kbl"),help:t.closable?i("This alert can be closed.","kbl"):i("This alert stays opened.","kbl"),checked:t.closable,onChange:function(e){return l({closable:e})}}))),React.createElement("div",{className:n.join(" ")},t.title&&React.createElement("div",{className:"kbl-alert-title alert-heading h4"},t.title),t.closable&&React.createElement("button",{type:"button",className:"close"},React.createElement("span",{"aria-hidden":"true"},"×")),React.createElement(s,{className:"kbl-alert-body",tagName:"div",value:t.content,multiline:"p",onChange:function(e){return l({content:e})}})))},save:function(e){var t=e.attributes,l=["kbl-alert","alert"];return t.alignment&&t.alignment&&l.push(o("has-text-align-%s",t.alignment)),t.closable&&l.push("alert-dismissible fade show"),React.createElement("div",{className:l.join(" "),role:"alert"},t.closable&&React.createElement("button",{type:"button",className:"close","data-dismiss":"alert","aria-label":i("Close","kbl")},React.createElement("span",{"aria-hidden":"true"},"×")),t.title&&React.createElement("div",{className:"kbl-alert-title alert-heading h4"},t.title),React.createElement(s.Content,{tagName:"div",multiline:"p",className:"kbl-alert-body",value:t.content}))}});if(KblAlert&&KblAlert.styles)for(var g in KblAlert.styles)KblAlert.styles.hasOwnProperty(g)&&(n("kunoichi/alert",{name:g,label:KblAlert.styles[g],isDefault:!0}),initialized=!1)}]);
//# sourceMappingURL=alert.js.map
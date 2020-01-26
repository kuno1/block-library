!function(e){var t={};function r(n){if(t[n])return t[n].exports;var l=t[n]={i:n,l:!1,exports:{}};return e[n].call(l.exports,l,l.exports,r),l.l=!0,l.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)r.d(n,l,function(t){return e[t]}.bind(null,l));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=10)}({10:function(e,t,r){e.exports=r(11)},11:function(e,t){
/*!
 * wpdeps=wp-blocks,kbl,wp-block-editor, wp-components, kbl-components-taxonomy-selector
 */
var r=wp.blocks.registerBlockType,n=wp.i18n.__,l=wp.blockEditor,o=(l.RichText,l.InspectorControls),a=wp.components,i=(a.ServerSideRender,a.PanelBody),c=a.SelectControl,s=a.TextControl,u=a.RadioControl,p=a.ToggleControl,b=kbl.TaxonomySelector,d=function(e){var t=[];for(var r in e)e.hasOwnProperty(r)&&t.push({label:e[r],value:r});return t},f=d(KblPostList.orderby),m=d(KblPostList.post_types);r("kunoichi/posts",{title:n("Post List","kbl"),icon:"list-view",category:"formatting",description:n("Display post list in various format.","kbl"),attributes:{ids:{type:"string",default:""},term_ids:{type:"array",default:[]},post_type:{type:"string",default:"post"},number:{type:"integer",default:5},orderby:{type:"string",default:"date"},order:{type:"string",default:"DESC"},showMore:{type:"boolean",default:!0},moreLabel:{type:"string",default:""}},edit:function(e){var t=e.attributes,r=e.setAttributes,l=e.className;return React.createElement(React.Fragment,null,React.createElement(o,null,React.createElement(i,{title:n("Query Setting","kbl")},React.createElement(c,{selected:t.post_type,label:n("Post Type","kbl"),options:m,onChange:function(e){return r({post_type:e})}}),React.createElement(b,{selected:t.term_ids,onChange:function(e){return r({term_ids:e})}}),React.createElement(s,{type:"number",label:n("Number of Posts","kbl"),value:t.number,onChange:function(e){return r({number:e})},help:n("Max posts number to display.","kbl")}),React.createElement("hr",null),React.createElement(s,{label:n("Post IDs","kbl"),value:t.ids,onChange:function(e){return r({ids:e})},help:n("Write in CSV format. If set, all other settings will be ignored.","kbl"),placeholder:"e.g. 1, 3, 5"})),React.createElement(i,{title:n("Order","kbl"),initialOpen:!1},React.createElement(c,{label:n("Order By","kbl"),selected:t.post_type,options:f,help:n("If you select random, Order will be ignored.","kbl"),onChange:function(e){return r({orderby:e})}}),"rand"!==t.order&&React.createElement(u,{label:n("Order","kbl"),selected:t.order,options:[{label:n("Descending","kbl"),value:"DESC"},{label:n("Ascending","kbl"),value:"ASC"}],onChange:function(e){r({order:e})}})),React.createElement(i,{title:n("More","kbl"),initialOpen:!1},React.createElement(p,{label:n("Display more link","kbl"),checked:t.showMore,onChange:function(e){return r({showMore:e})},help:n("Display more link if possible. It depends on theme compatibility.","kbl")}),React.createElement(s,{label:n("More Label","kbl"),value:t.moreLabel,onChange:function(e){return r({moreLabel:e})},placeholder:n("More","kbl")}))),React.createElement("div",{className:l},"ああああ"))},save:function(){return null}})}});
//# sourceMappingURL=posts.js.map
!function(e){var t={};function n(r){if(t[r])return t[r].exports;var l=t[r]={i:r,l:!1,exports:{}};return e[r].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(r,l,function(t){return e[t]}.bind(null,l));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=14)}({14:function(e,t,n){e.exports=n(15)},15:function(e,t){
/*!
 * wpdeps=wp-blocks,kbl,wp-block-editor, wp-components, kbl-components-taxonomy-selector
 */
var n=wp.blocks.registerBlockType,r=wp.i18n.__,l=wp.blockEditor,o=(l.RichText,l.InspectorControls),a=wp.components,i=a.ServerSideRender,c=a.PanelBody,s=a.SelectControl,u=a.TextControl,p=a.RadioControl,b=a.ToggleControl,d=kbl.TaxonomySelector,f=function(e){var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push({label:e[n],value:n});return t},m=f(KblPostList.orderby),y=f(KblPostList.post_types),g=f(KblPostList.templates);n("kunoichi/posts",{title:r("Post List","kbl"),icon:"list-view",category:"formatting",description:r("Display post list in various format.","kbl"),attributes:{ids:{type:"string",default:""},template:{type:"string",default:""},s:{type:"string",default:""},term_ids:{type:"array",default:[]},post_type:{type:"string",default:"post"},number:{type:"integer",default:5},orderby:{type:"string",default:"date"},order:{type:"string",default:"DESC"},showMore:{type:"boolean",default:!0},moreLabel:{type:"string",default:""}},edit:function(e){var t=e.attributes,n=e.setAttributes;e.className;return React.createElement(React.Fragment,null,React.createElement(o,null,React.createElement(c,{title:r("Template Setting","kbl")},React.createElement(p,{selected:t.template,onChange:function(e){return n({template:e})},options:g})),React.createElement(c,{title:r("Query Setting","kbl")},React.createElement(s,{selected:t.post_type,label:r("Post Type","kbl"),options:y,onChange:function(e){return n({post_type:e})}}),React.createElement(u,{label:r("Search String","kbl"),value:t.s,onChange:function(e){return n({s:e})},placeholder:r("Keywords","kbl")}),React.createElement(d,{selected:t.term_ids,onChange:function(e){return n({term_ids:e})}}),React.createElement(u,{type:"number",label:r("Number of Posts","kbl"),value:t.number,onChange:function(e){return n({number:e})},help:r("Max posts number to display.","kbl")}),React.createElement("hr",null),React.createElement(u,{label:r("Post IDs","kbl"),value:t.ids,onChange:function(e){return n({ids:e})},help:r("Write in CSV format. If set, all other settings will be ignored.","kbl"),placeholder:"e.g. 1, 3, 5"})),React.createElement(c,{title:r("Order","kbl"),initialOpen:!1},React.createElement(s,{label:r("Order By","kbl"),selected:t.post_type,options:m,help:r("If you select random, Order will be ignored.","kbl"),onChange:function(e){return n({orderby:e})}}),"rand"!==t.order&&React.createElement(p,{label:r("Order","kbl"),selected:t.order,options:[{label:r("Descending","kbl"),value:"DESC"},{label:r("Ascending","kbl"),value:"ASC"}],onChange:function(e){n({order:e})}})),React.createElement(c,{title:r("More","kbl"),initialOpen:!1},React.createElement(b,{label:r("Display more link","kbl"),checked:t.showMore,onChange:function(e){return n({showMore:e})},help:r("Display more link if possible. It depends on theme compatibility.","kbl")}),React.createElement(u,{label:r("More Label","kbl"),value:t.moreLabel,onChange:function(e){return n({moreLabel:e})},placeholder:r("More","kbl")}))),React.createElement("div",{className:"kbl-post-list-admin"},React.createElement(i,{block:"kunoichi/posts",attributes:t})))},save:function(){return null}})}});
//# sourceMappingURL=posts.js.map
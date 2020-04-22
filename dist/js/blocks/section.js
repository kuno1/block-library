!function(e){var t={};function n(a){if(t[a])return t[a].exports;var l=t[a]={i:a,l:!1,exports:{}};return e[a].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(a,l,function(t){return e[t]}.bind(null,l));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=22)}({22:function(e,t,n){e.exports=n(23)},23:function(e,t){
/*!
 * Enhanced section blocks.
 * wpdeps=wp-blocks,kbl,wp-block-editor, wp-components
 */
var n=wp.blocks.registerBlockType,a=wp.i18n,l=a.__,r=a.sprintf,o=wp.components,c=o.PanelBody,i=o.ToggleControl,u=o.TextControl,s=o.Button,d=o.RangeControl,b=wp.blockEditor,g=b.InnerBlocks,m=b.withColors,p=b.InspectorControls,k=b.PanelColorSettings,f=b.MediaUpload,h=function(e){var t=-1*e.blur+"px";return{left:t,right:t,top:t,bottom:t,filter:"blur( ".concat(e.blur,"px )")}},y=function(e,t){return e=e?[e,"kbl-section"]:["kbl-section"],t.blur&&e.push("has-blur"),e.join(" ")},R=function(e){var t=["kbl-section-bg"];return e.backgroundColor&&(t.push("has-background-color"),t.push("has-".concat(e.backgroundColor,"-background-color"))),t.join(" ")},C=function(e){var t={};return(e.paddingVertical||e.paddingHorizontal)&&(t.padding=r("%dpx %dpx",e.paddingVertical,e.paddingHorizontal)),e.backgroundImage&&(t.backgroundImage=r("url('%s')",e.backgroundImage)),t};n("kunoichi/section",{title:l("Section","ku-mag"),icon:"grid-view",category:"layout",description:l("Enhanced group block which supports background.","kbl"),supports:{align:["wide","full"]},attributes:{hasContainer:{type:"boolean",default:!0},paddingVertical:{type:"integer",default:40},paddingHorizontal:{type:"integer",default:0},backgroundColor:{type:"string"},opacity:{type:"integer",default:0},backgroundImage:{type:"string",default:""},blur:{type:"integer",default:0},more:{type:"boolean",default:!1},height:{type:"number",default:200},label:{type:"string",default:""}},edit:m("backgroundColor")((function(e){var t=e.attributes,n=e.setAttributes,a=e.className,r=e.backgroundColor,o=e.setBackgroundColor;return React.createElement(React.Fragment,null,React.createElement(p,null,React.createElement(c,{title:l("Layout","kbl"),initialOpen:!1},React.createElement(i,{label:l("Container inside","kbl"),checked:t.hasContainer,onChange:function(e){return n({hasContainer:e})},help:l("If checked, container will be inside.","kbl")}),React.createElement(u,{label:l("Vertical Padding","kbl"),value:t.paddingVertical,type:"number",onChange:function(e){return n({paddingVertical:parseInt(e,10)})}}),React.createElement(u,{label:l("Horizontal Padding","kbl"),value:t.paddingHorizontal,type:"number",onChange:function(e){return n({paddingHorizontal:parseInt(e,10)})}})),React.createElement(k,{title:l("Background Color Setting","kbl"),initialOpen:!0,colorSettings:[{value:r.color,label:l("Background Color","kbl"),onChange:o,disableCustomColors:!0}]},React.createElement(d,{label:l("Opacity","kbl"),value:t.opacity,min:0,max:100,onChange:function(e){return n({opacity:e})}})),React.createElement(c,{title:l("Background Image","kbl"),initialOpen:!0},t.backgroundImage?React.createElement("p",{style:{textAlign:"center"}},React.createElement("img",{style:{maxWidth:"100%",width:"auto",height:"auto"},className:"kbl-section-background-sample",src:t.backgroundImage,alt:""})):React.createElement("p",{className:"kbl-section-background-desc description"},l("Set background image for section.","kbl")),React.createElement(f,{onSelect:function(e){var t=e.sizes.full.url;e.sizes["full-width"]&&(t=e.sizes["full-width"].url),n({backgroundImage:t})},type:"image",value:t.backgroundImage,render:function(e){var a=e.open;return React.createElement("p",null,React.createElement(s,{isDefault:!0,onClick:a},l("Select Image","kbl")),t.backgroundImage?React.createElement(s,{isTertiary:!0,onClick:function(){return n({backgroundImage:""})}},l("Clear","kbl")):null)}}),React.createElement(d,{label:l("Blur","kbl"),value:t.blur,min:0,max:20,onChange:function(e){return n({blur:e})}})),React.createElement(c,{title:l("Hidden Contents","kbl")},React.createElement(i,{checked:t.more,label:l("Hide Contents","kbl"),onChange:function(e){return n({more:e})},help:l("If checked, contents will be hidden.","kbl")}),React.createElement(u,{type:"number",value:t.height,label:l("Preview Height","kbl"),onChange:function(e){return n({height:e})}}),React.createElement(u,{type:"text",value:t.label,label:l("Label for revealing button.","kbl"),onChange:function(e){return n({label:e})},placeholder:l("e.g. Read More","kbl")}))),React.createElement("section",{className:y(a,t),style:C(t)},t.blur?React.createElement("div",{className:"kbl-section-blur",style:h(t)}):null,React.createElement("div",{className:R(t),style:{opacity:t.opacity/100}}),React.createElement("div",{className:t.hasContainer?KblSection.container_class:KblSection.no_container_class},React.createElement(g,null)),t.more&&React.createElement("button",{className:"kbl-section-more"},React.createElement("span",{className:"kbl-section-more-label"},t.label||l("Read More","kbl")))))})),save:function(e){var t=e.className,n=e.attributes,a="wp-block-kunoichi-section-bg";n.backgroundColor&&(a+=" has-background-color has-"+n.backgroundColor+"-background-color"),t+=n.full?" section-full":" section-not-full";var o=n.blur&&n.backgroundImage;o&&(t+=" blur");var c={padding:r("%dpx %dpx",n.paddingVertical,n.paddingHorizontal),backgroundImage:r("url('%s')",n.backgroundImage)};return n.more&&(t+=" has-more-button",c.maxHeight=r("%dpx",n.height)),React.createElement("section",{className:t,style:c},o?React.createElement("div",{className:"wp-block-kunoichi-section-blur",style:h(n)}):null,React.createElement("div",{className:a,style:{opacity:n.opacity/100}}),React.createElement("div",{className:n.full?"no-container":"container"},React.createElement(g.Content,null)),n.more&&React.createElement("button",{className:"kbl-section-more"},React.createElement("span",{className:"kbl-section-more-label"},n.label||l("Read More","kbl"))))}})}});
//# sourceMappingURL=section.js.map
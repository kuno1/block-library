!function(e){var t={};function n(a){if(t[a])return t[a].exports;var l=t[a]={i:a,l:!1,exports:{}};return e[a].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(a,l,function(t){return e[t]}.bind(null,l));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=30)}({30:function(e,t,n){e.exports=n(31)},31:function(e,t){
/*!
 * Enhanced section blocks.
 * wpdeps=wp-blocks,kbl,wp-block-editor, wp-components, wp-hooks, wp-url
 */
var n=wp.blocks.registerBlockType,a=wp.i18n,l=a.__,o=a.sprintf,r=wp.url.addQueryArgs,c=wp.hooks.applyFilters,i=wp.components,u=i.PanelBody,s=i.ToggleControl,b=i.TextControl,d=i.Button,m=i.RangeControl,p=wp.blockEditor,g=p.InnerBlocks,k=p.withColors,f=p.InspectorControls,h=p.PanelColorSettings,y=p.MediaUpload,v=function(e){var t=-1*e.blur+"px";return{left:t,right:t,top:t,bottom:t,filter:"blur( ".concat(e.blur,"px )")}},R=function(e,t){return e=e?[e,"kbl-section"]:["kbl-section"],t.blur&&e.push("has-blur"),t.more&&e.push("has-more-button"),(e=c("kbl.section.className",e,t)).join(" ")},E=function(e){var t=["kbl-section-bg"];return e.backgroundColor&&(t.push("has-background-color"),t.push("has-".concat(e.backgroundColor,"-background-color"))),t.join(" ")},C=function(e){var t={};return(e.paddingVertical||e.paddingHorizontal)&&(t.padding=o("%dpx %dpx",e.paddingVertical,e.paddingHorizontal)),e.backgroundImage&&(t.backgroundImage=o("url('%s')",e.backgroundImage)),t},w=function(e){if(!e.movie)return null;var t="",n="";switch(e.movie.match(/https?:\/\/www.youtube.com.*v=(.*)/)?(t="youtube",n=RegExp.$1):e.movie.match(/https:\/\/youtu.be\/(.*[^?])/)&&(t="youtube",n=RegExp.$1),t){case"youtube":var a=r(o("https://www.youtube.com/embed/%s",n),{autoplay:1,loop:e.loop?1:0,playlist:n,controls:0,enablejsapi:1,modestbranding:1,origin:window.location.hostname,playsinline:1,fs:0,mute:1});return React.createElement("div",{className:"kbl-section-youtube-container"},React.createElement("iframe",{className:"kbl-section-youtube",name:"movie",title:"",src:a}));default:return React.createElement("video",{className:"kbl-section-video",autoPlay:!0,muted:!0,poster:e.backgroundImage||null,loop:e.repeat},React.createElement("source",{className:"kbl-section-video-source",src:e.movie}))}};n("kunoichi/section",{title:l("Section","kbl"),icon:"grid-view",category:"layout",description:l("Enhanced group block which supports background.","kbl"),supports:{align:["wide","full"]},attributes:{hasContainer:{type:"boolean",default:!0},paddingVertical:{type:"integer",default:40},paddingHorizontal:{type:"integer",default:0},backgroundColor:{type:"string"},opacity:{type:"integer",default:0},backgroundImage:{type:"string",default:""},blur:{type:"integer",default:0},more:{type:"boolean",default:!1},height:{type:"number",default:200},label:{type:"string",default:""},movie:{type:"string",default:""},repeat:{type:"boolean",default:!0}},edit:k("backgroundColor")((function(e){var t=e.attributes,n=e.setAttributes,a=e.className,o=e.backgroundColor,r=e.setBackgroundColor;return React.createElement(React.Fragment,null,React.createElement(f,null,React.createElement(u,{title:l("Layout","kbl"),initialOpen:!1},c("kbl.section.layout",React.createElement(React.Fragment,null,React.createElement(s,{label:l("Container inside","kbl"),checked:t.hasContainer,onChange:function(e){return n({hasContainer:e})},help:l("If checked, container will be inside.","kbl")}),React.createElement(b,{label:l("Vertical Padding","kbl"),value:t.paddingVertical,type:"number",onChange:function(e){return n({paddingVertical:parseInt(e,10)})}}),React.createElement(b,{label:l("Horizontal Padding","kbl"),value:t.paddingHorizontal,type:"number",onChange:function(e){return n({paddingHorizontal:parseInt(e,10)})}})),e)),React.createElement(h,{title:l("Background Color Setting","kbl"),initialOpen:!0,colorSettings:[{value:o.color,label:l("Background Color","kbl"),onChange:r,disableCustomColors:!0}]},React.createElement(m,{label:l("Opacity","kbl"),value:t.opacity,min:0,max:100,onChange:function(e){return n({opacity:e})}})),React.createElement(u,{title:l("Background Image","kbl"),initialOpen:!0},t.backgroundImage?React.createElement("p",{style:{textAlign:"center"}},React.createElement("img",{style:{maxWidth:"100%",width:"auto",height:"auto"},className:"kbl-section-background-sample",src:t.backgroundImage,alt:""})):React.createElement("p",{className:"kbl-section-background-desc description"},l("Set background image for section.","kbl")),React.createElement(y,{onSelect:function(e){var t=e.sizes.full.url;e.sizes["full-width"]&&(t=e.sizes["full-width"].url),n({backgroundImage:t})},allowedTypes:["image"],render:function(e){var a=e.open;return React.createElement("p",null,React.createElement(d,{isSecondary:!0,onClick:a},l("Select Image","kbl")),t.backgroundImage?React.createElement(d,{isTertiary:!0,onClick:function(){return n({backgroundImage:""})}},l("Clear","kbl")):null)}}),React.createElement(m,{label:l("Blur","kbl"),value:t.blur,min:0,max:20,onChange:function(e){return n({blur:e})}})),React.createElement(u,{title:l("Background Movie","kbl"),initialOpen:!1},React.createElement(b,{label:l("Movie URL","kbl"),value:t.movie,placeholder:"https://example.com/movie.mov",type:"url",help:l("Enter movie file URL. YouTube is also supported.","kbl"),onChange:function(e){return n({movie:e})}}),React.createElement(y,{onSelect:function(e){var t=e.url;n({movie:t})},allowedTypes:["video"],render:function(e){var a=e.open;return React.createElement("p",null,React.createElement(d,{isSecondary:!0,onClick:a},l("Select Uploaded Video","kbl")),t.movie?React.createElement(d,{isTertiary:!0,onClick:function(){return n({movie:""})}},l("Clear","kbl")):null)}}),React.createElement(s,{checked:t.repeat,label:l("Repeat","kbl"),onChange:function(e){return n({repeat:e})}})),React.createElement(u,{title:l("Hidden Contents","kbl")},React.createElement(s,{checked:t.more,label:l("Hide Contents","kbl"),onChange:function(e){return n({more:e})},help:l("If checked, contents will be hidden.","kbl")}),React.createElement(b,{type:"number",value:t.height,label:l("Preview Height","kbl"),onChange:function(e){return n({height:e})}}),React.createElement(b,{type:"text",value:t.label,label:l("Label for revealing button.","kbl"),onChange:function(e){return n({label:e})},placeholder:l("e.g. Read More","kbl")}))),React.createElement("section",{className:R(a,t),style:C(t)},t.blur?React.createElement("div",{className:"kbl-section-blur",style:v(t)}):null,w(t),React.createElement("div",{className:E(t),style:{opacity:t.opacity/100}}),React.createElement("div",{className:t.hasContainer?KblSection.container_class:KblSection.no_container_class},React.createElement(g,null)),t.more&&React.createElement("button",{className:"kbl-section-more"},React.createElement("span",{className:"kbl-section-more-label"},t.label||l("Read More","kbl")))))})),save:function(e){var t=e.attributes,n="wp-block-kunoichi-section-bg";t.backgroundColor&&(n+=" has-background-color has-"+t.backgroundColor+"-background-color");var a=R(null,t),r={padding:o("%dpx %dpx",t.paddingVertical,t.paddingHorizontal),backgroundImage:o("url('%s')",t.backgroundImage)};return t.more&&(r.maxHeight=o("%dpx",t.height)),React.createElement("section",{className:a,style:r},t.blur?React.createElement("div",{className:"wp-block-kunoichi-section-blur",style:v(t)}):null,w(t),React.createElement("div",{className:n,style:{opacity:t.opacity/100}}),React.createElement("div",{className:t.hasContainer?KblSection.container_class:KblSection.no_container_class},React.createElement(g.Content,null)),t.more&&React.createElement("button",{className:"kbl-section-more"},React.createElement("span",{className:"kbl-section-more-label"},t.label||l("Read More","kbl"))))}})}});
//# sourceMappingURL=section.js.map
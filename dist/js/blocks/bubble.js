!function(e){var t={};function a(r){if(t[r])return t[r].exports;var l=t[r]={i:r,l:!1,exports:{}};return e[r].call(l.exports,l,l.exports,a),l.l=!0,l.exports}a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)a.d(r,l,function(t){return e[t]}.bind(null,l));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=2)}([,,function(e,t,a){e.exports=a(3)},function(e,t){
/*!
 * wpdeps=wp-blocks,kbl,wp-editor, wp-components, wp-api-fetch, kbl-components-user-selector, kbl-components-post-selector
 */
var a=wp.blocks.registerBlockType,r=wp.i18n,l=r.__,n=r.sprintf,o=wp.editor,c=o.RichText,i=o.withColors,s=o.InspectorControls,u=o.PanelColorSettings,b=o.MediaUpload,m=o.MediaUploadCheck,p=wp.components,f=p.Button,v=p.PanelBody,d=p.SelectControl,g=p.TextControl,h=wp.compose.withState,k=kbl,y=k.UserSelector,C=k.PostSelector,R={},E={},S=function(e){for(var t="",a=0,r=["thumbnail",KblBubble.size];a<r.length;a++){var l=r[a];e.sizes[l]&&(t=e.sizes[l].url)}return t},w=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"success";wp.data.dispatch("core/notices").createNotice(t,e,{isDismissible:!0})};a("kunoichi/bubble",{title:l("Speech Bubble","kbl"),icon:"format-chat",category:"layout",description:l("Speech bubble with avatar.","kbl"),attributes:{position:{type:"string",default:"left"},name:{type:"string",default:""},avatar:{type:"string",default:""},writer:{type:"integer",default:0},user:{type:"integer",default:0},textColor:{type:"string",default:""},backgroundColor:{type:"string",default:""},content:{type:"array",source:"children",selector:"p"}},edit:h({src:KblBubble.avatar,name:""})(i("backgroundColor","textColor")((function(e){var t=e.attributes,a=e.setAttributes,r=(e.className,e.backgroundColor),o=e.setBackgroundColor,i=e.textColor,p=e.setTextColor,h=e.name,k=e.src,N=e.setState,_={name:"",avatar:KblBubble.avatar};if(t.name&&(_.name=t.name),t.avatar&&(_.src=t.avatar),t.user){var x=R[t.user];x?(_.name=t.name?t.name:x.display_name,_.src=t.avatar?t.avatar:x.avatar):wp.apiFetch({path:n("kbl/v1/users/search?id=%d",t.user)}).then((function(e){e.length?(N({name:t.name?t.name:e[0].display_name,src:t.avatar?t.avatar:e[0].avatar}),R[t.user]=e[0]):(a({user:0}),w(l("User not found.","kbl"),"error"))})).catch((function(e){var t=l("Error","kbl");e.responseJSON&&e.responseJSON.message&&(t=e.responseJSON.message),w(t,"error")}))}else if(t.writer){var O=E[t.writer];O?(_.name=t.name?t.name:O.title,_.src=t.avatar?t.avatar:O.thumbnail):wp.apiFetch({path:n("kbl/v1/search/%s?id=%d",KblBubble.virtual_member,t.writer)}).then((function(e){e.length?(N({name:t.name?t.name:e[0].title,src:t.avatar?t.avatar:e[0].thumbnail}),E[t.writer]=e[0]):(a({writer:0}),w(l("Post not found.","kbl"),"error"))})).catch((function(e){var t=l("Error","kbl");e.responseJSON&&e.responseJSON.message&&(t=e.responseJSON.message),w(t,"error")}))}N(_);var B=[{value:i.color,label:l("Text Color","kbl"),onChange:p},{value:r.color,label:l("Background Color","kbl"),onChange:o}],P=["kbl-bubble-text"],j={};return r.class?P.push(r.class):r.color&&(j.backgroundColor=r.color),i.class?P.push(i.class):i.color&&(j.color=i.color),React.createElement(React.Fragment,null,React.createElement(s,null,React.createElement(v,{title:l("Speaker","kbl"),initialOpen:!0},React.createElement(g,{label:l("Name","kbl"),value:t.name,help:l("If name is empty, this will be just omitted.","kbl"),onChange:function(e){return a({name:e})}}),React.createElement(m,null,React.createElement(b,{allowedTypes:["image"],onSelect:function(e){a({avatar:S(e)})},render:function(e){var r=e.open;return React.createElement(React.Fragment,null,React.createElement(f,{isDefault:!0,onClick:r},l("Select Avatar","kbl")),t.avatar&&React.createElement(f,{style:{marginLeft:"10px"},isLink:!0,onClick:function(){return a({avatar:""})}},l("Clear Avatar","kbl")))}})),React.createElement("hr",null),React.createElement(y,{id:t.user,currentLabel:l("Current User","kbl"),label:l("Search from WordPress users","kbl"),onChange:function(e){return a({user:e,writer:0})}}),KblBubble.virtual_member&&React.createElement(React.Fragment,null,React.createElement("hr",null),React.createElement(C,{id:t.writer,postType:KblBubble.virtual_member,currentLabel:n(l("Current %s","kbl"),KblBubble.virtual_member_label),label:n(l("Search from %s","kbl"),KblBubble.virtual_member_label),onChange:function(e){return a({writer:e,user:0})}}))),React.createElement(v,{title:l("Layout","kbl"),initialOpen:!1},React.createElement(d,{label:l("Position","kbl"),value:t.position,options:[{label:l("Left","kbl"),value:"left"},{label:l("Right","kbl"),value:"right"}],onChange:function(e){a({position:e})}})),React.createElement(u,{title:l("Color Setting","kbl"),colorSettings:B,initialOpen:!1})),React.createElement("div",{className:"kbl-bubble","data-position":t.position},k?React.createElement("div",{className:"kbl-bubble-avatar"},React.createElement("img",{className:"kbl-bubble-image",src:k,alt:h,width:96,height:96}),h.length?React.createElement("span",{className:"kbl-bubble-name"},h):null):null,React.createElement("div",{className:"kbl-bubble-body"},React.createElement(c,{className:P.join(" "),style:j||null,tagName:"p",value:t.content,onChange:function(e){return a({content:e})}}))))}))),save:function(e){var t=e.attributes;return React.createElement("div",{className:"kbl-bubble-body"},React.createElement(c.Content,{tagName:"p",className:"kbl-bubble-text",value:t.content}))}})}]);
//# sourceMappingURL=bubble.js.map
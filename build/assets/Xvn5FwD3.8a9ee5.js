import{ad as ft,h as mt,ae as Pe,r as o,a6 as L,j as n,af as ht,P as M,a8 as R,k as U,ag as Re,ah as vt,ai as gt,aj as St,S as xt,ak as wt,al as yt,am as Ct,an as Ie,ao as It,ap as bt,i as Tt,aq as Nt,a7 as Te,ar as Pt,as as Ne,at as Rt,c as K,au as Et,av as _t,aw as jt,a4 as Mt}from"./DMBStb6S.8a9ee5.js";import{u as At}from"./B4PR7dDm.8a9ee5.js";var Ot=[" ","Enter","ArrowUp","ArrowDown"],Dt=[" ","Enter"],se="Select",[ie,de,Lt]=ft(se),[te,mo]=mt(se,[Lt,Pe]),ue=Pe(),[kt,$]=te(se),[Bt,Vt]=te(se),Ee=t=>{const{__scopeSelect:r,children:e,open:a,defaultOpen:l,onOpenChange:d,value:i,defaultValue:c,onValueChange:s,dir:u,name:g,autoComplete:y,disabled:N,required:T}=t,m=ue(r),[v,I]=o.useState(null),[h,p]=o.useState(null),[S,V]=o.useState(!1),A=Nt(u),[oe=!1,E]=Te({prop:a,defaultProp:l,onChange:d}),[j,z]=Te({prop:i,defaultProp:c,onChange:s}),J=o.useRef(null),q=v?!!v.closest("form"):!0,[O,H]=o.useState(new Set),F=Array.from(O).map(P=>P.props.value).join(";");return n.jsx(Pt,{...m,children:n.jsxs(kt,{required:T,scope:r,trigger:v,onTriggerChange:I,valueNode:h,onValueNodeChange:p,valueNodeHasChildren:S,onValueNodeHasChildrenChange:V,contentId:Ie(),value:j,onValueChange:z,open:oe,onOpenChange:E,dir:A,triggerPointerDownPosRef:J,disabled:N,children:[n.jsx(ie.Provider,{scope:r,children:n.jsx(Bt,{scope:t.__scopeSelect,onNativeOptionAdd:o.useCallback(P=>{H(D=>new Set(D).add(P))},[]),onNativeOptionRemove:o.useCallback(P=>{H(D=>{const k=new Set(D);return k.delete(P),k})},[]),children:e})}),q?n.jsxs(tt,{"aria-hidden":!0,required:T,tabIndex:-1,name:g,autoComplete:y,value:j,onChange:P=>z(P.target.value),disabled:N,children:[j===void 0?n.jsx("option",{value:""}):null,Array.from(O)]},F):null]})})};Ee.displayName=se;var _e="SelectTrigger",je=o.forwardRef((t,r)=>{const{__scopeSelect:e,disabled:a=!1,...l}=t,d=ue(e),i=$(_e,e),c=i.disabled||a,s=L(r,i.onTriggerChange),u=de(e),[g,y,N]=ot(m=>{const v=u().filter(p=>!p.disabled),I=v.find(p=>p.value===i.value),h=nt(v,m,I);h!==void 0&&i.onValueChange(h.value)}),T=()=>{c||(i.onOpenChange(!0),N())};return n.jsx(ht,{asChild:!0,...d,children:n.jsx(M.button,{type:"button",role:"combobox","aria-controls":i.contentId,"aria-expanded":i.open,"aria-required":i.required,"aria-autocomplete":"none",dir:i.dir,"data-state":i.open?"open":"closed",disabled:c,"data-disabled":c?"":void 0,"data-placeholder":et(i.value)?"":void 0,...l,ref:s,onClick:R(l.onClick,m=>{m.currentTarget.focus()}),onPointerDown:R(l.onPointerDown,m=>{const v=m.target;v.hasPointerCapture(m.pointerId)&&v.releasePointerCapture(m.pointerId),m.button===0&&m.ctrlKey===!1&&(T(),i.triggerPointerDownPosRef.current={x:Math.round(m.pageX),y:Math.round(m.pageY)},m.preventDefault())}),onKeyDown:R(l.onKeyDown,m=>{const v=g.current!=="";!(m.ctrlKey||m.altKey||m.metaKey)&&m.key.length===1&&y(m.key),!(v&&m.key===" ")&&Ot.includes(m.key)&&(T(),m.preventDefault())})})})});je.displayName=_e;var Me="SelectValue",Ae=o.forwardRef((t,r)=>{const{__scopeSelect:e,className:a,style:l,children:d,placeholder:i="",...c}=t,s=$(Me,e),{onValueNodeHasChildrenChange:u}=s,g=d!==void 0,y=L(r,s.onValueNodeChange);return U(()=>{u(g)},[u,g]),n.jsx(M.span,{...c,ref:y,style:{pointerEvents:"none"},children:et(s.value)?n.jsx(n.Fragment,{children:i}):d})});Ae.displayName=Me;var Ht="SelectIcon",Oe=o.forwardRef((t,r)=>{const{__scopeSelect:e,children:a,...l}=t;return n.jsx(M.span,{"aria-hidden":!0,...l,ref:r,children:a||"▼"})});Oe.displayName=Ht;var Ft="SelectPortal",De=t=>n.jsx(Rt,{asChild:!0,...t});De.displayName=Ft;var Z="SelectContent",Le=o.forwardRef((t,r)=>{const e=$(Z,t.__scopeSelect),[a,l]=o.useState();if(U(()=>{l(new DocumentFragment)},[]),!e.open){const d=a;return d?Re.createPortal(n.jsx(ke,{scope:t.__scopeSelect,children:n.jsx(ie.Slot,{scope:t.__scopeSelect,children:n.jsx("div",{children:t.children})})}),d):null}return n.jsx(Be,{...t,ref:r})});Le.displayName=Z;var B=10,[ke,G]=te(Z),Wt="SelectContentImpl",Be=o.forwardRef((t,r)=>{const{__scopeSelect:e,position:a="item-aligned",onCloseAutoFocus:l,onEscapeKeyDown:d,onPointerDownOutside:i,side:c,sideOffset:s,align:u,alignOffset:g,arrowPadding:y,collisionBoundary:N,collisionPadding:T,sticky:m,hideWhenDetached:v,avoidCollisions:I,...h}=t,p=$(Z,e),[S,V]=o.useState(null),[A,oe]=o.useState(null),E=L(r,f=>V(f)),[j,z]=o.useState(null),[J,q]=o.useState(null),O=de(e),[H,F]=o.useState(!1),P=o.useRef(!1);o.useEffect(()=>{if(S)return vt(S)},[S]),gt();const D=o.useCallback(f=>{const[b,..._]=O().map(w=>w.ref.current),[C]=_.slice(-1),x=document.activeElement;for(const w of f)if(w===x||(w==null||w.scrollIntoView({block:"nearest"}),w===b&&A&&(A.scrollTop=0),w===C&&A&&(A.scrollTop=A.scrollHeight),w==null||w.focus(),document.activeElement!==x))return},[O,A]),k=o.useCallback(()=>D([j,S]),[D,j,S]);o.useEffect(()=>{H&&k()},[H,k]);const{onOpenChange:Q,triggerPointerDownPosRef:W}=p;o.useEffect(()=>{if(S){let f={x:0,y:0};const b=C=>{var x,w;f={x:Math.abs(Math.round(C.pageX)-(((x=W.current)==null?void 0:x.x)??0)),y:Math.abs(Math.round(C.pageY)-(((w=W.current)==null?void 0:w.y)??0))}},_=C=>{f.x<=10&&f.y<=10?C.preventDefault():S.contains(C.target)||Q(!1),document.removeEventListener("pointermove",b),W.current=null};return W.current!==null&&(document.addEventListener("pointermove",b),document.addEventListener("pointerup",_,{capture:!0,once:!0})),()=>{document.removeEventListener("pointermove",b),document.removeEventListener("pointerup",_,{capture:!0})}}},[S,Q,W]),o.useEffect(()=>{const f=()=>Q(!1);return window.addEventListener("blur",f),window.addEventListener("resize",f),()=>{window.removeEventListener("blur",f),window.removeEventListener("resize",f)}},[Q]);const[pe,ae]=ot(f=>{const b=O().filter(x=>!x.disabled),_=b.find(x=>x.ref.current===document.activeElement),C=nt(b,f,_);C&&setTimeout(()=>C.ref.current.focus())}),fe=o.useCallback((f,b,_)=>{const C=!P.current&&!_;(p.value!==void 0&&p.value===b||C)&&(z(f),C&&(P.current=!0))},[p.value]),me=o.useCallback(()=>S==null?void 0:S.focus(),[S]),ee=o.useCallback((f,b,_)=>{const C=!P.current&&!_;(p.value!==void 0&&p.value===b||C)&&q(f)},[p.value]),le=a==="popper"?Se:Ve,ne=le===Se?{side:c,sideOffset:s,align:u,alignOffset:g,arrowPadding:y,collisionBoundary:N,collisionPadding:T,sticky:m,hideWhenDetached:v,avoidCollisions:I}:{};return n.jsx(ke,{scope:e,content:S,viewport:A,onViewportChange:oe,itemRefCallback:fe,selectedItem:j,onItemLeave:me,itemTextRefCallback:ee,focusSelectedItem:k,selectedItemText:J,position:a,isPositioned:H,searchRef:pe,children:n.jsx(St,{as:xt,allowPinchZoom:!0,children:n.jsx(wt,{asChild:!0,trapped:p.open,onMountAutoFocus:f=>{f.preventDefault()},onUnmountAutoFocus:R(l,f=>{var b;(b=p.trigger)==null||b.focus({preventScroll:!0}),f.preventDefault()}),children:n.jsx(yt,{asChild:!0,disableOutsidePointerEvents:!0,onEscapeKeyDown:d,onPointerDownOutside:i,onFocusOutside:f=>f.preventDefault(),onDismiss:()=>p.onOpenChange(!1),children:n.jsx(le,{role:"listbox",id:p.contentId,"data-state":p.open?"open":"closed",dir:p.dir,onContextMenu:f=>f.preventDefault(),...h,...ne,onPlaced:()=>F(!0),ref:E,style:{display:"flex",flexDirection:"column",outline:"none",...h.style},onKeyDown:R(h.onKeyDown,f=>{const b=f.ctrlKey||f.altKey||f.metaKey;if(f.key==="Tab"&&f.preventDefault(),!b&&f.key.length===1&&ae(f.key),["ArrowUp","ArrowDown","Home","End"].includes(f.key)){let C=O().filter(x=>!x.disabled).map(x=>x.ref.current);if(["ArrowUp","End"].includes(f.key)&&(C=C.slice().reverse()),["ArrowUp","ArrowDown"].includes(f.key)){const x=f.target,w=C.indexOf(x);C=C.slice(w+1)}setTimeout(()=>D(C)),f.preventDefault()}})})})})})})});Be.displayName=Wt;var Ut="SelectItemAlignedPosition",Ve=o.forwardRef((t,r)=>{const{__scopeSelect:e,onPlaced:a,...l}=t,d=$(Z,e),i=G(Z,e),[c,s]=o.useState(null),[u,g]=o.useState(null),y=L(r,E=>g(E)),N=de(e),T=o.useRef(!1),m=o.useRef(!0),{viewport:v,selectedItem:I,selectedItemText:h,focusSelectedItem:p}=i,S=o.useCallback(()=>{if(d.trigger&&d.valueNode&&c&&u&&v&&I&&h){const E=d.trigger.getBoundingClientRect(),j=u.getBoundingClientRect(),z=d.valueNode.getBoundingClientRect(),J=h.getBoundingClientRect();if(d.dir!=="rtl"){const x=J.left-j.left,w=z.left-x,Y=E.left-w,X=E.width+Y,he=Math.max(X,j.width),ve=window.innerWidth-B,ge=Ne(w,[B,ve-he]);c.style.minWidth=X+"px",c.style.left=ge+"px"}else{const x=j.right-J.right,w=window.innerWidth-z.right-x,Y=window.innerWidth-E.right-w,X=E.width+Y,he=Math.max(X,j.width),ve=window.innerWidth-B,ge=Ne(w,[B,ve-he]);c.style.minWidth=X+"px",c.style.right=ge+"px"}const q=N(),O=window.innerHeight-B*2,H=v.scrollHeight,F=window.getComputedStyle(u),P=parseInt(F.borderTopWidth,10),D=parseInt(F.paddingTop,10),k=parseInt(F.borderBottomWidth,10),Q=parseInt(F.paddingBottom,10),W=P+D+H+Q+k,pe=Math.min(I.offsetHeight*5,W),ae=window.getComputedStyle(v),fe=parseInt(ae.paddingTop,10),me=parseInt(ae.paddingBottom,10),ee=E.top+E.height/2-B,le=O-ee,ne=I.offsetHeight/2,f=I.offsetTop+ne,b=P+D+f,_=W-b;if(b<=ee){const x=I===q[q.length-1].ref.current;c.style.bottom="0px";const w=u.clientHeight-v.offsetTop-v.offsetHeight,Y=Math.max(le,ne+(x?me:0)+w+k),X=b+Y;c.style.height=X+"px"}else{const x=I===q[0].ref.current;c.style.top="0px";const Y=Math.max(ee,P+v.offsetTop+(x?fe:0)+ne)+_;c.style.height=Y+"px",v.scrollTop=b-ee+v.offsetTop}c.style.margin=`${B}px 0`,c.style.minHeight=pe+"px",c.style.maxHeight=O+"px",a==null||a(),requestAnimationFrame(()=>T.current=!0)}},[N,d.trigger,d.valueNode,c,u,v,I,h,d.dir,a]);U(()=>S(),[S]);const[V,A]=o.useState();U(()=>{u&&A(window.getComputedStyle(u).zIndex)},[u]);const oe=o.useCallback(E=>{E&&m.current===!0&&(S(),p==null||p(),m.current=!1)},[S,p]);return n.jsx($t,{scope:e,contentWrapper:c,shouldExpandOnScrollRef:T,onScrollButtonChange:oe,children:n.jsx("div",{ref:s,style:{display:"flex",flexDirection:"column",position:"fixed",zIndex:V},children:n.jsx(M.div,{...l,ref:y,style:{boxSizing:"border-box",maxHeight:"100%",...l.style}})})})});Ve.displayName=Ut;var Kt="SelectPopperPosition",Se=o.forwardRef((t,r)=>{const{__scopeSelect:e,align:a="start",collisionPadding:l=B,...d}=t,i=ue(e);return n.jsx(Ct,{...i,...d,ref:r,align:a,collisionPadding:l,style:{boxSizing:"border-box",...d.style,"--radix-select-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-select-content-available-width":"var(--radix-popper-available-width)","--radix-select-content-available-height":"var(--radix-popper-available-height)","--radix-select-trigger-width":"var(--radix-popper-anchor-width)","--radix-select-trigger-height":"var(--radix-popper-anchor-height)"}})});Se.displayName=Kt;var[$t,be]=te(Z,{}),xe="SelectViewport",He=o.forwardRef((t,r)=>{const{__scopeSelect:e,nonce:a,...l}=t,d=G(xe,e),i=be(xe,e),c=L(r,d.onViewportChange),s=o.useRef(0);return n.jsxs(n.Fragment,{children:[n.jsx("style",{dangerouslySetInnerHTML:{__html:"[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"},nonce:a}),n.jsx(ie.Slot,{scope:e,children:n.jsx(M.div,{"data-radix-select-viewport":"",role:"presentation",...l,ref:c,style:{position:"relative",flex:1,overflow:"auto",...l.style},onScroll:R(l.onScroll,u=>{const g=u.currentTarget,{contentWrapper:y,shouldExpandOnScrollRef:N}=i;if(N!=null&&N.current&&y){const T=Math.abs(s.current-g.scrollTop);if(T>0){const m=window.innerHeight-B*2,v=parseFloat(y.style.minHeight),I=parseFloat(y.style.height),h=Math.max(v,I);if(h<m){const p=h+T,S=Math.min(m,p),V=p-S;y.style.height=S+"px",y.style.bottom==="0px"&&(g.scrollTop=V>0?V:0,y.style.justifyContent="flex-end")}}}s.current=g.scrollTop})})})]})});He.displayName=xe;var Fe="SelectGroup",[Gt,zt]=te(Fe),We=o.forwardRef((t,r)=>{const{__scopeSelect:e,...a}=t,l=Ie();return n.jsx(Gt,{scope:e,id:l,children:n.jsx(M.div,{role:"group","aria-labelledby":l,...a,ref:r})})});We.displayName=Fe;var Ue="SelectLabel",Ke=o.forwardRef((t,r)=>{const{__scopeSelect:e,...a}=t,l=zt(Ue,e);return n.jsx(M.div,{id:l.id,...a,ref:r})});Ke.displayName=Ue;var ce="SelectItem",[qt,$e]=te(ce),Ge=o.forwardRef((t,r)=>{const{__scopeSelect:e,value:a,disabled:l=!1,textValue:d,...i}=t,c=$(ce,e),s=G(ce,e),u=c.value===a,[g,y]=o.useState(d??""),[N,T]=o.useState(!1),m=L(r,h=>{var p;return(p=s.itemRefCallback)==null?void 0:p.call(s,h,a,l)}),v=Ie(),I=()=>{l||(c.onValueChange(a),c.onOpenChange(!1))};if(a==="")throw new Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");return n.jsx(qt,{scope:e,value:a,disabled:l,textId:v,isSelected:u,onItemTextChange:o.useCallback(h=>{y(p=>p||((h==null?void 0:h.textContent)??"").trim())},[]),children:n.jsx(ie.ItemSlot,{scope:e,value:a,disabled:l,textValue:g,children:n.jsx(M.div,{role:"option","aria-labelledby":v,"data-highlighted":N?"":void 0,"aria-selected":u&&N,"data-state":u?"checked":"unchecked","aria-disabled":l||void 0,"data-disabled":l?"":void 0,tabIndex:l?void 0:-1,...i,ref:m,onFocus:R(i.onFocus,()=>T(!0)),onBlur:R(i.onBlur,()=>T(!1)),onPointerUp:R(i.onPointerUp,I),onPointerMove:R(i.onPointerMove,h=>{var p;l?(p=s.onItemLeave)==null||p.call(s):h.currentTarget.focus({preventScroll:!0})}),onPointerLeave:R(i.onPointerLeave,h=>{var p;h.currentTarget===document.activeElement&&((p=s.onItemLeave)==null||p.call(s))}),onKeyDown:R(i.onKeyDown,h=>{var S;((S=s.searchRef)==null?void 0:S.current)!==""&&h.key===" "||(Dt.includes(h.key)&&I(),h.key===" "&&h.preventDefault())})})})})});Ge.displayName=ce;var re="SelectItemText",ze=o.forwardRef((t,r)=>{const{__scopeSelect:e,className:a,style:l,...d}=t,i=$(re,e),c=G(re,e),s=$e(re,e),u=Vt(re,e),[g,y]=o.useState(null),N=L(r,h=>y(h),s.onItemTextChange,h=>{var p;return(p=c.itemTextRefCallback)==null?void 0:p.call(c,h,s.value,s.disabled)}),T=g==null?void 0:g.textContent,m=o.useMemo(()=>n.jsx("option",{value:s.value,disabled:s.disabled,children:T},s.value),[s.disabled,s.value,T]),{onNativeOptionAdd:v,onNativeOptionRemove:I}=u;return U(()=>(v(m),()=>I(m)),[v,I,m]),n.jsxs(n.Fragment,{children:[n.jsx(M.span,{id:s.textId,...d,ref:N}),s.isSelected&&i.valueNode&&!i.valueNodeHasChildren?Re.createPortal(d.children,i.valueNode):null]})});ze.displayName=re;var qe="SelectItemIndicator",Ye=o.forwardRef((t,r)=>{const{__scopeSelect:e,...a}=t;return $e(qe,e).isSelected?n.jsx(M.span,{"aria-hidden":!0,...a,ref:r}):null});Ye.displayName=qe;var we="SelectScrollUpButton",Xe=o.forwardRef((t,r)=>{const e=G(we,t.__scopeSelect),a=be(we,t.__scopeSelect),[l,d]=o.useState(!1),i=L(r,a.onScrollButtonChange);return U(()=>{if(e.viewport&&e.isPositioned){let c=function(){const u=s.scrollTop>0;d(u)};const s=e.viewport;return c(),s.addEventListener("scroll",c),()=>s.removeEventListener("scroll",c)}},[e.viewport,e.isPositioned]),l?n.jsx(Je,{...t,ref:i,onAutoScroll:()=>{const{viewport:c,selectedItem:s}=e;c&&s&&(c.scrollTop=c.scrollTop-s.offsetHeight)}}):null});Xe.displayName=we;var ye="SelectScrollDownButton",Ze=o.forwardRef((t,r)=>{const e=G(ye,t.__scopeSelect),a=be(ye,t.__scopeSelect),[l,d]=o.useState(!1),i=L(r,a.onScrollButtonChange);return U(()=>{if(e.viewport&&e.isPositioned){let c=function(){const u=s.scrollHeight-s.clientHeight,g=Math.ceil(s.scrollTop)<u;d(g)};const s=e.viewport;return c(),s.addEventListener("scroll",c),()=>s.removeEventListener("scroll",c)}},[e.viewport,e.isPositioned]),l?n.jsx(Je,{...t,ref:i,onAutoScroll:()=>{const{viewport:c,selectedItem:s}=e;c&&s&&(c.scrollTop=c.scrollTop+s.offsetHeight)}}):null});Ze.displayName=ye;var Je=o.forwardRef((t,r)=>{const{__scopeSelect:e,onAutoScroll:a,...l}=t,d=G("SelectScrollButton",e),i=o.useRef(null),c=de(e),s=o.useCallback(()=>{i.current!==null&&(window.clearInterval(i.current),i.current=null)},[]);return o.useEffect(()=>()=>s(),[s]),U(()=>{var g;const u=c().find(y=>y.ref.current===document.activeElement);(g=u==null?void 0:u.ref.current)==null||g.scrollIntoView({block:"nearest"})},[c]),n.jsx(M.div,{"aria-hidden":!0,...l,ref:r,style:{flexShrink:0,...l.style},onPointerDown:R(l.onPointerDown,()=>{i.current===null&&(i.current=window.setInterval(a,50))}),onPointerMove:R(l.onPointerMove,()=>{var u;(u=d.onItemLeave)==null||u.call(d),i.current===null&&(i.current=window.setInterval(a,50))}),onPointerLeave:R(l.onPointerLeave,()=>{s()})})}),Yt="SelectSeparator",Qe=o.forwardRef((t,r)=>{const{__scopeSelect:e,...a}=t;return n.jsx(M.div,{"aria-hidden":!0,...a,ref:r})});Qe.displayName=Yt;var Ce="SelectArrow",Xt=o.forwardRef((t,r)=>{const{__scopeSelect:e,...a}=t,l=ue(e),d=$(Ce,e),i=G(Ce,e);return d.open&&i.position==="popper"?n.jsx(It,{...l,...a,ref:r}):null});Xt.displayName=Ce;function et(t){return t===""||t===void 0}var tt=o.forwardRef((t,r)=>{const{value:e,...a}=t,l=o.useRef(null),d=L(r,l),i=At(e);return o.useEffect(()=>{const c=l.current,s=window.HTMLSelectElement.prototype,g=Object.getOwnPropertyDescriptor(s,"value").set;if(i!==e&&g){const y=new Event("change",{bubbles:!0});g.call(c,e),c.dispatchEvent(y)}},[i,e]),n.jsx(bt,{asChild:!0,children:n.jsx("select",{...a,ref:d,defaultValue:e})})});tt.displayName="BubbleSelect";function ot(t){const r=Tt(t),e=o.useRef(""),a=o.useRef(0),l=o.useCallback(i=>{const c=e.current+i;r(c),function s(u){e.current=u,window.clearTimeout(a.current),u!==""&&(a.current=window.setTimeout(()=>s(""),1e3))}(c)},[r]),d=o.useCallback(()=>{e.current="",window.clearTimeout(a.current)},[]);return o.useEffect(()=>()=>window.clearTimeout(a.current),[]),[e,l,d]}function nt(t,r,e){const l=r.length>1&&Array.from(r).every(u=>u===r[0])?r[0]:r,d=e?t.indexOf(e):-1;let i=Zt(t,Math.max(d,0));l.length===1&&(i=i.filter(u=>u!==e));const s=i.find(u=>u.textValue.toLowerCase().startsWith(l.toLowerCase()));return s!==e?s:void 0}function Zt(t,r){return t.map((e,a)=>t[(r+a)%t.length])}var Jt=Ee,rt=je,Qt=Ae,eo=Oe,to=De,st=Le,oo=He,no=We,at=Ke,lt=Ge,ro=ze,so=Ye,ct=Xe,it=Ze,dt=Qe;const ho=Jt,vo=no,go=Qt,ao=o.forwardRef(({className:t,children:r,...e},a)=>n.jsxs(rt,{ref:a,className:K("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",t),...e,children:[r,n.jsx(eo,{asChild:!0,children:n.jsx(Et,{className:"h-4 w-4 opacity-50"})})]}));ao.displayName=rt.displayName;const ut=o.forwardRef(({className:t,...r},e)=>n.jsx(ct,{ref:e,className:K("flex cursor-default items-center justify-center py-1",t),...r,children:n.jsx(_t,{})}));ut.displayName=ct.displayName;const pt=o.forwardRef(({className:t,...r},e)=>n.jsx(it,{ref:e,className:K("flex cursor-default items-center justify-center py-1",t),...r,children:n.jsx(jt,{})}));pt.displayName=it.displayName;const lo=o.forwardRef(({className:t,children:r,position:e="popper",...a},l)=>n.jsx(to,{children:n.jsxs(st,{ref:l,className:K("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e==="popper"&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",t),position:e,...a,children:[n.jsx(ut,{}),n.jsx(oo,{className:K("p-1",e==="popper"&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:r}),n.jsx(pt,{})]})}));lo.displayName=st.displayName;const co=o.forwardRef(({className:t,...r},e)=>n.jsx(at,{ref:e,className:K("px-2 py-1.5 text-sm font-semibold",t),...r}));co.displayName=at.displayName;const io=o.forwardRef(({className:t,children:r,...e},a)=>n.jsxs(lt,{ref:a,className:K("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",t),...e,children:[n.jsx("span",{className:"absolute right-2 flex h-3.5 w-3.5 items-center justify-center",children:n.jsx(so,{children:n.jsx(Mt,{className:"h-4 w-4"})})}),n.jsx(ro,{children:r})]}));io.displayName=lt.displayName;const uo=o.forwardRef(({className:t,...r},e)=>n.jsx(dt,{ref:e,className:K("-mx-1 my-1 h-px bg-muted",t),...r}));uo.displayName=dt.displayName;export{ho as S,ao as a,go as b,lo as c,vo as d,co as e,io as f,Ke as g};
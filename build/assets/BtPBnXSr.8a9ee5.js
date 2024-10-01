import{e as l,b as p,r as x,j as s,B as h,_ as u}from"./DMBStb6S.8a9ee5.js";import{P as j,e as C,f,g,i as k,k as v,l as i,m as y}from"./BwNKJdIh.8a9ee5.js";import{u as B,A as b}from"./D4ztqDIK.8a9ee5.js";/**
 * @license lucide-react v0.396.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=l("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.396.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=l("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);function A({item:t,size:c}){var n;const{addItemToCollection:o,collections:a}=B(),{activated:d}=p(),m=x.useCallback(e=>{o(t,e)},[t,o]);return s.jsxs(j,{children:[s.jsx(C,{asChild:!0,disabled:!d,children:s.jsx(h,{variant:((n=t.collections)==null?void 0:n.length)>0?"secondary":"outline",size:c,className:"flex items-center gap-2",children:s.jsx(E,{width:16})})}),s.jsx(f,{children:s.jsx(g,{children:s.jsxs(k,{children:[s.jsx(v,{heading:u("List"),children:a&&a.data.length>0?a.data.map(e=>{var r;return s.jsxs(i,{className:"flex cursor-pointer flex-row justify-between gap-2",onSelect:()=>{m(e)},children:[s.jsx("span",{children:wp.htmlEntities.decodeEntities(e.title)}),(r=t.collections)!=null&&r.includes(e.id)?s.jsx(w,{size:16}):null]},e.id)}):null}),s.jsx(y,{}),s.jsx(i,{children:s.jsx(b,{})})]})})})]})}export{w as C,A as a};

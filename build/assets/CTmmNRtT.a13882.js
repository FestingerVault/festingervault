import{d as r,a as h,j as e,B as x,_ as u}from"./Dm49ESlh.a13882.js";import{P as j,e as C,f,g,i as k,k as v,l,m as F}from"./Dmo69s_6.a13882.js";import{u as w,A as y}from"./DgwjB8a_.a13882.js";/**
 * @license lucide-react v0.396.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=r("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.396.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=r("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);function A({item:s,size:c}){var o;const{addItemToCollection:n,collections:a}=w(),{activated:d,active:m}=h(),p=wp.element.useCallback(t=>{n(s,t)},[s,n]);return e.jsxs(j,{children:[e.jsx(C,{asChild:!0,disabled:!d||!m,children:e.jsx(x,{variant:((o=s.collections)==null?void 0:o.length)>0?"secondary":"outline",size:c,className:"flex items-center gap-2",children:e.jsx(I,{width:16})})}),e.jsx(f,{children:e.jsx(g,{children:e.jsxs(k,{children:[e.jsx(v,{heading:u("List"),children:a&&a.data.length>0?a.data.map(t=>{var i;return e.jsxs(l,{className:"flex cursor-pointer flex-row justify-between gap-2",onSelect:()=>{p(t)},children:[e.jsx("span",{children:wp.htmlEntities.decodeEntities(t.title)}),(i=s.collections)!=null&&i.includes(t.id)?e.jsx(B,{size:16}):null]},t.id)}):null}),e.jsx(F,{}),e.jsx(l,{children:e.jsx(y,{})})]})})})]})}function E(s){return`https://placehold.co/800x450/555555/FFFFFF/jpg?text=${encodeURIComponent(s)}`}export{B as C,A as a,E as p};

import{c as l,a as m,P as f}from"./chunk-OPEUWD42-f06e2be0.js";import{s as d}from"./index-d475d2ea.js";var O=(...r)=>{let e=l,t=r;t.length===1&&Array.isArray(t[0])&&([t]=t),t.length!==1&&typeof t[t.length-1]!="string"&&(e={...l,...t.pop()});let n=t[0];(t.length!==1||typeof n=="string")&&(n={},t.forEach(o=>{n[o]=o}));let a={};return Object.keys(n).forEach(o=>{a[o]=m(n[o],e)}),a};const{makeDecorator:g,useEffect:u}=__STORYBOOK_MODULE_PREVIEW_API__;var{document:i,Element:h}=d,y=/^(\S+)\s*(.*)$/,_=h!=null&&!h.prototype.matches,v=_?"msMatchesSelector":"matches",p=(r,e)=>{if(r[v](e))return!0;let t=r.parentElement;return t?p(t,e):!1},A=(r,...e)=>{let t=r(...e);return Object.entries(t).map(([n,a])=>{let[o,E,s]=n.match(y)||[];return{eventName:E,handler:c=>{(!s||p(c.target,s))&&a(c)}}})},b=(r,...e)=>{let t=i&&i.getElementById("storybook-root");u(()=>{if(t!=null){let n=A(r,...e);return n.forEach(({eventName:a,handler:o})=>t.addEventListener(a,o)),()=>n.forEach(({eventName:a,handler:o})=>t.removeEventListener(a,o))}},[t,r,e])},M=g({name:"withActions",parameterName:f,skipIfNoParametersOrOptions:!0,wrapper:(r,e,{parameters:t})=>(t!=null&&t.handles&&b(O,...t.handles),r(e))});export{M as w};
//# sourceMappingURL=decorator-91469e55.js.map

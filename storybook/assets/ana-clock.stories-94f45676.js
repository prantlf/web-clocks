import{w as Ee}from"./decorator-91469e55.js";let O,ye;function y(){}function q(e){return e()}function I(){return Object.create(null)}function H(e){e.forEach(q)}function V(e){return typeof e=="function"}function Me(e,n){return e!=e?n==n:e!==n}function Ne(e){return Object.keys(e).length===0}let Ae=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function j(e,n){e.appendChild(n)}function k(e,n,t){e.insertBefore(n,t||null)}function $(e){e.parentNode&&e.parentNode.removeChild(e)}function we(e,n){for(let t=0;t<e.length;t+=1)e[t]&&e[t].d(n)}function p(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function je(e){return document.createTextNode(e)}function B(){return je("")}function l(e,n,t){t==null?e.removeAttribute(n):e.getAttribute(n)!==t&&e.setAttribute(n,t)}function De(e){return Array.from(e.childNodes)}function Oe(e){let n={};for(let t of e)n[t.name]=t.value;return n}function D(e){O=e}function xe(){if(!O)throw Error("Function called outside component initialization");return O}function He(e){xe().$$.on_mount.push(e)}"WeakMap"in Ae;let _=[],L=[],w=[],P=[],ve=Promise.resolve(),z=!1;function Ce(){z||(z=!0,ve.then(b))}function U(){return Ce(),ve}function W(e){w.push(e)}let F=new Set,g=0;function b(){if(g!==0)return;let e=O;do{try{for(;g<_.length;){let n=_[g];g++,D(n),Ue(n.$$)}}catch(n){throw _.length=0,g=0,n}for(D(null),_.length=0,g=0;L.length;)L.pop()();for(let n=0;n<w.length;n+=1){let t=w[n];F.has(t)||(F.add(t),t())}w.length=0}while(_.length);for(;P.length;)P.pop()();z=!1,F.clear(),D(e)}function Ue(e){if(e.fragment!==null){e.update(),H(e.before_update);let n=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,n),e.after_update.forEach(W)}}function Fe(e){let n=[],t=[];w.forEach(r=>e.indexOf(r)===-1?n.push(r):t.push(r)),t.forEach(r=>r()),w=n}let Ve=new Set;function ze(e,n){e&&e.i&&(Ve.delete(e),e.i(n))}function We(e,n,t,r){let{fragment:o,after_update:s}=e.$$;o&&o.m(n,t),r||W(()=>{let a=e.$$.on_mount.map(q).filter(V);e.$$.on_destroy?e.$$.on_destroy.push(...a):H(a),e.$$.on_mount=[]}),s.forEach(W)}function qe(e,n){let t=e.$$;t.fragment!==null&&(Fe(t.after_update),H(t.on_destroy),t.fragment&&t.fragment.d(n),t.on_destroy=t.fragment=null,t.ctx=[])}function Be(e,n){e.$$.dirty[0]===-1&&(_.push(e),Ce(),e.$$.dirty.fill(0)),e.$$.dirty[n/31|0]|=1<<n%31}function Ie(e,n,t,r,o,s,a,i=[-1]){let d=O;D(e);let c=e.$$={fragment:null,ctx:[],props:s,update:y,not_equal:o,bound:I(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(d?d.$$.context:[])),callbacks:I(),dirty:i,skip_bound:!1,root:n.target||d.$$.root};a&&a(c.root);let u=!1;if(c.ctx=t?t(e,n.props||{},(f,x,...m)=>{let v=m.length?m[0]:x;return c.ctx&&o(c.ctx[f],c.ctx[f]=v)&&(!c.skip_bound&&c.bound[f]&&c.bound[f](v),u&&Be(e,f)),x}):[],c.update(),u=!0,H(c.before_update),c.fragment=!!r&&r(c.ctx),n.target){if(n.hydrate){let f=De(n.target);c.fragment&&c.fragment.l(f),f.forEach($)}else c.fragment&&c.fragment.c();n.intro&&ze(e.$$.fragment),We(e,n.target,n.anchor,n.customElement),b()}D(d)}function Le(e,n){let t=new CustomEvent("tick",{detail:n,bubbles:!0,cancelable:!0,composed:!0});e.dispatchEvent(t)}typeof HTMLElement=="function"&&(ye=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{on_mount:e}=this.$$;for(let n in this.$$.on_disconnect=e.map(q).filter(V),this.$$.slotted)this.appendChild(this.$$.slotted[n])}attributeChangedCallback(e,n,t){this[e]=t}disconnectedCallback(){H(this.$$.on_disconnect)}$destroy(){qe(this,1),this.$destroy=y}$on(e,n){if(!V(n))return y;let t=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return t.push(n),()=>{let r=t.indexOf(n);r!==-1&&t.splice(r,1)}}$set(e){this.$$set&&!Ne(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}});let R=-new Date().getTimezoneOffset();function Pe(e){return e.length===0&&(e=R),new Date(Date.now()+(+e-R)*6e4)}function Z(e,n,t){let r=e.slice();return r[14]=n[t],r}function G(e,n,t){let r=e.slice();return r[2]=n[t],r}function J(e){let n,t=e[3],r=[];for(let o=0;o<t.length;o+=1)r[o]=X(Z(e,t,o));return{c(){for(let o=0;o<r.length;o+=1)r[o].c();n=B()},m(o,s){for(let a=0;a<r.length;a+=1)r[a]&&r[a].m(o,s);k(o,n,s)},p(o,s){if(10&s){let a;for(a=0,t=o[3];a<t.length;a+=1){let i=Z(o,t,a);r[a]?r[a].p(i,s):(r[a]=X(i),r[a].c(),r[a].m(n.parentNode,n))}for(;a<r.length;a+=1)r[a].d(1);r.length=t.length}},d(o){we(r,o),o&&$(n)}}}function K(e){let n,t=[1,2,3,4],r=[];for(let o=0;o<4;o+=1)r[o]=Q(G(e,t,o));return{c(){for(let o=0;o<4;o+=1)r[o].c();n=B()},m(o,s){for(let a=0;a<4;a+=1)r[a]&&r[a].m(o,s);k(o,n,s)},p(o,s){if(8&s){let a;for(a=0,t=[1,2,3,4];a<4;a+=1){let i=G(o,t,a);r[a]?r[a].p(i,s):(r[a]=Q(i),r[a].c(),r[a].m(n.parentNode,n))}for(;a<4;a+=1)r[a].d(1)}},d(o){we(r,o),o&&$(n)}}}function Q(e){let n,t;return{c(){l(n=p("line"),"class","minor"),l(n,"y1","42"),l(n,"y2","45"),l(n,"transform",t="rotate("+6*(e[14]+e[2])+")")},m(r,o){k(r,n,o)},p(r,o){8&o&&t!==(t="rotate("+6*(r[14]+r[2])+")")&&l(n,"transform",t)},d(r){r&&$(n)}}}function X(e){let n,t,r,o=e[1]==="sixty"&&K(e);return{c(){n=p("line"),o&&o.c(),r=B(),l(n,"class","major"),l(n,"y1","35"),l(n,"y2","45"),l(n,"transform",t="rotate("+30*e[14]+")")},m(s,a){k(s,n,a),o&&o.m(s,a),k(s,r,a)},p(s,a){8&a&&t!==(t="rotate("+30*s[14]+")")&&l(n,"transform",t),s[1]==="sixty"?o?o.p(s,a):((o=K(s)).c(),o.m(r.parentNode,r)):o&&(o.d(1),o=null)},d(s){s&&$(n),o&&o.d(s),s&&$(r)}}}function Y(e){let n,t,r,o;return{c(){n=p("g"),t=p("line"),r=p("line"),l(t,"class","second"),l(t,"y1","10"),l(t,"y2","-38"),l(r,"class","second-counterweight"),l(r,"y1","10"),l(r,"y2","2"),l(n,"transform",o="rotate("+6*e[4]+")")},m(s,a){k(s,n,a),j(n,t),j(n,r)},p(s,a){16&a&&o!==(o="rotate("+6*s[4]+")")&&l(n,"transform",o)},d(s){s&&$(n)}}}function Re(e){let n,t,r,o,s,a,i=e[1]!=="none"&&J(e),d=e[0]==="true"&&Y(e);return{c(){n=p("svg"),t=p("circle"),i&&i.c(),r=p("line"),s=p("line"),d&&d.c(),this.c=y,l(t,"class","clock-face"),l(t,"r","48"),l(r,"class","hour"),l(r,"y1","2"),l(r,"y2","-20"),l(r,"transform",o="rotate("+(30*e[6]+e[5]/2)+")"),l(s,"class","minute"),l(s,"y1","4"),l(s,"y2","-30"),l(s,"transform",a="rotate("+(6*e[5]+e[4]/10)+")"),l(n,"viewBox","-50 -50 100 100")},m(c,u){k(c,n,u),j(n,t),i&&i.m(n,null),j(n,r),j(n,s),d&&d.m(n,null)},p(c,[u]){c[1]!=="none"?i?i.p(c,u):((i=J(c)).c(),i.m(n,r)):i&&(i.d(1),i=null),96&u&&o!==(o="rotate("+(30*c[6]+c[5]/2)+")")&&l(r,"transform",o),48&u&&a!==(a="rotate("+(6*c[5]+c[4]/10)+")")&&l(s,"transform",a),c[0]==="true"?d?d.p(c,u):((d=Y(c)).c(),d.m(n,null)):d&&(d.d(1),d=null)},i:y,o:y,d(c){c&&$(n),i&&i.d(),d&&d.d()}}}function Ze(e,n,t){let r,o,s,a,i,{secondhand:d="true"}=n,{markers:c="sixty"}=n,{offset:u=""}=n,f=xe(),x=()=>Pe(u),m=x();function v(){t(9,m=x()),Le(f,m)}return He(async()=>{await U(),v();let h=0,Se=setInterval(()=>{if(!i){if(d!=="true"){if(++h<60)return;h=0}v()}},1e3);return()=>clearInterval(Se)}),e.$$set=h=>{"secondhand"in h&&t(0,d=h.secondhand),"markers"in h&&t(1,c=h.markers),"offset"in h&&t(2,u=h.offset)},e.$$.update=()=>{1&e.$$.dirty&&U().then(()=>f.setAttribute("secondhand",d)),2&e.$$.dirty&&U().then(()=>f.setAttribute("markers",c)),4&e.$$.dirty&&U().then(()=>f.setAttribute("offset",u)),512&e.$$.dirty&&t(6,r=m.getHours()),512&e.$$.dirty&&t(5,o=m.getMinutes()),512&e.$$.dirty&&t(4,s=m.getSeconds()),2&e.$$.dirty&&t(3,a=c==="four"?[0,15,30,45]:[0,5,10,15,20,25,30,35,40,45,50,55])},[d,c,u,a,s,o,r,function(){i=!0},function(){i=!1},m]}class Te extends ye{constructor(n){super();let t=document.createElement("style");t.textContent=":host{display:block}svg{width:100%;height:100%}.clock-face{stroke:#333;fill:white}.minor{stroke:#999;stroke-width:0.5}.major{stroke:#333;stroke-width:1}.hour{stroke:#333}.minute{stroke:#666}.second,.second-counterweight{stroke:rgb(180,0,0)}.second-counterweight{stroke-width:3}",this.shadowRoot.appendChild(t),Ie(this,{target:this.shadowRoot,props:Oe(this.attributes),customElement:!0},Ze,Re,Me,{secondhand:0,markers:1,offset:2,stop:7,restart:8},null),n&&(n.target&&k(n.target,this,n.anchor),n.props&&(this.$set(n.props),b()))}static get observedAttributes(){return["secondhand","markers","offset","stop","restart"]}get secondhand(){return this.$$.ctx[0]}set secondhand(n){this.$$set({secondhand:n}),b()}get markers(){return this.$$.ctx[1]}set markers(n){this.$$set({markers:n}),b()}get offset(){return this.$$.ctx[2]}set offset(n){this.$$set({offset:n}),b()}get stop(){return this.$$.ctx[7]}get restart(){return this.$$.ctx[8]}}customElements.define("ana-clock",Te);const Ge={title:"Components/AnaClock",component:Te,parameters:{actions:{handles:["tick"]},controls:{disable:!0,expanded:!0,hideNoControlsWarning:!0}},decorators:[Ee]},C={args:{name:"Default",primary:!0},render:()=>`
<ana-clock></ana-clock>
`},T={render:()=>`
<ana-clock markers=twelve></ana-clock>
`,name:"Twelve Markers"},S={render:()=>`
<ana-clock markers=four></ana-clock>
`,name:"Four Markers"},E={render:()=>`
<ana-clock markers=none></ana-clock>
`,name:"No Markers"},M={render:()=>`
<ana-clock secondhand=false></ana-clock>
`,name:"No Second Hand"},N={render:()=>`
<ana-clock offset=60></ana-clock>
`,name:"Use CET TZ"},A={render:({secondhand:e,markers:n,offset:t})=>`
  <ana-clock secondhand=${e} markers=${n} offset=${t}></ana-clock>
`,name:"Configurable",argTypes:{secondhand:{description:"disables the second hand",control:"boolean",table:{defaultValue:{summary:!0}}},markers:{description:"chooses the density of markers",control:"radio",options:["sixty","twelve,","four","none"],table:{defaultValue:{summary:"sixty"}}},offset:{description:"adds the offset in minutes to UTC",control:{type:"number",min:-720,max:720,step:30},table:{defaultValue:{summary:0}}},onTick:{description:"when the second or the minute hand moves",action:"tick"}},args:{secondhand:!0,markers:"sixty",offset:0},parameters:{controls:{disable:!1}}};var ee,ne,te;C.parameters={...C.parameters,docs:{...(ee=C.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    name: 'Default',
    primary: true
  },
  // parameters: {
  //   docs: {
  //     story: { inline: true },
  //     canvas: { sourceState: 'shown' },
  //     source: { type: 'code' }
  //   }
  // },
  render: () => \`
<ana-clock></ana-clock>
\`
}`,...(te=(ne=C.parameters)==null?void 0:ne.docs)==null?void 0:te.source}}};var re,oe,ae;T.parameters={...T.parameters,docs:{...(re=T.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: () => \`
<ana-clock markers=twelve></ana-clock>
\`,
  name: 'Twelve Markers'
}`,...(ae=(oe=T.parameters)==null?void 0:oe.docs)==null?void 0:ae.source}}};var se,ce,le;S.parameters={...S.parameters,docs:{...(se=S.parameters)==null?void 0:se.docs,source:{originalSource:`{
  render: () => \`
<ana-clock markers=four></ana-clock>
\`,
  name: 'Four Markers'
}`,...(le=(ce=S.parameters)==null?void 0:ce.docs)==null?void 0:le.source}}};var ie,de,ue;E.parameters={...E.parameters,docs:{...(ie=E.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: () => \`
<ana-clock markers=none></ana-clock>
\`,
  name: 'No Markers'
}`,...(ue=(de=E.parameters)==null?void 0:de.docs)==null?void 0:ue.source}}};var fe,me,he;M.parameters={...M.parameters,docs:{...(fe=M.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  render: () => \`
<ana-clock secondhand=false></ana-clock>
\`,
  name: 'No Second Hand'
}`,...(he=(me=M.parameters)==null?void 0:me.docs)==null?void 0:he.source}}};var pe,ke,$e;N.parameters={...N.parameters,docs:{...(pe=N.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  render: () => \`
<ana-clock offset=60></ana-clock>
\`,
  name: 'Use CET TZ'
}`,...($e=(ke=N.parameters)==null?void 0:ke.docs)==null?void 0:$e.source}}};var ge,_e,be;A.parameters={...A.parameters,docs:{...(ge=A.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  render: ({
    secondhand,
    markers,
    offset
  }) => \`
  <ana-clock secondhand=\${secondhand} markers=\${markers} offset=\${offset}></ana-clock>
\`,
  name: 'Configurable',
  argTypes: {
    secondhand: {
      description: 'disables the second hand',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: true
        }
      }
    },
    markers: {
      description: 'chooses the density of markers',
      control: 'radio',
      options: ['sixty', 'twelve,', 'four', 'none'],
      table: {
        defaultValue: {
          summary: 'sixty'
        }
      }
    },
    offset: {
      description: 'adds the offset in minutes to UTC',
      control: {
        type: 'number',
        min: -720,
        max: 720,
        step: 30
      },
      table: {
        defaultValue: {
          summary: 0
        }
      }
    },
    onTick: {
      description: 'when the second or the minute hand moves',
      action: 'tick'
    }
  },
  args: {
    secondhand: true,
    markers: 'sixty',
    offset: 0
  },
  parameters: {
    controls: {
      disable: false
    }
  }
}`,...(be=(_e=A.parameters)==null?void 0:_e.docs)==null?void 0:be.source}}};const Je=["Default","TwelveMarkers","FourMarkers","NoMarkers","NoSecondHand","UseCetTz","Configurable"],Qe=Object.freeze(Object.defineProperty({__proto__:null,Configurable:A,Default:C,FourMarkers:S,NoMarkers:E,NoSecondHand:M,TwelveMarkers:T,UseCetTz:N,__namedExportsOrder:Je,default:Ge},Symbol.toStringTag,{value:"Module"}));export{Qe as A,C as D,S as F,E as N,T,N as U,M as a};
//# sourceMappingURL=ana-clock.stories-94f45676.js.map

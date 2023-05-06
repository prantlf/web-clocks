import{w as ae}from"./decorator-91469e55.js";let S,te;function $(){}function V(e){return e()}function H(){return Object.create(null)}function v(e){e.forEach(V)}function U(e){return typeof e=="function"}function ie(e,t){return e!=e?t==t:e!==t}function le(e){return Object.keys(e).length===0}let ue=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function f(e,t,n){e.insertBefore(t,n||null)}function p(e){e.parentNode&&e.parentNode.removeChild(e)}function ne(e){return document.createElement(e)}function D(e){return document.createTextNode(e)}function de(){return D("")}function fe(e){return Array.from(e.childNodes)}function j(e,t){t=""+t,e.data!==t&&(e.data=t)}function pe(e){let t={};for(let n of e)t[n.name]=n.value;return t}function E(e){S=e}function oe(){if(!S)throw Error("Function called outside component initialization");return S}function me(e){oe().$$.on_mount.push(e)}"WeakMap"in ue;let h=[],W=[],_=[],q=[],re=Promise.resolve(),z=!1;function se(){z||(z=!0,re.then(T))}function M(){return se(),re}function A(e){_.push(e)}let O=new Set,m=0;function T(){if(m!==0)return;let e=S;do{try{for(;m<h.length;){let t=h[m];m++,E(t),he(t.$$)}}catch(t){throw h.length=0,m=0,t}for(E(null),h.length=0,m=0;W.length;)W.pop()();for(let t=0;t<_.length;t+=1){let n=_[t];O.has(n)||(O.add(n),n())}_.length=0}while(h.length);for(;q.length;)q.pop()();z=!1,O.clear(),E(e)}function he(e){if(e.fragment!==null){e.update(),v(e.before_update);let t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(A)}}function ge(e){let t=[],n=[];_.forEach(s=>e.indexOf(s)===-1?t.push(s):n.push(s)),n.forEach(s=>s()),_=t}let $e=new Set;function _e(e,t){e&&e.i&&($e.delete(e),e.i(t))}function be(e,t,n,s){let{fragment:c,after_update:i}=e.$$;c&&c.m(t,n),s||A(()=>{let u=e.$$.on_mount.map(V).filter(U);e.$$.on_destroy?e.$$.on_destroy.push(...u):v(u),e.$$.on_mount=[]}),i.forEach(A)}function ke(e,t){let n=e.$$;n.fragment!==null&&(ge(n.after_update),v(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function ye(e,t){e.$$.dirty[0]===-1&&(h.push(e),se(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function xe(e,t,n,s,c,i,u,a=[-1]){let r=S;E(e);let o=e.$$={fragment:null,ctx:[],props:i,update:$,not_equal:c,bound:H(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(r?r.$$.context:[])),callbacks:H(),dirty:a,skip_bound:!1,root:t.target||r.$$.root};u&&u(o.root);let b=!1;if(o.ctx=n?n(e,t.props||{},(l,k,...d)=>{let N=d.length?d[0]:k;return o.ctx&&c(o.ctx[l],o.ctx[l]=N)&&(!o.skip_bound&&o.bound[l]&&o.bound[l](N),b&&ye(e,l)),k}):[],o.update(),b=!0,v(o.before_update),o.fragment=!!s&&s(o.ctx),t.target){if(t.hydrate){let l=fe(t.target);o.fragment&&o.fragment.l(l),l.forEach(p)}else o.fragment&&o.fragment.c();t.intro&&_e(e.$$.fragment),be(e,t.target,t.anchor,t.customElement),T()}E(r)}function we(e,t){let n=new CustomEvent("tick",{detail:t,bubbles:!0,cancelable:!0,composed:!0});e.dispatchEvent(n)}typeof HTMLElement=="function"&&(te=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{on_mount:e}=this.$$;for(let t in this.$$.on_disconnect=e.map(V).filter(U),this.$$.slotted)this.appendChild(this.$$.slotted[t])}attributeChangedCallback(e,t,n){this[e]=n}disconnectedCallback(){v(this.$$.on_disconnect)}$destroy(){ke(this,1),this.$destroy=$}$on(e,t){if(!U(t))return $;let n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{let s=n.indexOf(t);s!==-1&&n.splice(s,1)}}$set(e){this.$$set&&!le(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}});let I=-new Date().getTimezoneOffset();function Ce(e){return e.length===0&&(e=I),new Date(Date.now()+(+e-I)*6e4)}function g(e){return e<10?`0${e}`:e}function L(e){let t,n,s=g(e[1])+"";return{c(){(t=ne("span")).textContent=":",n=D(s)},m(c,i){f(c,t,i),f(c,n,i)},p(c,i){2&i&&s!==(s=g(c[1])+"")&&j(n,s)},d(c){c&&p(t),c&&p(n)}}}function Ee(e){let t,n,s,c,i=g(e[3])+"",u=g(e[2])+"",a=e[0]==="true"&&L(e);return{c(){t=D(i),(n=ne("span")).textContent=":",s=D(u),a&&a.c(),c=de(),this.c=$},m(r,o){f(r,t,o),f(r,n,o),f(r,s,o),a&&a.m(r,o),f(r,c,o)},p(r,[o]){8&o&&i!==(i=g(r[3])+"")&&j(t,i),4&o&&u!==(u=g(r[2])+"")&&j(s,u),r[0]==="true"?a?a.p(r,o):((a=L(r)).c(),a.m(c.parentNode,c)):a&&(a.d(1),a=null)},i:$,o:$,d(r){r&&p(t),r&&p(n),r&&p(s),a&&a.d(r),r&&p(c)}}}function Te(e,t,n){let s,c,i,u,{seconds:a="true"}=t,{offset:r=""}=t,o=oe(),b=()=>Ce(r),l=b();function k(){n(7,l=b()),we(o,l)}return me(async()=>{await M(),k();let d=0,N=setInterval(()=>{if(!u){if(a!=="true"){if(++d<60)return;d=0}k()}},1e3);return()=>clearInterval(N)}),e.$$set=d=>{"seconds"in d&&n(0,a=d.seconds),"offset"in d&&n(4,r=d.offset)},e.$$.update=()=>{1&e.$$.dirty&&M().then(()=>o.setAttribute("seconds",a)),16&e.$$.dirty&&M().then(()=>o.setAttribute("offset",r)),128&e.$$.dirty&&n(3,s=l.getHours()),128&e.$$.dirty&&n(2,c=l.getMinutes()),128&e.$$.dirty&&n(1,i=l.getSeconds())},[a,i,c,s,r,function(){u=!0},function(){u=!1},l]}class ce extends te{constructor(t){super(),xe(this,{target:this.shadowRoot,props:pe(this.attributes),customElement:!0},Te,Ee,ie,{seconds:0,offset:4,stop:5,restart:6},null),t&&(t.target&&f(t.target,this,t.anchor),t.props&&(this.$set(t.props),T()))}static get observedAttributes(){return["seconds","offset","stop","restart"]}get seconds(){return this.$$.ctx[0]}set seconds(t){this.$$set({seconds:t}),T()}get offset(){return this.$$.ctx[4]}set offset(t){this.$$set({offset:t}),T()}get stop(){return this.$$.ctx[5]}get restart(){return this.$$.ctx[6]}}customElements.define("digi-clock",ce);const Se={title:"Components/DigiClock",component:ce,parameters:{actions:{handles:["tick"]},controls:{disable:!0,expanded:!0,hideNoControlsWarning:!0}},decorators:[ae]},y={args:{name:"Default",primary:!0},render:()=>`
<digi-clock></digi-clock>
`},x={render:()=>`
<digi-clock seconds=false></digi-clock>
`,name:"No Seconds"},w={render:()=>`
<digi-clock offset=-300></digi-clock>
`,name:"Use EST TZ"},C={render:({seconds:e,offset:t})=>`
<digi-clock seconds=${e} offset=${t}></digi-clock>
`,name:"Configurable",argTypes:{seconds:{description:"disables the second part",control:"boolean",table:{defaultValue:{summary:!0}}},offset:{description:"adds the offset in minutes to UTC",control:{type:"number",min:-720,max:720,step:30},table:{defaultValue:{summary:0}}},onTick:{description:"when the second or the minute hand moves",action:"tick"}},args:{seconds:!0,offset:0},parameters:{controls:{disable:!1}}};var P,Z,B;y.parameters={...y.parameters,docs:{...(P=y.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
<digi-clock></digi-clock>
\`
}`,...(B=(Z=y.parameters)==null?void 0:Z.docs)==null?void 0:B.source}}};var F,R,G;x.parameters={...x.parameters,docs:{...(F=x.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => \`
<digi-clock seconds=false></digi-clock>
\`,
  name: 'No Seconds'
}`,...(G=(R=x.parameters)==null?void 0:R.docs)==null?void 0:G.source}}};var J,K,Q;w.parameters={...w.parameters,docs:{...(J=w.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => \`
<digi-clock offset=-300></digi-clock>
\`,
  name: 'Use EST TZ'
}`,...(Q=(K=w.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var X,Y,ee;C.parameters={...C.parameters,docs:{...(X=C.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: ({
    seconds,
    offset
  }) => \`
<digi-clock seconds=\${seconds} offset=\${offset}></digi-clock>
\`,
  name: 'Configurable',
  argTypes: {
    seconds: {
      description: 'disables the second part',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: true
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
    seconds: true,
    offset: 0
  },
  parameters: {
    controls: {
      disable: false
    }
  }
}`,...(ee=(Y=C.parameters)==null?void 0:Y.docs)==null?void 0:ee.source}}};const ve=["Default","NoSeconds","UseEstTz","Configurable"],De=Object.freeze(Object.defineProperty({__proto__:null,Configurable:C,Default:y,NoSeconds:x,UseEstTz:w,__namedExportsOrder:ve,default:Se},Symbol.toStringTag,{value:"Module"}));export{C,De as D,x as N,w as U,y as a};
//# sourceMappingURL=digi-clock.stories-65249ab9.js.map

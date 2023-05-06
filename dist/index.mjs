let current_component,SvelteElement;function noop(){}function run(t){return t()}function blank_object(){return Object.create(null)}function run_all(t){t.forEach(run)}function is_function(t){return"function"==typeof t}function not_equal(t,e){return t!=t?e==e:t!==e}function is_empty(t){return 0===Object.keys(t).length}let globals="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function append(t,e){t.appendChild(e)}function insert(t,e,n){t.insertBefore(e,n||null)}function detach(t){t.parentNode&&t.parentNode.removeChild(t)}function destroy_each(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function element(t){return document.createElement(t)}function svg_element(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function text(t){return document.createTextNode(t)}function empty(){return text("")}function attr(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function children(t){return Array.from(t.childNodes)}function set_data(t,e){e=""+e,t.data!==e&&(t.data=e)}function attribute_to_object(t){let e={};for(let n of t)e[n.name]=n.value;return e}function set_current_component(t){current_component=t}function get_current_component(){if(!current_component)throw Error("Function called outside component initialization");return current_component}function onMount(t){get_current_component().$$.on_mount.push(t)}"WeakMap"in globals&&new WeakMap;let dirty_components=[],binding_callbacks=[],render_callbacks=[],flush_callbacks=[],resolved_promise=Promise.resolve(),update_scheduled=!1;function schedule_update(){update_scheduled||(update_scheduled=!0,resolved_promise.then(flush))}function tick(){return schedule_update(),resolved_promise}function add_render_callback(t){render_callbacks.push(t)}let seen_callbacks=new Set,flushidx=0;function flush(){if(0!==flushidx)return;let t=current_component;do{try{for(;flushidx<dirty_components.length;){let t=dirty_components[flushidx];flushidx++,set_current_component(t),update(t.$$)}}catch(t){throw dirty_components.length=0,flushidx=0,t}for(set_current_component(null),dirty_components.length=0,flushidx=0;binding_callbacks.length;)binding_callbacks.pop()();for(let t=0;t<render_callbacks.length;t+=1){let e=render_callbacks[t];seen_callbacks.has(e)||(seen_callbacks.add(e),e())}render_callbacks.length=0}while(dirty_components.length);for(;flush_callbacks.length;)flush_callbacks.pop()();update_scheduled=!1,seen_callbacks.clear(),set_current_component(t)}function update(t){if(null!==t.fragment){t.update(),run_all(t.before_update);let e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(add_render_callback)}}function flush_render_callbacks(t){let e=[],n=[];render_callbacks.forEach(r=>-1===t.indexOf(r)?e.push(r):n.push(r)),n.forEach(t=>t()),render_callbacks=e}let outroing=new Set;function transition_in(t,e){t&&t.i&&(outroing.delete(t),t.i(e))}let _boolean_attributes=["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"];function mount_component(t,e,n,r){let{fragment:o,after_update:c}=t.$$;o&&o.m(e,n),r||add_render_callback(()=>{let e=t.$$.on_mount.map(run).filter(is_function);t.$$.on_destroy?t.$$.on_destroy.push(...e):run_all(e),t.$$.on_mount=[]}),c.forEach(add_render_callback)}function destroy_component(t,e){let n=t.$$;null!==n.fragment&&(flush_render_callbacks(n.after_update),run_all(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function make_dirty(t,e){-1===t.$$.dirty[0]&&(dirty_components.push(t),schedule_update(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function init(t,e,n,r,o,c,a,s=[-1]){let l=current_component;set_current_component(t);let i=t.$$={fragment:null,ctx:[],props:c,update:noop,not_equal:o,bound:blank_object(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:blank_object(),dirty:s,skip_bound:!1,root:e.target||l.$$.root};a&&a(i.root);let u=!1;if(i.ctx=n?n(t,e.props||{},(e,n,...r)=>{let c=r.length?r[0]:n;return i.ctx&&o(i.ctx[e],i.ctx[e]=c)&&(!i.skip_bound&&i.bound[e]&&i.bound[e](c),u&&make_dirty(t,e)),n}):[],i.update(),u=!0,run_all(i.before_update),i.fragment=!!r&&r(i.ctx),e.target){if(e.hydrate){let t=children(e.target);i.fragment&&i.fragment.l(t),t.forEach(detach)}else i.fragment&&i.fragment.c();e.intro&&transition_in(t.$$.fragment),mount_component(t,e.target,e.anchor,e.customElement),flush()}set_current_component(l)}function dispatchTick(t,e){let n=new CustomEvent("tick",{detail:e,bubbles:!0,cancelable:!0,composed:!0});t.dispatchEvent(n)}[..._boolean_attributes],"function"==typeof HTMLElement&&(SvelteElement=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){let{on_mount:t}=this.$$;for(let e in this.$$.on_disconnect=t.map(run).filter(is_function),this.$$.slotted)this.appendChild(this.$$.slotted[e])}attributeChangedCallback(t,e,n){this[t]=n}disconnectedCallback(){run_all(this.$$.on_disconnect)}$destroy(){destroy_component(this,1),this.$destroy=noop}$on(t,e){if(!is_function(e))return noop;let n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{let t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){this.$$set&&!is_empty(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}});let local=-new Date().getTimezoneOffset();function getNow(t){return 0===t.length&&(t=local),new Date(Date.now()+(+t-local)*6e4)}function get_each_context(t,e,n){let r=t.slice();return r[14]=e[n],r}function get_each_context_1(t,e,n){let r=t.slice();return r[2]=e[n],r}function create_if_block_1(t){let e;let n=t[3],r=[];for(let e=0;e<n.length;e+=1)r[e]=create_each_block(get_each_context(t,n,e));return{c(){for(let t=0;t<r.length;t+=1)r[t].c();e=empty()},m(t,n){for(let e=0;e<r.length;e+=1)r[e]&&r[e].m(t,n);insert(t,e,n)},p(t,o){if(10&o){let c;for(c=0,n=t[3];c<n.length;c+=1){let a=get_each_context(t,n,c);r[c]?r[c].p(a,o):(r[c]=create_each_block(a),r[c].c(),r[c].m(e.parentNode,e))}for(;c<r.length;c+=1)r[c].d(1);r.length=n.length}},d(t){destroy_each(r,t),t&&detach(e)}}}function create_if_block_2(t){let e;let n=[1,2,3,4],r=[];for(let e=0;e<4;e+=1)r[e]=create_each_block_1(get_each_context_1(t,n,e));return{c(){for(let t=0;t<4;t+=1)r[t].c();e=empty()},m(t,n){for(let e=0;e<4;e+=1)r[e]&&r[e].m(t,n);insert(t,e,n)},p(t,o){if(8&o){let c;for(c=0,n=[1,2,3,4];c<4;c+=1){let a=get_each_context_1(t,n,c);r[c]?r[c].p(a,o):(r[c]=create_each_block_1(a),r[c].c(),r[c].m(e.parentNode,e))}for(;c<4;c+=1)r[c].d(1)}},d(t){destroy_each(r,t),t&&detach(e)}}}function create_each_block_1(t){let e,n;return{c(){attr(e=svg_element("line"),"class","minor"),attr(e,"y1","42"),attr(e,"y2","45"),attr(e,"transform",n="rotate("+6*(t[14]+t[2])+")")},m(t,n){insert(t,e,n)},p(t,r){8&r&&n!==(n="rotate("+6*(t[14]+t[2])+")")&&attr(e,"transform",n)},d(t){t&&detach(e)}}}function create_each_block(t){let e,n,r;let o="sixty"===t[1]&&create_if_block_2(t);return{c(){e=svg_element("line"),o&&o.c(),r=empty(),attr(e,"class","major"),attr(e,"y1","35"),attr(e,"y2","45"),attr(e,"transform",n="rotate("+30*t[14]+")")},m(t,n){insert(t,e,n),o&&o.m(t,n),insert(t,r,n)},p(t,c){8&c&&n!==(n="rotate("+30*t[14]+")")&&attr(e,"transform",n),"sixty"===t[1]?o?o.p(t,c):((o=create_if_block_2(t)).c(),o.m(r.parentNode,r)):o&&(o.d(1),o=null)},d(t){t&&detach(e),o&&o.d(t),t&&detach(r)}}}function create_if_block$1(t){let e,n,r,o;return{c(){e=svg_element("g"),n=svg_element("line"),r=svg_element("line"),attr(n,"class","second"),attr(n,"y1","10"),attr(n,"y2","-38"),attr(r,"class","second-counterweight"),attr(r,"y1","10"),attr(r,"y2","2"),attr(e,"transform",o="rotate("+6*t[4]+")")},m(t,o){insert(t,e,o),append(e,n),append(e,r)},p(t,n){16&n&&o!==(o="rotate("+6*t[4]+")")&&attr(e,"transform",o)},d(t){t&&detach(e)}}}function create_fragment$1(t){let e,n,r,o,c,a;let s="none"!==t[1]&&create_if_block_1(t),l="true"===t[0]&&create_if_block$1(t);return{c(){e=svg_element("svg"),n=svg_element("circle"),s&&s.c(),r=svg_element("line"),c=svg_element("line"),l&&l.c(),this.c=noop,attr(n,"class","clock-face"),attr(n,"r","48"),attr(r,"class","hour"),attr(r,"y1","2"),attr(r,"y2","-20"),attr(r,"transform",o="rotate("+(30*t[6]+t[5]/2)+")"),attr(c,"class","minute"),attr(c,"y1","4"),attr(c,"y2","-30"),attr(c,"transform",a="rotate("+(6*t[5]+t[4]/10)+")"),attr(e,"viewBox","-50 -50 100 100")},m(t,o){insert(t,e,o),append(e,n),s&&s.m(e,null),append(e,r),append(e,c),l&&l.m(e,null)},p(t,[n]){"none"!==t[1]?s?s.p(t,n):((s=create_if_block_1(t)).c(),s.m(e,r)):s&&(s.d(1),s=null),96&n&&o!==(o="rotate("+(30*t[6]+t[5]/2)+")")&&attr(r,"transform",o),48&n&&a!==(a="rotate("+(6*t[5]+t[4]/10)+")")&&attr(c,"transform",a),"true"===t[0]?l?l.p(t,n):((l=create_if_block$1(t)).c(),l.m(e,null)):l&&(l.d(1),l=null)},i:noop,o:noop,d(t){t&&detach(e),s&&s.d(),l&&l.d()}}}function instance$1(t,e,n){let r,o,c,a,s;let{secondhand:l="true"}=e,{markers:i="sixty"}=e,{offset:u=""}=e,d=get_current_component(),f=()=>getNow(u),_=f();function h(){n(9,_=f()),dispatchTick(d,_)}return onMount(async()=>{await tick(),h();let t=0,e=setInterval(()=>{if(!s){if("true"!==l){if(++t<60)return;t=0}h()}},1e3);return()=>clearInterval(e)}),t.$$set=t=>{"secondhand"in t&&n(0,l=t.secondhand),"markers"in t&&n(1,i=t.markers),"offset"in t&&n(2,u=t.offset)},t.$$.update=()=>{1&t.$$.dirty&&tick().then(()=>d.setAttribute("secondhand",l)),2&t.$$.dirty&&tick().then(()=>d.setAttribute("markers",i)),4&t.$$.dirty&&tick().then(()=>d.setAttribute("offset",u)),512&t.$$.dirty&&n(6,r=_.getHours()),512&t.$$.dirty&&n(5,o=_.getMinutes()),512&t.$$.dirty&&n(4,c=_.getSeconds()),2&t.$$.dirty&&n(3,a="four"===i?[0,15,30,45]:[0,5,10,15,20,25,30,35,40,45,50,55])},[l,i,u,a,c,o,r,function(){s=!0},function(){s=!1},_]}class Ana_clock extends SvelteElement{constructor(t){super();let e=document.createElement("style");e.textContent=":host{display:block}svg{width:100%;height:100%}.clock-face{stroke:#333;fill:white}.minor{stroke:#999;stroke-width:0.5}.major{stroke:#333;stroke-width:1}.hour{stroke:#333}.minute{stroke:#666}.second,.second-counterweight{stroke:rgb(180,0,0)}.second-counterweight{stroke-width:3}",this.shadowRoot.appendChild(e),init(this,{target:this.shadowRoot,props:attribute_to_object(this.attributes),customElement:!0},instance$1,create_fragment$1,not_equal,{secondhand:0,markers:1,offset:2,stop:7,restart:8},null),t&&(t.target&&insert(t.target,this,t.anchor),t.props&&(this.$set(t.props),flush()))}static get observedAttributes(){return["secondhand","markers","offset","stop","restart"]}get secondhand(){return this.$$.ctx[0]}set secondhand(t){this.$$set({secondhand:t}),flush()}get markers(){return this.$$.ctx[1]}set markers(t){this.$$set({markers:t}),flush()}get offset(){return this.$$.ctx[2]}set offset(t){this.$$set({offset:t}),flush()}get stop(){return this.$$.ctx[7]}get restart(){return this.$$.ctx[8]}}function pad(t){return t<10?`0${t}`:t}function create_if_block(t){let e,n;let r=pad(t[1])+"";return{c(){(e=element("span")).textContent=":",n=text(r)},m(t,r){insert(t,e,r),insert(t,n,r)},p(t,e){2&e&&r!==(r=pad(t[1])+"")&&set_data(n,r)},d(t){t&&detach(e),t&&detach(n)}}}function create_fragment(t){let e,n,r,o,c=pad(t[3])+"",a=pad(t[2])+"",s="true"===t[0]&&create_if_block(t);return{c(){e=text(c),(n=element("span")).textContent=":",r=text(a),s&&s.c(),o=empty(),this.c=noop},m(t,c){insert(t,e,c),insert(t,n,c),insert(t,r,c),s&&s.m(t,c),insert(t,o,c)},p(t,[n]){8&n&&c!==(c=pad(t[3])+"")&&set_data(e,c),4&n&&a!==(a=pad(t[2])+"")&&set_data(r,a),"true"===t[0]?s?s.p(t,n):((s=create_if_block(t)).c(),s.m(o.parentNode,o)):s&&(s.d(1),s=null)},i:noop,o:noop,d(t){t&&detach(e),t&&detach(n),t&&detach(r),s&&s.d(t),t&&detach(o)}}}function instance(t,e,n){let r,o,c,a;let{seconds:s="true"}=e,{offset:l=""}=e,i=get_current_component(),u=()=>getNow(l),d=u();function f(){n(7,d=u()),dispatchTick(i,d)}return onMount(async()=>{await tick(),f();let t=0,e=setInterval(()=>{if(!a){if("true"!==s){if(++t<60)return;t=0}f()}},1e3);return()=>clearInterval(e)}),t.$$set=t=>{"seconds"in t&&n(0,s=t.seconds),"offset"in t&&n(4,l=t.offset)},t.$$.update=()=>{1&t.$$.dirty&&tick().then(()=>i.setAttribute("seconds",s)),16&t.$$.dirty&&tick().then(()=>i.setAttribute("offset",l)),128&t.$$.dirty&&n(3,r=d.getHours()),128&t.$$.dirty&&n(2,o=d.getMinutes()),128&t.$$.dirty&&n(1,c=d.getSeconds())},[s,c,o,r,l,function(){a=!0},function(){a=!1},d]}customElements.define("ana-clock",Ana_clock);class Digi_clock extends SvelteElement{constructor(t){super(),init(this,{target:this.shadowRoot,props:attribute_to_object(this.attributes),customElement:!0},instance,create_fragment,not_equal,{seconds:0,offset:4,stop:5,restart:6},null),t&&(t.target&&insert(t.target,this,t.anchor),t.props&&(this.$set(t.props),flush()))}static get observedAttributes(){return["seconds","offset","stop","restart"]}get seconds(){return this.$$.ctx[0]}set seconds(t){this.$$set({seconds:t}),flush()}get offset(){return this.$$.ctx[4]}set offset(t){this.$$set({offset:t}),flush()}get stop(){return this.$$.ctx[5]}get restart(){return this.$$.ctx[6]}}customElements.define("digi-clock",Digi_clock);export{Ana_clock as AnaClock,Digi_clock as DigiClock};
//# sourceMappingURL=index.mjs.map
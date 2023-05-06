import{j as e}from"./jsx-runtime-619852b3.js";import{M as l}from"./index-88244e3c.js";import{u as c}from"./index-a12d9a6d.js";import"./iframe-1747edeb.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-c45868c5.js";import"./index-bdebfb6d.js";const o=""+new URL("example-540b7f52.png",import.meta.url).href;function b(s={}){const{wrapper:t}=Object.assign({},c(),s.components);return t?e.jsx(t,Object.assign({},s,{children:e.jsx(r,{})})):r();function r(){const n=Object.assign({h1:"h1",p:"p",a:"a",h2:"h2",code:"code",pre:"pre",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},c(),s.components);return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"Overview"}),`
`,e.jsx(n.h1,{id:"analogue-and-digital-clocks-as-web-components",children:"Analogue and Digital Clocks as Web Components"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/Web_Components",target:"_blank",rel:"nofollow noopener noreferrer",children:"Web components"})," showing an analogue clock known from ",e.jsx(n.a,{href:"https://svelte.dev/repl/clock?version=3.30.1",target:"_blank",rel:"nofollow noopener noreferrer",children:"a Svelte example"})," and a digital clock similar to ",e.jsx(n.a,{href:"https://svelte.dev/repl/a15e5bf484bf4eddafe68996d4235187?version=3.18.2",target:"_blank",rel:"nofollow noopener noreferrer",children:"another Svelte example"}),"."]}),`
`,e.jsx("img",{src:o,alt:"Example"}),`
`,e.jsxs(n.p,{children:["See the ",e.jsx(n.a,{href:"https://prantlf.github.io/web-clocks/",target:"_blank",rel:"nofollow noopener noreferrer",children:"on-line demo"})," or the ",e.jsx(n.a,{href:"https://prantlf.github.io/web-clocks/storybook/",target:"_blank",rel:"nofollow noopener noreferrer",children:"storybook"}),"."]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsxs(n.p,{children:["1: Place the ",e.jsx(n.code,{children:"ana-clock"})," or ",e.jsx(n.code,{children:"digi-clock"})," web component with or without attributes to a page. For example:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ana-clock></ana-clock>
<ana-clock secondhand="false"></ana-clock>
<digi-clock></digi-clock>
<digi-clock seconds="false"></digi-clock>
`})}),`
`,e.jsxs(n.p,{children:["2: Include the implementation of the web component on your page, typically at the bottom of the ",e.jsx(n.code,{children:"body"})," element. Choose the way that fits your scenario the base."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<!-- Load both clocks from the NPM CDN -->
<script type="module" src="https://unpkg.com/web-clocks@1.0.0/dist/index.mjs"><\/script>
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<!-- Load either analogue or digital clock from a local installation -->
<script type="module" src="node_modules/web-clocks/dist/ana-clock.mjs"><\/script>
<script type="module" src="node_modules/web-clocks/dist/digi-clock.mjs"><\/script>
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<script type="module">
  // Load both clocks and use their classes
  import { AnaClock, DigiClock } from '../dist/index.mjs'
  ...
<\/script>
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<script type="module">
  // Load either analogue or digital clock and use their classes
  import AnaClock from '../dist/ana-clock.mjs'
  import DigiClock from '../dist/digi-clock.mjs'
  ...
<\/script>
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// Include either analogue or digital clock in your application bundle
import { AnaClock, DigiClock } from 'web-clocks'
`})}),`
`,e.jsx(n.h3,{id:"attributes",children:"Attributes"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Attribute"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Values"}),e.jsx(n.th,{children:"Default"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"markers"})}),e.jsx(n.td,{children:"chooses the density of markers (analogue)"}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"sixty"})," | ",e.jsx(n.code,{children:"twelve"})," | ",e.jsx(n.code,{children:"four"})," | ",e.jsx(n.code,{children:"none"})]}),e.jsx(n.td,{children:e.jsx(n.code,{children:"sixty"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"secondhand"})}),e.jsx(n.td,{children:"disables the second hand (analogue)"}),e.jsx(n.td,{children:"boolean"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"seconds"})}),e.jsx(n.td,{children:"disables the second part (digital)"}),e.jsx(n.td,{children:"boolean"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"false"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"offset"})}),e.jsx(n.td,{children:"adds the offset in minutes to UTC"}),e.jsx(n.td,{children:"number of minutes"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"0"})})]})]})]}),`
`,e.jsx(n.h3,{id:"methods",children:"Methods"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Name"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"stop()"})}),e.jsx(n.td,{children:"stops the clock"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"restart()"})}),e.jsx(n.td,{children:"sets the clock to the current time and starts ticking again"})]})]})]}),`
`,e.jsx(n.h3,{id:"events",children:"Events"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Name"}),e.jsx(n.th,{children:"Triggered"}),e.jsx(n.th,{children:"Details"})]})}),e.jsx(n.tbody,{children:e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"tick"})}),e.jsx(n.td,{children:"when the second or the minute hand moves"}),e.jsxs(n.td,{children:["current ",e.jsx(n.code,{children:"Date"})]})]})})]}),`
`,e.jsx(n.h2,{id:"contributing",children:"Contributing"}),`
`,e.jsxs(n.p,{children:["In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code using ",e.jsx(n.code,{children:"npm test"}),"."]}),`
`,e.jsx(n.h2,{id:"license",children:"License"}),`
`,e.jsx(n.p,{children:"Copyright (c) 2021-2023 Ferdinand Prantl"}),`
`,e.jsx(n.p,{children:"Licensed under the MIT license."})]})}}export{b as default};
//# sourceMappingURL=overview-ade7a2ff.js.map

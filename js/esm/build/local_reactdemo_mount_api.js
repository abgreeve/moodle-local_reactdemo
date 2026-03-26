import i from"react";import{createRoot as l}from"react-dom/client";import{mountReactApp as m,unmountReactApp as p}from"@moodle/lms/core/mount";import{jsx as e,jsxs as t}from"react/jsx-runtime";var d="local-reactdemo-mount-profiled",s="local-reactdemo-mount-raw",u=`import React from "react";

// react_autoinit calls mountReactApp() for you automatically.
// No setup needed \u2014 just write and export the component.

export default function MyComponent(props) {
    return <div>...</div>;
}`,f=`import React from "react";
import { mountReactApp } from "@moodle/lms/core/mount";

// You call mountReactApp() yourself inside init().
// react_autoinit detects the named "init" export and
// calls it with the container element and parsed props.

function MyComponent(props) {
    return <div>...</div>;
}

export function init(el, props = {}) {
    mountReactApp(el, MyComponent, props, { id: "MyComponent" });
}`,v=`import React from "react";
import { createRoot } from "react-dom/client";

// createRoot() bypasses mountReactApp() entirely.
// The component is NEVER wrapped in <Profiler>,
// even when M.cfg.reactprofiling is enabled.

function MyComponent(props) {
    return <div>...</div>;
}

export function init(el, props = {}) {
    const root = createRoot(el);
    root.render(<MyComponent {...props} />);
}`;function c(){let[o,n]=i.useState(0);return t("div",{className:"mt-2",children:[t("span",{className:"small",children:["Re-render count: ",o]}),e("div",{children:e("button",{type:"button",className:"btn btn-sm btn-outline-secondary mt-1",onClick:()=>n(r=>r+1),children:"Re-render"})})]})}function a({code:o}){return e("pre",{className:"small bg-light border rounded p-2 mt-2 mb-0",style:{whiteSpace:"pre-wrap"},children:e("code",{children:o})})}function R(){let o=i.useRef(null);return i.useEffect(()=>{let n=document.getElementById(d);n&&m(n,c,{},{id:"DemoWidget-profiled"});let r=document.getElementById(s);return r&&(o.current=l(r),o.current.render(e(c,{}))),()=>{n&&p(n),o.current?.unmount()}},[]),t("div",{children:[t("p",{className:"small text-muted mb-1",children:["There are two ways to get automatic Profiler support in react_autoinit, and one way to opt out. Click ",e("strong",{children:"Re-render"})," on the live widgets and compare the browser console output."]}),t("p",{className:"small text-muted mb-3",children:["To see profiler output, set ",e("strong",{children:"Debug"})," to ",e("strong",{children:"DEVELOPER"}),":"," ",e("em",{children:"Site administration \u2192 Development \u2192 Debugging \u2192 Debug \u2192 DEVELOPER"}),"."]}),t("div",{className:"d-flex flex-column gap-3",style:{maxWidth:"860px"},children:[t("div",{className:"border rounded p-2",children:[t("div",{className:"fw-semibold text-success mb-1",children:["Pattern 1 \u2014 ",e("code",{children:"export default"})]}),t("div",{className:"small text-muted mb-1",children:["react_autoinit detects the default export and calls"," ",e("code",{children:"mountReactApp()"})," for you. Simplest path."]}),e(a,{code:u})]}),t("div",{className:"border rounded p-2",children:[t("div",{className:"fw-semibold text-success mb-1",children:["Pattern 2 \u2014 ",e("code",{children:"init() + mountReactApp()"})]}),t("div",{className:"small text-muted mb-1",children:["react_autoinit calls your ",e("code",{children:"init()"}),". You call"," ",e("code",{children:"mountReactApp()"})," \u2014 same Profiler wrapping as pattern 1."]}),t("div",{className:"d-flex gap-2 mt-2 align-items-start",children:[e("div",{className:"flex-grow-1",children:e(a,{code:f})}),t("div",{className:"border rounded p-2 bg-light mt-2",style:{minWidth:"160px"},children:[e("span",{className:"small fw-semibold",children:"Live widget"}),e("div",{id:d})]})]})]}),t("div",{className:"border rounded p-2",children:[t("div",{className:"fw-semibold text-secondary mb-1",children:["Pattern 3 \u2014 ",e("code",{children:"createRoot()"})]}),t("div",{className:"small text-muted mb-1",children:["Bypasses ",e("code",{children:"mountReactApp()"})," entirely. No ",e("code",{children:"<Profiler>"})," wrapping \u2014 ever."]}),t("div",{className:"d-flex gap-2 mt-2 align-items-start",children:[e("div",{className:"flex-grow-1",children:e(a,{code:v})}),t("div",{className:"border rounded p-2 bg-light mt-2",style:{minWidth:"160px"},children:[e("span",{className:"small fw-semibold",children:"Live widget"}),e("div",{id:s})]})]})]})]})]})}function y(o,n={}){m(o,R,n,{id:"MountInitDemo"})}export{y as init};

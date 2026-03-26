import u from"react";import{init as c,unmount as i}from"@moodle/lms/core/react_autoinit";import{jsx as t,jsxs as a}from"react/jsx-runtime";var d="local-reactdemo-autoinit-region";function f(){let[l,o]=u.useState("Idle"),n=u.useRef(0),r=()=>document.getElementById(d),s=e=>`
            <div class="small text-muted mb-2">
                Simulated Moodle fragment (e.g. refreshed course panel), revision: <strong>${e}</strong>
            </div>
            <div
                data-react-component="@local_reactdemo/local_reactdemo_message"
                data-react-props='{"message":"Fragment revision ${e} mounted with react_autoinit.init()"}'
                class="p-2 border rounded mb-2"
            >
                Fallback: message component
            </div>
            <div
                data-react-component="@local_reactdemo/local_reactdemo_counter"
                data-react-props='{"initial":${e}}'
                class="p-2 border rounded mb-2"
            >
                Fallback: counter component
            </div>
            <div class="small text-muted mb-2">
                Note: this counter keeps local React state only. After a fragment refresh/remount, it resets to the new
                initial value from fragment props (revision).
            </div>
            <div
                data-react-component="@local_reactdemo/local_reactdemo_button"
                data-react-props='{"label":"Open popup","message":"Revision ${e}: popup from mounted fragment button"}'
                class="p-2 border rounded"
            >
                Fallback: button component
            </div>
        `;return a("div",{children:[t("strong",{children:"Moodle fragment refresh demo (react_autoinit)"}),a("div",{className:"small text-muted mt-1 mb-2",children:[a("p",{children:["The react_autoinit exposes two public APIs: ",t("code",{children:"init()"})," and ",t("code",{children:"unmount()"})]}),t("p",{children:"Purpose: demonstrate a recommended dynamic-region lifecycle."}),a("p",{children:["The inject action intentionally uses raw HTML (",t("code",{children:"data-react-component"})," divs), not the Mustache",t("code",{children:"{{#react}}"})," helper, to mimic AJAX/server fragment responses.",t("br",{}),"The fragment revision value is included to make each refresh visibly different, so you can confirm old content was replaced by a new fragment response."]})]}),t("div",{className:"mt-2 mb-2",children:l}),a("div",{className:"d-flex gap-2 mb-2",children:[t("button",{type:"button",className:"btn btn-secondary btn-sm",onClick:()=>{let e=r();if(!e){o("Region element not found");return}n.current+=1,e.innerHTML=s(n.current),o(`Raw fragment HTML injected (revision ${n.current}). Click init() to mount.`)},children:"1) Inject fragment HTML"}),t("button",{type:"button",className:"btn btn-primary btn-sm",onClick:async()=>{let e=r();if(!e){o("Region element not found");return}await c(e);let m=e.querySelectorAll("[data-react-component]").length,p=e.querySelectorAll('[data-react-mounted="1"]').length;o(`Mounted ${p}/${m} nodes in current fragment.`)},children:"2) Mount current fragment (init)"}),t("button",{type:"button",className:"btn btn-warning btn-sm",onClick:async()=>{let e=r();if(!e){o("Region element not found");return}n.current+=1,e.insertAdjacentHTML("beforeend",`<hr class="my-3" />${s(n.current)}`),await c(e),o(`Unsafe refresh revision ${n.current}: appended new fragment without cleanup; old components remain mounted.`)},children:"3) Refresh without unmount"}),t("button",{type:"button",className:"btn btn-success btn-sm",onClick:async()=>{let e=r();if(!e){o("Region element not found");return}i(e),n.current+=1,e.innerHTML=s(n.current),await c(e),o(`Safe refresh done for revision ${n.current} (unmount -> replace HTML -> init).`)},children:"4) Safe refresh (unmount + init)"}),t("button",{type:"button",className:"btn btn-secondary btn-sm",onClick:()=>{let e=r();e?(i(e),e.innerHTML=""):i(`#${d}`),n.current=0,o("Unmounted roots, cleared host, and reset fragment revision.")},children:"5) Full cleanup"})]}),t("div",{id:d,className:"p-2 border rounded"})]})}export{f as default};

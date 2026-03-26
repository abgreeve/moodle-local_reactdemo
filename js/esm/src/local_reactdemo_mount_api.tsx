import React from "react";
import { createRoot } from "react-dom/client";
import { mountReactApp, unmountReactApp } from "@moodle/lms/core/mount";

const CONTAINER_PROFILED_ID = "local-reactdemo-mount-profiled";
const CONTAINER_RAW_ID = "local-reactdemo-mount-raw";

const CODE_EXPORT_DEFAULT = `\
import React from "react";

// react_autoinit calls mountReactApp() for you automatically.
// No setup needed — just write and export the component.

export default function MyComponent(props) {
    return <div>...</div>;
}`;

const CODE_INIT_MOUNT = `\
import React from "react";
import { mountReactApp } from "@moodle/lms/core/mount";

// You call mountReactApp() yourself inside init().
// react_autoinit detects the named "init" export and
// calls it with the container element and parsed props.

function MyComponent(props) {
    return <div>...</div>;
}

export function init(el, props = {}) {
    mountReactApp(el, MyComponent, props, { id: "MyComponent" });
}`;

const CODE_CREATE_ROOT = `\
import React from "react";
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
}`;

/**
 * A simple widget used as the live mount target in this demo.
 */
function DemoWidget() {
    const [count, setCount] = React.useState(0);
    return (
        <div className="mt-2">
            <span className="small">Re-render count: {count}</span>
            <div>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary mt-1"
                    onClick={() => setCount(c => c + 1)}
                >
                    Re-render
                </button>
            </div>
        </div>
    );
}

/**
 * Code block used to display patterns inline.
 */
function CodeBlock({ code }: { code: string }) {
    return (
        <pre className="small bg-light border rounded p-2 mt-2 mb-0" style={{ whiteSpace: "pre-wrap" }}>
            <code>{code}</code>
        </pre>
    );
}

/**
 * Demo: init() + mountReactApp() vs createRoot().
 *
 * Shows three patterns side by side with code and live widgets so developers
 * can read the "how" next to the result.
 *
 * Profiling rules:
 *  1. export default function  — react_autoinit calls mountReactApp() automatically.
 *  2. init() + mountReactApp() — you call it yourself; same Profiler wrapping.
 *  3. createRoot().render()    — bypasses mountReactApp(); never profiled.
 *
 * @returns A JSX.Element representing the demo UI.
 */
function MountInitDemo() {
    const rawRootRef = React.useRef<ReturnType<typeof createRoot> | null>(null);

    React.useEffect(() => {
        const profiledContainer = document.getElementById(CONTAINER_PROFILED_ID);
        if (profiledContainer) {
            mountReactApp(profiledContainer, DemoWidget, {}, { id: "DemoWidget-profiled" });
        }

        const rawContainer = document.getElementById(CONTAINER_RAW_ID);
        if (rawContainer) {
            rawRootRef.current = createRoot(rawContainer);
            rawRootRef.current.render(<DemoWidget />);
        }

        return () => {
            if (profiledContainer) {
                unmountReactApp(profiledContainer);
            }
            rawRootRef.current?.unmount();
        };
    }, []);

    return (
        <div>
            <p className="small text-muted mb-1">
                There are two ways to get automatic Profiler support in react_autoinit,
                and one way to opt out. Click <strong>Re-render</strong> on the live widgets
                and compare the browser console output.
            </p>
            <p className="small text-muted mb-3">
                To see profiler output, set <strong>Debug</strong> to <strong>DEVELOPER</strong>:{" "}
                <em>Site administration &rarr; Development &rarr; Debugging &rarr; Debug &rarr; DEVELOPER</em>.
            </p>

            <div className="d-flex flex-column gap-3" style={{ maxWidth: "860px" }}>

                {/* Pattern 1: export default */}
                <div className="border rounded p-2">
                    <div className="fw-semibold text-success mb-1">
                        Pattern 1 — <code>export default</code>
                    </div>
                    <div className="small text-muted mb-1">
                        react_autoinit detects the default export and calls{" "}
                        <code>mountReactApp()</code> for you. Simplest path.
                    </div>
                    <CodeBlock code={CODE_EXPORT_DEFAULT} />
                </div>

                {/* Pattern 2: init() + mountReactApp() */}
                <div className="border rounded p-2">
                    <div className="fw-semibold text-success mb-1">
                        Pattern 2 — <code>init() + mountReactApp()</code>
                    </div>
                    <div className="small text-muted mb-1">
                        react_autoinit calls your <code>init()</code>. You call{" "}
                        <code>mountReactApp()</code> — same Profiler wrapping as pattern 1.
                    </div>
                    <div className="d-flex gap-2 mt-2 align-items-start">
                        <div className="flex-grow-1">
                            <CodeBlock code={CODE_INIT_MOUNT} />
                        </div>
                        <div className="border rounded p-2 bg-light mt-2" style={{ minWidth: "160px" }}>
                            <span className="small fw-semibold">Live widget</span>
                            <div id={CONTAINER_PROFILED_ID} />
                        </div>
                    </div>
                </div>

                {/* Pattern 3: createRoot() */}
                <div className="border rounded p-2">
                    <div className="fw-semibold text-secondary mb-1">
                        Pattern 3 — <code>createRoot()</code>
                    </div>
                    <div className="small text-muted mb-1">
                        Bypasses <code>mountReactApp()</code> entirely.
                        No <code>{"<Profiler>"}</code> wrapping — ever.
                    </div>
                    <div className="d-flex gap-2 mt-2 align-items-start">
                        <div className="flex-grow-1">
                            <CodeBlock code={CODE_CREATE_ROOT} />
                        </div>
                        <div className="border rounded p-2 bg-light mt-2" style={{ minWidth: "160px" }}>
                            <span className="small fw-semibold">Live widget</span>
                            <div id={CONTAINER_RAW_ID} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

/**
 * Entry point called by react_autoinit.
 *
 * @param {Element} el - The container element provided by react_autoinit.
 * @param {object} props - Props parsed from data-react-props.
 */
export function init(el: Element, props = {}) {
    mountReactApp(el, MountInitDemo, props, { id: "MountInitDemo" });
}

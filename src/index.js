import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const Portal = ({ domNode, children }) => {
  const wrapperRef = React.useRef(null);
  const docRoot = React.useRef(null);

  if (wrapperRef.current === null && typeof document !== "undefined") {
    const div = document.createElement("div");
    div.setAttribute("data-body-portal", "");
    wrapperRef.current = div;
  }
  React.useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || typeof document === "undefined") {
      return;
    }
    docRoot.current = document.getElementById(domNode);
    docRoot.current.prepend(wrapper);
  }, []);
  return ReactDOM.createPortal(children, wrapperRef.current);
};

export default Portal;
function App() {
  const [showPortal, togglePortal] = React.useState(false);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={() => togglePortal(!showPortal)}>Toggle Portal</button>
      {showPortal && <Portal domNode="root">SHOWING PORTAL</Portal>}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

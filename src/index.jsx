/* @refresh reload */
import { render } from "solid-js/web";

import App from "./App";
import "./index.css";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(() => {
  return (
    // <div class="w-full flex justify-center p-4">
    //   <div class="w-full max-w-7xl">
    <App />
    //   </div>
    // </div>
  );
}, root);

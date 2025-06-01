import { createSignal } from "solid-js";


export const [userVersion, bumpUserVersion] = (() => {
  const [version, setVersion] = createSignal(0);
  const bump = () => setVersion(v => v + 1);
  return [version, bump];
})();
import { createSignal } from "solid-js";


export const [addressVersion, bumpAddressVersion] = (() => {
  const [addressV, setAddressV] = createSignal(0);
  const bump = () => setAddressV(v => v + 1);
  return [addressV, bump];
})();
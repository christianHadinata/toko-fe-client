import { createSignal } from "solid-js";


export const [ isCreatingAddress , flipIsCreatingAddress ] = (()=> {
    const [cond , setCond] = createSignal(false);
    const flip = () => setCond(!cond())
    return [cond, flip];
})();
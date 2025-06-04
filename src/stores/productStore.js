import { createStore } from "solid-js/store";

const [productStore, setProductStore] = createStore({
  products: [],
});

export { productStore, setProductStore };

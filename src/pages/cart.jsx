import { createSignal, For } from "solid-js";
import CartItem from "../components/CartItem";

export default function Cart() {
  const [products, setProducts] = createSignal([
    { product_id: 1, product_quantity: 10, product_stock: 50 },
    { product_id: 2, product_quantity: 5, product_stock: 50 },
    { product_id: 3, product_quantity: 7, product_stock: 50 },
  ]);

  const onDelete = (productId) => {
    setProducts(
      products().filter((product) => product.product_id != productId)
    );
  };

  // const onDecreaseQuantity = (productId) => {
  //   const idxProduct = products().findIndex(
  //     (product) => product.product_id === productId
  //   );
  //   const updatedProduct = { ...products()[idxProduct] };
  //   updatedProduct.product_quantity -= 1;

  //   console.log(updatedProduct);
  //   const newProducts = [...products()];

  //   newProducts[idxProduct] = updatedProduct;

  //   setProducts(newProducts);
  // };
  const onDecreaseQuantity = (productId) => {
    const newProducts = products().map((product) => {
      if (product.product_id === productId) {
        return {
          ...product,
          product_quantity: product.product_quantity - 1,
        };
      }
      return product;
    });

    setProducts(newProducts);
  };
  const onIncreaseQuantity = (productId) => {
    const newProducts = products().map((product) => {
      if (product.product_id === productId) {
        return {
          ...product,
          product_quantity: product.product_quantity + 1,
        };
      }
      return product;
    });

    setProducts(newProducts);
  };

  return (
    <>
      <div class="flex flex-col gap-8 items-center">
        <h1 class="font-semibold text-3xl">Cart Items</h1>
        <For each={products()}>
          {(product, index) => (
            <CartItem
              product={product}
              onDelete={() => onDelete(product.product_id)}
              onDecreaseQuantity={() => onDecreaseQuantity(product.product_id)}
              onIncreaseQuantity={() => onIncreaseQuantity(product.product_id)}
            />
          )}
        </For>
      </div>
    </>
  );
}

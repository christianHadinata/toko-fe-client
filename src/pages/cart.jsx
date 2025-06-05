import { createEffect, createSignal, For, onMount } from "solid-js";
import CartItem from "../components/CartItem";
import { setToastSignal } from "../stores/toaster";
import { Toaster } from "solid-toast";
import Modal from "../components/Modal";

export default function Cart() {
  const [cartItems, setCartItems] = createSignal([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = createSignal(false);
  const [deletingCartItemData, setDeletingCartItemData] = createSignal({});

  onMount(() => {
    fetchUserCartData();
  });

  const fetchUserCartData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/v1/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      console.log(data);

      setCartItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/v1/cart/${
          deletingCartItemData().cart_item_id
        }`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      let data = await res.json();

      console.log(data);

      if (data.success) {
        data = {
          ...data,
          message: `${
            deletingCartItemData().product_name
          } Deleted Succesfully!`,
        };
        setCartItems(
          cartItems().filter(
            (cartItem) =>
              cartItem.cart_item_id != deletingCartItemData().cart_item_id
          )
        );
      }

      setToastSignal(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteModalOpen(false);
    }
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
  const handleDecreaseQuantity = async (cartItem) => {
    try {
      const token = localStorage.getItem("token");

      const body = {
        product_quantity: cartItem.product_quantity - 1,
      };

      const res = await fetch(
        `http://localhost:5000/api/v1/cart/${cartItem.cart_item_id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      let data = await res.json();

      if (data.success) {
        const updatedCartItems = cartItems().map((item) =>
          item.cart_item_id === cartItem.cart_item_id
            ? { ...item, product_quantity: item.product_quantity - 1 }
            : item
        );
        setCartItems(updatedCartItems);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleIncreaseQuantity = async (cartItem) => {
    try {
      const token = localStorage.getItem("token");

      const body = {
        product_quantity: cartItem.product_quantity + 1,
      };

      const res = await fetch(
        `http://localhost:5000/api/v1/cart/${cartItem.cart_item_id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      let data = await res.json();

      if (data.success) {
        const updatedCartItems = cartItems().map((item) =>
          item.cart_item_id === cartItem.cart_item_id
            ? { ...item, product_quantity: item.product_quantity + 1 }
            : item
        );
        setCartItems(updatedCartItems);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div class="flex flex-col gap-8 items-center">
        <h1 class="font-semibold text-3xl">Cart Items</h1>
        <Toaster position="top-center" gutter={24} />
        <For each={cartItems()}>
          {(cartItem, index) => (
            <CartItem
              product={cartItem}
              onDelete={() => {
                setDeletingCartItemData(cartItem);
                setIsDeleteModalOpen(true);
              }}
              onDecreaseQuantity={() => handleDecreaseQuantity(cartItem)}
              onIncreaseQuantity={() => handleIncreaseQuantity(cartItem)}
            />
          )}
        </For>
        <Modal
          open={isDeleteModalOpen()}
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <div class="p-6 text-center">
            <h2 class="text-xl lg:text-2xl font-bold mb-4 py-2">Warning !</h2>
            <p class="mb-4 text-lg lg:text-xl py-2">
              Are you sure about deleting{" "}
              <span class="font-bold">
                {deletingCartItemData().product_name}
              </span>{" "}
              ?
            </p>
            <div class="flex justify-center gap-x-12 py-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                class="px-4 py-2 bg-red-400 text-white rounded-lg text-base lg:text-lg cursor-pointer "
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                class="px-4 py-2 bg-sky-400 text-white rounded-lg text-base lg:text-lg cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

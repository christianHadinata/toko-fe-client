import {
  createEffect,
  createSignal,
  For,
  onMount,
  Switch,
  Match,
} from "solid-js";
import CartItem from "../components/CartItem";
import { setToastSignal } from "../stores/toaster";
import { Toaster } from "solid-toast";
import Modal from "../components/Modal";
import { useNavigate } from "@solidjs/router";

export default function Cart() {
  const [cartItems, setCartItems] = createSignal([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = createSignal(false);
  const [deletingCartItemSignal, setDeletingCartItemSignal] =
    createSignal(null);

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

      const itemSignals = data.map((item) => createSignal(item));
      setCartItems(itemSignals);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const cartItem = deletingCartItemSignal()?.[0]();
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/v1/cart/${cartItem.cart_item_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      let data = await res.json();

      if (data.success) {
        data = {
          ...data,
          message: `${cartItem.product_name} Deleted Successfully!`,
        };

        setCartItems(
          cartItems().filter(
            ([item]) => item().cart_item_id !== cartItem.cart_item_id
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

  const updateQuantity = async (cartItemSignal, change) => {
    const [cartItem, setCartItem] = cartItemSignal;
    const newQty = cartItem().product_quantity + change;
    if (newQty <= 0) return;

    try {
      const token = localStorage.getItem("token");

      const body = { product_quantity: newQty };

      const res = await fetch(
        `http://localhost:5000/api/v1/cart/${cartItem().cart_item_id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();

      if (data.success) {
        setCartItem({ ...cartItem(), product_quantity: newQty });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  // This code is create, to handle problem:
  // when we had products in cart, then we delete one by one
  // when the last product was deleted, the page will show empty cart page that can't be scrolled
  // after that state, for example when we navigate to home page, the page can't be scrolled too
  // so this code is used to clear overflow outcome from using Modal components, to make sure page is scrollable again
  createEffect(() => {
    if (cartItems().length === 0) {
      document.body.style.overflow = ""; // pastikan scroll aktif
    }
  });

  return (
    <>
      <div class="flex flex-col gap-8 items-center">
        <Toaster position="top-center" gutter={24} />
        <Switch>
          <Match when={cartItems().length === 0}>
            <div class="w-full min-h-screen pb-44 flex items-center justify-center">
              <div class="flex flex-col items-center text-center px-4">
                <img
                  src="/assets/Image/empty-cart.png"
                  alt=""
                  class="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem] object-contain"
                />
                <p class="font-semibold text-xl sm:text-2xl capitalize mt-2">
                  Your cart is currently empty!
                </p>
                <p class="text-base sm:text-lg text-gray-500 py-4 max-w-md">
                  Looks like you haven't added anything to your cart yet
                </p>
                <button
                  onClick={handleNavigate}
                  class=" mt-5 bg-sky-400 px-6 py-3 text-base sm:text-lg font-medium capitalize text-white rounded-lg hover:cursor-pointer hover:scale-105 transition-all"
                >
                  Go To Home
                </button>
              </div>
            </div>
          </Match>
          <Match when={cartItems().length > 0}>
            <h1 class="font-semibold text-3xl">Cart Items</h1>
            <For each={cartItems()}>
              {(cartItemSignal) => {
                const [cartItem, setCartItem] = cartItemSignal;
                return (
                  <CartItem
                    product={cartItem}
                    onDelete={() => {
                      setDeletingCartItemSignal(cartItemSignal);
                      setIsDeleteModalOpen(true);
                    }}
                    onDecreaseQuantity={() =>
                      updateQuantity(cartItemSignal, -1)
                    }
                    onIncreaseQuantity={() => updateQuantity(cartItemSignal, 1)}
                  />
                );
              }}
            </For>
            <Modal
              open={isDeleteModalOpen()}
              onClose={() => setIsDeleteModalOpen(false)}
            >
              <div class="p-6 text-center">
                <h2 class="text-xl lg:text-2xl font-bold mb-4 py-2">
                  Warning !
                </h2>
                <p class="mb-4 text-lg lg:text-xl py-2">
                  Are you sure about deleting{" "}
                  <span class="font-bold">
                    {deletingCartItemSignal()?.[0]().product_name}
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
          </Match>
        </Switch>
      </div>
    </>
  );
}

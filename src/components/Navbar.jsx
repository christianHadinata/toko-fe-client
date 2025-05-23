import { createEffect, createSignal, Show, onMount } from "solid-js";
import { A } from "@solidjs/router";

export default function Navbar(props) {
  const [isLogin, setIsLogin] = createSignal(false);
  createEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(token ? true : false);
  });

  return (
    <>
      <nav class="fixed z-50 w-full border-b-2 border-gray-200 bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between px-8">
          <A href={"/"} class="cursor-pointer text-3xl text-sky-400">
            tokofe
          </A>
          <Show when={isLogin()}>
            <div class="flex items-center gap-x-6 py-0.5">
              <A
                href={"/cart"}
                class="rounded-md p-2 hover:bg-gray-100 focus:bg-gray-200"
              >
                <img
                  src={"/assets/icon/cart-1.png"}
                  width={25}
                  height={25}
                  alt="cart"
                ></img>
              </A>
              <A
                href={"/profile"}
                class="rounded-md p-2 hover:bg-gray-100 focus:bg-gray-200"
              >
                <img
                  src={"/assets/icon/profile-1.png"}
                  width={25}
                  height={25}
                  alt="cart"
                ></img>
              </A>
            </div>
          </Show>
          <Show when={!isLogin()}>
            <div class="flex gap-x-6">
              <button class="border-2 border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white py-2 px-4 rounded-xl cursor-pointer">
                <A href={"/register"}>Register</A>
              </button>
              <button class="border-2 border-sky-400 text-white bg-sky-400  hover:bg-sky-300 hover:border-sky-300  py-2 px-4 rounded-xl cursor-pointer">
                <A href={"/login"}>Login</A>
              </button>
            </div>
          </Show>
        </div>
      </nav>
      <div class="pt-24">{props.children}</div>
    </>
  );
}

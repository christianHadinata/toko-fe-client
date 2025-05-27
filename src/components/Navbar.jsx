import { createEffect, createSignal, Show, onMount } from "solid-js";
import { A } from "@solidjs/router";
import ProfileDropdown from "../components/ProfileDropdown";
import Dropdown2 from "./Dropdown2.jsx";

export default function Navbar(props) {
  const [isLogin, setIsLogin] = createSignal(false);
  createEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(token ? true : false);
  });

  const categories = [
    { category_id: 1, category_name: "Fashion" },
    { category_id: 2, category_name: "Beauty" },
    { category_id: 3, category_name: "Groceries" },
    { category_id: 4, category_name: "Electronics" },
    { category_id: 5, category_name: "Furniture" },
    { category_id: 6, category_name: "Sports" },
  ];

  return (
    <>
      <nav class="fixed z-50 w-full border-b-2 border-gray-200 bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between px-8">
          <A
            href={"/"}
            class="cursor-pointer text-3xl text-sky-400"
          >
            tokofe
          </A>
          <div class="flex items-center gap-x-6">
            <div class="group relative flex gap-2 items-center">
              <h3 class="cursor-pointer">Kategori</h3>
              <img
                src={"/assets/icon/iconmonstr-angel-down-thin.svg"}
                class="w-2 h-2"
              />
              <ul class="absolute -bottom-[0.5rem] translate-y-full right-0 group-hover:opacity-100 transition-opacity opacity-0 bg-white rounded-md shadow-lg border-[1px] border-gray-200 p-2">
                <For each={categories}>
                  {(item) => (
                    <li class=" hover:bg-slate-100 rounded-md">
                      <A
                        href={`category/${item.category_name}`}
                        class="px-6 py-2 block nav-category"
                      >
                        {item.category_name}
                      </A>
                    </li>
                  )}
                </For>
              </ul>
            </div>

            <Show when={isLogin()}>
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
              <ProfileDropdown />
            </Show>
            <Show when={!isLogin()}>
              <button class="border-2 border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white py-2 px-4 rounded-xl cursor-pointer">
                <A href={"/register"}>Register</A>
              </button>
              <button class="border-2 border-sky-400 text-white bg-sky-400  hover:bg-sky-300 hover:border-sky-300  py-2 px-4 rounded-xl cursor-pointer">
                <A href={"/login"}>Login</A>
              </button>
            </Show>
          </div>
        </div>
      </nav>
      <div class="pt-24">{props.children}</div>
    </>
  );
}

import { Show } from "solid-js";

export default function CartItem(props) {
  return (
    <div class="rounded-lg p-5 border-2 border-gray-400 md:grid md:grid-cols-[1fr_5fr] gap-x-10 w-full ">
      <img
        src="/assets/Image/03 - red lipstick.jpg"
        alt=""
        class="w-full max-h-40 object-contain self-center mb-4 md:mb-0"
      />
      <div class="flex flex-col gap-y-6 justify-between">
        <div>
          <h2 class="capitalize font-semibold text-clip text-xl">
            Vibrant Red Lipstick
          </h2>
          <p class="text-clip-2 text-gray-500 ">
            A stunning, long-lasting red lipstick.
          </p>
        </div>
        <div>
          <p class="">Stock: 50</p>
          <div class="flex justify-between items-end flex-1">
            <p class="font-bold text-sky-400 md:text-lg">Price: Rp 19.000</p>
            <div class=" flex items-center">
              <button
                class="cursor-pointer rounded-md p-2 hover:bg-gray-100 focus:bg-gray-200"
                onclick={props.onDelete}
              >
                <img src="/assets/icon/deleteBin.png" alt="" class="w-8" />
              </button>
              <div class="flex items-center justify-center rounded-2xl">
                <button
                  onclick={props.onDecreaseQuantity}
                  class={`px-4 py-2 text-lg rounded-md 
                    ${
                      props.product.product_quantity === 1
                        ? "cursor-not-allowed text-gray-500"
                        : "cursor-pointer text-black hover:bg-gray-100 hover:text-sky-400"
                    }`}
                  disabled={props.product.product_quantity === 1}
                >
                  -
                </button>
                <p class="text-lg p-4">{props.product.product_quantity}</p>
                <button
                  onclick={props.onIncreaseQuantity}
                  class={`px-4 py-2  text-lg rounded-md 
                    ${
                      props.product.product_quantity ===
                      props.product.product_stock
                        ? "cursor-not-allowed text-gray-500"
                        : "cursor-pointer text-black hover:bg-gray-100 hover:text-sky-400"
                    }`}
                  disabled={
                    props.product.product_quantity ===
                    props.product.product_stock
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div class="flex w-full items-end bg-red-200">
        <button class="cursor-pointer">
          <img
            src="/assets/icon/deleteBin.png"
            alt=""
            class="max-w-7 max-h-7"
          />
        </button>
        <button>-</button>
        <input type="text" />
        <button>+</button>
      </div> */}
    </div>
  );
}

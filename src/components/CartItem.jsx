import { Show } from "solid-js";

export default function CartItem(props) {
  return (
    <div class="rounded-lg p-5 border-2 border-gray-400 md:grid md:grid-cols-[1fr_5fr] gap-x-10 w-full ">
      <img
        src="/assets/Image/27 - Sony WH-1000XM5 Noise Cancelling Headphones.jpg"
        alt=""
        class="w-full self-center mb-4 md:mb-0"
      />
      <div class="flex flex-col gap-y-6 justify-between">
        <div>
          <h2 class="capitalize font-semibold text-clip text-xl">
            Sony WH-1000XM5 Noise Cancelling Headphones
          </h2>
          <p class="text-clip-2 text-gray-500 ">
            Sony WH-1000XM5 delivers industry-leading noise cancellation,
            crystal-clear sound, and up to 30 hours of battery life for an
            immersive audio experience.
          </p>
        </div>
        <div>
          <p class="">Stock: 20</p>
          <div class="flex justify-between items-end flex-1">
            <p class="font-bold text-sky-400 md:text-lg">Price: Rp 5.999.000</p>
            <div class=" flex items-center">
              <button class="cursor-pointer" onclick={props.onDelete}>
                <img src="/assets/icon/deleteBin.png" alt="" class="w-8" />
              </button>
              <div class="flex items-center justify-center rounded-2xl">
                <Show when={props.product.product_quantity === 1}>
                  <button
                    onclick={props.onDecreaseQuantity}
                    class="cursor-pointer p-4 text-lg"
                    disabled
                  >
                    -
                  </button>
                </Show>
                <Show when={props.product.product_quantity > 1}>
                  <button
                    onclick={props.onDecreaseQuantity}
                    class="cursor-pointer p-4 text-lg"
                  >
                    -
                  </button>
                </Show>
                <p class="text-lg">{props.product.product_quantity}</p>
                <Show
                  when={
                    props.product.product_quantity ===
                    props.product.product_stock
                  }
                >
                  <button
                    onclick={props.onIncreaseQuantity}
                    class="cursor-pointer p-4 text-lg"
                    disabled
                  >
                    +
                  </button>
                </Show>
                <Show
                  when={
                    props.product.product_quantity < props.product.product_stock
                  }
                >
                  <button
                    onclick={props.onIncreaseQuantity}
                    class="cursor-pointer p-4 text-lg"
                  >
                    +
                  </button>
                </Show>
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

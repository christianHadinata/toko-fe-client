import { createSignal, onMount, Show } from "solid-js";
import { formatCurrency } from "../utils/formatCurrency";

export default function CartItem(props) {
  const [productData, setProductData] = createSignal(null);

  onMount(() => {
    fetchSingleProductData();
  });

  const fetchSingleProductData = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/products/${props.product().product_id}`
      );
      const data = await res.json();

      setProductData({
        ...data,
        formatted_product_price: formatCurrency(data.product_price),
      });
      console.log(productData());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Show when={productData()}>
      <div class="rounded-lg p-5 border-2 border-gray-400 md:grid md:grid-cols-[1fr_5fr] gap-x-10 w-full ">
        <img
          src={`http://localhost:5000/${
            productData().product_featured_image_url
          }`}
          alt=""
          class="w-full max-h-40 object-contain self-center mb-4 md:mb-0"
        />
        <div class="flex flex-col gap-y-6 justify-between">
          <div>
            <h2 class="capitalize font-semibold text-clip text-xl">
              {productData().product_name}
            </h2>
            <p class="text-clip-2 text-gray-500 ">
              {productData().product_details}
            </p>
          </div>
          <div>
            <p class="">Stock: {productData().product_stock}</p>
            <div class="flex justify-between items-end flex-1">
              <p class="font-bold text-sky-400 md:text-lg">
                Price: {productData().formatted_product_price}
              </p>

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
                      props.product().product_quantity === 1
                        ? "cursor-not-allowed text-gray-500"
                        : "cursor-pointer text-black hover:bg-gray-100"
                    }`}
                    disabled={props.product().product_quantity === 1}
                  >
                    -
                  </button>
                  <p class="text-lg p-4">{props.product().product_quantity}</p>
                  <button
                    onclick={props.onIncreaseQuantity}
                    class={`px-4 py-2  text-lg rounded-md 
                    ${
                      props.product().product_quantity ===
                      productData().product_stock
                        ? "cursor-not-allowed text-gray-500"
                        : "cursor-pointer text-black hover:bg-gray-100"
                    }`}
                    disabled={
                      props.product().product_quantity ===
                      productData().product_stock
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
}

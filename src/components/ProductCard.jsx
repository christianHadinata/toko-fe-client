import { A } from "@solidjs/router";

export default function ProductCard(props) {
  return (
    <A
      href={`/product-details/${props.product_id}`}
      class="flex cursor-pointer flex-col rounded-xl shadow-md shadow-gray-200 transition-all hover:scale-105"
    >
      {/* <img
        src={`http://localhost:5000/${props.product_featured_image_url}`}
        alt=""
        class="w-full rounded-t-xl object-cover"
      /> */}
      <div class="w-full aspect-[1/1] overflow-hidden rounded-t-xl">
        <img
          src={`http://localhost:5000/${props.product_featured_image_url}`}
          alt={props.product_name}
          class="h-full w-full object-cover"
        />
      </div>
      <div class="flex w-full flex-col rounded-b-xl px-3 py-8 capitalize">
        <h4 class="line-clamp-2 text-lg font-medium">{props.product_name}</h4>
        <h3 class="mt-2 text-xl font-semibold text-sky-400">
          {"Rp "}
          {props.formatted_product_price}
        </h3>
      </div>
    </A>
  );
}

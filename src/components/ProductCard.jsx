import { A } from "@solidjs/router";

export default function ProductCard(props) {
  return (
    // <A
    //   href={`/product-details/1`}
    //   class="flex h-[350px] w-[186px] cursor-pointer flex-col rounded-xl shadow-md shadow-gray-200 transition-all hover:scale-105"
    // >
    //   <img
    //     src={dummyProductImage}
    //     alt=""
    //     class="h-3/5 w-full rounded-t-xl object-cover"
    //   />
    //   <div class="flex h-2/5 w-full flex-col rounded-b-xl p-3 capitalize">
    //     <h4 class="line-clamp-2 text-sm font-medium">
    //       {"White t shirt make for everything good because of material"}
    //     </h4>
    //     <h3 class="mt-2 text-base font-semibold text-sky-400">
    //       {"Rp 75.000"}
    //     </h3>
    //     <div class="mt-4 flex h-4 items-center text-xs">
    //       <img src="/icon/star.png" alt="" class="h-3 w-3" />
    //       <div class="flex items-center">
    //         <span class="ml-1">4.9</span>
    //         <span class="ml-1">|</span>
    //         <span class="ml-1">17 sold</span>
    //       </div>
    //     </div>
    //   </div>
    // </A>
    <A
      href={`/product-details/${props.product_id}`}
      class="flex h-[350px] w-[186px] cursor-pointer flex-col rounded-xl shadow-md shadow-gray-200 transition-all hover:scale-105"
    >
      <img
        src={"/assets/Image/01 - white tshirt.jpg"}
        alt=""
        class="h-3/5 w-full rounded-t-xl object-cover"
      />
      <div class="flex h-2/5 w-full flex-col rounded-b-xl p-3 capitalize">
        <h4 class="line-clamp-2 text-sm font-medium">{props.product_name}</h4>
        <h3 class="mt-2 text-base font-semibold text-sky-400">
          {"Rp "}
          {props.formatted_product_price}
        </h3>
        <div class="mt-4 flex h-4 items-center text-xs">
          <img src={"/assets/icon/star.png"} alt="" class="h-3 w-3" />
          <div class="flex items-center">
            <span class="ml-1">4.9</span>
            <span class="ml-1">|</span>
            <span class="ml-1">17 sold</span>
          </div>
        </div>
      </div>
    </A>
  );
}

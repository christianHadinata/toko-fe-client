import { A } from "@solidjs/router";
export default function CategoryCard(props) {
  return (
    <A
      href={`/category/${props.category_name}`}
      class="relative w-full cursor-pointer overflow-hidden rounded-xl"
    >
      <img
        src={`/assets/Image/dummyCategory${props.category_name}.jpg`}
        alt="tech"
        class="h-full w-full rounded-xl object-cover transition-all hover:scale-110"
      />

      <h3 class="absolute left-0 top-5 z-20 w-full text-center text-2xl font-semibold text-white">
        {props.category_name}
      </h3>
      {/* <div class="absolute inset-0 z-10 overflow-hidden">
        {console.log(props)}
        <img
          src={`/assets/Image/dummyCategory${props.category_name}.jpg`}
          alt="tech"
          class="h-full w-full rounded-xl object-cover transition-all hover:scale-110"
        />
      </div>

      <h3 class="absolute left-0 top-5 z-20 w-full text-center text-2xl font-semibold text-white">
        {props.category_name}
      </h3> */}
    </A>
    //   <A
    //   href={`/category/${props.category_name}`}
    //   class="relative h-[250px] w-[186px] cursor-pointer overflow-hidden rounded-xl"
    // >
    //   <div class="absolute inset-0 z-10 overflow-hidden">
    //     <img
    //       src={dummyCategoryImages}
    //       alt="tech"
    //       class="h-full w-full rounded-xl object-cover transition-all hover:scale-110"
    //     />
    //   </div>

    //   <h3 class="absolute left-0 top-5 z-20 w-full text-center text-2xl font-semibold text-white">
    //     {props.category_name}
    //   </h3>
    // </A>
  );
}

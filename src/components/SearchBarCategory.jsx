export default function SearchBarCategory(props) {
  return (
    <div class="flex w-[1200px]  mt-14">
      <select
        name=""
        id=""
        class="w-1/6 px-2 border-2 border-gray-300  rounded-l-xl border-r-0"
      >
        <option value="">All</option>
        <option value="">{props.category_name}</option>
      </select>
      <div class="border-2 border-gray-300 w-full flex rounded-r-xl">
        <img
          src={"/assets/icon/search-1.png"}
          width={20}
          height={10}
          alt="search"
          class="contrast-0 py-2 ml-2 "
        ></img>
        <input
          type="text"
          placeholder="Cari di Tokosiceha"
          class="w-full px-5 text-sm placeholder-gray-600 outline-none py-2"
        />
      </div>
    </div>
  );
}

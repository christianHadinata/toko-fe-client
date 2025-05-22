export default function SearchBar() {
  return (
    <div class="flex w-full rounded-xl border-2 border-gray-300 px-5 py-2">
      <img
        src={"/assets/icon/search-1.png"}
        width={20}
        height={10}
        alt="search"
        class="contrast-0"
      ></img>
      <input
        type="text"
        placeholder="Cari di Tokofe"
        class="w-full px-5 placeholder-gray-600 outline-none"
      />
    </div>
  );
}

import { useNavigate } from "@solidjs/router";

export default function SearchBarCategory(props) {
  const navigate = useNavigate();

  let filterRef;
  let searchRef;

  const handleSubmit = (e) => {
    e.preventDefault();
    const filter = filterRef.value;
    const searchQuery = searchRef.value.trim();

    if (searchQuery !== "") {
      let url = `/search?q=${searchQuery}`;

      if (filter !== "") {
        url += `&category=${filter}`;
      }

      navigate(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="flex w-full">
      <select
        class="w-1/6 px-2 border-2 border-gray-300  rounded-l-xl border-r-0 py-2"
        ref={filterRef}
        value={props.category_name}
      >
        <option value="">All</option>
        <option value={props.category_name}>{props.category_name}</option>
      </select>
      <div class="border-2 border-gray-300 w-full flex rounded-r-xl py-2">
        <img
          src={"/assets/icon/search-1.png"}
          width={20}
          height={10}
          alt="search"
          class="contrast-0 py-2 ml-2 "
        ></img>
        <input
          ref={searchRef}
          type="text"
          placeholder="Cari di Tokofe"
          class="w-full px-5 placeholder-gray-600 outline-none py-2"
        />
      </div>
    </form>
  );
}

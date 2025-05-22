import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";

export default function SearchBar() {
  const [input, setInput] = createSignal("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const keyword = input().trim();
    if (keyword) {
      navigate(`/search?q=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      class="flex w-full rounded-xl border-2 border-gray-300 px-5 py-2"
    >
      <img
        src={"/assets/icon/search-1.png"}
        width={20}
        height={10}
        alt="search"
        class="contrast-0"
      />
      <input
        type="text"
        placeholder="Cari di Tokofe"
        class="w-full px-5 placeholder-gray-600 outline-none"
        value={input()}
        onInput={(e) => setInput(e.target.value)}
      />
    </form>
  );
}

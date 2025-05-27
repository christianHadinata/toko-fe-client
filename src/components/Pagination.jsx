// numOfPage
// onPageChange

import { createSignal } from "solid-js";

export default function Pagination(props) {
  console.log(props.currentPage);
  return (
    <div
      id="pagination"
      class="flex gap-3 justify-center"
    >
      <Show when={props.totalPages > 1}>
        <Show when={props.currentPage > 1}>
          <button
            type="text"
            onClick={(e) => props.pageHandler(props.currentPage - 1)}
            class={`text-lg hover:cursor-pointer hover:text-sky-400`}
          >
            {"<"}
          </button>
        </Show>

        {Array.from({ length: props.totalPages }, (_, i) => i + 1).map((page) => (
          <button
            type="text"
            onClick={(e) => props.pageHandler(page)}
            class={`${page === props.currentPage ? "underline font-semibold " : ""} text-xl hover:cursor-pointer hover:text-sky-400`}
          >
            {page}
          </button>
        ))}

        <Show when={props.currentPage < props.totalPages}>
          <button
            type="text"
            onClick={(e) => props.pageHandler(props.currentPage + 1)}
            class={`text-lg hover:cursor-pointer hover:text-sky-400`}
          >
            {">"}
          </button>
        </Show>
      </Show>
    </div>
  );
}

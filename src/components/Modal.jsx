import { Show, createEffect } from "solid-js";
import { Portal } from "solid-js/web";

export default function Modal(props) {
  createEffect(() => {
    // ini kalau mau belakang nya gabisa nge scroll
    if (props.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  return (
    <Show when={props.open}>
      <Portal>
        <div
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={props.onClose}
        >
          <div
            class="bg-white rounded-2xl shadow-lg max-w-md w-full mx-4 lg:max-w-lg lg:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            {props.children}
          </div>
        </div>
      </Portal>
    </Show>
  );
}

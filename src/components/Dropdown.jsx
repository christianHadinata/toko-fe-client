import { createSignal, onCleanup, onMount, createEffect, Show, For } from "solid-js";

export const Dropdown = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [selectedItem, setSelectedItem] = createSignal(props.defaultValue || "Select an option");

  let dropdownRef;

  const options = props.options || [];

  const toggleDropdown = () => {
    setIsOpen(!isOpen());
  };

  const selectItem = (option) => {
    setSelectedItem(option.label);
    setIsOpen(false);
    props.onSelect?.(option);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef && !dropdownRef.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Close dropdown on Escape key
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
  });

  onCleanup(() => {
    document.removeEventListener("click", handleClickOutside);
    document.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div
      class="relative inline-block w-48"
      ref={dropdownRef}
    >
      <button
        class="w-full rounded-xl border-black border px-2 py-2 bg-white cursor-pointer flex justify-between items-center text-sm focus:outline-none"
        onClick={toggleDropdown}
        aria-expanded={isOpen()}
        aria-haspopup="listbox"
      >
        {selectedItem()}
        <span class={`text-xs transition-transform duration-200 ${isOpen() ? "rotate-180" : ""}`}>▼</span>
      </button>

      {isOpen() && (
        <ul
          class="absolute top-full left-0 right-0 bg-white rounded-xl border-black border border-t-0 list-none m-0 p-0 max-h-48 overflow-y-auto z-50"
          role="listbox"
        >
          {options.map((option) => (
            <li
              class="px-2 py-2 cursor-pointer text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
              onClick={() => selectItem(option)}
              role="option"
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  selectItem(option);
                }
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

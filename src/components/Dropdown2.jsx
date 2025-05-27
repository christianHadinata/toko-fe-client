export default function Dropdown2(props) {
  return (
    <select
      class="w-full border-[1px] border-black rounded-full"
      //   ref={filterRef}
      //   value={props.default
      value={props.value}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
    >
      <For each={props.items()}>
        {(item) => {
          return <option value={item.value}>{item.label}</option>;
        }}
      </For>
      {/* <option value="all">All</option>
      <option value={props.category_name}>{props.category_name}</option> */}
    </select>
  );
}

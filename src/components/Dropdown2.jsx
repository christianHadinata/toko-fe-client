export default function Dropdown2(props) {
  // const value = () => {
  //   props.value || props.value.subdistrict_name || props.value.district_name;
  // };

  return (
    <select
      class="w-full border-[1px] border-black rounded-full"
      //   ref={filterRef}
      //   value={props.default
      value={JSON.stringify(props.value)}
      onChange={(e) => {
        props.onChange(JSON.parse(e.target.value));
      }}
    >
      <For each={props.items}>
        {(item) => {
          return (
            <option value={JSON.stringify(item)}>
              {item.value || item.subdistrict_name || item.district_name}
            </option>
            // <option value={item.subdistrict_id || item.district_id}>
            //   {item.value || item.subdistrict_name || item.district_name}
            // </option>
          );
        }}
      </For>
      {/* <option value="all">All</option>
      <option value={props.category_name}>{props.category_name}</option> */}
    </select>
  );
}

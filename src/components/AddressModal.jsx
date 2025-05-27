import { createSignal } from "solid-js";
import Modal from "./Modal.jsx";
import Dropdown2 from "./Dropdown2.jsx";

// isOpen, title, onClose, defaultAddressLabel, defaultAddress, defaultDistrict, defaultSubDistrict, onSave
export default function AddressModal(props) {
  const [addressLabel, setAddressLabel] = createSignal(props.defaultAddressLabel || "");
  const [address, setAddress] = createSignal(props.defaultAddress || "");

  const [districtsOptions, setDistrictsOptions] = createSignal([
    { label: "Cidadap", value: "Cidadap" },
    { label: "Andir", value: "Andir" },
    { label: "Antapani", value: "Antapani" },
  ]);
  const [subDistrictsOptions, setSubDistrictsOptions] = createSignal([
    { label: "Hegarmanah", value: "Hegarmanah" },
    { label: "Caringin", value: "Caringin" },
    { label: "Cijerah", value: "Cijerah" },
  ]);

  const [selectedDistrict, setSelectedDistrict] = createSignal(props.defaultDistrict || districtsOptions()[0].value);
  const [selectedSubDistrict, setSelectedSubDistrict] = createSignal(props.defaultSubDistrict || subDistrictsOptions()[0].value);

  return (
    <>
      <Modal
        open={props.isOpen}
        onClose={() => {
          props.onClose();
        }}
      >
        <div class="p-6">
          <div class="flex justify-between">
            <h2 class="font-bold text-xl">{props.title}</h2>
            <button
              class="font-semibold text-3xl hover:font-bold hover:cursor-pointer"
              onClick={() => {
                props.onClose();
              }}
            >
              X
            </button>
          </div>
          <div class="grid grid-cols-[1fr_2fr] items-center gap-y-4">
            <p class="">Address label </p>
            <div class="">
              <span class="mr-2">:</span>
              <input
                type="text"
                class="rounded-2xl border-black border-1 px-2"
                value={props.defaultAddressLabel || ""}
                onchange={(e) => {
                  setAddressLabel(e.target.value);
                }}
              />
            </div>

            <p class="">Address </p>
            <div class="">
              <span class="mr-2">:</span>
              <input
                type="text"
                class="rounded-2xl border-black border-1 px-2"
                value={props.defaultAddress || ""}
                onchange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>

            <p class="">District</p>
            <div class="flex">
              <span class="mr-2">:</span>
              <Dropdown2
                items={districtsOptions}
                value={selectedDistrict()}
                defaultValue={props.defaultDistrict}
                onChange={(selectedValue) => {
                  setSelectedDistrict(selectedValue);
                }}
              />
            </div>

            <p>Subdistrict</p>
            <div class="flex items-center">
              <span class="mr-2">:</span>
              <Dropdown2
                items={subDistrictsOptions}
                value={selectedSubDistrict()}
                onChange={(selectedValue) => {
                  setSelectedSubDistrict(selectedValue);
                }}
              />
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button
              class="rounded-2xl border-1 px-3 py-1 hover:cursor-pointer hover:bg-slate-100"
              onClick={() => {
                props.onSave(addressLabel(), address(), selectedDistrict(), selectedSubDistrict());
              }}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

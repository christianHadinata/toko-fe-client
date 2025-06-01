import { createSignal, createEffect, onMount } from "solid-js";
import Modal from "./Modal.jsx";
import Dropdown2 from "./Dropdown2.jsx";
import districtSignal from "../stores/districtSignal.js";
import { flipIsCreatingAddress } from "../stores/creatingAddress.js";
import { districts } from "../data/districts.js";
import { subdistricts } from "../data/subdistricts.js";

// isOpen, title, onClose, defaultAddressLabel, defaultAddress, defaultDistrict, defaultSubDistrict, onSave
export default function AddressModal(props) {
  const [addressLabel, setAddressLabel] = createSignal(
    props.defaultAddressLabel || ""
  );
  const [address, setAddress] = createSignal(props.defaultAddress || "");
  const [_, setDistrictId] = districtSignal;

  const [selectedDistrict, setSelectedDistrict] = createSignal(
    props.defaultDistrict
  );
  const [selectedSubDistrict, setSelectedSubDistrict] = createSignal(
    props.defaultSubDistrict
  );

  const [filteredSubDistrict, setFilteredSubDistrict] = createSignal();

  createEffect(() => {
    setFilteredSubDistrict(
      subdistricts.filter(
        (currSubDistricts) =>
          currSubDistricts.district_id === selectedDistrict().district_id
      )
    );
  });

  const handleRefreshSelected = () => {
    setSelectedDistrict(props.defaultDistrict);
    setSelectedSubDistrict(props.defaultSubDistrict);
  };

  return (
    <>
      <Modal
        open={props.isOpen}
        onClose={() => {
          setSelectedDistrict(props.defaultDistrict);
          setSelectedSubDistrict(props.defaultSubDistrict);
          props.onClose();
        }}
      >
        <div class="p-6">
          <div class="flex justify-between">
            <h2 class="font-bold text-xl">{props.title}</h2>
            <button
              class="font-semibold text-3xl hover:font-bold hover:cursor-pointer"
              onClick={() => {
                flipIsCreatingAddress();
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
                items={districts}
                value={selectedDistrict()}
                // defaultValue={props.defaultDistrict}
                onChange={(selectedValue) => {
                  setSelectedDistrict(selectedValue);
                  setDistrictId(selectedValue);
                }}
              />
            </div>

            <p>Subdistrict</p>
            <div class="flex items-center">
              <span class="mr-2">:</span>
              <Dropdown2
                items={filteredSubDistrict()}
                value={selectedSubDistrict()}
                onChange={(val) => {
                  console.log(val);
                  setSelectedSubDistrict(val);
                }}
              />
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button
              class="rounded-2xl border-1 px-3 py-1 hover:cursor-pointer hover:bg-slate-100"
              onClick={() => {
                flipIsCreatingAddress();
                console.log(
                  addressLabel(),
                  address(),
                  selectedDistrict(),
                  selectedSubDistrict()
                );

                props.onSave(
                  addressLabel(),
                  address(),
                  selectedDistrict(),
                  selectedSubDistrict(),
                  handleRefreshSelected
                );
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

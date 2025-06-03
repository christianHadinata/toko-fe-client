import { createSignal, createEffect, onMount } from "solid-js";
import Modal from "./Modal.jsx";
import Dropdown2 from "./Dropdown2.jsx";
import { districts } from "../data/districts.js";
import { subdistricts } from "../data/subdistricts.js";

export default function AddressModal(props) {
  const [label, setLabel] = createSignal("");
  const [address, setAddress] = createSignal("");
  const [selectedDistrict, setSelectedDistrict] = createSignal(null);
  const [selectedSubDistrict, setSelectedSubDistrict] = createSignal(null);
  const [filteredSubDistricts, setFilteredSubDistricts] = createSignal([]);

  createEffect(() => {
    if (!props.isOpen) return;

    if (props.isEdit && props.addressData) {
      initializeEditForm(props.addressData);
    } else {
      initializeNewForm();
    }
  });

  function initializeEditForm(addr) {
    setLabel(addr.address_label);
    setAddress(addr.address_name);

    const district = districts.find((d) => d.district_id === addr.district_id);
    if (!district) return;

    setSelectedDistrict(district);

    const subs = getSubdistrictsForDistrict(district.district_id);
    setFilteredSubDistricts(subs);

    const sub = subs.find((s) => s.subdistrict_id === addr.subdistrict_id);
    setSelectedSubDistrict(sub ?? subs[0]);
  }

  function initializeNewForm() {
    const defaultDistrict = districts[0];
    if (!defaultDistrict) return;

    setLabel("");
    setAddress("");
    setSelectedDistrict(defaultDistrict);

    const subs = getSubdistrictsForDistrict(defaultDistrict.district_id);
    setFilteredSubDistricts(subs);
    setSelectedSubDistrict(subs[0]);
  }

  function getSubdistrictsForDistrict(districtId) {
    return subdistricts.filter((s) => s.district_id === districtId);
  }

  function handleDistrictChange(district) {
    setSelectedDistrict(district);
    const subs = getSubdistrictsForDistrict(district.district_id);
    setFilteredSubDistricts(subs);
    setSelectedSubDistrict(subs[0]);
  }
  const onSubmit = () => {
    const payload = {
      address_id: props.isEdit ? props.addressData.address_id : undefined,
      address_label: label(),
      address_name: address(),
      subdistrict_id: selectedSubDistrict().subdistrict_id,
    };
    props.onSave(payload);
  };

  return (
    <>
      <Modal open={props.isOpen} onClose={props.onClose}>
        <div class="p-6">
          <div class="flex justify-between">
            <h2 class="font-bold text-xl">
              {" "}
              {props.isEdit ? "Edit Address" : "Add Address"}
            </h2>
            <button
              class="font-semibold text-3xl hover:font-bold hover:cursor-pointer"
              onClick={props.onClose}
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
                value={label()}
                onInput={(e) => setLabel(e.target.value)}
              />
            </div>

            <p class="">Address </p>
            <div class="">
              <span class="mr-2">:</span>
              <input
                type="text"
                class="rounded-2xl border-black border-1 px-2"
                value={address()}
                onInput={(e) => setAddress(e.target.value)}
              />
            </div>

            <p class="">District</p>
            <div class="flex">
              <span class="mr-2">:</span>
              <Dropdown2
                items={districts}
                value={selectedDistrict()}
                onChange={(district) => {
                  handleDistrictChange(district);
                }}
              />
            </div>

            <p>Subdistrict</p>
            <div class="flex items-center">
              <span class="mr-2">:</span>
              <Dropdown2
                items={filteredSubDistricts()}
                value={selectedSubDistrict()}
                onChange={setSelectedSubDistrict}
              />
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button
              class="rounded-2xl border-1 px-3 py-1 hover:cursor-pointer hover:bg-slate-100"
              onClick={onSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

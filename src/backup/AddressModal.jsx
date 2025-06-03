import { createSignal, createEffect, onCleanup } from "solid-js";
import Modal from "./Modal";
import Dropdown2 from "./Dropdown2";

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

    const district = props.districts.find(
      (d) => d.district_id === addr.district_id
    );
    if (!district) return;

    setSelectedDistrict(district);

    const subs = getSubdistrictsForDistrict(district.district_id);
    setFilteredSubDistricts(subs);

    const sub = subs.find((s) => s.subdistrict_id === addr.subdistrict_id);
    setSelectedSubDistrict(sub ?? subs[0]);
  }

  function initializeNewForm() {
    const defaultDistrict = props.districts[0];
    if (!defaultDistrict) return;

    setLabel("");
    setAddress("");
    setSelectedDistrict(defaultDistrict);

    const subs = getSubdistrictsForDistrict(defaultDistrict.district_id);
    setFilteredSubDistricts(subs);
    setSelectedSubDistrict(subs[0]);
  }

  function getSubdistrictsForDistrict(districtId) {
    return props.subdistricts.filter((s) => s.district_id === districtId);
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
    <Modal open={props.isOpen} onClose={props.onClose}>
      <div class="p-6">
        <div class="flex justify-between mb-4">
          <h2 class="text-xl font-bold">
            {props.isEdit ? "Edit Address" : "Add Address"}
          </h2>
          <button class="text-xl hover:font-bold" onClick={props.onClose}>
            ✕
          </button>
        </div>

        <div class="grid grid-cols-[1fr_2fr] items-center gap-y-4">
          <label>Address Label</label>
          <input
            class="border-1 border-black px-2 rounded-xl"
            value={label()}
            onInput={(e) => setLabel(e.target.value)}
          />

          <label>Address</label>
          <input
            class="border-1 border-black px-2 rounded-xl"
            value={address()}
            onInput={(e) => setAddress(e.target.value)}
          />

          <label>District</label>
          <Dropdown2
            items={props.districts}
            value={selectedDistrict()}
            onChange={(district) => {
              handleDistrictChange(district);
            }}
          />

          <label>Subdistrict</label>
          <Dropdown2
            items={filteredSubDistricts()}
            value={selectedSubDistrict()}
            onChange={setSelectedSubDistrict}
          />
        </div>

        <div class="mt-6 flex justify-end">
          <button
            class="px-4 py-2 bg-green-500 text-white rounded-xl"
            onClick={onSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}

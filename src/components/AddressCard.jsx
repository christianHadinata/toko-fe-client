import Modal from "./Modal";
import { createSignal } from "solid-js";
import { Dropdown } from "./Dropdown";
import Dropdown2 from "./Dropdown2.jsx";
import AddressModal from "./AddressModal.jsx";

export default function AddressCard(props) {
  const [activeEditAdress, setActiveEditAdress] = createSignal(false);

  // const [districtsOptions, setDistrictsOptions] = createSignal([
  //   { label: "Cidadap", value: "Cidadap" },
  //   { label: "Andir", value: "Andir" },
  //   { label: "Antapani", value: "Antapani" },
  // ]);
  // const [subDistrictsOptions, setSubDistrictsOptions] = createSignal([
  //   { label: "Hegarmanah", value: "Hegarmanah" },
  //   { label: "Caringin", value: "Caringin" },
  //   { label: "Cijerah", value: "Cijerah" },
  // ]);

  // const [selectedDistrict, setSelectedDistrict] = createSignal();
  // const [selectedSubDistrict, setSelectedSubDistrict] = createSignal();
  //   const districtsOptions = [
  //     { label: "Cidadap", value: "Cidadap" },
  //     { label: "Andir", value: "Andir" },
  //     { label: "Antapani", value: "Antapani" },
  //   ];
  //   const subdistrictsOptions = [
  //     { label: "Hegarmanah", value: "Hegarmanah" },
  //     { label: "Caringin", value: "Caringin" },
  //     { label: "Cijerah", value: "Cijerah" },
  //   ];

  return (
    <div class="flex p-4 justify-between items-center border-2 border-black my-4 rounded-xl">
      <div class="flex flex-col">
        <h2 class="font-bold">{props.address_label}</h2>
        <p>{props.address}</p>
        <div class="flex font-semibold">
          <p>{props.districts}, </p>
          <p>{props.subdistricts}</p>
        </div>
      </div>

      <button
        class="rounded-2xl border-1 px-2 py-1 hover:cursor-pointer hover:bg-slate-100"
        onClick={() => {
          // setSelectedDistrict(props.districts);
          // setSelectedSubDistrict(props.subdistricts);
          setActiveEditAdress(true);
        }}
      >
        Edit Address
      </button>
      {/* isOpen, title, onClose, defaultAddressLabel, defaultAddress, defaultDistrict, defaultSubDistrict, onSave */}
      <AddressModal
        isOpen={activeEditAdress()}
        title={"Edit Address"}
        onClose={() => {
          setActiveEditAdress(false);
        }}
        defaultAddressLabel={props.address_label}
        defaultAddress={props.address}
        defaultDistrict={props.districts}
        defaultSubDistrict={props.subdistricts}
        onSave={(addressLabel, address, selectedDistrict, selectedSubDistrict) => {
          console.log(addressLabel, address, selectedDistrict, selectedSubDistrict);
          setActiveEditAdress(false);
        }}
      />
    </div>
  );
}

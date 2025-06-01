import Modal from "./Modal";
import { createEffect, createSignal } from "solid-js";
import { Dropdown } from "./Dropdown";
import Dropdown2 from "./Dropdown2.jsx";
import AddressModal from "./AddressModal.jsx";
import { bumpAddressVersion } from "../stores/addressVersion";

export default function AddressCard(props) {
  console.log(props);
  // const propsDefaultDistrict = {
  //   district_id: props.district_id,
  //   district_name: props.district_name,
  // };
  // const propsDefaultSubDisctrict = {
  //   subdistrict_id: props.subdistrict_id,
  //   subdistrict_name: props.subdistrict_name,
  //   district_id: props.district_id,
  // };

  createEffect(() => {
    console.log("from effect", props.address);
  });

  const [activeEditAdress, setActiveEditAdress] = createSignal(false);
  const [draftAddress, setDraftAddress] = createSignal({});

  const handleSaveAddress = async ({ addressId, addressLabel, address, selectedSubDistrict }) => {
    try {
      // const id = signalId()
      const token = localStorage.getItem("token");

      const newAddress = {
        address_id: addressId,
        address_name: address,
        address_label: addressLabel,
        subdistrict_id: selectedSubDistrict.subdistrict_id,
      };

      const response = await fetch(`http://localhost:5000/api/v1/users/updateaddress`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAddress),
      });

      const data = await response.json();

      console.log(newAddress);

      props.onSave(newAddress);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="flex p-4 justify-between items-center border-2 border-black my-4 rounded-xl">
      <div class="flex flex-col">
        <h2 class="font-bold">{props.address.address_label}</h2>
        <p>{props.address.address_name}</p>
        <div class="flex font-semibold">
          <p>{props.address.district_name}, </p>
          <p>{props.address.subdistrict_name}</p>
        </div>
      </div>

      {/* <div>{JSON.stringify(props.address)}</div>
      <div>{JSON.stringify(props.address.district_name)}</div> */}

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
        isOpen={
          // setDraftAddress({
          //   address_label: props.address_label,
          //   address_name: props.address_name,
          //   propsDefaultDistrict,
          //   propsDefaultSubDisctrict,
          // });
          activeEditAdress()
        }
        title={"Edit Address"}
        onClose={() => {
          setActiveEditAdress(false);
        }}
        isEdit={true}
        // defaultAddressId={props.address_id}
        defaultAddressLabel={props.address.address_label}
        defaultAddress={props.address.address_name}
        defaultDistrict={{
          district_id: props.address.district_id,
          district_name: props.address.district_name,
        }}
        defaultSubDistrict={{
          subdistrict_id: props.address.subdistrict_id,
          subdistrict_name: props.address.subdistrict_name,
          district_id: props.address.district_id,
        }}
        onSave={(addressLabel, address, selectedDistrict, selectedSubDistrict) => {
          handleSaveAddress({
            addressId: props.address.address_id,
            addressLabel,
            address,
            selectedSubDistrict,
          });
          console.log(addressLabel, address, selectedDistrict, selectedSubDistrict);
          setActiveEditAdress(false);
        }}
      />
    </div>
  );
}

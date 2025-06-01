import Modal from "./Modal";
import { createEffect, createSignal } from "solid-js";
import { Dropdown } from "./Dropdown";
import Dropdown2 from "./Dropdown2.jsx";
import AddressModal from "./AddressModal.jsx";
import { subDistrictsOptions, districtsOptions } from "../resources/districtAndSubdistrict";
import { bumpAddressVersion } from "../stores/addressVersion";

export default function AddressCard(props) {
  const [activeEditAdress, setActiveEditAdress] = createSignal(false);
  const [ draftAddress, setDraftAddress ] = createSignal({});

  createEffect(()=>{
    setDraftAddress()
  })
  
  const handleSaveAddress = async () => {      
      try {
          // const id = signalId()
          const token = localStorage.getItem("token");
  
          const body = () => draftUser();
  
          const response = await fetch(`http://localhost:5000/api/v1/users/updateaddress`,{
            method : 'PATCH',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            body : JSON.stringify(body())
          });
          
          const data = await response.json();
          console.log(data)
          if (data.success){
            bumpAddressVersion()
          }
  
        } catch (error) {
          console.log(error)
        }
    }

  return (
    <div class="flex p-4 justify-between items-center border-2 border-black my-4 rounded-xl">
      <div class="flex flex-col">
        <h2 class="font-bold">{props.address_label}</h2>
        <p>{props.address_name}</p>
        <div class="flex font-semibold">
          <p>{props.district_name}, </p>
          <p>{props.subdistrict_name}</p>
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
        districtsOptions={districtsOptions()}
        subDistrictsOptions={subDistrictsOptions()}
        isEdit={true}
        defaultAddressId={props.address_id}
        defaultAddressLabel={props.address_label}
        defaultAddress={props.address_name}
        defaultDistrict={props.district_name}
        defaultSubDistrict={props.subdistrict_name}
        onSave={(addressLabel, address, selectedDistrict, selectedSubDistrict) => {
          handleSaveAddress({

            addressLabel, 
            address, 
            selectedDistrict, 
            selectedSubDistrict});
          console.log(addressLabel, address, selectedDistrict, selectedSubDistrict);
          setActiveEditAdress(false);
        }}
      />
    </div>
  );
}

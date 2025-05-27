import { createSignal, Switch, Match } from "solid-js";
import { useNavigate } from "@solidjs/router";
import Line from "../components/Line";
import AddressCard from "../components/AddressCard";
import Modal from "../components/Modal";
import Dropdown2 from "../components/Dropdown2.jsx";
import AddressModal from "../components/AddressModal.jsx";

function ProfilePage() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = createSignal({
    username: "Michael Scofield",
    phone_number: "08123456789",
    email: "michaelscofield@gmail.com",
  });

  const [activeEditProfile, setActiveEditProfile] = createSignal(false);
  const [isAddAddress, setIsAddAddress] = createSignal(false);
  const [addresses, setAddresses] = createSignal([
    {
      address_label: "Home",
      address: "Jl. Bukit Jarian No 123",
      districts: "Cidadap",
      subdistricts: "Hegarmanah",
    },
    {
      address_label: "Office",
      address: "Jl. Jarian Bukit No 123",
      districts: "Andir",
      subdistricts: "Hegarmanah",
    },
    {
      address_label: "Home",
      address: "Jl. Bukit Jarian No 123",
      districts: "Cidadap",
      subdistricts: "Hegarmanah",
    },
  ]);

  const user = {
    username: "Michael Scofield",
    phone_number: "08123456789",
    email: "michaelscofield@gmail.com",
  };

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

  //   setUserProfile(user);

  return (
    <>
      <div class="flex justify-center">
        <div class=" w-full md:w-3/5">
          <div class="flex justify-between">
            <h1 class="font-bold text-xl">Profile</h1>

            <Switch>
              <Match when={activeEditProfile()}>
                <button
                  class="text-black rounded-2xl px-4 py-1 border-1 border-black hover:bg-gray-100 hover:cursor-pointer"
                  onClick={() => {
                    setActiveEditProfile(false);
                  }}
                >
                  Save
                </button>
              </Match>
              <Match when={!activeEditProfile()}>
                <button
                  class="text-black rounded-2xl px-4 py-1 border-1 border-black hover:bg-gray-100 hover:cursor-pointer"
                  onClick={() => {
                    setActiveEditProfile(true);
                  }}
                >
                  Edit Profile
                </button>
              </Match>
            </Switch>
          </div>
          <div class="grid grid-cols-[1fr_2fr] gap-2">
            <Switch>
              <Match when={activeEditProfile()}>
                <p>Username</p>
                <div>
                  <span class="mr-1">:</span>
                  <input
                    type="text"
                    class="rounded-xl border-black border-1 px-2"
                    value={userProfile().username}
                  />
                </div>

                <p>Phone Number</p>
                <div>
                  <span class="mr-1">:</span>
                  <input
                    type="text"
                    class="rounded-xl border-black border-1 px-2"
                    value={userProfile().phone_number}
                  />
                </div>

                <p>Email</p>
                <div>
                  <span class="mr-1">:</span>
                  <input
                    type="text"
                    class="rounded-xl border-black border-1 px-2"
                    value={userProfile().email}
                  />
                </div>
              </Match>
              <Match when={!activeEditProfile()}>
                <p>Username</p>
                <p> : {userProfile().username}</p>

                <p>Phone Number</p>
                <p> : {userProfile().phone_number}</p>

                <p>Email</p>
                <p> : {userProfile().email}</p>
              </Match>
            </Switch>

            {/* <For each={Object.keys(userProfile())} fallback={""}>
                {(key, _) => (
                  
                )}
              </For> */}
          </div>
          <Line />
          <div class="flex justify-between">
            <h1 class="font-bold text-xl">Addresses</h1>
            <button
              class="text-black rounded-2xl px-4 py-1 border-1 border-black hover:bg-gray-100 hover:cursor-pointer"
              onclick={() => {
                setIsAddAddress(true);
              }}
            >
              + Add address
            </button>
          </div>
          <For each={addresses()}>{(address, _) => <AddressCard {...address} />}</For>
        </div>
      </div>
      {/* isOpen, title, onClose, defaultAddressLabel, defaultAddress, defaultDistrict, defaultSubDistrict, onSave */}
      <AddressModal
        isOpen={isAddAddress()}
        title={"Add Address"}
        onClose={() => {
          setIsAddAddress(false);
        }}
        onSave={(addressLabel, address, selectedDistrict, selectedSubDistrict) => {
          console.log(addressLabel, address, selectedDistrict, selectedSubDistrict);
          setIsAddAddress(false);
        }}
      />

      {/* <Modal
        open={isAddAddress()}
        onClose={() => setIsAddAddress(false)}
      >
        <div class="p-6">
          <div class="flex justify-between">
            <h2 class="font-bold text-xl">Edit Address </h2>
            <button
              class="font-semibold text-3xl hover:font-bold hover:cursor-pointer"
              onClick={() => {
                setActiveEditAdress(false);
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
              />
            </div>

            <p class="">Address </p>
            <div class="">
              <span class="mr-2">:</span>
              <input
                type="text"
                class="rounded-2xl border-black border-1 px-2"
              />
            </div>

            <p class="">District</p>
            <div class="flex">
              <span class="mr-2">:</span>
              <Dropdown2
                items={districtsOptions}
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
                setIsAddAddress(false);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </Modal> */}
    </>
  );
}

export default ProfilePage;

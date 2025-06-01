import { createSignal, Switch, Match, onMount, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import Line from "../components/Line";
import AddressCard from "../components/AddressCard";
import Modal from "../components/Modal";
import Dropdown2 from "../components/Dropdown2.jsx";
import AddressModal from "../components/AddressModal.jsx";
// import districtSignal from "../stores/districtSignal.js";
import { bumpUserVersion } from "../stores/userVersion.js";
import { addressVersion, bumpAddressVersion } from "../stores/addressVersion";
import { isCreatingAddress, flipIsCreatingAddress } from "../stores/creatingAddress";
import { jwtDecode } from "jwt-decode";
import { districts } from "../data/districts";
import { subdistricts } from "../data/subdistricts";

function ProfilePage() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = createSignal({});

  const [activeEditProfile, setActiveEditProfile] = createSignal(false);

  const [isAddAddress, setIsAddAddress] = createSignal(false);

  const [addresses, setAddresses] = createSignal([]);

  // Seandaikan nanti mau implementasi cancel buat yang edit user profile nya
  const [draftUser, setDraftUser] = createSignal({});

  // Buat data dari user untuk profile
  onMount(() => {
    fetchData();
    fetchAddresses();
  });

  // Buat cek perubahan addresses yang dimiliki sama user (nambah / edit)
  // createEffect(() => {
  //   addressVersion();
  //   fetchAddresses();
  // });

  const fetchData = async () => {
    try {
      // const id = signalId()
      const token = localStorage.getItem("token");
      const id = jwtDecode(token).user_id;

      const response = await fetch(`http://localhost:5000/api/v1/users/`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setUserProfile(data);

      setDraftUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAddresses = async () => {
    try {
      // const id = signalId()
      const token = localStorage.getItem("token");
      const id = jwtDecode(token).user_id;
      console.log(" awal fetch");
      const response = await fetch(`http://localhost:5000/api/v1/users/addresses`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(" selesai fetch");

      const data = await response.json();
      console.log(data);

      if (data.success) {
        setAddresses(data.addresses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      // const id = signalId()
      const token = localStorage.getItem("token");
      const id = jwtDecode(token).user_id;

      const body = () => draftUser();

      const response = await fetch(`http://localhost:5000/api/v1/users/updateuser`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body()),
      });

      const data = await response.json();

      if (data.success) {
        setUserProfile({ ...draftUser() });
        bumpUserVersion();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewAddress = async ({ address_label, address_name, subdistrict_id }) => {
    try {
      const token = localStorage.getItem("token");
      console.log(subdistrict_id);
      const body = {
        address_label,
        address_name,
        subdistrict_id,
      };

      console.log(body);
      const response = await fetch(`http://localhost:5000/api/v1/users/newaddress`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      // if (data.success) {
      //   bumpAddressVersion();
      // }

      // pseudo code
      const addedAddressId = data.address_id;
      const addedAddressSub = subdistricts.find((s) => s.subdistrict_id == subdistrict_id);
      const addedAdressDis = districts.find((d) => d.district_id == addedAddressSub.district_id);

      const newAddresses = [
        {
          address_id: addedAddressId,
          address_name,
          address_label,
          district_id: addedAdressDis.district_id,
          district_name: addedAdressDis.district_name,
          subdistrict_id: addedAddressSub.subdistrict_id,
          subdistrict_name: addedAddressSub.subdistrict_name,
        },
        ...addresses(),
      ];

      setAddresses(newAddresses);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSaveAddress = async ({
  //   idx,
  //   addressId,
  //   addressLabel,
  //   address,
  //   selectedSubDistrict,
  // }) => {
  //   console.log(idx);
  //   console.log(addressId);
  //   const newAddresses = [...addresses()];
  //   console.log(newAddresses);
  //   newAddresses[idx] = {
  //     addressId,
  //     addressLabel,
  //     address,
  //     selectedSubDistrict,
  //   };
  //   setAddresses(newAddresses);
  //   console.log(addresses());
  // };

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
                    handleSaveProfile();
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
                    value={userProfile()?.user_name}
                    onChange={(e) => {
                      setDraftUser((u) => ({
                        ...u,
                        user_name: e.target.value,
                      }));
                    }}
                  />
                </div>

                <p>Phone Number</p>
                <div>
                  <span class="mr-1">:</span>
                  <input
                    type="text"
                    class="rounded-xl border-black border-1 px-2"
                    value={userProfile()?.user_phone}
                    onChange={(e) => {
                      setDraftUser((u) => ({
                        ...u,
                        user_phone: e.target.value,
                      }));
                    }}
                  />
                </div>

                <p>Email</p>
                <p> : {userProfile().user_email}</p>
              </Match>
              <Match when={!activeEditProfile()}>
                <p>Username</p>
                <p> : {userProfile().user_name}</p>

                <p>Phone Number</p>
                <p class={userProfile().user_phone ? "" : "text-gray-400"}> : {userProfile().user_phone ? userProfile().user_phone : "-"}</p>

                <p>Email</p>
                <p> : {userProfile().user_email}</p>
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
                flipIsCreatingAddress();
                setIsAddAddress(true);
              }}
            >
              + Add address
            </button>
          </div>
          <Switch>
            <Match when={addresses().length > 0}>
              <For each={addresses()}>
                {(add, idx) => (
                  <AddressCard
                    address={add}
                    onSave={({ address_id, address_name, address_label, subdistrict_id }) => {
                      // console.log(address_id);
                      // console.log(address_name);
                      // console.log(address_label);
                      // console.log(subdistrict_id);
                      // console.log(idx());
                      const newAddresses = [...addresses()];
                      console.log(newAddresses);

                      const newSubDistrict = subdistricts.find((s) => s.subdistrict_id == subdistrict_id);

                      newAddresses[idx()] = {
                        ...newAddresses[idx()],
                        address_label: address_label,
                        address_name: address_name,
                        subdistrict_id: subdistrict_id,
                        subdistrict_name: newSubDistrict.subdistrict_name,
                        district_id: newSubDistrict.district_id,
                        district_name: districts.find((d) => d.district_id == newSubDistrict.district_id).district_name,
                      };

                      console.log("lololol", {
                        addressId: address_id,
                        addressLabel: address_label,
                        address: address_name,
                        selectedSubDistrict: subdistricts.find((s) => s.district_id == subdistrict_id),
                      });
                      console.log(newAddresses);
                      setAddresses(newAddresses);
                      console.log(addresses());
                    }}
                  />
                )}
              </For>
            </Match>
            <Match when={addresses().length === 0}>
              <div class="flex justify-center">
                <p class="text-gray-400"> You dont have any address set up! </p>
                <p>&nbsp</p>
                <p
                  class="text-sky-400 hover:cursor-pointer font-medium"
                  onclick={() => {
                    flipIsCreatingAddress();
                    setIsAddAddress(true);
                  }}
                >
                  {" "}
                  Lets add one
                </p>
              </div>
            </Match>
          </Switch>
        </div>
      </div>
      {/* isOpen, title, onClose, defaultAddressLabel, defaultAddress, defaultDistrict, defaultSubDistrict, onSave */}
      <AddressModal
        isCreatingAddress={isCreatingAddress()}
        isOpen={isAddAddress()}
        title={"Add Address"}
        // districtsOptions={districtsOptions()}
        // subDistrictsOptions={subDistrictsOptions()}
        defaultDistrict={districts[0]}
        defaultSubDistrict={subdistricts[0]}
        onClose={() => {
          isCreatingAddress(false);
          setIsAddAddress(false);
        }}
        onSave={(addressLabel, address, selectedDistrict, selectedSubDistrict, handleRefreshSelected) => {
          console.log(" address modal : " + addressLabel, address, selectedDistrict, selectedSubDistrict);
          console.log(selectedDistrict);
          console.log(selectedSubDistrict);

          handleNewAddress({
            address_label: addressLabel,
            address_name: address,
            subdistrict_id: selectedSubDistrict.subdistrict_id,
          });

          handleRefreshSelected();

          isCreatingAddress(false);
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

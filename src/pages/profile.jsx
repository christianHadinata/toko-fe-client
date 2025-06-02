import { createSignal, Switch, Match, onMount, createEffect } from "solid-js";
import Line from "../components/Line";
import AddressModal from "../components/AddressModal.jsx";
import { jwtDecode } from "jwt-decode";
import profileSignal from "../stores/profileSignal";
import { setToastSignal } from "../stores/toaster";
import { Toaster } from "solid-toast";

function ProfilePage() {
  const [userProfile, setUserProfile] = profileSignal;
  const [username, setUsername] = createSignal("");
  const [userPhone, setUserPhone] = createSignal("");

  const [activeEditProfile, setActiveEditProfile] = createSignal(false);

  const [addresses, setAddresses] = createSignal([]);
  const [isModalOpen, setIsModalOpen] = createSignal(false);
  const [isEditing, setIsEditing] = createSignal(false);
  const [editingAddressData, setEditingAddressData] = createSignal(null);

  // Buat data dari user untuk profile
  createEffect(() => {
    // fetchData();
    fetchAddresses();
    console.log(userProfile());
    setUsername(userProfile().user_name);
    setUserPhone(userProfile().user_phone);
  });

  const fetchAddresses = async () => {
    try {
      // const id = signalId()
      const token = localStorage.getItem("token");
      const id = jwtDecode(token).user_id;

      const response = await fetch(
        `http://localhost:5000/api/v1/users/addresses`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );


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

      const body = {
        user_name: username(),
        user_phone: userPhone(),
      };

      const response = await fetch(
        `http://localhost:5000/api/v1/users/updateuser`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      let data = await response.json();
      
      if (data.success) {
        data = {
          ...data,
          message : "Profile Changed Succesfully"
        }
        setUserProfile((prev) => ({
          ...prev,
          user_name: username(),
          user_phone: userPhone(),
        }));
      }
      setToastSignal(data)
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async ({
    address_id,
    address_label,
    address_name,
    subdistrict_id,
  }) => {
    const token = localStorage.getItem("token");
    const method = isEditing() ? "PATCH" : "POST";
    const endpoint = isEditing()
      ? "http://localhost:5000/api/v1/users/updateaddress"
      : "http://localhost:5000/api/v1/users/newaddress";

    const payload = {
      address_id,
      address_label,
      address_name,
      subdistrict_id,
    };

    const res = await fetch(endpoint, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    let result = await res.json();
    if (result.success) {
      if (isEditing()){
        result = {
          ...result,
          message : `Address ${address_label} has been edited`
        }
      }else {
        result = {
          ...result,
          message : `New Address : ${address_label} has been added`
        }

      }

    }

    setToastSignal(result)

    await fetchAddresses();
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setEditingAddressData(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (address) => {
    setEditingAddressData(address);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  return (
    <>
      <div class="flex justify-center">
        <div class=" w-full md:w-3/5">
        <Toaster
        position="top-center"
        gutter={24}
        />
          <div class="flex justify-between">
            <h1 class="font-bold text-xl">Profile</h1>

            <Switch>
              <Match when={activeEditProfile()}>
                <div>
                  <button
                    class="text-black rounded-2xl px-4 py-1 border-1 border-black hover:bg-gray-100 hover:cursor-pointer mr-4"
                    onClick={() => {
                      setUsername(userProfile().user_name);
                      setUserPhone(userProfile().user_phone);
                      setActiveEditProfile(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    class="text-black rounded-2xl px-4 py-1 border-1 border-black hover:bg-gray-100 hover:cursor-pointer"
                    onClick={() => {
                      setActiveEditProfile(false);
                      handleSaveProfile();
                    }}
                  >
                    Save
                  </button>
                </div>
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
                    value={username()}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <p>Phone Number</p>
                <div>
                  <span class="mr-1">:</span>
                  <input
                    type="text"
                    class="rounded-xl border-black border-1 px-2"
                    value={userPhone()}
                    onChange={(e) => setUserPhone(e.target.value)}
                  />
                </div>

                <p>Email</p>
                <p> : {userProfile().user_email}</p>
              </Match>
              <Match when={!activeEditProfile()}>
                <p>Username</p>
                <p> : {userProfile().user_name}</p>

                <p>Phone Number</p>
                <p class={userProfile().user_phone ? "" : "text-gray-400"}>
                  {" "}
                  : {userProfile().user_phone ? userProfile().user_phone : "-"}
                </p>

                <p>Email</p>
                <p> : {userProfile().user_email}</p>
              </Match>
            </Switch>
          </div>
          <Line />
          <div class="flex justify-between pb-4">
            <h1 class="font-bold text-xl">Addresses</h1>
            <button
              class="text-black rounded-2xl px-4 py-1 border-1 border-black hover:bg-gray-100 hover:cursor-pointer"
              onclick={() => {
                openAddModal();
              }}
            >
              + Add address
            </button>
          </div>
          <Switch>
            <Match when={addresses().length > 0}>
              <For each={addresses()}>
                {(address) => (
                  <div class="flex justify-between items-center p-4 border-2 border-black rounded-xl mb-4">
                    <div>
                      <h2 class="font-bold">{address.address_label}</h2>
                      <p>{address.address_name}</p>
                      <p class="font-semibold">
                        {address.district_name}, {address.subdistrict_name}
                      </p>
                    </div>
                    <button
                      class="rounded-2xl border-1 px-2 py-1 hover:bg-slate-100"
                      onClick={() => openEditModal(address)}
                    >
                      Edit
                    </button>
                  </div>
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
                    openAddModal();
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

      <AddressModal
        isOpen={isModalOpen()}
        isEdit={isEditing()}
        addressData={editingAddressData()}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}

export default ProfilePage;

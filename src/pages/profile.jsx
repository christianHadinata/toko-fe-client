import { createSignal, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import Line from "../components/Line";
import AddressCard from "../components/AddressCard";

function ProfilePage() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = createSignal({
    username: "Michael Scofield",
    phone_number: "08123456789",
    email: "michaelscofield@gmail.com",
  });
  const [activeEditProfile, setActiveEditProfile] = createSignal(false);
  const [activeEditAdress, setActiveEditAdress] = createSignal(false);
  const [ addresses , setAddresses] = createSignal([
    {
      address_label : "Home",
      address : "Jl. Bukit Jarian No 123",
      districts : "Cidadap",
      subdistricts : "Hegarmanah"
    },{
      address_label : "Home",
      address : "Jl. Bukit Jarian No 123",
      districts : "Cidadap",
      subdistricts : "Hegarmanah"
    },{
      address_label : "Home",
      address : "Jl. Bukit Jarian No 123",
      districts : "Cidadap",
      subdistricts : "Hegarmanah"
    },
  ]);
  
  const user = {
    username: "Michael Scofield",
    phone_number: "08123456789",
    email: "michaelscofield@gmail.com",
  };



//   setUserProfile(user);

  return (
    <>
    <div class="flex justify-center">
      
      <div class=" w-full md:w-3/5">
          <div class="flex justify-between">
            <h1 class="font-bold text-xl">Profile</h1>
            <button class="text-black rounded-lg p-4 border-2 border-black hover:bg-gray-100 hover:cursor-pointer">
              Edit Profile
            </button>
          </div>
          <div class="flex">
              <div>
                <p>Username</p>
                <p>Phone Number</p>
                <p>Email</p>
              </div>
              <div>
                <p> : {userProfile().username}</p>
                <p> : {userProfile().phone_number}</p>
                <p> : {userProfile().email}</p>
              </div>
              {/* <For each={Object.keys(userProfile())} fallback={""}>
                {(key, _) => (
                  
                  <div class="flex justify-between bg">
                    <span>{key}</span>
                    <span> : </span>
                    <Switch>
                      <Match when={activeEditProfile()}>
                        <input type="text" class="rounded-xl" value={value} />
                      </Match>
                      <Match when={!activeEditProfile()}>
                        <span> {value}</span>
                      </Match>
                    </Switch>

                  </div>
                )}
              </For> */}

     
          </div>
          <Line/>
          <div class="flex justify-between">
            <h1 class="font-bold text-xl">Addresses</h1>
            <button class="text-black rounded-lg p-4 border-2 border-black hover:bg-gray-100 hover:cursor-pointer">
              + Add address
            </button>
          </div>
          <For each={addresses()}>
              {(address, _)=> (
                <AddressCard {...address} />
              )}
          </For>

      </div>
    </div>
    </>
  );
}

export default ProfilePage;

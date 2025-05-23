import { createSignal, Switch ,Match} from "solid-js";
import { useNavigate } from "@solidjs/router";
import Line from "../components/Line";
import AddressCard from "../components/AddressCard";
import Modal from "../components/Modal";


function ProfilePage() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = createSignal({
    username: "Michael Scofield",
    phone_number: "08123456789",
    email: "michaelscofield@gmail.com",
  });

  
  const [activeEditProfile, setActiveEditProfile] = createSignal(false);
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

            <Switch>
              <Match when={activeEditProfile()}>
                <button class="text-black rounded-2xl px-4 py-1 border-1 border-black hover:bg-gray-100 hover:cursor-pointer"
                onClick={()=>{
                  setActiveEditProfile(false);
                }}
                >
                  Save
                </button>


              </Match>
              <Match when={!activeEditProfile()}>
                <button class="text-black rounded-2xl px-4 py-1 border-1 border-black hover:bg-gray-100 hover:cursor-pointer"
                onClick={()=>{
                  setActiveEditProfile(true);
                }}
                >
                  Edit Profile
                </button>


              </Match>
            </Switch>
            
          </div>
          <div class="flex">
              <div>
                <p class="py-1">Username</p>
                <p class="py-1">Phone Number</p>
                <p class="py-1">Email</p>
              </div>

                <Switch>
                  <Match when={activeEditProfile()}>
                    <div>
                      <p class="py-1"> : <input type="text" class="rounded-xl border-black border-1 px-2" value={userProfile().username} /> </p>
                      <p class="py-1"> : <input type="text" class="rounded-xl border-black border-1 px-2" value={userProfile().phone_number} /> </p>
                      <p class="py-1"> : <input type="text" class="rounded-xl border-black border-1 px-2" value={userProfile().email} /> </p>
                      
                      

                    </div>
                  </Match>
                  <Match when={!activeEditProfile()}>
                      <div>
                        <p class="py-1"> : {userProfile().username}</p>
                        <p class="py-1"> : {userProfile().phone_number}</p>
                        <p class="py-1"> : {userProfile().email}</p>
                      </div>
              
                  </Match>
                </Switch>

       
              {/* <For each={Object.keys(userProfile())} fallback={""}>
                {(key, _) => (
                  
                )}
              </For> */}

     
          </div>
          <Line/>
          <div class="flex justify-between">
            <h1 class="font-bold text-xl">Addresses</h1>
            <button class="text-black rounded-2xl px-4 py-1 border-1 border-black hover:bg-gray-100 hover:cursor-pointer">
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

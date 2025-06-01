import { A, useNavigate } from "@solidjs/router";
import { createEffect, createSignal, onMount } from "solid-js";
import { jwtDecode } from "jwt-decode";
import { userVersion } from "../stores/userVersion";
import profileSignal from "../stores/profileSignal";

export default function ProfileDropdown() {
  const navigate = useNavigate();
  const [user, setUser] = profileSignal;

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  createEffect(() => {
    // fetchUser();
    userVersion();

    fetchUser();
  });

  const fetchUser = async () => {
    try {
      // const id = signalId()
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/v1/users/`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="relative group">
      <div class="rounded-md p-2 hover:bg-gray-100 cursor-pointer">
        <img
          src={"/assets/icon/profile-1.png"}
          width={25}
          height={25}
          alt="profile"
        />
      </div>

      <div class="absolute right-0 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200">
        <div class="mb-2 p-2">
          <p class="font-semibold text-lg">
            {user()?.user_name ? user().user_name : ""}
          </p>
          <p class="text-sm text-gray-600 pb-2">
            {user()?.user_email ? user().user_email : ""}
          </p>
          <div class="flex items-center text-sm mt-1 text-gray-600">
            <img src="/assets/icon/phone.png" alt="" class="w-5 h-5" />
            <span class="ml-2">
              : {user()?.user_phone ? user().user_phone : "Not Available"}
            </span>
          </div>
        </div>
        <hr class="my-2" />
        <div class="flex flex-col gap-2">
          <div class="w-full p-2 hover:bg-slate-100 rounded-lg">
            <A href="/profile" class="flex items-center gap-2 text-sm ">
              <img src="/assets/icon/edit-profile.png" alt="" class="w-5 h-5" />
              Edit Profile
            </A>
          </div>
          <div class="w-full p-2 hover:bg-slate-100 rounded-lg">
            <A
              href="/login"
              class="flex items-center gap-2 text-sm "
              onclick={handleLogout}
            >
              <img src="/assets/icon/logout.png" alt="" class="w-5 h-5" />
              Log out
            </A>
          </div>
        </div>
      </div>
    </div>
  );
}

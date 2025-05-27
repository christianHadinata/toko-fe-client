import { A, useNavigate } from "@solidjs/router";

export default function ProfileDropdown() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
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
          <p class="font-semibold text-lg">Michael Scofield</p>
          <p class="text-sm text-gray-600 pb-2">michaelscofield@gmail.com</p>
          <div class="flex items-center text-sm mt-1 text-gray-600">
            <img src="/assets/icon/phone.png" alt="" class="w-5 h-5" />
            <span class="ml-2">: 08123456789</span>
          </div>
        </div>
        <hr class="my-2" />
        <div class="flex flex-col gap-2">
          <div class="w-full p-2 hover:border-sky-400 hover:border-2 rounded-lg">
            <A href="/profile" class="flex items-center gap-2 text-sm ">
              <img src="/assets/icon/edit-profile.png" alt="" class="w-5 h-5" />
              Edit Profile
            </A>
          </div>
          <div class="w-full p-2 hover:border-red-400 hover:border-2 rounded-lg">
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

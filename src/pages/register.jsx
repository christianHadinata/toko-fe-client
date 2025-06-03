import { A, useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import { setToastSignal } from "../stores/toaster";
import { Toaster } from "solid-toast";

function Register() {
  const [isVisible, setIsVisible] = createSignal(false);
  const toggleVisibility = () => setIsVisible(!isVisible());

  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [email, setEmail] = createSignal("");

  const navigate = useNavigate();

  function handleUsername(event) {
    setUsername(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/users/register",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_email: email(),
            user_password: password(),
            user_name: username(),
          }),
        }
      );

      let data = await response.json();

      if (data.success) {
        data = {
          ...data,
          message: "User Succesfully Registered",
        };
        navigate("/login");
      }

      setToastSignal(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div class="flex flex-col lg:flex-row h-screen">
        <div class="hidden lg:flex w-1/2 items-center justify-center rounded-br-full bg-sky-400">
          {/* <Toaster position="top-center" gutter={24} /> */}
          <div class="mb-32 mr-32 flex items-center justify-center">
            <img
              src={"/assets/logo/white.png"}
              width={150}
              height={150}
              alt="logo"
            />
            <h1 class="cursor-default text-6xl text-white">Tokofe</h1>
          </div>
        </div>
        <div class="flex w-full h-screen lg:w-1/2 flex-col items-center justify-center p-6">
          <Toaster position="top-center" gutter={24} />
          <div class="lg:hidden flex items-center justify-center mb-10">
            <img
              src={"/assets/logo/blue.png"}
              width={80}
              height={80}
              alt="logo"
            />
            <h1 class="cursor-default text-5xl text-sky-400">Tokofe</h1>
          </div>
          <div class="w-full max-w-lg">
            <A
              href={"/"}
              class="text-xl font-normal text-sky-400 hover:text-sky-300 p-6"
            >
              {"< "}Back to home
            </A>
            <div class="mt-2 p-6 shadow-lg shadow-slate-200 w-full max-w-md mx-auto">
              <h1 class="pb-10 text-center text-4xl font-semibold">Register</h1>
              <form class="flex flex-col gap-y-5" onSubmit={""}>
                <label class="mb-1 text-gray-700 font-medium"> Username</label>
                <input
                  type="text"
                  value={username()}
                  onChange={handleUsername}
                  class="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  placeholder="Enter username"
                />
                <label class="mb-1 text-gray-700 font-medium"> Email</label>
                <input
                  type="email"
                  value={email()}
                  onChange={handleEmail}
                  class="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  placeholder="Enter email"
                />
                <label class="mb-1 text-gray-700 font-medium"> Password</label>
                <div class="relative w-full max-w-lg">
                  <input
                    type={isVisible() ? "text" : "password"}
                    value={password()}
                    onChange={handlePassword}
                    class="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                    placeholder="Enter password"
                  />

                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    class="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                    onClick={toggleVisibility}
                  >
                    <img
                      src={
                        isVisible()
                          ? "/assets/icon/eyeOpen.png"
                          : "/assets/icon/eyeHidden.png"
                      }
                      width={24}
                      height={24}
                      class="mr-2"
                    />
                  </button>
                </div>

                <button
                  class="w-full mt-5 bg-sky-400 font-medium text-white rounded-md py-2 cursor-pointer hover:bg-sky-300"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Register
                </button>
                <h3 class="text-center">
                  Already have an account ?
                  <A
                    href={"/login"}
                    class="font-medium text-sky-400 hover:text-sky-300"
                  >
                    {" "}
                    Log in{" "}
                  </A>
                </h3>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;

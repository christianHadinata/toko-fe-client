import { A } from "@solidjs/router";

export default function page404() {
  return (
    <>
      <div class="flex items-center justify-center min-h-screen">
        <div class="text-center animate-fadeIn">
          <img
            src={"/assets/Image/404.png"}
            alt="404 background"
            class="mx-auto w-160 animate-[float_3s_infinite]  rounded-lg"
          />
          <h1 class="text-6xl font-extrabold text-sky-400 mt-6">
            Oops! Page Not Found.
          </h1>
          <p class="text-xl text-gray-700 mt-4">
            The page you are looking for doesn't exist.
          </p>
          <A
            href={"/"}
            class="mt-6 inline-block bg-sky-400 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform transition hover:scale-105 hover:bg-sky-500"
          >
            {" "}
            Back To Home{" "}
          </A>
        </div>
      </div>
    </>
  );
}

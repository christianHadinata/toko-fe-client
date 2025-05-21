import bg404 from "../assets/Image/404.png";
import { A } from "@solidjs/router";

export default function page404() {
  return (
    <>
      <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        <div class="text-center animate-fadeIn">
          <img
            src={bg404}
            alt="404 background"
            class="mx-auto w-160 animate-[float_3s_infinite]  rounded-lg"
          />
          <h1 class="text-7xl font-extrabold text-blue-700 mt-6">
            Kamu mau kemana?
          </h1>
          <p class="text-xl text-gray-700 mt-2">
            Halaman yang kamu cari tidak ada
          </p>
          <A
            href={"/"}
            class="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform transition hover:scale-105 hover:bg-blue-700"
          >
            {" "}
            Kembali{" "}
          </A>
        </div>
      </div>
    </>
  );
}

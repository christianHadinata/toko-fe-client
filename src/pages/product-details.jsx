import { createSignal, createEffect } from "solid-js";
import { For } from "solid-js";
import Modal from "../components/Modal";
import { useParams, useNavigate } from "@solidjs/router";
import { formatCurrency } from "../utils/formatCurrency";
import { Toaster } from "solid-toast";
import { toastSignal, setToastSignal } from "../stores/toaster";

function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = createSignal({});

  const [activeImage, setActiveImage] = createSignal("");
  const [additionalImages, setAdditionalImages] = createSignal([]);
  const [selectedQuantity, setSelectedQuantity] = createSignal(1);
  const [openModal, setOpenModal] = createSignal(false);

  const navigate = useNavigate();

  const handleNavigate = () => {
    setOpenModal(false);
    navigate("/cart", { replace: true });
  };

  createEffect(() => {
    fetchProduct();
    fetchAdditionalProductImages();
  });

  const fetchProduct = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/products/${params.product_id}`
      );
      const data = await res.json();

      const addedFormatCurrencyData = {
        ...data,
        formatted_product_price: formatCurrency(data.product_price),
      };

      console.log(addedFormatCurrencyData);

      setProduct(addedFormatCurrencyData);
      setActiveImage(data.product_featured_image_url);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAdditionalProductImages = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/products/${params.product_id}/images`
      );
      const data = await res.json();
      console.log(data);
      setAdditionalImages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setToastSignal({
          success: false,
          message: "You must login first",
        });
        return;
      }

      const body = {
        product_id: product().product_id,
        product_quantity: selectedQuantity(),
      };

      const response = await fetch(`http://localhost:5000/api/v1/cart`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const status = await response.json();

      if (status.success) {
        setOpenModal(true);
      } else {
        setToastSignal(status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div class="mt-5 grid md:grid-cols-2 grid-cols-1 gap-12 md:gap-20 lg:gap-32">
        <Toaster position="top-center" gutter={24} />
        <div class="flex flex-col">
          {/* Image dari product */}
          <img
            src={
              activeImage() != ""
                ? `http://localhost:5000/${activeImage()}`
                : "/assets/icon/broken.png"
            }
            alt=""
            class="w-full h-auto max-h-[250px] sm:max-h-[350px] md:max-h-[450px] lg:max-h-[512px] object-contain mx-auto rounded-xl"
          />

          <div class="mt-5 grid grid-cols-4 gap-x-4">
            <img
              src={
                product().product_featured_image_url != ""
                  ? `http://localhost:5000/${
                      product().product_featured_image_url
                    }`
                  : "/assets/icon/broken.png"
              }
              alt=""
              class={`cursor-pointer rounded-xl aspect-square object-cover ${
                activeImage() === product().product_featured_image_url
                  ? "border-4 border-sky-400"
                  : "border-none"
              }`}
              onClick={() =>
                setActiveImage(product().product_featured_image_url)
              }
            />
            {/* yang mapping additionalImages */}
            <For each={additionalImages()}>
              {(image, index) => (
                <img
                  key={index()}
                  src={`http://localhost:5000/${image.product_image_url}`}
                  alt="/assets/icon/broken.png"
                  class={`cursor-pointer rounded-xl aspect-square object-cover ${
                    activeImage() === image.product_image_url
                      ? "border-4 border-sky-400"
                      : "border-none"
                  }`}
                  onClick={() => setActiveImage(image.product_image_url)}
                />
              )}
            </For>
          </div>
        </div>

        <div class="flex flex-col text-center md:text-start">
          <h2 class="text-3xl font-semibold"> {product().product_name} </h2>
          <h4 class="my-5">{product().product_details}</h4>

          <h1 class="mt-5 text-4xl font-bold text-sky-400">
            {"Rp. "} {product().formatted_product_price}
          </h1>
          <div class="mt-10 flex flex-col md:flex-row items-center justify-center md:justify-start gap-x-4">
            <span class="select-none">
              <div class="flex w-52 items-center justify-center rounded-full border-1 border-gray-200 py-2 shadow-md shadow-gray-200">
                <span
                  // cek qt1 ato ga untuk nanti
                  class="cursor-not-allowed"
                >
                  <button
                    class={`select-none rounded-md px-4 py-2 text-2xl ${
                      selectedQuantity() === 1
                        ? "cursor-not-allowed text-gray-500"
                        : "cursor-pointer text-black hover:bg-gray-100 hover:text-sky-400"
                    }`}
                    onClick={() => {
                      if (selectedQuantity() > 1) {
                        setSelectedQuantity(selectedQuantity() - 1);
                      }
                    }}
                  >
                    -
                  </button>
                </span>
                <input
                  type="number"
                  inputmode="numeric"
                  value={selectedQuantity()}
                  class="max-w-16 py-2 text-center text-lg outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  oninput={(e) => {
                    let val = Number(e.target.value);

                    console.log(e.target.value);
                    if (isNaN(val) || val < 1) {
                      val = 1;
                    } else if (val > product().product_stock) {
                      val = product().product_stock;
                    }
                    e.target.value = val;
                    setSelectedQuantity(val);
                  }}
                />
                <span class="">
                  <button
                    class={`select-none rounded-md px-4 py-2 text-2xl ${
                      selectedQuantity() === product().product_stock
                        ? "cursor-not-allowed text-gray-500"
                        : "cursor-pointer text-black hover:bg-gray-100 hover:text-sky-400"
                    }`}
                    onClick={() => {
                      if (selectedQuantity() < product().product_stock) {
                        setSelectedQuantity(selectedQuantity() + 1);
                      }
                    }}
                  >
                    +
                  </button>
                </span>
              </div>
            </span>
            <div class="mt-10 md:mt-0">
              Total Stock :{" "}
              <span class="font-semibold capitalize">
                {product().product_stock}
              </span>
            </div>
          </div>
          <div class="mt-10 flex gap-x-4 justify-center md:justify-start">
            <button
              onClick={handleAddToCart}
              class="w-52 bg-sky-400 px-6 py-4 text-base sm:text-lg font-medium capitalize text-white rounded-lg hover:cursor-pointer hover:scale-105 transition-all"
            >
              + Add to cart
            </button>
            <Modal open={openModal()} onClose={() => setOpenModal(false)}>
              <div class="p-6 text-center">
                <h2 class="text-xl lg:text-2xl font-bold mb-4 py-2">
                  Success!
                </h2>
                <p class="mb-4 text-lg lg:text-xl py-2">
                  Item has been added to cart.
                </p>
                <div class="flex justify-center gap-x-12 py-2">
                  <button
                    onClick={() => setOpenModal(false)}
                    class="px-4 py-2 bg-red-400 text-white rounded-lg text-base lg:text-lg cursor-pointer "
                  >
                    Close
                  </button>
                  <button
                    onClick={handleNavigate}
                    class="px-4 py-2 bg-sky-400 text-white rounded-lg text-base lg:text-lg cursor-pointer"
                  >
                    Go to cart
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;

import { createSignal,createEffect } from "solid-js";
import ProductType, { createProduct } from "../types/ProductType";
import AdditionalImage from "../types/AdditionalImage";
import { For } from "solid-js";
import Modal from "../components/Modal";
import { useNavigate } from "@solidjs/router";

/**
 * @param {object} props
 * @param {ProductType} props.param
 */ 
function ProductDetails({params}){
    const [activeImage, setActiveImage] = createSignal()
    const [additionalImages, setAdditionalImages] = createSignal([]);
    const [currentQt, setCurrentQt] = createSignal(1);
    const [open, setOpen] = createSignal(false);

    const navigate = useNavigate();

    const handleNavigate = () => {
        setOpen(false);
        navigate("/cart", { replace: true });
    };

    const additionalImagesArray = [{
        src: "/assets/Image/03 - red lipstick.jpg",
        alt: "",
        fallbackSrc : "/assets/icon/broken.png",
        class: "h-[129px] w-1/4 cursor-pointer rounded-xl object-cover border-4 border-sky-400",
        },{
        src: "/assets/Image/30 - Maybelline Superstay Matte Ink Lipstick.jpg",
        alt: "",
        fallbackSrc : "/assets/icon/broken.png",
        class: "h-[129px] w-1/4 cursor-pointer rounded-xl object-cover border-4 border-sky-400",
        },{
        src: "/assets/Image/58 - MAC Matte Lipstick in Ruby Woo.jpg",
        alt: "",
        fallbackSrc : "/assets/icon/broken.png",
        class: "h-[129px] w-1/4 cursor-pointer rounded-xl object-cover border-4 border-sky-400",
        },{
        src: "/assets/Image/03 - 3.jpg",
        alt: "",
        fallbackSrc : "/assets/icon/broken.png",
        class: "h-[129px] w-1/4 cursor-pointer rounded-xl object-cover border-4 border-sky-400",
        },
    ]

    const rawProductsInput = [
    {
        product_id: 101,
        product_name: "Vibrant Red Lipstick",
        product_price: 19000,
        product_stock: 50,
        product_details: "A stunning, long-lasting red lipstick.",
        product_featured_image_url: additionalImagesArray[0].src, // Using image from your array
        category_id: 1,
        category_name: "Makeup"
    },
    {
        product_id: 102,
        product_name: "Maybelline Superstay Ink",
        product_price: 127500,
        // product_stock is optional, will default to 0
        product_details: "Experience super stay power with matte ink.",
        product_featured_image_url: additionalImagesArray[1].src,
        category_id: 1,
        category_name: "Makeup"
    },
    {
        product_id: 103,
        product_name: "MAC Ruby Woo Classic",
        product_price: 9000,
        product_stock: 100,
        product_details: "The iconic Ruby Woo matte lipstick.",
        product_featured_image_url: additionalImagesArray[2].src,
        category_id: 1,
        category_name: "Makeup"
    },
    {
        product_id: 104,
        product_name: "Mystery Shade No. 3",
        product_price: 150000,
        product_stock: 25,
        product_details: "A beautiful shade for everyday wear.",
        product_featured_image_url: additionalImagesArray[3].src,
        category_id: 1,
        category_name: "Makeup"
    }

    ];
 
    const additional_products = [];
    for (const rawData of rawProductsInput) {
        
        const product = createProduct(rawData);
        additional_products.push(product)
       
    }


    setActiveImage(additional_products[0])
    setAdditionalImages(additional_products)

    return (
        
        <>
            <div class="mt-5 flex w-screen flex-col items-center">
                {/* <div class="w-3/4" /> */}
                <div class="mt-5 flex w-3/4 justify-between">

                    <div class="flex w-2/5 flex-col">
                    {/* Image dari product */}
                        <img src={activeImage().product_featured_image_url != "" ? activeImage().product_featured_image_url : "/assets/icon/broken.png"} alt=""
                        class="h-[576px] w-full rounded-xl object-cover"
                        />

                        <div class="mt-5 flex gap-x-5">
                        
                            {/* <img src={activeImage()} 
                            alt="product image" 
                            // yang ternary border belum ,langsung set up
                            class={`h-[129px] w-1/4 cursor-pointer rounded-xl object-cover border-4 border-sky-400`}/> */}

                            {/* {additionalImages().map((additionalImage) => {
                                <img
                                src={activeImage()}
                                class="h-[129px] w-1/4 cursor-pointer rounded-xl object-cover border-4 border-sky-400" />
                            })} */}

                            {/* yang mapping additionalImages */}

                            <For each={additionalImages()}>
                                {(image, index) => (
                                    <img
                                        key={image.product_featured_image_url||index()}
                                        src={image.product_featured_image_url}
                                        alt={image.product_name||`Active image placeholder ${index() + 1}`}
                                        class={`h-[128px] w-1/4 cursor-pointer rounded-xl object-cover ${activeImage() === `${image.product_featured_image_url}` ? "border-4 border-sky-400" : "border-none"}`}
                                        onClick={() =>
                                        setActiveImage(
                                        image,
                                        )}
                                    />   
                                )}
                            </For>

                        </div>
                    </div>

                    <div class="flex w-1/2 flex-col px-5">
                        <h2 class="text-3xl font-semibold"> {activeImage().product_name} </h2>
                        <h4 class="mt-5">{activeImage().product_details}</h4>
                        <div class="flex mt-4 items-center">
                            <img src="/assets/icon/star.png" alt="" class="h-4 w-4" />
                            <div className="flex items-center">
                                <span className="ml-1">4.9</span>
                                <span className="ml-1">{"(17 rating)"}</span>
                            </div>
                        </div>
                        <h1 class="mt-5 text-4xl font-bold text-sky-400">
                            {"Rp. "} {activeImage().product_price}
                        </h1>
                        <div class="mt-10 flex items-center gap-x-4">
                            <span class="select-none">
                                <div class="flex w-52 items-center justify-center rounded-full border-1 border-gray-200 py-2 shadow-md shadow-gray-200">
                                    <span
                                    // cek qt1 ato ga untuk nanti 
                                    class="cursor-not-allowed"
                                    >
                                        <button 
                                        class="select-none rounded-md px-4 py-2 text-2xl hover:bg-gray-100 hover:text-sky-400 hover:cursor-pointer"
                                        onClick={() =>
                                            setCurrentQt(currentQt() - 1)
                                        }
                                        >
                                            -
                                        </button>
                                    </span>
                                    <input type="number"
                                    inputmode="numeric"
                                    value={currentQt()}
                                    class="max-w-16 py-2 text-center text-lg outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    onChange={(e)=>{
                                        let val = Number(e.target.value);
                                        let maxStock = image.product_stock ?? 0 ;
                                        console.log(e.target.value);
                                        if (isNaN(val) || val < 1) {
                                            val = 1;
                                        } else if ( val > maxStock) {
                                            val = maxStock
                                        }
                                    }}
                                    />
                                    <span class="">
                                        <button 
                                        class="select-none rounded-md px-4 py-2 text-2xl hover:bg-gray-100 hover:text-sky-400 hover:cursor-pointer"
                                        onClick={() =>
                                            setCurrentQt(currentQt() + 1)
                                        }
                                        >
                                            +
                                        </button>
                                    </span>
                                </div>
                            </span>
                            <div>
                                    Total Stock : {" "}
                                    <span class="font-semibold capitalize">
                                        {activeImage().product_stock}
                                    </span>
                            </div>
                        </div>
                        <div class="mt-10 flex gap-x-4">
                                 <button
                                    onClick={() => setOpen(true)}
                                    class="px-4 py-2 bg-sky-400 text-white rounded-lg capitalize font-medium hover:bg-sky-400 hover:text-sky-200 hover:cursor-pointer"
                                >
                                    + Add to cart
                                </button>
                                <Modal open={open()} onClose={() => setOpen(false)}>
                                    <div class="p-6">
                                    <h2 class="text-xl lg:text-2xl font-bold mb-4 py-2">Success!</h2>
                                    <p class="mb-4 text-lg lg:text-xl py-2">
                                        Item has been added to cart.
                                    </p>
                                    <div class="flex justify-center gap-x-12 py-2">
                                        <button
                                        onClick={() => setOpen(false)}
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
                                <button class="w-52 bg-sky-400 py-6 text-lg font-medium capitalize text-white rounded-lg hover:bg-sky-400 hover:text-sky-200 hover:cursor-pointer" >
                                    Buy now
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default ProductDetails;
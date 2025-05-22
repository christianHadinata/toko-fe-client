import { createSignal, For } from "solid-js";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { formatCurrency } from "../utils/formatCurrency";
export default function Home() {
  // const [categories, setCategories] = createSignal([]);
  // const [products, setProducts] = createSignal([]);

  /* Dummy Categories and Product, to simmulate data from server, later must be deleted */
  const categories = [
    { category_id: 1, category_name: "Fashion" },
    { category_id: 2, category_name: "Beauty" },
    { category_id: 3, category_name: "Groceries" },
    { category_id: 4, category_name: "Electronics" },
    { category_id: 5, category_name: "Furniture" },
    { category_id: 6, category_name: "Sports" },
  ];

  const products = [
    {
      product_id: 1,
      product_name: "White T-Shirt",
      product_price: 75000,
      product_stock: 12,
      product_details: "Comfortable and stylish white t-shirt.",
      product_featured_image_url: "/images/white-tshirt.jpg",
      category_id: 1,
      category_name: "Fashion",
    },
    {
      product_id: 2,
      product_name: "Smartphone X",
      product_price: 3999000,
      product_stock: 8,
      product_details: "Latest gen smartphone with powerful camera.",
      product_featured_image_url: "/images/phone-x.jpg",
      category_id: 4,
      category_name: "Electronics",
    },
    {
      product_id: 3,
      product_name: "Leather Office Chair",
      product_price: 1299000,
      product_stock: 5,
      product_details: "Ergonomic chair for working comfort.",
      product_featured_image_url: "/images/chair-leather.jpg",
      category_id: 5,
      category_name: "Furniture",
    },
    {
      product_id: 4,
      product_name: "Wireless Earbuds",
      product_price: 799000,
      product_stock: 20,
      product_details:
        "Noise-cancelling wireless earbuds with long battery life.",
      product_featured_image_url: "/images/earbuds.jpg",
      category_id: 4,
      category_name: "Electronics",
    },
    {
      product_id: 5,
      product_name: "Treadmill Pro 3000",
      product_price: 4999000,
      product_stock: 3,
      product_details: "High-end treadmill with multiple programs.",
      product_featured_image_url: "/images/treadmill.jpg",
      category_id: 6,
      category_name: "Sports",
    },
    {
      product_id: 6,
      product_name: "Organic Honey 1L",
      product_price: 89000,
      product_stock: 50,
      product_details: "100% organic wild forest honey.",
      product_featured_image_url: "/images/honey.jpg",
      category_id: 3,
      category_name: "Groceries",
    },
    {
      product_id: 7,
      product_name: "Gaming Mouse RGB",
      product_price: 259000,
      product_stock: 18,
      product_details: "Ergonomic gaming mouse with customizable lighting.",
      product_featured_image_url: "/images/gaming-mouse.jpg",
      category_id: 4,
      category_name: "Electronics",
    },
    {
      product_id: 8,
      product_name: "Sofa Minimalis 3 Dudukan",
      product_price: 3499000,
      product_stock: 2,
      product_details: "Modern minimalist 3-seat fabric sofa.",
      product_featured_image_url: "/images/sofa.jpg",
      category_id: 5,
      category_name: "Furniture",
    },
    {
      product_id: 9,
      product_name: "Running Shoes Max",
      product_price: 799000,
      product_stock: 10,
      product_details: "Lightweight running shoes for daily jogs.",
      product_featured_image_url: "/images/running-shoes.jpg",
      category_id: 1,
      category_name: "Fashion",
    },
    {
      product_id: 10,
      product_name: "Face Serum Vit-C",
      product_price: 159000,
      product_stock: 30,
      product_details: "Brightening serum with vitamin C extract.",
      product_featured_image_url: "/images/face-serum.jpg",
      category_id: 2,
      category_name: "Beauty",
    },
    {
      product_id: 11,
      product_name: "Yoga Mat Eco",
      product_price: 199000,
      product_stock: 14,
      product_details: "Non-slip eco-friendly yoga mat.",
      product_featured_image_url: "/images/yoga-mat.jpg",
      category_id: 6,
      category_name: "Sports",
    },
    {
      product_id: 12,
      product_name: "LED Desk Lamp",
      product_price: 129000,
      product_stock: 22,
      product_details: "Minimalist lamp with adjustable brightness.",
      product_featured_image_url: "/images/desk-lamp.jpg",
      category_id: 5,
      category_name: "Furniture",
    },
    {
      product_id: 13,
      product_name: "Milk Chocolate Bar",
      product_price: 15000,
      product_stock: 100,
      product_details: "Delicious milk chocolate made from premium cocoa.",
      product_featured_image_url: "/images/chocolate.jpg",
      category_id: 3,
      category_name: "Groceries",
    },
    {
      product_id: 14,
      product_name: "Bluetooth Speaker Boom",
      product_price: 349000,
      product_stock: 9,
      product_details: "Loud and portable Bluetooth speaker.",
      product_featured_image_url: "/images/speaker.jpg",
      category_id: 4,
      category_name: "Electronics",
    },
    {
      product_id: 15,
      product_name: "Maxi Dress Summer",
      product_price: 249000,
      product_stock: 15,
      product_details: "Light and flowy summer maxi dress.",
      product_featured_image_url: "/images/maxi-dress.jpg",
      category_id: 1,
      category_name: "Fashion",
    },
    {
      product_id: 16,
      product_name: "Lip Balm Mint",
      product_price: 39000,
      product_stock: 40,
      product_details: "Moisturizing minty lip balm.",
      product_featured_image_url: "/images/lip-balm.jpg",
      category_id: 2,
      category_name: "Beauty",
    },
    {
      product_id: 17,
      product_name: "Basketball Pro",
      product_price: 199000,
      product_stock: 6,
      product_details: "Professional indoor/outdoor basketball.",
      product_featured_image_url: "/images/basketball.jpg",
      category_id: 6,
      category_name: "Sports",
    },
    {
      product_id: 18,
      product_name: "Dining Table 4 Seats",
      product_price: 2699000,
      product_stock: 4,
      product_details: "Wooden dining table set with 4 chairs.",
      product_featured_image_url: "/images/dining-table.jpg",
      category_id: 5,
      category_name: "Furniture",
    },
    {
      product_id: 19,
      product_name: "Natural Shampoo",
      product_price: 79000,
      product_stock: 25,
      product_details: "Sulfate-free shampoo with essential oils.",
      product_featured_image_url: "/images/shampoo.jpg",
      category_id: 2,
      category_name: "Beauty",
    },
    {
      product_id: 20,
      product_name: "Organic Green Tea",
      product_price: 29000,
      product_stock: 60,
      product_details: "Loose-leaf organic green tea.",
      product_featured_image_url: "/images/green-tea.jpg",
      category_id: 3,
      category_name: "Groceries",
    },
  ];

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const { data } = await AxiosInstance.get<CategoryTypes[]>(
  //       `http://localhost:5000/api/v1/products/categories`,
  //     );

  //     console.log(data);
  //     setCategories(data);
  //   };

  //   const fetchProducts = async () => {
  //     const { data } = await AxiosInstance.get<ProductTypes[]>(
  //       `http://localhost:5000/api/v1/products`,
  //     );
  //     console.log(data);
  //     setProducts(data);
  //   };

  //   fetchCategories();
  //   fetchProducts();
  // }, []);
  return (
    <div class="mt-2 flex flex-col items-center">
      {/* Carousel */}
      <div class="group relative mx-auto w-full max-w-[1200px]">
        <img
          src={`/assets/Image/dummyCarousel.jpg`}
          alt=""
          class="h-[300px] w-full rounded-xl"
        />
      </div>
      {/* Search Bar */}
      <SearchBar />
      {/* Categories */}
      <div class="flex w-full max-w-[1200px] flex-col py-14">
        <h2 class="text-3xl font-semibold capitalize">
          Shop our top categories
        </h2>
        <div class="mt-5 flex flex-wrap gap-4">
          <For each={categories}>
            {(category) => <CategoryCard {...category} />}
          </For>
        </div>
      </div>
      <div class="flex w-full max-w-[1200px] flex-col py-7">
        <h2 class="text-3xl font-semibold capitalize">Featured Products</h2>
        <div class="mt-5 flex flex-wrap gap-4">
          <For each={products}>
            {(product) => (
              <ProductCard
                {...product}
                formatted_product_price={formatCurrency(product.product_price)}
              />
            )}
          </For>
        </div>
      </div>
    </div>
  );
}

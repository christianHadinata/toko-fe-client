import { createEffect, createSignal, Match, onMount, Switch } from "solid-js";
import ProductCard from "../components/ProductCard";
import SearchBarCategory from "../components/SearchBarCategory";
import { formatCurrency } from "../utils/formatCurrency";
import { useParams, useSearchParams } from "@solidjs/router";
import Pagination from "../components/Pagination.jsx";

export default function Category() {
  const params = useParams();
  const [products, setProducts] = createSignal([]);
  const [filteredCategoryProducts, setFilteredCategoryProducts] = createSignal(
    []
  );
  const [filteredSearchProducts, setFilteredSearchProducts] = createSignal([]);

  onMount(() => {
    fetchProducts();
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/products`);
      const data = await res.json();

      /* Since we have few products, the code below is used to create a duplicate product visualization, the purpose is just to show pagination as required in TB04. 

      logic:

      - nameCounters -> to store product name with its current duplicate count, for example white t-shirt with counter 1, then will become white t-shirt (Duplicate 1), white t-shirt with counter 2, then will become white t-shirt (Duplicate 2), slim fit jeans with counter 1, then will become slim fit jeans (Duplicate 1).

      - duplicatedData -> make 20 duplicate data, so like we have 10 times more products, than our actual products in DB. It just change the product_name, wont affect when clicked, because it navigates to product detail pages using the product_id (product_id remains the same as the original products from our DB).

      - at the end we spread original data, combined with spreaded duplicatedData, and setProducts with it.
      */
      const nameCounters = {};

      const duplicatedData = Array.from({ length: 20 }, () => data)
        .flat()
        .map((p) => {
          const baseName = p.product_name;
          if (!nameCounters[baseName]) {
            nameCounters[baseName] = 1;
          } else {
            nameCounters[baseName]++;
          }

          return {
            ...p,
            product_name: `${baseName} - (duplicate ${nameCounters[baseName]})`,
          };
        });

      setProducts([...data, ...duplicatedData]);
    } catch (error) {
      console.error(error);
    }
  };

  createEffect(() => {
    const allProducts = products();
    const categoryName = params.category_name;

    const filteredCategoryRes = allProducts.filter(
      (p) => p.category_name === categoryName
    );
    setFilteredCategoryProducts(filteredCategoryRes);

    const searchQuery = (query.search || "").toLowerCase();

    if (!searchQuery) {
      setFilteredSearchProducts(filteredCategoryRes);
      return;
    }

    const filteredSearchRes = filteredCategoryRes.filter((p) =>
      p.product_name.toLowerCase().includes(searchQuery)
    );

    setFilteredSearchProducts(filteredSearchRes);
  });

  const [query, setQuery] = useSearchParams();
  const [currentPage, setCurrentPage] = createSignal(Number(query.page) || 1);
  const [totalPages, setTotalPages] = createSignal(0);
  const productsPerPage = 20;

  const pageHandler = (page) => {
    setCurrentPage(page);
    setQuery({ page: page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  createEffect(() => {
    const totalFiltered = filteredSearchProducts().length;
    setTotalPages(Math.ceil(totalFiltered / productsPerPage));
  });

  const paginatedProducts = () => {
    const start = (currentPage() - 1) * productsPerPage;
    const end = start + productsPerPage;
    return filteredSearchProducts().slice(start, end);
  };

  // to trigger setCurrentPage to 1, when user search on searchBar (since the query.page will be removed when user search, for example user search "white" -> url will be http://localhost:3000/category/Fashion?search=white, so current page must be set to 1)
  createEffect(() => {
    const pageParam = Number(query.page);
    if (!pageParam || pageParam < 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(pageParam);
    }
  });

  return (
    <>
      {/* Carousel */}
      <div class="group relative mx-auto w-full mb-10">
        <img
          src={`/assets/Image/dummyCarousel${params.category_name}.jpg`}
          alt=""
          class="w-full rounded-xl"
        />
      </div>
      {/* <CarouselCategory category_id={category_id} /> */}
      {/* Search Bar */}
      <SearchBarCategory category_name={params.category_name} />
      <div className="flex w-full flex-col py-10">
        <div className="mt-5">
          <Switch>
            <Match when={filteredSearchProducts().length === 0}>
              <h2 className="text-xl font-medium capitalize text-center">
                No Product with name{" "}
                <span className="font-semibold text-sky-400">
                  "{query.search}"
                </span>{" "}
                found in{" "}
                <span className="font-semibold text-sky-400">
                  "{params.category_name}"
                </span>
              </h2>
            </Match>
            <Match when={filteredSearchProducts().length > 0}>
              <h2 className="text-xl font-medium capitalize">
                Result for Category{" "}
                <span className="font-semibold text-sky-400">
                  "{params.category_name}"
                </span>
              </h2>
              <div class="mt-5 product-container">
                <For each={paginatedProducts()}>
                  {(product, index) => (
                    <ProductCard
                      key={product.product_id}
                      {...product}
                      formatted_product_price={formatCurrency(
                        product.product_price
                      )}
                    />
                  )}
                </For>
              </div>
            </Match>
          </Switch>
        </div>
      </div>

      <Pagination
        totalPages={totalPages()}
        currentPage={currentPage()}
        pageHandler={pageHandler}
      />
    </>
  );
}

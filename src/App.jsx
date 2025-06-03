import { Router, Route } from "@solidjs/router";

import { toast, Toaster } from "solid-toast";
import { toastSignal } from "./stores/toaster";
import { createEffect } from "solid-js";
import Login from "./pages/login";
import page404 from "./pages/404";
import Register from "./pages/register";
import Home from "./pages/home";
import Category from "./pages/category";
import Product from "./pages/product-details";
import Search from "./pages/search";
import Cart from "./pages/cart";
import ProfilePage from "./pages/profile";
import Navbar from "./components/Navbar";

function App() {
  const toastOpts = {};
  createEffect(() => {
    const res = toastSignal();

    if (res && "success" in res) {
      if (res.success) {
        toast.success(res.message || "Default Message : Success", {
          duration: 3000,
          // unmountDelay: 1000,
        });
      } else {
        toast.error(res.message || "Default Message : Failed", {
          duration: 3000,
          // unmountDelay: 1000,
        });
      }
    }
  });

  const MainLayout = (props) => {
    return (
      <>
        <div class="w-full flex justify-center p-4">
          <div class="w-full max-w-7xl">{props.children}</div>
        </div>
      </>
    );
  };

  return (
    <>
      <Router>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Navbar}>
          <Route path="/profile" component={ProfilePage} />
          <Route path="/" component={MainLayout}>
            <Route path="/product-details/:product_id" component={Product} />
            <Route path="/" component={Home} />
            <Route path="/category/:category_name" component={Category} />
            <Route path="/search" component={Search} />
            <Route path="/cart" component={Cart} />
          </Route>
          <Route path="*" component={page404}></Route>
        </Route>
      </Router>
    </>
  );
}

export default App;

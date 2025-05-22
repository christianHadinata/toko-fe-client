import { Router, Route } from "@solidjs/router";

import Login from "./pages/login";
import page404 from "./pages/404";
import Register from "./pages/register";
import Home from "./pages/home";
import Category from "./pages/category";
import Search from "./pages/search";
import Cart from "./pages/cart";

function App() {
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
        {/* <Route path="/" component={Home} />
        <Route path="/category/:category_name" component={Category} /> */}
        <Route path="/" component={MainLayout}>
          <Route path="/" component={Home} />
          <Route path="/category/:category_name" component={Category} />
          <Route path="/search" component={Search} />
          <Route path="/cart" component={Cart} />
        </Route>
        <Route path="*" component={page404}></Route>
      </Router>
    </>
  );
}

export default App;

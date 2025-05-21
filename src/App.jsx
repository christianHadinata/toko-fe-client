import { Router, Route } from "@solidjs/router";

import Login from "./pages/login";
import page404 from "./pages/404";
import Register from "./pages/register";
import Home from "./pages/home";

function App() {
  return (
    <>
      <Router>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Home} />
        <Route path="*" component={page404}></Route>
      </Router>
    </>
  );
}

export default App;

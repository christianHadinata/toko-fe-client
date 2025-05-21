import { Router, Route } from "@solidjs/router";

import Login from "./pages/login";
import page404 from "./pages/404";
import Register from "./pages/register";

function App() {
  return (
    <>
      <Router>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="*" component={page404}></Route>
      </Router>
    </>
  );
}

export default App;

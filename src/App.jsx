import { Router, Route } from "@solidjs/router";

import Login from "./pages/login";

function App() {
  return (
    <>
      <Router>
        <Route path="/login" component={Login} />
      </Router>
    </>
  );
}

export default App;

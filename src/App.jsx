import { Router, Route } from "@solidjs/router";

import Login from "./routes/login";

function App() {
  return (
    <>
    <h1>A</h1>
      <Router>
          <Route path="/" component={Login} />
      </Router>
    
    </>
  );
}

export default App;

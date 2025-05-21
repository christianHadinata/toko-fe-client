import { Router, Route } from "@solidjs/router";

import Login from "./routes/login";

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

import { Router, Route } from "@solidjs/router";

import Login from "./routes/login";
import page404 from "./routes/404";

function App() {
  return (
    <>
   
      <Router>
          <Route path="/login" component={Login} />
          <Route path="*" component={page404}></Route>
      </Router>
    
    </>
  );
}

export default App;

import { Router, Route } from "@solidjs/router";

import Login from "./routes/login";
import page404 from "./routes/404";
import Register from "./routes/register";

function App() {
  return (
    <>
   
      <Router>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="*" component={page404}></Route>
      </Router>
    
    </>
  );
}

export default App;

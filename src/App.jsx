import { Router, Route } from "@solidjs/router";

<<<<<<< HEAD
import Login from "./routes/login";
import page404 from "./routes/404";
=======
import Login from "./pages/login";
>>>>>>> 52aaa467541329133cb9fc8372e2da265e61667c

function App() {
  return (
    <>
      <Router>
<<<<<<< HEAD
          <Route path="/login" component={Login} />
          <Route path="*" component={page404}></Route>
=======
        <Route path="/login" component={Login} />
>>>>>>> 52aaa467541329133cb9fc8372e2da265e61667c
      </Router>
    </>
  );
}

export default App;

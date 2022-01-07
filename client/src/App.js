import jwtDecode from "jwt-decode";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Loading from "./compenents/Loading";
import CreacteAccount from "./compenents/AuthPages/CreacteAccount";
import ForgotPassword from "./compenents/AuthPages/ForgotPassword";

import Loginpage from "./compenents/AuthPages/Loginpage";
import OptVerify from "./compenents/AuthPages/OptVerify";
import SetPassword from "./compenents/AuthPages/SetPassword";
import { loadUser } from "./redux/actions/authAction";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const Layout = lazy(() => import("./compenents/Layout/Layout"));

const stripePromise = loadStripe(
  "pk_test_51KC7vSBzIHp6Z88PSwyg7xGLSE45LgCeX3uJfKbZaJ2JAsWcE2ejuIoLgWRPJDrQ4MO6TKWHaE0Qu3PFMf2gKADy00d8D3a9jd"
);
function App({ history }) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        history.push("/");
      }
      dispatch(loadUser());
    }
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <div className="h-100" style={{ overflow: "hidden" }}>
        <Suspense fallback={Loading}>
          <Switch>
            <Route path="/dashboard" component={Layout} />
            <Route exact path="/forgetpassword" component={ForgotPassword} />
            <Route exact path="/verifyopt" component={OptVerify} />
            <Route exact path="/createaccount" component={CreacteAccount} />
            <Route exact path="/setpassword" component={SetPassword} />
            <Route exact path="/" component={Loginpage} />
            <Redirect> to="/"</Redirect>
          </Switch>
        </Suspense>
      </div>
    </Elements>
  );
}

export default App;

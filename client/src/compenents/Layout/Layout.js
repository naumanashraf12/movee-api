import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import "./layout.css";
import Header from "../Header/Header";
import SideBar from "../Sidebar/Sidebar";
import Setting from "../Setting/Setting";
import Billing from "../Billing/Billing";
import Dashboard from "../Dashboard";
import Token from "../Billing/Token";

function Layout({ history }) {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    }
  }, []);

  const [active, setHandleActive] = useState(false);
  return (
    <div className="dashboardMainDiv">
      <SideBar active={active} setHandleActive={setHandleActive} />
      <div className="headerSec">
        <Header active={active} setHandleActive={setHandleActive} />

        <Switch>
          <div className="contentMainSec" id="contentSec">
            <Route exact path="/dashboard" component={Dashboard}></Route>
            <Route exact path="/dashboard/setting" component={Setting}></Route>
            <Route exact path="/dashboard/billing" component={Billing}></Route>
            <Route exact path="/dashboard/token" component={Token}></Route>

            <Route
              exact
              path="/dashboard/billing/detail"
              component={Billing}
            ></Route>

            <Route
              exact
              path="/dashboard/billing/payment"
              component={Billing}
            ></Route>
          </div>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;

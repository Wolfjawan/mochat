import React from "react";
import { Route, Switch } from "react-router-dom";

import Chat from "../Screens/HomChat";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import Jokes from "../Screens/Jokes";

export default () => (
  <Switch>
    <Route exact path="/" component={Chat} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/jokes" component={Jokes} />
    {/* <Route component={NotFound} /> */}
  </Switch>
);

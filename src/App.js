import React, { Component } from "react";
import store from "./store";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";

import HeaderContainer from "./components/HeaderContainer";
import LandingPageContainer from "./components/LandingPageContainer";
import DestinationContainer from "./components/DestionationContainer";

import classes from "./App.module.css";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Route path="/" component={HeaderContainer} />
        <Switch>
          <Route path="/destination" component={DestinationContainer} />
          <Route path="/" component={LandingPageContainer} />
        </Switch>
      </Provider>
    );
  }
}

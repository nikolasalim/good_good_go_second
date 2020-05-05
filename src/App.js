import React, { Component } from "react";
import store from "./store";
import { Provider } from "react-redux";

import LandingPageContainer from "./components/LandingPageContainer";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LandingPageContainer />
      </Provider>
    );
  }
}

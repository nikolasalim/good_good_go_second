import React, { Component } from "react";
import HeaderContainer from "./HeaderContainer";
import LandingFormContainer from "./LandingFormContainer";

export default class LandingPageContainer extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <LandingFormContainer />
      </div>
    );
  }
}

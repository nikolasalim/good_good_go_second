import React, { Component } from "react";
import LandingForm from "./LandingForm";

export default class LandingFormContainer extends Component {
  state = {
    search: "",
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({});
    console.log("state now is", this.state);
  };

  render() {
    return (
      <div>
        Please, fill in the city of departure:
        <LandingForm
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          search={this.state.search}
        />
      </div>
    );
  }
}

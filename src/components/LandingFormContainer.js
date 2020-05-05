import React, { Component } from "react";
import { autocomplete } from "air-port-codes-node";
import LandingForm from "./LandingForm";

console.log("process.env is", process.env);

export default class LandingFormContainer extends Component {
  state = {
    search: "",
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });

    const apca = autocomplete({
      key: process.env.REACT_APP_AIR_PORT_CODES_KEY,
      secret: process.env.REACT_APP_AIR_PORT_CODES_SECRET,
      limit: 15,
    });

    apca.request(event.target.value);

    apca.onSuccess = (data) => {
      console.log("autocomplete is:", data.airports[0]);
    };

    apca.onError = (data) => {
      console.log("onError", data.message);
    };
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

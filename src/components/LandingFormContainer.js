import React, { Component } from "react";
import { connect } from "react-redux";
import { autocomplete } from "air-port-codes-node";
import { Redirect } from "react-router-dom";

import LandingForm from "./LandingForm";
import { gettingDeparture } from "../actions/searchActions";

class LandingFormContainer extends Component {
  state = {
    search: "",
    redirect: false,
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    // Fetching the IATA code (ex: "AMS", "MAD", "LON") of the departure city to be able to use it with the SkyPicker API:

    const apca = autocomplete({
      key: process.env.REACT_APP_AIR_PORT_CODES_KEY,
      secret: process.env.REACT_APP_AIR_PORT_CODES_SECRET,
      limit: 15,
    });

    apca.request(this.state.search);

    apca.onSuccess = (data) => {
      // Thunk to store the departure IATA code for other components:
      this.props.gettingDeparture(data.airports[0].iata);
    };

    apca.onError = (data) => {
      console.log("onError", data.message);
    };

    this.setState({ search: "", redirect: true });
  };

  // Redirecting to the results page:

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/destination`} />;
    }
  };

  render() {
    return (
      <div>
        <LandingForm
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          search={this.state.search}
        />
        {this.renderRedirect()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { search: state.search };
}

const mapDispatchToProps = { gettingDeparture };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingFormContainer);

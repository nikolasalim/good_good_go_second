import React, { Component } from "react";
import { connect } from "react-redux";
import { autocomplete } from "air-port-codes-node";
import LandingForm from "./LandingForm";
import { gettingDeparture } from "../actions/searchActions";

class LandingFormContainer extends Component {
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

    const apca = autocomplete({
      key: process.env.REACT_APP_AIR_PORT_CODES_KEY,
      secret: process.env.REACT_APP_AIR_PORT_CODES_SECRET,
      limit: 15,
    });

    apca.request(this.state.search);

    apca.onSuccess = (data) => {
      // this.setState({ originIataCode: data.airports[0].iata });
      this.props.gettingDeparture(data.airports[0].iata);
    };

    apca.onError = (data) => {
      console.log("onError", data.message);
    };

    console.log("state now is", this.state);
    this.setState({ search: "" });
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

function mapStateToProps(state) {
  return { search: state.search };
}

const mapDispatchToProps = { gettingDeparture };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingFormContainer);

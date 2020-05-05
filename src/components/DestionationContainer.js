import React, { Component } from "react";
import { connect } from "react-redux";
import Destination from "./Destination";
import destinationList from "../data/destionationList";

class DestionationContainer extends Component {
  state = {
    flightInfo: { ams: null, mad: null, bud: null },
  };
  async componentDidMount() {
    const responseAms = await fetch(
      `https://api.skypicker.com/flights?fly_from=${this.props.search}&to=AMS&dateFrom=18/11/2020&dateTo=18/11/2020&partner=picky&v=3`
    );
    const jsonAms = await responseAms.json();

    const responseMad = await fetch(
      "https://api.skypicker.com/flights?fly_from=AMS&to=MAD&dateFrom=18/11/2020&dateTo=18/11/2020&partner=picky&v=3"
    );
    const jsonMad = await responseMad.json();

    const responseBud = await fetch(
      "https://api.skypicker.com/flights?fly_from=AMS&to=BUD&dateFrom=18/11/2020&dateTo=18/11/2020&partner=picky&v=3"
    );
    const jsonBud = await responseBud.json();

    await this.setState({
      ...this.state,
      flightInfo: {
        ...this.state.flightInfo,
        ams: jsonAms,
        mad: jsonMad,
        bud: jsonBud,
      },
      loading: false,
    });

    console.log("state is", this.state);
  }

  render() {
    return (
      <div>
        <Destination destinationList={destinationList} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { search: state.search };
}

export default connect(mapStateToProps, null)(DestionationContainer);

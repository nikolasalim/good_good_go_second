import React, { Component } from "react";
import { connect } from "react-redux";
import Destination from "./Destination";
import destinationList from "../data/destionationList";

class DestionationContainer extends Component {
  state = {
    flightInfo: { ams: null, mad: null, bud: null },
    loading: true,
  };

  async componentDidUpdate() {
    const responseAms = await fetch(
      `https://api.skypicker.com/flights?fly_from=${this.props.search}&to=AMS&dateFrom=18/11/2020&dateTo=18/11/2020&partner=picky&v=3`
    );
    const jsonAms = await responseAms.json();

    const responseMad = await fetch(
      `https://api.skypicker.com/flights?fly_from=${this.props.search}&to=MAD&dateFrom=18/11/2020&dateTo=18/11/2020&partner=picky&v=3`
    );
    const jsonMad = await responseMad.json();

    const responseBud = await fetch(
      `https://api.skypicker.com/flights?fly_from=${this.props.search}&to=BUD&dateFrom=18/11/2020&dateTo=18/11/2020&partner=picky&v=3`
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
    if (this.state.loading || this.props.search === {}) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        {console.log("this.props.search is", this.props.search)}
        <Destination destinationList={destinationList} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { search: state.search };
}

export default connect(mapStateToProps, null)(DestionationContainer);

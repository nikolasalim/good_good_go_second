import React, { Component } from "react";

export default class Destination extends Component {
  render() {
    return (
      <div>
        <div>
          <h3>Amsterdam</h3>
          <p>Cheapest price today: {this.props.flightsInfo.ams}</p>
        </div>
        <div>
          <h3>Madrid</h3>
          <p>Cheapest price today: {this.props.flightsInfo.mad}</p>
        </div>
        <div>
          <h3>Budapest</h3>
          <p>Cheapest price today: {this.props.flightsInfo.bud}</p>
        </div>
      </div>
    );
  }
}

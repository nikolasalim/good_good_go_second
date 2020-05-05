import React, { Component } from "react";

export default class Destination extends Component {
  render() {
    /* const { ams, mad, bud } = this.props.weatherInfo; */

    return (
      <div>
        <div>
          {console.log("this.props.weatherInfo is", this.props.weatherInfo)}
          <h3>Amsterdam</h3>
          <p>Cheapest price in the next 5 days: {this.props.flightsInfo.ams}</p>
          {/* <p>
            Average temperature for the next 5 days: min {ams.min} | max{" "}
            {ams.max}
          </p> */}
        </div>
        <div>
          <h3>Madrid</h3>
          <p>Cheapest price in the next 5 days: {this.props.flightsInfo.mad}</p>
          {/* <p>
            Average temperature for the next 5 days: min {mad.min} | max{" "}
            {mad.max}
          </p> */}
        </div>
        <div>
          <h3>Budapest</h3>
          <p>Cheapest price in the next 5 days: {this.props.flightsInfo.bud}</p>
          {/* <p>
            Average temperature for the next 5 days: min {bud.min} | max{" "}
            {bud.max}
          </p> */}
        </div>
      </div>
    );
  }
}

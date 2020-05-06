import React, { Component } from "react";

export default class Destination extends Component {
  state = {
    // Hardcoding the cities for now:
    cities: [
      {
        id: 1,
        name: "Amsterdam",
        cheapestFlight: this.props.flightsInfo.ams,
        averageMaxTemp: this.props.weatherInfo.ams,
      },
      {
        id: 2,
        name: "Madrid",
        cheapestFlight: this.props.flightsInfo.mad,
        averageMaxTemp: this.props.weatherInfo.mad,
      },
      {
        id: 3,
        name: "Budapest",
        cheapestFlight: this.props.flightsInfo.bud,
        averageMaxTemp: this.props.weatherInfo.bud,
      },
    ],
    sorting: 1,
  };

  // Sorting results by either price or weather:

  sortingByPrice = () => {
    this.setState(
      this.state.cities.sort((a, b) => a.cheapestFlight - b.cheapestFlight)
    );
  };

  sortingByWeather = () => {
    this.setState(
      this.state.cities.sort((a, b) => b.averageMaxTemp - a.averageMaxTemp)
    );
  };

  render() {
    return (
      <div>
        <div>
          What are you considering the most?
          <button onClick={this.sortingByPrice}>Price</button>
          <button onClick={this.sortingByWeather}>Weather</button>
        </div>
        {this.state.cities.map((city) => {
          return (
            <div key={city.id}>
              <h3>{city.name}</h3>
              <p>
                Cheapest price in the next 5 days: &euro;{city.cheapestFlight}
                ,00
              </p>
              <p>
                Average maximum temperature for the next 5 days:{" "}
                {city.averageMaxTemp}&#8451;
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}

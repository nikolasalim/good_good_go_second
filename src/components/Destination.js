import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";

const marks = [
  {
    value: 1,
    label: "Price",
  },
  {
    value: 2,
    label: "Both",
  },
  {
    value: 3,
    label: "Weather",
  },
];

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
    // sorting: 2,
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

  sortingByBoth = () => {
    this.setState(this.state.cities.sort((a, b) => b.points - a.points));
  };

  addingPoints = () => {
    // Calculating weather points:
    const temperatures = this.state.cities.map((city) => city.averageMaxTemp);
    const smaller = temperatures.reduce((acc, curr) => Math.min(acc, curr));

    const weatherPoints = this.state.cities.map((city) => {
      return {
        ...city,
        points: city.averageMaxTemp / smaller,
      };
    });

    // Calculating price points:
    const prices = this.state.cities.map((city) => city.cheapestFlight);
    const mostExpensive = prices.reduce((acc, curr) => Math.max(acc, curr));

    const pricePoints = this.state.cities.map((city) => {
      return {
        ...city,
        points: mostExpensive / city.cheapestFlight,
      };
    });

    // Calculating sum of points:
    const totalPoint = weatherPoints.map((city) => {
      const arr = [];

      pricePoints.map((c) => {
        if (city.id === c.id) {
          arr.push({ ...c, points: c.points + city.points });
        }
      });

      return arr;
    });
    const totalPointsFlat = totalPoint.flat();
    console.log("totalPointsFlat is:", totalPointsFlat);

    this.setState((prevState) => ({
      cities: totalPointsFlat,
      ...prevState.sorting,
    }));
  };

  handleChange = (event, value) => {
    if (value === 1) {
      this.sortingByPrice();
    } else if (value === 2) {
      this.sortingByBoth();
    } else {
      this.sortingByWeather();
    }
  };

  async componentWillMount() {
    await this.addingPoints();
    this.sortingByBoth();
  }

  render() {
    return (
      <div>
        <Slider
          style={{ width: "100px" }}
          defaultValue={2}
          min={1}
          max={3}
          step={1}
          marks={marks}
          onChangeCommitted={this.handleChange}
        />

        {/* <div>
          What are you considering the most?
          <button onClick={this.sortingByPrice}>Price</button>
          <button onClick={this.sortingByBoth}>Both</button>
          <button onClick={this.sortingByWeather}>Weather</button>
        </div> */}
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

/* {
            if (this.state.sorting === 1) {
              this.sortingByPrice();
            } else if (this.state.sorting === 2) {
              this.sortingByBoth();
            } else {
              this.sortingByWeather();
            }
          } */

import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";

import classes from "./Destination.module.css";
import amsterdam from "../assets/amsterdam.png";
import madrid from "../assets/madrid.png";
import budapest from "../assets/budapest.png";

const sliderMarks = [
  {
    value: 1,
    label: "Good price",
  },
  {
    value: 3,
    label: "Both",
  },
  {
    value: 5,
    label: "Good weather",
  },
];

export default class Destination extends Component {
  state = {
    // Hardcoding the cities for now:
    cities: [
      {
        id: 1,
        name: "Amsterdam",
        cheapestFlight: this.props.flightsInfo.AMS.price,
        averageMaxTemp: this.props.weatherInfo.AMS,
        image: amsterdam,
        url: this.props.flightsInfo.AMS.deep_link,
      },
      {
        id: 2,
        name: "Madrid",
        cheapestFlight: this.props.flightsInfo.MAD.price,
        averageMaxTemp: this.props.weatherInfo.MAD,
        image: madrid,
        url: this.props.flightsInfo.MAD.deep_link,
      },
      {
        id: 3,
        name: "Budapest",
        cheapestFlight: this.props.flightsInfo.BUD.price,
        averageMaxTemp: this.props.weatherInfo.BUD,
        image: budapest,
        url: this.props.flightsInfo.BUD.deep_link,
      },
    ],
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

  addingPoints = (preference = 3) => {
    const scoringPreference = {
      2: [0.75, 0.25],
      3: [0.5, 0.5],
      4: [0.25, 0.75],
    };
    const temperatures = this.state.cities.map((city) => city.averageMaxTemp);
    const averageTemp = temperatures.reduce(
      (acc, curr) => acc + curr / temperatures.length,
      0
    );
    const prices = this.state.cities.map((city) => city.cheapestFlight);
    const averagePrice = prices.reduce(
      (acc, curr) => acc + curr / prices.length,
      0
    );

    // The higher the temperature, the better:
    const tempDiffToAverage = temperatures.map(
      (t) => (t - averageTemp) / averageTemp
    );

    // The lower the price, the better:
    const pricesDiffToAverage = prices.map(
      (p) => (averagePrice - p) / averagePrice
    );
    const calculatePoints = (i) =>
      scoringPreference[preference][1] * tempDiffToAverage[i] +
      scoringPreference[preference][0] * pricesDiffToAverage[i];
    const citiesWithPoints = this.state.cities.map((c, i) => ({
      ...c,
      points: calculatePoints(i) + 4,
    }));

    const sortedCities = [...citiesWithPoints].sort(
      (a, b) => b.points - a.points
    );

    this.setState({
      cities: sortedCities,
    });
  };

  // Change handler for the slider:

  handleChange = (event, value) => {
    if (value === 1) {
      this.sortingByPrice();
    } else if (value === 2) {
      this.sortingByBoth();
    } else {
      this.sortingByWeather();
    }
  };

  // Marking sure we've got the points and setting "Both" as a starting point:

  async componentWillMount() {
    await this.addingPoints();
    this.sortingByBoth();
  }

  render() {
    return (
      <div className={classes.body}>
        <div className={classes.sliderBox}>
          <p className={classes.text}>What do you prefer?</p>

          <Slider
            defaultValue={3}
            min={1}
            max={5}
            step={1}
            marks={sliderMarks}
            onChangeCommitted={this.handleChange}
          />
        </div>

        {this.state.cities.map((city) => {
          return (
            <div className={classes.card} key={city.id}>
              <div className={classes.boxLeft}>
                <img src={city.image} className={classes.image}></img>
              </div>
              <div className={classes.boxRight}>
                <div className={classes.info}>
                  <h3 className={classes.title}>{city.name}</h3>
                  <p className={classes.text}>
                    Cheapest flight <i>(next 5 days)</i>:{" "}
                    <b>
                      &euro;{city.cheapestFlight}
                      ,00
                    </b>
                  </p>
                  <p className={classes.text}>
                    Average maximum temperature <i>(next 5 days)</i>:{" "}
                    <b>{city.averageMaxTemp}&#8451;</b>
                  </p>
                </div>
                <div className={classes.buttonBox}>
                  <button
                    className={classes.button}
                    onClick={() => {
                      window.open(city.url, "_blank");
                    }}
                  >
                    It's go time!
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

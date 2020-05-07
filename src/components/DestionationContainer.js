import React, { Component } from "react";
import { connect } from "react-redux";
import Destination from "./Destination";
import moment from "moment";

import loading from "../assets/loading.gif";
import classes from "./DestionationContainer.module.css";

class DestionationContainer extends Component {
  state = {
    flightsInfo: { ams: null, mad: null, bud: null },
    weatherInfo: { ams: null, mad: null, bud: null },
    loading: true,
  };

  async componentDidUpdate(prevProps) {
    const today = moment().format("DD/MM/YYYY");
    const fiveDaysAhead = moment().add(5, "days").format("DD/MM/YYYY");
    // console.log("this.props.search is", this.props.search);

    if (this.props.search !== prevProps.search) {
      // Fetching flights info:

      const cityCodes = ["AMS", "MAD", "BUD"];

      const cityFlightRequests = cityCodes.map(async (code) => {
        const responseFlight = await fetch(
          `https://api.skypicker.com/flights?fly_from=${this.props.search}&to=${code}&dateFrom=${today}&dateTo=${fiveDaysAhead}&partner=picky&v=3`
        );
        return await responseFlight.json();
      });

      const cityFlightsArray = await Promise.all(cityFlightRequests);

      const cityFlights = cityCodes.reduce(
        (acc, code, i) => ({ ...acc, [code]: cityFlightsArray[i].data[0] }),
        {}
      );

      // Fetching weather info:

      const cityIds = ["249758", "308526", "187423"];

      const cityWeatherRequests = cityIds.map(async (id) => {
        const responseWeather = await fetch(
          `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}?apikey=${process.env.REACT_APP_ACCUWEATHER_KEY}&metric=true`
        );
        return await responseWeather.json();
      });

      const cityWeathersArray = await Promise.all(cityWeatherRequests);

      const cityWeathers = cityCodes.reduce(
        (acc, code, i) => ({
          ...acc,
          [code]: cityWeathersArray[i].DailyForecasts,
        }),
        {}
      );

      await this.setState({
        ...this.state,
        flightsInfo: cityFlights,
        weatherInfo: cityWeathers,
        loading: false,
      });
    }
  }
  // Calculating the average maximum temperature:

  weatherAverageCalc = (cityArr) => {
    const maxTotal = cityArr
      .map((daylyWeather) => daylyWeather.Temperature.Maximum.Value)
      .reduce((acc, curr) => acc + curr, 0);
    const maxAverage = maxTotal / cityArr.length;

    return Math.round(maxAverage);
  };

  agroupingAverages = () => {
    const weatherAverageAllCities = {
      AMS: this.weatherAverageCalc(this.state.weatherInfo.AMS),
      MAD: this.weatherAverageCalc(this.state.weatherInfo.MAD),
      BUD: this.weatherAverageCalc(this.state.weatherInfo.BUD),
    };
    return weatherAverageAllCities;
  };

  render() {
    // return "test";
    if (this.state.loading || this.props.search === {}) {
      return (
        <div className={classes.body}>
          <img src={loading} className={classes.spinner}></img>
        </div>
      );
    }
    return (
      <div>
        <Destination
          flightsInfo={this.state.flightsInfo}
          weatherInfo={this.agroupingAverages()}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { search: state.search };
}

export default connect(mapStateToProps, null)(DestionationContainer);

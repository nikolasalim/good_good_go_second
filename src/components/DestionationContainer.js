import React, { Component } from "react";
import { connect } from "react-redux";
import Destination from "./Destination";
import moment from "moment";

class DestionationContainer extends Component {
  state = {
    flightsInfo: { ams: null, mad: null, bud: null },
    weatherInfo: { ams: null, mad: null, bud: null },
    loading: true,
  };

  async componentDidUpdate() {
    const today = moment().format("DD/MM/YYYY");
    const fiveDaysAhead = moment().add(5, "days").format("DD/MM/YYYY");

    // Fetching flights info:
    const responseFlightAms = await fetch(
      `https://api.skypicker.com/flights?fly_from=${this.props.search}&to=AMS&dateFrom=${today}&dateTo=${fiveDaysAhead}&partner=picky&v=3`
    );
    const jsonFlightAms = await responseFlightAms.json();

    const responseFlightMad = await fetch(
      `https://api.skypicker.com/flights?fly_from=${this.props.search}&to=MAD&dateFrom=${today}&dateTo=${fiveDaysAhead}&partner=picky&v=3`
    );
    const jsonFlightMad = await responseFlightMad.json();

    const responseFlightBud = await fetch(
      `https://api.skypicker.com/flights?fly_from=${this.props.search}&to=BUD&dateFrom=${today}&dateTo=${fiveDaysAhead}&partner=picky&v=3`
    );
    const jsonFlightBud = await responseFlightBud.json();

    // Fetching weather info:

    const responseWeatherAms = await fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/249758?apikey=${process.env.REACT_APP_ACCUWEATHER_KEY}&metric=true`
    );
    const jsonWeatherAms = await responseWeatherAms.json();

    const responseWeatherMad = await fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/308526?apikey=${process.env.REACT_APP_ACCUWEATHER_KEY}&metric=true`
    );
    const jsonWeatherMad = await responseWeatherMad.json();

    const responseWeatherBud = await fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/187423?apikey=${process.env.REACT_APP_ACCUWEATHER_KEY}&metric=true`
    );
    const jsonWeatherBud = await responseWeatherBud.json();

    await this.setState({
      ...this.state,
      flightsInfo: {
        ...this.state.flightsInfo,
        ams: jsonFlightAms.data[0].price,
        mad: jsonFlightMad.data[0].price,
        bud: jsonFlightBud.data[0].price,
      },
      weatherInfo: {
        ...this.state.weatherInfo,
        ams: jsonWeatherAms.DailyForecasts,
        mad: jsonWeatherMad.DailyForecasts,
        bud: jsonWeatherBud.DailyForecasts,
      },
      loading: false,
    });
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
      ams: this.weatherAverageCalc(this.state.weatherInfo.ams),
      mad: this.weatherAverageCalc(this.state.weatherInfo.mad),
      bud: this.weatherAverageCalc(this.state.weatherInfo.bud),
    };
    return weatherAverageAllCities;
  };

  render() {
    if (this.state.loading || this.props.search === {}) {
      return <div>Loading...</div>;
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

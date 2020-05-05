import React, { Component } from "react";
import { connect } from "react-redux";
import Destination from "./Destination";

class DestionationContainer extends Component {
  state = {
    flightsInfo: { ams: null, mad: null, bud: null },
    weatherInfo: { ams: null, mad: null, bud: null },
    loading: true,
  };

  async componentDidUpdate() {
    // Fetching flights info:
    const responseFlightAms = await fetch(
      `https://api.skypicker.com/flights?fly_from=${this.props.search}&to=AMS&dateFrom=18/11/2020&dateTo=18/11/2020&partner=picky&v=3`
    );
    const jsonFlightAms = await responseFlightAms.json();

    const responseFlightMad = await fetch(
      `https://api.skypicker.com/flights?fly_from=${this.props.search}&to=MAD&dateFrom=18/11/2020&dateTo=18/11/2020&partner=picky&v=3`
    );
    const jsonFlightMad = await responseFlightMad.json();

    const responseFlightBud = await fetch(
      `https://api.skypicker.com/flights?fly_from=${this.props.search}&to=BUD&dateFrom=18/11/2020&dateTo=18/11/2020&partner=picky&v=3`
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

    console.log("state is", this.state);
  }

  render() {
    if (this.state.loading || this.props.search === {}) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        {console.log("this.props.search is", this.props.search)}
        <Destination
          flightsInfo={this.state.flightsInfo}
          weatherInfo={this.state.weatherInfo}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { search: state.search };
}

export default connect(mapStateToProps, null)(DestionationContainer);

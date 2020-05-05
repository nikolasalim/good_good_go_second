import React, { Component } from "react";
import Destination from "./Destination";
import destinationList from "../data/destionationList";

export default class DestionationContainer extends Component {
  render() {
    return (
      <div>
        <Destination destinationList={destinationList} />
      </div>
    );
  }
}

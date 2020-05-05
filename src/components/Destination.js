import React, { Component } from "react";

export default class Destination extends Component {
  render() {
    return (
      <div>
        {this.props.destinationList.map((destination) => {
          return (
            <div key={destination.id}>
              <div>{destination.name}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

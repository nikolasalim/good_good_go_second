import React, { Component } from "react";

export default class LandingForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.onSubmit}>
          <input
            value={this.props.search}
            name="search"
            onChange={this.props.onChange}
            placeholder="Ex: London"
          ></input>
        </form>
      </div>
    );
  }
}

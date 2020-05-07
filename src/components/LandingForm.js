import React, { Component } from "react";

import classes from "./LandingForm.module.css";

export default class LandingForm extends Component {
  render() {
    return (
      <div className={classes.body}>
        <div className={classes.text}>
          Please, fill in the city of departure:
        </div>

        <form onSubmit={this.props.onSubmit}>
          <input
            className={classes.input}
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

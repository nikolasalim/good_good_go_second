import React, { Component } from "react";

import classes from "./Header.module.css";

export default class Header extends Component {
  render() {
    return (
      <div className={classes.body}>
        <div className={classes.logo}>Good-Good-G&#x263a;!</div>
        <div className={classes.tagline}>
          Good prices. Good weather. Go time!
        </div>
      </div>
    );
  }
}

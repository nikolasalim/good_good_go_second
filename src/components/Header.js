import React, { Component } from "react";
import { Link } from "react-router-dom";

import classes from "./Header.module.css";

export default class Header extends Component {
  render() {
    return (
      <div className={classes.body}>
        <Link to="/">
          <div className={classes.logo}>Good-Good-G&#x263a;!</div>
        </Link>
        <div className={classes.tagline}>
          Good prices. Good weather. Go time!
        </div>
      </div>
    );
  }
}
